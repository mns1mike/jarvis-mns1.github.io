import { expect, test } from "@playwright/test";
import { site } from "../../src/data/site";

const visualRoutes = [
  "/",
  "/jobs/",
  "/pay/",
  "/equipment/",
  "/home-time/",
  "/requirements/",
  "/apply/",
  "/shippers/",
  "/lanes/",
  "/about/",
  "/contact/",
];

const viewports = [
  { name: "mobile", width: 390, height: 900 },
  { name: "desktop", width: 1365, height: 1000 },
];

const funnelRoutes = ["/", "/jobs/cdl-a-driver-plainfield-il/", "/apply/"];
const ctaSurfaceRoutes = [
  { route: "/", applyCount: 2, secondaryHref: site.phoneHref },
  { route: "/jobs/cdl-a-driver-plainfield-il/", applyCount: 2, secondaryHref: "/requirements/" },
  { route: "/blog/best-trucking-companies-midwest/", applyCount: 2, secondaryHref: "/blog/" },
  { route: "/lanes/", applyCount: 2, secondaryHref: site.phoneHref },
];

test.describe("cutover readiness smoke", () => {
  for (const viewport of viewports) {
    test(`priority pages have stable ${viewport.name} layout`, async ({ page }, testInfo) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });

      for (const route of visualRoutes) {
        const response = await page.goto(route);
        expect(response?.status(), `${route} status`).toBeLessThan(400);
        await expect(page.locator("[data-site-header]")).toBeVisible();
        await expect(page.locator("h1").first()).toBeVisible();

        const layout = await page.evaluate(() => {
          const root = document.documentElement;
          const h1 = document.querySelector("h1")?.getBoundingClientRect();
          return {
            viewportWidth: root.clientWidth,
            scrollWidth: root.scrollWidth,
            h1Width: h1?.width ?? 0,
            bodyTextLength: document.body.innerText.trim().length,
          };
        });

        expect(layout.scrollWidth, `${route} should not overflow horizontally`).toBeLessThanOrEqual(
          layout.viewportWidth + 1,
        );
        expect(layout.h1Width, `${route} h1 should fit viewport`).toBeLessThanOrEqual(layout.viewportWidth);
        expect(layout.bodyTextLength, `${route} should have meaningful content`).toBeGreaterThan(500);

        const screenshot = await page.screenshot({ fullPage: true });
        await testInfo.attach(`${viewport.name}-${route.replaceAll("/", "_") || "home"}.png`, {
          body: screenshot,
          contentType: "image/png",
        });
      }
    });
  }

  test("driver funnel pages expose apply and phone CTAs", async ({ page }) => {
    for (const route of funnelRoutes) {
      await page.goto(route);
      await expect(page.locator(`a[href="${site.applyUrl}"]`).first(), `${route} apply link`).toBeVisible();
      await expect(page.locator(`a[href="${site.phoneHref}"]`).first(), `${route} phone link`).toBeVisible();
    }
  });

  test("header, hero, job-city, blog, and lane CTA surfaces use approved paths", async ({ page }) => {
    for (const { route, applyCount, secondaryHref } of ctaSurfaceRoutes) {
      await page.goto(route);

      const header = page.locator("[data-site-header]");
      await expect(header.locator(`a[href="${site.applyUrl}"]`), `${route} header apply`).toBeVisible();
      await expect(header.locator('a[href="/contact/"]'), `${route} header contact`).toBeVisible();
      await expect(header.locator(`a[href="${site.phoneHref}"]`), `${route} header phone`).toBeVisible();

      await expect(page.locator(`main a[href="${site.applyUrl}"]`).first(), `${route} main apply`).toBeVisible();
      await expect(page.locator(`main a[href="${secondaryHref}"]`).first(), `${route} secondary CTA`).toBeVisible();
      await expect(page.locator(`a[href="${site.applyUrl}"]`), `${route} apply CTA count`).toHaveCount(applyCount);
    }
  });

  test("mobile header menu opens and keeps the external apply CTA hidden", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 900 });
    await page.goto("/");

    const header = page.locator("[data-site-header]");
    await expect(header.locator(`a.header-cta[href="${site.applyUrl}"]`)).toBeHidden();
    await header.locator(".mobile-menu").click();
    await expect(header.locator('nav[aria-label="Primary"]')).toBeVisible();
    await expect(header.locator('nav[aria-label="Primary"] a[href="/shippers/"]')).toBeVisible();
  });

  test("mobile sticky CTA matches page intent", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 900 });

    await page.goto("/");
    await expect(page.locator(".mobile-cta button")).toContainText("Apply in 4 mins");
    await expect(page.locator(`.mobile-cta a[href="${site.phoneHref}"]`)).toBeVisible();

    await page.goto("/shippers/");
    await expect(page.locator('.mobile-cta a[href="/contact/"]')).toContainText("Get a quote");
    await expect(page.locator(`.mobile-cta a[href="mailto:${site.email}"]`)).toBeVisible();
    await expect(page.locator(".mobile-cta")).not.toContainText("Apply in 4 mins");

    await page.goto("/contact/");
    await expect(page.locator(".mobile-cta")).toHaveCount(0);
  });

  test("footer keeps apply, jobs, and contact paths available", async ({ page }) => {
    await page.goto("/");
    const footer = page.locator(".site-footer");
    await expect(footer.locator('a[href="/apply/"]')).toBeVisible();
    await expect(footer.locator('a[href="/jobs/"]')).toBeVisible();
    await expect(footer.locator('a[href="/contact/"]')).toBeVisible();
  });

  test("contact page exposes phone, email, and application paths", async ({ page }) => {
    await page.goto("/contact/");
    await expect(page.locator(`a[href="${site.phoneHref}"]`).first()).toBeVisible();
    await expect(page.locator(`a[href="mailto:${site.recruitingEmail}"]`)).toBeVisible();
    await expect(page.locator('a[href="/apply/"]').first()).toBeVisible();
  });
});
