import { expect, test } from '@playwright/test';
import { DC_PLACEMENT, REGIONAL_DCS, UNDERGROUND_SITES } from '../../src/data/resilience';

// The same sites the map draws (MapView: sovereign DC-A/B/C, regional micro-DCs not folded into DC-B, underground vaults).
const drawn =
  DC_PLACEMENT.filter(d => ['dc-a', 'dc-b', 'dc-c'].includes(d.id)).length +
  REGIONAL_DCS.filter(r => !/covered by DC-B/.test(r.city.en)).length +
  UNDERGROUND_SITES.length;

test('the proposed data centres can be read as a table, each badged as a proposal', async ({ page }) => {
  await page.goto('/#/map');
  const table = page.locator('details.map-dc-table');
  await expect(table.locator('summary')).toContainText(`(${drawn})`);
  await table.locator('summary').click();
  const rows = table.locator('tbody tr');
  await expect(rows).toHaveCount(drawn);
  await expect(rows.locator('.badge-proposal')).toHaveCount(drawn);
  await expect(rows.locator('.badge-proposal').first()).toHaveText('Propunere');
  await expect(rows.first()).toContainText('DC-A · Cluj');
});
