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
- [x] Astro route inventory renders from source-backed content.
- [ ] Full website rebuild is complete before public DNS cutover.
- [ ] Public cutover happens only after final review and explicit approval.
- [x] Design tokens and brand rules are documented.
- [x] Playwright checks enforce baseline design-system guardrails.
- [x] Automated cutover-readiness smoke checks cover priority desktop/mobile pages and CTA paths.
- [x] SEO fundamentals are covered by automated metadata, canonical, robots, and sitemap checks.
- [x] Accessibility smoke checks cover landmarks, link names, image alt text, keyboard focus, and CTA contrast.
- [x] Performance smoke checks cover built asset budgets, no runtime JavaScript, no external runtime requests, image preload, and priority route load timing.

## Verification Evidence
- Backup tag: `backup/mns1-website-pre-astro-20260523-1038`
- Backup archive: `/Users/jarvis/.openclaw/workspace/backups/mns1-website-pre-astro-20260523-1038-3fe60dbc5088.tar.gz`
- Dependency release-age scan: 311 locked npm packages checked, 0 under the 7-day threshold.
- OSV batch query: 311 locked npm packages checked, 0 vulnerable packages.
- npm audit: 0 vulnerabilities.
- Route parity build: 43 Astro pages generated, including 15 job-city pages, 10 blog article pages, legal/apply pages, `robots.txt`, and `sitemap.xml`.
- Playwright route parity: 44 checks passed for route status, shared header presence, visible H1, non-placeholder content, robots, sitemap inventory, and inline lane-map render.
- PR #32: GitHub Pages deployment workflow builds Astro from source, runs security gates, uploads `dist/`, and deploys from `main`.
- Design system: semantic tokens documented in `docs/website/DESIGN_SYSTEM.md`; Playwright design-system guardrails added to `npm run verify`.
- Public cutover gate: `docs/website/CUTOVER.md`.
- Cutover smoke: `npm run verify:cutover` captures priority page screenshots and verifies apply/contact paths.
- SEO smoke: `npm run verify:seo` checks priority page metadata, canonical URLs, organization schema, robots, and sitemap.
- Accessibility smoke: `npm run verify:a11y` checks semantic landmarks, keyboard reachability, accessible names, image alt text, and primary CTA contrast.
- Performance smoke: `npm run verify:performance` checks static build budgets, no page JavaScript, local-only runtime requests, hero image preload, and priority route load timing.

## Decisions
- Use Astro for the build system because the site is mostly static content with selective future interactivity.
- Use Playwright as a verification gate, not as a builder.
- Treat GitHub Pages deploys as preview/staging until DNS and custom-domain cutover are explicitly approved.
- Switch public traffic only through a reviewed cutover PR with rollback records.
- Pin GitHub Actions by commit SHA and run npm with `--ignore-scripts`.
