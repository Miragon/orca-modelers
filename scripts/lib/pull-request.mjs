import { setTimeout as sleep } from "node:timers/promises";
import { run, runOrThrow } from "./command.mjs";

const CHECKS_APPEAR_WITHIN_MS = 120_000;
const MERGE_ATTEMPTS = 3;

export class PullRequest {
  #url;

  constructor(url) {
    this.#url = url;
  }

  static open({ branch, title, body }) {
    const url = runOrThrow("gh", [
      "pr",
      "create",
      "--base",
      "main",
      "--head",
      branch,
      "--title",
      title,
      "--body",
      body,
    ]);
    return new PullRequest(url);
  }

  get url() {
    return this.#url;
  }

  async waitForRequiredChecks() {
    const givingUpOnMissingChecksAt = Date.now() + CHECKS_APPEAR_WITHIN_MS;
    for (;;) {
      const checks = this.#gh("checks", "--watch", "--required");
      if (checks.ok) return;
      const noChecksYet = /no (required )?checks reported/i.test(checks.output);
      if (!noChecksYet || Date.now() > givingUpOnMissingChecksAt) {
        throw new Error(`the required checks did not pass:\n${checks.output}`);
      }
      await sleep(10_000);
    }
  }

  async squashMerge(head) {
    for (let attempt = 1; ; attempt++) {
      const merge = this.#gh("merge", "--squash", "--match-head-commit", head);
      if (merge.ok) return;
      if (attempt >= MERGE_ATTEMPTS) {
        throw new Error(`merge failed:\n${merge.output}`);
      }
      await sleep(5_000);
    }
  }

  close() {
    this.#gh("close", "--delete-branch");
  }

  #gh(command, ...args) {
    return run("gh", ["pr", command, this.#url, ...args]);
  }
}
