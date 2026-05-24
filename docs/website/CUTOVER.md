# Website Cutover Readiness

## Current State
The Astro site is built and deployed through GitHub Pages preview/staging with repository-path asset URLs, but public traffic is not cut over. The live apex domain still resolves outside this repository, and no `CNAME` file is committed here.

Cutover means changing public DNS and GitHub Pages custom-domain settings so `mns1express.com` and/or `www.mns1express.com` serve this Astro build.

## Cutover Gate
Do not cut over until all items below are checked in a reviewed PR and Mike explicitly approves the DNS change.

- [ ] Priority recruiting pages pass desktop and mobile visual QA: `/`, `/jobs/`, `/pay/`, `/equipment/`, `/home-time/`, `/requirements/`, `/apply/`.
- [ ] Shipper/credibility pages pass desktop and mobile visual QA: `/shippers/`, `/lanes/`, `/about/`, `/contact/`.
- [x] Apply and contact CTA paths are verified from header, hero, cards, footer, job-city pages, and blog pages.
- [x] SEO fundamentals are verified: titles, descriptions, canonicals, robots, sitemap, and structured route inventory.
- [x] Accessibility smoke checks pass for header, navigation, CTA contrast, keyboard focus, and mobile layout.
- [x] Performance smoke check passes against the built Astro output.
- [x] Form/backout plan is confirmed against the pre-Astro backup archive.
- [x] DNS plan is written with exact records, TTL, and rollback records.
- [ ] GitHub Pages custom domain setting and `CNAME` file are added only in the final cutover PR.
- [ ] Post-cutover checks are ready for apex and `www`: HTTP status, canonical behavior, SSL, sitemap, and apply flow.

## Verification Progress
- Automated desktop/mobile layout smoke exists for priority recruiting and shipper pages.
- Automated CTA smoke verifies apply, phone, footer, and contact-page paths.
- Automated CTA path smoke verifies header, hero, secondary, footer, job-city, blog, lane, and contact-card paths against approved URLs.
- Playwright attaches full-page screenshots for the priority cutover routes during `npm run verify:cutover`.
- Automated SEO smoke verifies priority route metadata, canonical URLs, social metadata, organization schema, robots, and sitemap.
- Automated accessibility smoke verifies landmarks, single H1, link names, image alt text, keyboard focus reachability, and primary CTA contrast.
- Automated performance smoke verifies built asset budgets, no page JavaScript, no external runtime requests, image preloading, and priority route load timing.
- Form/backout plan is documented in `docs/website/FORM_BACKOUT.md`; the pre-Astro backup SHA and archived apply/contact pages were verified.
- DNS cutover plan is documented in `docs/website/DNS_PLAN.md` with GitHub Pages target records, TTLs, verification commands, and rollback records.

## Rollback
Primary rollback is to restore the previous site from:

- Git tag: `backup/mns1-website-pre-astro-20260523-1038`
- Archive: `/Users/jarvis/.openclaw/workspace/backups/mns1-website-pre-astro-20260523-1038-3fe60dbc5088.tar.gz`
- SHA256: `5b22b635c1b7e4df81f167f4fd51feee167a4a3c0d2c4b1c3e09ca4c228015dd`

DNS rollback should restore the prior apex and `www` records with the shortest safe TTL during the cutover window.
