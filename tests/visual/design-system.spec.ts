import { expect, test } from "@playwright/test";

const requiredTokens = [
  "--color-canvas",
  "--color-canvas-rgb",
  "--color-surface",
  "--color-surface-rgb",
  "--color-surface-raised",
  "--color-surface-strong",
  "--color-surface-strong-rgb",
  "--color-ink",
  "--color-ink-rgb",
  "--color-muted",
  "--color-dim",
  "--color-line",
  "--color-line-soft",
  "--color-accent",
  "--color-accent-rgb",
  "--color-accent-hover",
  "--color-accent-soft",
  "--color-cta",
  "--radius-control",
  "--radius-card",
  "--radius-panel",
  "--space-section-y",
  "--space-card",
];

test.describe("website design system", () => {
  test("semantic tokens are available", async ({ page }) => {
    await page.goto("/");
    const tokens = await page.evaluate((names) => {
      const styles = getComputedStyle(document.documentElement);
      return Object.fromEntries(names.map((name) => [name, styles.getPropertyValue(name).trim()]));
    }, requiredTokens);

    for (const token of requiredTokens) {
      expect(tokens[token], `${token} should have a value`).not.toBe("");
    }
  });

  test("cards and panels keep restrained radius", async ({ page }) => {
    await page.goto("/");
    const radii = await page.locator(".card, .panel, .quick-panel").evaluateAll((elements) =>
      elements.map((element) => Number.parseFloat(getComputedStyle(element).borderTopLeftRadius)),
    );

    expect(radii.length).toBeGreaterThan(0);
    for (const radius of radii) {
      expect(radius).toBeLessThanOrEqual(8);
    }
  });

  test("primary text avoids negative letter spacing", async ({ page }) => {
    await page.goto("/jobs/");
    const letterSpacingValues = await page.locator("h1, h2, h3, p, a, li").evaluateAll((elements) =>
      elements.map((element) => getComputedStyle(element).letterSpacing),
    );

    for (const value of letterSpacingValues) {
      if (value === "normal") continue;
      expect(Number.parseFloat(value)).toBeGreaterThanOrEqual(0);
    }
  });
});
