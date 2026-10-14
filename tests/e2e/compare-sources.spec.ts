import { expect, test } from '@playwright/test';

test('comparison rows link their footnotes to existing Surse entries', async ({ page }) => {
  await page.goto('/#/compare');

  const rows = page.locator('.compare-table:not(.eu-table) tbody tr');
  const footnotes = rows.locator('.source-refs a');
  expect(await footnotes.count()).toBeGreaterThan(0);

  const targets = await footnotes.evaluateAll((links) =>
    links.map((a) => ({ href: a.getAttribute('href'), label: a.textContent?.trim() })),
  );
  for (const { href, label } of targets) {
    expect(href).toMatch(/^#\/sources\/\d+$/);
    expect(label).toBe(href!.split('/').pop());
  }

  const first = footnotes.first();
  const n = (await first.textContent())!.trim();
  await first.click();
  await expect(page).toHaveURL(new RegExp(`#/sources/${n}$`));
  await expect(page.getByRole('navigation').getByRole('link', { name: 'Surse', exact: true })).toHaveAttribute(
    'aria-current',
    'page',
  );
  const card = page.locator(`#source-${n}`);
  await expect(card).toBeVisible();
  await expect(card).toBeFocused();
  await expect(card.locator('.source-number')).toHaveText(`[${n}]`);

  // Every footnote number points to a card that exists.
  const cardCount = await page.locator('.source-card').count();
  for (const { label } of targets) {
    expect(Number(label)).toBeGreaterThanOrEqual(1);
    expect(Number(label)).toBeLessThanOrEqual(cardCount);
  }
});
