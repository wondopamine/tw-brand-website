# tw-brand-website

**Brand operating system for the Teacher & School portfolio.** Governance + tools for product builders working on Teacher Workspace (the flagship) and the rest of the T&S portfolio. Not a static brand guideline — a living document that links to working artifacts.

> The repo name `tw-brand-website` is historical (from when this site was scoped to Teacher Workspace only). The site now represents the **Teacher & School** portfolio brand at large.

## What this is

- A 2-page site: a manifesto landing page and a **fixed-viewport OS-style desktop** of brand surfaces (icons, widgets, windows).
- Source of truth for the T&S portfolio's visual + verbal identity.
- A jumping-off point to **tangible on-brand tools** (icon generator, etc.) — that's the "operating system" part of the framing.
- Audience: product builders — primarily designers and PMs. Leadership and MOE stakeholders may visit; not the writing target.

## Portfolio context

The T&S portfolio is one of four sibling domains:

- **Teacher & School** ← this site documents
- Student
- Parent
- Corporate

Each domain has (or will have) its own brand operating system. This repo is T&S only.

Brand ownership belongs to **Teacher & School itself**. It is NOT DXD's brand (DXD has its own brand identity) and is independent of MOE today, even though products in the T&S portfolio (which includes Schools Division of MOE products) follow it.

## Products in T&S today

- **Teacher Workspace** — flagship super-app
- CaseSync
- ReleifCher
- Glow
- COVAA
- (more in the pipeline)

A Products surface on the canvas is reserved for future work — the format will be logo + name lockups, not a descriptive product directory.

## Tools & Resources

Surfaced on the canvas under the **TOOLS** folder. Source of truth: `src/data/portfolio.ts`. To add a tool, append a `ToolEntry` to that file.

- [Icon Generator](https://github.com/wondopamine/icon-generator) — generates on-brand iconography for T&S products.

## Tech stack

- Next.js 16 (App Router) + React 19 + TypeScript (strict)
- Tailwind CSS v4 + PostCSS
- **shadcn/ui (Base UI primitives)** — `Button`, `Card`, `Dialog` generated via `npx shadcn add`, restyled to T&S brand tokens
- **Base UI** (`@base-ui-components/react`) — accessible primitives behind shadcn's components (focus traps, scroll lock, portal, dialog lifecycle)
- **lucide-react** — generic icons (X, Chevrons, ZoomIn/Out, etc.)
- Motion (Framer Motion) — page entry animations, ImageCard cross-fade, FolderIcon hover/tap
- Deployed on Vercel

## Development

```bash
npm run dev    # Start dev server
npm run build  # Production build
npm run lint   # ESLint
```

## Component architecture

The repo follows a three-tier component model:

| Tier | What it is | Examples |
|------|-----------|----------|
| **shadcn/ui (Base UI)** | Library primitives generated via `npx shadcn add`. Restyled to T&S brand tokens. | `Button`, `Card`, `Dialog` — in `src/components/ui/` |
| **Desktop OS shell** | T&S-specific element vocabulary: 5 element types + Window primitive. | `Desktop`, `MobileDesktop`, `DesktopItem`, `Window`, icons (`FolderIcon`/`DocIcon`/`AppIcon`), widgets (`StickyWidget`/`IllustrationWidget`) — in `src/components/desktop/` |
| **T&S icons** | lucide-react for generic icons, hand-rolled SVGs for brand marks. | `src/components/icons/index.ts` re-exports lucide + `FolderMark`, `IllustrationStack` |
| **Bespoke** | Components that have no library analogue. | `HeroText` typography playground |

### The desktop interaction model

`/canvas` renders a fixed-viewport OS-style desktop (no pan, no zoom). Five element types:

- **Folder icon** — grouped resources (Colours, Illustrations, Typography, Use Cases). Click → opens panel in a window.
- **App icon** — external tool launcher (Icon Generator). Click → opens in new browser tab.
- **Doc icon** — one-pager content (Manifesto, Voice & Tone, Brand Principles, Product Design Principles, About this Brand OS, Why Aesthetics matters, Typography Playground). Click → opens in a window.
- **Sticky widget** — always-visible passive content (the 3 teacher quotes). No click.
- **Illustration widget** — inline swipeable illustration carousel. Browse without leaving the desktop.

All windows use a single `Window` primitive (shadcn Dialog + title bar + close X). Mobile (<1024px) renders an iOS-home-screen-style icon grid + stacked widgets below.

### What's deliberately bespoke (and why)

- **`HeroText`** typography playground (`src/components/items/HeroText.tsx`) — color picker, weight selector, alignment triggers, range slider; no shadcn equivalent for this kind of typography sandbox. Reachable as the "Typography Playground" doc icon on the desktop.
- **`FolderMark`** (`src/components/icons/FolderMark.tsx`) — two-tone Teacher & School Blue folder shape using `--folder-icon-bg` / `--folder-icon-front` tokens.
- **`IllustrationStack`** (`src/components/icons/IllustrationStack.tsx`) — three angled accent cards mark. Currently unused on the desktop (the previous canvas's illustration reel was replaced by the inline `IllustrationWidget`); kept as a brand asset.
- **`PanelBody`** content-block renderers (`src/components/panel/PanelBody.tsx`) — color-swatch, asset-list, tool-list, guideline, divider, text, image. Variant-conditional logic that shadcn primitives don't cover. Renders inside `Window` for folder content.
- **`DocContent`** (`src/components/desktop/DocContent.tsx`) — section renderer for doc content (heading, paragraph, list, quote, divider, highlight-box, two-column, quadrant). Renders inside `Window` for doc content.

### Design tokens

CSS custom properties in `src/app/globals.css` are the single source of truth:

- **Teacher & School Blue (`#0064FF`)** is the portfolio primary — anchored on Teacher Workspace as the flagship, carries across every other T&S product. Exposed to Tailwind as `bg-accent`, `text-accent`, `border-accent`. The CSS variable is named `--accent` (technical name preserved for code stability).
- shadcn's semantic tokens (`--primary`, `--background`, `--card`, etc.) are mapped to T&S brand tokens at init, so shadcn-generated components inherit brand colors out of the box.
- Type tokens: `--font-display` (Plus Jakarta Sans) / `--font-body` (Inter) — exposed as `font-display`, `font-body`.
- Brand-specific tokens (`--folder-icon-bg`, `--folder-icon-front`, `--quote-highlight`, etc.) are used directly via inline `style={{ }}` where needed.

## Plans on file

- `docs/plans/2026-06-02-001-refactor-shadcn-base-ui-migration-plan.md` — completed (shadcn/Base UI primitives shipped)
- `docs/plans/2026-06-03-001-feat-ts-portfolio-brand-os-plan.md` — completed (portfolio reframe; PR #9)
- `docs/plans/2026-06-03-002-refactor-os-desktop-interaction-model-plan.md` — completed (canvas → OS desktop refactor)

## Skill routing

When the user's request matches an available skill, ALWAYS invoke it using the Skill
tool as your FIRST action. Do NOT answer directly, do NOT use other tools first.
The skill has specialized workflows that produce better results than ad-hoc answers.

Key routing rules:
- Product ideas, "is this worth building", brainstorming → invoke office-hours
- Bugs, errors, "why is this broken", 500 errors → invoke investigate
- Ship, deploy, push, create PR → invoke ship
- QA, test the site, find bugs → invoke qa
- Code review, check my diff → invoke review
- Update docs after shipping → invoke document-release
- Weekly retro → invoke retro
- Design system, brand → invoke design-consultation
- Visual audit, design polish → invoke design-review
- Architecture review → invoke plan-eng-review
- Save progress, checkpoint, resume → invoke checkpoint
- Code quality, health check → invoke health
