const API = process.env.GITHUB_API_URL ?? "https://api.github.com";

export class GitHubApi {
  #token;
  #repository;

  constructor({ token, repository }) {
    this.#token = token;
    this.#repository = repository;
  }

  async createSignedCommit({ parent, message, files, removed }) {
    const base = await this.#call("GET", `/git/commits/${parent}`);
    const tree = removed.map((path) => ({
      path,
      mode: "100644",
      type: "blob",
      sha: null,
    }));
    for (const { path, content, mode } of files) {
      const blob = await this.#call("POST", "/git/blobs", {
        content: content.toString("base64"),
        encoding: "base64",
      });
      tree.push({ path, mode, type: "blob", sha: blob.sha });
    }
    const created = await this.#call("POST", "/git/trees", {
      base_tree: base.tree.sha,
      tree,
    });
    const commit = await this.#call("POST", "/git/commits", {
      message,
      tree: created.sha,
      parents: [parent],
    });
    return commit.sha;
  }

  createBranch(branch, sha) {
    return this.#call("POST", "/git/refs", {
      ref: `refs/heads/${branch}`,
      sha,
    });
  }

  async #call(method, path, body) {
    const response = await fetch(`${API}/repos/${this.#repository}${path}`, {
      method,
      headers: {
        authorization: `Bearer ${this.#token}`,
        accept: "application/vnd.github+json",
        "x-github-api-version": "2022-11-28",
        ...(body ? { "content-type": "application/json" } : {}),
      },
      ...(body ? { body: JSON.stringify(body) } : {}),
    });
    const text = await response.text();
    if (!response.ok) {
      throw new Error(`${method} ${path}: ${response.status} ${text}`);
    }
    return text ? JSON.parse(text) : undefined;
  }
}
