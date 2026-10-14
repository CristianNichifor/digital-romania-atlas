import { expect, test } from '@playwright/test';

test('a failed boundaries request shows an alert with a working retry', async ({ page }) => {
  let failed = false;
  await page.route('**/ro-counties.geojson', route => {
    if (failed) return route.continue();
    failed = true;
    return route.abort();
  });
  await page.goto('/#/map');
  await expect(page.getByRole('alert')).toBeVisible();
  await page.getByRole('button', { name: /Reîncearcă/ }).click();
  await expect(page.locator('main svg path.county')).toHaveCount(42);
});

test('county labels clear the UAT markers and Vrancea is labelled once', async ({ page }) => {
  await page.goto('/#/map');
  await expect(page.locator('main svg path.county')).toHaveCount(42);
  const overlaps = await page.evaluate(() => {
    const labels = [...document.querySelectorAll('text.county-label')].map(el => el.getBoundingClientRect());
    const dots = [...document.querySelectorAll('g.marker.uat circle')].map(el => {
      const r = el.getBoundingClientRect();
      return { x: r.x + r.width / 2, y: r.y + r.height / 2 };
    });
    let n = 0;
    for (const d of dots)
      for (const l of labels)
        if (d.x > l.left && d.x < l.right && d.y > l.top && d.y < l.bottom) n++;
    return { n, dots: dots.length };
  });
  expect(overlaps.dots).toBe(42);
  expect(overlaps.n).toBe(0);
  await expect(page.locator('main svg text', { hasText: /^Vrancea$/ })).toHaveCount(1);
});

test('legend chips stay on one line and the caption explains the DCs', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/#/map');
  const chips = page.locator('.legend-chip');
  await expect(chips.first()).toBeVisible();
  for (const chip of await chips.all())
    await expect(chip).toHaveCSS('white-space', 'nowrap');
  const caption = page.locator('.map-caption');
  await expect(caption).toContainText('DC-A');
  await expect(caption).toContainText('DC-C');
  await expect(caption).toContainText('întrerupte');
});

test('a slow boundaries request shows a staged message after 2 s', async ({ page }) => {
  await page.route('**/ro-counties.geojson', async route => {
    await new Promise(r => setTimeout(r, 3500));
    return route.continue();
  });
  await page.goto('/#/map');
  const status = page.getByRole('status');
  await expect(status).toHaveText(/Se încarcă harta/);
  await expect(status).toHaveText(/contururile județelor/, { timeout: 4000 });
  await expect(page.locator('main svg path.county')).toHaveCount(42, { timeout: 10000 });
});
