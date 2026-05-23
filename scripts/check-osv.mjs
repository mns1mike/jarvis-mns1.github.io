import fs from "node:fs";

const lock = JSON.parse(fs.readFileSync("package-lock.json", "utf8"));
const queries = [];

for (const [path, meta] of Object.entries(lock.packages || {})) {
  if (!path.startsWith("node_modules/") || !meta.version) continue;
  const name = path.slice("node_modules/".length);
  if (name.includes("/node_modules/")) continue;
  queries.push({
    package: { name, ecosystem: "npm" },
    version: meta.version,
  });
}

const response = await fetch("https://api.osv.dev/v1/querybatch", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ queries }),
});

if (!response.ok) {
  throw new Error(`OSV returned ${response.status}: ${await response.text()}`);
}

const data = await response.json();
const vulnerable = [];
for (const [index, result] of (data.results || []).entries()) {
  if (result.vulns?.length) {
    vulnerable.push({
      name: queries[index].package.name,
      version: queries[index].version,
      ids: result.vulns.map((vuln) => vuln.id),
    });
  }
}

console.log(JSON.stringify({ checked: queries.length, vulnerable }, null, 2));

if (vulnerable.length) {
  process.exitCode = 1;
}
