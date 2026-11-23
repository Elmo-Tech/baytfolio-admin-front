import { createRequire } from "node:module";
import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

// Use an existing Playwright installation; no production dependency is needed.
const require = createRequire(resolve(process.env.PLAYWRIGHT_PACKAGE));
const { chromium } = require("playwright");
const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH,
  headless: true,
});
const output = resolve(process.argv[2]);
await mkdir(output, { recursive: true });
const routes = [
  "/",
  "/login",
  "/forgot-password",
  "/verify-otp",
  "/reset-password",
  "/dashboard",
  "/users",
  "/users/USR-9281",
  "/users/missing",
  "/showrooms",
  "/showrooms/1",
  "/showrooms/missing",
  "/analytics",
  "/cms",
  "/cms/help-center",
  "/cms/contact-information",
  "/cms/privacy-policy",
  "/cms/terms-and-conditions",
  "/showroom-join-requests",
  "/showroom-join-requests/1",
  "/showroom-join-requests/4/setup",
  "/showroom-join-requests/missing",
  "/missing",
  "/users?search=missing",
  "/showrooms?search=missing",
  "/cms/help-center?search=missing",
];
const failures = [];
for (const width of [390, 768, 1440]) {
  for (const dark of [false, true]) {
    const context = await browser.newContext({
      viewport: { width, height: 900 },
      deviceScaleFactor: 1,
      locale: "en-US",
      timezoneId: "Africa/Cairo",
      colorScheme: "light",
    });
    await context.addInitScript(
      ({ dark }) => {
        const OriginalDate = Date;
        const fixed = new OriginalDate("2026-11-23T12:00:00Z").valueOf();
        window.Date = class extends OriginalDate {
          constructor(...args) {
            super(...(args.length ? args : [fixed]));
          }
          static now() {
            return fixed;
          }
        };
        if (dark)
          document.addEventListener("DOMContentLoaded", () => {
            document.documentElement.classList.add("dark");
          });
      },
      { dark },
    );
    const page = await context.newPage();
    page.on("pageerror", (error) => failures.push(error.message));
    for (const [index, route] of routes.entries()) {
      await page.goto(`http://127.0.0.1:5173${route}`);
      await page.evaluate(() => document.fonts.ready);
      await page.evaluate(() => {
        if ([...document.fonts].some((font) => font.status === "error"))
          throw new Error("A required baseline font failed to load");
      });
      await page.waitForTimeout(650);
      // Freeze countdown text using the application's timers only in this harness.
      const name = `${width}-${dark ? "dark" : "light"}-${index}`;
      await page.screenshot({
        path: `${output}/${name}.png`,
        fullPage: true,
        animations: "disabled",
      });
      const state = await page.evaluate(() => ({
        url: location.pathname + location.search + location.hash,
        text: document.body.innerText,
        controls: [
          ...document.querySelectorAll("button,input,textarea,select,a"),
        ].map((el) => {
          const s = getComputedStyle(el);
          const r = el.getBoundingClientRect();
          return {
            tag: el.tagName,
            text: el.textContent,
            type: el.getAttribute("type"),
            name: el.getAttribute("name"),
            href: el.getAttribute("href"),
            box: [r.x, r.y, r.width, r.height],
            color: s.color,
            background: s.backgroundColor,
            border: s.border,
            shadow: s.boxShadow,
            font: s.font,
            outline: s.outline,
          };
        }),
      }));
      await writeFile(`${output}/${name}.json`, JSON.stringify(state, null, 2));
      if (route === "/cms/help-center") {
        await page
          .getByRole("button", { name: "إضافة سؤال", exact: true })
          .click();
        await page.screenshot({
          path: `${output}/${name}-modal.png`,
          fullPage: true,
          animations: "disabled",
        });
      }
    }
    await context.close();
    console.log(`Captured ${width} ${dark ? "dark" : "light"}`);
  }
}
await browser.close();
await writeFile(
  `${output}/manifest.json`,
  JSON.stringify({ routes, widths: [390, 768, 1440], failures }, null, 2),
);
if (failures.length) process.exitCode = 1;
