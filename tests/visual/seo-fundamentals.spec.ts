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
          keywords: meta('meta[name="keywords"]'),
          ogTitle: meta('meta[property="og:title"]'),
          ogDescription: meta('meta[property="og:description"]'),
          ogUrl: meta('meta[property="og:url"]'),
          twitterCard: meta('meta[name="twitter:card"]'),
          structuredData: scripts,
        };
      });

      expect(metadata.description.length, `${route} description length`).toBeGreaterThan(35);
      expect(metadata.canonical).toBe(expectedCanonical);
      expect(metadata.keywords).toContain("CDL-A jobs");
      expect(metadata.keywords).toContain("MNS1 Express");
      expect(metadata.ogTitle.length, `${route} og:title`).toBeGreaterThan(10);
      expect(metadata.ogDescription).toBe(metadata.description);
      expect(metadata.ogUrl).toBe(expectedCanonical);
      expect(metadata.twitterCard).toBe("summary");
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

  test("local job pages expose JobPosting structured data", async ({ page }) => {
    await page.goto("/jobs/cdl-a-driver-plainfield-il/");

    const jobPosting = await page.locator('script[type="application/ld+json"][data-schema="job-posting"]').textContent();
    expect(jobPosting).toBeTruthy();

    const schema = JSON.parse(jobPosting ?? "{}");
    expect(schema["@type"]).toBe("JobPosting");
    expect(schema.title).toBe("CDL-A Driver Jobs in Plainfield, IL");
    expect(schema.datePosted).toBe("2026-05-16");
    expect(schema.employmentType).toBe("FULL_TIME");
    expect(schema.hiringOrganization.name).toBe(site.name);
    expect(schema.jobLocation.address.postalCode).toBe("60544");
    expect(schema.baseSalary.value.minValue).toBe(1650);
    expect(schema.baseSalary.value.maxValue).toBe(1900);
    expect(schema.applicationUrl).toBe(site.applyUrl);
  });

  test("apply page exposes the reference JobPosting schema", async ({ page }) => {
    await page.goto("/apply/");

    const jobPosting = await page.locator('script[type="application/ld+json"][data-schema="job-posting"]').textContent();
    expect(jobPosting).toBeTruthy();

    const schema = JSON.parse(jobPosting ?? "{}");
    expect(schema["@type"]).toBe("JobPosting");
    expect(schema.title).toBe("CDL-A Regional Truck Driver");
    expect(schema.datePosted).toBe("2026-05-15");
    expect(schema.jobLocation.address.streetAddress).toBe(site.addressLines[0]);
    expect(schema.applicantLocationRequirements.name).toBe("United States");
    expect(schema.baseSalary.value.unitText).toBe("WEEK");
  });

  test("jobs index exposes the reference ItemList schema", async ({ page }) => {
    await page.goto("/jobs/");

    const itemList = await page.locator('script[type="application/ld+json"][data-schema="jobs-item-list"]').textContent();
    expect(itemList).toBeTruthy();

    const schema = JSON.parse(itemList ?? "{}");
    expect(schema["@type"]).toBe("ItemList");
    expect(schema.name).toBe("MNS1 Express CDL-A Driver Jobs by City");
    expect(schema.itemListElement).toHaveLength(14);
    expect(schema.itemListElement[0]).toMatchObject({
      position: 1,
      name: "CDL-A Driver Jobs in Bolingbrook, IL",
      url: `${site.url}/jobs/cdl-a-driver-bolingbrook-il/`,
    });
    expect(schema.itemListElement[13]).toMatchObject({
      position: 14,
      name: "CDL-A Driver Jobs in Omaha, NE",
      url: `${site.url}/jobs/cdl-a-driver-omaha-ne/`,
    });
  });

  test("blog index exposes the reference Blog schema", async ({ page }) => {
    await page.goto("/blog/");

    const scripts = await page.locator('script[type="application/ld+json"]').evaluateAll((nodes) =>
      nodes.map((node) => JSON.parse(node.textContent ?? "{}")),
    );
    const schema = scripts.find((json) => json["@type"] === "Blog");

    expect(schema).toMatchObject({
      "@type": "Blog",
      name: "MNS1 Express Blog",
      url: `${site.url}/blog/`,
      description: "CDL-A driver and Midwest trucking guides from MNS1 Express.",
    });
  });
});
