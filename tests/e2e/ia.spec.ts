import { expect, test } from '@playwright/test';

test('navigation is grouped and keeps the hash routes', async ({ page }) => {
  await page.goto('/');
  const groups = {
    Înțelege: ['Rezumat', 'Povești', 'Pași cetățean'],
    Explorează: ['Harta României', 'Fluxuri de date', 'Calendar'],
    Argument: ['Comparație', 'Analiză', 'Strategie', 'Reziliență'],
  };
  for (const [name, links] of Object.entries(groups)) {
    const group = page.getByRole('group', { name, exact: true });
    await expect(group.getByRole('link')).toHaveText(links);
  }
  await expect(page.getByRole('navigation').getByRole('link')).toHaveCount(11);
  for (const id of ['summary', 'stories', 'journeys', 'map', 'flows', 'timeline', 'compare', 'policy', 'strategy', 'resilience', 'sources'])
    await expect(page.locator(`nav a[href="#/${id}"]`)).toHaveCount(1);
});

test('the summary lead is a proposal and the Romanian copy is translated', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.summary-sub')).toHaveText(/^Propunem:/);
  await expect(page.locator('main')).not.toContainText("verify, don't trust");
});

test('the logo stays square on a phone', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const box = await page.locator('.logo').boundingBox();
  expect(box && Math.abs(box.width - box.height)).toBeLessThan(1);
});

test('the flows view opens on the difference with the identity filter', async ({ page }) => {
  await page.goto('/#/flows');
  await expect(page.getByRole('button', { name: /^Diferența/ })).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('.legend-row').first().locator('.legend-chip', { hasText: /^Identitate$/ })).toHaveAttribute('aria-pressed', 'true');
});
