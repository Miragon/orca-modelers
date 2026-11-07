import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

const ASSETS = new URL("assets/", import.meta.url);
// Not checked in, as the directory refuses binary files in this repository; inlined, so rendering
// needs no network.
const GEIST =
  "https://cdn.jsdelivr.net/npm/@fontsource-variable/geist@5.3.0/files/geist-latin-wght-normal.woff2";

const escapeHtml = (text) =>
  text.replace(
    /[&<>"]/g,
    (character) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[character],
  );

export class Cover {
  static WIDTH = 1600;
  static HEIGHT = 1000;

  #chrome;
  #font;
  #template = readFileSync(new URL("cover.html", ASSETS), "utf8");

  constructor(chrome, font) {
    this.#chrome = chrome;
    this.#font = font;
  }

  static async create(chrome) {
    const response = await fetch(GEIST);
    if (!response.ok) {
      throw new Error(`Geist: HTTP ${response.status} from ${GEIST}`);
    }
    const font = Buffer.from(await response.arrayBuffer()).toString("base64");
    return new Cover(chrome, `data:font/woff2;base64,${font}`);
  }

  // Rendered at double resolution and scaled down, which smooths the rounded corners.
  render({ id, icon, title, claim }, editorShot, out, workdir) {
    const page = join(workdir, `${id}-cover.html`);
    const png = join(workdir, `${id}-cover.png`);
    const values = {
      __FONT__: this.#font,
      __ICON__: pathToFileURL(icon).href,
      __WORDMARK__: new URL("miragon-logo-weiss.svg", ASSETS).href,
      __EDITOR__: pathToFileURL(editorShot).href,
      __TITLE__: escapeHtml(title),
      __CLAIM__: escapeHtml(claim),
    };
    writeFileSync(
      page,
      this.#template.replace(/__[A-Z]+__/g, (key) => values[key]),
    );
    const size = { width: Cover.WIDTH, height: Cover.HEIGHT };
    this.#chrome.screenshot(page, png, { ...size, scale: 2 });
    this.#chrome.webp(png, out, size);
  }
}
