import { expect, test } from '@playwright/test';

const VIEWS = [
  'summary', 'stories', 'map', 'flows', 'compare', 'policy',
  'timeline', 'journeys', 'strategy', 'resilience', 'sources',
];

test('the footer carries a privacy notice in both languages', async ({ page }) => {
  await page.goto('/');
  const notice = page.locator('footer details.privacy');
  await notice.locator('summary').click();
  await expect(notice).toContainText('Confidențialitate');
  await expect(notice).toContainText('cookie');
  await expect(notice).toContainText('Cloudflare Pages');
  await expect(notice).toContainText('Cristian Nichifor');
  await expect(notice.locator('a[href="https://github.com/CristianNichifor/digital-romania-atlas/issues"]')).toBeVisible();

  await page.getByRole('button', { name: /^EN\b/ }).click();
  await expect(notice).toContainText('Privacy');
  await expect(notice).toContainText('no analytics');
});

test('pages are served with a content security policy and run without violations', async ({ page, context }) => {
  const violations: string[] = [];
  page.on('console', msg => {
    if (/Content Security Policy|Refused to/i.test(msg.text())) violations.push(msg.text());
  });
  const response = await page.goto('/');
  const headers = response!.headers();
  expect(headers['content-security-policy']).toContain("default-src 'self'");
  expect(headers['content-security-policy']).toContain("frame-ancestors 'none'");
  expect(headers['x-content-type-options']).toBe('nosniff');
  expect(headers['referrer-policy']).toBe('strict-origin-when-cross-origin');

  for (const view of VIEWS) {
    await page.goto(`/#/${view}`);
    await expect(page.locator('main')).not.toBeEmpty();
  }
  await page.goto('/#/map');
  await expect(page.locator('main svg path.county').first()).toBeVisible();
  expect(violations).toEqual([]);
  expect(await context.cookies()).toEqual([]);
});
