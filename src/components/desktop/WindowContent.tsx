"use client";

import { modalContents } from "@/data/modal-contents";
import { panelContents } from "@/data/panel-contents";
import type { ActiveWindow } from "./Desktop";
import DocContent from "./DocContent";
import PanelBody from "@/components/panel/PanelBody";
import TypographyApp from "@/components/typography/TypographyApp";

interface WindowContentProps {
  active: NonNullable<ActiveWindow>;
  /**
   * Constrain doc/folder prose to a readable measure. Desktop windows are
   * wide (960px) so they opt in; mobile windows are already narrow.
   */
  measure?: boolean;
}

/**
 * Renders the body for an open window. Shared by Desktop and MobileDesktop
 * so the app/doc/folder dispatch and its missing-content fallbacks stay in
 * one place. Apps own their internal layout (full window width); doc and
 * folder content optionally sits in a centered reading measure.
 */
export default function WindowContent({ active, measure }: WindowContentProps) {
  if (active.kind === "app") {
    if (active.appId === "typography") {
      return <TypographyApp />;
    }
    return <Missing label={`app content for "${active.appId}"`} />;
  }

  const measureClass = measure ? "mx-auto w-full max-w-[720px]" : undefined;

  if (active.kind === "doc") {
    const content = modalContents[active.contentId];
    if (!content) {
      return <Missing label={`doc content for "${active.contentId}"`} />;
    }
    return (
      <div className={measureClass}>
        <DocContent content={content} />
      </div>
    );
  }

  // folder
  const panel = panelContents[active.panelId];
  if (!panel) {
    return <Missing label={`panel content for "${active.panelId}"`} />;
  }
  return (
    <div className={measureClass}>
      {panel.description && (
        <p className="text-[14px] text-text-secondary leading-relaxed mb-5">
          {panel.description}
        </p>
      )}
      <PanelBody items={panel.items} />
    </div>
  );
}

function Missing({ label }: { label: string }) {
  return <p className="text-sm text-text-secondary">Missing {label}.</p>;
}
