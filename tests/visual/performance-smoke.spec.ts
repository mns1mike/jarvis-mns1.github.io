import { expect, test } from "@playwright/test";
import { readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const distDir = join(process.cwd(), "dist");
const priorityRoutes = ["/", "/jobs/", "/apply/", "/shippers/", "/lanes/", "/contact/"];

const budgets = {
  htmlBytes: 45 * 1024,
  richHtmlBytes: 160 * 1024,
  cssBytes: 24 * 1024,
  imageBytes: 1024 * 1024,
  totalDistBytes: 1.5 * 1024 * 1024,
  routeLoadMs: 1_500,
};

function collectFiles(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    return entry.isDirectory() ? collectFiles(path) : [path];
  });
}

test.describe("performance smoke", () => {
  test("built output stays within static asset budgets", () => {
    const files = collectFiles(distDir);
    const totalBytes = files.reduce((sum, file) => sum + statSync(file).size, 0);
    expect(totalBytes, "total dist output").toBeLessThanOrEqual(budgets.totalDistBytes);

    for (const file of files) {
      const size = statSync(file).size;
      const path = relative(distDir, file);

      if (path.endsWith(".html")) {
        const htmlBudget = path === "lanes/index.html" ? budgets.richHtmlBytes : budgets.htmlBytes;
        expect(size, `${path} HTML size`).toBeLessThanOrEqual(htmlBudget);
      }

      if (path.endsWith(".css")) {
        expect(size, `${path} CSS size`).toBeLessThanOrEqual(budgets.cssBytes);
      }

      if (/\.(jpg|jpeg|png|webp|svg)$/i.test(path)) {
        expect(size, `${path} image size`).toBeLessThanOrEqual(budgets.imageBytes);
      }

      expect(path, "Astro build should not emit page JavaScript").not.toMatch(/^_astro\/.*\.js$/);
    }
  });

  test("home page preloads the terminal hero image", async ({ page }) => {
    await page.goto("/");
    const preloadHref = await page.locator('link[rel="preload"][as="image"]').getAttribute("href");
    expect(preloadHref).toBe("/images/site/mns1-terminal-hero.jpg");
  });

  for (const route of priorityRoutes) {
    test(`${route} loads quickly without external runtime requests`, async ({ page }) => {
      const externalRequests: string[] = [];
      page.on("request", (request) => {
        const url = new URL(request.url());
        if (url.origin !== "http://127.0.0.1:4322") {
          externalRequests.push(request.url());
        }
      });

      const startedAt = Date.now();
      const response = await page.goto(route, { waitUntil: "load" });
      const loadMs = Date.now() - startedAt;

      expect(response?.status(), `${route} status`).toBeLessThan(400);
      expect(loadMs, `${route} load time`).toBeLessThanOrEqual(budgets.routeLoadMs);
      expect(externalRequests, `${route} external requests`).toEqual([]);

      const runtime = await page.evaluate(() => ({
        scriptCount: document.querySelectorAll('script:not([type="application/ld+json"])').length,
        stylesheets: document.querySelectorAll('link[rel="stylesheet"]').length,
        images: document.images.length,
      }));

      expect(runtime.scriptCount, `${route} should not need runtime JavaScript`).toBe(0);
      expect(runtime.stylesheets, `${route} stylesheet count`).toBeLessThanOrEqual(1);
      expect(runtime.images, `${route} image count`).toBeLessThanOrEqual(3);
    });
  }
});
