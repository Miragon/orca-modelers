# Contributing

This repository holds no source code: only the built plugins, the catalog Orca reads and the
mechanics that publish into it. Each plugin is built in its source repository, today
[Miragon/modeler-suite](https://github.com/Miragon/modeler-suite). Report bugs and propose changes
to a modeler there.

Changes to the mechanics (`.github/`, `scripts/`, `sources.json`) go through a pull request with a
code owner's review. `plugins/` and `orca-catalog.json` change only through a release.

## How a release gets here

1. A release in the source repository builds the plugin and smoke-tests exactly that folder in a
   real Orca.
2. The source repository's release job calls [`publish-plugin`](.github/actions/publish-plugin/action.yml)
   with the release-please app's token. The action checks [`sources.json`](sources.json), which
   names the one repository that may publish each plugin. Then it makes two commits on `main`
   through GitHub's API:
   - the built folder in `plugins/<id>/`, with a `SOURCE.json` naming the source commit, tag and
     workflow run;
   - the release entry Orca computes for that commit (`orca plugin release-entry`), at the top of
     the plugin's releases in [`orca-catalog.json`](orca-catalog.json).
3. [`tag.yml`](.github/workflows/tag.yml) tags the catalog change with the next `vX.Y.Z`. The tag
   counts catalog changes; each plugin keeps its own version.

Each release pins its commit and the hash of its files, and Orca refuses bytes that differ.
[`validate.yml`](.github/workflows/validate.yml) checks every plugin and the catalog on every push
and pull request. It fails when a listed version would change its commit or its bytes.

Only the release-please app pushes to `main` and creates tags.

## Adding a source repository

Add the plugin id and the repository to `sources.json` in a pull request, give the release-please
app access to the source repository, and call the action from its release job:

```yaml
publish-orca:
  concurrency: orca-modelers-publish
  steps:
    - uses: actions/create-github-app-token@64ab729a6294000f5aa4a4bc0b73d1f32bc45510 # v3.3.0
      id: app
      with:
        client-id: ${{ vars.RELEASE_PLEASE_APP_CLIENT_ID }}
        private-key: ${{ secrets.RELEASE_PLEASE_APP_PRIVATE_KEY }}
        owner: miragon
        repositories: orca-modelers
    - uses: miragon/orca-modelers/.github/actions/publish-plugin@<sha>
      with:
        token: ${{ steps.app.outputs.token }}
        plugin-id: bpmn-modeler
        plugin-dir: apps/orca/plugin
        source-repo: ${{ github.repository }}
        source-ref: ${{ github.sha }}
```

The concurrency group serializes publishes from every source repository.
