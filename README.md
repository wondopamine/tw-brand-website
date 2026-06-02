# tw-brand-website

Brand guidelines and design system showcase for Teacher Workspace by TransformX.

## Tech stack

- Next.js 16 (App Router) + React 19 + TypeScript (strict)
- Tailwind CSS v4 + PostCSS
- **shadcn/ui (Base UI primitives)** — Button, Card, Dialog generated via `npx shadcn add`, restyled to TW brand tokens
- **Base UI** (`@base-ui-components/react`) — provides the accessible primitives behind shadcn's components (focus traps, scroll lock, portal, dialog lifecycle)
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
| **shadcn/ui (Base UI)** | Library primitives generated via `npx shadcn add`. Restyled to TW brand tokens. | `Button`, `Card`, `Dialog` — in `src/components/ui/` |
| **TW icons** | lucide-react for generic icons, hand-rolled SVGs for brand marks. | `src/components/icons/index.ts` re-exports lucide + `FolderMark`, `IllustrationStack` |
| **Bespoke** | Components that have no library analogue and would lose visual identity in migration. | Canvas pan/zoom, stickers, stamp cursor, minimap, `GlowCard`, `EdgeVignette`, typography playground |

### What's deliberately bespoke (and why)

- **Canvas system** (`src/components/canvas/CanvasViewport`, `CanvasLayout`, `useCanvasPan` hook) — 2D pannable workspace with zoom. No shadcn analogue.
- **`GlowCard`** (`src/components/items/GlowCard.tsx`) — cursor-tracking blob border, a deliberate signature effect. Replacing with shadcn Card would lose the effect.
- **`CanvasStamp`** — interactive ink-stamp cursor; brand-specific delight detail.
- **`CanvasSticker`, `Minimap`, `EdgeVignette`** — brand-specific canvas chrome.
- **`FolderMark`** (in `src/components/icons/FolderMark.tsx`) — two-tone TW blue folder shape using `--folder-icon-bg` / `--folder-icon-front` tokens.
- **`IllustrationStack`** (in `src/components/icons/IllustrationStack.tsx`) — three angled accent cards as the illustration-reel entry preview.
- **`HeroText`** typography playground — color picker, weight selector, alignment triggers, range slider; all bespoke chrome with no library equivalent.
- **`PanelBody`** content-block renderers (color-swatch, asset-list, guideline, divider) — variant-conditional logic where shadcn primitives don't fit.
- **`QuoteCard` preview** — deliberately card-less raw editorial typography. Wrapping in `<Card>` would destroy the editorial moment.

### Design tokens

CSS custom properties in `src/app/globals.css` are the single source of truth:

- **TW Accent (#0064FF)** is the primary brand color — exposed to Tailwind as `bg-accent`, `text-accent`, `border-accent`
- shadcn's semantic tokens (`--primary`, `--background`, `--card`, etc.) are mapped to TW brand tokens at init, so shadcn-generated components inherit brand colors out of the box
- Type tokens: `--font-display` (Plus Jakarta Sans) / `--font-body` (Inter) — exposed as `font-display`, `font-body`
- Brand-specific tokens (`--folder-icon-bg`, `--folder-icon-front`, `--quote-highlight`, etc.) are used directly via inline `style={{ }}` where needed

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
