import { expect, test } from '@playwright/test';

test('map tooltips come from the locale files in both languages', async ({ page }) => {
  await page.goto('/#/map');
  await expect(page.locator('main svg path.county')).toHaveCount(42);
  const epicentre = page.locator('.vrancea-epicentre');
  // Markers can sit on top of the epicentre; React derives onMouseEnter from mouseover.
  await epicentre.dispatchEvent('mouseover');
  const tip = page.locator('.map-tip');
  await expect(tip).toContainText('Epicentrul seismic Vrancea');
  await expect(tip).toContainText('Inel interior 50 km');
  await epicentre.dispatchEvent('mouseout');
  await page.getByRole('button', { name: /^EN\b/ }).click();
  await epicentre.dispatchEvent('mouseover');
  await expect(tip).toContainText('Vrancea seismic epicentre');
});
