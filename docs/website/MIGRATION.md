# MNS1 Website Astro Migration Plan

## Phase 1: Foundation
- Add Astro, shared components, design tokens, Playwright, and CI guardrails.
- Keep production static HTML unchanged.

## Phase 2: Content Parity
- Migrate current pages into Astro:
  - Home, Pay, Equipment, Home Time, Lanes, Shippers, FAQ, About, Contact, Requirements
  - Apply, Privacy, Terms, Accessibility, Data Deletion
  - Jobs index and city pages
  - Blog index and articles
- Move repeated content into data files or content collections.
- Replace copied map/card/header behavior with shared components.
- Maintain route parity through `src/data/routes.ts`, `robots.txt`, `sitemap.xml`, and Playwright route checks.

## Phase 3: Verification
- Expand Playwright checks:
  - header geometry,
  - route parity and non-placeholder content,
  - mobile header behavior,
  - CTA routing,
  - Jobs link routing,
  - rollout animation state,
  - lane map render,
  - blog card hover behavior.
- Capture screenshots for core pages at mobile, tablet, and desktop widths.

## Phase 4: Deployment Switch
- Add a dedicated GitHub Pages deployment workflow for Astro `dist/`. Completed in
  `.github/workflows/deploy-pages.yml`; it builds from source, runs dependency security
  gates, uploads `dist/`, and deploys only from `main` or manual dispatch.
- Keep public DNS pointed at the existing live site until the website is fully rebuilt,
  reviewed, and approved for cutover.
- Complete the cutover checklist in `docs/website/CUTOVER.md` before adding a `CNAME`
  file or changing public DNS.
- Merge cutover only after review and explicit approval.

## Rollback
- Restore the pre-Astro static site from tag `backup/mns1-website-pre-astro-20260523-1038` or archive `/Users/jarvis/.openclaw/workspace/backups/mns1-website-pre-astro-20260523-1038-3fe60dbc5088.tar.gz`.
