export class ReleaseSource {
  #repository;
  #commit;
  #workflowRun;

  constructor({ repository, commit, workflowRun }) {
    this.#repository = repository;
    this.#commit = commit;
    this.#workflowRun = workflowRun;
  }

  get repository() {
    return this.#repository;
  }

  get shortCommit() {
    return this.#commit.slice(0, 12);
  }

  get label() {
    return `${this.#repository}@${this.shortCommit}`;
  }

  sourceFile(tag) {
    return {
      repository: this.#repository,
      commit: this.#commit,
      ...(tag ? { tag } : {}),
      ...(this.#workflowRun ? { workflowRun: this.#workflowRun } : {}),
    };
  }

  originLines() {
    return [
      `Source: ${this.#repository}@${this.#commit}`,
      ...(this.#workflowRun ? [`Run: ${this.#workflowRun}`] : []),
    ];
  }
}
