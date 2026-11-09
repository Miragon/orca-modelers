import { readFileSync } from "node:fs";
import { run, runOrThrow } from "./command.mjs";

export class GitRepository {
  get githubRepository() {
    const origin = this.#git("config", "--get", "remote.origin.url");
    const match = /github\.com[/:]([^/]+\/[^/]+?)(?:\.git)?$/.exec(origin);
    if (!match) throw new Error(`origin ${origin} is no GitHub repository`);
    return match[1];
  }

  head() {
    return this.#git("rev-parse", "HEAD");
  }

  checkOutLatestMain() {
    this.#git("reset", "--quiet", "--hard");
    this.#git("fetch", "--quiet", "origin", "main");
    this.#git("checkout", "--quiet", "--detach", "origin/main");
  }

  stage(path) {
    this.#git("add", "-A", path);
  }

  hasStagedChanges() {
    return !run("git", ["diff", "--cached", "--quiet"]).ok;
  }

  stagedChanges() {
    const fields = this.#git("diff", "--cached", "--raw", "--no-renames", "-z")
      .split("\0")
      .filter(Boolean);
    const files = [];
    const removed = [];
    for (let index = 0; index < fields.length; index += 2) {
      const [, mode, , , status] = fields[index].split(" ");
      const path = fields[index + 1];
      if (status === "D") removed.push(path);
      else files.push({ path, mode, content: readFileSync(path) });
    }
    return { files, removed };
  }

  hasCommit(commit) {
    return run("git", ["cat-file", "-e", `${commit}^{commit}`]).ok;
  }

  commitDate(commit) {
    return new Date(this.#git("show", "--no-patch", "--format=%cI", commit));
  }

  fileAt(commit, path) {
    const show = run("git", ["show", `${commit}:${path}`]);
    return show.ok ? show.stdout : undefined;
  }

  extract(commit, path, directory) {
    runOrThrow("sh", [
      "-c",
      'git archive "$0" "$1" | tar -x -C "$2"',
      commit,
      path,
      directory,
    ]);
  }

  #git(...args) {
    return runOrThrow("git", args);
  }
}
