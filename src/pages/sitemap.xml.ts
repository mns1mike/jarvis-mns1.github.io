import type { APIRoute } from "astro";
import { siteRoutes } from "@data/routes";
import { site } from "@data/site";

const escapeXml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const lastmodForRoute = (route: string) =>
  ["/jobs/cdl-a-driver-kansas-city-ks/", "/jobs/cdl-a-driver-omaha-ne/"].includes(route) ? "2026-05-22" : "2026-05-19";

export const GET: APIRoute = () => {
  const urls = siteRoutes
    .map((route) => `  <url><loc>${escapeXml(`${site.url}${route}`)}</loc><lastmod>${lastmodForRoute(route)}</lastmod></url>`)
    .join("\n");

  return new Response(
    [`<?xml version="1.0" encoding="UTF-8"?>`, `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`, urls, `</urlset>`, ""].join(
      "\n",
    ),
    {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
      },
    },
  );
};
