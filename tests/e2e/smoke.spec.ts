import { expect, test } from '@playwright/test';

test('bilingual navigation renders data flows and sources without runtime errors', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Digital Romania Atlas', exact: true })).toBeVisible();
  await expect(page.locator('html')).toHaveAttribute('lang', 'ro');
  await page.getByRole('button', { name: 'EN', exact: true }).click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await page.getByRole('button', { name: 'Data flows', exact: true }).click();
  await expect(page.locator('main svg')).toBeVisible();
  await expect(page.locator('main svg text').first()).toBeVisible();
  await page.getByRole('button', { name: 'Sources', exact: true }).click();
  await expect(page.locator('main a[href^="http"]').first()).toBeVisible();
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await page.getByRole('button', { name: 'RO', exact: true }).click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'ro');
  expect(errors).toEqual([]);
});
