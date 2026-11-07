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
  const [firstTheme, ...otherThemes] = listing.themes;
  await session.start(folder, firstTheme);
  const editors = listing.plugins.flatMap((plugin) => {
    const pluginKey = session.loadPlugin(plugin.folder);
    return plugin.examples.map(({ name }, index) => ({
      plugin,
      pluginKey,
      index,
      file: join(folder, name),
    }));
  });
  await session.openAll(editors);

  const shot = ({ plugin, index }, kind) =>
    join(shots, `${plugin.id}-${index}-${kind}.png`);
  const firstExamples = editors.filter(({ index }) => index === 0);
  const shootWindows = async (theme) => {
    for (const editor of editors) {
      await session.shootWindow(editor, shot(editor, `window-${theme}`), theme);
    }
  };
  await shootWindows(firstTheme);
  for (const editor of firstExamples) {
    session.shootEditor(editor, shot(editor, "editor"), firstTheme);
  }
  const features = listing.plugins.flatMap((plugin) =>
    plugin.features.map((feature) => ({
      plugin,
      feature,
      png: join(shots, `${plugin.id}-feature-${feature.name}.png`),
      editor: editors.find(
        (editor) =>
          editor.plugin === plugin &&
          editor.file === join(folder, feature.example),
      ),
    })),
  );
  for (const { plugin, feature, png, editor } of features) {
    console.log(`${plugin.id}: shooting ${feature.name}`);
    session.shootEditor(editor, png, firstTheme, {
      width: Cover.WIDTH,
      height: Cover.HEIGHT,
      act: feature.act,
    });
  }
  for (const theme of otherThemes) {
    await session.restart(theme);
    await session.openAll(editors);
    await shootWindows(theme);
  }

  for (const editor of firstExamples) {
    const { plugin } = editor;
    mkdirSync(plugin.out, { recursive: true });
    cover.render(
      plugin,
      shot(editor, "editor"),
      join(plugin.out, "cover.webp"),
      shots,
    );
  }
  for (const theme of listing.themes) {
    for (const editor of editors) {
      const { plugin, index } = editor;
      const number = index === 0 ? "" : `-${index + 1}`;
      const suffix = theme === "light" ? "" : `-${theme}`;
      const image = join(plugin.out, `screenshot-orca${number}${suffix}.webp`);
      chrome.webp(shot(editor, `window-${theme}`), image);
      console.log(`${plugin.id}: ${image}`);
    }
  }
  for (const { plugin, feature, png } of features) {
    const image = join(plugin.out, `feature-${feature.name}.webp`);
    chrome.webp(png, image);
    console.log(`${plugin.id}: ${image}`);
  }
} finally {
  await session.close();
  rmSync(shots, { recursive: true, force: true });
}
