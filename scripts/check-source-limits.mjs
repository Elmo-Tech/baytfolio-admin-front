import { readdir, readFile } from "node:fs/promises";
import { join, extname, relative } from "node:path";

const root = process.cwd();
const excluded = new Set(["node_modules", ".git", "dist", "coverage"]);
const extensions = new Set([
  ".ts",
  ".tsx",
  ".mts",
  ".cts",
  ".sh",
  ".js",
  ".jsx",
  ".mjs",
  ".cjs",
  ".css",
  ".json",
  ".yml",
  ".yaml",
  ".html",
]);
const violations = [];
async function inspect(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (excluded.has(entry.name)) continue;
    const path = join(directory, entry.name);
    if (relative(root, path) === ".husky/_") continue;
    if (entry.isDirectory()) await inspect(path);
    else if (
      entry.isFile() &&
      (extensions.has(extname(path)) ||
        [".gitignore", ".prettierignore"].includes(relative(root, path)) ||
        relative(root, path).startsWith(".husky/"))
    ) {
      // The npm dependency lockfile is generated data, not authored code.
      if (entry.name === "package-lock.json") continue;
      const source = await readFile(path, "utf8");
      const lines = source
        ? source.split("\n").length - Number(source.endsWith("\n"))
        : 0;
      if (lines > 150) violations.push(`${relative(root, path)}: ${lines}`);
    }
  }
}
await inspect(root);
if (violations.length) {
  console.error(violations.sort().join("\n"));
  process.exitCode = 1;
} else
  console.log("All maintained code files contain at most 150 physical lines.");
