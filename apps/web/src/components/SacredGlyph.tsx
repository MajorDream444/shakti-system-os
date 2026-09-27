/* Line glyphs for the five crystal portals.

   Founder direction, 2026-09-27: "Use them sparingly. We don't want it to look
   cartoonish, but with some nice class and taste. One on each, centred at the
   top. Use the Sri Yantra over Shakti, and the other four over the other
   crystals."

   So: thin gold line art, one weight, no fills, no colour of their own — they
   take the crystal's. Held at a small size and low opacity on purpose. These
   are a mark above a title, not illustration.

   The mapping is by meaning rather than decoration:

     Shakti      yantra   the seat of the goddess; her own symbol
     Shadow      spiral   turning inward, the pattern that keeps returning
     Somatics    waves    sensation moving through the nervous system
     Sensuality  lotus    opening, pleasure, the flower that needs the mud
     Sovereignty sun      standing in your own light, dharma

   The yantra here is deliberately NOT the full Sri Yantra in SriYantra.tsx.
   At forty-odd pixels the lotus rings and bhupura collapse into a smudge, so
   this is the core alone — five interlocking triangles and the bindu — which
   still reads as itself at this size. */

import type { ReactNode } from "react";

export type GlyphName = "yantra" | "spiral" | "waves" | "lotus" | "sun";

type SacredGlyphProps = {
  name: GlyphName;
  className?: string;
};

/* An Archimedean spiral, sampled rather than eyeballed, so the turns stay even. */
const spiralPath = (() => {
  const pts: string[] = [];
  const turns = 2.6;
  const steps = 96;
  for (let i = 0; i <= steps; i += 1) {
    const t = (i / steps) * turns * 2 * Math.PI;
    const r = 1.6 + (t / (turns * 2 * Math.PI)) * 15;
    pts.push(`${(24 + Math.cos(t) * r).toFixed(2)} ${(24 + Math.sin(t) * r).toFixed(2)}`);
  }
  return `M ${pts.join(" L ")}`;
})();

/* Eight rays, struck from a common centre so the gaps stay equal. */
const sunRays = (() => {
  const rays: string[] = [];
  for (let i = 0; i < 8; i += 1) {
    const a = (i * 45 - 90) * (Math.PI / 180);
    const inner = 11.5, outer = 18.5;
    rays.push(
      `M ${(24 + Math.cos(a) * inner).toFixed(2)} ${(24 + Math.sin(a) * inner).toFixed(2)} ` +
        `L ${(24 + Math.cos(a) * outer).toFixed(2)} ${(24 + Math.sin(a) * outer).toFixed(2)}`,
    );
  }
  return rays.join(" ");
})();

const GLYPHS: Record<GlyphName, ReactNode> = {
  yantra: (
    <>
      <path d="M24 8 L38 32 L10 32 Z" />
      <path d="M24 40 L10 16 L38 16 Z" />
      <path d="M24 14 L33.5 30 L14.5 30 Z" opacity="0.7" />
      <path d="M24 34 L14.5 18 L33.5 18 Z" opacity="0.7" />
      <circle cx="24" cy="24" r="1.9" fill="currentColor" stroke="none" />
    </>
  ),
  spiral: <path d={spiralPath} />,
  waves: (
    <>
      <path d="M7 18 C12 13, 17 23, 22 18 C27 13, 32 23, 41 18" />
      <path d="M7 25 C12 20, 17 30, 22 25 C27 20, 32 30, 41 25" />
      <path d="M7 32 C12 27, 17 37, 22 32 C27 27, 32 37, 41 32" opacity="0.72" />
    </>
  ),
  lotus: (
    <>
      <path d="M24 9 C28.5 15, 28.5 26, 24 33 C19.5 26, 19.5 15, 24 9 Z" />
      <path d="M24 33 C18 30, 12 23, 11 15 C18 16, 23 24, 24 33 Z" />
      <path d="M24 33 C30 30, 36 23, 37 15 C30 16, 25 24, 24 33 Z" />
      <path d="M24 34 C17 34, 10 30, 7 25 C14 25, 20 29, 24 34 Z" opacity="0.72" />
      <path d="M24 34 C31 34, 38 30, 41 25 C34 25, 28 29, 24 34 Z" opacity="0.72" />
    </>
  ),
  sun: (
    <>
      <circle cx="24" cy="24" r="8" />
      <path d={sunRays} />
    </>
  ),
};

export function SacredGlyph({ name, className }: SacredGlyphProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {GLYPHS[name]}
    </svg>
  );
}
