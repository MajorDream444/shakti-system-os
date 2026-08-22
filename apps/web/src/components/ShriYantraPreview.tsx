type ShriYantraPreviewProps = {
  className?: string;
  title?: string;
};

const upwardTriangles = [
  "120 168 200 34 280 168",
  "134 194 200 70 266 194",
  "112 226 200 104 288 226",
  "146 246 200 134 254 246",
];

const downwardTriangles = [
  "104 112 296 112 200 294",
  "124 82 276 82 200 256",
  "92 148 308 148 200 314",
  "142 126 258 126 200 276",
  "156 96 244 96 200 226",
];

function lotusRing(count: number, radius: number, petalWidth: number, petalHeight: number) {
  return Array.from({ length: count }, (_, index) => {
    const angle = (360 / count) * index;
    return (
      <ellipse
        key={`${count}-${index}`}
        cx="200"
        cy={200 - radius}
        rx={petalWidth}
        ry={petalHeight}
        transform={`rotate(${angle} 200 200)`}
      />
    );
  });
}

export function ShriYantraPreview({
  className = "",
  title = "Shri Yantra geometry",
}: ShriYantraPreviewProps) {
  return (
    <svg
      className={`shri-yantra-preview ${className}`}
      viewBox="0 0 400 400"
      role="img"
      aria-label={title}
    >
      <title>{title}</title>
      <g className="yantra-bhupura">
        <path d="M76 76H324V324H76V76Z" />
        <path d="M186 76H214V46H186V76Z" />
        <path d="M186 324H214V354H186V324Z" />
        <path d="M76 186H46V214H76V186Z" />
        <path d="M324 186H354V214H324V186Z" />
      </g>
      <g className="yantra-lotus yantra-lotus-outer">{lotusRing(16, 132, 12, 32)}</g>
      <g className="yantra-lotus yantra-lotus-inner">{lotusRing(8, 92, 12, 26)}</g>
      <circle className="yantra-circle yantra-circle-outer" cx="200" cy="200" r="142" />
      <circle className="yantra-circle yantra-circle-inner" cx="200" cy="200" r="104" />
      <g className="yantra-triangles yantra-up">
        {upwardTriangles.map((points) => (
          <polygon key={points} points={points} />
        ))}
      </g>
      <g className="yantra-triangles yantra-down">
        {downwardTriangles.map((points) => (
          <polygon key={points} points={points} />
        ))}
      </g>
      <circle className="yantra-bindu" cx="200" cy="200" r="5.5" />
    </svg>
  );
}
