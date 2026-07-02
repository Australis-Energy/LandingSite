---
name: Australis
description: AI-powered renewable-energy site assessment — the marketing surface
colors:
  navy: "#3a3d5d"
  indigo: "#6062ff"
  aqua: "#3bf5b7"
  emerald: "#059669"
  deep-blue: "#002060"
  off-white: "#ebfef8"
  light-gray: "#f0f0f4"
  surface-white: "#ffffff"
typography:
  display:
    fontFamily: "Poppins, sans-serif"
    fontSize: "clamp(2.25rem, 5vw, 3.75rem)"
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "Poppins, sans-serif"
    fontSize: "clamp(1.875rem, 4vw, 3rem)"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Poppins, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.3
  body:
    fontFamily: "Poppins, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Poppins, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "0.1em"
rounded:
  base: "0.5rem"
  lg: "0.75rem"
  xl: "1rem"
  pill: "1.5rem"
  full: "9999px"
spacing:
  card: "2rem"
  section-y: "6rem"
  section-y-compact: "4rem"
  container: "80rem"
components:
  button-primary:
    backgroundColor: "{colors.indigo}"
    textColor: "{colors.surface-white}"
    typography: "{typography.body}"
    rounded: "{rounded.full}"
    padding: "0.75rem 2rem"
  button-secondary:
    backgroundColor: "{colors.surface-white}"
    textColor: "{colors.navy}"
    typography: "{typography.body}"
    rounded: "{rounded.full}"
    padding: "0.75rem 2rem"
  button-on-dark:
    backgroundColor: "{colors.aqua}"
    textColor: "{colors.navy}"
    typography: "{typography.body}"
    rounded: "{rounded.lg}"
    padding: "0.75rem 2rem"
  card-glass:
    backgroundColor: "{colors.surface-white}"
    textColor: "{colors.navy}"
    rounded: "{rounded.xl}"
    padding: "2rem"
  input-field:
    backgroundColor: "{colors.surface-white}"
    textColor: "{colors.navy}"
    rounded: "{rounded.lg}"
    padding: "0.75rem 1rem"
  eyebrow-pill:
    backgroundColor: "{colors.surface-white}"
    textColor: "{colors.indigo}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    padding: "0.375rem 1rem"
---

# Design System: Australis

## 1. Overview

**Creative North Star: "The Site Survey, Rendered Live"**

Australis's marketing surface looks and behaves like the product working in
real time. The dominant metaphor is a **survey table under glass**: a pale,
blueprint-gridded ground plane (the map/land), frosted translucent cards
floating above it (the analysis), and a single electric indigo→aqua current
running through headlines, buttons, and grid-connection lines (the signal, the
verdict). Everything is light, precise, and quietly technical — closer to an
architect's drawing set than a SaaS brochure. Depth comes from translucency and
soft blur, not heavy chrome. Motion is engineered, not decorative: boundaries
draw themselves, scores count up, constraint rows resolve — the page *performs*
the assessment it's selling.

This system explicitly rejects the tells of generic AI-tool marketing (Inter +
purple gradient + emoji), greenwashed clean-energy stock photography (solar
panels at sunset, leaves, turbines), heavy enterprise-GIS gray density, and
consumer dark-mode neon. The register is **brand** — the impression *is* the
product — so restraint and specificity matter more than surface novelty.

**Key Characteristics:**
- Light, airy ground plane (off-white → white → light-gray gradients) over a subtle blueprint grid / dot pattern.
- Glassmorphism: frosted `backdrop-blur` white cards with hairline white borders and soft navy-tinted shadows.
- One signature gradient (indigo → aqua) carries headline emphasis, primary CTAs, accents, and data viz.
- Aurora blur-blobs (oversized, low-opacity indigo/aqua orbs) provide ambient color behind sections.
- Choreographed, on-scroll motion that demonstrates the product rather than decorating the page.
- Custom hand-authored SVG (hero assessment mockup, logo mark) instead of stock imagery.

## 2. Colors

A cool, technical palette: a single warm-neutral navy ink, a bright electric
accent pair, and near-white tinted grounds. The accent gradient is the brand's
entire personality; it must stay rare and intentional.

### Primary
- **Signal Indigo** (#6062ff): The primary brand accent and the anchor of every gradient. Solid on primary CTAs and active states; the start-stop of the indigo→aqua gradient on headline spans, stat numbers, card top-edges, and the developability score ring. This is the color that means "Australis."

### Secondary
- **Current Aqua** (#3bf5b7): The gradient's bright terminus and the "live signal" color — grid-connection lines, glow accents, focus rings, hover halos, and CTAs *on dark navy*. **Accent-and-gradient only.** It is too light to read as text on white.
- **Legible Emerald** (#059669): The foreground stand-in for aqua wherever a green must be *read* — check-marks, small confirming icons, positive labels. Whenever you'd reach for aqua as text, use emerald instead.

### Neutral
- **Ink Navy** (#3a3d5d): The single text color for the whole surface (used at full strength for headings, and at 60–80% opacity for body and secondary copy). Also the dark-section background (footer, CTA band) and the tint behind all soft shadows.
- **Off-White** (#ebfef8): Faintly aqua-tinted near-white; the warm start of section background gradients.
- **Light Gray** (#f0f0f4): Faintly indigo-tinted neutral; section backgrounds and the cool end of background gradients.
- **Surface White** (#ffffff): Card and glass-panel surfaces, almost always at partial opacity (`white/40`–`white/85`) so the grid shows through.
- **Deep Blue** (#002060): A reserved deep navy for the rare occasion a darker-than-ink accent is needed. Used sparingly.

### Named Rules
**The One Current Rule.** The indigo→aqua gradient is a *current*, not a fill. It appears on a small fraction of any screen — a headline span, a button, a hairline, a ring — never as a full-bleed background wash across large areas. Its scarcity is what makes it read as "signal."

**The Aqua-Is-Not-Ink Rule.** Aqua (#3bf5b7) is forbidden as foreground text. On light surfaces, green text is always emerald (#059669); aqua lives only in gradients, lines, glows, and dark-background CTAs.

## 3. Typography

**Display / Body / Label Font:** Poppins (with `sans-serif` fallback), loaded via Google Fonts at weights 300/400/500/600/700.

**Character:** A single geometric humanist sans carries the entire system — friendly enough to feel modern and optimistic, structured enough to read as engineering-grade. Headings are heavy (700) and tightly tracked; the personality is confidence, not flourish. Global rule: all headings are `font-semibold`+ with `tracking-tight`.

### Hierarchy
- **Display** (700, `clamp(2.25rem, 5vw, 3.75rem)` / text-4xl→6xl, line-height 1.08): Hero H1 only. Frequently split so a clause renders in the indigo→aqua gradient ("In minutes, not months.").
- **Headline** (700, text-3xl→5xl, line-height ~1.15): Section H2s. Often paired with a centered eyebrow pill above and a short gradient underline (`h-1 w-40`) below.
- **Title** (600–700, 1.25rem / text-xl): Card and benefit headings.
- **Body** (400, 1.125–1.25rem / text-lg→xl, line-height 1.6): Paragraph copy, always Ink Navy at 60–80% opacity for a softened, calm read against near-white.
- **Label** (600, 0.75rem / text-xs, UPPERCASE, letter-spacing 0.1em / tracking-widest): The "eyebrow" pill above headings, stat captions, and app-chrome microcopy.

### Named Rules
**The Gradient-Clause Rule.** Emphasis in a headline is created by rendering *one* clause in the indigo→aqua gradient (`bg-clip-text text-transparent`), never by switching weight or size mid-line. One gradient clause per heading, maximum.

## 4. Elevation

The system is **layered through translucency, not shadow weight**. Depth is built from stacked frosted planes: a gridded ground, aurora blur-blobs above it, then `backdrop-blur` glass cards above those. Shadows are present but deliberately soft, large-radius, and *tinted navy* (never neutral black) so cards feel lifted off a light surface rather than cut out on it. Surfaces are near-flat at rest and *lift on interaction* — hover adds a translate and a colored (aqua/indigo-tinted) glow.

### Shadow Vocabulary
- **Resting card** (`shadow-xl shadow-australis-navy/5`): The default frosted-card lift — barely-there, navy-tinted.
- **Hover lift** (`hover:shadow-2xl hover:shadow-australis-aqua/15` + `hover:-translate-y-2`): Interactive cards rise and gain a colored halo on hover/focus.
- **Floating chip** (`shadow-xl shadow-australis-navy/10`): The detached hero chips ("Assessment time", "Grid headroom") that hover over the mockup.
- **Ambient glow** (large `blur-2xl`/`blur-3xl` gradient orbs at 10–30% opacity): Not a box-shadow — background aurora that colors the space behind sections and product frames.

### Named Rules
**The Navy-Shadow Rule.** Shadows are always tinted (`shadow-australis-navy/5`, `/10`, or an accent tint on hover), never plain black. A neutral gray drop-shadow reads as a 2014 app and is prohibited.

**The Lift-On-Intent Rule.** Elevation is a *response*. Cards sit flat until hover or focus, then translate up and gain a colored glow. Nothing floats aggressively at rest except the two intentional hero chips.

## 5. Components

### Buttons
- **Shape:** Fully pill-shaped on the marketing surface (`rounded-full`, 9999px); form-submit buttons inside dark panels use a softer `rounded-xl` (1rem).
- **Primary:** Solid-to-gradient Signal Indigo (`from-australis-indigo to-australis-indigo/85`), white text, `px-8`, generous height (`size="lg"`). The workhorse CTA — "Book a Demo".
- **Hover / Focus:** Lift (`-translate-y-0.5`) plus a colored glow (`hover:shadow-xl hover:shadow-australis-indigo/30`); trailing arrow icons nudge right (`group-hover:translate-x-1`). All transitions ~300ms.
- **Secondary (outline):** Translucent white (`bg-white/60 backdrop-blur-sm`), navy text, hairline navy border that shifts to indigo on hover. Used for "How It Works".
- **On-dark:** Inside navy CTA bands, the primary button flips to the aqua gradient (`from-australis-aqua to-[#2fd9a1]`) with **navy text** — the one place aqua carries a filled surface, and it still never carries text.

### Chips / Pills
- **Eyebrow pill:** `section-eyebrow` — inline uppercase label (indigo text on a faint indigo/white tint, hairline indigo border, `rounded-full`) with a small leading Lucide icon. Sits centered above nearly every section headline.
- **Constraint badge:** Tiny uppercase status pill (CRITICAL / LOW / GOOD) with a leading traffic-light dot; color-coded *and* labeled so status never depends on color alone.

### Cards / Containers
- **Corner Style:** `rounded-2xl` (1rem) for standard cards, `rounded-3xl` (1.5rem) for elevated hero/feature panels.
- **Background:** Frosted translucent white (`bg-white/40` → `white/85`) with `backdrop-blur-xl`, so the blueprint grid and aurora show through.
- **Border:** Hairline translucent white (`border-white/60`) — the "glass edge". Many cards add a gradient hairline or a gradient top-edge accent that intensifies on hover.
- **Shadow Strategy:** Resting card → hover lift (see Elevation).
- **Internal Padding:** `p-8` (2rem) standard.

### Inputs / Fields
- **Style:** Context-dependent translucency. On light sections: `bg-white/40 backdrop-blur-sm` with a hairline border. On dark CTA bands: `bg-white/10` with white/20 border and white placeholder text.
- **Focus:** Aqua focus ring (`focus:ring-2 focus:ring-australis-aqua/50`), border fades to transparent. No hard outline.
- **Radius:** `rounded-lg`/`rounded-xl` (0.5–1rem).

### Navigation
- **Style:** Fixed top bar, transparent-to-frosted on scroll (`bg-white/40` → `bg-white/80 backdrop-blur-xl` + hairline border + soft shadow past 12px scroll).
- **Links:** Pill hover targets — navy/70 text, `rounded-full`, faint navy/5 background on hover. Trailing primary "Book a Demo" button (indigo gradient).
- **Mobile:** Hamburger toggles a frosted `bg-white/95 backdrop-blur-xl` sheet; links become full-width rounded rows.

### Signature Component — Live Assessment Mockup
The hero's centerpiece: a frosted "app window" (fake chrome dots + `app.australis.energy` title) containing a hand-authored SVG map. On load it **performs an assessment** — the site-boundary polygon draws itself (`stroke-dashoffset` animation), the developability score ring sweeps and counts up to 88 via an indigo→aqua gradient stroke, and constraint rows stagger in with color+label status. Two detached glass chips float alongside ("Assessment time 4 min 12 sec", "Grid headroom 45 MVA · 1.2 km"). This is the brand's proof-of-product and its single most important visual — never replace it with a static screenshot or stock image.

## 6. Do's and Don'ts

### Do:
- **Do** keep the indigo→aqua gradient rare and directional — one gradient clause per headline, on CTAs, hairlines, and data viz only (**The One Current Rule**).
- **Do** use emerald (#059669) for any green that must be *read* as text or a small icon; reserve aqua (#3bf5b7) for gradients, lines, glows, and on-dark fills (**The Aqua-Is-Not-Ink Rule**).
- **Do** build depth from translucency and soft *navy-tinted* shadows over a blueprint-grid ground; let cards lift on hover, not at rest.
- **Do** set body copy in Ink Navy at 60–80% opacity, headings at full strength, and always use Poppins.
- **Do** demonstrate the product with hand-authored SVG (drawing boundaries, counting scores, resolving constraints) — show the assessment happening.
- **Do** pair every constraint/status color with a text label so meaning never depends on color alone; honor `prefers-reduced-motion` for the entrance/count-up/marquee animations.

### Don't:
- **Don't** ship generic AI-tool marketing — no Inter font, no purple gradient, no emoji headlines, no "supercharge your workflow" filler.
- **Don't** use greenwashed clean-energy stock photography (solar-panels-at-sunset, leaves, turbines) or leaf/globe logos. Show the tool, not the vibe.
- **Don't** drift toward enterprise-GIS gray density or consumer dark-mode neon dashboards; the surface stays light, calm, and precise.
- **Don't** use plain black/gray drop shadows — shadows are tinted navy (**The Navy-Shadow Rule**). A neutral gray shadow reads as a 2014 app.
- **Don't** flood large areas with the accent gradient or use aqua as foreground text.
- **Don't** introduce the legacy `australis-blue`/`-green`/`-teal`/`-lightBlue`/`-gray` tokens or the stock shadcn `--primary`/`--secondary`/`--accent` (teal) CSS variables on this surface — they are dead code relative to the brand palette above and are pending cleanup. The marketing site runs only on navy / indigo / aqua / off-white / light-gray (+ emerald for legible green).
