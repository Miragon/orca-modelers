import { readdirSync, readFileSync } from "node:fs";
import { extname, join, relative } from "node:path";

const PUBLISHER = "miragon";
const RESERVED_ID_PREFIX = "orca-";
const BINARY_EXTENSIONS_ALLOWED = new Set([
  ".png",
  ".jpg",
  ".jpeg",
  ".gif",
  ".webp",
  ".avif",
  ".ico",
  ".woff",
  ".woff2",
]);

export class CommunityDirectoryRules {
  static refuseBroken(folder, { id, license, publisher }) {
    const refuse = (category, detail) => {
      throw new Error(
        `${id}: Orca's community directory rejects this (${category}): ${detail}`,
      );
    };
    if (id.startsWith(RESERVED_ID_PREFIX)) {
      refuse(
        "reserved-name",
        `ids starting with "${RESERVED_ID_PREFIX}" are reserved for official plugins`,
      );
    }
    if (!license) {
      refuse("licence", 'no SPDX "license" in orca-plugin.json');
    }
    if (publisher && publisher.toLowerCase() !== PUBLISHER) {
      refuse(
        "publisher",
        `publisher "${publisher}" is not the GitHub owner "${PUBLISHER}"`,
      );
    }
    const binaryFiles = CommunityDirectoryRules.#binaryFiles(folder);
    if (binaryFiles.length > 0) {
      refuse(
        "binary-files",
        `bundles ${binaryFiles.join(", ")}: only images and WOFF fonts may be binary, and no file may be a symlink`,
      );
    }
  }

  static #binaryFiles(folder) {
    return readdirSync(folder, { recursive: true, withFileTypes: true })
      .map((entry) => ({ entry, path: join(entry.parentPath, entry.name) }))
      .filter(
        ({ entry, path }) =>
          entry.isSymbolicLink() ||
          (entry.isFile() && CommunityDirectoryRules.#isBinaryNotAllowed(path)),
      )
      .map(({ path }) => relative(folder, path));
  }

  static #isBinaryNotAllowed(path) {
    if (BINARY_EXTENSIONS_ALLOWED.has(extname(path).toLowerCase())) {
      return false;
    }
    return readFileSync(path).includes(0);
  }
}
