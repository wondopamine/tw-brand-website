"use client";

import { desktopItems } from "@/data/desktop-items";
import { modalContents } from "@/data/modal-contents";
import { panelContents } from "@/data/panel-contents";
import type { DesktopItem } from "@/types/desktop";
import type { ActiveWindow } from "./Desktop";
import FolderIcon from "./icons/FolderIcon";
import DocIcon from "./icons/DocIcon";
import AppIcon from "./icons/AppIcon";
import StickyWidget from "./widgets/StickyWidget";
import IllustrationWidget from "./widgets/IllustrationWidget";
import { Window } from "./Window";
import DocContent from "./DocContent";
import PanelBody from "@/components/panel/PanelBody";

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
 * Window primitive (max-w-[680px] caps width on slightly wider tablets).
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
          <h1 className="font-display text-xl font-bold text-text-primary">
            Teacher &amp; School
          </h1>
          <p className="text-xs text-text-secondary mt-1">
            Brand Operating System
          </p>
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
              {item.type === "app" && (
                <AppIcon label={item.label} href={item.href} />
              )}
            </div>
          ))}
        </section>

        {/* Sticky widgets */}
        {stickies.length > 0 && (
          <section className="space-y-4 flex flex-col items-center">
            {stickies.map((s) => (
              <StickyWidget
                key={s.id}
                quote={s.quote}
                highlight={s.highlight}
                attribution={s.attribution}
                rotation={s.rotation}
              />
            ))}
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
        <Window
          open={true}
          onClose={onClose}
          title={activeWindow.title}
          className={
            activeWindow.kind === "doc" && activeWindow.contentId === "playground"
              ? "max-w-[680px] sm:max-w-[680px]"
              : ""
          }
        >
          {renderWindowContent(activeWindow)}
        </Window>
      )}
    </>
  );
}

function renderWindowContent(active: NonNullable<ActiveWindow>) {
  if (active.kind === "doc") {
    if (active.contentId === "playground") {
      return (
        <div className="text-center py-8 space-y-4">
          <p className="text-sm text-text-secondary">
            The Typography Playground is best experienced on desktop.
          </p>
          <p className="text-xs text-text-secondary opacity-70">
            It needs more horizontal room to render the type scale comfortably.
            Open this site on a laptop to play with the controls.
          </p>
        </div>
      );
    }
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
      <PanelBody items={panel.items} />
    </>
  );
}
