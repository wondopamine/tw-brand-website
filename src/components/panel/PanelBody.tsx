"use client";

import { useState, useCallback } from "react";
import type { PanelContentItem } from "@/types/panel";
import type { AssetEntry } from "@/types/panel";

interface PanelBodyProps {
  items: PanelContentItem[];
}

function CopyFeedback({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [text]);

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        handleCopy();
      }}
      className="text-xs font-medium cursor-pointer transition-colors"
      style={{ color: copied ? "var(--accent)" : "var(--text-secondary)" }}
      title={`Copy ${text}`}
    >
      {copied ? "Copied!" : text}
    </button>
  );
}

function AssetListRow({
  asset,
  onEnlarge,
}: {
  asset: AssetEntry;
  onEnlarge: (asset: AssetEntry) => void;
}) {
  const [nameCopied, setNameCopied] = useState(false);

  const copyName = useCallback(() => {
    navigator.clipboard.writeText(asset.name);
    setNameCopied(true);
    setTimeout(() => setNameCopied(false), 1500);
  }, [asset.name]);

  return (
    <div
      className="flex items-center gap-3 p-3 rounded-lg transition-colors cursor-pointer hover:bg-black/[0.02]"
      style={{ border: "1px solid var(--card-border)" }}
      onClick={() => onEnlarge(asset)}
    >
      {/* Thumbnail */}
      <div
        className="w-12 h-12 rounded-lg shrink-0 flex items-center justify-center"
        style={{
          backgroundColor: asset.thumbnailColor ?? "var(--accent-light)",
        }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          style={{ color: "var(--accent)", opacity: 0.5 }}
        >
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path d="M21 15l-5-5L5 21" />
        </svg>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p
          className="text-sm font-medium truncate"
          style={{ color: "var(--text-primary)" }}
        >
          {asset.description ?? asset.name}
        </p>
        <div className="flex items-center gap-2 mt-0.5">
          <button
            onClick={(e) => {
              e.stopPropagation();
              copyName();
            }}
            className="text-xs cursor-pointer transition-colors"
            style={{
              color: nameCopied ? "var(--accent)" : "var(--text-secondary)",
            }}
          >
            {nameCopied ? "Copied!" : asset.name}
          </button>
          {asset.link && asset.link !== "#" && (
            <a
              href={asset.link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-xs hover:underline"
              style={{ color: "var(--accent)" }}
            >
              Open link
            </a>
          )}
        </div>
      </div>

      {/* Expand icon */}
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="shrink-0"
        style={{ color: "var(--text-secondary)" }}
      >
        <polyline points="15 3 21 3 21 9" />
        <polyline points="9 21 3 21 3 15" />
        <line x1="21" y1="3" x2="14" y2="10" />
        <line x1="3" y1="21" x2="10" y2="14" />
      </svg>
    </div>
  );
}

function AssetEnlargedView({
  asset,
  onClose,
}: {
  asset: AssetEntry;
  onClose: () => void;
}) {
  const [nameCopied, setNameCopied] = useState(false);

  const copyName = useCallback(() => {
    navigator.clipboard.writeText(asset.name);
    setNameCopied(true);
    setTimeout(() => setNameCopied(false), 1500);
  }, [asset.name]);

  return (
    <div className="space-y-4">
      <button
        onClick={onClose}
        className="text-xs font-medium cursor-pointer flex items-center gap-1"
        style={{ color: "var(--accent)" }}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
        Back to list
      </button>

      {/* Enlarged thumbnail */}
      <div
        className="aspect-video rounded-xl flex items-center justify-center"
        style={{
          backgroundColor: asset.thumbnailColor ?? "var(--accent-light)",
          border: "1px solid var(--card-border)",
        }}
      >
        <svg
          width="64"
          height="64"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
          style={{ color: "var(--accent)", opacity: 0.4 }}
        >
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path d="M21 15l-5-5L5 21" />
        </svg>
      </div>

      <div>
        <p
          className="text-base font-bold"
          style={{ color: "var(--text-primary)" }}
        >
          {asset.description}
        </p>
        <div className="flex items-center gap-3 mt-2">
          <button
            onClick={copyName}
            className="text-sm cursor-pointer px-3 py-1.5 rounded-lg transition-colors"
            style={{
              backgroundColor: nameCopied
                ? "var(--accent-light)"
                : "rgba(0,0,0,0.03)",
              color: nameCopied ? "var(--accent)" : "var(--text-secondary)",
              border: "1px solid var(--card-border)",
            }}
          >
            {nameCopied ? "Copied!" : `Copy: ${asset.name}`}
          </button>
          {asset.link && asset.link !== "#" && (
            <a
              href={asset.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm px-3 py-1.5 rounded-lg transition-colors"
              style={{
                backgroundColor: "var(--accent-light)",
                color: "var(--accent)",
                border: "1px solid rgba(0, 100, 255, 0.15)",
              }}
            >
              Open source
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function PanelBody({ items }: PanelBodyProps) {
  const [enlargedAsset, setEnlargedAsset] = useState<AssetEntry | null>(null);

  if (enlargedAsset) {
    return (
      <AssetEnlargedView
        asset={enlargedAsset}
        onClose={() => setEnlargedAsset(null)}
      />
    );
  }

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

          case "color-swatch":
            return (
              <div key={index} className="space-y-3">
                {item.title && (
                  <h4
                    className="text-sm font-bold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {item.title}
                  </h4>
                )}
                <div className="space-y-2">
                  {item.colors.map((color) => (
                    <div
                      key={color.hex}
                      className="flex items-center gap-3"
                    >
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(color.hex);
                        }}
                        className="flex items-center gap-3 flex-1 p-2 rounded-lg transition-colors cursor-pointer hover:bg-black/[0.02]"
                        title={`Click to copy ${color.hex}`}
                      >
                        <div
                          className="rounded-lg shrink-0"
                          style={{
                            backgroundColor: color.hex,
                            width: color.isPrimary ? 48 : 36,
                            height: color.isPrimary ? 48 : 36,
                            border:
                              color.hex === "#EFF6FF" ||
                              color.hex === "#DBEAFE"
                                ? "1px solid var(--card-border)"
                                : undefined,
                          }}
                        />
                        <div className="text-left">
                          <span
                            className="text-sm font-medium block"
                            style={{ color: "var(--text-primary)" }}
                          >
                            {color.name}
                          </span>
                          <CopyFeedback text={color.hex} />
                        </div>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            );

          case "asset-list":
            return (
              <div key={index} className="space-y-3">
                {item.title && (
                  <h4
                    className="text-sm font-bold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {item.title}
                  </h4>
                )}
                <div className="space-y-2">
                  {item.assets.map((asset) => (
                    <AssetListRow
                      key={asset.name}
                      asset={asset}
                      onEnlarge={setEnlargedAsset}
                    />
                  ))}
                </div>
              </div>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
