import { expect, test } from "@playwright/test";

for (const width of [1440, 390]) {
  test(`the first Tab on a deep link starts at the top of the page at ${width} px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/#/map");
    await expect(
      page.locator('header nav a[aria-current="page"]')
    ).toHaveAttribute("href", "#/map");
    await page.keyboard.press("Tab");
    await expect(page.locator(".family-bar a")).toBeFocused();
  });
}
