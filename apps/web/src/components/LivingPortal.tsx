import { useId } from "react";
import { Pause, Play } from "lucide-react";
import waterfall from "../shala/assets/images/waterfall-nature-v2-img-5327.jpg";
import "../styles/living-portals.css";

// Environmental materials, not sacred geometry. Library marks are review placeholders.
const sanctuaryMaterials = [
  { color: "#bc324e", light: "#ffc3a4", dark: "#260b15" },
  { color: "#72c3dd", light: "#e1f9ff", dark: "#071c25" },
  { color: "#cf8637", light: "#ffe0a4", dark: "#291807" },
  { color: "#88a754", light: "#e6e7af", dark: "#142114" },
];
const durgaMaterials = [
  { color: "#ad1725", light: "#f3d08a", dark: "#25070b" },
  { color: "#76101a", light: "#e8bb62", dark: "#180407" },
  { color: "#ce482c", light: "#ffe0a4", dark: "#2d0809" },
  { color: "#8f1a26", light: "#f4c98a", dark: "#1d0509" },
  { color: "#a52d20", light: "#efc56f", dark: "#210609" },
];
const contours = [
  "M152 20 C187 48 212 40 235 87 C270 138 260 159 274 218 C291 274 265 331 228 375 C198 412 116 423 70 378 C34 350 21 304 28 254 C12 199 37 167 45 124 C51 77 100 52 123 37 C134 29 135 12 152 20 Z",
  "M147 14 C169 45 201 43 228 80 C247 114 251 161 269 191 C284 237 267 276 261 314 C255 364 208 402 154 410 C102 420 58 377 39 335 C18 292 28 245 24 209 C19 164 56 131 63 95 C73 55 124 63 147 14 Z",
  "M147 17 C166 47 187 48 216 81 C246 117 244 146 265 185 C289 237 270 284 259 323 C247 368 207 401 158 411 C102 420 61 389 37 340 C12 292 29 255 28 214 C16 172 43 126 75 96 C105 66 116 28 147 17 Z",
  "M164 20 C174 57 216 63 233 97 C253 134 256 169 269 210 C284 255 269 297 246 341 C223 388 180 413 135 406 C91 399 47 370 33 324 C16 279 32 245 29 204 C24 161 58 136 70 98 C83 62 143 65 164 20 Z",
];
const durgaContours = [
  ...contours,
  "M155 16 C181 43 215 52 233 91 C251 128 250 165 270 204 C289 247 270 297 247 338 C219 386 180 414 130 405 C83 397 45 365 34 320 C20 276 34 239 29 201 C23 157 55 126 73 91 C92 56 132 52 155 16 Z",
];

// Informational forms stay still; motion is reserved for deliberate portal moments.
type PortalTone = "sanctuary" | "durga";

export function LivingForm({ variant, tone = "sanctuary" }: { variant: number; tone?: PortalTone }) {
  return <span className="living-form-art" aria-hidden="true"><LivingPortal variant={variant} tone={tone} /></span>;
}

export function PortalMotionControl({ paused, onToggle }: { paused: boolean; onToggle: () => void }) {
  const Icon = paused ? Play : Pause;
  const label = paused ? "Resume portal motion" : "Pause portal motion";
  return <button className="portal-motion-control" type="button" onClick={onToggle} aria-label={label} title={label}><Icon aria-hidden="true" size={18} /></button>;
}

export function LivingPortal({ variant = 0, tone = "sanctuary" }: { variant?: number; tone?: PortalTone }) {
  const id = useId();
  const materials = tone === "durga" ? durgaMaterials : sanctuaryMaterials;
  const { color, light, dark } = materials[variant % materials.length];
  const availableContours = tone === "durga" ? durgaContours : contours;
  const contour = availableContours[variant % availableContours.length];
  return (
    <svg className={`living-portal living-portal--${variant % 4} living-portal--tone-${tone}`} viewBox="0 0 300 440" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id={`${id}-interior`} cx="48%" cy="50%" r="68%">
          <stop offset="0" stopColor={dark} stopOpacity=".8" />
          <stop offset=".64" stopColor={dark} stopOpacity=".67" />
          <stop offset=".88" stopColor={color} stopOpacity=".18" />
          <stop offset="1" stopColor={light} stopOpacity=".08" />
        </radialGradient>
        <linearGradient id={`${id}-edge`} x1="0" y1="0" x2="1" y2=".85">
          <stop stopColor={light} stopOpacity=".15" />
          <stop offset=".19" stopColor={light} />
          <stop offset=".32" stopColor={color} stopOpacity=".3" />
          <stop offset=".51" stopColor={light} />
          <stop offset=".7" stopColor={color} stopOpacity=".2" />
          <stop offset=".88" stopColor={light} />
          <stop offset="1" stopColor={color} stopOpacity=".3" />
        </linearGradient>
        <filter id={`${id}-refraction`} x="-20%" y="-15%" width="140%" height="130%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency=".022 .037" numOctaves="2" seed={variant + 5} result="flow" />
          <feDisplacementMap in="SourceGraphic" in2="flow" scale="14" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <mask id={`${id}-rim`}>
          <path d={contour} fill="white" />
          <path d={contour} fill="black" transform="translate(37 48) scale(.75 .78)" />
        </mask>
      </defs>
      <path d={contour} fill={`url(#${id}-interior)`} />
      <g className="portal-material" mask={`url(#${id}-rim)`}>
        <image href={waterfall} x={variant === 3 ? -140 : -30} y="0" width="470" height="500" preserveAspectRatio="xMidYMin slice" opacity={variant === 0 || variant === 3 ? ".24" : ".09"} />
        <path d={contour} fill="none" stroke={color} strokeWidth="30" opacity=".12" filter={`url(#${id}-refraction)`} />
      </g>
      <g className="portal-membrane" fill="none" stroke={`url(#${id}-edge)`}>
        <path d={contour} strokeWidth="15" opacity=".12" filter={`url(#${id}-refraction)`} />
        <path d={contour} strokeWidth="5" opacity=".35" filter={`url(#${id}-refraction)`} />
        <path d={contour} strokeWidth="1.4" opacity=".95" />
        <path className="living-portal-waterline" d={contour} strokeWidth="1" opacity=".75" filter={`url(#${id}-refraction)`} />
        <path d={contour} strokeWidth=".7" opacity=".5" transform="translate(10 6) scale(.94 .99)" />
        {[0, 1, 2, 3].map(layer => <path key={layer} d={contour} strokeWidth={layer === 1 ? "1.6" : ".6"} opacity={.65 - layer * .1} transform={`translate(${layer * 3 - 4} ${layer * 2 - 3}) scale(${1.02 - layer * .014} ${1.012 - layer * .006})`} filter={`url(#${id}-refraction)`} />)}
      </g>
      <g className="portal-ribbons" fill="none" stroke={`url(#${id}-edge)`} strokeWidth="1.2">
        <path d="M54 335 C-8 271 50 207 37 158 C22 113 106 75 124 36 C134 14 126 9 138 1 C128 59 189 41 220 80" />
        <path d="M243 104 C291 161 240 208 276 263 C304 305 263 355 228 374 C190 403 171 402 163 436 C171 405 103 414 70 377" transform="translate(0 -2)" />
        <path d="M35 282 C16 240 46 209 36 171 M247 143 C280 191 248 217 270 263 M88 388 C114 404 142 409 167 404" stroke={light} strokeWidth="2.2" opacity=".85" />
      </g>
    </svg>
  );
}
