import type { APIRoute } from "astro";
import { siteRoutes } from "@data/routes";

const siteUrl = "https://www.mns1express.com";

const escapeXml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

export const GET: APIRoute = () => {
  const urls = siteRoutes.map((route) => `  <url><loc>${escapeXml(`${siteUrl}${route}`)}</loc></url>`).join("\n");

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
