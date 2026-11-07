import { JsonFile } from "./json-file.mjs";

export class Sources {
  #plugins;

  constructor(plugins) {
    this.#plugins = plugins;
  }

  static read(path = "sources.json") {
    return new Sources(new JsonFile(path).read().plugins);
  }

  has(id) {
    return Boolean(this.#plugins[id]);
  }

  refuseUnlessFrom(id, repository) {
    const allowed = this.#plugins[id]?.repository;
    if (allowed?.toLowerCase() !== repository.toLowerCase()) {
      throw new Error(`${repository} may not publish ${id} (sources.json)`);
    }
  }
}
