import { CatalogAssets } from "./catalog-assets.mjs";
import { JsonFile } from "./json-file.mjs";

const CATALOG_PATH = "orca-catalog.json";
const CATALOG_URL = "https://github.com/miragon/orca-plugins.git";
const KEPT_RELEASES = 32;
const CHANGELOG_LENGTH = 2000;

export class Catalog {
  #content;

  constructor(content) {
    this.#content = content;
  }

  static read() {
    return new Catalog(new JsonFile(CATALOG_PATH).read());
  }

  static parse(text) {
    return new Catalog(JSON.parse(text));
  }

  static key(id) {
    return `miragon.${id}`;
  }

  get path() {
    return CATALOG_PATH;
  }

  get plugins() {
    return this.#content.plugins;
  }

  plugin(key) {
    return this.plugins.find((plugin) => plugin.id === key);
  }

  release(key, version) {
    return this.plugin(key)?.releases.find(
      (release) => release.version === version,
    );
  }

  refuseListed(plugin) {
    const key = Catalog.key(plugin.id);
    if (this.release(key, plugin.version)) {
      throw new Error(
        `${key} ${plugin.version} is listed already; a listed version never changes`,
      );
    }
  }

  list(plugin, entry) {
    const { manifest } = plugin;
    const release = {
      ...entry,
      ...(manifest.license ? { license: manifest.license } : {}),
      ...(manifest.repository ? { repository: manifest.repository } : {}),
      ...(manifest.homepage ? { homepage: manifest.homepage } : {}),
      updatedAt: new Date().toISOString().slice(0, 10),
      ...(plugin.changelog
        ? { changelog: plugin.changelog.slice(0, CHANGELOG_LENGTH) }
        : {}),
    };
    const listed = this.#listedOrNew(plugin);
    listed.releases = [release, ...listed.releases].slice(0, KEPT_RELEASES);
  }

  keepImages(plugin) {
    const listed = this.plugin(Catalog.key(plugin.id));
    if (listed) CatalogAssets.keep(listed);
  }

  write() {
    new JsonFile(CATALOG_PATH).write(this.#content);
  }

  #listedOrNew(plugin) {
    const key = Catalog.key(plugin.id);
    const listed = this.plugin(key);
    if (listed) return listed;
    const added = {
      id: key,
      source: {
        kind: "git",
        url: CATALOG_URL,
        ref: "main",
        path: plugin.target,
      },
      description: plugin.manifest.description,
      categories: ["editors", "diagrams"],
      releases: [],
    };
    this.plugins.push(added);
    return added;
  }
}
