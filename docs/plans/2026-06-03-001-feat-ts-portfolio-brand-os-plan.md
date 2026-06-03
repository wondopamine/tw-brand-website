---
title: "feat: Reframe site as Teacher & School portfolio brand operating system"
type: feat
status: active
date: 2026-06-03
---

# feat: Reframe site as Teacher & School portfolio brand operating system

## Overview

This site started as a brand guideline for a single product (Teacher Workspace by TransformX). It needs to grow up into the **Teacher & School (T&S) portfolio's brand operating system** — a living governance + tooling hub for all products built for teachers and schools.

Three shifts at once:
1. **Reframe** all existing copy from single-product (TW) to portfolio (T&S, with TW as flagship).
2. **Add two new surfaces** on the canvas: a **Products** section (the actual lineup in T&S today — TW, CaseSync, ReleifCher, Glow, COVAA) and a **Tools & Resources** section (links to tangible, on-brand tooling like the icon-generator repo). These are the "operating system" parts — not just docs, but pointers to working artifacts.
3. **Preserve** the existing visual identity (TW Blue `#0064FF` becomes the T&S portfolio color, anchored on the flagship), the existing UX shape (home + canvas + folders + modals), and the 26 commits of work already on `refactor/code-review-cleanup`.

---

## Problem Frame

The site currently presents itself as the brand guideline *for one product*. The manifesto opens with "Teacher Workspace is utility-first at its core, human-first at the surface." Every folder and modal speaks as though TW is the only thing. This positioning is now wrong on three counts:

1. **T&S has multiple products.** Teacher Workspace is the flagship super-app, but CaseSync, ReleifCher, Glow, COVAA — and more to come — also belong to the T&S portfolio and should follow the same brand. The site needs to represent the portfolio, not the flagship.
2. **The brand belongs to T&S, not DXD.** DXD (Digital eXcellence and Products Division) has its own brand identity. This site documents **the T&S portfolio's brand**, which DXD products contribute to but doesn't own. Any "by DXD" framing in copy is wrong.
3. **It's an operating system, not a static guideline.** The user explicitly named it an *operating system*. That implies governance (rules product builders follow) AND tooling (links to working artifacts like the icon-generator). A static manifesto can't carry the second half.

**Audience priority** (in order):
- Product builders — designers, then PMs (primary)
- Leadership (occasional consult)
- MOE stakeholders (may visit; not the writing target)

**What the audience needs:** decisions they can act on, tokens/tools they can pull, examples that look like what they actually build. Not marketing copy.

**What's out of scope (other domains):** Student, Parent, and Corporate are sibling domains to T&S. Each gets its own brand OS. This site is purely about T&S and should not pretend to speak for the others.

---

## Requirements Trace

- **R1.** Every public-facing copy surface (home manifesto, folder panels, modal cards, metadata) reads as the T&S portfolio's brand — not as a single-product (TW) brand.
- **R2.** The site explicitly enumerates the T&S product lineup today (TW as flagship + CaseSync, ReleifCher, Glow, COVAA as the supporting products) on a dedicated **Products** surface accessible from the canvas.
- **R3.** The site surfaces external, tangible on-brand tools as a dedicated **Tools & Resources** surface — at minimum the icon-generator repo (https://github.com/wondopamine/icon-generator). The framing makes clear these are *active tools*, not just documentation.
- **R4.** The brand belongs to T&S. No copy implies DXD ownership of the brand (DXD has its own brand). MOE alignment is not claimed.
- **R5.** TW Accent `#0064FF` is retained as the T&S portfolio's primary color (anchored on the flagship product). Public-facing labels reflect the new framing ("Teacher & School Blue" or equivalent); internal CSS token names (`--accent`) stay unchanged to avoid wide refactor churn.
- **R6.** The 4 brand principles (Utility by Default, Kind at Surface, Calm Guidance, Light Weight) and 7 product design principles persist verbatim in spirit. They scale from one product to the portfolio; the *application* of the principles broadens.
- **R7.** Visual fidelity to the current Linear-inspired aesthetic is preserved. No layout regressions; new surfaces use the existing `<Card>` / `<Dialog>` shadcn primitives.
- **R8.** All work happens on top of `refactor/code-review-cleanup` (currently 26 commits). The shadcn/Base UI primitives shipped in that branch are reused as-is.

---

## Scope Boundaries

- Not renaming the repository (`tw-brand-website`) or the npm package name. Repo rename is high-blast-radius (breaks clones, deploy URLs, references) for low payoff; defer indefinitely.
- Not renaming the CSS variable `--accent` itself. Display label changes; the technical token stays for backward compatibility across the codebase.
- Not building per-product detail pages or product-specific tokens. Products are listed; deep dives into each product's brand application are deferred to follow-on work.
- Not building any of the other 3 domains' brand systems (Student, Parent, Corporate). Each gets its own.
- Not claiming MOE alignment, DXD ownership, or any specific institutional positioning beyond "T&S portfolio brand."
- Not adding authentication, search, or any dynamic content infrastructure — site stays static.
- Not rebuilding the canvas, sticker, minimap, or any of the bespoke surfaces.
- Not introducing a CMS or content management workflow. Content lives in `src/data/` as TypeScript modules, edited via PR.

### Deferred to Follow-Up Work

- Per-product brand pages (each product's own application page within the T&S brand) — a separate plan when the products mature
- Migration of any TW-specific copy in the bespoke `HeroText` typography playground — left as-is per scope boundary on bespoke surfaces from the previous refactor
- Decision on whether CaseSync / ReleifCher / Glow / COVAA become "natively integrated" sub-modules of TW or remain independent products — a product/strategy question, not a brand-site question
- Repo rename (`tw-brand-website` → `ts-brand-website` or similar) — if the user wants it later, separate one-time migration

---

## Context & Research

### Relevant Code and Patterns

- `src/data/modal-contents.ts` — the 7 modal cards (aesthetics, about-guidelines, manifesto, always-from-teachers, voice-tone, brand-principles, design-principles). Largest copy surface; the manifesto modal is the single most TW-anchored block in the codebase.
- `src/data/panel-contents.ts` — the 5 folder panels (colours, imagery, illustrations, typography, use-cases). Each is a structured TypeScript object with items (text, divider, color-swatch, asset-list, guideline) — extensible.
- `src/data/canvas-items.ts` — the spatial layout of items on the canvas. New surfaces (Products folder, Tools folder) get added here.
- `src/data/stickers.ts` — illustration stickers on the canvas; their captions also reference TW.
- `src/app/page.tsx` — the homepage with manifesto card. Body copy is the most prominent reframing target.
- `src/app/layout.tsx` — page metadata (title, description). Public-facing identity.
- `src/types/panel.ts` and `src/types/canvas.ts` — the type union for content items. May need a new `ProductCard` or `ExternalLinkCard` variant for the new surfaces.
- `src/components/items/BrandCard.tsx` — already supports default + featured variants. Pattern likely reusable for product cards (default = a product in the lineup, featured = the TW flagship statement).
- `src/components/items/UtilityCard.tsx` — icon + title + description; clean fit for tool/resource cards on the Tools surface.

### Institutional Learnings

- `docs/plans/2026-06-02-001-refactor-shadcn-base-ui-migration-plan.md` — the previous plan + executed branch shows the working `<Card>`, `<Button>`, `<Dialog>` primitives, the icon barrel (`src/components/icons/index.ts`), and the data-driven canvas layout pattern. This plan reuses those primitives without adding new ones.
- The QuoteCard deviation from the previous plan (kept card-less per editorial intent) established the precedent: when the planned visual treatment conflicts with brand intent, the brand intent wins. That precedent applies here too — if reframing some copy makes a section feel wrong, the writer should push back rather than mechanically apply the template.

### External References

- The icon-generator repo (https://github.com/wondopamine/icon-generator) is named as the first tangible tool to link. Treat the link as authoritative; do not invent additional tool URLs without the user supplying them.
- No external research on brand-OS patterns was performed. The user has clear product intent; library-shopping for brand-system frameworks (Lightning Design System, Polaris, etc.) would distract from execution.

---

## Key Technical Decisions

- **Portfolio data model lives in a new `src/data/portfolio.ts`.** Centralizes the products list (TW flagship + CaseSync + ReleifCher + Glow + COVAA + future) and the tools/resources list (icon-generator + future). Consumed by U6 (Products surface) and U7 (Tools surface). Edits live in one place.
- **Reuse existing `BrandCard` / `UtilityCard` shapes for new surfaces.** Don't introduce new component types if existing ones fit. Products feel like brand cards (one is "featured" — TW); tools feel like utility cards (icon + label + outbound link). Add a small `href` prop to the relevant variants if needed for outbound linking.
- **CSS token name `--accent` stays unchanged.** The brand label ("Teacher & School Blue" or similar) changes in copy; the underlying technical name does not. Avoids a wide refactor across 30+ files just to rename one variable.
- **"TW" stays as the product identifier; "T&S" is the portfolio identifier.** Crisp two-letter shorthand for both. The site says "T&S portfolio" when speaking of the brand; "TW" or "Teacher Workspace" when speaking of the flagship product.
- **Other 3 domains (Student / Parent / Corporate) are NOT mentioned on the site.** Per the user, each gets its own brand OS. Acknowledging them as siblings could be done in a small About blurb, but the user said "no need" — so we don't.
- **Repo + package name stay as `tw-brand-website`.** Public surface only changes; the file system stays. A later cleanup PR can rename if it becomes worth the disruption.
- **No new design tokens.** The portfolio color is the existing `--accent`. No "product-color" tokens introduced — products inherit the portfolio color today. If product-specific colors become a requirement, a later plan handles that.
- **External links open in new tabs with `rel="noopener noreferrer"`.** Standard hygiene. Visible affordance (e.g., an external-link icon from lucide-react: `ExternalLink`) so users know the link is outbound.

---

## Open Questions

### Resolved During Planning

- *Brand hierarchy:* Portfolio IS the brand. T&S is the portfolio name. TW is the flagship product within the portfolio. (Note: portfolio sits inside a parent "domain" layer with siblings Student / Parent / Corporate, but those siblings are out of scope for this site.)
- *Product list:* Teacher Workspace (flagship super-app), CaseSync, ReleifCher, Glow, COVAA. User indicated more exist; list is starting point, not exhaustive.
- *Audience:* Product builders — primarily designers and PMs. Secondary: leadership and MOE stakeholders.
- *Brand ownership:* T&S itself. NOT DXD (which has its own brand). NOT MOE (which is independent today).
- *Color:* TW Blue `#0064FF` stays as the T&S portfolio's primary color because TW is the flagship. Public label evolves; technical token (`--accent`) does not.
- *Scope:* Reframe ALL copy + add a Products surface + add a Tools & Resources surface. Not per-product detail pages (deferred). Not repo rename (deferred).
- *Other domains:* Out of scope.

### Deferred to Implementation

- **Exact public label for the portfolio color.** "Teacher & School Blue" is a strong default. "T&S Accent" is more compact. "Portfolio Blue" works too. Resolve at U2 when reframing the Colours panel — write what reads best in context.
- **Exact one-line description for each non-TW product** (CaseSync, ReleifCher, Glow, COVAA). The user supplied names but not descriptions. Resolve at U6 by either asking the user for a one-liner each, or proposing placeholders the user can edit in-line.
- **Whether the Products surface should mark TW visually distinct** (featured-variant chrome similar to BrandCard's "Why Aesthetics matters?" treatment, since TW is the flagship). Resolve at U6 by trying it and judging visually.
- **Whether the Tools section appears as a canvas folder (like Colours/Typography), or as a different surface shape** (e.g., a row of cards rather than a folder). Resolve at U7 with whichever feels right on the canvas grid.
- **Brand label for the canvas badge** that currently reads "Brand Guidelines." Resolve at U4 — likely "Brand Operating System" or "Brand OS" to match the user's framing, but the visual cost of a longer label matters.
- **Whether to add an About section** explaining who this site is for and what the T&S portfolio is. Resolve at U2 or U3 by either rewriting the existing About Guidelines modal into a richer About T&S, or leaving the existing one and accepting that the site framing is implicit.

---

## Output Structure

This work adds 1–2 new files and modifies the rest. The data layer grows by one module; no new top-level directories.

    src/
    ├── data/
    │   ├── canvas-items.ts        # MODIFIED — register two new canvas folders (Products, Tools)
    │   ├── modal-contents.ts      # MODIFIED — reframe 7 modal cards
    │   ├── panel-contents.ts      # MODIFIED — reframe 5 folder panels + add 2 new ones (Products, Tools)
    │   ├── portfolio.ts           # NEW — single source of truth for products list + tools list
    │   └── stickers.ts            # MODIFIED — reframe sticker captions
    ├── app/
    │   ├── layout.tsx             # MODIFIED — metadata title + description reframed
    │   └── page.tsx               # MODIFIED — manifesto card copy reframed
    └── types/
        └── portfolio.ts           # NEW — types for ProductEntry, ToolEntry

---

## Implementation Units

### Phase 1 — Foundation

- U1. **Define portfolio data model**

**Goal:** Single source of truth for the T&S product lineup and the tools/resources catalogue. Two new files (`src/data/portfolio.ts` and `src/types/portfolio.ts`) that downstream units (U6, U7) consume.

**Requirements:** R2, R3

**Dependencies:** None

**Files:**
- Create: `src/types/portfolio.ts` — `ProductEntry` (id, name, shortName, role: "flagship" | "supporting", description, status: "shipping" | "in-development" | "concept"), `ToolEntry` (id, name, description, href, category)
- Create: `src/data/portfolio.ts` — exports `products: ProductEntry[]` (TW + CaseSync + ReleifCher + Glow + COVAA) and `tools: ToolEntry[]` (icon-generator + placeholders the user can extend)

**Approach:**
- Keep types minimal — only what U6 and U7 actually render. Don't pre-design fields nobody uses.
- For products: TW is `role: "flagship"`, others `role: "supporting"`. Status defaults to "shipping" but can be "in-development" if the user signals so for any product.
- For tools: start with icon-generator entry; leave a comment in the file inviting future tool entries with the canonical shape.

**Patterns to follow:**
- `src/types/panel.ts` and `src/types/canvas.ts` — TypeScript discriminated unions and entry interfaces
- `src/data/stickers.ts` — minimal data module with named exports and inline comments

**Test scenarios:**
- Test expectation: none — pure data module + types; no behavior

**Verification:**
- `npm run build` clean (TypeScript compiles the new types and the data module imports them correctly)
- The exported `products` array has length ≥ 5 with exactly one `role: "flagship"`
- The exported `tools` array contains the icon-generator entry with a valid HTTPS href

---

### Phase 2 — Reframe copy (parallel-safe, different files)

- U2. **Reframe modal contents (`src/data/modal-contents.ts`)**

**Goal:** Rewrite all 7 modal cards so the philosophy speaks at the portfolio level (T&S brand, applied to TW and supporting products) rather than the single-product level. Manifesto is the largest visible change; the other 6 are smaller copy edits.

**Requirements:** R1, R4, R6

**Dependencies:** None (parallel with U3, U4)

**Files:**
- Modify: `src/data/modal-contents.ts`

**Approach:**
- **Manifesto modal:** rewrite the opening paragraph. Current: "Teachers across Singapore navigate dozens of platforms…" — fine, keep. Then: "Teacher Workspace is utility-first at its core, human-first at the surface." → reframe to portfolio voice. Proposed direction: "The Teacher & School portfolio is utility-first at its core, human-first at the surface. Every product we build for teachers — Teacher Workspace as the flagship, CaseSync, ReleifCher, Glow, COVAA — moves teachers through their day with less friction and more confidence." The "Kind Utility" framing and 4 principles persist verbatim.
- **About Guidelines modal:** retitle to "About this Brand OS" or similar. Update body to say this document governs the T&S portfolio's brand (not just TW). Reference the operating-system framing (governance + tools). Keep the "this is NOT about" list with minor edits.
- **Always From Teachers modal:** rewrite to "every product in the T&S portfolio begins with teachers" — same philosophy, broader application. Quotes stay.
- **Voice & Tone modal:** the voice attributes (warm/clear/helpful/professional/confident) are portfolio-level already. Light edits to remove TW-specific references.
- **Brand Principles modal:** the 4 principles persist verbatim. Reframe the intro and any TW-specific examples to be portfolio-level.
- **Product Design Principles modal:** the 7 principles persist verbatim. The "Design for One Teacher" example (Ms. Lim teaching P5 Math) stays — that's good craft regardless of which product. Light edits where copy says "TW" or "Teacher Workspace" as the only example.
- **Aesthetics modal:** rewrite "Teacher Workspace is a premium, trustworthy tool" → "the T&S portfolio products are premium, trustworthy tools." Same trust-equation framing.
- **CRITICAL:** No mention of DXD ownership. No claim of MOE alignment. The brand is T&S's.

**Patterns to follow:**
- Existing modal section types (`heading`, `paragraph`, `list`, `highlight-box`, `two-column`, `quote`, `quadrant`) — don't introduce new types
- Existing tone — confident, warm, not corporate

**Test scenarios:**
- Test expectation: none — content reframing, no behavioral change

**Verification:**
- All 7 modal cards open on `/canvas` and render their reframed content
- `npm run build` clean
- A grep for "TW is" / "Teacher Workspace is" outside the Products / Manifesto sections returns no single-product framing statements
- Manual read: the manifesto's filter test ("Does this help teachers work faster with less stress? If not — we don't build it.") still applies to the portfolio voice

---

- U3. **Reframe folder panel contents (`src/data/panel-contents.ts`)**

**Goal:** Rewrite the 5 folder panels (Colours, Imagery, Illustrations, Typography, Use Cases) so the guidance applies portfolio-wide. The most opinionated change is the Colours panel — the "TW Accent" label retires.

**Requirements:** R1, R5

**Dependencies:** None (parallel with U2, U4)

**Files:**
- Modify: `src/data/panel-contents.ts`

**Approach:**
- **Colours panel:**
  - Rename swatch label "TW Accent" → "Teacher & School Blue" (or "T&S Blue" if the label feels long). Hex value stays `#0064FF`.
  - Rewrite the "Why We Picked This" body: TW Blue is now the portfolio's anchor color because TW is the flagship. Keep the MOE-inspired heritage line; remove any claim of formal MOE alignment.
  - Description text: "The T&S portfolio's colour system anchored in a single primary blue. Click any swatch to copy its HEX value."
- **Imagery panel:** the "real teachers" rationale is portfolio-level already. Light edits — replace "Teacher Workspace" with "the T&S portfolio" or "every T&S product" where it appears.
- **Illustrations panel:** same — the rounded/warm/hand-drawn style applies across the portfolio. Light edits to references.
- **Typography panel:** Plus Jakarta Sans + Inter are portfolio fonts. Edit the "Why" rationale to speak portfolio-wide.
- **Use Cases panel:** the naming principles ("Class Planner" vs "SyncFlow") still apply. Update the framing: "Every product in the T&S portfolio names features by function, not metaphor."
- **Token naming note:** The CSS variable `--accent` is NOT renamed (per scope boundary). Only the public-facing label in this panel changes.

**Patterns to follow:**
- Existing panel item types (`text`, `divider`, `color-swatch`, `asset-list`, `guideline`)
- Existing tone

**Test scenarios:**
- Test expectation: none — content reframing, no behavioral change

**Verification:**
- All 5 folder panels open and render the reframed copy
- `npm run build` clean
- Swatch click-to-copy still copies `#0064FF` (behavior unchanged; only label changed)
- Grep `panel-contents.ts` for "TW Accent" returns zero hits

---

- U4. **Reframe home page + canvas page metadata**

**Goal:** Update the manifesto card on `/`, the canvas page header ("Brand Workspace" → "Brand Operating System" or similar), the page-level metadata, and the badge that says "Brand Guidelines."

**Requirements:** R1, R4

**Dependencies:** None (parallel with U2, U3)

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/app/layout.tsx`
- Modify: `src/components/canvas/CanvasLayout.tsx` if it carries the "Brand Workspace" header (otherwise this is in canvas-items)
- Modify: `src/data/canvas-items.ts` if the canvas header lives there

**Approach:**
- **Homepage manifesto card:**
  - Title stays "Teacher Workspace" → change to "Teacher & School" (and add the optional descriptor "Brand Operating System" below or in the badge).
  - The "Brand Guidelines" badge → "Brand Operating System" or "Brand OS." Pick whichever fits the visual without wrapping.
  - The heading "Utility-first at its core / Human-first at the surface" persists verbatim — the principle scales.
  - Body paragraphs reframe similar to U2's manifesto modal: the "what if the tool got out of the way" / "Teacher Workspace is utility-first" pivot updates to portfolio voice.
  - CTA "Open Brand Workspace" → "Open Brand OS" or "Open Brand Workspace" (the word Workspace here is generic enough to keep).
- **Layout metadata:**
  - `title`: "Teacher Workspace — Brand Guidelines" → "Teacher & School — Brand Operating System" (or similar). This is what shows in the browser tab and search results.
  - `description`: rewrite to describe the portfolio brand OS for product builders. Keep "Kind Utility at the intersection of high utility and high warmth" if it still fits.
- **Canvas page:** any header text ("Brand Workspace") rewrites to "T&S Brand OS" or similar. If the canvas has no visible header (only items), no change needed here.

**Patterns to follow:**
- Existing copy tone — confident, warm, not corporate
- Existing typography hierarchy (no changes to font sizes or weights)

**Test scenarios:**
- Happy path: `/` renders with the new manifesto copy and new metadata; browser tab shows the new title
- Happy path: `/canvas` renders with any updated header text; behavior unchanged
- Edge case: badge text width doesn't break the layout if "Brand Operating System" is wider than "Brand Guidelines" — verify visually and pick a shorter label if needed

**Verification:**
- `view-source:` on `/` shows the new `<title>` and `<meta name="description">`
- Manifesto card opening line on `/` reads at the portfolio level, not the single-product level
- `npm run build` clean

---

- U5. **Reframe canvas items + sticker captions**

**Goal:** Update any user-visible labels inside `src/data/canvas-items.ts` and `src/data/stickers.ts` that say "TW" or "Teacher Workspace" when they really mean the portfolio.

**Requirements:** R1

**Dependencies:** None (parallel with U2, U3, U4)

**Files:**
- Modify: `src/data/canvas-items.ts`
- Modify: `src/data/stickers.ts`

**Approach:**
- **`canvas-items.ts`:** audit each item's label/caption/heading. If a TextCard or ManifestoCard on the canvas says "Teacher Workspace…" but really means the portfolio philosophy, rewrite. The ManifestoCard on the canvas (which mirrors the home manifesto card) should match the U4 rewrite.
- **`stickers.ts`:** stickers have a `label` field (e.g., "Discovery", "Collaboration", "Focus"). These are generic — likely no edits needed. The `imageSrc` paths reference illustration PNGs; the file names don't need to change.
- Audit and minimal-touch — don't reframe things that already speak at the portfolio level. The goal is to remove single-product framing, not to rewrite everything.

**Patterns to follow:**
- Existing data shapes — `CanvasItem` discriminated union in `src/types/canvas.ts`
- Existing `StickerData` shape in `src/data/stickers.ts`

**Test scenarios:**
- Happy path: `/canvas` renders with all canvas items at their existing positions, with reframed labels
- Edge case: minimap reflects the canvas correctly (positions and sizes unchanged, only labels)

**Verification:**
- `npm run build` clean
- Visual walk on `/canvas` confirms no obvious single-product framing remains visible without opening a folder
- Grep `canvas-items.ts` + `stickers.ts` for "Teacher Workspace" returns hits only where the flagship is being named *as a product*, not as the brand

---

### Phase 3 — New surfaces

- U6. **Add Products surface on canvas (new folder + panel + Products data)**

**Goal:** A new canvas folder titled "Products" that opens to a panel listing the T&S product lineup — TW (visually distinct as flagship), then CaseSync, ReleifCher, Glow, COVAA. Each product shows name, short description, status (shipping / in-dev / concept), and the role (flagship vs supporting).

**Requirements:** R2

**Dependencies:** U1 (consumes `products` from `src/data/portfolio.ts`)

**Files:**
- Modify: `src/data/canvas-items.ts` — add a new folder item at a free position on the canvas grid
- Modify: `src/data/panel-contents.ts` — add a new panel keyed by `"products"` (or extend the panel item types if needed to render product cards inline; lean toward extending only if necessary)
- Modify: `src/types/panel.ts` if a new item type (e.g., `product-list`) is needed for the panel to render the product lineup

**Approach:**
- **Canvas folder:** use the existing `FolderIcon` shape (no new component). Label "Products." Position at a sensible spot on the existing canvas grid (next to or below an existing folder; pick whichever doesn't crowd).
- **Panel content:** the panel opens to show a brief intro ("These are the products in the T&S portfolio today") followed by the product list. Each product is rendered as a small row or card with: product name (larger), one-line description (smaller text-secondary), and a small status pill ("Shipping" / "In development" / "Concept").
- **TW as flagship treatment:** TW appears at the top of the list with slightly more visual emphasis — e.g., a tinted accent background, the word "Flagship" as a pill, or a larger row. Try the most subtle option first; escalate only if the hierarchy doesn't read.
- **No outbound links** in this unit. Products may have their own URLs eventually, but adding those is deferred. Each product entry is read-only descriptive.
- **Pull from `src/data/portfolio.ts`** via the panel's render code. Don't duplicate the product list into the panel content.

**Patterns to follow:**
- `src/data/panel-contents.ts` for the panel-key registration
- `src/components/panel/PanelBody.tsx` for the renderer pattern — extend the switch statement only if a new item type is genuinely needed
- `src/components/items/BrandCard.tsx`'s "featured" variant as a reference for how to mark TW as the flagship

**Test scenarios:**
- Happy path: clicking the new "Products" folder on the canvas opens a panel that lists all 5 products (TW + 4 supporting) in the expected order, with TW visually distinguished as flagship
- Happy path: closing the panel and reopening still shows the same list (data sourced from `portfolio.ts`, not hardcoded)
- Happy path: each product row shows its description and status badge
- Edge case: panel renders correctly when a product's status is anything other than "shipping" (e.g., one product is "in-development")
- Edge case: if the `products` array gains a 6th entry (simulated by adding one to `portfolio.ts`), the panel reflects it without code changes

**Verification:**
- `npm run build` clean
- `/canvas` shows the new Products folder; clicking it opens the panel; the panel shows the lineup
- The product list visually distinguishes TW from supporting products
- No new components introduced (or, if one was, it's a justified addition and documented in the commit message)

---

- U7. **Add Tools & Resources surface on canvas (new folder + panel + Tools data)**

**Goal:** A new canvas folder titled "Tools" (or "Tools & Resources") that opens to a panel listing tangible on-brand tools — at minimum the icon-generator repo — as outbound links. This is the "operating system" half of the framing: not docs about brand, but actual tools you can pick up and use.

**Requirements:** R3

**Dependencies:** U1 (consumes `tools` from `src/data/portfolio.ts`)

**Files:**
- Modify: `src/data/canvas-items.ts` — add a new folder item
- Modify: `src/data/panel-contents.ts` — add a new panel keyed by `"tools"`
- Modify: `src/types/panel.ts` if a new `tool-list` item type is needed

**Approach:**
- **Canvas folder:** existing `FolderIcon` shape. Label "Tools" or "Tools & Resources." Pick a position adjacent to Products.
- **Panel content:** intro ("Tangible tools, repos, and resources that produce on-brand artifacts. Pick them up; use them; contribute back."), then a list of tool entries from `src/data/portfolio.ts`.
- **Each tool entry:** name, short description, and an outbound link button — `<Button render={<a href={tool.href} target="_blank" rel="noopener noreferrer" />}>Open tool <ExternalLink /></Button>` or a clickable card row.
- **External link affordance:** use lucide-react's `ExternalLink` icon (add to `src/components/icons/index.ts` re-exports if not already there).
- **Categories:** if `ToolEntry.category` is set (e.g., "icons", "color", "typography"), group tools by category for scannability. If only one category exists today, render flat — don't over-engineer.
- **Empty-state copy:** if `tools` ever contains only one entry, the panel still reads well. Don't gate on having ≥ N tools.

**Patterns to follow:**
- `src/components/items/UtilityCard.tsx` as a reference shape for "icon + title + description" tool entries (if the panel uses card-like rows)
- The Imagery panel's `asset-list` item type — it already renders outbound-link-ish entries with thumbnails and external links. Mirror that pattern if cleanly applicable

**Test scenarios:**
- Happy path: clicking the Tools folder opens the panel; the icon-generator entry is listed with name, description, and outbound link
- Happy path: clicking the outbound link opens the icon-generator repo in a new tab
- Edge case: the outbound link has `rel="noopener noreferrer"` set; verify in DOM inspector
- Edge case: keyboard user can tab to the link, focus ring visible, Enter activates it
- Integration: tools panel and products panel coexist on the canvas without overlapping or conflicting with existing folders

**Verification:**
- `npm run build` clean
- `/canvas` shows the new Tools folder; clicking opens the panel; clicking icon-generator opens the repo in a new tab
- Adding a second tool entry to `portfolio.ts` shows up in the panel without code changes
- A11y: external links have proper `rel` attributes and visible focus rings

---

### Phase 4 — Docs

- U8. **Update README + final consistency sweep**

**Goal:** Update the project README to reflect the new T&S portfolio brand OS framing. Final grep + visual sweep to catch any single-product framing that slipped through.

**Requirements:** R1, R4

**Dependencies:** U1–U7

**Files:**
- Modify: `README.md`
- Optionally modify any file where a final grep surfaces residual TW-only framing

**Approach:**
- README opening line currently reads "Brand guidelines and design system showcase for Teacher Workspace by TransformX." → rewrite to "Brand operating system for the Teacher & School portfolio. Documents the brand and links to on-brand tooling. Teacher Workspace is the flagship product."
- Add a "What this is" section: "This is the T&S portfolio's brand OS — governance for product builders, plus links to working tools."
- Add a "Products in T&S today" section listing the lineup (mirror `src/data/portfolio.ts`).
- Add a "Tools & resources" section listing the linked tools.
- Keep the existing tech stack + bespoke-components sections — they're correct.
- Final consistency sweep: `grep -ri "Teacher Workspace by TransformX" src/ docs/` — fix any stragglers. `grep -ri "TW Accent" src/` — verify only the underlying token uses survive (renamed in public labels).
- Note in the README: this site documents T&S only. Other domains (Student, Parent, Corporate) will have their own brand OSes — explicit non-claim.

**Patterns to follow:**
- README structure from the previous refactor PR — keeps "Tech stack", "Component architecture", "Design tokens", "Skill routing" sections

**Test scenarios:**
- Test expectation: none — docs + final sweep

**Verification:**
- README opening reads at the T&S portfolio level
- `grep -ri "Teacher Workspace by TransformX"` returns zero hits outside the README's history section (if any)
- A final visual walk on `/` and `/canvas` confirms no single-product framing remains visible

---

## System-Wide Impact

- **Interaction graph:** No callbacks, middleware, or backend behavior changes. Two new canvas folders introduce two new click→panel-open paths; both reuse the existing FolderIcon → FolderModal flow.
- **Error propagation:** None — pure content + new data files. External links may fail (404 if a tool URL is wrong); the failure surface is the user's browser, not the site.
- **State lifecycle risks:** None — site is static.
- **API surface parity:** No external API. Data module exports (`products`, `tools` from `src/data/portfolio.ts`) become the de facto API for content editors — keep the shape stable.
- **Integration coverage:** The canvas + folder + panel chain (existing) is exercised by the new Products and Tools surfaces in the natural way. No new integration test infrastructure.
- **Unchanged invariants:** The canvas pan/zoom, sticker physics, stamp cursor, GlowCard, minimap, ZoomControls, ErrorBoundary — all untouched. The 4 modal overlays (Folder, Card, Illustration, Quote) — untouched. The shadcn Button/Card/Dialog primitives — untouched. The `--accent` CSS variable — unchanged (only its public label evolves). The `tw-brand-website` repo name — unchanged.

---

## Risks & Dependencies

| Risk | Mitigation |
|------|------------|
| Reframing copy drifts from the user's product intent in subtle ways — a phrase that "sounds T&S enough" actually changes meaning | Plan-level: U2/U3/U4 each include explicit critical-don't notes (no DXD ownership, no MOE alignment). Execution-level: keep individual copy edits in small atomic commits per unit so any drift can be spotted and rolled back. |
| The new Products surface visually competes with existing folders (Colours, Imagery, etc.) and crowds the canvas | Place the new folders at the bottom or to the side of the existing grid, not interleaved. Use the existing `FolderIcon` shape so the visual weight matches. |
| The "flagship" treatment for TW on the Products surface either looks too loud (overshadows the rest) or too subtle (no signal of hierarchy) | U6 explicitly defers the treatment choice to implementation and instructs to try the most subtle option first. Visual judgment, not a planning decision. |
| Tool URLs go stale over time as repos move or get archived | Out of scope for this plan; add a follow-on "link health" check later if it becomes a real problem. For now, treat outbound URLs as the user's responsibility. |
| The user supplies more products later and `src/data/portfolio.ts` becomes the bottleneck for content edits | The data module is intentionally small and edit-friendly. If the list grows beyond ~10–15 entries or if editing becomes friction, a CMS-shaped follow-on plan handles it. |
| The label "T&S Blue" doesn't read well in the swatch panel | U3 explicitly leaves the exact label to implementation. Try "Teacher & School Blue" first; fall back to "T&S Blue" or "Portfolio Blue" if the longer version wraps. |

---

## Documentation / Operational Notes

- No infrastructure changes (no env vars, no new env-bound config, no deploy hooks).
- README rewrite at U8 reflects the new framing publicly.
- The `tw-brand-website` repo name stays. If the user later decides to rename it, that's a separate one-time migration touching GitHub settings + any deploy URLs.
- The branch `refactor/code-review-cleanup` already has 26 commits from prior work. This plan adds ~8 more commits. Recommend shipping the branch as a single PR rather than splitting — the staged commit history is the audit trail.
- No deployment changes — Vercel picks up the next push and renders the new copy.

---

## Sources & References

- **Branch base:** `refactor/code-review-cleanup` (currently 26 commits on top of `main` at `3faabef`)
- **Prior plan:** `docs/plans/2026-06-02-001-refactor-shadcn-base-ui-migration-plan.md` — established the shadcn/Base UI primitives this plan reuses
- **First tangible tool to link:** https://github.com/wondopamine/icon-generator
- **Repo:** `tw-brand-website` at root of working tree
