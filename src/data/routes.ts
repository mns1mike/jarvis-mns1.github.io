import { blogPosts } from "@data/blog";
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

export const blogRoutes = blogPosts.map((post) => `/blog/${post.slug}/`);
export const jobRoutes = jobMarkets.map((market) => `/jobs/${market.slug}/`);
export const siteRoutes = [...coreRoutes, ...blogRoutes, ...jobRoutes].sort();
