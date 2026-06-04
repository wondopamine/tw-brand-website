"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
  type MotionValue,
} from "motion/react";
import { ExternalLink, Sparkles } from "lucide-react";
import type { DesktopItem } from "@/types/desktop";

interface DockProps {
  apps: Extract<DesktopItem, { type: "app" }>[];
  onOpenColours: () => void;
}

const BASE = 50; // resting tile size (px)
const MAX = 80; // magnified tile size (px)
const INFLUENCE = 130; // cursor distance over which magnification falls off (px)

/**
 * macOS-style dock: a translucent frosted slab with cursor-proximity
 * magnification and hover tooltips.
 *
 * The slab height is fixed; magnified icons grow upward and overflow
 * above the top edge (the signature dock feel), tracked via a shared
 * pointer-X MotionValue mapped to each tile's distance from the cursor.
 */
export default function Dock({ apps, onOpenColours }: DockProps) {
  const mouseX = useMotionValue(Infinity);

  return (
    <footer className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20">
      <motion.div
        onMouseMove={(e) => mouseX.set(e.clientX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        style={{ height: BASE + 12 }}
        className="dock-glass flex items-end gap-3 px-3 pb-1.5 rounded-[22px] [overflow:visible]"
      >
        {/* Colour Picker app (opens the Colours panel) */}
        <DockTile mouseX={mouseX} label="Colour Picker" onClick={onOpenColours}>
          <div className="relative flex h-full w-full items-center justify-center rounded-[26%] bg-white shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_1px_2px_rgba(20,40,90,0.25)]">
            <span
              className="size-[64%] rounded-full"
              style={{
                background:
                  "conic-gradient(from 90deg, #ff3b30, #ff9500, #ffcc00, #34c759, #00c7be, #007aff, #5856d6, #af52de, #ff2d55, #ff3b30)",
                boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.06)",
              }}
            />
            <span className="absolute size-[22%] rounded-full bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.06)]" />
          </div>
        </DockTile>

        {/* External app slots */}
        {apps.map((app) => (
          <DockTile
            key={app.id}
            mouseX={mouseX}
            label={app.label}
            href={app.href}
            external
          >
            <div className="dock-app-tile relative flex h-full w-full items-center justify-center rounded-[26%]">
              <Sparkles className="size-[44%] text-white" strokeWidth={1.5} />
              <span className="absolute -bottom-0.5 -right-0.5 flex size-[34%] items-center justify-center rounded-[30%] bg-white shadow-sm">
                <ExternalLink className="size-[55%] text-accent" strokeWidth={2.75} />
              </span>
            </div>
          </DockTile>
        ))}
      </motion.div>
    </footer>
  );
}

interface DockTileProps {
  mouseX: MotionValue<number>;
  label: string;
  href?: string;
  onClick?: () => void;
  external?: boolean;
  children: React.ReactNode;
}

function DockTile({
  mouseX,
  label,
  href,
  onClick,
  external,
  children,
}: DockTileProps) {
  const ref = useRef<HTMLElement>(null);
  const [hovered, setHovered] = useState(false);
  // Cache the tile's resting centre so the per-frame distance transform never
  // touches the DOM (reading getBoundingClientRect on every pointer move forces
  // a synchronous layout flush). Re-measured on mount and viewport resize only.
  const center = useMotionValue(0);

  useEffect(() => {
    const node = ref.current;
    const measure = () => {
      const b = node?.getBoundingClientRect();
      if (b) center.set(b.x + b.width / 2);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [center]);

  const distance = useTransform([mouseX, center] as MotionValue<number>[], ([m, c]: number[]) =>
    Number.isFinite(m) ? m - c : INFLUENCE * 2
  );

  const sizeTarget = useTransform(
    distance,
    [-INFLUENCE, 0, INFLUENCE],
    [BASE, MAX, BASE]
  );
  const size = useSpring(sizeTarget, { mass: 0.1, stiffness: 170, damping: 14 });

  const interaction = {
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    onFocus: () => setHovered(true),
    onBlur: () => setHovered(false),
    whileTap: { y: 4, scale: 0.92 },
    style: { width: size, height: size },
    className:
      "relative flex shrink-0 items-end justify-center rounded-[26%] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent",
  } as const;

  const tooltip = (
    <AnimatePresence>
      {hovered && (
        <motion.span
          initial={{ opacity: 0, y: 6, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 6, scale: 0.92 }}
          transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
          className="dock-tooltip pointer-events-none absolute -top-9 whitespace-nowrap rounded-lg px-2.5 py-1 text-[12px] font-medium text-text-primary"
        >
          {label}
        </motion.span>
      )}
    </AnimatePresence>
  );

  if (href) {
    return (
      <motion.a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        aria-label={
          external ? `Open ${label} (external app, opens in new tab)` : label
        }
        {...interaction}
      >
        {tooltip}
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref as React.Ref<HTMLButtonElement>}
      type="button"
      onClick={onClick}
      aria-label={`Open ${label}`}
      {...interaction}
    >
      {tooltip}
      {children}
    </motion.button>
  );
}
