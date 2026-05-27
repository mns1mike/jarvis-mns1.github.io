#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const [, , slugArg, ...titleParts] = process.argv;
const title = titleParts.join(" ").trim();
const slug = (slugArg ?? "").trim();

const usage = "Usage: node scripts/new-blog-post.mjs <slug> <title>";

if (!slug || !title) {
  console.error(usage);
  process.exit(1);
}

if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
  console.error("Slug must use lowercase letters, numbers, and hyphens only.");
  process.exit(1);
}

const contentDir = path.join(process.cwd(), "src", "content", "blog");
const filePath = path.join(contentDir, `${slug}.md`);

if (fs.existsSync(filePath)) {
  console.error(`Blog post already exists: ${filePath}`);
  process.exit(1);
}

const existingOrders = fs
  .readdirSync(contentDir)
  .filter((file) => file.endsWith(".md"))
  .map((file) => fs.readFileSync(path.join(contentDir, file), "utf8").match(/^order:\s*(\d+)/m)?.[1])
  .filter(Boolean)
  .map(Number);

const nextOrder = Math.max(0, ...existingOrders) + 1;
const frontmatterTitle = JSON.stringify(title);
const template = `---
title: ${frontmatterTitle}
description: "Replace with a direct CDL-A driver or shipper-focused summary."
category: "Driver guide"
readingMinutes: 4
order: ${nextOrder}
---

## First Section

Write the article in short, practical sections. Keep claims concrete: pay, lanes, equipment, home time, requirements, coverage, or accountability.

## Second Section

Add specific guidance a driver or shipper can act on.
`;

fs.writeFileSync(filePath, template);
console.log(filePath);
