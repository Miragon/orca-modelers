import { Catalog } from "./catalog.mjs";
import { PullRequest } from "./pull-request.mjs";

const BYTES_GREETING = "📦 Special delivery: fresh bytes from the deep sea.";
const CATALOG_GREETING = "✅ Delivered. Signed, sealed, listed.";

export class Publication {
  #plugins;
  #source;
  #runKey;
  #sources;
  #repository;
  #api;
  #orca;

  constructor({ plugins, source, runKey, sources, repository, api, orca }) {
    this.#plugins = plugins;
    this.#source = source;
    this.#runKey = runKey;
    this.#sources = sources;
    this.#repository = repository;
    this.#api = api;
    this.#orca = orca;
  }

  async run() {
    this.#refuseUnpublishable();
    await this.#publishBytes();
    await this.#listInCatalog();
    console.log(`published ${this.#labels()}`);
  }

  #refuseUnpublishable() {
    const catalog = Catalog.read();
    for (const plugin of this.#plugins) {
      this.#sources.refuseUnlessFrom(plugin.id, this.#source.repository);
      this.#orca.validate(plugin.folder);
      catalog.refuseListed(plugin);
    }
  }

  async #publishBytes() {
    this.#repository.checkOutLatestMain();
    for (const plugin of this.#plugins) plugin.placeInTarget(this.#source);
    this.#repository.stage("plugins/");
    if (!this.#repository.hasStagedChanges()) {
      console.log(
        `plugins/ on main holds these bytes already: ${this.#labels()}`,
      );
      return;
    }
    await this.#propose({
      branch: "plugins",
      title: `feat: publish plugins from ${this.#source.label}`,
      greeting: BYTES_GREETING,
    });
  }

  async #listInCatalog() {
    this.#repository.checkOutLatestMain();
    const catalog = Catalog.read();
    for (const plugin of this.#plugins) {
      catalog.list(plugin, this.#orca.releaseEntry(plugin.target));
    }
    catalog.write();
    this.#repository.stage(catalog.path);
    await this.#propose({
      branch: "catalog",
      title: `feat: list plugins from ${this.#source.label} in the catalog`,
      greeting: CATALOG_GREETING,
    });
  }

  async #propose({ branch, title, greeting }) {
    const body = this.#describe(greeting);
    const head = await this.#api.createSignedCommit({
      parent: this.#repository.head(),
      message: `${title}\n\n${body}`,
      ...this.#repository.stagedChanges(),
    });
    const branchName = `publish/${this.#source.shortCommit}-${this.#runKey}-${branch}`;
    await this.#api.createBranch(branchName, head);
    const pullRequest = PullRequest.open({ branch: branchName, title, body });
    try {
      await pullRequest.waitForRequiredChecks();
      await pullRequest.squashMerge(head);
      console.log(`merged ${pullRequest.url}`);
    } catch (error) {
      pullRequest.close();
      throw new Error(`${pullRequest.url} closed: ${error.message}`);
    }
  }

  #describe(greeting) {
    const releases = this.#plugins.map(
      (plugin) =>
        `- ${plugin.label}${plugin.tag ? ` · \`${plugin.tag}\`` : ""}`,
    );
    return [
      greeting,
      releases.join("\n"),
      this.#source.originLines().join("\n"),
    ].join("\n\n");
  }

  #labels() {
    return this.#plugins.map((plugin) => plugin.label).join(", ");
  }
}
