# MNS1 Website Design System

## Intent
The public site should feel like a serious Midwest carrier operating at fleet scale: direct, fast, sharp, and credible. The system favors dense but readable recruiting and shipper information, restrained surfaces, and clear calls to action.

## Tokens
Source of truth: `src/styles/tokens.css`.

- Canvas: `--color-canvas` for page background.
- Surface: `--color-surface`, `--color-surface-raised`, and `--color-surface-strong` for sections, panels, and controls.
- Text: `--color-ink`, `--color-muted`, and `--color-dim`.
- Lines: `--color-line` and `--color-line-soft`.
- Accent: `--color-accent`, `--color-accent-hover`, and `--color-accent-soft`.
- Radius: `--radius-control` for buttons and inputs; `--radius-card` and `--radius-panel` stay at 8px or less.
- Spacing: `--space-section-y`, `--space-section-y-compact`, and `--space-card`.

Legacy aliases such as `--color-bg`, `--color-panel`, `--color-border`, and `--color-blue` remain mapped to semantic tokens so older components can migrate gradually without changing the visual output.

## Component Rules
- Header, footer, CTA, cards, panels, lane map frames, and article layouts use shared classes/components.
- Cards are for repeated items only: jobs, proof points, articles, and compact summaries.
- Buttons use `CtaButton.astro` for primary apply CTAs and `.button-secondary` for supporting actions.
- Public pages should prefer source data modules for repeated content instead of hardcoded route-specific copies.

## Visual Guardrails
- No negative letter spacing.
- No decorative orb/blob backgrounds.
- Cards and panels stay at 8px radius or less.
- Hero backgrounds must communicate the real business: trucks, terminal, lanes, drivers, freight, or operations.
- Mobile text must remain readable without viewport-scaled font sizing.

## Verification
- `npm run verify` builds the site and runs header, route, and design-system Playwright checks.
- Design-system checks assert token availability and guard basic radius/letter-spacing behavior on representative pages.
