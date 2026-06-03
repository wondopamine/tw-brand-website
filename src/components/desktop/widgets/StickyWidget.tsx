"use client";

interface StickyWidgetProps {
  quote: string;
  highlight?: string;
  attribution?: string;
  rotation?: number;
}

/**
 * Sticky-note widget. Always visible on the desktop — no click handler,
 * no expand state. Displays the full quote with optional highlight span
 * and attribution. Skewed slightly by rotation for natural post-it feel.
 *
 * Color: TW yellow (--quote-highlight #FFE066) background — uses the
 * previously-unused token defined in globals.css.
 */
export default function StickyWidget({
  quote,
  highlight,
  attribution,
  rotation = 0,
}: StickyWidgetProps) {
  const renderQuote = () => {
    if (!highlight) return <span>{quote}</span>;
    const parts = quote.split(highlight);
    if (parts.length < 2) return <span>{quote}</span>;
    return (
      <>
        {parts[0]}
        <mark className="bg-white/50 px-0.5 rounded-sm">{highlight}</mark>
        {parts[1]}
      </>
    );
  };

  return (
    <div
      style={{ transform: `rotate(${rotation}deg)` }}
      className="w-[240px] bg-quote-highlight shadow-[0_6px_16px_-4px_rgba(0,0,0,0.15),0_2px_4px_-2px_rgba(0,0,0,0.08)] rounded-sm p-4 select-text"
    >
      <blockquote className="font-display text-[14px] leading-[1.4] font-medium text-text-primary">
        &ldquo;{renderQuote()}&rdquo;
      </blockquote>
      {attribution && (
        <p className="mt-3 text-[11px] font-medium text-text-primary/70">
          &mdash; {attribution}
        </p>
      )}
    </div>
  );
}
