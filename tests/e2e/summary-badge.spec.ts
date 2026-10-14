import { expect, test } from '@playwright/test';

test('the summary lead is badged as a proposal', async ({ page }) => {
  await page.goto('/');
  const badge = page.locator('.summary-hero .badge-proposal');
  await expect(badge).toHaveText('Propunere');
  const next = badge.locator('xpath=following-sibling::p[1]');
  await expect(next).toHaveText(/^Propunem:/);
  await page.getByRole('button', { name: /^EN\b/ }).click();
  await expect(badge).toHaveText('Proposal');
});
