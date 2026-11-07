#!/usr/bin/env node
// Publishes the plugins of one source release into this repository, as two pull requests the
// release-please app opens and squash-merges once validate passes:
//   1. plugins/<id>/ replaced by each built folder, with SOURCE.json (where the bytes come from);
//   2. the release entry Orca computes for main after that merge at the top of each plugin's
//      releases in orca-catalog.json.
// Run by the publish-plugin action in a checkout of this repository, with the app's token. A
// re-run after the first merge finds no change in plugins/ and opens only the second.
import { spawnSync } from "node:child_process";
import {
  cpSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { join } from "node:path";
import { setTimeout as sleep } from "node:timers/promises";
import { parseArgs } from "node:util";
import { github } from "./github.mjs";
import { orca } from "./orca-cli.mjs";

const CATALOG_URL = "https://github.com/miragon/orca-modelers.git";
const CHECKS_APPEAR_WITHIN_MS = 120_000;
const MERGE_ATTEMPTS = 3;

const { values } = parseArgs({
  options: {
    "plugins-dir": { type: "string" },
    "source-repo": { type: "string" },
    "source-ref": { type: "string" },
  },
});
for (const name of ["plugins-dir", "source-repo", "source-ref"]) {
  if (!values[name]) throw new Error(`--${name} is required`);
}
for (const name of ["GH_TOKEN", "RUN_KEY"]) {
  if (!process.env[name]) throw new Error(`${name} is required`);
}
const sourceRepo = values["source-repo"];
const sourceRef = values["source-ref"];
const runKey = process.env.RUN_KEY;
const workflowRun = process.env.WORKFLOW_RUN;

const run = (command, args) => {
  const result = spawnSync(command, args, { encoding: "utf8" });
  return {
    ok: result.status === 0,
    output: `${result.stdout}${result.stderr}`.trim(),
    stdout: result.stdout.trim(),
  };
};
const must = (command, args) => {
  const result = run(command, args);
  if (!result.ok)
    throw new Error(`${command} ${args.join(" ")}: ${result.output}`);
  return result.stdout;
};
const git = (...args) => must("git", args);
const gh = (...args) => must("gh", args);
const readJson = (path) => JSON.parse(readFileSync(path, "utf8"));
const writeJson = (path, value) =>
  writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`);

const checkoutRepository = () => {
  const origin = git("config", "--get", "remote.origin.url");
  const match = /github\.com[/:]([^/]+\/[^/]+?)(?:\.git)?$/.exec(origin);
  if (!match) throw new Error(`origin ${origin} is no GitHub repository`);
  return match[1];
};
const api = github(process.env.GH_TOKEN, checkoutRepository());
const sources = readJson("sources.json").plugins;
const catalogKey = (id) => `miragon.${id}`;

function readBuiltPlugin(artifact) {
  const folder = join(values["plugins-dir"], artifact, "plugin");
  const manifest = readJson(join(folder, "orca-plugin.json"));
  const release = readJson(
    join(values["plugins-dir"], artifact, "release.json"),
  );
  if (
    sources[manifest.id]?.repository?.toLowerCase() !== sourceRepo.toLowerCase()
  ) {
    throw new Error(
      `${sourceRepo} may not publish ${manifest.id} (sources.json)`,
    );
  }
  orca(["plugin", "validate", folder]);
  return { id: manifest.id, folder, manifest, release };
}

function refuseListedVersions(plugins) {
  const catalog = readJson("orca-catalog.json");
  for (const { id, manifest } of plugins) {
    const listed = catalog.plugins.find(
      (plugin) => plugin.id === catalogKey(id),
    );
    if (
      listed?.releases.some((release) => release.version === manifest.version)
    ) {
      throw new Error(
        `${catalogKey(id)} ${manifest.version} is listed already; a listed version never changes`,
      );
    }
  }
}

function placeBytes({ id, folder, release }) {
  const target = `plugins/${id}`;
  rmSync(target, { recursive: true, force: true });
  cpSync(folder, target, { recursive: true });
  writeJson(join(target, "SOURCE.json"), {
    repository: sourceRepo,
    commit: sourceRef,
    ...(release.tag ? { tag: release.tag } : {}),
    ...(workflowRun ? { workflowRun } : {}),
  });
}

function listRelease(catalog, { id, manifest, release: built }) {
  const { entry } = orca(["plugin", "release-entry", `plugins/${id}`]);
  const release = {
    ...entry,
    ...(manifest.license ? { license: manifest.license } : {}),
    ...(manifest.repository ? { repository: manifest.repository } : {}),
    ...(manifest.homepage ? { homepage: manifest.homepage } : {}),
    updatedAt: new Date().toISOString().slice(0, 10),
    ...(built.changelog ? { changelog: built.changelog.slice(0, 2000) } : {}),
  };
  const listed = catalog.plugins.find((plugin) => plugin.id === catalogKey(id));
  const plugin = listed ?? {
    id: catalogKey(id),
    source: {
      kind: "git",
      url: CATALOG_URL,
      ref: "main",
      path: `plugins/${id}`,
    },
    description: manifest.description,
    categories: ["editors", "diagrams"],
    releases: [],
  };
  plugin.releases = [release, ...plugin.releases].slice(0, 32);
  if (!listed) catalog.plugins.push(plugin);
}

function stagedChanges() {
  const fields = git("diff", "--cached", "--raw", "--no-renames", "-z", "HEAD")
    .split("\0")
    .filter(Boolean);
  const files = [];
  const removed = [];
  for (let index = 0; index < fields.length; index += 2) {
    const [, mode, , , status] = fields[index].split(" ");
    const path = fields[index + 1];
    if (status === "D") removed.push(path);
    else files.push({ path, mode, content: readFileSync(path) });
  }
  return { files, removed };
}

const commitStaged = (message) =>
  api.commitFiles({
    parent: git("rev-parse", "HEAD"),
    message,
    ...stagedChanges(),
  });

async function waitForRequiredChecks(url) {
  const givingUpOnMissingChecksAt = Date.now() + CHECKS_APPEAR_WITHIN_MS;
  for (;;) {
    const checks = run("gh", ["pr", "checks", url, "--watch", "--required"]);
    if (checks.ok) return;
    const noChecksYet = /no (required )?checks reported/i.test(checks.output);
    if (!noChecksYet || Date.now() > givingUpOnMissingChecksAt) {
      throw new Error(`the required checks did not pass:\n${checks.output}`);
    }
    await sleep(10_000);
  }
}

async function squashMerge(url, head) {
  for (let attempt = 1; ; attempt++) {
    const merge = run("gh", [
      "pr",
      "merge",
      url,
      "--squash",
      "--match-head-commit",
      head,
    ]);
    if (merge.ok) return;
    if (attempt >= MERGE_ATTEMPTS)
      throw new Error(`merge failed:\n${merge.output}`);
    await sleep(5_000);
  }
}

function describe(greeting) {
  const releases = plugins.map(
    ({ id, manifest, release }) =>
      `- ${id} ${manifest.version}${release.tag ? ` · \`${release.tag}\`` : ""}`,
  );
  const origin = [
    `Source: ${sourceRepo}@${sourceRef}`,
    ...(workflowRun ? [`Run: ${workflowRun}`] : []),
  ];
  return [greeting, releases.join("\n"), origin.join("\n")].join("\n\n");
}

async function pullRequest(branch, title, body) {
  const head = await commitStaged(`${title}\n\n${body}`);
  await api.createBranch(branch, head);
  const url = gh(
    "pr",
    "create",
    "--base",
    "main",
    "--head",
    branch,
    "--title",
    title,
    "--body",
    body,
  );
  try {
    await waitForRequiredChecks(url);
    await squashMerge(url, head);
    console.log(`merged ${url}`);
  } catch (error) {
    run("gh", ["pr", "close", url, "--delete-branch"]);
    throw new Error(`${url} closed: ${error.message}`);
  }
}

const plugins = readdirSync(values["plugins-dir"], { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => readBuiltPlugin(entry.name));
if (plugins.length === 0)
  throw new Error(`${values["plugins-dir"]} holds no built plugin`);
refuseListedVersions(plugins);

const versions = plugins
  .map(({ id, manifest }) => `${id} ${manifest.version}`)
  .join(", ");
const source = `${sourceRepo}@${sourceRef.slice(0, 12)}`;
const branchPrefix = `publish/${sourceRef.slice(0, 12)}-${runKey}`;

git("fetch", "--quiet", "origin", "main");
git("checkout", "--quiet", "--detach", "origin/main");
plugins.forEach(placeBytes);
git("add", "-A", "plugins/");
if (run("git", ["diff", "--cached", "--quiet"]).ok) {
  console.log(`plugins/ on main holds these bytes already: ${versions}`);
} else {
  await pullRequest(
    `${branchPrefix}-plugins`,
    `feat: publish plugins from ${source}`,
    describe("📦 Special delivery: fresh bytes from the deep sea."),
  );
}

git("reset", "--quiet", "--hard");
git("fetch", "--quiet", "origin", "main");
git("checkout", "--quiet", "--detach", "origin/main");
const catalog = readJson("orca-catalog.json");
for (const plugin of plugins) listRelease(catalog, plugin);
writeJson("orca-catalog.json", catalog);
git("add", "orca-catalog.json");
await pullRequest(
  `${branchPrefix}-catalog`,
  `feat: list plugins from ${source} in the catalog`,
  describe("✅ Delivered. Signed, sealed, listed."),
);
console.log(`published ${versions}`);
