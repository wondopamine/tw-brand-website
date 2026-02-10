"use client";

import type { PanelContentItem } from "@/types/panel";

interface PanelBodyProps {
  items: PanelContentItem[];
}

export default function PanelBody({ items }: PanelBodyProps) {
  return (
    <div className="space-y-6">
      {items.map((item, index) => {
        switch (item.type) {
          case "text":
            return (
              <div key={index}>
                {item.title && (
                  <h3
                    className="text-base font-bold mb-2"
                    style={{
                      fontFamily: "var(--font-display, 'Sora', sans-serif)",
                      color: "var(--text-primary)",
                    }}
                  >
                    {item.title}
                  </h3>
                )}
                <p
                  className="text-sm leading-relaxed whitespace-pre-line"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {item.content}
                </p>
              </div>
            );

          case "image":
            return (
              <div key={index} className="space-y-2">
                <div
                  className="aspect-video rounded-xl overflow-hidden flex items-center justify-center"
                  style={{
                    backgroundColor: "var(--accent-light)",
                    border: "1px solid var(--card-border)",
                  }}
                >
                  {/* Placeholder for image */}
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    style={{ color: "var(--accent)", opacity: 0.4 }}
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <path d="M21 15l-5-5L5 21" />
                  </svg>
                </div>
                {item.caption && (
                  <p
                    className="text-xs"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {item.caption}
                  </p>
                )}
              </div>
            );

          case "guideline":
            return (
              <div key={index} className="space-y-3">
                <h4
                  className="text-sm font-bold"
                  style={{ color: "var(--text-primary)" }}
                >
                  {item.title}
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <div
                    className="rounded-xl p-4"
                    style={{
                      backgroundColor: "rgba(52, 211, 153, 0.08)",
                      border: "1px solid rgba(52, 211, 153, 0.2)",
                    }}
                  >
                    <span className="text-xs font-bold text-emerald-500 uppercase tracking-wider block mb-2">
                      Do
                    </span>
                    <p
                      className="text-xs leading-relaxed"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {item.doText}
                    </p>
                  </div>
                  <div
                    className="rounded-xl p-4"
                    style={{
                      backgroundColor: "rgba(248, 113, 113, 0.08)",
                      border: "1px solid rgba(248, 113, 113, 0.2)",
                    }}
                  >
                    <span className="text-xs font-bold text-red-400 uppercase tracking-wider block mb-2">
                      Don&apos;t
                    </span>
                    <p
                      className="text-xs leading-relaxed"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {item.dontText}
                    </p>
                  </div>
                </div>
              </div>
            );

          case "divider":
            return (
              <div
                key={index}
                className="h-px"
                style={{ backgroundColor: "var(--card-border)" }}
              />
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
