import { expect, test } from '@playwright/test';

const VIEWS = ['summary', 'stories', 'journeys', 'map', 'flows', 'timeline', 'compare', 'policy', 'strategy', 'resilience', 'sources'];

test.use({ viewport: { width: 390, height: 844 } });

for (const view of VIEWS) {
  test(`${view} has no horizontal page scroll at 390 px`, async ({ page }) => {
    await page.goto(`/#/${view}`);
    await expect(page.locator('main')).toBeVisible();
    await page.waitForLoadState('networkidle');
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth
    );
    expect(overflow).toBeLessThanOrEqual(0);
  });
}
