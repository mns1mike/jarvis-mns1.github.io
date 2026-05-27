import { expect, test } from "@playwright/test";
import { jobRoutes, siteRoutes } from "../../src/data/routes";

test.describe("Astro route parity", () => {
  test("job route inventory matches the reference site", () => {
    expect(jobRoutes).toEqual([
      "/jobs/cdl-a-driver-bolingbrook-il/",
      "/jobs/cdl-a-driver-cedar-rapids-ia/",
      "/jobs/cdl-a-driver-chippewa-falls-wi/",
      "/jobs/cdl-a-driver-des-moines-ia/",
      "/jobs/cdl-a-driver-green-bay-wi/",
      "/jobs/cdl-a-driver-indianapolis-in/",
      "/jobs/cdl-a-driver-kansas-city-ks/",
      "/jobs/cdl-a-driver-louisville-ky/",
      "/jobs/cdl-a-driver-milwaukee-wi/",
      "/jobs/cdl-a-driver-minneapolis-mn/",
      "/jobs/cdl-a-driver-omaha-ne/",
      "/jobs/cdl-a-driver-plainfield-il/",
      "/jobs/cdl-a-driver-st-louis-mo/",
      "/jobs/cdl-a-driver-toledo-oh/",
    ]);
  });

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
