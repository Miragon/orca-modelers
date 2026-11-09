#!/usr/bin/env node
import { Orca } from "./lib/orca.mjs";
import { PluginFolderCheck } from "./lib/plugin-folder-check.mjs";

const [folder] = process.argv.slice(2);
if (!folder) throw new Error("usage: check-plugin.mjs <plugin folder>");

new PluginFolderCheck(Orca.install()).refuseInvalid(folder);
console.log(`${folder}: valid`);
