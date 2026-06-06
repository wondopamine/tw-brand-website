"use client";

import Link from "next/link";
import { desktopItems } from "@/data/desktop-items";
import { modalContents } from "@/data/modal-contents";
import { panelContents } from "@/data/panel-contents";
import type { DesktopItem } from "@/types/desktop";
import type { ActiveWindow } from "./Desktop";
import FolderIcon from "./icons/FolderIcon";
import DocIcon from "./icons/DocIcon";
import AppIcon from "./icons/AppIcon";
import StickyStack from "./widgets/StickyStack";
import IllustrationWidget from "./widgets/IllustrationWidget";
import { Window } from "./Window";
import DocContent from "./DocContent";
import PanelBody from "@/components/panel/PanelBody";
import TypographyApp from "@/components/typography/TypographyApp";

interface MobileDesktopProps {
  activeWindow: ActiveWindow;
  onOpen: (window: ActiveWindow) => void;
  onClose: () => void;
}

/**
 * iOS-home-screen-style mobile layout. 3-column icon grid at top
 * (folders + apps + docs intermixed by mobileOrder), sticky widgets
 * stacked vertically below, illustration widget at the bottom.
 *
 * Windows open in full-screen-ish dialogs on mobile via the shared
 * Window primitive (max-w-[960px] caps width on slightly wider tablets).
 */
export default function MobileDesktop({
  activeWindow,
  onOpen,
  onClose,
}: MobileDesktopProps) {
  const sorted = [...desktopItems].sort(
    (a, b) => a.mobileOrder - b.mobileOrder
  );

  const icons = sorted.filter(
    (i): i is Extract<DesktopItem, { type: "folder" | "doc" | "app" }> =>
      i.type === "folder" || i.type === "doc" || i.type === "app"
  );
  const stickies = sorted.filter(
    (i): i is Extract<DesktopItem, { type: "sticky" }> => i.type === "sticky"
  );
  const widgets = sorted.filter(
    (i): i is Extract<DesktopItem, { type: "illustration-widget" }> =>
      i.type === "illustration-widget"
  );

  return (
    <>
      <div className="canvas-grid min-h-screen px-4 py-6 space-y-8">
        {/* Header */}
        <header className="text-center pt-2">
          <Link
            href="/"
            aria-label="Back to the Teacher & School landing page"
            className="inline-block rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
          >
            <h1 className="font-display text-xl font-bold text-text-primary">
              Teacher &amp; School
            </h1>
            <p className="text-xs text-text-secondary mt-1">
              Brand Operating System
            </p>
          </Link>
        </header>

        {/* Icon grid — 3 cols */}
        <section
          className="grid grid-cols-3 gap-y-6 gap-x-2"
          aria-label="Apps and documents"
        >
          {icons.map((item) => (
            <div key={item.id} className="flex justify-center">
              {item.type === "folder" && (
                <FolderIcon
                  label={item.label}
                  onClick={() =>
                    onOpen({
                      kind: "folder",
                      panelId: item.panelId,
                      title: item.label,
                    })
                  }
                />
              )}
              {item.type === "doc" && (
                <DocIcon
                  label={item.label}
                  onClick={() =>
                    onOpen({
                      kind: "doc",
                      contentId: item.contentId,
                      title: item.label,
                    })
                  }
                />
              )}
              {item.type === "app" &&
                (item.href !== undefined ? (
                  <AppIcon label={item.label} href={item.href} />
                ) : (
                  <AppIcon
                    label={item.label}
                    icon={<AaGlyph />}
                    onClick={() =>
                      onOpen({
                        kind: "app",
                        appId: item.appId,
                        title: item.label,
                      })
                    }
                  />
                ))}
            </div>
          ))}
        </section>

        {/* Sticky widgets — stacked deck, tap to shuffle */}
        {stickies.length > 0 && (
          <section className="flex flex-col items-center">
            <StickyStack notes={stickies} />
          </section>
        )}

        {/* Illustration widget */}
        {widgets.length > 0 && (
          <section className="flex flex-col items-center pb-6">
            {widgets.map((w) => (
              <IllustrationWidget key={w.id} slides={w.slides} />
            ))}
          </section>
        )}
      </div>

      {/* Window slot — same primitive as desktop */}
      {activeWindow && (
        <Window open={true} onClose={onClose} title={activeWindow.title}>
          {renderWindowContent(activeWindow, onOpen)}
        </Window>
      )}
    </>
  );
}

function renderWindowContent(
  active: NonNullable<ActiveWindow>,
  onOpen: (window: ActiveWindow) => void
) {
  if (active.kind === "app") {
    if (active.appId === "typography") {
      return <TypographyApp />;
    }
    return (
      <p className="text-sm text-text-secondary">
        Missing app content for &quot;{active.appId}&quot;.
      </p>
    );
  }

  if (active.kind === "doc") {
    const content = modalContents[active.contentId];
    if (!content) {
      return (
        <p className="text-sm text-text-secondary">
          Missing doc content for &quot;{active.contentId}&quot;.
        </p>
      );
    }
    return <DocContent content={content} />;
  }

  // folder
  const panel = panelContents[active.panelId];
  if (!panel) {
    return (
      <p className="text-sm text-text-secondary">
        Missing panel content for &quot;{active.panelId}&quot;.
      </p>
    );
  }
  return (
    <>
      {panel.description && (
        <p className="text-[14px] text-text-secondary leading-relaxed mb-5">
          {panel.description}
        </p>
      )}
      <PanelBody
        items={panel.items}
        // Close-then-reopen — see Desktop.tsx renderWindowContent.
        onLaunch={(windowId, title) => {
          onOpen(null);
          setTimeout(
            () => onOpen({ kind: "doc", contentId: windowId, title }),
            150
          );
        }}
      />
    </>
  );
}

/** "Aa" tile glyph for the Typography app icon (matches the dock tile). */
function AaGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="size-10 text-white" aria-hidden>
      <text
        x="12"
        y="17"
        textAnchor="middle"
        fontFamily="var(--font-display, 'Plus Jakarta Sans', sans-serif)"
        fontWeight="800"
        fontSize="13"
        fill="currentColor"
      >
        Aa
      </text>
    </svg>
  );
}
