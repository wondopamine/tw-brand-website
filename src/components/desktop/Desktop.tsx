"use client";

import { useState } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { desktopItems } from "@/data/desktop-items";
import { modalContents } from "@/data/modal-contents";
import { panelContents } from "@/data/panel-contents";
import DesktopItem from "./DesktopItem";
import MobileDesktop from "./MobileDesktop";
import { Window } from "./Window";
import DocContent from "./DocContent";
import PanelBody from "@/components/panel/PanelBody";
import HeroText from "@/components/items/HeroText";

/**
 * Active window state. Tracks what's currently open as a window overlay.
 * Set by item click handlers (DocIcon / FolderIcon); cleared by close.
 */
export type ActiveWindow =
  | { kind: "doc"; contentId: string; title: string }
  | { kind: "folder"; panelId: string; title: string }
  | null;

/**
 * T&S Brand OS desktop. Fixed-viewport (no pan, no zoom). Renders
 * desktopItems as icons + widgets at percentage-based positions.
 * Opens windows (shadcn Dialog + title bar) on doc/folder click.
 */
export default function Desktop() {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const [activeWindow, setActiveWindow] = useState<ActiveWindow>(null);
  const closeWindow = () => setActiveWindow(null);

  if (!isDesktop) {
    return (
      <MobileDesktop
        activeWindow={activeWindow}
        onOpen={setActiveWindow}
        onClose={closeWindow}
      />
    );
  }

  return (
    <>
      <div className="canvas-grid fixed inset-0 overflow-hidden">
        {desktopItems.map((item) => (
          <DesktopItem key={item.id} item={item} onOpen={setActiveWindow} />
        ))}
      </div>

      {/* Window slot — renders the active window if any */}
      {activeWindow && (
        <Window
          open={true}
          onClose={closeWindow}
          title={activeWindow.title}
          className={
            activeWindow.kind === "doc" && activeWindow.contentId === "playground"
              ? "max-w-[960px] sm:max-w-[960px]"
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
        <HeroText
          title="Teacher"
          subtitle="& School Brand Operating System"
          stack
        />
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
