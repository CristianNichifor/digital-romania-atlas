import { expect, test } from '@playwright/test';

for (const [width, min] of [[1440, 36], [390, 44]] as const) {
  test(`navigation targets are at least ${min} px tall at ${width} px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    const targets = page.locator('header nav a, header nav button');
    await expect(targets.first()).toBeVisible();
    const heights = await targets.evaluateAll(els => els.map(el => el.getBoundingClientRect().height));
    expect(heights.length).toBeGreaterThan(11);
    for (const h of heights) expect(h).toBeGreaterThanOrEqual(min);
  });
}
