import { expect, test } from '@playwright/test';
import { INSTITUTIONS } from '../../src/data/institutions';
import { COMPARISON } from '../../src/data/comparison';
import { FLOWS } from '../../src/data/flows';

test('the summary counts come from the data and link to their views', async ({ page }) => {
  await page.goto('/');
  const counts = page.locator('.summary-counts button');
  await expect(counts).toHaveCount(3);
  const proposed = FLOWS.filter(f => f.status === 'proposed').length;
  await expect(counts.nth(0)).toHaveText(`${INSTITUTIONS.length} instituții pe hartă`);
  await expect(counts.nth(1)).toHaveText(`${COMPARISON.length} dimensiuni comparate`);
  await expect(counts.nth(2)).toHaveText(`${proposed} fluxuri noi propuse`);
  await counts.nth(2).click();
  await expect(page).toHaveURL(/#\/flows$/);
  await expect(page.locator('.diff-banner strong')).toContainText(String(proposed));
});
