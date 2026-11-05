#!/usr/bin/env node
// Runs Orca's own CLI offline (`orca-ide plugin validate|inspect|release-entry …`): downloads the
// pinned Orca AppImage once, extracts it without FUSE and calls resources/bin/orca-ide.
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync } from "node:fs";
import { arch } from "node:os";
import { join } from "node:path";

export const ORCA_VERSION = process.env.ORCA_VERSION ?? "1.4.249";

export function orcaCli() {
  const cache = join(
    process.env.RUNNER_TEMP ?? process.env.TMPDIR ?? "/tmp",
    `orca-${ORCA_VERSION}`,
  );
  const cli = join(cache, "squashfs-root", "resources", "bin", "orca-ide");
  if (existsSync(cli)) return cli;
  mkdirSync(cache, { recursive: true });
  const asset =
    arch() === "arm64" ? "orca-linux-arm64.AppImage" : "orca-linux.AppImage";
  const url = `https://github.com/stablyai/orca/releases/download/v${ORCA_VERSION}/${asset}`;
  const steps = [
    ["curl", ["-fsSL", "-o", "orca.AppImage", url]],
    ["chmod", ["+x", "orca.AppImage"]],
    ["./orca.AppImage", ["--appimage-extract"]],
  ];
  for (const [command, args] of steps) {
    const run = spawnSync(command, args, {
      cwd: cache,
      stdio: ["ignore", "ignore", "inherit"],
    });
    if (run.status !== 0)
      throw new Error(`${command} ${args.join(" ")} failed`);
  }
  return cli;
}

/** The parsed `--json` output of one Orca CLI call; throws when Orca refuses. */
export function orca(args, options = {}) {
  const run = spawnSync(orcaCli(), [...args, "--json"], {
    encoding: "utf8",
    ...options,
  });
  let parsed;
  try {
    parsed = JSON.parse(run.stdout);
  } catch {
    throw new Error(`orca ${args.join(" ")}: ${run.stdout}${run.stderr}`);
  }
  if (parsed.ok === false || run.status !== 0) {
    throw new Error(
      `orca ${args.join(" ")}: ${JSON.stringify(parsed.error ?? parsed)}`,
    );
  }
  return parsed.result ?? parsed;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const run = spawnSync(orcaCli(), process.argv.slice(2), { stdio: "inherit" });
  process.exitCode = run.status ?? 1;
}
