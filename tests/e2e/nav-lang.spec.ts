import { expect, test } from "@playwright/test";

test.use({ viewport: { width: 390, height: 844 } });

test("the language toggle stays on screen on a phone, whatever tab is open", async ({
  page,
}) => {
  for (const view of ["summary", "sources"]) {
    await page.goto(`/#/${view}`);
    const toggle = page.locator("header .lang-toggle");
    await expect(toggle).toBeInViewport({ ratio: 1 });
    const box = await toggle.boundingBox();
    expect(box!.width).toBeGreaterThanOrEqual(44);
    expect(box!.height).toBeGreaterThanOrEqual(44);
  }
});

test("the tab strip marks the side that hides more tabs", async ({ page }) => {
  await page.goto("/");
  const nav = page.locator("header nav");
  await expect(nav).toHaveClass(/more-after/);
  await expect(nav).not.toHaveClass(/more-before/);
  await page.evaluate(() => (window.location.hash = "#/sources"));
  await expect(nav).toHaveClass(/more-before/);
  await expect(nav).not.toHaveClass(/more-after/);
});
