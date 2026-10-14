import { expect, test } from '@playwright/test';

test.use({ viewport: { width: 390, height: 844 } });

async function expectActiveInView(page: import('@playwright/test').Page, id: string) {
  const link = page.locator(`header nav a[href="#/${id}"]`);
  await expect(link).toHaveAttribute('aria-current', 'page');
  await expect
    .poll(async () => {
      const nav = await page.locator('header nav').boundingBox();
      const box = await link.boundingBox();
      return box!.x >= nav!.x - 1 && box!.x + box!.width <= nav!.x + nav!.width + 1;
    })
    .toBe(true);
}

test('a deep link scrolls its nav link into view on a phone', async ({ page }) => {
  await page.goto('/#/resilience');
  await expectActiveInView(page, 'resilience');
});

test('following a route keeps the active nav link in view on a phone', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => (window.location.hash = '#/sources'));
  await expectActiveInView(page, 'sources');
  await page.evaluate(() => (window.location.hash = '#/summary'));
  await expectActiveInView(page, 'summary');
});
