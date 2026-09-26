/* Sri Yantra, drawn as geometry rather than cropped from a render.

   Founder direction, 2026-09-26: the plain areas of the page — the empty
   right-hand side of the Dancing with Durga band above all — should carry
   sacred symbols floating in the background.

   Drawn rather than sourced for three reasons. It stays sharp at any size,
   it weighs a few kilobytes instead of a megabyte, and its colour can be
   inherited so it sits inside the page's palette instead of dragging a
   render's own lighting in with it.

   HUMAN REVIEW, per the approval rule in SHAKTI-CANONICAL-VOCABULARY.md:
   this is a faithful but simplified Sri Yantra — bindu, nine interlocking
   triangles, the eight- and sixteen-petal lotuses, and the bhupura with its
   four gates. The traditional construction fixes the nine triangles so their
   intersections produce exactly 43 marmas, and that precision is not claimed
   here. It is correct in structure and symmetry, and it is decorative
   background at low opacity. Before it is ever used as a focal devotional
   image, Sheetal should approve the geometry. */

type SriYantraProps = {
  className?: string;
  /** Decorative by default. Give it a label only if it becomes meaningful content. */
  title?: string;
};

const UPWARD: ReadonlyArray<readonly [number, number, number]> = [
  // [apex y, base y, base half-width] — Shiva, pointing up
  [70, 250, 115],
  [95, 285, 95],
  [130, 222, 78],
  [160, 248, 55],
];

const DOWNWARD: ReadonlyArray<readonly [number, number, number]> = [
  // [apex y, base y, base half-width] — Shakti, pointing down
  [330, 150, 115],
  [305, 115, 95],
  [270, 178, 78],
  [240, 152, 55],
  [215, 185, 32],
];

const CENTRE = 200;

function triangle(apexY: number, baseY: number, halfWidth: number) {
  return `M ${CENTRE} ${apexY} L ${CENTRE - halfWidth} ${baseY} L ${CENTRE + halfWidth} ${baseY} Z`;
}

function petalRing(count: number, inner: number, outer: number) {
  const step = 360 / count;
  const spread = (step / 2) * (Math.PI / 180);
  const petals: string[] = [];

  for (let i = 0; i < count; i += 1) {
    const angle = (i * step - 90) * (Math.PI / 180);
    const tipX = CENTRE + Math.cos(angle) * outer;
    const tipY = CENTRE + Math.sin(angle) * outer;
    const leftX = CENTRE + Math.cos(angle - spread) * inner;
    const leftY = CENTRE + Math.sin(angle - spread) * inner;
    const rightX = CENTRE + Math.cos(angle + spread) * inner;
    const rightY = CENTRE + Math.sin(angle + spread) * inner;
    const bulge = (outer - inner) * 0.95;

    petals.push(
      `M ${leftX.toFixed(2)} ${leftY.toFixed(2)} ` +
        `Q ${(tipX + Math.cos(angle - spread) * bulge).toFixed(2)} ${(tipY + Math.sin(angle - spread) * bulge).toFixed(2)} ` +
        `${tipX.toFixed(2)} ${tipY.toFixed(2)} ` +
        `Q ${(tipX + Math.cos(angle + spread) * bulge).toFixed(2)} ${(tipY + Math.sin(angle + spread) * bulge).toFixed(2)} ` +
        `${rightX.toFixed(2)} ${rightY.toFixed(2)}`,
    );
  }

  return petals.join(" ");
}

/* The bhupura: three nested squares, the innermost broken by four gates. */
const GATE = 26;
const EDGE = 372;
const NEAR = 400 - EDGE;

const bhupuraGates = [
  // top
  `M ${NEAR} ${NEAR} L ${CENTRE - GATE} ${NEAR}`,
  `M ${CENTRE + GATE} ${NEAR} L ${EDGE} ${NEAR}`,
  // right
  `M ${EDGE} ${NEAR} L ${EDGE} ${CENTRE - GATE}`,
  `M ${EDGE} ${CENTRE + GATE} L ${EDGE} ${EDGE}`,
  // bottom
  `M ${EDGE} ${EDGE} L ${CENTRE + GATE} ${EDGE}`,
  `M ${CENTRE - GATE} ${EDGE} L ${NEAR} ${EDGE}`,
  // left
  `M ${NEAR} ${EDGE} L ${NEAR} ${CENTRE + GATE}`,
  `M ${NEAR} ${CENTRE - GATE} L ${NEAR} ${NEAR}`,
].join(" ");

export function SriYantra({ className, title }: SriYantraProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 400 400"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinejoin="round"
      role={title ? "img" : "presentation"}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <g className="yantra-bhupura" strokeWidth="1.4">
        <rect x="8" y="8" width="384" height="384" />
        <rect x="18" y="18" width="364" height="364" opacity="0.7" />
        <path d={bhupuraGates} />
      </g>

      <g className="yantra-lotus-sixteen" strokeWidth="0.9" opacity="0.85">
        <circle cx={CENTRE} cy={CENTRE} r="176" />
        <circle cx={CENTRE} cy={CENTRE} r="150" />
        <path d={petalRing(16, 150, 176)} />
      </g>

      <g className="yantra-lotus-eight" strokeWidth="0.9" opacity="0.9">
        <circle cx={CENTRE} cy={CENTRE} r="142" />
        <circle cx={CENTRE} cy={CENTRE} r="116" />
        <path d={petalRing(8, 116, 142)} />
      </g>

      {/* Scaled to sit inside the inner lotus: at full size the outermost
          triangles crossed the petal ring and the two readings fought. */}
      <g className="yantra-triangles" transform={`translate(${CENTRE} ${CENTRE}) scale(0.8) translate(${-CENTRE} ${-CENTRE})`}>
        {UPWARD.map(([apex, base, half]) => (
          <path key={`up-${apex}`} d={triangle(apex, base, half)} />
        ))}
        {DOWNWARD.map(([apex, base, half]) => (
          <path key={`down-${apex}`} d={triangle(apex, base, half)} />
        ))}
      </g>

      <circle className="yantra-bindu" cx={CENTRE} cy={CENTRE} r="4.5" fill="currentColor" stroke="none" />
    </svg>
  );
}
