import { expect, test } from '@playwright/test';

test('a family bar above the header links back to the hub', async ({ page }) => {
  await page.goto('/');
  const link = page.locator('.family-bar a');
  await expect(link).toHaveText('← Toate proiectele');
  await expect(link).toHaveAttribute('href', 'https://projects.cristian-nichifor.com/');
  await page.getByRole('button', { name: /^EN\b/ }).click();
  await expect(link).toHaveText('← All projects');
});
