import { createRequire } from "node:module";
import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const require = createRequire(resolve(process.env.PLAYWRIGHT_PACKAGE));
const { chromium } = require("playwright");
const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH,
  headless: true,
  args: ["--disable-gpu", "--force-color-profile=srgb"],
});
for (const version of ["before", "repeat", "after"]) {
  const output = `/private/tmp/baytfolio-interaction-repeat/${version}`;
  await mkdir(output, { recursive: true });
  for (const [name, width, route] of [
    ["users-empty-filter", 390, "/users?status=active&pageSize=10"],
    ["otp-focus", 1440, "/verify-otp"],
  ]) {
    const context = await browser.newContext({
      viewport: { width, height: 900 },
      deviceScaleFactor: 1,
      locale: "en-US",
      timezoneId: "Africa/Cairo",
    });
    const page = await context.newPage();
    page.setDefaultTimeout(8000);
    await page.clock.install({ time: new Date("2026-11-23T11:00:00Z") });
    await page.clock.pauseAt(new Date("2026-11-23T12:00:00Z"));
    await page.goto(
      `http://127.0.0.1:${version === "after" ? 5173 : 5174}${route}`,
    );
    await page.waitForLoadState("networkidle");
    await page.evaluate(() => document.fonts.ready);
    await page.evaluate(() => {
      if ([...document.fonts].some((font) => font.status === "error"))
        throw new Error("Required font failed to load");
    });
    // Stabilize CSS transition endpoints in the harness only.
    await page.addStyleTag({
      content:
        "*,*::before,*::after { transition-duration: 0s !important; animation-duration: 0s !important; animation-delay: 0s !important; }",
    });
    if (name === "users-empty-filter")
      await page.getByRole("searchbox").fill("missing");
    else
      await page
        .getByLabel("رقم رمز التحقق 1", { exact: true })
        .evaluate((element) => {
          const event = new Event("paste", { bubbles: true, cancelable: true });
          Object.defineProperty(event, "clipboardData", {
            value: { getData: () => "123456" },
          });
          element.dispatchEvent(event);
        });
    await page.clock.runFor(650);
    await page.waitForLoadState("networkidle");
    const state = await page.evaluate(() => ({
      text: document.body.innerText,
      path: location.pathname + location.search,
      active: document.activeElement?.getAttribute("aria-label"),
      styles: [...document.querySelectorAll("#root *")]
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
            outline: s.outline,
            value: el.value,
            checked: el.checked,
          };
        }),
    }));
    await writeFile(`${output}/${name}.json`, JSON.stringify(state, null, 2));
    await page.screenshot({
      path: `${output}/${name}.png`,
      fullPage: true,
      animations: "disabled",
      caret: "hide",
      style: ".tsqd-parent-container { visibility: hidden !important; }",
    });
    await context.close();
  }
  console.log(`Captured remaining interaction states: ${version}`);
}
await browser.close();
