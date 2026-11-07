#!/usr/bin/env node
import { mkdirSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { parseArgs } from "node:util";
import { Chrome } from "./lib/listing/chrome.mjs";
import { Cover } from "./lib/listing/cover.mjs";
import { Listing } from "./lib/listing/listing.mjs";
import { OrcaSession } from "./lib/listing/orca-session.mjs";
import { Orca } from "./lib/orca.mjs";

const { values } = parseArgs({ options: { listing: { type: "string" } } });
if (!values.listing) throw new Error("--listing is required");

const listing = Listing.read(values.listing);
const chrome = Chrome.find();
const cover = await Cover.create(chrome);
console.log("installing Orca");
const session = new OrcaSession(Orca.install());
const shots = mkdtempSync(join(tmpdir(), "orca-listing-shots-"));
try {
  console.log("starting Orca on a throwaway profile");
  const folder = listing.writeDemoFolder();
  await session.start(folder);
  const editors = listing.plugins.map((plugin) => ({
    plugin,
    pluginKey: session.loadPlugin(plugin.folder),
    file: join(folder, plugin.name),
  }));
  await session.openAll(editors);

  const shot = (plugin, kind) => join(shots, `${plugin.id}-${kind}.png`);
  for (const editor of editors) {
    await session.shootWindow(editor, shot(editor.plugin, "window"));
  }
  for (const editor of editors) {
    session.shootEditor(editor, shot(editor.plugin, "editor"));
  }

  for (const { plugin } of editors) {
    mkdirSync(plugin.out, { recursive: true });
    cover.render(
      plugin,
      shot(plugin, "editor"),
      join(plugin.out, "cover.webp"),
      shots,
    );
    chrome.webp(
      shot(plugin, "window"),
      join(plugin.out, "screenshot-orca.webp"),
    );
    console.log(`${plugin.id}: ${plugin.out}`);
  }
} finally {
  await session.close();
  rmSync(shots, { recursive: true, force: true });
}
