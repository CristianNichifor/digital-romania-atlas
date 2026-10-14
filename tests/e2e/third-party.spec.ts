import { expect, test } from '@playwright/test';

test('loads no third-party resources and serves Inter itself', async ({ page, baseURL }) => {
  const origin = new URL(baseURL!).origin;
  const foreign: string[] = [];
  const fonts: string[] = [];
  page.on('request', request => {
    const url = request.url();
    if (url.startsWith('data:')) return;
    if (new URL(url).origin !== origin) foreign.push(url);
    if (request.resourceType() === 'font') fonts.push(url);
  });
  await page.goto('/');
  await page.getByRole('link', { name: 'Harta României', exact: true }).click();
  await expect(page.locator('main svg path').first()).toBeVisible();
  await page.evaluate(() => document.fonts.ready);
  expect(foreign).toEqual([]);
  expect(fonts.some(f => /inter/i.test(f))).toBe(true);
  expect(await page.evaluate(() => document.fonts.check('16px "Inter Variable"'))).toBe(true);
});
