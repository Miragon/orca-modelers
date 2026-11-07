import { spawnSync } from "node:child_process";

export function run(command, args, options = {}) {
  const result = spawnSync(command, args, { encoding: "utf8", ...options });
  const stdout = result.stdout ?? "";
  const stderr = result.stderr ?? "";
  return {
    ok: result.status === 0,
    stdout: stdout.trim(),
    output: `${stdout}${stderr}`.trim(),
  };
}

export function runOrThrow(command, args, options = {}) {
  const result = run(command, args, options);
  if (!result.ok) {
    throw new Error(`${command} ${args.join(" ")}: ${result.output}`);
  }
  return result.stdout;
}
