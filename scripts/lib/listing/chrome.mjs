import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { run, runOrThrow } from "../command.mjs";

const PLAYWRIGHT_BROWSERS = "/ms-playwright";
const TIMEOUT = 120_000;

// A headless shell comes first: the full Chrome's headless mode hung on a screenshot at device
// scale factor 2 of a page with a large image.
export class Chrome {
  #binary;

  constructor(binary) {
    this.#binary = binary;
  }

  static find() {
    if (process.env.CHROME) return new Chrome(process.env.CHROME);
    const binary =
      Chrome.#onPath("chrome-headless-shell") ??
      Chrome.#playwright("chromium_headless_shell-", [
        "chrome-headless-shell-linux64/chrome-headless-shell",
        "chrome-linux/headless_shell",
      ]) ??
      Chrome.#onPath("google-chrome", "chromium", "chromium-browser") ??
      Chrome.#playwright("chromium-", [
        "chrome-linux64/chrome",
        "chrome-linux/chrome",
      ]);
    if (!binary) throw new Error("no Chrome or Chromium found: set CHROME");
    return new Chrome(binary);
  }

  static #onPath(...names) {
    for (const name of names) {
      const found = run("sh", ["-c", 'command -v "$1"', "sh", name]);
      if (found.ok) return found.stdout;
    }
    return undefined;
  }

  static #playwright(prefix, executables) {
    if (!existsSync(PLAYWRIGHT_BROWSERS)) return undefined;
    const builds = readdirSync(PLAYWRIGHT_BROWSERS)
      .filter((entry) => entry.startsWith(prefix))
      .sort()
      .reverse();
    for (const build of builds) {
      for (const executable of executables) {
        const binary = join(PLAYWRIGHT_BROWSERS, build, executable);
        if (existsSync(binary)) return binary;
      }
    }
    return undefined;
  }

  screenshot(page, out, { width, height, scale }) {
    runOrThrow(
      this.#binary,
      [
        ...Chrome.#FLAGS,
        `--window-size=${width},${height}`,
        `--force-device-scale-factor=${scale}`,
        `--screenshot=${out}`,
        pathToFileURL(page).href,
      ],
      Chrome.#options(),
    );
  }

  // Chrome's canvas encodes WEBP and --dump-dom hands the data URL back. The PNG goes in as a data
  // URL, as a file:// image would taint the canvas.
  webp(png, out, { width, height } = {}) {
    const page = `${png}.webp.html`;
    const source = `data:image/png;base64,${readFileSync(png).toString("base64")}`;
    writeFileSync(
      page,
      `<!doctype html><body><script>
        const image = new Image();
        image.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = ${width ?? "image.naturalWidth"};
          canvas.height = ${height ?? "image.naturalHeight"};
          const context = canvas.getContext("2d");
          context.imageSmoothingQuality = "high";
          context.drawImage(image, 0, 0, canvas.width, canvas.height);
          document.body.textContent = canvas.toDataURL("image/webp", 0.9);
        };
        image.src = "${source}";
      </script></body>`,
    );
    const dom = runOrThrow(
      this.#binary,
      [
        ...Chrome.#FLAGS,
        "--virtual-time-budget=10000",
        "--dump-dom",
        pathToFileURL(page).href,
      ],
      { ...Chrome.#options(), maxBuffer: 64 * 1024 * 1024 },
    );
    const dataUrl = /data:image\/webp;base64,[A-Za-z0-9+/=]+/.exec(dom)?.[0];
    if (!dataUrl) throw new Error(`Chrome encoded no WEBP for ${png}`);
    writeFileSync(out, Buffer.from(dataUrl.split(",")[1], "base64"));
  }

  static #FLAGS = [
    "--headless",
    "--no-sandbox",
    "--disable-gpu",
    "--hide-scrollbars",
  ];

  // Headless Chrome hangs on a screenshot when it finds a display, such as xvfb-run's for Orca.
  static #options() {
    const { DISPLAY, WAYLAND_DISPLAY, ...env } = process.env;
    return { env, timeout: TIMEOUT };
  }
}
