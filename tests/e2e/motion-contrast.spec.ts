import { expect, test } from '@playwright/test';

test('reduced motion stops the fibre-link animation', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/#/map');
  const link = page.locator('.res-link.fiber').first();
  await expect(link).toBeAttached();
  await expect(link).toHaveCSS('animation-name', 'none');
});

test('forced colours keep chip borders and mark the active chip', async ({ page }) => {
  await page.emulateMedia({ forcedColors: 'active' });
  await page.goto('/#/flows');
  const active = page.locator('.legend-chip[aria-pressed="true"]').first();
  await expect(active).toHaveCSS('outline-style', 'solid');
  await expect(page.locator('.legend-chip').first()).toHaveCSS('border-top-style', 'solid');
});
