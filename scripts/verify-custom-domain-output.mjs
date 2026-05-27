import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const distDir = join(process.cwd(), "dist");
const cnamePath = join(distDir, "CNAME");
const expectedDomain = "www.mns1express.com";
const previewBase = "/jarvis-mns1.github.io";

function collectFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    return entry.isDirectory() ? collectFiles(path) : [path];
  });
}

const cname = readFileSync(cnamePath, "utf8").trim();
if (cname !== expectedDomain) {
  throw new Error(`Expected dist/CNAME to contain ${expectedDomain}, found ${JSON.stringify(cname)}`);
}

const targets = collectFiles(distDir).filter((file) => /\.(html|css|xml|txt)$/.test(file));
const previewReferences = [];

for (const file of targets) {
  const content = readFileSync(file, "utf8");
  if (content.includes(previewBase)) {
    previewReferences.push(relative(distDir, file));
  }
}

if (previewReferences.length > 0) {
  throw new Error(`Custom-domain output still contains preview base ${previewBase}:\n${previewReferences.join("\n")}`);
}

const totalBytes = collectFiles(distDir).reduce((sum, file) => sum + statSync(file).size, 0);
console.log(`Verified custom-domain output for ${expectedDomain}: ${targets.length} text assets (${totalBytes} bytes).`);
