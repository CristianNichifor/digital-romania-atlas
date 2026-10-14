import { expect, test } from '@playwright/test';
import { FLOWS } from '../../src/data/flows';

test('the diff banner is a status with the computed count of added flows', async ({ page }) => {
  await page.goto('/#/flows');
  const banner = page.locator('.diff-banner');
  await expect(banner).toHaveAttribute('role', 'status');
  const added = FLOWS.filter(f => f.status === 'proposed').length;
  await expect(banner.locator('strong')).toHaveText(`${added} fluxuri noi`);
});
