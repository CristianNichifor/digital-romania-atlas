import { expect, test } from '@playwright/test';

test('bilingual navigation renders data flows and sources without runtime errors', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Digital Romania Atlas', exact: true })).toBeVisible();
  await expect(page.locator('html')).toHaveAttribute('lang', 'ro');
  await page.getByRole('button', { name: /^EN\b/ }).click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await page.getByRole('link', { name: 'Data flows', exact: true }).click();
  await expect(page.locator('main svg')).toBeVisible();
  await expect(page.locator('main svg text').first()).toBeVisible();
  await page.getByRole('link', { name: 'Sources', exact: true }).click();
  await expect(page.locator('main a[href^="http"]').first()).toBeVisible();
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await page.getByRole('button', { name: /^RO\b/ }).click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'ro');
  expect(errors).toEqual([]);
});

test('the map draws all 42 counties with their names', async ({ page }) => {
  await page.goto('/#/map');
  await expect(page.locator('main svg path.county')).toHaveCount(42);
  await expect(page.locator('main')).toContainText('geoBoundaries');
  await expect(page.locator('main svg path.county').first()).toHaveAttribute('d', /^M/);
});
