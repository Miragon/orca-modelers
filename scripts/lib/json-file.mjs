import { readFileSync, writeFileSync } from "node:fs";

export class JsonFile {
  #path;

  constructor(path) {
    this.#path = path;
  }

  read() {
    return JSON.parse(readFileSync(this.#path, "utf8"));
  }

  write(value) {
    writeFileSync(this.#path, `${JSON.stringify(value, null, 2)}\n`);
  }
}
