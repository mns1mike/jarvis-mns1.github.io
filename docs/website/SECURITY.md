# Website Security Guardrails

## Dependency Rules
- Runtime and test dependencies are exact-pinned in `package.json`.
- `package-lock.json` is committed and must be used with `npm ci`.
- `.npmrc` sets `ignore-scripts=true`, `save-exact=true`, `fund=false`, and `audit=true`.
- CI installs with `npm ci --ignore-scripts`.
- New or upgraded npm packages must pass:
  - release age at least 7 days for direct and transitive packages,
  - `npm audit --audit-level=moderate`,
  - OSV batch query with zero known vulnerabilities.

## Current Direct Dependencies
- `astro@6.3.3`, MIT, released 2026-05-14.
- `@playwright/test@1.60.0`, Apache-2.0, released 2026-05-11.

## Browser Policy
- Playwright is configured to use installed Chrome via `PLAYWRIGHT_CHANNEL=chrome`.
- CI verifies `google-chrome --version`.
- Browser binaries are not downloaded during normal CI.

## GitHub Actions
- Actions are pinned to commit SHA, not floating tags.
- Workflow permissions are `contents: read`.
- `Site Guardrails` runs on every pull request so the required `build-and-verify` check cannot be skipped by path filters.
- The guardrail workflow builds and tests only; it does not deploy.

## Deployment Policy
- The GitHub Pages deployment workflow builds Astro from source and deploys `dist/` from
  `main` only after PR review/merge, or by explicit manual dispatch.
- Switching production traffic to Astro `dist/` is a separate cutover step. It requires
  `docs/website/CUTOVER.md` readiness checks, a final reviewed cutover PR, and explicit
  approval before DNS or GitHub Pages custom-domain changes.
- The backup tag and archive must be referenced in that PR's rollback plan, and
  `docs/website/FORM_BACKOUT.md` must remain accurate for application/contact rollback.
- `docs/website/DNS_PLAN.md` must remain accurate for target DNS, TTLs, verification
  commands, and rollback records before any custom-domain change.
