#!/usr/bin/env node
import { appendFileSync } from "node:fs";
import { Catalog } from "./lib/catalog.mjs";
import { CommunityDirectory } from "./lib/community-directory.mjs";
import { DirectoryStatusCheck } from "./lib/directory-status-check.mjs";
import { GitRepository } from "./lib/git-repository.mjs";

const catalog = Catalog.read();
const problems = new DirectoryStatusCheck({
  directory: await CommunityDirectory.fetch(),
  catalog,
  repository: new GitRepository(),
}).run();

if (problems.length > 0) {
  const report = problems.map((problem) => `- ${problem}`).join("\n");
  console.error(report);
  if (process.env.GITHUB_STEP_SUMMARY) {
    appendFileSync(
      process.env.GITHUB_STEP_SUMMARY,
      `## Orca's community directory\n\n${report}\n`,
    );
  }
  process.exitCode = 1;
} else {
  console.log(
    `Orca's community directory lists the newest release of all ${catalog.plugins.length} plugin(s)`,
  );
}
