import { expect, test } from '@playwright/test';

test('map zoom controls are labelled in the app language', async ({ page }) => {
  await page.goto('/#/map');
  const controls = page.locator('.map-controls');
  await expect(controls.getByRole('button', { name: 'Mărește harta' })).toBeVisible();
  await expect(controls.getByRole('button', { name: 'Micșorează harta' })).toBeVisible();
  await expect(controls.getByRole('button', { name: 'Resetează zoom-ul' })).toBeVisible();
  await page.getByRole('button', { name: /^EN\b/ }).click();
  await expect(controls.getByRole('button', { name: 'Zoom in' })).toBeVisible();
  await expect(controls.getByRole('button', { name: 'Reset zoom' })).toBeVisible();
});
