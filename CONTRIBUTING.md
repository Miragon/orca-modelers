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

## Images for a plugin's page

Orca's plugin directory shows a plugin's `cover` and `screenshots` from its manifest. Make them with
`scripts/listing-images.mjs` from a checkout of this repository, for the built plugins of a source
repository. Per plugin it writes a `cover.webp` (1600×1000: the plugin's icon, "Miragon Modeler",
title and claim on Miragon's blue, which turns green towards the top right, next to the editor of
the first example) and per example and theme a shot of the editor in a whole Orca window
(`screenshot-orca.webp`, then `screenshot-orca-2.webp` and so on; `-dark` before `.webp` in the
dark theme). Orca runs on a throwaway profile with a demo folder of the examples, so the images
hold nothing of the machine that makes them.

List the plugins in a file of the source repository; paths are relative to it:

```json
{
  "folder": "strategy-workshop",
  "themes": ["light", "dark"],
  "plugins": [
    {
      "plugin": "modelers/context-maps/apps/orca/plugin",
      "examples": [
        {
          "file": "modelers/context-maps/example/sample.cm",
          "name": "conference-program.cm"
        }
      ],
      "title": "Context Maps",
      "claim": "Context maps from plain .cm files, edited by you and your agents.",
      "out": "modelers/context-maps/apps/orca/images"
    }
  ]
}
```

`themes` defaults to `["light"]`; Orca starts once per theme. `name` is the example's file name in
the demo folder (its own name by default) and must be unique across the listing, `out` the folder
the images go to. The script needs Linux with a display, Node
22.13 or later, Chrome or Chromium (`CHROME`, a `chrome-headless-shell` or Chrome on the `PATH`, or
Playwright's) and network access to GitHub (Orca's release) and jsDelivr (the Geist font). On
Linux:

```sh
xvfb-run -a -s "-screen 0 1920x1200x24" \
  node --no-warnings /path/to/orca-modelers/scripts/listing-images.mjs --listing orca-listing.json
```

On macOS, where Orca's window would take the focus, run it in Playwright's image, from the source
repository after building its plugins:

```sh
podman run --rm --init -v "$PWD":/work -w /work \
  -v /path/to/orca-modelers:/orca-modelers:ro \
  -v orca-cache:/orca-cache -e RUNNER_TEMP=/orca-cache \
  mcr.microsoft.com/playwright:v1.56.1-noble \
  xvfb-run -a -s "-screen 0 1920x1200x24" \
  node --no-warnings /orca-modelers/scripts/listing-images.mjs --listing orca-listing.json
```

Docker takes the same arguments. Keep `--init`: as the container's first process, `xvfb-run`
waits forever for its display. The `orca-cache` volume keeps the downloaded Orca between runs
(`ORCA_VERSION` picks another release).

Then declare the images in each `orca-plugin.json` (paths relative to the plugin) and have the
build copy them into the plugin folder:

```json
"cover": { "path": "images/cover.webp", "alt": "…" },
"screenshots": [
  { "path": "images/cover.webp", "alt": "…", "caption": "…" },
  { "path": "images/screenshot-orca.webp", "alt": "…", "caption": "Runs right inside Orca, next to your files" },
  { "path": "images/screenshot-orca-dark.webp", "alt": "…", "caption": "…", "theme": "dark" },
  { "path": "images/screenshot-orca-2.webp", "alt": "…", "caption": "…" }
]
```

Orca's limits: a cover at least 800×500 and at most 1024 KB, screenshots at least 1280×800 and at
most 1536 KB, at most 6 (the cover first, then examples times themes), `alt` at most 160 and
`caption` at most 120 characters; 16:10 is recommended. `orca plugin validate` checks them.
