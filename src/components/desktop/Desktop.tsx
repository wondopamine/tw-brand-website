"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useMotionValue } from "motion/react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { desktopItems } from "@/data/desktop-items";
import type { DesktopItem, ExternalAppDesktopItem } from "@/types/desktop";
import { modalContents } from "@/data/modal-contents";
import { panelContents } from "@/data/panel-contents";
import MobileDesktop from "./MobileDesktop";
import { Window } from "./Window";
import DocContent from "./DocContent";
import PanelBody from "@/components/panel/PanelBody";
import TypographyApp from "@/components/typography/TypographyApp";
import FolderIcon from "./icons/FolderIcon";
import DocIcon from "./icons/DocIcon";
import Dock from "./Dock";
import StickyStack from "./widgets/StickyStack";
import IllustrationWidget from "./widgets/IllustrationWidget";
import { FolderMark } from "@/components/icons";

export type ActiveWindow =
  | { kind: "doc"; contentId: string; title: string }
  | { kind: "folder"; panelId: string; title: string }
  | { kind: "app"; appId: string; title: string }
  | null;

/**
 * T&S Brand OS desktop. macOS-style zones:
 *   • menu bar (top)        — Brand OS indicator
 *   • widgets column (left) — stickies + illustration carousel
 *   • file grid (right)     — docs + folders
 *   • dock (bottom)         — apps
 */
export default function Desktop() {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const [activeWindow, setActiveWindow] = useState<ActiveWindow>(null);
  const closeWindow = () => setActiveWindow(null);

  // Shared viewport pointer position, driving the sticky-note parallax tilt.
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  useEffect(() => {
    const handle = (e: PointerEvent) => {
      pointerX.set(e.clientX);
      pointerY.set(e.clientY);
    };
    window.addEventListener("pointermove", handle, { passive: true });
    return () => window.removeEventListener("pointermove", handle);
  }, [pointerX, pointerY]);

  if (!isDesktop) {
    return (
      <MobileDesktop
        activeWindow={activeWindow}
        onOpen={setActiveWindow}
        onClose={closeWindow}
      />
    );
  }

  const widgetItems = desktopItems.filter(
    (i) => i.type === "sticky" || i.type === "illustration-widget"
  );
  // Tidied like macOS "Clean Up By Kind": documents first, then folders.
  // Colours is excluded here because it lives in the dock as an app.
  const fileItems = desktopItems
    .filter(
      (i): i is Extract<DesktopItem, { type: "doc" | "folder" }> =>
        (i.type === "doc" || i.type === "folder") && i.id !== "folder-colours"
    )
    .sort((a, b) => (a.type === b.type ? 0 : a.type === "doc" ? -1 : 1));
  // External apps only — in-OS apps (Typography) have built-in dock tiles
  // on desktop and live in the mobile grid instead.
  const appItems = desktopItems.filter(
    (i): i is ExternalAppDesktopItem => i.type === "app" && i.href !== undefined
  );

  return (
    <>
      <div className="fixed inset-0 overflow-hidden">
        {/* Sky + drifting clouds (bottom layer) */}
        <div aria-hidden className="hero-sky-bg absolute inset-0" />
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <img
            alt=""
            aria-hidden
            src="/hero/cloud-halftone.png"
            className="cloud-drift pointer-events-none absolute top-[6%] left-[40%] w-[22%] opacity-60 mix-blend-lighten select-none [will-change:transform]"
            style={{ animation: "cloud-drift-a 9s cubic-bezier(0.455,0.03,0.515,0.955) 0s infinite alternate" }}
          />
          <img
            alt=""
            aria-hidden
            src="/hero/cloud-halftone.png"
            className="cloud-drift pointer-events-none absolute top-[20%] left-[30%] w-[32%] opacity-50 mix-blend-lighten select-none [will-change:transform]"
            style={{ animation: "cloud-drift-b 13s cubic-bezier(0.455,0.03,0.515,0.955) -3s infinite alternate" }}
          />
          <img
            alt=""
            aria-hidden
            src="/hero/cloud-halftone.png"
            className="cloud-drift pointer-events-none absolute top-[12%] left-[48%] w-[20%] opacity-50 mix-blend-lighten select-none [will-change:transform]"
            style={{ animation: "cloud-drift-c 11s cubic-bezier(0.455,0.03,0.515,0.955) -5s infinite alternate" }}
          />
        </div>

        {/* Menu bar — top */}
        <header className="absolute top-0 left-0 right-0 h-7 px-4 flex items-center bg-card-bg/70 backdrop-blur-md border-b border-card-border z-20">
          <Link
            href="/"
            aria-label="Back to the Teacher & School landing page"
            className="flex items-center gap-2 -mx-2 px-2 h-full rounded-sm transition-colors hover:bg-black/[0.05] focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--accent)]"
          >
            <FolderMark width={16} height={13} />
            <span className="font-display text-[12px] font-semibold text-text-primary tracking-tight">
              Teacher &amp; School Brand OS
            </span>
          </Link>
        </header>

        {/* Widgets column — left */}
        <aside className="absolute left-6 top-12 bottom-28 w-[248px] flex flex-col gap-4 overflow-visible z-10" style={{ perspective: 1000 }}>
          <StickyStack
            notes={widgetItems.filter(
              (i): i is Extract<DesktopItem, { type: "sticky" }> =>
                i.type === "sticky"
            )}
            pointerX={pointerX}
            pointerY={pointerY}
          />
          {widgetItems
            .filter((i) => i.type === "illustration-widget")
            .map((item) => (
              <IllustrationWidget key={item.id} slides={item.slides} />
            ))}
        </aside>

        {/* File / folder grid — right */}
        <section className="no-scrollbar absolute right-6 top-12 bottom-28 w-[456px] grid grid-cols-3 justify-items-center gap-x-3 gap-y-8 content-start overflow-y-auto z-10">
          {fileItems.map((item) => {
            if (item.type === "doc") {
              return (
                <DocIcon
                  key={item.id}
                  label={item.label}
                  onClick={() =>
                    setActiveWindow({
                      kind: "doc",
                      contentId: item.contentId,
                      title: item.label,
                    })
                  }
                />
              );
            }
            return (
              <FolderIcon
                key={item.id}
                label={item.label}
                onClick={() =>
                  setActiveWindow({
                    kind: "folder",
                    panelId: item.panelId,
                    title: item.label,
                  })
                }
              />
            );
          })}
        </section>

        {/* Dock — bottom center */}
        <Dock
          apps={appItems}
          onOpenColours={() =>
            setActiveWindow({
              kind: "folder",
              panelId: "colours",
              title: "Colours",
            })
          }
          onOpenTypography={() =>
            setActiveWindow({
              kind: "app",
              appId: "typography",
              title: "Typography",
            })
          }
        />
      </div>

      {/* Window slot */}
      {activeWindow && (
        <Window open={true} onClose={closeWindow} title={activeWindow.title}>
          {renderWindowContent(activeWindow, setActiveWindow)}
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
    // Centered measure keeps prose readable inside the wide window.
    return (
      <div className="mx-auto w-full max-w-[720px]">
        <DocContent content={content} />
      </div>
    );
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
    <div className="mx-auto w-full max-w-[720px]">
      {panel.description && (
        <p className="text-[14px] text-text-secondary leading-relaxed mb-5">
          {panel.description}
        </p>
      )}
      <PanelBody
        items={panel.items}
        // Close the current window first, then open the target one fresh —
        // swapping a Base UI dialog's children in place triggers its
        // dismiss logic and the window vanishes instead.
        onLaunch={(windowId, title) => {
          onOpen(null);
          setTimeout(
            () => onOpen({ kind: "doc", contentId: windowId, title }),
            150
          );
        }}
      />
    </div>
  );
}
