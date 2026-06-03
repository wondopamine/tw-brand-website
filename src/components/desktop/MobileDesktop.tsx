"use client";

import { desktopItems } from "@/data/desktop-items";
import type { ActiveWindow } from "./Desktop";

interface MobileDesktopProps {
  activeWindow: ActiveWindow;
  onOpen: (window: ActiveWindow) => void;
  onClose: () => void;
}

/**
 * Mobile fallback for the Brand OS desktop. iOS-home-screen-style:
 * 3-column icon grid at top, sticky widgets stacked below, illustration
 * widget at the bottom. Built out in U10; this is the U2 stub.
 */
export default function MobileDesktop({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  activeWindow,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onOpen,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onClose,
}: MobileDesktopProps) {
  const sorted = [...desktopItems].sort((a, b) => a.mobileOrder - b.mobileOrder);

  return (
    <div className="min-h-screen p-4 space-y-3 bg-canvas-bg">
      <p className="text-xs text-text-secondary text-center pt-2">
        Mobile layout — full iOS-home-screen treatment lands in U10
      </p>
      {sorted.map((item) => (
        <div
          key={item.id}
          className="bg-card-bg border border-card-border rounded-lg p-3 text-sm"
        >
          <div className="font-semibold text-text-primary">{item.type}</div>
          <div className="text-text-secondary text-xs">
            {(("label" in item && item.label) ||
              ("quote" in item && item.quote?.slice(0, 50)) ||
              item.id) as string}
          </div>
        </div>
      ))}
    </div>
  );
}
