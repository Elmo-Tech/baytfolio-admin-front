import { createRequire } from "node:module";
import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import {
  exerciseDashboard,
  exerciseEditors,
  exerciseAuth,
} from "./browser-scenarios.mjs";

const require = createRequire(resolve(process.env.PLAYWRIGHT_PACKAGE));
const { chromium } = require("playwright");
const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH,
  headless: true,
  args: ["--disable-gpu", "--force-color-profile=srgb"],
});
const output = "/private/tmp/baytfolio-interactions-software";
const results = [];
for (const width of [390, 768, 1440]) {
  for (const [version, port] of [
    ["before", 5174],
    ["after", 5173],
  ]) {
    const directory = `${output}/${version}`;
    await mkdir(directory, { recursive: true });
    const context = await browser.newContext({
      viewport: { width, height: 900 },
      deviceScaleFactor: 1,
      locale: "en-US",
      timezoneId: "Africa/Cairo",
    });
    await context.addInitScript(() => {
      const OriginalDate = Date;
      window.Date = class extends OriginalDate {
        constructor(...args) {
          super(...(args.length ? args : ["2026-11-23T12:00:00Z"]));
        }
        static now() {
          return 1795435200000;
        }
      };
    });
    const page = await context.newPage();
    page.setDefaultTimeout(8000);
    const go = async (route) => {
      await page.goto(`http://127.0.0.1:${port}${route}`);
      await page.evaluate(() => document.fonts.ready);
      await page.evaluate(() => {
        if ([...document.fonts].some((font) => font.status === "error"))
          throw new Error("A required baseline font failed to load");
      });
      await page.waitForTimeout(250);
    };
    const capture = async (name) => {
      await page.waitForTimeout(350);
      const state = await page.evaluate(() => ({
        path: location.pathname + location.search + location.hash,
        text: document.body.innerText,
        active: document.activeElement?.getAttribute("aria-label"),
        fields: [...document.querySelectorAll("input,textarea")].map((el) => ({
          value: el.value,
          checked: el.checked,
          disabled: el.disabled,
        })),
      }));
      await writeFile(
        `${directory}/${width}-${name}.json`,
        JSON.stringify(state, null, 2),
      );
      await page.screenshot({
        path: `${directory}/${width}-${name}.png`,
        fullPage: true,
        animations: "disabled",
        style: ".tsqd-parent-container { visibility: hidden !important; }",
      });
      results.push({ width, version, name, path: state.path });
    };
    try {
      await exerciseDashboard(page, capture, go, width);
      await exerciseEditors(page, capture, go);
      await exerciseAuth(page, capture, go);
    } catch (error) {
      results.push({ width, version, error: error.message });
      process.exitCode = 1;
    }
    await context.close();
    console.log(`Compared interactions: ${width} ${version}`);
  }
}
await browser.close();
await writeFile(`${output}/results.json`, JSON.stringify(results, null, 2));
