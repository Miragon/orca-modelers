import { Orca } from "./lib/orca.mjs";

const [version, folder] = process.argv.slice(2);
if (!version || !folder) {
  console.error("Usage: node scripts/install-orca.mjs <version> <folder>");
  process.exit(2);
}
console.log(`Orca ${Orca.install(version, folder).version} in ${folder}/squashfs-root`);
