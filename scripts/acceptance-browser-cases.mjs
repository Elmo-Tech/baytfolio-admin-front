export const acceptanceCases = [
  ...[
    "/login",
    "/forgot-password",
    "/verify-otp",
    "/reset-password",
    "/dashboard",
    "/analytics",
    "/users",
    "/showrooms",
    "/showrooms/1",
    "/cms",
    "/cms/privacy-policy",
    "/cms/terms-and-conditions",
    "/cms/help-center",
    "/showroom-join-requests",
    "/showroom-join-requests/1",
  ].map((route) => ({ route, width: 1440 })),
  ...["2", "3", "4"].map((step) => ({
    route: `/showroom-join-requests/4/setup?step=${step}`,
    width: 1440,
  })),
  { route: "/users?status=active&pageSize=10", width: 390, action: "search" },
  { route: "/cms/privacy-policy", width: 390, action: "english" },
  {
    route: "/cms/terms-and-conditions",
    width: 768,
    dark: true,
    action: "english",
  },
  { route: "/cms/help-center", width: 390, action: "question-select" },
  { route: "/cms/help-center", width: 768, dark: true, action: "question" },
  { route: "/verify-otp", width: 390, action: "otp" },
  { route: "/dashboard", width: 768, dark: true, action: "dates" },
  { route: "/analytics", width: 768, dark: true },
  { route: "/showrooms/1", width: 768, dark: true, action: "content" },
  { route: "/dashboard", width: 390, action: "notifications" },
  { route: "/dashboard", width: 1440, action: "profile" },
  { route: "/dashboard", width: 390, action: "sidebar" },
  {
    route: "/forgot-password",
    width: 1440,
    dark: true,
    action: "focus-submit",
  },
  { route: "/showroom-join-requests/4/setup?step=2", width: 390 },
  { route: "/showroom-join-requests/4/setup?step=3", width: 1440, dark: true },
];

export async function applyAcceptanceAction(page, action) {
  if (action === "search") await page.getByRole("searchbox").fill("missing");
  if (action === "english")
    await page.getByRole("button", { name: "English", exact: true }).click();
  if (action?.startsWith("question"))
    await page.getByRole("button", { name: "إضافة سؤال", exact: true }).click();
  if (action === "question-select")
    await page.getByRole("dialog").getByRole("combobox").first().click();
  if (action === "dates")
    await page.getByRole("button", { name: "مخصص", exact: true }).click();
  if (action === "content")
    await page.getByRole("button", { name: "المحتوى", exact: true }).click();
  if (action === "notifications")
    await page.getByRole("button", { name: "الإشعارات", exact: true }).click();
  if (action === "profile")
    await page.getByRole("button", { name: "قائمة حساب المدير" }).click();
  if (action === "sidebar")
    await page.getByRole("button", { name: "فتح القائمة" }).click();
  if (action === "focus-submit")
    await page.locator('button[type="submit"]').focus();
  if (action === "otp")
    await page
      .getByLabel("رقم رمز التحقق 1", { exact: true })
      .evaluate((element) => {
        const event = new Event("paste", { bubbles: true, cancelable: true });
        Object.defineProperty(event, "clipboardData", {
          value: { getData: () => "123456" },
        });
        element.dispatchEvent(event);
      });
}
