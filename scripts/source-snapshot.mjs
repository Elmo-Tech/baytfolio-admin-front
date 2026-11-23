import { createHash } from "node:crypto";
import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const files = [];
async function collect(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (directory === ".husky" && entry.name === "_") continue;
    if (entry.isDirectory()) await collect(path);
    else if (entry.isFile()) files.push(path);
  }
}
for (const directory of ["src", "scripts", ".github", ".husky"])
  await collect(directory);
for (const entry of await readdir(".", { withFileTypes: true })) {
  if (entry.isFile() && /\.(json|[cm]?js|ts|html)$/.test(entry.name))
    files.push(entry.name);
}
const entries = [];
for (const path of files.sort())
  entries.push({
    path,
    sha256: createHash("sha256")
      .update(await readFile(path))
      .digest("hex"),
  });
const digest = createHash("sha256")
  .update(entries.map((entry) => `${entry.path}\0${entry.sha256}\n`).join(""))
  .digest("hex");
const applicationDigest = createHash("sha256")
  .update(
    entries
      .filter((entry) => !entry.path.startsWith("scripts/"))
      .map((entry) => `${entry.path}\0${entry.sha256}\n`)
      .join(""),
  )
  .digest("hex");
const manifest = {
  algorithm: "sha256",
  digest,
  applicationDigest,
  fileCount: entries.length,
  excludes: [
    "docs",
    "README.md",
    "generated dependencies/builds/coverage",
    ".git",
    ".husky/_",
  ],
  files: entries,
};
if (process.argv[2])
  await writeFile(process.argv[2], JSON.stringify(manifest, null, 2) + "\n");
console.log(
  JSON.stringify({
    algorithm: "sha256",
    digest,
    applicationDigest,
    fileCount: entries.length,
  }),
);
