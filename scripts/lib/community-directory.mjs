const DIRECTORY_FILES =
  "https://raw.githubusercontent.com/stablyai/orca-community-plugins/main";

export class CommunityDirectory {
  #status;
  #catalog;

  constructor({ status, catalog }) {
    this.#status = status;
    this.#catalog = catalog;
  }

  static async fetch() {
    const [status, catalog] = await Promise.all(
      ["status.json", "orca-catalog.json"].map(CommunityDirectory.#fetchJson),
    );
    return new CommunityDirectory({ status, catalog });
  }

  statusOf(repository) {
    return this.#status.repos[repository.toLowerCase()];
  }

  lists(id, version) {
    return this.#catalog.plugins.some(
      (plugin) =>
        plugin.id === id &&
        plugin.releases.some((release) => release.version === version),
    );
  }

  static async #fetchJson(file) {
    const response = await fetch(`${DIRECTORY_FILES}/${file}`);
    if (!response.ok) {
      throw new Error(`${DIRECTORY_FILES}/${file}: HTTP ${response.status}`);
    }
    return response.json();
  }
}
