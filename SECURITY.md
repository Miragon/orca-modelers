# Security

Report a vulnerability in a plugin or in this repository's publishing privately through GitHub's
[security advisories](https://github.com/miragon/orca-modelers/security/advisories/new), not in a
public issue.

## How releases are protected

- Each plugin may be published only from the repository `sources.json` names for it, by the
  release-please app, which alone creates tags.
- `main` changes only through squash-merged pull requests that pass `validate.yml`, the app's
  publishes included; GitHub signs each merge commit. What Orca trusts is still the catalog's
  address and the commit and content hash each release pins, not a commit signature.
- Each catalog release pins a full commit and the SHA-256 of the plugin's files; Orca installs
  nothing else. A listed version never changes: `validate.yml` refuses a catalog that would change
  one, and the tag ruleset keeps tags immutable.
- `SOURCE.json` in every plugin folder names the source commit, tag and workflow run, so the bytes
  can be traced back and rebuilt.
- The plugins run as `sandboxed-ui` without capabilities: no network, no file system, no access to
  Orca beyond the file their editor shows.
