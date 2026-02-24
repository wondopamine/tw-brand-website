"use client";

import { useState } from "react";
import { createPortal } from "react-dom";

interface QuoteCardProps {
  quote: string;
  highlight?: string;
  attribution?: string;
  source?: string;
}

function QuoteModal({
  quote,
  highlight,
  attribution,
  source,
  onClose,
}: QuoteCardProps & { onClose: () => void }) {
  const renderQuote = (large = false) => {
    if (!highlight) return <span>{quote}</span>;

    const parts = quote.split(highlight);
    if (parts.length < 2) return <span>{quote}</span>;

    return (
      <>
        {parts[0]}
        <mark
          style={{
            backgroundColor: "#f43f5e",
            color: "#ffffff",
            padding: large ? "0 6px 2px" : "0 4px 1px",
            borderRadius: 4,
            fontStyle: "inherit",
          }}
        >
          {highlight}
        </mark>
        {parts[1]}
      </>
    );
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-6"
      style={{ backgroundColor: "var(--overlay-bg)" }}
      onClick={onClose}
    >
      <div
        className="relative max-w-2xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Large open-quote mark */}
        <div
          className="text-[120px] leading-none select-none mb-[-24px]"
          style={{ color: "var(--accent)", fontFamily: "Georgia, serif", opacity: 0.25 }}
          aria-hidden="true"
        >
          &ldquo;
        </div>

        <blockquote
          className="text-3xl md:text-4xl font-semibold leading-tight tracking-tight"
          style={{
            color: "var(--text-primary)",
            fontFamily: "var(--font-display, 'Plus Jakarta Sans', sans-serif)",
          }}
        >
          {renderQuote(true)}
        </blockquote>

        {(attribution || source) && (
          <div className="mt-8 flex items-center gap-3">
            <div
              className="w-8 h-px"
              style={{ backgroundColor: "var(--text-secondary)" }}
            />
            <p
              className="text-sm font-medium"
              style={{ color: "var(--text-secondary)" }}
            >
              {attribution}
              {source && (
                <span className="ml-1 font-normal opacity-70">&mdash; {source}</span>
              )}
            </p>
          </div>
        )}

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-xs font-medium uppercase tracking-widest opacity-50 hover:opacity-100 transition-opacity"
          style={{ color: "var(--text-primary)" }}
        >
          Close ✕
        </button>
      </div>
    </div>,
    document.body
  );
}

export default function QuoteCard({
  quote,
  highlight,
  attribution,
  source,
}: QuoteCardProps) {
  const [open, setOpen] = useState(false);

  const renderQuote = () => {
    if (!highlight) return <span>{quote}</span>;

    const parts = quote.split(highlight);
    if (parts.length < 2) return <span>{quote}</span>;

    return (
      <>
        {parts[0]}
        <mark
          style={{
            backgroundColor: "#f43f5e",
            color: "#ffffff",
            padding: "0 4px 1px",
            borderRadius: 4,
            fontStyle: "inherit",
          }}
        >
          {highlight}
        </mark>
        {parts[1]}
      </>
    );
  };

  return (
    <>
      <div
        className="h-full flex flex-col justify-between cursor-pointer group"
        style={{ transition: "transform 0.2s ease" }}
        onClick={() => setOpen(true)}
      >
        {/* Tiny label */}
        <p
          className="text-[10px] font-semibold uppercase tracking-[0.18em] mb-3 opacity-40"
          style={{ color: "var(--text-primary)" }}
        >
          Quote
        </p>

        {/* The quote — no card background, raw editorial text */}
        <blockquote
          className="flex-1 text-xl md:text-2xl font-semibold leading-snug tracking-tight"
          style={{
            color: "var(--text-primary)",
            fontFamily: "var(--font-display, 'Plus Jakarta Sans', sans-serif)",
            transition: "transform 0.2s ease",
          }}
        >
          <span
            className="block group-hover:scale-[1.03] origin-top-left"
            style={{ transition: "transform 0.25s cubic-bezier(0.34,1.56,0.64,1)" }}
          >
            &ldquo;{renderQuote()}&rdquo;
          </span>
        </blockquote>

        {/* Attribution row */}
        {attribution && (
          <div className="mt-4 flex items-center gap-2">
            <div
              className="w-5 h-px shrink-0"
              style={{ backgroundColor: "var(--text-secondary)" }}
            />
            <p
              className="text-xs font-medium"
              style={{ color: "var(--text-secondary)" }}
            >
              {attribution}
              {source && <span className="font-normal opacity-60">, {source}</span>}
            </p>
          </div>
        )}

        {/* Read more hint */}
        <p
          className="mt-3 text-[10px] font-semibold uppercase tracking-widest opacity-0 group-hover:opacity-40 transition-opacity duration-200"
          style={{ color: "var(--accent)" }}
        >
          Read more
        </p>
      </div>

      {open && (
        <QuoteModal
          quote={quote}
          highlight={highlight}
          attribution={attribution}
          source={source}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
