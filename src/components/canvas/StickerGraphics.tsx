"use client";

/**
 * Die-cut sticker SVG graphics.
 * Each sticker is an illustrated SVG with:
 * - A white background fill that follows the graphic outline (die-cut effect)
 * - A thin light-grey stroke for the cut border
 * - Colorful illustrated graphic on top
 */

interface StickerSVGProps {
  size: number;
}

// Butterfly — blue wings with black outline
export function ButterflySticker({ size }: StickerSVGProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
      {/* Die-cut white border */}
      <path
        d="M40 12C28 4 10 8 8 24C6 36 16 44 28 40C20 48 18 62 28 70C36 76 48 72 52 64C56 72 68 76 72 68C78 58 68 48 56 40C68 44 78 36 76 24C74 8 56 4 40 12Z"
        fill="white"
        stroke="#E0E0E0"
        strokeWidth="1.5"
      />
      {/* Left wing */}
      <path
        d="M38 18C28 10 14 14 12 26C10 36 18 42 28 38L38 30Z"
        fill="#3B82F6"
        stroke="#1D4ED8"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* Right wing */}
      <path
        d="M42 18C52 10 66 14 68 26C70 36 62 42 52 38L42 30Z"
        fill="#3B82F6"
        stroke="#1D4ED8"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* Bottom left wing */}
      <path
        d="M36 36C24 44 22 58 30 66C36 72 44 68 46 58L38 42Z"
        fill="#60A5FA"
        stroke="#1D4ED8"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* Bottom right wing */}
      <path
        d="M44 36C56 44 58 58 50 66C44 72 36 68 34 58L42 42Z"
        fill="#60A5FA"
        stroke="#1D4ED8"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* Body */}
      <ellipse cx="40" cy="40" rx="3" ry="16" fill="#1E293B" />
      {/* Antennae */}
      <path d="M38 26C34 18 30 14 28 12" stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M42 26C46 18 50 14 52 12" stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="28" cy="12" r="2" fill="#1E293B" />
      <circle cx="52" cy="12" r="2" fill="#1E293B" />
    </svg>
  );
}

// Lightning bolt — yellow with orange outline
export function LightningSticker({ size }: StickerSVGProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
      {/* Die-cut white border */}
      <path
        d="M50 4L18 42H34L26 76L62 34H44L50 4Z"
        fill="white"
        stroke="#E0E0E0"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* Lightning */}
      <path
        d="M48 8L22 42H36L28 72L58 36H44L48 8Z"
        fill="#FBBF24"
        stroke="#F59E0B"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* Sunglasses on top */}
      <circle cx="35" cy="30" r="5" fill="#1E293B" />
      <circle cx="47" cy="30" r="5" fill="#1E293B" />
      <path d="M40 30H42" stroke="#1E293B" strokeWidth="2" />
      <path d="M30 28L26 26" stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M52 28L56 26" stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round" />
      {/* Glare */}
      <rect x="33" y="28" width="2" height="2" rx="0.5" fill="white" />
      <rect x="45" y="28" width="2" height="2" rx="0.5" fill="white" />
    </svg>
  );
}

// Cloud — white fluffy cloud
export function CloudSticker({ size }: StickerSVGProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
      {/* Die-cut white border */}
      <path
        d="M18 54C10 54 4 48 4 40C4 34 8 28 14 26C14 16 22 8 32 8C38 8 44 12 48 16C50 14 54 12 58 12C66 12 72 18 72 26C76 28 78 32 78 38C78 46 72 52 64 54Z"
        fill="white"
        stroke="#E0E0E0"
        strokeWidth="1.5"
      />
      {/* Cloud body */}
      <path
        d="M20 50C14 50 8 46 8 40C8 34 12 30 16 28C16 20 24 12 32 12C38 12 42 14 46 18C48 16 52 14 56 14C64 14 70 20 70 28C74 30 76 34 76 38C76 44 72 50 64 50Z"
        fill="#F1F5F9"
        stroke="#CBD5E1"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* Cute face */}
      <circle cx="34" cy="36" r="2.5" fill="#1E293B" />
      <circle cx="48" cy="36" r="2.5" fill="#1E293B" />
      {/* Blush */}
      <ellipse cx="28" cy="42" rx="4" ry="2.5" fill="#FECACA" opacity="0.6" />
      <ellipse cx="54" cy="42" rx="4" ry="2.5" fill="#FECACA" opacity="0.6" />
      {/* Smile */}
      <path d="M36 42C38 46 44 46 46 42" stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

// Star — yellow 5-pointed star
export function StarSticker({ size }: StickerSVGProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
      {/* Die-cut white border */}
      <path
        d="M40 4L48 28H74L54 44L60 70L40 54L20 70L26 44L6 28H32Z"
        fill="white"
        stroke="#E0E0E0"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* Star body */}
      <path
        d="M40 8L47 28H70L52 42L58 66L40 52L22 66L28 42L10 28H33Z"
        fill="#FBBF24"
        stroke="#F59E0B"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* Cute face */}
      <circle cx="34" cy="34" r="2" fill="#92400E" />
      <circle cx="46" cy="34" r="2" fill="#92400E" />
      {/* Happy smile */}
      <path d="M36 40C38 43 42 43 44 40" stroke="#92400E" strokeWidth="1.5" strokeLinecap="round" />
      {/* Sparkle dots */}
      <circle cx="33" cy="33" r="0.8" fill="white" />
      <circle cx="45" cy="33" r="0.8" fill="white" />
    </svg>
  );
}

// Heart — pink/red heart
export function HeartSticker({ size }: StickerSVGProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
      {/* Die-cut white border */}
      <path
        d="M40 72C38 72 4 50 4 26C4 14 12 4 24 4C32 4 38 10 40 14C42 10 48 4 56 4C68 4 76 14 76 26C76 50 42 72 40 72Z"
        fill="white"
        stroke="#E0E0E0"
        strokeWidth="1.5"
      />
      {/* Heart */}
      <path
        d="M40 68C38 68 8 48 8 28C8 16 16 8 26 8C32 8 38 12 40 18C42 12 48 8 54 8C64 8 72 16 72 28C72 48 42 68 40 68Z"
        fill="#F43F5E"
        stroke="#E11D48"
        strokeWidth="1.5"
      />
      {/* Shine */}
      <ellipse cx="26" cy="26" rx="6" ry="8" fill="white" opacity="0.3" transform="rotate(-20 26 26)" />
    </svg>
  );
}

// Smiley — big pink circle face
export function SmileySticker({ size }: StickerSVGProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
      {/* Die-cut white border */}
      <circle cx="40" cy="40" r="36" fill="white" stroke="#E0E0E0" strokeWidth="1.5" />
      {/* Face */}
      <circle cx="40" cy="40" r="32" fill="#F9A8D4" stroke="#EC4899" strokeWidth="1.5" />
      {/* Eyes */}
      <circle cx="30" cy="34" r="4" fill="#1E293B" />
      <circle cx="50" cy="34" r="4" fill="#1E293B" />
      {/* Eye glints */}
      <circle cx="31.5" cy="32.5" r="1.5" fill="white" />
      <circle cx="51.5" cy="32.5" r="1.5" fill="white" />
      {/* Big grin */}
      <path d="M26 44C30 54 50 54 54 44" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
      {/* Tongue */}
      <path d="M36 50C38 54 42 54 44 50" fill="#F43F5E" />
    </svg>
  );
}

// Flower — simple daisy
export function FlowerSticker({ size }: StickerSVGProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
      {/* Die-cut white border — petal outline */}
      <path
        d="M40 4C44 12 52 14 56 8C60 14 64 22 58 28C66 26 74 30 72 38C74 44 68 50 60 48C64 56 60 64 52 62C50 68 44 74 40 68C36 74 30 68 28 62C20 64 16 56 20 48C12 50 6 44 8 38C6 30 14 26 22 28C16 22 20 14 24 8C28 14 36 12 40 4Z"
        fill="white"
        stroke="#E0E0E0"
        strokeWidth="1.5"
      />
      {/* Petals */}
      <ellipse cx="40" cy="16" rx="8" ry="12" fill="#FDE68A" stroke="#FCD34D" strokeWidth="1" />
      <ellipse cx="40" cy="16" rx="8" ry="12" fill="#FDE68A" stroke="#FCD34D" strokeWidth="1" transform="rotate(60 40 40)" />
      <ellipse cx="40" cy="16" rx="8" ry="12" fill="#FDE68A" stroke="#FCD34D" strokeWidth="1" transform="rotate(120 40 40)" />
      <ellipse cx="40" cy="16" rx="8" ry="12" fill="#FDE68A" stroke="#FCD34D" strokeWidth="1" transform="rotate(180 40 40)" />
      <ellipse cx="40" cy="16" rx="8" ry="12" fill="#FDE68A" stroke="#FCD34D" strokeWidth="1" transform="rotate(240 40 40)" />
      <ellipse cx="40" cy="16" rx="8" ry="12" fill="#FDE68A" stroke="#FCD34D" strokeWidth="1" transform="rotate(300 40 40)" />
      {/* Center */}
      <circle cx="40" cy="40" r="10" fill="#F59E0B" stroke="#D97706" strokeWidth="1" />
      {/* Face */}
      <circle cx="36" cy="38" r="1.5" fill="#92400E" />
      <circle cx="44" cy="38" r="1.5" fill="#92400E" />
      <path d="M37 43C38 45 42 45 43 43" stroke="#92400E" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

// Thumbs up — hand gesture
export function ThumbsUpSticker({ size }: StickerSVGProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
      {/* Die-cut white border */}
      <path
        d="M22 74C16 74 12 70 12 64V44C12 38 16 34 22 34H28L34 10C36 4 44 4 46 10L42 34H62C68 34 74 40 72 46L66 70C64 74 60 76 56 76Z"
        fill="white"
        stroke="#E0E0E0"
        strokeWidth="1.5"
      />
      {/* Hand */}
      <path
        d="M24 72C18 72 16 68 16 64V46C16 40 18 36 24 36H30L36 14C38 8 42 8 44 14L40 36H60C66 36 70 42 68 48L64 68C62 72 58 74 54 74Z"
        fill="#FBBF24"
        stroke="#F59E0B"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* Thumb highlight */}
      <path d="M36 20L38 36" stroke="#F59E0B" strokeWidth="1" opacity="0.5" />
      {/* Wrist line */}
      <path d="M30 36V72" stroke="#F59E0B" strokeWidth="1.5" />
      {/* Finger lines */}
      <path d="M42 42H62" stroke="#F59E0B" strokeWidth="1" opacity="0.5" />
      <path d="M42 50H60" stroke="#F59E0B" strokeWidth="1" opacity="0.5" />
      <path d="M42 58H58" stroke="#F59E0B" strokeWidth="1" opacity="0.5" />
    </svg>
  );
}

// Map sticker IDs to their SVG components
export const STICKER_COMPONENTS: Record<string, React.ComponentType<StickerSVGProps>> = {
  "sticker-butterfly": ButterflySticker,
  "sticker-lightning": LightningSticker,
  "sticker-cloud": CloudSticker,
  "sticker-star": StarSticker,
  "sticker-heart": HeartSticker,
  "sticker-smiley": SmileySticker,
  "sticker-flower": FlowerSticker,
  "sticker-thumbsup": ThumbsUpSticker,
};
