import { spawn } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { setTimeout as sleep } from "node:timers/promises";
import { ProfileState } from "./profile-state.mjs";

const CALL_TIMEOUT = 120_000;
const START_TIMEOUT = 90_000;

export class OrcaSession {
  #orca;
  #home = mkdtempSync(join(tmpdir(), "orca-listing-"));
  #env;
  #app;

  constructor(orca) {
    this.#orca = orca;
    this.#env = {
      ...process.env,
      HOME: this.#home,
      XDG_CONFIG_HOME: join(this.#home, "config"),
      XDG_CACHE_HOME: join(this.#home, "cache"),
      ORCA_BACKGROUND_LAUNCH: "1",
      CI: "1",
    };
  }

  // A fresh profile shows its onboarding, feature tips and tours over the editor. They can only be
  // marked seen once the first start wrote the profile, and only while Orca is stopped.
  async start(folder, theme) {
    await this.#launch();
    this.#call(["repo", "add", "--path", folder, "--kind", "folder"]);
    await sleep(8000);
    await this.restart(theme, (state) => state.skipIntroductions());
  }

  loadPlugin(folder) {
    const args = ["plugin", "dev", "load", folder];
    const pending = this.#call(args, { allowFailure: true });
    const fingerprint = pending.error?.data?.approvalFingerprint;
    if (!fingerprint && pending.ok === false) {
      throw new Error(`orca ${args.join(" ")}: ${pending.error?.message}`);
    }
    const loaded = fingerprint
      ? this.#call([...args, "--approve", fingerprint])
      : pending;
    return loaded.result.pluginKey;
  }

  // Each file gets a tab, so the window shot shows all of them.
  async openAll(editors) {
    for (const { pluginKey, file } of editors) this.#open(pluginKey, file);
    await sleep(8000);
  }

  // Before any editor shot: an editor shot resizes the editor for its capture.
  async shootWindow({ pluginKey, file }, out, theme) {
    this.#open(pluginKey, file);
    await sleep(5000);
    this.#shot(pluginKey, theme, ["--window", "--out", out]);
  }

  // With acts, Orca shoots a copy of the file, so the clicks and keys never change the example.
  shootEditor(
    { pluginKey, file },
    out,
    theme,
    { width = 1280, height = 800, act = [] } = {},
  ) {
    this.#open(pluginKey, file);
    this.#shot(pluginKey, theme, [
      "--editor",
      file,
      "--width",
      String(width),
      "--height",
      String(height),
      ...(act.length ? ["--act", JSON.stringify(act)] : []),
      "--out",
      out,
    ]);
  }

  // `plugin shot --theme` repaints Orca too late for some captures, so each theme gets its own start.
  async restart(theme, edit = () => {}) {
    await this.#stopApp();
    const state = new ProfileState(this.#home);
    edit(state);
    state.useTheme(theme);
    state.close();
    console.log(`starting Orca again in its ${theme} theme`);
    await this.#launch();
    await sleep(10_000);
  }

  async close() {
    await this.#stopApp();
    rmSync(this.#home, { recursive: true, force: true });
  }

  #open(pluginKey, file) {
    this.#call(["plugin", "open", pluginKey, "--editor", file]);
  }

  // Orca paints a theme for a shot only while its window is hidden, else it keeps its own.
  #shot(pluginKey, theme, args) {
    const { result } = this.#call([
      "plugin",
      "shot",
      pluginKey,
      "--theme",
      theme,
      ...args,
    ]);
    if (result?.themeApplied === false) {
      throw new Error(
        `Orca kept its theme instead of ${theme}: ${result.themeReason}`,
      );
    }
  }

  #call(args, { allowFailure = false } = {}) {
    return this.#orca.call(args, {
      env: this.#env,
      timeout: CALL_TIMEOUT,
      allowFailure,
    });
  }

  async #launch() {
    this.#app = spawn(
      this.#orca.appRun,
      ["--no-sandbox", "--password-store=basic"],
      { env: this.#env, detached: true, stdio: ["ignore", "ignore", "pipe"] },
    );
    let stderr = "";
    this.#app.stderr.on(
      "data",
      (chunk) => (stderr = `${stderr}${chunk}`.slice(-3000)),
    );
    for (const started = Date.now(); ; await sleep(1000)) {
      const { runtime } =
        this.#call(["status"], { allowFailure: true }).result ?? {};
      if (runtime?.reachable && runtime.state === "ready") {
        console.log(
          `Orca ready after ${Math.round((Date.now() - started) / 1000)} s`,
        );
        return;
      }
      if (Date.now() - started > START_TIMEOUT) {
        throw new Error(`Orca did not start: ${stderr}`);
      }
    }
  }

  // Orca starts helper processes of its own, so the whole process group goes.
  async #stopApp() {
    const app = this.#app;
    this.#app = undefined;
    if (!app) return;
    console.log("stopping Orca");
    for (const signal of ["SIGTERM", "SIGKILL"]) {
      for (let waited = 0; waited < 5000; waited += 250) {
        if (!OrcaSession.#groupAlive(app.pid)) return;
        if (waited === 0) {
          try {
            process.kill(-app.pid, signal);
          } catch {
            return;
          }
        }
        await sleep(250);
      }
    }
  }

  static #groupAlive(pid) {
    try {
      process.kill(-pid, 0);
      return true;
    } catch {
      return false;
    }
  }
}
