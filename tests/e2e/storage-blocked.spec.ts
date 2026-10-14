import { expect, test } from '@playwright/test';

// Private windows and blocked site data make every localStorage access throw.
test('renders and switches language when localStorage throws', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, 'localStorage', {
      configurable: true,
      get() {
        throw new DOMException('blocked', 'SecurityError');
      },
    });
  });
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Digital Romania Atlas', exact: true })).toBeVisible();
  await page.getByRole('button', { name: /^EN/ }).click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await page.getByRole('link', { name: 'Comparison', exact: true }).click();
  await expect(page.locator('main')).not.toBeEmpty();
  await page.waitForTimeout(2000); // the scenario poll reads storage every 1.5 s
  expect(errors).toEqual([]);
});
