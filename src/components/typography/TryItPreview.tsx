"use client";

import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { fonts, getFont, type FontId } from "@/data/typography";
import FontSwitcher from "./controls/FontSwitcher";
import WeightSelect from "./controls/WeightSelect";
import SizeControl, { type SizeStop } from "./controls/SizeControl";
import AlignToggle, { type TextAlign } from "./controls/AlignToggle";
import ColourPicker from "./controls/ColourPicker";

const SIZE_STOPS: SizeStop[] = [
  { label: "Body", value: 16 },
  { label: "Lead", value: 20 },
  { label: "H2", value: 24 },
  { label: "H1", value: 32 },
  { label: "Title", value: 40 },
  { label: "Display S", value: 56 },
  { label: "Display", value: 72 },
  { label: "Hero", value: 96 },
];

const DEFAULTS = {
  fontId: "jakarta" as FontId,
  weight: 600,
  sizeIndex: 5, // Display S — 56px
  align: "center" as TextAlign,
  color: "#0064FF",
};

const DEFAULT_TEXT = "What will your class build today?";

const GUIDE_COLOR = "rgba(0, 0, 0, 0.16)";
const GUIDE_OVERSHOOT = 40; // px the dashed guides bleed past the box
const CROSS_SIZE = 21;

export interface TryItPreviewHandle {
  /** Load a font + weight into the preview (used by the weight list). */
  tryWeight: (fontId: FontId, weight: number) => void;
}

/**
 * Geist-style "try it" hero: an uncontrolled contentEditable specimen the
 * user can type into, restyled live by the control bar. Controls mutate
 * wrapper styles only — the text node is never re-rendered by React, so
 * the caret survives every control change.
 */
const TryItPreview = forwardRef<TryItPreviewHandle>(function TryItPreview(
  _props,
  ref
) {
  const [fontId, setFontId] = useState<FontId>(DEFAULTS.fontId);
  const [weight, setWeight] = useState(DEFAULTS.weight);
  const [sizeIndex, setSizeIndex] = useState(DEFAULTS.sizeIndex);
  const [align, setAlign] = useState<TextAlign>(DEFAULTS.align);
  const [color, setColor] = useState(DEFAULTS.color);
  const editorRef = useRef<HTMLDivElement>(null);

  const font = getFont(fontId);

  // Switching fonts snaps to the nearest weight the new font actually loads.
  const handleFontChange = useCallback(
    (id: FontId) => {
      const next = getFont(id);
      setFontId(id);
      setWeight((w) =>
        next.weights.reduce((best, cand) =>
          Math.abs(cand.value - w) < Math.abs(best - w) ? cand.value : best,
        next.weights[0].value)
      );
    },
    []
  );

  useImperativeHandle(ref, () => ({
    tryWeight: (id: FontId, w: number) => {
      setFontId(id);
      setWeight(w);
      editorRef.current?.focus();
    },
  }));

  // Strip formatting from pasted content — only plain text enters the specimen.
  const handlePaste = useCallback((e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text/plain");
    document.execCommand("insertText", false, text);
  }, []);

  // contentEditable keeps a stray <br> when emptied, defeating :empty.
  // Clear it so the CSS placeholder can appear.
  const handleInput = useCallback(() => {
    const node = editorRef.current;
    if (node && node.innerText.trim() === "") node.innerHTML = "";
  }, []);

  const handleReset = useCallback(() => {
    setFontId(DEFAULTS.fontId);
    setWeight(DEFAULTS.weight);
    setSizeIndex(DEFAULTS.sizeIndex);
    setAlign(DEFAULTS.align);
    setColor(DEFAULTS.color);
    // User-triggered restore — safe to write the DOM here (not render-driven).
    if (editorRef.current) editorRef.current.innerText = DEFAULT_TEXT;
  }, []);

  return (
    <section aria-label="Typography playground" className="flex flex-col">
      {/* Control bar */}
      <div className="relative z-50 flex items-center justify-center gap-3 px-2 py-4 flex-wrap">
        <FontSwitcher fonts={fonts} activeFontId={fontId} onChange={handleFontChange} />
        <WeightSelect weights={font.weights} value={weight} onChange={setWeight} />
        <AlignToggle align={align} onChange={setAlign} />
        <ColourPicker selectedColor={color} onSelect={setColor} />
        <SizeControl stops={SIZE_STOPS} index={sizeIndex} onChange={setSizeIndex} />
        <button
          type="button"
          onClick={handleReset}
          className="p-2 rounded-md transition-colors hover:opacity-60 cursor-pointer"
          style={{
            background: "var(--card-bg)",
            border: "1px solid var(--card-border)",
            color: "var(--text-secondary)",
          }}
          title="Reset"
        >
          <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
            <path d="M2 7a5 5 0 1 1 1 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            <path d="M2 3v4h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Editable specimen — dashed guides bleed past the box, Geist style */}
      <div className="relative mx-2 mb-2">
        <div
          aria-hidden
          className="pointer-events-none absolute top-0 left-0 right-0"
          style={{
            height: 0,
            borderBottom: `1px dashed ${GUIDE_COLOR}`,
            marginLeft: -GUIDE_OVERSHOOT,
            marginRight: -GUIDE_OVERSHOOT,
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 left-0 right-0"
          style={{
            height: 0,
            borderBottom: `1px dashed ${GUIDE_COLOR}`,
            marginLeft: -GUIDE_OVERSHOOT,
            marginRight: -GUIDE_OVERSHOOT,
          }}
        />
        <CrossMarker style={{ top: -CROSS_SIZE / 2, left: -CROSS_SIZE / 2 }} />
        <CrossMarker style={{ top: -CROSS_SIZE / 2, right: -CROSS_SIZE / 2 }} />
        <CrossMarker style={{ bottom: -CROSS_SIZE / 2, left: -CROSS_SIZE / 2 }} />
        <CrossMarker style={{ bottom: -CROSS_SIZE / 2, right: -CROSS_SIZE / 2 }} />

        <div
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          role="textbox"
          aria-multiline="true"
          aria-label="Editable type specimen — type your own text"
          spellCheck={false}
          data-placeholder="Type something…"
          onPaste={handlePaste}
          onInput={handleInput}
          className="min-h-[240px] w-full px-6 py-10 outline-none cursor-text break-words empty:before:content-[attr(data-placeholder)] empty:before:opacity-25"
          style={{
            fontFamily: font.cssVar,
            fontSize: `min(${SIZE_STOPS[sizeIndex].value}px, 11vw)`,
            fontWeight: weight,
            textAlign: align,
            color,
            lineHeight: 1.15,
            caretColor: "var(--accent)",
          }}
        >
          {DEFAULT_TEXT}
        </div>
      </div>
    </section>
  );
});

export default TryItPreview;

function CrossMarker({ style }: { style?: React.CSSProperties }) {
  return (
    <div
      className="absolute pointer-events-none"
      style={{ width: CROSS_SIZE, height: CROSS_SIZE, ...style }}
    >
      <div
        className="absolute"
        style={{
          left: "50%",
          top: 0,
          width: 0,
          height: CROSS_SIZE,
          borderRight: `1px solid ${GUIDE_COLOR}`,
        }}
      />
      <div
        className="absolute"
        style={{
          top: "50%",
          left: 0,
          width: CROSS_SIZE,
          height: 0,
          borderBottom: `1px solid ${GUIDE_COLOR}`,
        }}
      />
    </div>
  );
}
