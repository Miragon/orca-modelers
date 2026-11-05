# Miragon modelers for Orca

The [Miragon](https://www.miragon.io) modelers as [Orca](https://www.onorca.dev) custom editors,
and the one catalog that lists them. Open a `.storm`, `.wmap`, `.tt`, `.cm.json`, `.vc.json` or
`.c4` file in Orca and it shows as a diagram you can edit; an agent's change to the file while you
edit is merged with yours.

This repository holds no source code. Each plugin is built in its source repository
([Miragon/modeler-suite](https://github.com/Miragon/modeler-suite), later
[Miragon/bpmn-modeler](https://github.com/Miragon/bpmn-modeler)) and published here by its release.

## Install

Add the catalog once in Orca (Settings → Plugins → Catalogs):

```text
https://github.com/miragon/orca-modelers.git
```

or open a plugin's page directly:

| Plugin                  | Opens              | Install                                                                                                                         |
| ----------------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| Event Storming Modeler  | `.storm`           | [Open in Orca](https://onorca.dev/plugins/miragon.event-storming-modeler?catalog=https://github.com/miragon/orca-modelers.git)  |
| Wardley Maps Modeler    | `.wmap`, `.owm`    | [Open in Orca](https://onorca.dev/plugins/miragon.wardley-maps-modeler?catalog=https://github.com/miragon/orca-modelers.git)    |
| Team Topologies Modeler | `.tt`, `.ttm.json` | [Open in Orca](https://onorca.dev/plugins/miragon.team-topologies-modeler?catalog=https://github.com/miragon/orca-modelers.git) |
| Context Maps Modeler    | `.cm`, `.cm.json`  | [Open in Orca](https://onorca.dev/plugins/miragon.context-maps-modeler?catalog=https://github.com/miragon/orca-modelers.git)    |
| Value Chain Modeler     | `.vc`, `.vc.json`  | [Open in Orca](https://onorca.dev/plugins/miragon.value-chain-modeler?catalog=https://github.com/miragon/orca-modelers.git)     |
| C4 Modeler              | `.c4`, `.dsl`      | [Open in Orca](https://onorca.dev/plugins/miragon.c4-modeler?catalog=https://github.com/miragon/orca-modelers.git)              |

A plugin appears here once its first release is published. Each needs Orca 1.4.248 or later and
the desktop app.

## What a plugin may do

Every plugin runs as `sandboxed-ui` with no capabilities: it sees only the file Orca hands its
editor, has no network and no file system, and saves exports only through Orca's save dialog.

## How a release gets here

1. A release in the source repository builds the plugin and smoke-tests exactly that folder in a
   real Orca.
2. The source repository's release job calls [`publish-plugin`](.github/actions/publish-plugin/action.yml)
   with the release-please app's token. The action checks [`sources.json`](sources.json), which
   names the one repository that may publish each plugin, then makes two commits on `main`
   through GitHub's API (so both are signed): the built folder in `plugins/<id>/` with a
   `SOURCE.json` naming the source commit, tag and workflow run, then the release entry Orca
   computes for that commit (`orca plugin release-entry`) at the top of the plugin's releases in
   [`orca-catalog.json`](orca-catalog.json).
3. [`tag.yml`](.github/workflows/tag.yml) tags the catalog change with the next `vX.Y.Z`.

Each release pins its commit and the hash of its files; Orca refuses bytes that differ.
[`validate.yml`](.github/workflows/validate.yml) checks every plugin and the catalog on every push
and pull request, and fails when a listed version would change its commit or its bytes.

Only the release-please app pushes to `main` and creates tags; changes to the mechanics
(`.github/`, `scripts/`, `sources.json`) go through a reviewed pull request.

## Adding a source repository

Add the plugin id and the repository to `sources.json` in a pull request, give the release-please
app access to both repositories, and call the action from the source repository's release job:

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
