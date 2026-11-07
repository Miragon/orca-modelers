[![Validate](https://github.com/Miragon/orca-modelers/actions/workflows/validate.yml/badge.svg)](https://github.com/Miragon/orca-modelers/actions/workflows/validate.yml)
[![License: MIT](https://img.shields.io/github/license/Miragon/orca-modelers)](LICENSE)

# Miragon modelers for Orca

See the diagrams your agent writes, and edit them right next to it.

Open a Wardley map, an Event Storming board, a team topology, a context map, a value chain, a
BPMN process or a DMN decision in [Orca](https://www.onorca.dev), and it opens as a diagram instead
of text. The file stays plain text in your repository, so your agent reads and writes it like
code, and every change it makes shows up on the canvas.

- **Live while your agent writes.** Each change your agent makes to the file shows up on the
  canvas right away. If it writes while you have unsaved edits, Orca asks whether to reload or
  keep yours.
- **Files you can review.** Every diagram is a small text file: diff it, review it in a pull
  request, keep it next to the code it describes.
- **Fits Orca.** Light and dark follow Orca's theme; undo, save and export work as you expect.
- **Sandboxed.** The plugins have no network and no file access. They see only the file you open.

![An agent adds a payment provider to an Event Storming board in Orca, the user moves the order status read model and saves, then the agent adds a hotspot about double payments](docs/assets/demo.gif)

## Install

You need the Orca desktop app, version 1.4.248 or later, with plugins turned on (Settings →
Plugins → **Turn on plugins**).

| Modeler                                                                                        | Opens              | Plugin id                         | Directory                                                                                    |
| ---------------------------------------------------------------------------------------------- | ------------------ | --------------------------------- | -------------------------------------------------------------------------------------------- |
| [Event Storming](https://github.com/Miragon/modeler-suite/tree/main/modelers/event-storming)   | `.storm`           | `miragon.event-storming-modeler`  | [Open in Orca](https://www.onorca.dev/plugins/miragon/orca-modelers/event-storming-modeler)  |
| [Wardley Maps](https://github.com/Miragon/modeler-suite/tree/main/modelers/wardley-maps)       | `.wmap`, `.owm`    | `miragon.wardley-maps-modeler`    | [Open in Orca](https://www.onorca.dev/plugins/miragon/orca-modelers/wardley-maps-modeler)    |
| [Team Topologies](https://github.com/Miragon/modeler-suite/tree/main/modelers/team-topologies) | `.tt`, `.ttm.json` | `miragon.team-topologies-modeler` | [Open in Orca](https://www.onorca.dev/plugins/miragon/orca-modelers/team-topologies-modeler) |
| [Context Maps](https://github.com/Miragon/modeler-suite/tree/main/modelers/context-maps)       | `.cm`, `.cm.json`  | `miragon.context-maps-modeler`    | [Open in Orca](https://www.onorca.dev/plugins/miragon/orca-modelers/context-maps-modeler)    |
| [Value Chain](https://github.com/Miragon/modeler-suite/tree/main/modelers/value-chain)         | `.vc`, `.vc.json`  | `miragon.value-chain-modeler`     | [Open in Orca](https://www.onorca.dev/plugins/miragon/orca-modelers/value-chain-modeler)     |
| [BPMN & DMN](https://github.com/Miragon/bpmn-modeler) (experimental)                           | `.bpmn`, `.dmn`    | `miragon.bpmn-modeler`            | [Open in Orca](https://www.onorca.dev/plugins/miragon/orca-modelers/bpmn-modeler)            |
| [C4](https://github.com/Miragon/modeler-suite/tree/main/modelers/c4)                           | `.c4`, `.dsl`      | –                                 | Coming soon                                                                                  |

The BPMN & DMN modeler is experimental. It views BPMN processes and DMN decisions, simulates them and
models lightly. It does not deploy, jump into code or open forms yet, and it may change between
releases; its [guide](https://miragon.github.io/bpmn-modeler/orca/getting-started#limits) lists
what it leaves out.

### From Orca's plugin directory

Open a modeler's page in Orca's directory with **Open in Orca** in the table above, or search for
**Miragon** in Settings → Plugins, and install it.

### From this repository

Use this if a modeler or release is not in Orca's plugin directory yet.

1. In Settings → Plugins, open ⋯ → **Catalog sources…** and add
   `https://github.com/miragon/orca-modelers.git` with the ref `main`.
2. Install a modeler from the **Miragon Modelers** catalog and approve it.

Or paste an install link into your browser's address bar, for example
`orca://plugins/miragon.event-storming-modeler?catalog=https://github.com/miragon/orca-modelers.git`.
Orca asks whether to add the catalog the first time.

New releases reach you through the source you installed from.

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
built, or in [Miragon/bpmn-modeler](https://github.com/Miragon/bpmn-modeler/issues) for BPMN and
DMN. Report security issues privately, as described in [SECURITY.md](SECURITY.md). How the
plugins get here is in [CONTRIBUTING.md](CONTRIBUTING.md).

## License

[MIT](LICENSE) © Miragon
