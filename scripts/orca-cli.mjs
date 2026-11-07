#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import { Orca } from "./lib/orca.mjs";

const run = spawnSync(Orca.install().cli, process.argv.slice(2), {
  stdio: "inherit",
});
process.exitCode = run.status ?? 1;
