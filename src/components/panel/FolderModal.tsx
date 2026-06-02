"use client";

import type { PanelContent } from "@/types/panel";
import { Dialog } from "@/components/ui/dialog";
import PanelBody from "./PanelBody";

interface FolderModalProps {
  content: PanelContent | null;
  onClose: () => void;
}

export default function FolderModal({ content, onClose }: FolderModalProps) {
  const isOpen = content !== null;

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      ariaLabel={content?.title}
      popupClassName="py-16 sm:py-20 px-4 sm:px-6 cursor-default"
    >
      {content && (
        <div className="relative w-full max-w-[680px] flex flex-col rounded-2xl overflow-hidden bg-card-bg border border-card-border shadow-[0_25px_60px_-12px_rgba(0,0,0,0.2)]">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 z-10 w-8 h-8 rounded-lg flex items-center justify-center transition-opacity hover:opacity-60 cursor-pointer text-text-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            aria-label="Close modal"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Header */}
          <div className="px-10 pt-10 pb-2 shrink-0">
            <h2 className="font-display text-[28px] sm:text-[32px] font-bold pr-10 tracking-tight leading-[1.2] text-text-primary tracking-[-0.022em]">
              {content.title}
            </h2>
            {content.description && (
              <p className="text-[15px] mt-3 leading-[1.6] text-text-secondary">
                {content.description}
              </p>
            )}
          </div>

          {/* Thin separator */}
          <div className="mx-10 mt-4 h-px bg-card-border opacity-60" />

          {/* Content */}
          <div className="px-10 py-8">
            <PanelBody items={content.items} />
          </div>
        </div>
      )}
    </Dialog>
  );
}
