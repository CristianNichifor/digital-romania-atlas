import { expect, test } from '@playwright/test';

test('the summary columns carry a status badge and where their claims come from', async ({ page }) => {
  await page.goto('/');
  const today = page.locator('.summary-card.today');
  await expect(today.locator('.card-badge')).toHaveText('Situația actuală');
  await expect(today.locator('.card-src')).toContainText('eIDAS 2.0');
  await expect(today.locator('.card-src a')).toHaveAttribute('href', '#/sources');

  const proposal = page.locator('.summary-card.proposal');
  await expect(proposal.locator('.card-badge')).toHaveText('Propunere');
  await expect(proposal.locator('.card-src a')).toHaveAttribute('href', '#/compare');

  await page.getByRole('button', { name: /^EN\b/ }).click();
  await expect(today.locator('.card-badge')).toHaveText('Current situation');
});
