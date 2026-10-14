import { expect, test } from '@playwright/test';
import { INSTITUTIONS } from '../../src/data/institutions';

const onMap = INSTITUTIONS.filter(i => i.county && i.county !== '*' && i.lat != null && i.lon != null);

test('the map can be read as a table that follows the filter', async ({ page }) => {
  await page.goto('/#/map');
  const table = page.locator('details.map-table');
  await table.locator('summary').click();
  await expect(table.locator('tbody tr')).toHaveCount(onMap.length);
  await page.locator('.legend-chip', { hasText: 'Sursă' }).first().click();
  const sources = onMap.filter(i => i.category === 'source').length;
  await expect(table.locator('tbody tr')).toHaveCount(sources);
});

test('a filter with no institutions on the map says so and can be reset', async ({ page }) => {
  await page.goto('/#/map');
  await page.locator('.legend-chip', { hasText: 'Cetățean / Wallet' }).click();
  const empty = page.locator('.map-empty[role="status"]');
  await expect(empty).toContainText('Cetățean / Wallet');
  await empty.getByRole('button').click();
  await expect(empty).toHaveCount(0);
});
