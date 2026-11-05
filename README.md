[![Validate](https://github.com/Miragon/orca-modelers/actions/workflows/validate.yml/badge.svg)](https://github.com/Miragon/orca-modelers/actions/workflows/validate.yml)
[![License: MIT](https://img.shields.io/github/license/Miragon/orca-modelers)](LICENSE)

# Miragon modelers for Orca

See the diagrams your agent writes, and edit them right next to it.

Open a Wardley map, an Event Storming board, a team topology, a context map or a value chain in
[Orca](https://www.onorca.dev), and it opens as a diagram instead of text. The file stays plain
text in your repository, so your agent reads and writes it like code, and every change it makes
shows up on the canvas.

- **Edit while your agent edits.** When the agent changes the file while you have unsaved edits,
  both changes are kept. Only when you both changed the same element does Orca ask which version
  wins.
- **Files you can review.** Every diagram is a small text file: diff it, review it in a pull
  request, keep it next to the code it describes.
- **Fits Orca.** Light and dark follow Orca's theme; undo, save and export work as you expect.
- **Sandboxed.** The plugins have no network and no file access. They see only the file you open.

## Install

Open a plugin's page in Orca and press **Install**:

| Modeler                                                                                        | Opens              | Install                                                                                                                         |
| ---------------------------------------------------------------------------------------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| [Event Storming](https://github.com/Miragon/modeler-suite/tree/main/modelers/event-storming)   | `.storm`           | [Open in Orca](https://onorca.dev/plugins/miragon.event-storming-modeler?catalog=https://github.com/miragon/orca-modelers.git)  |
| [Wardley Maps](https://github.com/Miragon/modeler-suite/tree/main/modelers/wardley-maps)       | `.wmap`, `.owm`    | [Open in Orca](https://onorca.dev/plugins/miragon.wardley-maps-modeler?catalog=https://github.com/miragon/orca-modelers.git)    |
| [Team Topologies](https://github.com/Miragon/modeler-suite/tree/main/modelers/team-topologies) | `.tt`, `.ttm.json` | [Open in Orca](https://onorca.dev/plugins/miragon.team-topologies-modeler?catalog=https://github.com/miragon/orca-modelers.git) |
| [Context Maps](https://github.com/Miragon/modeler-suite/tree/main/modelers/context-maps)       | `.cm`, `.cm.json`  | [Open in Orca](https://onorca.dev/plugins/miragon.context-maps-modeler?catalog=https://github.com/miragon/orca-modelers.git)    |
| [Value Chain](https://github.com/Miragon/modeler-suite/tree/main/modelers/value-chain)         | `.vc`, `.vc.json`  | [Open in Orca](https://onorca.dev/plugins/miragon.value-chain-modeler?catalog=https://github.com/miragon/orca-modelers.git)     |

The first time, Orca asks whether to add this catalog. New releases reach you through the same
catalog. You need the Orca desktop app, version 1.4.248 or later. The C4 model follows.

## Let your agent write the diagrams

The [Miragon modeler suite](https://github.com/Miragon/modeler-suite) has Claude Code plugins that
teach an agent the file formats and the methods behind them, so it can draft a map or review a
board for you:

```text
/plugin marketplace add Miragon/modeler-suite
/plugin install event-storming-modeler@modeler-suite
```

## Feedback

Found a bug or missing something? Open an issue in
[Miragon/modeler-suite](https://github.com/Miragon/modeler-suite/issues), where the modelers are
built. Report security issues privately, as described in [SECURITY.md](SECURITY.md). How the
plugins get here is in [CONTRIBUTING.md](CONTRIBUTING.md).

## License

[MIT](LICENSE) © Miragon
