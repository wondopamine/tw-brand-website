"use client";

import { useState } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { desktopItems } from "@/data/desktop-items";
import { modalContents } from "@/data/modal-contents";
import { panelContents } from "@/data/panel-contents";
import MobileDesktop from "./MobileDesktop";
import { Window } from "./Window";
import DocContent from "./DocContent";
import PanelBody from "@/components/panel/PanelBody";
import HeroText from "@/components/items/HeroText";
import FolderIcon from "./icons/FolderIcon";
import DocIcon from "./icons/DocIcon";
import AppIcon from "./icons/AppIcon";
import StickyWidget from "./widgets/StickyWidget";
import IllustrationWidget from "./widgets/IllustrationWidget";
import { FolderMark } from "@/components/icons";

export type ActiveWindow =
  | { kind: "doc"; contentId: string; title: string }
  | { kind: "folder"; panelId: string; title: string }
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
  const fileItems = desktopItems.filter(
    (i) => i.type === "doc" || i.type === "folder"
  );
  const appItems = desktopItems.filter((i) => i.type === "app");

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
            className="cloud-drift pointer-events-none absolute top-[8%] left-[72%] w-[22%] mix-blend-lighten select-none [will-change:transform]"
            style={{ animation: "cloud-drift-a 9s cubic-bezier(0.455,0.03,0.515,0.955) 0s infinite alternate" }}
          />
          <img
            alt=""
            aria-hidden
            src="/hero/cloud-halftone.png"
            className="cloud-drift pointer-events-none absolute top-[22%] left-[55%] w-[44%] mix-blend-lighten select-none [will-change:transform]"
            style={{ animation: "cloud-drift-b 13s cubic-bezier(0.455,0.03,0.515,0.955) -3s infinite alternate" }}
          />
          <img
            alt=""
            aria-hidden
            src="/hero/cloud-halftone.png"
            className="cloud-drift pointer-events-none absolute top-[35%] -left-[6%] w-[38%] mix-blend-lighten select-none [will-change:transform]"
            style={{ animation: "cloud-drift-c 11s cubic-bezier(0.455,0.03,0.515,0.955) -5s infinite alternate" }}
          />
        </div>

        {/* Menu bar — top */}
        <header className="absolute top-0 left-0 right-0 h-7 px-4 flex items-center gap-2 bg-card-bg/70 backdrop-blur-md border-b border-card-border z-20">
          <FolderMark width={16} height={13} />
          <span className="font-display text-[12px] font-semibold text-text-primary tracking-tight">
            Teacher &amp; School Brand OS
          </span>
        </header>

        {/* Widgets column — left */}
        <aside className="absolute left-6 top-12 bottom-28 w-[300px] flex flex-col gap-5 overflow-y-auto pr-1 z-10">
          {widgetItems.map((item) => {
            if (item.type === "sticky") {
              return (
                <StickyWidget
                  key={item.id}
                  quote={item.quote}
                  highlight={item.highlight}
                  attribution={item.attribution}
                  rotation={item.rotation}
                />
              );
            }
            return <IllustrationWidget key={item.id} slides={item.slides} />;
          })}
        </aside>

        {/* File / folder grid — right */}
        <section className="absolute right-6 top-12 bottom-28 w-[480px] grid grid-cols-3 gap-y-6 gap-x-2 content-start overflow-y-auto pr-1 z-10">
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
        {appItems.length > 0 && (
          <footer className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20">
            <div className="flex items-end gap-2 px-3 py-2 rounded-2xl bg-card-bg/65 backdrop-blur-xl border border-card-border shadow-[0_18px_40px_-12px_rgba(0,0,0,0.25)]">
              {appItems.map((item) => {
                if (item.type !== "app") return null;
                return (
                  <AppIcon
                    key={item.id}
                    label={item.label}
                    href={item.href}
                  />
                );
              })}
            </div>
          </footer>
        )}
      </div>

      {/* Window slot */}
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
