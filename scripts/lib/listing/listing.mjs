import { copyFileSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { basename, dirname, join, resolve } from "node:path";
import { JsonFile } from "../json-file.mjs";

export class Listing {
  #folderName;
  #plugins;

  constructor({ folderName, plugins }) {
    this.#folderName = folderName;
    this.#plugins = plugins;
  }

  static read(path) {
    const base = dirname(resolve(path));
    const { folder = "strategy-workshop", plugins } = new JsonFile(path).read();
    if (!plugins?.length) throw new Error(`${path} lists no plugin`);
    return new Listing({
      folderName: folder,
      plugins: plugins.map((entry) => ListedPlugin.from(entry, base)),
    });
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
    for (const plugin of this.#plugins) {
      copyFileSync(plugin.example, join(folder, plugin.name));
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
  #example;
  #name;
  #title;
  #claim;
  #out;

  constructor({ folder, manifest, example, name, title, claim, out }) {
    this.#folder = folder;
    this.#manifest = manifest;
    this.#example = example;
    this.#name = name;
    this.#title = title;
    this.#claim = claim;
    this.#out = out;
  }

  static from(entry, base) {
    for (const key of ["plugin", "example", "title", "claim", "out"]) {
      if (!entry[key]) throw new Error(`a listed plugin needs "${key}"`);
    }
    const folder = resolve(base, entry.plugin);
    const manifest = new JsonFile(join(folder, "orca-plugin.json")).read();
    if (!manifest.icon) throw new Error(`${folder}: the manifest has no icon`);
    return new ListedPlugin({
      folder,
      manifest,
      example: resolve(base, entry.example),
      name: entry.name ?? basename(entry.example),
      title: entry.title,
      claim: entry.claim,
      out: resolve(base, entry.out),
    });
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

  get example() {
    return this.#example;
  }

  get name() {
    return this.#name;
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
