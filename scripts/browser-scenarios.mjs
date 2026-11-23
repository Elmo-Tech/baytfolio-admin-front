export async function exerciseDashboard(page, capture, go, width) {
  await go("/dashboard");
  await page.getByRole("button", { name: "الإشعارات", exact: true }).hover();
  await capture("notification-hover");
  await page.getByRole("button", { name: "الإشعارات", exact: true }).focus();
  await capture("notification-focus");
  await page.getByRole("button", { name: "الإشعارات", exact: true }).click();
  await capture("notifications");
  await page.getByRole("button", { name: "الإشعارات", exact: true }).click();
  await page.getByRole("button", { name: "قائمة حساب المدير" }).click();
  await capture("profile-menu");
  await page.getByRole("button", { name: "Log out" }).click();
  if (width < 1226) {
    await page.getByRole("button", { name: "فتح القائمة" }).click();
    await capture("mobile-navigation");
    await go("/dashboard");
  }
  await page.getByRole("button", { name: "مخصص", exact: true }).click();
  await capture("custom-date-range");
  await go("/users?status=active&pageSize=10");
  await page.getByRole("searchbox").fill("missing");
  await capture("users-empty-filter");
  await page.reload();
  await capture("users-filter-refresh");
  await go("/showrooms");
  await page
    .getByRole("button", { name: "عرض تفاصيل معرض النخبة العقاري" })
    .click();
  await capture("showroom-row-navigation");
  await page.goBack();
  await capture("showroom-back");
  for (const step of ["2", "3", "4"]) {
    await go(`/showroom-join-requests/4/setup?step=${step}`);
    await capture(`onboarding-step-${step}`);
  }
}

export async function exerciseEditors(page, capture, go) {
  await go("/cms/help-center");
  await page.getByRole("button", { name: "إضافة سؤال", exact: true }).click();
  await page.getByRole("button", { name: "English", exact: true }).click();
  await capture("question-english");
  await page.getByRole("button", { name: "إضافة السؤال", exact: true }).click();
  await capture("question-validation");
  await page.locator("#help-question").fill("سؤال تجربة محلية");
  await page.locator("#help-answer").fill("إجابة تجربة محلية");
  await page.getByRole("button", { name: "إضافة السؤال", exact: true }).click();
  await page.reload();
  await capture("question-persisted");
  await page
    .getByRole("button", { name: "تعديل", exact: true })
    .first()
    .click();
  await capture("question-edit");
  await page.getByRole("button", { name: "إلغاء", exact: true }).click();
  await page.getByRole("button", { name: "إضافة سؤال", exact: true }).click();
  await capture("question-new-reset");
  await go("/cms/privacy-policy");
  await page.getByRole("button", { name: "English", exact: true }).click();
  await page.locator("textarea").first().fill("Local preview content");
  await capture("privacy-english-edited");
  await go("/cms/terms-and-conditions");
  await page.getByRole("button", { name: "English", exact: true }).click();
  await capture("terms-english");
}

export async function exerciseAuth(page, capture, go) {
  await go("/login");
  await page.getByRole("checkbox").check();
  await page.locator('button[type="submit"]').click();
  await capture("login-validation-checkbox");
  await go("/verify-otp");
  await page
    .getByLabel("رقم رمز التحقق 1", { exact: true })
    .evaluate((element) => {
      const event = new Event("paste", { bubbles: true, cancelable: true });
      Object.defineProperty(event, "clipboardData", {
        value: { getData: () => "123456" },
      });
      element.dispatchEvent(event);
    });
  await capture("otp-focus");
}
