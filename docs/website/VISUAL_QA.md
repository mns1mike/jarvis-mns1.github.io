# Website Visual QA Signoff

## Status

Visual QA for the cutover route set is accepted for GitHub Pages preview/staging as of 2026-05-27.

This signoff does not authorize public DNS cutover by itself. The final cutover still requires a reviewed PR, explicit approval from Mike, the GitHub Pages custom-domain change, `CNAME`, and the post-cutover checks in `docs/website/DNS_PLAN.md`.

## Route Set

Priority recruiting routes:

- `/`
- `/jobs/`
- `/pay/`
- `/equipment/`
- `/home-time/`
- `/requirements/`
- `/apply/`

Shipper and credibility routes:

- `/shippers/`
- `/lanes/`
- `/about/`
- `/contact/`

## Viewports

Visual QA covers:

- Mobile: 390px wide
- Desktop: 1440px wide

The automated cutover smoke also captures priority full-page screenshots during `npm run verify:cutover`.

## Evidence

GitHub Pages preview URL:

- `https://mns1mike.github.io/jarvis-mns1.github.io/`

Guardrail baseline:

- PR #97, `Fix mobile audit findings`, merged at `80a20d5`.
- GitHub Pages deployment run `26510243705` passed.
- Site Guardrails run `26510244861` passed.
- Live mobile verification confirmed the hamburger menu opens, desktop nav/header Apply hide on mobile, driver routes show Apply/Call, `/shippers/` shows Get a quote/Email, and `/contact/` omits the sticky CTA.

Current context and visual system baseline:

- PR #98, `Add Impeccable design context`, merged at `04c954c`.
- Site Guardrails run `26513995335` passed in 2m0s.
- `PRODUCT.md` and `DESIGN.md` now define the MNS1 brand register, visual tokens, anti-references, and route-aware CTA expectations.

Manual live spot checks on 2026-05-27:

- `/` at 390px: no horizontal overflow, mobile nav hidden until hamburger, driver sticky CTA visible.
- `/jobs/` at 390px: H1 visible, no horizontal overflow, driver sticky CTA visible.
- `/pay/` at 390px: H1 visible, no horizontal overflow, driver sticky CTA visible.
- `/equipment/` at 390px: H1 visible, no horizontal overflow, driver sticky CTA visible, logo assets loaded.
- `/home-time/` at 390px: H1 visible, no horizontal overflow, driver sticky CTA visible.
- `/requirements/` at 390px: H1 visible, no horizontal overflow, driver sticky CTA visible.
- `/apply/` at 390px: H1 visible, no horizontal overflow, IntelliApp apply surfaces present, driver sticky CTA visible.
- `/shippers/` at 390px: H1 visible, no horizontal overflow, shipper sticky CTA shows Get a quote/Email and does not show driver Apply.
- `/lanes/` at 390px: H1 visible, no horizontal overflow, driver sticky CTA visible.
- `/about/` at 390px: H1 visible, no horizontal overflow, driver sticky CTA visible because the page ends in a driver recruiting CTA.
- `/contact/` at 390px: H1 visible, no horizontal overflow, sticky CTA omitted.
- `/about/` at 1440px: desktop nav and header Apply CTA visible, mobile sticky CTA hidden, no horizontal overflow.

## Acceptance Notes

- The remaining unchecked cutover items are intentionally not visual QA items: final GitHub Pages custom-domain/CNAME work and post-cutover production-domain checks.
- Local `npm` verification was not rerun because `node_modules` is not installed locally and package installation requires explicit approval. GitHub Actions ran the full guardrail suite on the merged commits.
