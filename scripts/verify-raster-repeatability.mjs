import { createRequire } from "node:module";
import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const require = createRequire(resolve(process.env.PLAYWRIGHT_PACKAGE));
const { chromium } = require("playwright");
const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH,
  headless: true,
});
const cases = [
  [1440, true, "/cms/privacy-policy"],
  [1440, true, "/showroom-join-requests/4/setup"],
  [390, true, "/cms"],
  [390, false, "/showrooms/1"],
  [768, true, "/cms/help-center", true],
  [768, false, "/users?search=missing"],
  [768, false, "/users/USR-9281"],
];
for (const version of ["before", "repeat", "after"]) {
  const output = `/private/tmp/baytfolio-raster/${version}`;
  await mkdir(output, { recursive: true });
  for (const [index, [width, dark, path, modal]] of cases.entries()) {
    const context = await browser.newContext({
      viewport: { width, height: 900 },
      deviceScaleFactor: 1,
      locale: "en-US",
      timezoneId: "Africa/Cairo",
    });
    await context.addInitScript(
      ({ dark }) => {
        const OriginalDate = Date;
        window.Date = class extends OriginalDate {
          constructor(...args) {
            super(...(args.length ? args : ["2026-11-23T12:00:00Z"]));
          }
          static now() {
            return new OriginalDate("2026-11-23T12:00:00Z").valueOf();
          }
        };
        if (dark)
          document.addEventListener("DOMContentLoaded", () =>
            document.documentElement.classList.add("dark"),
          );
      },
      { dark },
    );
    const page = await context.newPage();
    await page.goto(
      `http://127.0.0.1:${version === "after" ? 5173 : 5174}${path}`,
    );
    await page.evaluate(() => document.fonts.ready);
    await page.evaluate(() => {
      if ([...document.fonts].some((font) => font.status === "error"))
        throw new Error("A required baseline font failed to load");
    });
    await page.waitForTimeout(650);
    if (modal)
      await page
        .getByRole("button", { name: "إضافة سؤال", exact: true })
        .click();
    const styles = await page.evaluate(() =>
      [...document.querySelectorAll("#root *")]
        .filter(
          (el) =>
            !el.closest(".tsqd-parent-container") &&
            !["SCRIPT", "STYLE"].includes(el.tagName),
        )
        .map((el) => {
          const s = getComputedStyle(el),
            r = el.getBoundingClientRect();
          return {
            tag: el.tagName,
            rect: [r.x, r.y, r.width, r.height],
            color: s.color,
            background: s.background,
            border: s.border,
            radius: s.borderRadius,
            font: s.font,
            shadow: s.boxShadow,
            opacity: s.opacity,
            fill: s.fill,
            stroke: s.stroke,
          };
        }),
    );
    await writeFile(`${output}/${index}.json`, JSON.stringify(styles, null, 2));
    await page.screenshot({
      path: `${output}/${index}.png`,
      fullPage: true,
      animations: "disabled",
    });
    await context.close();
  }
  console.log(`Captured raster repeatability: ${version}`);
}
await browser.close();
