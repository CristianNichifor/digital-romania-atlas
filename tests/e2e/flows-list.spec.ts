import { expect, test } from '@playwright/test';

test('the flow graph has a list alternative that follows the filters', async ({ page }) => {
  await page.goto('/#/flows');
  const list = page.locator('details.flow-list');
  await list.locator('summary').click();
  const rows = list.locator('tbody tr');
  await expect(rows.first()).toBeVisible();
  await expect(list.locator('tbody td:nth-child(4)', { hasText: /^actual$/ })).toHaveCount(0);
  const diffCount = await rows.count();
  await expect(list.locator('summary')).toContainText(`(${diffCount})`);

  await page.getByRole('button', { name: /^Propunerea noastră/ }).click();
  await page.locator('.legend-row').first().locator('.legend-chip', { hasText: /^Identitate$/ }).click();
  expect(await rows.count()).toBeGreaterThan(diffCount);
});
