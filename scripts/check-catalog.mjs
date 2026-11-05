#!/usr/bin/env node
// Checks orca-catalog.json against the repository: every plugin may be published from where
// sources.json says, every release's commit exists and holds that version, its contentHash is the
// hash Orca computes for that commit's plugin folder, and no version listed on main (--base) ever
// changes its commit or its bytes.
import { spawnSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { parseArgs } from "node:util";
import { orca } from "./orca-cli.mjs";

const { values } = parseArgs({ options: { base: { type: "string" } } });
const git = (...args) => spawnSync("git", args, { encoding: "utf8" });
const problems = [];
const catalog = JSON.parse(readFileSync("orca-catalog.json", "utf8"));
const sources = JSON.parse(readFileSync("sources.json", "utf8")).plugins;

orca(["plugin", "validate", "orca-catalog.json"]);

for (const plugin of catalog.plugins) {
  const id = plugin.id.replace(/^miragon\./, "");
  if (!plugin.id.startsWith("miragon.") || !sources[id]) {
    problems.push(`${plugin.id}: not in sources.json`);
    continue;
  }
  if (plugin.source?.path !== `plugins/${id}`)
    problems.push(`${plugin.id}: source.path is not plugins/${id}`);
  for (const release of plugin.releases) {
    const at = `${plugin.id} ${release.version}`;
    if (git("cat-file", "-e", `${release.commit}^{commit}`).status !== 0) {
      problems.push(`${at}: commit ${release.commit} does not exist`);
      continue;
    }
    const manifest = git(
      "show",
      `${release.commit}:plugins/${id}/orca-plugin.json`,
    );
    if (
      manifest.status !== 0 ||
      JSON.parse(manifest.stdout).version !== release.version
    ) {
      problems.push(
        `${at}: plugins/${id}/orca-plugin.json at ${release.commit} is not this version`,
      );
      continue;
    }
    const checkout = mkdtempSync(join(tmpdir(), "orca-release-"));
    try {
      const archive = spawnSync("sh", [
        "-c",
        `git archive ${release.commit} plugins/${id} | tar -x -C ${checkout}`,
      ]);
      if (archive.status !== 0)
        throw new Error(`git archive of ${release.commit} failed`);
      const inspected = orca([
        "plugin",
        "inspect",
        join(checkout, "plugins", id),
      ]);
      const hash = inspected.contentHash ?? inspected.plugin?.contentHash;
      if (hash !== release.contentHash) {
        problems.push(
          `${at}: contentHash ${release.contentHash}, the commit's files hash to ${hash}`,
        );
      }
    } finally {
      rmSync(checkout, { recursive: true, force: true });
    }
  }
}

if (values.base) {
  const before = git("show", `${values.base}:orca-catalog.json`);
  if (before.status === 0) {
    for (const plugin of JSON.parse(before.stdout).plugins) {
      const now = catalog.plugins.find(
        (candidate) => candidate.id === plugin.id,
      );
      for (const release of plugin.releases) {
        const kept = now?.releases.find(
          (candidate) => candidate.version === release.version,
        );
        if (!kept)
          problems.push(
            `${plugin.id} ${release.version}: a listed release was removed`,
          );
        else if (
          kept.commit !== release.commit ||
          kept.contentHash !== release.contentHash
        ) {
          problems.push(
            `${plugin.id} ${release.version}: a listed release changed its bytes`,
          );
        }
      }
    }
  }
}

if (problems.length > 0) {
  console.error(problems.map((problem) => `- ${problem}`).join("\n"));
  process.exitCode = 1;
} else {
  console.log(
    `orca-catalog.json: ${catalog.plugins.length} plugin(s), every release checked`,
  );
}
