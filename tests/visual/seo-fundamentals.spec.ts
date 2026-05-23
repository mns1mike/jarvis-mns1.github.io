import { expect, test } from "@playwright/test";
import { siteRoutes } from "../../src/data/routes";
import { site } from "../../src/data/site";

const priorityRoutes = [
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
  "/blog/",
  "/jobs/cdl-a-driver-plainfield-il/",
  "/blog/best-trucking-companies-midwest/",
];

test.describe("SEO fundamentals", () => {
  for (const route of priorityRoutes) {
    test(`${route} exposes core metadata`, async ({ page }) => {
      await page.goto(route);
      const expectedCanonical = `${site.url}${route}`;

      await expect(page).toHaveTitle(/MNS1 Express|CDL-A|Midwest|Driver|Shippers|Lanes|Contact|About/);

      const metadata = await page.evaluate(() => {
        const meta = (selector: string) => document.querySelector<HTMLMetaElement>(selector)?.content ?? "";
        const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href ?? "";
        const scripts = Array.from(document.querySelectorAll<HTMLScriptElement>('script[type="application/ld+json"]')).map(
          (script) => script.textContent ?? "",
        );

        return {
          description: meta('meta[name="description"]'),
          canonical,
          ogTitle: meta('meta[property="og:title"]'),
          ogDescription: meta('meta[property="og:description"]'),
          ogUrl: meta('meta[property="og:url"]'),
          ogImage: meta('meta[property="og:image"]'),
          twitterCard: meta('meta[name="twitter:card"]'),
          structuredData: scripts,
        };
      });

      expect(metadata.description.length, `${route} description length`).toBeGreaterThan(35);
      expect(metadata.canonical).toBe(expectedCanonical);
      expect(metadata.ogTitle.length, `${route} og:title`).toBeGreaterThan(10);
      expect(metadata.ogDescription).toBe(metadata.description);
      expect(metadata.ogUrl).toBe(expectedCanonical);
      expect(metadata.ogImage).toBe(`${site.url}/images/site/mns1-terminal-hero.jpg`);
      expect(metadata.twitterCard).toBe("summary_large_image");
      expect(metadata.structuredData.some((json) => json.includes('"@type":"Organization"'))).toBe(true);
    });
  }

  test("sitemap and robots use the canonical site URL", async ({ request }) => {
    const robots = await request.get("/robots.txt");
    expect(robots.status()).toBe(200);
    expect(await robots.text()).toContain(`Sitemap: ${site.url}/sitemap.xml`);

    const sitemap = await request.get("/sitemap.xml");
    expect(sitemap.status()).toBe(200);
    const body = await sitemap.text();
    for (const route of siteRoutes) {
      expect(body).toContain(`<loc>${site.url}${route}</loc>`);
    }
  });
});
