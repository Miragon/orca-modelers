import { copyFileSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { basename, dirname, join, resolve } from "node:path";
import { JsonFile } from "../json-file.mjs";

const THEMES = ["light", "dark"];

export class Listing {
  #folderName;
  #themes;
  #plugins;

  constructor({ folderName, themes, plugins }) {
    this.#folderName = folderName;
    this.#themes = themes;
    this.#plugins = plugins;
  }

  static read(path) {
    const base = dirname(resolve(path));
    const {
      folder = "strategy-workshop",
      themes = ["light"],
      plugins,
    } = new JsonFile(path).read();
    if (!plugins?.length) throw new Error(`${path} lists no plugin`);
    if (!themes.length || themes.some((theme) => !THEMES.includes(theme))) {
      throw new Error(`${path}: "themes" takes "light" and "dark"`);
    }
    return new Listing({
      folderName: folder,
      themes,
      plugins: plugins.map((entry) => ListedPlugin.from(entry, base)),
    });
  }

  get themes() {
    return this.#themes;
  }

  get plugins() {
    return this.#plugins;
  }

  // Orca shows this folder's path, so a short one under /workspace reads best.
  writeDemoFolder() {
    const folder = Listing.#emptyFolder(this.#folderName);
    writeFileSync(
      join(folder, "README.md"),
      `# ${this.#folderName}\n\nThe maps, boards and diagrams of our workshop.\n`,
    );
    const names = new Set();
    for (const { file, name } of this.#plugins.flatMap((p) => p.examples)) {
      if (names.has(name)) throw new Error(`two examples are named ${name}`);
      names.add(name);
      copyFileSync(file, join(folder, name));
    }
    return folder;
  }

  static #emptyFolder(name) {
    for (const parent of ["/workspace", tmpdir()]) {
      const folder = join(parent, name);
      try {
        rmSync(folder, { recursive: true, force: true });
        mkdirSync(folder, { recursive: true });
        return folder;
      } catch {
        continue;
      }
    }
    throw new Error(`no writable folder for ${name}`);
  }
}

export class ListedPlugin {
  #folder;
  #manifest;
  #examples;
  #features;
  #title;
  #claim;
  #out;

  constructor({ folder, manifest, examples, features, title, claim, out }) {
    this.#folder = folder;
    this.#manifest = manifest;
    this.#examples = examples;
    this.#features = features;
    this.#title = title;
    this.#claim = claim;
    this.#out = out;
  }

  static from(entry, base) {
    for (const key of ["plugin", "examples", "title", "claim", "out"]) {
      if (!entry[key]) throw new Error(`a listed plugin needs "${key}"`);
    }
    if (!entry.examples.length) {
      throw new Error(`${entry.plugin}: "examples" is empty`);
    }
    const folder = resolve(base, entry.plugin);
    const manifest = new JsonFile(join(folder, "orca-plugin.json")).read();
    if (!manifest.icon) throw new Error(`${folder}: the manifest has no icon`);
    const examples = entry.examples.map(({ file, name }) => ({
      file: resolve(base, file),
      name: name ?? basename(file),
    }));
    return new ListedPlugin({
      folder,
      manifest,
      examples,
      features: (entry.features ?? []).map((feature) =>
        ListedPlugin.#feature(feature, examples, entry.plugin),
      ),
      title: entry.title,
      claim: entry.claim,
      out: resolve(base, entry.out),
    });
  }

  static #feature({ name, example, act = [] }, examples, plugin) {
    if (!name) throw new Error(`${plugin}: a feature needs "name"`);
    const shown = example ?? examples[0].name;
    if (!examples.some((listed) => listed.name === shown)) {
      throw new Error(
        `${plugin}: feature ${name} shows ${shown}, no listed example`,
      );
    }
    return { name, example: shown, act };
  }

  get id() {
    return this.#manifest.id;
  }

  get folder() {
    return this.#folder;
  }

  get icon() {
    return join(this.#folder, this.#manifest.icon);
  }

  get examples() {
    return this.#examples;
  }

  get features() {
    return this.#features;
  }

  get title() {
    return this.#title;
  }

  get claim() {
    return this.#claim;
  }

  get out() {
    return this.#out;
  }
}
