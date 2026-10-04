import { expect, test } from '@playwright/test'
import { demoAccounts, DEMO_PASSWORD } from '../src/modules/auth/constants/demo-accounts'

for (const account of demoAccounts.filter(
  (candidate) => candidate.active && candidate.organizationActive,
)) {
  test(`login and logout: ${account.scope} / ${account.role}`, async ({ page }) => {
    const errors: string[] = []
    page.on('pageerror', (error) => errors.push(error.message))
    await page.goto(`/${account.scope}`)
    await expect(page).toHaveURL(/\/login\?returnTo=/)
    await page.getByLabel('البريد الإلكتروني').fill(account.email)
    await page.getByLabel('كلمة المرور', { exact: true }).fill(DEMO_PASSWORD)
    await page.getByRole('button', { name: 'تسجيل الدخول', exact: true }).click()
    await expect(
      page.getByRole('heading', {
        name: `جلسة ${account.scope === 'vendor' ? 'Vendor' : 'Admin'} التجريبية`,
      }),
    ).toBeVisible()
    await expect(page.getByText(`الدور: ${account.role}`, { exact: true })).toBeVisible()
    await page.getByRole('link', { name: 'اختبار المسار الخاص بالداشبورد الآخر' }).click()
    await expect(
      page.getByRole('heading', { name: 'لا يمكنك فتح هذه الداشبورد بهذا الحساب.' }),
    ).toBeVisible()
    await page.getByRole('link', { name: 'العودة إلى داشبورد حسابك' }).click()
    await page.getByRole('button', { name: 'تسجيل الخروج', exact: true }).click()
    await expect(page.getByRole('button', { name: 'تسجيل الدخول', exact: true })).toBeVisible()
    expect(errors).toEqual([])
  })
}
test('expiration preserves local return context and refresh resets the demo', async ({ page }) => {
  await page.goto('/login?returnTo=%2Fvendor%3Ftab%3Dexample')
  await page.getByLabel('البريد الإلكتروني').fill('owner@vendor.example')
  await page.getByLabel('كلمة المرور', { exact: true }).fill(DEMO_PASSWORD)
  await page.getByRole('button', { name: 'تسجيل الدخول', exact: true }).click()
  await expect(page).toHaveURL(/\/vendor\?tab=example/)
  await page.getByRole('button', { name: 'تجربة انتهاء الجلسة' }).click()
  await expect(page).toHaveURL(/returnTo=%2Fvendor%3Ftab%3Dexample/)
  await page.getByLabel('البريد الإلكتروني').fill('owner@vendor.example')
  await page.getByLabel('كلمة المرور', { exact: true }).fill(DEMO_PASSWORD)
  await page.getByRole('button', { name: 'تسجيل الدخول', exact: true }).click()
  await expect(page.getByRole('heading', { name: 'جلسة Vendor التجريبية' })).toBeVisible()
  await page.reload()
  await expect(page.getByRole('button', { name: 'تسجيل الدخول', exact: true })).toBeVisible()
})
test('password recovery rejects a wrong code and enables the new demo password', async ({
  page,
}) => {
  await page.goto('/forgot-password')
  await page.getByLabel('البريد الإلكتروني').fill('owner@vendor.example')
  await page.getByRole('button', { name: 'إرسال رمز الاسترجاع' }).click()
  await page.getByLabel('رمز الاسترجاع').fill('000000')
  await page.getByRole('button', { name: 'التحقق من الرمز' }).click()
  await expect(page.getByRole('alert')).toContainText('غير صحيح')
  await page.getByLabel('رمز الاسترجاع').fill('123456')
  await page.getByRole('button', { name: 'التحقق من الرمز' }).click()
  await page.getByLabel('كلمة المرور الجديدة', { exact: true }).fill('ChangedDemo!')
  await page.getByLabel('تأكيد كلمة المرور').fill('ChangedDemo!')
  await page.getByRole('button', { name: 'حفظ كلمة المرور' }).click()
  await expect(page.getByRole('status').filter({ hasText: 'تم تغيير كلمة المرور' })).toBeVisible()
  await page.getByRole('link', { name: 'العودة إلى تسجيل الدخول' }).click()
  await page.getByLabel('البريد الإلكتروني').fill('owner@vendor.example')
  await page.getByLabel('كلمة المرور', { exact: true }).fill('ChangedDemo!')
  await page.getByRole('button', { name: 'تسجيل الدخول', exact: true }).click()
  await expect(page.getByRole('heading', { name: 'جلسة Vendor التجريبية' })).toBeVisible()
})
test('valid vendor invitation provisions a demo member; invalid invitations fail', async ({
  page,
}) => {
  await page.goto('/invite/invalid')
  await expect(page.getByRole('alert')).toContainText('الدعوة غير صالحة')
  await page.goto('/invite/vendor-demo-invite')
  await page.getByLabel('الاسم', { exact: true }).fill('عضو تجريبي')
  await page.getByLabel('كلمة المرور الجديدة', { exact: true }).fill('InvitedDemo!')
  await page.getByLabel('تأكيد كلمة المرور').fill('InvitedDemo!')
  await page.getByRole('button', { name: 'قبول الدعوة' }).click()
  await expect(page.getByRole('status').filter({ hasText: 'تم قبول الدعوة' })).toBeVisible()
  await page.getByRole('link', { name: 'العودة إلى تسجيل الدخول' }).click()
  await page.getByLabel('البريد الإلكتروني').fill('invited@vendor.example')
  await page.getByLabel('كلمة المرور', { exact: true }).fill('InvitedDemo!')
  await page.getByRole('button', { name: 'تسجيل الدخول', exact: true }).click()
  await expect(page.getByText('الدور: Content Editor', { exact: true })).toBeVisible()
})
test('inactive vendor and incorrect credentials cannot enter', async ({ page }) => {
  await page.goto('/login')
  await page.getByLabel('البريد الإلكتروني').fill('suspended@vendor.example')
  await page.getByLabel('كلمة المرور', { exact: true }).fill(DEMO_PASSWORD)
  await page.getByRole('button', { name: 'تسجيل الدخول', exact: true }).click()
  await expect(page.getByRole('alert')).toContainText('غير مفعّل')
  await page.getByLabel('البريد الإلكتروني').fill('owner@vendor.example')
  await page.getByLabel('كلمة المرور', { exact: true }).fill('wrong')
  await page.getByRole('button', { name: 'تسجيل الدخول', exact: true }).click()
  await expect(page.getByRole('alert')).toContainText('غير صحيحة')
})
test('unsafe return URLs stay local and unknown routes render 404', async ({ page }) => {
  await page.goto('/login?returnTo=https%3A%2F%2Fevil.example')
  await page.getByLabel('البريد الإلكتروني').fill('super@admin.example')
  await page.getByLabel('كلمة المرور', { exact: true }).fill(DEMO_PASSWORD)
  await page.getByRole('button', { name: 'تسجيل الدخول', exact: true }).click()
  await expect(page).toHaveURL(/\/admin$/)
  await page.goto('/unknown')
  await expect(page.getByRole('heading', { name: '404 — Page not found' })).toBeVisible()
})
