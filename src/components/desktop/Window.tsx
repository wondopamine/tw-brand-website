"use client";

import type { ReactNode } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

interface WindowProps {
  open: boolean;
  onClose: () => void;
  /** Title shown in the OS-style title bar */
  title: string;
  /** Optional subtitle / description below the title */
  subtitle?: string;
  /** Custom Tailwind class on the popup (e.g., wider max-w for the playground) */
  className?: string;
  children: ReactNode;
}

/**
 * OS-style window overlay. Wraps shadcn Dialog with a title bar that
 * carries the doc/folder name and a single close X. Inherits the
 * Dialog's accessibility (focus trap, Escape, scroll lock, portal).
 *
 * Default width: 680px (matches the prior FolderModal / CardModal feel).
 * Default max-height: 90vh with internal scroll for long content.
 * Pass className with a wider max-w to override (e.g., the Typography
 * Playground needs more room — pass "max-w-[960px] sm:max-w-[960px]").
 */
export function Window({
  open,
  onClose,
  title,
  subtitle,
  className,
  children,
}: WindowProps) {
  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent
        showCloseButton={false}
        className={`w-full max-w-[680px] sm:max-w-[680px] max-h-[90vh] p-0 bg-card-bg border border-card-border rounded-xl shadow-[0_25px_60px_-12px_rgba(0,0,0,0.2)] gap-0 ring-0 overflow-hidden flex flex-col ${
          className ?? ""
        }`}
      >
        {/* OS-style title bar */}
        <header className="flex items-center justify-between gap-3 px-4 py-3 border-b border-card-border shrink-0 bg-card-bg">
          <DialogTitle className="font-display text-sm font-semibold text-text-primary truncate">
            {title}
          </DialogTitle>
          <button
            type="button"
            onClick={onClose}
            aria-label={`Close ${title}`}
            className="shrink-0 inline-flex items-center justify-center w-6 h-6 rounded-md text-text-secondary hover:bg-card-border focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent transition-colors cursor-pointer"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </header>

        {/* Optional subtitle row */}
        {subtitle && (
          <div className="px-6 pt-4 pb-1 shrink-0">
            <p className="text-sm text-text-secondary leading-relaxed">
              {subtitle}
            </p>
          </div>
        )}

        {/* Scrollable content */}
        <div className="overflow-y-auto flex-1 px-6 py-5">{children}</div>
      </DialogContent>
    </Dialog>
  );
}
