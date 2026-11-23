import { readFile, readdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

import { decode } from "./png-screenshots.mjs";

const [before, after, reportPath] = process.argv.slice(2);
const report = {
  images: 0,
  identical: 0,
  differences: [],
  stateDifferences: [],
};
for (const name of (await readdir(before)).filter((n) => n.endsWith(".png"))) {
  const beforeBytes = await readFile(join(before, name));
  const afterBytes = await readFile(join(after, name));
  report.images++;
  if (beforeBytes.equals(afterBytes)) {
    report.identical++;
    continue;
  }
  const a = decode(beforeBytes);
  const b = decode(afterBytes);
  if (a.width !== b.width || a.height !== b.height) {
    report.differences.push({
      name,
      sizeBefore: [a.width, a.height],
      sizeAfter: [b.width, b.height],
    });
    continue;
  }
  let count = 0,
    minX = a.width,
    minY = a.height,
    maxX = 0,
    maxY = 0;
  for (let y = 0; y < a.height; y++)
    for (let x = 0; x < a.width; x++) {
      const i = (y * a.width + x) * a.channels;
      let changed = false;
      for (let c = 0; c < a.channels; c++)
        if (a.pixels[i + c] !== b.pixels[i + c]) {
          changed = true;
          break;
        }
      if (!changed) continue;
      count++;
      minX = Math.min(x, minX);
      minY = Math.min(y, minY);
      maxX = Math.max(x, maxX);
      maxY = Math.max(y, maxY);
    }
  if (count)
    report.differences.push({
      name,
      pixels: count,
      bounds: [minX, minY, maxX, maxY],
    });
  else report.identical++;
}
for (const name of (await readdir(before)).filter(
  (n) => n.endsWith(".json") && n !== "manifest.json",
)) {
  if (
    (await readFile(join(before, name), "utf8")) !==
    (await readFile(join(after, name), "utf8"))
  )
    report.stateDifferences.push(name);
}
if (report.images === 0) throw new Error("No baseline screenshots were found");
await writeFile(reportPath, JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
if (report.differences.length || report.stateDifferences.length)
  process.exitCode = 1;
