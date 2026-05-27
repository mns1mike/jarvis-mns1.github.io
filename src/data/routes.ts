import { jobMarkets } from "@data/jobs";

export const coreRoutes = [
  "/",
  "/about/",
  "/accessibility/",
  "/apply/",
  "/blog/",
  "/contact/",
  "/data-deletion/",
  "/equipment/",
  "/faq/",
  "/home-time/",
  "/jobs/",
  "/lanes/",
  "/pay/",
  "/privacy/",
  "/requirements/",
  "/shippers/",
  "/terms/",
];

export const blogRoutes = [
  "/blog/best-trucking-companies-midwest/",
  "/blog/cdl-a-driver-salary-illinois-2026/",
  "/blog/home-time-policy-real-vs-promise/",
  "/blog/midwest-otr-routes-regional-vs-coast-to-coast/",
  "/blog/midwest-regional-lanes-home-time/",
  "/blog/new-truck-amenities-2023-freightliner/",
  "/blog/outward-only-vs-inward-facing-cameras/",
  "/blog/pet-friendly-trucking-company-policies/",
  "/blog/switching-trucking-companies-cdla-guide/",
  "/blog/trucking-company-orientation-what-to-expect/",
];
export const jobRoutes = jobMarkets.map((market) => `/jobs/${market.slug}/`);
export const siteRoutes = [...coreRoutes, ...blogRoutes, ...jobRoutes].sort();
