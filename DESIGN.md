---
name: MNS1 Express Public Website
description: Public recruiting and shipper website for a serious Midwest carrier.
colors:
  canvas: "#0b1020"
  surface: "#101836"
  surface-raised: "#101836"
  surface-strong: "#16214a"
  ink: "#f8fbff"
  muted: "#b9c1d9"
  dim: "#7a84a3"
  line: "#243063"
  accent: "#0099d7"
  accent-hover: "#007ab0"
  cta: "#007ab0"
typography:
  display:
    fontFamily: "\"Barlow Condensed\", \"Arial Narrow\", sans-serif"
    fontSize: "clamp(36px, 4.6vw, 72px)"
    fontWeight: 900
    lineHeight: 1.02
    letterSpacing: "0"
  body:
    fontFamily: "Overpass, Arial, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "0"
  label:
    fontFamily: "Overpass, Arial, sans-serif"
    fontSize: "12px"
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: "0.12em"
rounded:
  control: "4px"
  card: "8px"
  panel: "8px"
spacing:
  section-y: "64px"
  section-y-compact: "44px"
  card: "22px"
components:
  button-primary:
    backgroundColor: "{colors.cta}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "0 18px"
    height: "38px"
  button-primary-hover:
    backgroundColor: "{colors.accent-hover}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "{spacing.card}"
  panel:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.ink}"
    rounded: "{rounded.panel}"
    padding: "{spacing.card}"
---

# Design System: MNS1 Express Public Website

## 1. Overview

**Creative North Star: "Night Dispatch Board"**

The site should feel like a focused operations surface for a real Midwest carrier after dark: dense enough to be useful, sharp enough to feel current, and direct enough that drivers and shippers can act without being sold a fantasy. The dark palette, condensed display type, and bright dispatch-blue accent create a trucking-specific identity without drifting into generic SaaS polish.

The system rejects decorative blobs, glassmorphism, vague logistics stock language, and card grids that exist only to fill space. Every major section should connect to concrete business proof: trucks, lanes, equipment, pay, terminal, phone, email, apply, or coverage.

**Key Characteristics:**

- Dark operational canvas with restrained blue action color.
- Tall condensed display type for carrier confidence and roadside-sign clarity.
- Compact 4px to 8px radii, never pill-heavy outside intentional labels.
- Real business imagery and route/equipment proof over abstract decoration.
- Mobile-first action paths with route-aware sticky CTAs.

## 2. Colors

The palette is a dark fleet-operations system: navy canvas, layered blue-black surfaces, cool white text, and one clear dispatch-blue action color.

### Primary

- **Dispatch Blue** (`#0099d7`): Primary action and emphasis color. Use for apply CTAs, active states, important labels, and small proof highlights.
- **Deep Dispatch Blue** (`#007ab0`): Hover and CTA depth state. Use when the primary action needs a stronger pressed or active feel.

### Neutral

- **Night Canvas** (`#0b1020`): Page background and hero depth.
- **Cab Surface** (`#101836`): Standard section, panel, and card surface.
- **Raised Cab Surface** (`#101836`): Raised surface token. In code this can appear with opacity for overlays.
- **Hard Surface** (`#16214a`): Stronger control or border-adjacent surface.
- **Headlight White** (`#f8fbff`): Primary text and CTA text.
- **Road Mist** (`#b9c1d9`): Secondary body text and supporting proof.
- **Dim Instrument Text** (`#7a84a3`): Low-priority metadata.
- **Route Line** (`#243063`): Borders, dividers, and structural outlines.

### Named Rules

**The One Action Color Rule.** Dispatch Blue carries almost every interactive emphasis. Do not introduce new accent colors unless the section has a real semantic need.

**The No Empty Glow Rule.** Blue glow or radial light must support a hero, CTA, lane, or equipment moment. It should not appear as generic decoration.

## 3. Typography

**Display Font:** Barlow Condensed, with Arial Narrow fallback
**Body Font:** Overpass, with Arial fallback
**Label/Mono Font:** No mono family by default

**Character:** The pairing is compressed, practical, and transportation-specific. Display type should feel like dispatch signage and truck-door lettering; body text should stay plain and easy to scan.

### Hierarchy

- **Display** (900 italic, `clamp(36px, 4.6vw, 72px)`, 1.02): Hero headlines and major page claims.
- **Headline** (800 to 900, 32px to 52px, tight line-height): Section headings that frame proof or conversion intent.
- **Title** (700 to 800, 18px to 28px): Card and panel titles.
- **Body** (400 to 600, 16px, 1.5 to 1.7): Page copy, limited to readable measures around 65 to 75ch where long-form text appears.
- **Label** (800, 12px, 0.12em, uppercase): Eyebrows, stats, and operational metadata. Use sparingly so it feels like a system, not filler.

### Named Rules

**The Concrete Headline Rule.** Headlines should name a tangible driver or shipper value: pay, equipment, home time, lanes, capacity, quote path, or accountability.

## 4. Elevation

The system uses tonal layering first and shadows second. Surfaces should mostly separate through color, border, and spacing. Shadows are reserved for CTAs, hero cards, and hover states that need tactile feedback.

### Shadow Vocabulary

- **Accent Lift** (`0 8px 28px -6px rgba(0, 153, 215, 0.55)`): Use on primary CTAs or blue-accent controls only.
- **Hero Panel Depth** (`0 24px 62px -34px rgba(0, 153, 215, 0.7)`): Use for major hero-side panels, not repeated cards.

### Named Rules

**The Flat Freight Rule.** Repeated cards stay mostly flat. Depth belongs to actions and important hero proof, not every container.

## 5. Components

### Buttons

- **Shape:** Compact rectangular controls with 4px radius.
- **Primary:** Dispatch Blue background, white text, heavy Overpass label, fixed header height where used in navigation.
- **Hover / Focus:** Darker blue hover, visible 3px blue focus outline, no layout shift.
- **Secondary:** Border or neutral surface treatment for phone, email, quote, and supporting links.

### Cards / Containers

- **Corner Style:** 8px radius maximum.
- **Background:** Cab Surface or transparent section backgrounds.
- **Shadow Strategy:** Flat by default. Use borders and tonal contrast first.
- **Border:** Route Line or soft white line on dark panels.
- **Internal Padding:** `--space-card` for standard cards, expanded only for hero or form panels.

### Inputs / Fields

- **Style:** Dark surface field with visible label, 4px radius, and readable placeholder text.
- **Focus:** Use the shared 3px Dispatch Blue focus outline.
- **Mobile:** Inputs must remain large enough for touch and should not be obscured by the sticky CTA.

### Navigation

- **Desktop:** Sticky header with topbar, brand, primary nav, and Apply CTA.
- **Mobile:** Brand plus 44px hamburger control. Desktop nav and header CTA hide on mobile; opened mobile nav exposes the full primary navigation.
- **Sticky CTA:** Driver pages use Apply and Call; shipper pages use quote/contact and email; general contact pages may omit the sticky CTA.

### Data / Proof Blocks

- Use stats only when they clarify scale or decision-making. Preferred stats include trucks, states, year founded, pay range, equipment year, and coverage.
- Avoid hero-metric templates that feel generic. Stats should sit near a specific claim.

## 6. Do's and Don'ts

### Do

- Use real MNS1 assets, route maps, equipment facts, driver pay details, and shipper capacity proof.
- Keep mobile action paths visible and context-specific.
- Preserve shared Astro components and source data modules for repeated content.
- Use Dispatch Blue intentionally for actions, active states, and key proof.
- Test desktop and mobile pages before cutover-related changes.

### Don'ts

- Do not add decorative gradient blobs, glass cards, or generic AI landing-page effects.
- Do not use rounded pill buttons everywhere.
- Do not introduce new fonts without a deliberate brand reason and dependency/security review.
- Do not add new accent colors just to make sections feel different.
- Do not patch generated root HTML as the normal workflow.
- Do not make shipper pages show driver-only Apply CTAs.
