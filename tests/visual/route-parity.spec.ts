import { expect, test } from "@playwright/test";
import { siteRoutes } from "../../src/data/routes";

test.describe("Astro route parity", () => {
  for (const route of siteRoutes) {
    test(`${route} renders source-backed content`, async ({ page }) => {
      const response = await page.goto(route);
      expect(response?.status(), `${route} status`).toBeLessThan(400);
      await expect(page.locator("[data-site-header]")).toBeVisible();
      await expect(page.locator("h1").first()).toBeVisible();
      await expect(page.locator("body")).not.toContainText("Placeholder route for the Astro migration foundation");
    });
  }

  test("robots and sitemap expose the route inventory", async ({ request }) => {
    const robots = await request.get("/robots.txt");
    expect(robots.status()).toBe(200);
    await expect(await robots.text()).toContain("Sitemap: https://www.mns1express.com/sitemap.xml");

    const sitemap = await request.get("/sitemap.xml");
    expect(sitemap.status()).toBe(200);
    const body = await sitemap.text();
    for (const route of siteRoutes) {
      expect(body).toContain(`https://www.mns1express.com${route}`);
    }
  });

  test("lane map renders as an inline SVG asset", async ({ page }) => {
    await page.goto("/lanes/");
    const map = page.locator(".map-frame svg");
    await expect(map).toBeVisible();
    const box = await map.boundingBox();
    expect(box?.width ?? 0).toBeGreaterThan(300);
    expect(box?.height ?? 0).toBeGreaterThan(250);
  });
});
