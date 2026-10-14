import { expect, test } from '@playwright/test';

test('a flow filter with no match says so and offers a reset', async ({ page }) => {
  await page.goto('/#/flows');
  const institutions = page.locator('.legend-row').nth(1);
  await institutions.locator('.legend-chip', { hasText: /^Sursă autentică$/ }).click();
  const empty = page.locator('.flows-empty[role="status"]');
  await expect(empty).toContainText('Identitate');
  await expect(empty).toContainText('Sursă autentică');

  await empty.getByRole('button', { name: 'Șterge filtrele' }).click();
  await expect(empty).toHaveCount(0);
  await expect(page.locator('.legend-chip[aria-pressed="true"]')).toHaveCount(0);
  const list = page.locator('details.flow-list');
  await list.locator('summary').click();
  await expect(list.locator('tbody tr').first()).toBeVisible();
});
