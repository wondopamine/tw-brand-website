"use client";

import { useState } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { desktopItems } from "@/data/desktop-items";
import DesktopItem from "./DesktopItem";
import MobileDesktop from "./MobileDesktop";

/**
 * Active window state. Tracks what's currently open as a window overlay.
 * Set by item click handlers; cleared by Window close.
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

  if (!isDesktop) {
    return (
      <MobileDesktop
        activeWindow={activeWindow}
        onOpen={setActiveWindow}
        onClose={() => setActiveWindow(null)}
      />
    );
  }

  return (
    <div className="canvas-grid fixed inset-0 overflow-hidden">
      {desktopItems.map((item) => (
        <DesktopItem key={item.id} item={item} onOpen={setActiveWindow} />
      ))}
      {/*
        Window slot — wired up in U8/U9 once Window primitive + content
        lookups exist. For U2 scaffold, activeWindow state is plumbed but
        not yet rendered.
      */}
    </div>
  );
}
