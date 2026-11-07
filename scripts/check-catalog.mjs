#!/usr/bin/env node
import { parseArgs } from "node:util";
import { Catalog } from "./lib/catalog.mjs";
import { CatalogCheck } from "./lib/catalog-check.mjs";
import { GitRepository } from "./lib/git-repository.mjs";
import { Orca } from "./lib/orca.mjs";
import { Sources } from "./lib/sources.mjs";

const { values } = parseArgs({ options: { base: { type: "string" } } });

const catalog = Catalog.read();
const problems = new CatalogCheck({
  catalog,
  sources: Sources.read(),
  repository: new GitRepository(),
  orca: Orca.install(),
  base: values.base,
}).run();

if (problems.length > 0) {
  console.error(problems.map((problem) => `- ${problem}`).join("\n"));
  process.exitCode = 1;
} else {
  console.log(
    `${catalog.path}: ${catalog.plugins.length} plugin(s), every release checked`,
  );
}
