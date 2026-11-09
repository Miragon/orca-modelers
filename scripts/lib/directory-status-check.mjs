const GRACE_HOURS = 6;
const HOUR = 60 * 60 * 1000;

export class DirectoryStatusCheck {
  #directory;
  #catalog;
  #repository;
  #now;

  constructor({ directory, catalog, repository, now = new Date() }) {
    this.#directory = directory;
    this.#catalog = catalog;
    this.#repository = repository;
    this.#now = now;
  }

  run() {
    return [
      ...this.#repositoryProblems(),
      ...this.#catalog.plugins.flatMap((plugin) =>
        this.#newestReleaseProblems(plugin),
      ),
    ];
  }

  #repositoryProblems() {
    const name = this.#repository.githubRepository;
    const status = this.#directory.statusOf(name);
    if (!status) return [`${name}: not in the directory's status.json`];
    if (status.state === "listed") return [];
    const reasons = [
      ...(status.reasons ?? []).map((reason) => ({ of: name, ...reason })),
      ...(status.plugins ?? []).flatMap((plugin) =>
        (plugin.reasons ?? []).map((reason) => ({ of: plugin.id, ...reason })),
      ),
    ];
    return [
      `${name} is ${status.state}`,
      ...reasons.map(
        ({ of, category, detail }) =>
          `${of}: ${category}${detail ? `: ${detail}` : ""}`,
      ),
    ];
  }

  #newestReleaseProblems(plugin) {
    const [newest] = plugin.releases;
    if (this.#directory.lists(plugin.id, newest.version)) return [];
    const hours =
      (this.#now - this.#repository.commitDate(newest.commit)) / HOUR;
    if (hours < GRACE_HOURS) return [];
    return [
      `${plugin.id} ${newest.version}: not in the directory's catalog ${Math.floor(hours)} hours after its commit`,
    ];
  }
}
