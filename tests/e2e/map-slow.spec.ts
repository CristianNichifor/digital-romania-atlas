import { expect, test } from '@playwright/test';

test('a slow boundaries request stages the loading message', async ({ page }) => {
  await page.route('**/ro-counties.geojson', async route => {
    await new Promise(r => setTimeout(r, 3500));
    await route.continue();
  });
  await page.goto('/#/map');
  await expect(page.getByRole('status')).toHaveText('Se încarcă harta…');
  await expect(page.getByRole('progressbar')).toHaveCount(0);
  await expect(page.getByRole('status')).toContainText('conexiunea pare lentă', { timeout: 3000 });
  await expect(page.getByRole('progressbar', { name: /conexiunea pare lentă/ })).toBeVisible();
  await expect(page.locator('main svg path.county')).toHaveCount(42, { timeout: 10000 });
});
