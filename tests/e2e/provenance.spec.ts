import { expect, test } from '@playwright/test';
import { META } from '../../src/data/meta';

for (const view of ['compare', 'policy', 'strategy', 'resilience', 'timeline', 'journeys', 'stories']) {
  test(`${view} shows a provenance line with the data date`, async ({ page }) => {
    await page.goto(`/#/${view}`);
    const prov = page.locator('main .prov').first();
    await expect(prov).toContainText('Date:');
    await expect(prov.locator('time')).toHaveAttribute('datetime', META.dataAsOf);
    await expect(prov.locator('a')).toHaveAttribute('href', '#/sources');
  });
}
