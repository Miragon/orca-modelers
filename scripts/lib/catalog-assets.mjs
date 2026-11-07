import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { extname, join } from "node:path";

// Orca checks every listed release's images against the files at their paths, so a new release
// must not overwrite them. As in Orca's community catalog, each image is stored once, named by
// its hash, and never changed.
export class CatalogAssets {
  static DIRECTORY = "assets";

  static keep(listed) {
    for (const release of listed.releases) {
      for (const image of CatalogAssets.#images(release)) {
        if (image.path.startsWith(`${CatalogAssets.DIRECTORY}/`)) continue;
        image.path = CatalogAssets.#store(listed.id, release, image);
      }
    }
  }

  static #images({ images }) {
    if (!images) return [];
    return [images.icon, images.cover, ...(images.screenshots ?? [])].filter(
      Boolean,
    );
  }

  static #store(key, release, image) {
    const bytes = readFileSync(image.path);
    const sha256 = createHash("sha256").update(bytes).digest("hex");
    if (sha256 !== image.sha256) {
      throw new Error(
        `${key} ${release.version}: ${image.path} changed since it was listed`,
      );
    }
    const folder = join(CatalogAssets.DIRECTORY, key);
    const path = join(folder, `${sha256.slice(0, 16)}${extname(image.path)}`);
    mkdirSync(folder, { recursive: true });
    writeFileSync(path, bytes);
    return path;
  }
}
