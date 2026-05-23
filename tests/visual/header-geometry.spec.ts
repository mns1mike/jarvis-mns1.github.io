import { expect, test } from "@playwright/test";

type Box = {
  x: number;
  y: number;
  width: number;
  height: number;
};

type HeaderMetrics = {
  header: Box;
  row: Box;
  logo: Box;
  nav: Box | null;
  blogLink: Box | null;
  cta: Box;
  navDisplay: string | null;
  activeText: string | null;
};

const routes = [
  { path: "/", active: "Home" },
  { path: "/blog/", active: "Blog" },
  { path: "/lanes/", active: "Lanes" },
  { path: "/jobs/", active: null },
];

const viewports = [
  { width: 390, height: 900, name: "mobile" },
  { width: 768, height: 1000, name: "tablet-edge" },
  { width: 900, height: 1000, name: "desktop-small" },
  { width: 1365, height: 1000, name: "desktop-standard" },
  { width: 1440, height: 1000, name: "desktop-wide" },
];

const tolerance = 1;

function assertBoxClose(actual: Box | null, expected: Box | null, label: string) {
  expect(actual, `${label} should exist`).not.toBeNull();
  expect(expected, `${label} baseline should exist`).not.toBeNull();
  if (!actual || !expected) return;
  for (const prop of ["x", "y", "width", "height"] as const) {
    expect(Math.abs(actual[prop] - expected[prop]), `${label}.${prop}`).toBeLessThanOrEqual(tolerance);
  }
}

test.describe("shared header geometry", () => {
  for (const viewport of viewports) {
    test(`header remains stable across routes at ${viewport.name}`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });

      const measurements: Array<{ path: string; active: string | null; metrics: HeaderMetrics }> = [];
      for (const route of routes) {
        await page.goto(route.path);
        await page.waitForLoadState("networkidle");
        const metrics = await page.evaluate<HeaderMetrics>(() => {
          const header = document.querySelector<HTMLElement>("[data-site-header]");
          const row = header?.querySelector<HTMLElement>(".navrow");
          const logo = header?.querySelector<HTMLElement>(".brand img");
          const nav = header?.querySelector<HTMLElement>(".primary-nav");
          const blogLink = Array.from(nav?.querySelectorAll<HTMLAnchorElement>("a") ?? []).find((link) =>
            /blog/i.test(link.textContent ?? ""),
          );
          const cta = header?.querySelector<HTMLElement>(".header-cta");
          const active = header?.querySelector<HTMLElement>('[aria-current="page"]');
          const box = (element: Element | null | undefined): Box | null => {
            if (!element) return null;
            const rect = element.getBoundingClientRect();
            return {
              x: Math.round(rect.x * 10) / 10,
              y: Math.round(rect.y * 10) / 10,
              width: Math.round(rect.width * 10) / 10,
              height: Math.round(rect.height * 10) / 10,
            };
          };
          return {
            header: box(header)!,
            row: box(row)!,
            logo: box(logo)!,
            nav: box(nav),
            blogLink: box(blogLink),
            cta: box(cta)!,
            navDisplay: nav ? getComputedStyle(nav).display : null,
            activeText: active?.textContent?.trim() ?? null,
          };
        });
        measurements.push({ ...route, metrics });
      }

      const baseline = measurements[0].metrics;
      for (const measurement of measurements) {
        assertBoxClose(measurement.metrics.header, baseline.header, `${measurement.path} header`);
        assertBoxClose(measurement.metrics.row, baseline.row, `${measurement.path} navrow`);
        assertBoxClose(measurement.metrics.logo, baseline.logo, `${measurement.path} logo`);
        assertBoxClose(measurement.metrics.cta, baseline.cta, `${measurement.path} cta`);

        if (baseline.navDisplay !== "none") {
          assertBoxClose(measurement.metrics.nav, baseline.nav, `${measurement.path} nav`);
          assertBoxClose(measurement.metrics.blogLink, baseline.blogLink, `${measurement.path} blog link`);
        }

        if (measurement.active) {
          expect(measurement.metrics.activeText).toBe(measurement.active);
        }
      }
    });
  }
});
