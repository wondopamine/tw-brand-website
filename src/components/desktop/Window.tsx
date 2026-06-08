"use client";

import { useState, type ReactNode } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

interface WindowProps {
  open: boolean;
  onClose: () => void;
  /** Title shown in the OS-style title bar */
  title: string;
  /** Optional subtitle / description below the title */
  subtitle?: string;
  /** Custom Tailwind class on the popup (e.g., width overrides) */
  className?: string;
  children: ReactNode;
}

/**
 * OS-style window overlay. Wraps shadcn Dialog with a macOS-style title bar
 * (red/yellow/green traffic lights on the left, centered title). Inherits
 * the Dialog's accessibility (focus trap, Escape, scroll lock, portal).
 *
 * Traffic lights:
 *   • red    — close (same as Escape / overlay click)
 *   • yellow — minimize (closes the window for now; no taskbar yet)
 *   • green  — maximize (toggles to a near-fullscreen size)
 */
export function Window({
  open,
  onClose,
  title,
  subtitle,
  className,
  children,
}: WindowProps) {
  const [maximized, setMaximized] = useState(false);

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        if (!o) {
          setMaximized(false);
          onClose();
        }
      }}
    >
      <DialogContent
        showCloseButton={false}
        className={`p-0 bg-card-bg border border-card-border shadow-[0_25px_60px_-12px_rgba(0,0,0,0.2)] gap-0 ring-0 overflow-hidden flex flex-col ${
          maximized
            ? "w-[96vw] max-w-[96vw] sm:max-w-[96vw] h-[92vh] max-h-[92vh] rounded-lg"
            : `w-full max-w-[960px] sm:max-w-[960px] max-h-[90vh] rounded-xl ${className ?? ""}`
        }`}
      >
        {/* macOS-style title bar */}
        <header className="relative flex items-center gap-3 px-4 h-10 border-b border-card-border shrink-0 bg-card-bg">
          {/* Traffic lights (left) */}
          <div className="flex items-center gap-2 shrink-0">
            <TrafficLight
              color="red"
              label={`Close ${title}`}
              onClick={() => {
                setMaximized(false);
                onClose();
              }}
            />
            <TrafficLight
              color="yellow"
              label={`Minimize ${title}`}
              onClick={() => {
                setMaximized(false);
                onClose();
              }}
            />
            <TrafficLight
              color="green"
              label={maximized ? `Restore ${title}` : `Maximize ${title}`}
              onClick={() => setMaximized((m) => !m)}
            />
          </div>

          {/* Centered title — absolutely positioned so traffic lights don't shift it */}
          <DialogTitle className="absolute left-1/2 -translate-x-1/2 max-w-[60%] font-display text-sm font-semibold text-text-primary truncate pointer-events-none">
            {title}
          </DialogTitle>
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

const TRAFFIC_LIGHT_STYLES = {
  red: {
    base: "bg-[#ff5f57] border-[#e0443e]",
    glyph: (
      <>
        <line x1="3.5" y1="3.5" x2="8.5" y2="8.5" />
        <line x1="8.5" y1="3.5" x2="3.5" y2="8.5" />
      </>
    ),
  },
  yellow: {
    base: "bg-[#febc2e] border-[#dea123]",
    glyph: <line x1="3" y1="6" x2="9" y2="6" />,
  },
  green: {
    base: "bg-[#28c840] border-[#1aab29]",
    glyph: (
      <>
        <line x1="6" y1="3" x2="6" y2="9" />
        <line x1="3" y1="6" x2="9" y2="6" />
      </>
    ),
  },
} as const;

function TrafficLight({
  color,
  label,
  onClick,
}: {
  color: keyof typeof TRAFFIC_LIGHT_STYLES;
  label: string;
  onClick: () => void;
}) {
  const { base, glyph } = TRAFFIC_LIGHT_STYLES[color];
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`group relative w-3 h-3 rounded-full border ${base} focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent cursor-pointer`}
    >
      <svg
        viewBox="0 0 12 12"
        className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity text-black/55"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        aria-hidden="true"
      >
        {glyph}
      </svg>
    </button>
  );
}
