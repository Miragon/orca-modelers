import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { Catalog } from "./catalog.mjs";

export class CatalogCheck {
  #catalog;
  #sources;
  #repository;
  #orca;
  #base;
  #problems = [];

  constructor({ catalog, sources, repository, orca, base }) {
    this.#catalog = catalog;
    this.#sources = sources;
    this.#repository = repository;
    this.#orca = orca;
    this.#base = base;
  }

  run() {
    this.#orca.validate(this.#catalog.path);
    for (const plugin of this.#catalog.plugins) this.#checkPlugin(plugin);
    if (this.#base) this.#checkListedReleasesKept();
    return this.#problems;
  }

  #checkPlugin(plugin) {
    const id = plugin.id.replace(/^miragon\./, "");
    if (plugin.id !== Catalog.key(id) || !this.#sources.has(id)) {
      this.#problems.push(`${plugin.id}: not in sources.json`);
      return;
    }
    if (plugin.source?.path !== `plugins/${id}`) {
      this.#problems.push(`${plugin.id}: source.path is not plugins/${id}`);
    }
    for (const release of plugin.releases)
      this.#checkRelease(plugin, id, release);
  }

  #checkRelease(plugin, id, release) {
    const at = `${plugin.id} ${release.version}`;
    if (!this.#repository.hasCommit(release.commit)) {
      this.#problems.push(`${at}: commit ${release.commit} does not exist`);
      return;
    }
    const manifest = this.#repository.fileAt(
      release.commit,
      `plugins/${id}/orca-plugin.json`,
    );
    if (!manifest || JSON.parse(manifest).version !== release.version) {
      this.#problems.push(
        `${at}: plugins/${id}/orca-plugin.json at ${release.commit} is not this version`,
      );
      return;
    }
    const hash = this.#contentHashAt(release.commit, id);
    if (hash !== release.contentHash) {
      this.#problems.push(
        `${at}: contentHash ${release.contentHash}, the commit's files hash to ${hash}`,
      );
    }
  }

  #contentHashAt(commit, id) {
    const checkout = mkdtempSync(join(tmpdir(), "orca-release-"));
    try {
      this.#repository.extract(commit, `plugins/${id}`, checkout);
      return this.#orca.contentHash(join(checkout, "plugins", id));
    } finally {
      rmSync(checkout, { recursive: true, force: true });
    }
  }

  #checkListedReleasesKept() {
    const before = this.#repository.fileAt(this.#base, this.#catalog.path);
    if (!before) return;
    for (const plugin of Catalog.parse(before).plugins) {
      for (const release of plugin.releases) {
        const kept = this.#catalog.release(plugin.id, release.version);
        const at = `${plugin.id} ${release.version}`;
        if (!kept) {
          this.#problems.push(`${at}: a listed release was removed`);
        } else if (
          kept.commit !== release.commit ||
          kept.contentHash !== release.contentHash
        ) {
          this.#problems.push(`${at}: a listed release changed its bytes`);
        }
      }
    }
  }
}
