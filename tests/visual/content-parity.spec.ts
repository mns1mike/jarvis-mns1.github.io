import { expect, test } from "@playwright/test";

const routePhrases = [
  {
    route: "/",
    phrases: [
      "Always forward. · Hiring CDL-A across 11 states",
      "A recruiter calls back within 15 minutes. Real person — no bots, no robocalls.",
      "Four things we promise. And mean every word.",
      "Freight that moves when you said it would.",
    ],
  },
  {
    route: "/about/",
    phrases: [
      "One Truck. One Driver. One Vision.",
      "Mike founded MNS1 Express in 2011 with a single truck in the Chicago suburbs.",
      "1% Better Every Day",
    ],
  },
  {
    route: "/equipment/",
    phrases: [
      "2023+ Freightliners. The Whole Fleet.",
      'Not "select trucks." Not "when available."',
      "Your cab is your home. Cameras face the road, never you.",
    ],
  },
  {
    route: "/home-time/",
    phrases: [
      "Home When We Say You'll Be Home",
      "Choose 1, 2, or 3 weeks out",
      '"Every Carrier Says That"',
    ],
  },
  {
    route: "/requirements/",
    phrases: [
      "Do You Qualify? Here's Everything.",
      "24 months Class A CDL required",
      "No SAP (Substance Abuse Professional) history",
    ],
  },
  {
    route: "/shippers/",
    phrases: [
      "Midwest Dry Van Coverage. 180+ Trucks.",
      "Asset-based, company-owned fleet — no brokered trucks, no surprises.",
      "Asset-based — no brokered loads, no third-party carriers",
    ],
  },
  {
    route: "/blog/best-trucking-companies-midwest/",
    phrases: [
      "Start With the Operating Model",
      "Look for Consistent Freight",
      "Respect Shows Up in the Details",
    ],
  },
  {
    route: "/jobs/cdl-a-driver-plainfield-il/",
    phrases: [
      "Regional Truck Driving Jobs Near Plainfield",
      "Top 25% drivers average $1,650-$1,900+ gross per week",
      "1 year recent, verifiable CDL-A OTR experience",
    ],
  },
];

test.describe("content parity smoke", () => {
  for (const { route, phrases } of routePhrases) {
    test(`${route} keeps pre-Astro copy anchors`, async ({ page }) => {
      await page.goto(route);
      const bodyText = (await page.locator("body").evaluate((body) => body.textContent ?? "")).replace(/\s+/g, " ");

      for (const phrase of phrases) {
        expect(bodyText, `${route} should include: ${phrase}`).toContain(phrase);
      }
    });
  }
});
