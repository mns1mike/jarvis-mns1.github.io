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
- `astro@6.3.3` — MIT, released 2026-05-14.
- `@playwright/test@1.60.0` — Apache-2.0, released 2026-05-11.

## Browser Policy
- Playwright is configured to use installed Chrome via `PLAYWRIGHT_CHANNEL=chrome`.
- CI verifies `google-chrome --version`.
- Browser binaries are not downloaded during normal CI.

## GitHub Actions
- Actions are pinned to commit SHA, not floating tags.
- Workflow permissions are `contents: read`.
- The guardrail workflow builds and tests only; it does not deploy.

## Deployment Policy
- The existing GitHub Pages root-static deployment remains in place until Astro content parity is reviewed.
- Switching deployment to Astro `dist/` requires a separate PR and approval.
- The backup tag and archive must be referenced in that PR's rollback plan.
