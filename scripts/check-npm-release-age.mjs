import fs from "node:fs";

const minAgeDays = Number(process.env.MIN_RELEASE_AGE_DAYS || 7);
const now = process.env.NOW ? new Date(process.env.NOW) : new Date();
const cutoff = new Date(now.getTime() - minAgeDays * 24 * 60 * 60 * 1000);
const lock = JSON.parse(fs.readFileSync("package-lock.json", "utf8"));

const packages = [];
for (const [path, meta] of Object.entries(lock.packages || {})) {
  if (!path.startsWith("node_modules/") || !meta.version) continue;
  const name = path.slice("node_modules/".length);
  if (name.includes("/node_modules/")) continue;
  packages.push({ name, version: meta.version });
}

const tooNew = [];
const missing = [];
const errors = [];

function registryName(name) {
  return name.startsWith("@") ? `@${encodeURIComponent(name.slice(1))}` : encodeURIComponent(name);
}

for (const pkg of packages) {
  try {
    const response = await fetch(`https://registry.npmjs.org/${registryName(pkg.name)}`);
    if (!response.ok) throw new Error(`registry returned ${response.status}`);
    const metadata = await response.json();
    const released = metadata.time?.[pkg.version];
    if (!released) {
      missing.push(pkg);
      continue;
    }
    if (new Date(released) > cutoff) {
      tooNew.push({ ...pkg, released });
    }
  } catch (error) {
    errors.push({ ...pkg, error: String(error) });
  }
}

const report = {
  checked: packages.length,
  minAgeDays,
  cutoff: cutoff.toISOString(),
  tooNew,
  missing,
  errors,
};

console.log(JSON.stringify(report, null, 2));

if (tooNew.length || missing.length || errors.length) {
  process.exitCode = 1;
}
