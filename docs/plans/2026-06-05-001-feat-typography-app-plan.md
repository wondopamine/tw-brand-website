---
title: "feat: Typography app for the Brand OS dock (Geist-style font showcase)"
type: feat
status: completed
date: 2026-06-05
---

# feat: Typography app for the Brand OS dock

> On approval this plan is saved to `docs/plans/2026-06-05-001-feat-typography-app-plan.md` and executed via `/ce-work`.

## Overview

Replace the Typography **folder** (panel) and the standalone **Typography Playground** with one "Typography" dock app modeled on vercel.com/font (Geist), scoped to the **core set**: editable "try it" preview, weights-at-a-glance rows, live type-scale specimens, and the folder's absorbed content (rationale, guidelines, resources). No glyph inspector / character grid.

---

## Problem Frame

The Typography folder presents the type system as prose (the type scale is literally a `\n`-joined string), and the playground — while now interactive — is disconnected from it and only shows Plus Jakarta Sans with fixed text. vercel.com/font shows the pattern to follow: see every weight at a glance, type your own text, and read the rationale in one place. The user wants Typography to be a first-class dock app that absorbs the folder.

---

## Requirements Trace

- R1. Typography is an app on the dock (desktop) and an app icon on mobile; the Typography folder disappears.
- R2. Users can try fonts with **editable text** (click-to-type), switching font (Plus Jakarta Sans ↔ Inter), weight, size, alignment, colour.
- R3. Users see the font list "at a glance": per-font weight rows rendered live (Geist weight-list style); clicking a row loads it into the preview.
- R4. The type scale renders as live specimens (Display 120 → Label 11) in the correct face/weight.
- R5. All existing Typography folder content (why-we-picked-this for both fonts, usage Do/Don't, Google Fonts links) lives inside the app.
- R6. No regressions: other windows, dock, mobile grid keep working; lint + build pass.

---

## Scope Boundaries

- No glyph inspector or full character-set grid (explicitly excluded — "Full Geist-style" was offered and declined).
- No letter-spacing slider, no theme toggle, no font downloads.
- No italic toggle: neither font is loaded with an italic axis (`src/app/layout.tsx`), and the core set doesn't require it. Dropping it avoids faux-italic rendering.
- No new fonts; only the two brand fonts.

---

## Context & Research

### Reference (user-named): vercel.com/font
Geist site structure adapted here: weight selector + editable preview area ("What will you ship next?"), weight list, specimen displays, install/resources section. Our equivalent: hero playground (editable) → weights at a glance → type scale specimens → rationale/guidelines/resources.

### Relevant code and verified facts
- `src/components/items/HeroText.tsx` — interactive playground. **`stack` mode is dead code** (only consumer is Desktop's playground branch, non-stack; verified by grep). Extract its `ColourPicker`, `SnapSlider`, align control, `COLOUR_PALETTE`; then delete the file.
- `src/app/layout.tsx` — Plus Jakarta Sans loaded at weights `["300","400","500","600","700","800"]` (no 200, **no 900** — current "Black 900" option is faux-bold). Inter loaded as variable (100–900). Geist is also loaded (`--font-sans`) but is not a brand font — ignore.
- `src/components/desktop/Desktop.tsx` / `MobileDesktop.tsx` — `ActiveWindow` union (`doc`/`folder`), `renderWindowContent(active, onOpen)` with string-sniffed `contentId === "playground"` special case to remove.
- `src/components/desktop/Window.tsx` — 960px Base UI dialog; content area `overflow-y-auto flex-1 px-6 py-5`.
- `src/components/desktop/Dock.tsx` — "Aa" tile (`onOpenPlayground`) to rename/rewire; `DockTile` pattern.
- `src/components/desktop/icons/AppIcon.tsx` — currently external-`<a>` only; needs a button path for in-OS apps.
- `src/data/panel-contents.ts` `typography` entry — prose to port verbatim; entry + `launcher` item then removed.
- `src/types/panel.ts` `PanelLauncherItem` + `PanelBody.tsx` `"launcher"` case — now-unused plumbing to remove (only typography used it).
- **Base UI gotcha** (this session): swapping a dialog's children in place dismisses the dialog. The new app always opens fresh (dock/grid → window), so the folder-launcher relay hazard disappears with the launcher itself.
- No test infrastructure (`package.json` has no test script) — verification is lint + build + browser.

---

## Key Technical Decisions

- **New `kind: "app"` arm in `ActiveWindow`** (`{ kind: "app"; appId: string; title: string }`): removes `contentId === "playground"` string-sniffing from both desktop renderers.
- **New `src/data/typography.ts`** (fonts, weights, type scale, guidelines, resources as typed data) replacing the panel entry: the type scale must be structured to render as specimens. Prose ported verbatim.
- **Extract controls, then delete `HeroText.tsx`**: move (not copy) `ColourPicker`, `SnapSlider`→`SizeControl`, align control→`AlignToggle`, palette constant into `src/components/typography/controls/`; avoids ~400-line duplication and removes dead `stack` mode.
- **`contentEditable` (uncontrolled) for the try-it preview**: native caret, direct styling of the visible text, correct mobile keyboard — matches vercel.com/font. Set initial text once; never write innerHTML from state (caret reset risk); controls mutate wrapper inline styles only.
- **Data-driven weights; fix the loaded set**: add `"200"` to Jakarta in `layout.tsx` (family supports 200–800), drop the fake 900. Weight UI reads from `fonts[].weights` so synthesized faces can never render.
- **Layout: fixed hero + scrolling doc**: hero playground section ~440px (`shrink-0`, full window width), below it `WeightList` / `TypeScaleSpecimens` / rationale in the `max-w-[720px]` centered measure, scrolling in the window's existing scroll area. Do not reuse the `h-[62vh]` HeroText hack.

---

## Open Questions

### Resolved During Planning
- Feature depth: **core set** (user choice — no glyph grid/letter-spacing).
- Folder fate: **removed**; dock app on desktop, app icon on mobile (user choice).
- Italic toggle: dropped (no italic axis loaded; not in core set).
- Jakarta 900: dropped (doesn't exist in the family); 200 added instead.

### Deferred to Implementation
- Exact hero height / responsive clamps for specimen sizes on mobile — tune visually in the browser.
- Default preview copy (e.g. "Type something teachers would read…" placeholder semantics) — pick during build.
- Whether `WeightSelect` is a dropdown or segmented buttons at 960px — decide by what fits the control bar.

---

## Output Structure

    src/components/typography/
      TypographyApp.tsx        # orchestrator: hero playground + scrolling sections
      TryItPreview.tsx         # contentEditable preview + control bar
      WeightList.tsx           # weights at a glance, per font; click loads preview
      TypeScaleSpecimens.tsx   # live-rendered type scale rows
      TypographyRationale.tsx  # absorbed folder content (why / do-dont / resources)
      controls/
        FontSwitcher.tsx       # Jakarta <-> Inter segmented control
        WeightSelect.tsx       # weight selector driven by active font's weights
        SizeControl.tsx        # generalized from HeroText SnapSlider
        AlignToggle.tsx        # extracted align segmented control
        ColourPicker.tsx       # extracted verbatim from HeroText
    src/data/typography.ts     # fonts, weights, scale, guidelines, resources

---

## Implementation Units

- U1. **Font config + typography data module**

**Goal:** Real weight coverage and a typed content model for the app.
**Requirements:** R3, R4, R5
**Dependencies:** None
**Files:**
- Modify: `src/app/layout.tsx` (Jakarta weights → `["200","300","400","500","600","700","800"]`)
- Create: `src/data/typography.ts`
**Approach:** `FontDef` (id, name, role, cssVar, weights[{label,value}], rationale, resource) for both fonts; `TypeScaleEntry[]` (label, fontId, size, weight, uppercase?, tracking?, sample); guidelines do/dont pair. Port prose verbatim from `panel-contents.ts` `typography` entry. Inter weights listed: 400/500/600 (the system's stated set) plus display range as needed for the weight list — keep to weights the brand actually sanctions.
**Test scenarios:** Test expectation: none — config + data only; `npm run build` must pass.
**Verification:** Build passes; no UI change yet.

- U2. **Extract shared controls from HeroText**

**Goal:** Reusable control components without duplicating HeroText internals.
**Requirements:** R2
**Dependencies:** None (parallel with U1)
**Files:**
- Create: `src/components/typography/controls/ColourPicker.tsx` (move verbatim), `SizeControl.tsx` (SnapSlider generalized to arbitrary stops), `AlignToggle.tsx`, `FontSwitcher.tsx` (new, small), `WeightSelect.tsx` (new, small; options from props)
**Approach:** Move, don't copy; keep CSS-variable token styling (`--card-bg`, `--accent`, etc.). HeroText itself is deleted in U3 (sequenced so the repo never has a dangling import).
**Patterns to follow:** Existing HeroText control styling; segmented-control pattern from its align/italic buttons.
**Test scenarios:** Test expectation: none — extraction; verified via U3 browser pass.
**Verification:** Components compile; no consumer yet (lint tolerates unused exports? — wire in U3 within the same PR; build at U3).

- U3. **Build the Typography app**

**Goal:** The Geist-style app window content.
**Requirements:** R2, R3, R4, R5
**Dependencies:** U1, U2
**Files:**
- Create: `src/components/typography/TypographyApp.tsx`, `TryItPreview.tsx`, `WeightList.tsx`, `TypeScaleSpecimens.tsx`, `TypographyRationale.tsx`
- Delete: `src/components/items/HeroText.tsx`
**Approach:**
- `TryItPreview`: uncontrolled `contentEditable` div (initial text rendered once; `suppressContentEditableWarning`; CSS `:empty::before` placeholder; paste handler inserting plain text only; `spellCheck=false`, `role="textbox"`, aria label). Control bar: FontSwitcher, WeightSelect, SizeControl, AlignToggle, ColourPicker, Reset. Controls style the wrapper, never rewrite text. Keep the dashed guide-line box treatment for continuity.
- `WeightList`: per font, one row per weight — weight name + sample line rendered in that face/weight; row click sets preview font+weight (and scrolls to top of hero if needed).
- `TypeScaleSpecimens`: one row per scale entry rendered at true size (clamp very large sizes on narrow viewports), with label + px/weight metadata column.
- `TypographyRationale`: two font cards (rationale + Google Fonts link), then Do/Don't grid (mirror `PanelBody` guideline styling).
- `TypographyApp`: hero `shrink-0` ~440px full-width; sections below in `mx-auto w-full max-w-[720px]`.
**Patterns to follow:** `DocContent`/`PanelBody` section styling; window scroll behavior from `Window.tsx`.
**Test scenarios (browser, no test infra):**
- Happy path: typing replaces sample text; caret never jumps while typing. Covers R2.
- Happy path: switching font/weight/size/align/colour restyles the typed text without erasing it. Covers R2.
- Happy path: clicking a weight row loads that font+weight into the preview. Covers R3.
- Edge case: select-all + delete shows placeholder; typing again works.
- Edge case: pasting rich HTML inserts plain text in the active style.
- Happy path: scale rows visibly render Display in Jakarta and Body in Inter at correct sizes. Covers R4.
**Verification:** Build passes with HeroText deleted; all sections render in a 960px window.

- U4. **Window/type wiring: `kind: "app"`**

**Goal:** First-class app windows; kill the `playground` special case.
**Requirements:** R1, R6
**Dependencies:** U3
**Files:**
- Modify: `src/components/desktop/Desktop.tsx` (ActiveWindow union + `app` branch in `renderWindowContent`; remove playground branch + HeroText import), `src/components/desktop/MobileDesktop.tsx` (same; remove "best on desktop" fallback), `src/types/desktop.ts` (doc-comment cleanup; in-OS app item — see U5)
**Approach:** `{ kind: "app"; appId: "typography"; title: string }` → renders `<TypographyApp />`. Unknown appId → existing "missing content" fallback pattern.
**Test scenarios:** Browser: opening app window renders; doc/folder windows unchanged. Covers R6.
**Verification:** TS strict compiles; no `"playground"` references remain (`grep`).

- U5. **Dock, mobile grid, desktop-items**

**Goal:** Entry points per R1.
**Requirements:** R1
**Dependencies:** U4
**Files:**
- Modify: `src/components/desktop/Dock.tsx` (rename tile "Typography Playground"→"Typography"; `onOpenPlayground`→`onOpenTypography`; keep "Aa" art), `src/data/desktop-items.ts` (remove `folder-typography`; add in-OS app item `app-typography` with `appId`, mobileOrder at the old folder's slot), `src/types/desktop.ts` (app item variant: keep `href` for external apps, add `appId` alternative), `src/components/desktop/icons/AppIcon.tsx` (button path for in-OS apps, no external badge), `src/components/desktop/Desktop.tsx` + `MobileDesktop.tsx` (update `app` filters/type guards; desktop grid must NOT show the typography app — dock only, like Colours)
**Approach:** Mirror the Colours precedent: dock-only on desktop, grid icon on mobile.
**Test scenarios:** Browser: dock tooltip says "Typography"; tile opens the app. Mobile 390px: app icon present (no folder), opens the full app; editable preview works with on-screen keyboard. Covers R1.
**Verification:** Desktop grid shows 5 docs + 2 folders (Illustrations, Use Cases); Icon Generator external link still works.

- U6. **Remove dead surfaces**

**Goal:** No orphaned content or unused plumbing.
**Requirements:** R5, R6
**Dependencies:** U5
**Files:**
- Modify: `src/data/panel-contents.ts` (delete `typography` entry incl. launcher item), `src/types/panel.ts` (delete `PanelLauncherItem` + union member), `src/components/panel/PanelBody.tsx` (delete `"launcher"` case + `onLaunch` prop), `src/components/desktop/Desktop.tsx` + `MobileDesktop.tsx` (drop `onLaunch` threading + close-then-reopen workaround)
**Approach:** Grep-verified: only typography used the launcher. Removing it also removes the Base UI close-then-reopen workaround.
**Test scenarios:** Test expectation: none — deletion; build + grep prove it.
**Verification:** `grep -r "launcher\|onLaunch\|playground"` over `src/` returns nothing live; lint + build pass.

---

## System-Wide Impact

- **Interaction graph:** Dock prop rename touches Desktop↔Dock contract; `ActiveWindow` union change touches both renderers — TS strict surfaces all sites.
- **API surface parity:** Desktop and Mobile `renderWindowContent` must both gain the `app` branch (parity guard: same fallback text pattern).
- **State lifecycle:** App always opens from closed state → Base UI children-swap bug not in play; removing the launcher removes the workaround.
- **Unchanged invariants:** Window chrome (traffic lights, 960px, maximize), all other docs/folders, Colour Picker dock flow, sticky notes/widgets, landing page (`/`) untouched.

---

## Risks & Dependencies

| Risk | Mitigation |
|------|------------|
| contentEditable caret reset on re-render | Fully uncontrolled: initial text once, controls style the wrapper only; manual typing check in verification |
| `AppDesktopItem` discriminator ripple (filters/type guards in both renderers) | Update guards in same unit (U5); TS strict catches misses |
| Jakarta 200 adds font payload / FOUT | next/font self-hosts + preloads; visual check |
| 440px hero + mobile keyboard cramped | Hero height clamps on small viewports; window already scrolls |
| No automated tests | Browser verification matrix below; lint + build as gates |

---

## Verification (end-to-end)

1. `npm run lint` && `npm run build` — clean (pre-existing img warnings allowed).
2. Production serve → `/canvas` at 1440×900 (use a dedicated agent-browser session, scroll dialogs before clicking):
   - Dock: Colour Picker, **Typography** ("Aa"), Icon Generator. Typography opens the app.
   - In-app: type custom text; switch Inter↔Jakarta; change weight/size/align/colour; click weight rows; confirm scale specimens + rationale + Do/Don't + Google Fonts links.
   - Desktop grid: 5 docs + Illustrations + Use Cases only.
3. Mobile 390×844: app icon (not folder) opens app; preview editable; sections readable.
4. `grep` proves no `playground` / `launcher` remnants.
