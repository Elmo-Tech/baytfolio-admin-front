import { expect, test } from '@playwright/test'

test('foundation loads and unknown routes return to the root', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  await page.goto('/')
  await expect(page).toHaveTitle('BaytFolio Dashboard')
  await expect(page.getByRole('heading', { name: 'BaytFolio Dashboard' })).toBeVisible()
  await page.goto('/unknown')
  await expect(page.getByRole('heading', { name: '404 — Page not found' })).toBeVisible()
  await page.getByRole('link', { name: 'Return to start' }).click()
  await expect(page).toHaveURL('/')
  await expect(page.getByRole('heading', { name: 'BaytFolio Dashboard' })).toBeVisible()
  expect(errors).toEqual([])
})
