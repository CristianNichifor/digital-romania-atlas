import { expect, test } from '@playwright/test';

const nav = (page: import('@playwright/test').Page, name: string) =>
  page.getByRole('navigation').getByRole('link', { name, exact: true });

test('views have hash routes that work with back and forward', async ({ page }) => {
  await page.goto('/?scenario=700');
  await expect(nav(page, 'Rezumat')).toHaveAttribute('aria-current', 'page');

  await nav(page, 'Comparație').click();
  await expect(page).toHaveURL(/\?scenario=700#\/compare$/);
  await expect(nav(page, 'Comparație')).toHaveAttribute('aria-current', 'page');

  await nav(page, 'Surse').click();
  await expect(page).toHaveURL(/\?scenario=700#\/sources$/);

  await page.goBack();
  await expect(page).toHaveURL(/#\/compare$/);
  await expect(nav(page, 'Comparație')).toHaveAttribute('aria-current', 'page');

  await page.goForward();
  await expect(nav(page, 'Surse')).toHaveAttribute('aria-current', 'page');
});

test('a hash URL opens its view and unknown hashes fall back to the summary', async ({ page }) => {
  await page.goto('/#/flows');
  await expect(nav(page, 'Fluxuri de date')).toHaveAttribute('aria-current', 'page');
  await expect(page.locator('main svg').first()).toBeVisible();

  await page.goto('/#/nope');
  await expect(nav(page, 'Rezumat')).toHaveAttribute('aria-current', 'page');
});
