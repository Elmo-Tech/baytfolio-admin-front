import { captureBrowserState } from "./lib/browser-state.mjs";
import { createRequire } from "node:module";
import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { execFileSync } from "node:child_process";
import {
  acceptanceCases,
  applyAcceptanceAction,
} from "./acceptance-browser-cases.mjs";

const output = resolve(process.argv[2]);
const require = createRequire(resolve(process.env.PLAYWRIGHT_PACKAGE));
const { chromium } = require("playwright");
const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH,
  headless: true,
  args: ["--disable-gpu", "--force-color-profile=srgb"],
});
const manifest = {
  browser: browser.version(),
  viewportHeight: 900,
  deviceScaleFactor: 1,
  locale: "en-US",
  timezone: "Africa/Cairo",
  fixedTime: "2026-11-23T12:00:00Z",
  harnessOnly: "frozen clock and CSS transition endpoints; hidden devtools",
  cases: acceptanceCases,
  errors: [],
  dismissals: [],
};
const identity = JSON.parse(
  execFileSync(process.execPath, ["scripts/source-snapshot.mjs"], {
    encoding: "utf8",
  }),
);
manifest.currentSource = identity;
for (const [version, port] of [
  ["before", 5184],
  ["after", 5173],
]) {
  await mkdir(`${output}/${version}`, { recursive: true });
  for (const [index, test] of acceptanceCases.entries()) {
    if (
      process.env.CASE_INDICES &&
      !process.env.CASE_INDICES.split(",").map(Number).includes(index)
    )
      continue;
    const context = await browser.newContext({
      viewport: { width: test.width, height: 900 },
      deviceScaleFactor: 1,
      locale: "en-US",
      timezoneId: "Africa/Cairo",
      colorScheme: "light",
    });
    if (test.dark)
      await context.addInitScript(() =>
        document.addEventListener("DOMContentLoaded", () =>
          document.documentElement.classList.add("dark"),
        ),
      );
    const page = await context.newPage();
    page.setDefaultTimeout(10000);
    page.on("pageerror", (error) =>
      manifest.errors.push({ version, index, error: error.message }),
    );
    try {
      await page.clock.install({ time: new Date("2026-11-23T11:00:00Z") });
      await page.clock.pauseAt(new Date(manifest.fixedTime));
      await page.goto(`http://127.0.0.1:${port}${test.route}`);
      await page.waitForLoadState("networkidle");
      await page.evaluate(() => document.fonts.ready);
      await page.evaluate(() => {
        if ([...document.fonts].some((font) => font.status === "error"))
          throw Error("Required font failed to load");
      });
      await page.addStyleTag({
        content:
          "*,*::before,*::after{transition-duration:0s!important;animation-duration:0s!important;animation-delay:0s!important}",
      });
      await page.clock.runFor(650);
      await applyAcceptanceAction(page, test.action);
      await page.clock.runFor(650);
      await page.waitForLoadState("networkidle");
      const state = await captureBrowserState(page);
      await writeFile(
        `${output}/${version}/${index}.json`,
        JSON.stringify(state, null, 2),
      );
      await page.screenshot({
        path: `${output}/${version}/${index}.png`,
        fullPage: true,
        animations: "disabled",
        caret: "hide",
        style: ".tsqd-parent-container{visibility:hidden!important}",
      });
      if (test.action === "question-select") {
        await page.keyboard.press("Escape");
        await page.clock.runFor(50);
        const dismissed = (await page.getByRole("listbox").count()) === 0;
        manifest.dismissals.push({ version, index, dismissed });
        if (!dismissed) throw Error("Select did not retain Escape dismissal");
      }
    } catch (error) {
      manifest.errors.push({ version, index, error: error.message });
    }
    await context.close();
    if (index % 8 === 0)
      console.log(
        `Captured ${version}: ${index + 1}/${acceptanceCases.length}`,
      );
  }
}
await browser.close();
const current = JSON.parse(
  execFileSync(process.execPath, ["scripts/source-snapshot.mjs"], {
    encoding: "utf8",
  }),
);
if (current.digest !== identity.digest)
  manifest.errors.push({ error: "Source changed during capture" });
await writeFile(`${output}/manifest.json`, JSON.stringify(manifest, null, 2));
if (manifest.errors.length) process.exitCode = 1;
console.log(
  JSON.stringify({ cases: acceptanceCases.length, errors: manifest.errors }),
);
