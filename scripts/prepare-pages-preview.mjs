import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join, relative } from "node:path";

const distDir = join(process.cwd(), "dist");
const base = (process.env.PAGES_PREVIEW_BASE || "/jarvis-mns1.github.io").replace(/\/$/, "");

function collectFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    return entry.isDirectory() ? collectFiles(path) : [path];
  });
}

function rewrite(content) {
  return content
    .replaceAll('href="/', `href="${base}/`)
    .replaceAll('src="/', `src="${base}/`)
    .replaceAll('url("/', `url("${base}/`)
    .replaceAll("url(/", `url(${base}/`);
}

const targets = collectFiles(distDir).filter((file) => /\.(html|css)$/.test(file));

for (const file of targets) {
  writeFileSync(file, rewrite(readFileSync(file, "utf8")));
}

const badReferences = [];

for (const file of targets) {
  const content = readFileSync(file, "utf8");
  const path = relative(distDir, file);
  const matches = content.match(/(?:href|src)="\/(?:_astro|images|about|accessibility|apply|blog|contact|data-deletion|equipment|faq|home-time|jobs|lanes|pay|privacy|requirements|robots\.txt|shippers|sitemap\.xml|terms)(?:\/|")|url\("?\/(?:images|_astro)\//g);
  if (matches) {
    badReferences.push(`${path}: ${matches.join(", ")}`);
  }
}

if (badReferences.length > 0) {
  throw new Error(`Pages preview has un-prefixed root references:\n${badReferences.join("\n")}`);
}

const totalBytes = collectFiles(distDir).reduce((sum, file) => sum + statSync(file).size, 0);
console.log(`Prepared GitHub Pages preview base ${base} for ${targets.length} files (${totalBytes} bytes).`);
