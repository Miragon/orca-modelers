import { cpSync, readdirSync, rmSync } from "node:fs";
import { join } from "node:path";
import { JsonFile } from "./json-file.mjs";

export class BuiltPlugin {
  #folder;
  #manifest;
  #release;

  constructor({ folder, manifest, release }) {
    this.#folder = folder;
    this.#manifest = manifest;
    this.#release = release;
  }

  static load(artifact) {
    const folder = join(artifact, "plugin");
    return new BuiltPlugin({
      folder,
      manifest: new JsonFile(join(folder, "orca-plugin.json")).read(),
      release: new JsonFile(join(artifact, "release.json")).read(),
    });
  }

  static loadAll(pluginsDirectory) {
    const plugins = readdirSync(pluginsDirectory, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => BuiltPlugin.load(join(pluginsDirectory, entry.name)));
    if (plugins.length === 0) {
      throw new Error(`${pluginsDirectory} holds no built plugin`);
    }
    return plugins;
  }

  get folder() {
    return this.#folder;
  }

  get manifest() {
    return this.#manifest;
  }

  get id() {
    return this.#manifest.id;
  }

  get version() {
    return this.#manifest.version;
  }

  get tag() {
    return this.#release.tag;
  }

  get changelog() {
    return this.#release.changelog;
  }

  get label() {
    return `${this.id} ${this.version}`;
  }

  get target() {
    return `plugins/${this.id}`;
  }

  placeInTarget(source) {
    rmSync(this.target, { recursive: true, force: true });
    cpSync(this.#folder, this.target, { recursive: true });
    new JsonFile(join(this.target, "SOURCE.json")).write(
      source.sourceFile(this.tag),
    );
  }
}
