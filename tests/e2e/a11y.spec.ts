import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const VIEWS = [
  'summary', 'stories', 'map', 'flows', 'compare', 'policy',
  'timeline', 'journeys', 'strategy', 'resilience', 'sources',
];

for (const lang of ['ro', 'en'] as const) {
  for (const view of VIEWS) {
    test(`${view} (${lang}) has no WCAG 2.1 A/AA violations`, async ({ page }) => {
      await page.addInitScript(l => localStorage.setItem('dra-lang', l), lang);
      await page.goto(`/#/${view}`);
      await expect(page.locator('html')).toHaveAttribute('lang', lang);
      await expect(page.locator('nav a[aria-current="page"]')).toHaveAttribute('href', `#/${view}`);
      if (view === 'map') await expect(page.locator('main svg path').first()).toBeVisible();
      const { violations } = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();
      const summary = violations.map(v => `${v.id} (${v.nodes.length}): ${v.nodes.slice(0, 3).map(n => n.target.join(' ')).join(' | ')}`);
      expect(summary).toEqual([]);
    });
  }
}

test('the language toggle names its action and includes its visible text', async ({ page }) => {
  await page.goto('/');
  const toggle = page.getByRole('button', { name: /^EN\b.*English/ });
  await expect(toggle).toHaveText('EN');
});

test('keyboard focus is visible on navigation links', async ({ page }) => {
  await page.goto('/');
  const link = page.getByRole('navigation').getByRole('link').first();
  await link.focus();
  await page.keyboard.press('Tab');
  await page.keyboard.press('Shift+Tab');
  const outline = await link.evaluate(el => {
    const s = getComputedStyle(el);
    return { style: s.outlineStyle, width: parseFloat(s.outlineWidth) };
  });
  expect(outline.style).not.toBe('none');
  expect(outline.width).toBeGreaterThanOrEqual(2);
});
