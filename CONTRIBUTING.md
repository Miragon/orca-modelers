# Contributing

This repository holds no source code: only the built plugins, the catalog Orca reads and the
mechanics that publish into it. Each plugin is built in its source repository, today
[Miragon/modeler-suite](https://github.com/Miragon/modeler-suite). Report bugs and propose changes
to a modeler there.

Changes to the mechanics (`.github/`, `scripts/`, `sources.json`) go through a pull request with a
code owner's review. `plugins/` and `orca-catalog.json` change only through a release.

## How a release gets here

1. A release in the source repository builds its plugins and smoke-tests exactly those folders in a
   real Orca.
2. The source repository's release job calls [`publish-plugin`](.github/actions/publish-plugin/action.yml)
   once, with all plugins of the release and the release-please app's token. The action checks
   each plugin against [`sources.json`](sources.json), which names the one repository that may
   publish it, and validates it. Then the app opens two pull requests, one after the other, and
   squash-merges each once [`validate`](.github/workflows/validate.yml) passes:
   - the built folders in `plugins/<id>/`, each with a `SOURCE.json` naming the source commit, tag
     and workflow run;
   - the release entry Orca computes for `main` after that merge (`orca plugin release-entry`), at
     the top of each plugin's releases in [`orca-catalog.json`](orca-catalog.json).
3. [`tag.yml`](.github/workflows/tag.yml) tags the catalog change with the next `vX.Y.Z`. The tag
   counts catalog changes, one per release; each plugin keeps its own version.

If a pull request fails, the action closes it and fails. Run the job again: a re-run finds the
bytes on `main` already and opens only the catalog pull request.

Each release pins its commit and the hash of its files, and Orca refuses bytes that differ.
`validate` checks every plugin and the catalog on every push and pull request. It fails when a
listed version would change its commit or its bytes.

`plugins/` and the catalog change only through the release-please app's pull requests. Only the
app creates tags.

## Adding a source repository

Add the plugin id and the repository to `sources.json` in a pull request, and give the
release-please app access to the source repository. Build each plugin in its own job, and upload
the built `plugin/` folder with a `release.json` (`{"tag": "...", "changelog": "..."}`) as an
artifact named `orca-plugin-<id>`. Then call the action once, from a job that needs all of them:

```yaml
publish-orca:
  needs: build-orca
  steps:
    - uses: actions/download-artifact@9000827ccba6bdab643e8b6fd33ac0654aef8333 # v8.0.2
      with:
        pattern: orca-plugin-*
        path: orca-plugins
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
        plugins-dir: orca-plugins
        source-repo: ${{ github.repository }}
        source-ref: ${{ github.sha }}
```

Publishes from different source repositories may overlap: a GitHub concurrency group only applies
within one repository, so it can't serialize them. A pull request that conflicts with one merged
in the meantime fails; run the job again.
