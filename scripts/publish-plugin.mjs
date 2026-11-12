#!/usr/bin/env node
import { parseArgs } from "node:util";
import { BuiltPlugin } from "./lib/built-plugin.mjs";
import { GitHubApi } from "./lib/github-api.mjs";
import { GitRepository } from "./lib/git-repository.mjs";
import { Orca } from "./lib/orca.mjs";
import { Publication } from "./lib/publication.mjs";
import { ReleaseSource } from "./lib/release-source.mjs";
import { Sources } from "./lib/sources.mjs";

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

const repository = new GitRepository();
await new Publication({
  plugins: BuiltPlugin.loadAll(values["plugins-dir"]),
  source: new ReleaseSource({
    repository: values["source-repo"],
    commit: values["source-ref"],
    workflowRun: process.env.WORKFLOW_RUN,
  }),
  runKey: process.env.RUN_KEY,
  sources: Sources.read(),
  repository,
  api: new GitHubApi({
    token: process.env.GH_TOKEN,
    repository: repository.githubRepository,
  }),
  orca: Orca.fromEnvironment(),
}).run();
