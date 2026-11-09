import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync } from "node:fs";
import { arch } from "node:os";
import { join } from "node:path";
import { runOrThrow } from "./command.mjs";

const ORCA_VERSION = process.env.ORCA_VERSION ?? "1.4.254";

export class Orca {
  #cli;
  #version;

  constructor(cli, version) {
    this.#cli = cli;
    this.#version = version;
  }

  static install(version = ORCA_VERSION) {
    const cache = join(
      process.env.RUNNER_TEMP ?? process.env.TMPDIR ?? "/tmp",
      `orca-${version}`,
    );
    const cli = join(cache, "squashfs-root", "resources", "bin", "orca-ide");
    if (!existsSync(cli)) Orca.#extractAppImage(version, cache);
    return new Orca(cli, version);
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

  static #extractAppImage(version, cache) {
    mkdirSync(cache, { recursive: true });
    const asset =
      arch() === "arm64" ? "orca-linux-arm64.AppImage" : "orca-linux.AppImage";
    const url = `https://github.com/stablyai/orca/releases/download/v${version}/${asset}`;
    const inCache = { cwd: cache, stdio: ["ignore", "ignore", "inherit"] };
    runOrThrow("curl", ["-fsSL", "-o", "orca.AppImage", url], inCache);
    runOrThrow("chmod", ["+x", "orca.AppImage"], inCache);
    runOrThrow("./orca.AppImage", ["--appimage-extract"], inCache);
  }
}
