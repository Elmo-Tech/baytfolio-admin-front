import { controls } from "./lib/jsx-controls.mjs";
import ts from "typescript";
import { readFile, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { join } from "node:path";

const directory = process.argv[2];
const reference = join(directory, "reference/src");
const migrations = JSON.parse(
  await readFile(join(directory, "presentation-migrations.json"), "utf8"),
);
const profiles = {};
for (const tag of [
  "Button",
  "Input",
  "Label",
  "Textarea",
  "TableHead",
  "TableCell",
  "SelectTrigger",
]) {
  const file = tag.replace(
    /[A-Z]/g,
    (letter, index) => (index ? "-" : "") + letter.toLowerCase(),
  );
  const source = await readFile(
    `src/shared/components/ui/${file}-presentations.ts`,
    "utf8",
  );
  const exports = {};
  new Function(
    "exports",
    ts.transpileModule(source, {
      compilerOptions: { module: ts.ModuleKind.CommonJS },
    }).outputText,
  )(exports);
  profiles[tag] = Object.values(exports)[0];
}
const groups = new Map();
for (const item of migrations)
  groups.set([item.file, item.tag, item.presentation].join("|"), item);
const mismatches = [];
for (const item of groups.values()) {
  const before = await readFile(join(reference, item.file.slice(4)), "utf8");
  const after = await readFile(item.file, "utf8");
  const a = controls(before, item.file, item.tag, "className", item.original);
  const b = controls(
    after,
    item.file,
    item.tag,
    "presentation",
    item.presentation,
  );
  const tag = item.tag === "AsyncSubmitButton" ? "Button" : item.tag;
  if (
    profiles[tag][item.presentation] !== item.original ||
    JSON.stringify(a) !== JSON.stringify(b)
  )
    mismatches.push(item);
}
const originalCss = execFileSync(
  "git",
  ["show", "39e1a00995494df1cc36790249b3fe6c1095bde5:src/index.css"],
  { encoding: "utf8" },
);
const declarations = (text) =>
  Object.fromEntries(
    [...text.matchAll(/(--[\w-]+):\s*([^;]+);/g)].map((match) => [
      match[1],
      match[2],
    ]),
  );
const rootBefore = declarations(
  originalCss.slice(
    originalCss.indexOf(":root {"),
    originalCss.indexOf(".dark {"),
  ),
);
const themeBefore = declarations(
  originalCss.slice(
    originalCss.indexOf("@theme inline {"),
    originalCss.indexOf(":root {"),
  ),
);
const rootAfter = declarations(
  (await readFile("src/shared/styles/tokens-foundations.css", "utf8")) +
    (await readFile("src/shared/styles/tokens-auth-users.css", "utf8")),
);
const themeAfter = declarations(
  (await readFile("src/shared/styles/theme-foundations.css", "utf8")) +
    (await readFile("src/shared/styles/theme-auth-users.css", "utf8")),
);
const equal = (a, b) =>
  JSON.stringify(Object.entries(a).sort()) ===
  JSON.stringify(Object.entries(b).sort());
const digest = (bytes) => createHash("sha256").update(bytes).digest("hex");
const initial = JSON.parse(
  await readFile(join(directory, "before-source.json"), "utf8"),
);
const routeFiles = [
  "src/app/router.tsx",
  "src/app/routes/admin-routes.tsx",
  "src/app/routes/public-routes.tsx",
  "src/app/constants/sidebar-navigation.ts",
];
const unchangedRoutes = [];
for (const file of routeFiles)
  unchangedRoutes.push({
    file,
    unchanged:
      digest(await readFile(file)) ===
      digest(await readFile(join(reference, file.slice(4)))),
  });
const lockfileUnchanged =
  digest(await readFile("package-lock.json")) ===
  initial.files.find((file) => file.path === "package-lock.json").sha256;
const result = {
  presentationReplacements: migrations.length,
  exactStyleAndOtherProps: mismatches.length === 0,
  mismatches,
  rootTokens: {
    count: Object.keys(rootBefore).length,
    exact: equal(rootBefore, rootAfter),
  },
  themeMappings: {
    count: Object.keys(themeBefore).length,
    exact: equal(themeBefore, themeAfter),
  },
  unchangedRoutes,
  lockfileUnchanged,
};
await writeFile(
  join(directory, "source-proof.json"),
  JSON.stringify(result, null, 2) + "\n",
);
console.log(JSON.stringify(result, null, 2));
if (
  mismatches.length ||
  !result.rootTokens.exact ||
  !result.themeMappings.exact ||
  !lockfileUnchanged ||
  unchangedRoutes.some((route) => !route.unchanged)
)
  process.exitCode = 1;
