# MNS1 Website Build Foundation ISA

## Goal
Create a maintainable source-built MNS1 website foundation so future recruiting, blog, job, lane, and shipper updates are made in shared components and verified before deployment.

## Constraints
- Current production static site must remain recoverable.
- No production deployment from this setup branch.
- Dependency installs must follow the 7-day release-age policy and run without package lifecycle scripts.
- GitHub Pages deployment behavior must not be changed until the Astro site reaches content parity.
- Header, footer, CTA, navigation, map, card, and blog/job content must come from shared source modules, not copied generated HTML.

## Success Criteria
- [x] Current production site is backed up with a pushed git tag and local archive.
- [x] Astro source project exists with shared layout, header, footer, CTA, navigation data, and design tokens.
- [x] Playwright guardrail exists for header geometry across core routes and responsive widths.
- [x] Dependency lockfile passes npm audit and OSV checks.
- [x] Locked dependency releases are older than the 7-day freeze threshold.
- [x] CI guardrail workflow installs without lifecycle scripts, builds Astro, audits dependencies, and runs Playwright checks.
- [x] Astro source renders the current top-level, job-city, blog-article, legal, apply, robots, and sitemap route inventory.
- [x] Playwright fails if migrated routes return an error or still contain foundation placeholder content.
- [ ] Full production content parity is completed before switching deployment from static root files to Astro `dist/`.
- [ ] Production deployment source is changed only after review and approval.

## Verification Evidence
- Backup tag: `backup/mns1-website-pre-astro-20260523-1038`
- Backup archive: `/Users/jarvis/.openclaw/workspace/backups/mns1-website-pre-astro-20260523-1038-3fe60dbc5088.tar.gz`
- Dependency release-age scan: 311 locked npm packages checked, 0 under the 7-day threshold.
- OSV batch query: 311 locked npm packages checked, 0 vulnerable packages.
- npm audit: 0 vulnerabilities.
- Route parity build: 43 Astro pages generated, including 15 job-city pages, 10 blog article pages, legal/apply pages, `robots.txt`, and `sitemap.xml`.
- Playwright route parity: 44 checks passed for route status, shared header presence, visible H1, non-placeholder content, robots, sitemap inventory, and inline lane-map render.

## Decisions
- Use Astro for the build system because the site is mostly static content with selective future interactivity.
- Use Playwright as a verification gate, not as a builder.
- Keep the current production site unchanged while the Astro source reaches parity.
- Pin GitHub Actions by commit SHA and run npm with `--ignore-scripts`.
