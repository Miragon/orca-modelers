import { spawnSync } from "node:child_process";
import { join } from "node:path";

export class Orca {
  #cli;
  #version;

  constructor(cli, version) {
    this.#cli = cli;
    this.#version = version;
  }

  static fromEnvironment({ ORCA_APP, ORCA_VERSION } = process.env) {
    if (!ORCA_APP || !ORCA_VERSION) {
      throw new Error(
        "Set ORCA_APP and ORCA_VERSION to an installed Orca, as setup-orca of Miragon/orca-plugin-kit does with the release in .orca-version",
      );
    }
    return new Orca(
      join(ORCA_APP, "resources", "bin", "orca-ide"),
      ORCA_VERSION,
    );
  }

  get cli() {
    return this.#cli;
  }

  get version() {
    return this.#version;
  }

  validate(path) {
    return this.#json(["plugin", "validate", path]);
  }

  contentHash(pluginFolder) {
    const inspected = this.#json(["plugin", "inspect", pluginFolder]);
    return inspected.contentHash ?? inspected.plugin?.contentHash;
  }

  releaseEntry(pluginFolder) {
    return this.#json(["plugin", "release-entry", pluginFolder]).entry;
  }

  call(args, { env, timeout, allowFailure = false } = {}) {
    const run = spawnSync(this.#cli, [...args, "--json"], {
      encoding: "utf8",
      env,
      timeout,
    });
    let parsed;
    try {
      parsed = JSON.parse(run.stdout);
    } catch {
      parsed = {
        ok: false,
        error: { message: `${run.stdout}${run.stderr}`.trim() },
      };
    }
    if (!allowFailure && (parsed.ok === false || run.status !== 0)) {
      throw new Error(
        `orca ${args.join(" ")}: ${JSON.stringify(parsed.error ?? parsed)}`,
      );
    }
    return parsed;
  }

  #json(args) {
    const parsed = this.call(args);
    return parsed.result ?? parsed;
  }
}
