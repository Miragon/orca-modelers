// The GitHub REST calls the publish needs. Commits made through the API with the release-please
// app's installation token are signed by GitHub, so every commit on main is verified.
const API = "https://api.github.com";

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
      const error = new Error(`${method} ${path}: ${response.status} ${text}`);
      error.status = response.status;
      throw error;
    }
    return text ? JSON.parse(text) : undefined;
  }
  return {
    call,
    head: async (branch) =>
      (await call("GET", `/git/ref/heads/${branch}`)).object.sha,
    async commitFiles({ parent, message, files, removed = [] }) {
      const base = await call("GET", `/git/commits/${parent}`);
      const tree = [
        ...(await Promise.all(
          files.map(async ({ path, content, mode = "100644" }) => ({
            path,
            mode,
            type: "blob",
            sha: (
              await call("POST", "/git/blobs", {
                content: content.toString("base64"),
                encoding: "base64",
              })
            ).sha,
          })),
        )),
        ...removed.map((path) => ({
          path,
          mode: "100644",
          type: "blob",
          sha: null,
        })),
      ];
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
    moveBranch: (branch, sha) =>
      call("PATCH", `/git/refs/heads/${branch}`, { sha, force: false }),
  };
}
