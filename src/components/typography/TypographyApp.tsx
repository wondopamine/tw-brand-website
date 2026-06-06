"use client";

import { useCallback, useRef } from "react";
import type { FontId } from "@/data/typography";
import TryItPreview, { type TryItPreviewHandle } from "./TryItPreview";
import WeightList from "./WeightList";
import TypeScaleSpecimens from "./TypeScaleSpecimens";
import TypographyRationale from "./TypographyRationale";

/**
 * The Typography dock app — a Geist-style font showcase for the two
 * brand fonts. Hero playground up top (full window width), then the
 * reference sections in the standard reading measure.
 */
export default function TypographyApp() {
  const previewRef = useRef<TryItPreviewHandle>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  // Weight rows load their font + weight into the preview and bring it
  // into view (the window content area is the scroll container).
  const handleTryWeight = useCallback((fontId: FontId, weight: number) => {
    previewRef.current?.tryWeight(fontId, weight);
    heroRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <div className="space-y-10">
      <div ref={heroRef} className="scroll-mt-5">
        <TryItPreview ref={previewRef} />
      </div>

      <div className="mx-auto w-full max-w-[720px] space-y-10 pb-4">
        <Section title="Weights at a glance">
          <WeightList onTryWeight={handleTryWeight} />
        </Section>

        <Section title="Type scale">
          <TypeScaleSpecimens />
        </Section>

        <Section title="About the fonts">
          <TypographyRationale />
        </Section>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h3
        className="text-base font-bold mb-4"
        style={{
          fontFamily: "var(--font-display, 'Plus Jakarta Sans', sans-serif)",
          color: "var(--text-primary)",
        }}
      >
        {title}
      </h3>
      {children}
    </section>
  );
}
