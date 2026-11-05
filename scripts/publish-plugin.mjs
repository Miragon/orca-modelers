#!/usr/bin/env node
// Publishes one built plugin into this repository, as two commits on main:
//   1. plugins/<id>/ replaced by the built folder, with SOURCE.json (where the bytes come from);
//   2. the release entry Orca computes for commit 1 at the top of the plugin's releases in
//      orca-catalog.json.
// Run by the publish-plugin action in a checkout of this repository, with the release-please
// app's token. A race with another publish starts over from the new main.
import { spawnSync } from "node:child_process";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { parseArgs } from "node:util";
import { github } from "./github.mjs";
import { orca } from "./orca-cli.mjs";

const { values } = parseArgs({
  options: {
    "plugin-id": { type: "string" },
    "plugin-dir": { type: "string" },
    "source-repo": { type: "string" },
    "source-ref": { type: "string" },
    "source-tag": { type: "string" },
    "workflow-run": { type: "string" },
    changelog: { type: "string", default: "" },
    repository: {
      type: "string",
      default: process.env.GITHUB_REPOSITORY ?? "miragon/orca-modelers",
    },
  },
});
for (const name of ["plugin-id", "plugin-dir", "source-repo", "source-ref"]) {
  if (!values[name]) throw new Error(`--${name} is required`);
}
const token = process.env.GH_TOKEN;
if (!token)
  throw new Error("GH_TOKEN (the release-please app's token) is required");

const id = values["plugin-id"];
const sources = JSON.parse(readFileSync("sources.json", "utf8")).plugins;
if (
  sources[id]?.repository?.toLowerCase() !== values["source-repo"].toLowerCase()
) {
  throw new Error(
    `${values["source-repo"]} may not publish ${id} (sources.json)`,
  );
}
const manifest = JSON.parse(
  readFileSync(join(values["plugin-dir"], "orca-plugin.json"), "utf8"),
);
if (manifest.id !== id)
  throw new Error(`the manifest's id is ${manifest.id}, not ${id}`);
orca(["plugin", "validate", values["plugin-dir"]]);

const git = (...args) => {
  const run = spawnSync("git", args, { encoding: "utf8" });
  if (run.status !== 0) throw new Error(`git ${args.join(" ")}: ${run.stderr}`);
  return run.stdout.trim();
};
const filesUnder = (directory) =>
  readdirSync(directory).flatMap((name) => {
    const path = join(directory, name);
    return statSync(path).isDirectory() ? filesUnder(path) : [path];
  });

const target = `plugins/${id}`;
const built = filesUnder(values["plugin-dir"]).map((path) => ({
  path: `${target}/${relative(values["plugin-dir"], path)}`,
  content: readFileSync(path),
}));
const source = {
  repository: values["source-repo"],
  commit: values["source-ref"],
  ...(values["source-tag"] ? { tag: values["source-tag"] } : {}),
  ...(values["workflow-run"] ? { workflowRun: values["workflow-run"] } : {}),
};
built.push({
  path: `${target}/SOURCE.json`,
  content: Buffer.from(`${JSON.stringify(source, null, 2)}\n`),
});

const api = github(token, values.repository);

for (let attempt = 1; ; attempt++) {
  const main = await api.head("main");
  git("fetch", "--quiet", "origin", main);
  git("checkout", "--quiet", "--detach", main);
  const published = new Set(built.map((file) => file.path));
  const stale = git("ls-files", target)
    .split("\n")
    .filter((path) => path !== "" && !published.has(path));

  const catalog = JSON.parse(readFileSync("orca-catalog.json", "utf8"));
  const key = `miragon.${id}`;
  const listed = catalog.plugins.find((plugin) => plugin.id === key);
  if (
    listed?.releases.some((release) => release.version === manifest.version)
  ) {
    throw new Error(
      `${key} ${manifest.version} is listed already; a listed version never changes`,
    );
  }

  const bytes = await api.commitFiles({
    parent: main,
    message: `feat(${id}): publish ${manifest.version} from ${values["source-repo"]}@${values["source-ref"].slice(0, 12)}`,
    files: built,
    removed: stale,
  });
  git("fetch", "--quiet", "origin", bytes);
  git("checkout", "--quiet", "--detach", bytes);
  const { entry } = orca(["plugin", "release-entry", target]);
  const release = {
    ...entry,
    ...(manifest.license ? { license: manifest.license } : {}),
    ...(manifest.repository ? { repository: manifest.repository } : {}),
    ...(manifest.homepage ? { homepage: manifest.homepage } : {}),
    updatedAt: new Date().toISOString().slice(0, 10),
    ...(values.changelog ? { changelog: values.changelog.slice(0, 2000) } : {}),
  };
  const plugin = listed ?? {
    id: key,
    source: {
      kind: "git",
      url: `https://github.com/${values.repository}.git`,
      ref: "main",
      path: target,
    },
    description: manifest.description,
    categories: ["editors", "diagrams"],
    releases: [],
  };
  plugin.releases = [release, ...plugin.releases].slice(0, 32);
  if (!listed) catalog.plugins.push(plugin);
  const listing = await api.commitFiles({
    parent: bytes,
    message: `feat(${id}): list ${manifest.version} in the catalog`,
    files: [
      {
        path: "orca-catalog.json",
        content: Buffer.from(`${JSON.stringify(catalog, null, 2)}\n`),
      },
    ],
  });

  try {
    await api.moveBranch("main", listing);
    console.log(
      `published ${key} ${manifest.version}: ${bytes} (plugin), ${listing} (catalog)`,
    );
    break;
  } catch (error) {
    if (error.status !== 422 || attempt >= 5) throw error;
    console.log(
      `main moved during the publish (attempt ${attempt}); starting over`,
    );
  }
}
