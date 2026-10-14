import { expect, test } from '@playwright/test';

test('map category chips carry distinct shapes and aria-pressed', async ({ page }) => {
  await page.goto('/#/map');
  const chips = page.locator('.panel-head .legend-chip');
  await expect(chips.first()).toBeVisible();
  const shapes = await chips.locator('.chip-symbol').evaluateAll(els => els.map(el => el.getAttribute('data-shape')));
  expect(shapes.length).toBe(await chips.count());
  expect(new Set(shapes).size).toBe(shapes.length);
  await expect(chips.first()).toHaveAttribute('aria-pressed', 'false');
  await chips.first().click();
  await expect(chips.first()).toHaveAttribute('aria-pressed', 'true');
});
