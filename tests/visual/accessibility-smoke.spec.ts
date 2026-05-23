import { expect, test } from "@playwright/test";
import { site } from "../../src/data/site";

const routes = ["/", "/jobs/", "/apply/", "/shippers/", "/lanes/", "/contact/"];

function parseRgb(value: string): [number, number, number] {
  const match = value.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (!match) throw new Error(`Unsupported color value: ${value}`);
  return [Number(match[1]), Number(match[2]), Number(match[3])];
}

function luminance([red, green, blue]: [number, number, number]) {
  const values = [red, green, blue].map((channel) => {
    const value = channel / 255;
    return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * values[0] + 0.7152 * values[1] + 0.0722 * values[2];
}

function contrastRatio(foreground: [number, number, number], background: [number, number, number]) {
  const first = luminance(foreground);
  const second = luminance(background);
  const lighter = Math.max(first, second);
  const darker = Math.min(first, second);
  return (lighter + 0.05) / (darker + 0.05);
}

test.describe("accessibility smoke", () => {
  for (const route of routes) {
    test(`${route} exposes landmarks, headings, names, and alt text`, async ({ page }) => {
      await page.goto(route);

      await expect(page.locator("header")).toHaveCount(1);
      await expect(page.locator("main")).toHaveCount(1);
      await expect(page.locator("footer")).toHaveCount(1);
      await expect(page.locator('nav[aria-label="Primary"]')).toHaveCount(1);
      await expect(page.locator("h1")).toHaveCount(1);

      const unnamedLinks = await page.locator("a").evaluateAll((links) =>
        links
          .map((link) => ({
            href: link.getAttribute("href"),
            text: link.textContent?.trim() ?? "",
            label: link.getAttribute("aria-label") ?? "",
          }))
          .filter((link) => !link.text && !link.label),
      );
      expect(unnamedLinks, `${route} unnamed links`).toEqual([]);

      const imagesWithoutAlt = await page.locator("img").evaluateAll((images) =>
        images
          .map((image) => image.getAttribute("src") ?? "")
          .filter((_, index) => !images[index].hasAttribute("alt")),
      );
      expect(imagesWithoutAlt, `${route} images without alt`).toEqual([]);
    });
  }

  test("keyboard focus reaches primary navigation and apply CTA", async ({ page }) => {
    await page.goto("/");

    const seen: string[] = [];
    for (let index = 0; index < 20; index += 1) {
      await page.keyboard.press("Tab");
      seen.push(
        await page.evaluate(() => {
          const element = document.activeElement as HTMLElement | null;
          return [
            element?.tagName,
            element?.getAttribute("aria-label"),
            element?.textContent?.trim(),
            element?.getAttribute("href"),
          ]
            .filter(Boolean)
            .join("|");
        }),
      );
    }

    expect(seen.some((value) => value.includes("MNS1 Express home"))).toBe(true);
    expect(seen.some((value) => value.includes("Pay"))).toBe(true);
    expect(seen.some((value) => value.includes(site.applyUrl))).toBe(true);
  });

  test("primary apply CTA contrast meets AA threshold", async ({ page }) => {
    await page.goto("/");
    const colors = await page.locator(`a[href="${site.applyUrl}"]`).first().evaluate((element) => {
      const styles = getComputedStyle(element);
      return {
        color: styles.color,
        backgroundColor: styles.backgroundColor,
      };
    });

    expect(contrastRatio(parseRgb(colors.color), parseRgb(colors.backgroundColor))).toBeGreaterThanOrEqual(4.5);
  });
});
