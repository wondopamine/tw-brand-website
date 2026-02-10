"use client";

interface QuoteCardProps {
  quote: string;
  highlight?: string;
  attribution?: string;
}

export default function QuoteCard({
  quote,
  highlight,
  attribution,
}: QuoteCardProps) {
  const renderQuote = () => {
    if (!highlight) {
      return <span>{quote}</span>;
    }

    const parts = quote.split(highlight);
    if (parts.length < 2) {
      return <span>{quote}</span>;
    }

    return (
      <>
        {parts[0]}
        <span
          className="px-1 rounded"
          style={{
            backgroundColor: "var(--quote-highlight)",
            color: "#1a1a1a",
          }}
        >
          {highlight}
        </span>
        {parts[1]}
      </>
    );
  };

  return (
    <div className="canvas-card p-6 h-full flex flex-col justify-between">
      <blockquote
        className="text-base md:text-lg leading-relaxed italic"
        style={{ color: "var(--text-primary)" }}
      >
        &ldquo;{renderQuote()}&rdquo;
      </blockquote>
      {attribution && (
        <p
          className="mt-4 text-xs font-medium uppercase tracking-wider"
          style={{ color: "var(--text-secondary)" }}
        >
          &mdash; {attribution}
        </p>
      )}
    </div>
  );
}
