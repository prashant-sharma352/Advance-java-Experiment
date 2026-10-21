---
name: Apex Tech Review & Marketplace
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#434655'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#737686'
  outline-variant: '#c3c6d7'
  surface-tint: '#0053db'
  primary: '#004ac6'
  on-primary: '#ffffff'
  primary-container: '#2563eb'
  on-primary-container: '#eeefff'
  inverse-primary: '#b4c5ff'
  secondary: '#1d4ed8'
  on-secondary: '#ffffff'
  secondary-container: '#4069f2'
  on-secondary-container: '#fffbff'
  tertiary: '#006329'
  on-tertiary: '#ffffff'
  tertiary-container: '#007f36'
  on-tertiary-container: '#c7ffca'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174b'
  on-primary-fixed-variant: '#003ea8'
  secondary-fixed: '#dce1ff'
  secondary-fixed-dim: '#b7c4ff'
  on-secondary-fixed: '#001551'
  on-secondary-fixed-variant: '#0039b5'
  tertiary-fixed: '#7ffc97'
  tertiary-fixed-dim: '#62df7d'
  on-tertiary-fixed: '#002109'
  on-tertiary-fixed-variant: '#005320'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  display-hero:
    fontFamily: Manrope
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.03em
  display-hero-mobile:
    fontFamily: Manrope
    fontSize: 32px
    fontWeight: '800'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Manrope
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.025em
  headline-lg-mobile:
    fontFamily: Manrope
    fontSize: 26px
    fontWeight: '700'
    lineHeight: 34px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Manrope
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.02em
  headline-sm:
    fontFamily: Manrope
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.015em
  title-md:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-mono:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system targets tech enthusiasts, professionals, and discerning buyers seeking authoritative evaluations and friction-free purchases of smartphones and laptops. The aesthetic blends rigorous engineering clarity with editorial polish: modern, ultra-clean, trustworthy, and high-performance.

Visual principles:
- **Precision Minimalism:** Dense product specifications and technical metrics are organized cleanly through deliberate hierarchy rather than visual clutter.
- **Utilitarian Elegance:** High-contrast neutral canvases let product hardware, performance charts, and review scores take center stage.
- **Decisive Interactivity:** Critical purchasing paths (stock statuses, price alerts, deals) are immediately identifiable via crisp semantic accents.

## Colors

The palette establishes an authoritative, daylight-balanced foundation:

- **Primary (`#2563EB`) & Secondary (`#1D4ED8`):** Royal Blue anchors key call-to-actions, brand accents, filter badges, and primary interactive states. Dark blue is reserved for active press states, sticky bar accents, and focused interactive rings.
- **Tertiary (`#16A34A`):** Vivid emerald green indicates benchmark achievements, in-stock verification, active discounts, and editor's choice awards.
- **Accent Warm Amber (`#F59E0B`):** Strictly reserved for review score stars, benchmark highlight markers, and critical caution indicators.
- **Canvas & Neutrals:**
  - Background: Crisp slate (`#F8FAFC`).
  - Card & Surface: Pure white (`#FFFFFF`).
  - Text Primary: Deep obsidian slate (`#0F172A`).
  - Text Secondary / Muted: Slate (`#64748B`).
  - Borders & Dividers: Subtle slate hairline (`#E2E8F0`).

## Typography

The typography system pairs **Manrope** for authoritative, geometric display surfaces and article headlines with **Inter** for dense, clean body copy and interface labels. **JetBrains Mono** is utilized strictly for technical spec tables, SKU codes, and hardware benchmark ratings.

Rules:
- Editorial headlines must maintain tight negative letter spacing for an architectural, modern feel.
- Product comparison tables and spec sheets rely on `label-mono` and `body-sm` to maintain vertical and tabular alignment.
- Never use pure black (`#000000`) for text. Always use `#0F172A` for primary reading contrast and `#64748B` for secondary contextual metadata.

## Layout & Spacing

The system runs on an 8pt base grid with a fluid 12-column desktop structure and a 4-column mobile structure:

- **Desktop (1200px+):** Max-width container of 1320px, 12 columns, `1.5rem` gutters, and `2rem` outer padding.
- **Tablet (768px – 1199px):** 8 columns, `1.25rem` gutters, and `1.5rem` margins.
- **Mobile (320px – 767px):** 4 columns, `1rem` gutters, and `1rem` page margins.

Layout Rules:
- Sticky navigation headers and bottom buying trays on mobile have fixed z-indices with backdrop blur filters.
- Dual-column comparison modules switch to vertically stacked cards with sticky attribute labels on screens below 768px.

## Elevation & Depth

Visual hierarchy uses ambient, cool-tinted drop shadows paired with crisp 1px borders rather than heavy elevation tiers.

- **Base Surface:** Canvas background sits at `#F8FAFC`.
- **Card Tier (Elevation 1):** `#FFFFFF` fill with border `1px solid #E2E8F0` and shadow `0 1px 3px 0 rgba(15, 23, 42, 0.04), 0 1px 2px -1px rgba(15, 23, 42, 0.04)`.
- **Hover/Interactive Tier (Elevation 2):** Elevated cards transition on pointer hover to `0 10px 15px -3px rgba(37, 99, 235, 0.07), 0 4px 6px -4px rgba(15, 23, 42, 0.04)` with border shifting to `#CBD5E1`.
- **Dropdown & Flyout Tier (Elevation 3):** Search auto-completes and filter panels use `0 20px 25px -5px rgba(15, 23, 42, 0.08), 0 8px 10px -6px rgba(15, 23, 42, 0.04)` over a hairline border.
- **Sticky Elements:** Mobile sticky CTA bar and top navigation utilize `#FFFFFF` at 92% opacity with `backdrop-filter: blur(12px)` and a subtle bottom border (`#E2E8F0`).

## Shapes

The design system implements a rounded aesthetic (`roundedness: 2`), utilizing `rounded-xl` (1.5rem / 24px) for cards and modals to match modern smartphone hardware contours.

- Standard buttons, text inputs, and dropdown triggers: `0.5rem` (8px).
- Product cards, review verdict containers, and image modules: `1rem` (16px) or `1.5rem` (24px) for featured hero cards.
- Pills, status chips, deal tags, and score badges: Full capsule radius (`9999px`).

## Components

### Buttons
- **Primary:** `#2563EB` solid fill, `#FFFFFF` text, `0.5rem` radius, bold label. Hover: `#1D4ED8`. Focus: 3px `#2563EB` ring with 2px offset.
- **Secondary / Marketplace Buy:** `#0F172A` solid background with pure white text for direct checkout or partner retail links.
- **Tertiary / Ghost:** Ghost borders in `#E2E8F0` with `#0F172A` text; hover state triggers `#F1F5F9` background.

### Cards
- **Product Card:** Pure white background, `1rem` corner radius, hairline border (`#E2E8F0`). Top image bay has slate-50 (`#F8FAFC`) aspect container, specs row rendered in `label-mono`, price emphasized in `headline-sm`, and emerald deal badge in the upper right.

### Badges & Chips
- **Score Chip:** Rounded pill featuring emerald green `#16A34A` background with crisp white text for 8.5+ ratings, or warm amber `#F59E0B` for 6.0–8.4 ratings.
- **Filter Chip:** White background, `#E2E8F0` border, `#0F172A` text. When active: `#2563EB` background with white text, without border.

### Input Fields & Search
- Neutral state: White background, 1px `#E2E8F0` border, `0.5rem` radius, `#64748B` placeholder text.
- Focus state: Border transitions to `#2563EB` with an ambient `0 0 0 3px rgba(37, 99, 235, 0.15)` glow.

### Star Ratings
- Composed of 5-point stars filled with `#F59E0B`, paired with a bold textual score (e.g., `4.8`) rendered in `Manrope` `#0F172A`.

### Mobile Sticky Bar
- Fixed to viewport bottom on product and review pages. Holds thumbnail, current best market price, and full-width `#2563EB` primary "View Deal" button.