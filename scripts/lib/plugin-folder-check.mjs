import { join } from "node:path";
import { JsonFile } from "./json-file.mjs";

export class PluginFolderCheck {
  #orca;

  constructor(orca) {
    this.#orca = orca;
  }

  refuseInvalid(folder) {
    this.#orca.validate(folder);
    this.#refuseNewerOrcaThanValidator(folder);
  }

  #refuseNewerOrcaThanValidator(folder) {
    const { id, engines } = new JsonFile(
      join(folder, "orca-plugin.json"),
    ).read();
    const minimum = engines.orca.slice(">=".length);
    if (isNewer(minimum, this.#orca.version)) {
      throw new Error(
        `${id} requires Orca ${engines.orca}, but is validated with ${this.#orca.version}: raise ORCA_VERSION in scripts/lib/orca.mjs`,
      );
    }
  }
}

function isNewer(version, than) {
  const thanParts = than.split(".").map(Number);
  const difference = version
    .split(".")
    .map((part, index) => Number(part) - thanParts[index])
    .find((partDifference) => partDifference !== 0);
  return difference > 0;
}
