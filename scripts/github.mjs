// The GitHub REST calls that create the publish commits. A commit an app creates through the API is
// signed by GitHub, which the ruleset on main requires of every commit in a pull request.
const API = process.env.GITHUB_API_URL ?? "https://api.github.com";

export function github(token, repository) {
  async function call(method, path, body) {
    const response = await fetch(`${API}/repos/${repository}${path}`, {
      method,
      headers: {
        authorization: `Bearer ${token}`,
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
  return {
    async commitFiles({ parent, message, files, removed }) {
      const base = await call("GET", `/git/commits/${parent}`);
      const tree = removed.map((path) => ({
        path,
        mode: "100644",
        type: "blob",
        sha: null,
      }));
      for (const { path, content, mode } of files) {
        const blob = await call("POST", "/git/blobs", {
          content: content.toString("base64"),
          encoding: "base64",
        });
        tree.push({ path, mode, type: "blob", sha: blob.sha });
      }
      const created = await call("POST", "/git/trees", {
        base_tree: base.tree.sha,
        tree,
      });
      return (
        await call("POST", "/git/commits", {
          message,
          tree: created.sha,
          parents: [parent],
        })
      ).sha;
    },
    createBranch: (branch, sha) =>
      call("POST", "/git/refs", { ref: `refs/heads/${branch}`, sha }),
  };
}
