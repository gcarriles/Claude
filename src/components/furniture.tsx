// Little SVG furniture pieces for the houses.
// Every piece is drawn centered on x=0 with its base at y=0, so a room config
// can drop it anywhere with just (x, y). Room space is 400 × 300.

import type { ReactElement } from 'react';

export type FurnitureKind =
  | 'window'
  | 'stringLights'
  | 'floorLamp'
  | 'tableLamp'
  | 'bookshelf'
  | 'shortShelf'
  | 'desk'
  | 'bed'
  | 'couch'
  | 'plant'
  | 'rug'
  | 'catTree'
  | 'bowl'
  | 'catBed'
  | 'vanity'
  | 'recordPlayer'
  | 'frame'
  | 'coffeeTable';

const LINE = '#a0636b';
const WOOD = '#ecc49c';
const WOOD_DARK = '#d29f74';
const CREAM = '#fff4e8';
const PINK = '#f6c3cc';
const PINK_DEEP = '#e895a5';
const LEAF = '#9cc79a';
const LEAF_DARK = '#74a874';
const GLOW = '#ffe3a3';

const s = { stroke: LINE, strokeWidth: 1.6, strokeLinejoin: 'round' as const };

const PIECES: Record<FurnitureKind, () => ReactElement> = {
  window: () => (
    <g>
      <rect x={-48} y={-82} width={96} height={82} rx={8} fill={CREAM} {...s} />
      <rect x={-40} y={-74} width={80} height={66} rx={5} fill="url(#pp-window-sky)" {...s} />
      <line x1={0} y1={-74} x2={0} y2={-8} {...s} />
      <line x1={-40} y1={-41} x2={40} y2={-41} {...s} />
      <path d="M-54 -88 Q-40 -50 -52 -4 L-40 -4 Q-30 -50 -36 -88 Z" fill={PINK} {...s} />
      <path d="M54 -88 Q40 -50 52 -4 L40 -4 Q30 -50 36 -88 Z" fill={PINK} {...s} />
      <rect x={-58} y={-92} width={116} height={6} rx={3} fill={WOOD_DARK} {...s} />
      <rect x={-54} y={-2} width={108} height={7} rx={3} fill={WOOD} {...s} />
    </g>
  ),
  stringLights: () => (
    <g>
      <path d="M-180 0 Q-90 26 0 6 Q90 26 180 0" fill="none" stroke={LINE} strokeWidth={1.2} />
      {[-160, -120, -80, -40, 0, 40, 80, 120, 160].map((x, i) => (
        <circle
          key={x}
          className="pp-bulb"
          style={{ animationDelay: `${i * 0.4}s` }}
          cx={x}
          cy={Math.abs(x) % 80 === 0 ? 12 : 16}
          r={4}
          fill={GLOW}
          stroke={LINE}
          strokeWidth={1}
        />
      ))}
    </g>
  ),
  floorLamp: () => (
    <g>
      <circle className="pp-glow" cx={0} cy={-104} r={46} fill="url(#pp-glow)" />
      <rect x={-2} y={-96} width={4} height={94} fill={WOOD_DARK} {...s} />
      <ellipse cx={0} cy={-2} rx={14} ry={4} fill={WOOD_DARK} {...s} />
      <path d="M-18 -96 L-11 -122 L11 -122 L18 -96 Z" fill={CREAM} {...s} />
    </g>
  ),
  tableLamp: () => (
    <g>
      <circle className="pp-glow" cx={0} cy={-26} r={30} fill="url(#pp-glow)" />
      <rect x={-6} y={-12} width={12} height={12} rx={4} fill={PINK_DEEP} {...s} />
      <path d="M-13 -12 L-8 -30 L8 -30 L13 -12 Z" fill={CREAM} {...s} />
    </g>
  ),
  bookshelf: () => (
    <g>
      <rect x={-36} y={-140} width={72} height={140} rx={4} fill={WOOD} {...s} />
      {[-104, -70, -36].map((y) => (
        <rect key={y} x={-36} y={y} width={72} height={4} fill={WOOD_DARK} />
      ))}
      <Books x={-30} y={-108} />
      <Books x={-30} y={-74} alt />
      <Books x={-30} y={-40} />
      <rect x={-40} y={-144} width={80} height={6} rx={3} fill={WOOD_DARK} {...s} />
    </g>
  ),
  shortShelf: () => (
    <g>
      <rect x={-40} y={-80} width={80} height={80} rx={4} fill={WOOD} {...s} />
      <rect x={-40} y={-42} width={80} height={4} fill={WOOD_DARK} />
      <Books x={-34} y={-46} />
      <Books x={-34} y={-8} alt />
    </g>
  ),
  desk: () => (
    <g>
      <rect x={-50} y={-50} width={100} height={8} rx={3} fill={WOOD} {...s} />
      <rect x={-44} y={-42} width={6} height={42} fill={WOOD_DARK} {...s} />
      <rect x={38} y={-42} width={6} height={42} fill={WOOD_DARK} {...s} />
      <rect x={10} y={-42} width={28} height={22} rx={2} fill={WOOD} {...s} />
      {/* laptop */}
      <path d="M-30 -50 L-26 -76 L8 -76 L4 -50 Z" fill="#ffffff" {...s} />
      <path d="M-27 -54 L-24 -73 L5 -73 L2 -54 Z" fill="var(--ink-light)" />
      <rect x={-36} y={-52} width={46} height={3} rx={1.5} fill="#ffffff" {...s} />
      {/* mug */}
      <rect x={22} y={-62} width={10} height={12} rx={3} fill={PINK} {...s} />
      <path d="M32 -59 q5 2 0 6" fill="none" {...s} />
    </g>
  ),
  bed: () => (
    <g>
      <rect x={-66} y={-70} width={16} height={70} rx={6} fill={WOOD_DARK} {...s} />
      <rect x={-56} y={-36} width={122} height={26} rx={10} fill={CREAM} {...s} />
      <rect x={-20} y={-38} width={86} height={26} rx={10} fill="var(--ink-light)" {...s} />
      <rect x={-50} y={-48} width={30} height={16} rx={8} fill="#ffffff" {...s} />
      <rect x={-56} y={-10} width={122} height={10} rx={3} fill={WOOD} {...s} />
      <circle cx={20} cy={-25} r={3} fill="#ffffff" opacity={0.8} />
      <circle cx={40} cy={-25} r={3} fill="#ffffff" opacity={0.8} />
    </g>
  ),
  couch: () => (
    <g>
      <rect x={-72} y={-62} width={144} height={36} rx={14} fill={PINK} {...s} />
      <rect x={-72} y={-34} width={144} height={26} rx={10} fill={PINK} {...s} />
      <rect x={-80} y={-48} width={20} height={40} rx={9} fill={PINK_DEEP} {...s} />
      <rect x={60} y={-48} width={20} height={40} rx={9} fill={PINK_DEEP} {...s} />
      <rect x={-50} y={-56} width={26} height={20} rx={8} fill="var(--ink-light)" {...s} />
      <rect x={30} y={-56} width={26} height={20} rx={8} fill={CREAM} {...s} />
      <rect x={-70} y={-8} width={6} height={8} fill={WOOD_DARK} />
      <rect x={64} y={-8} width={6} height={8} fill={WOOD_DARK} />
    </g>
  ),
  plant: () => (
    <g>
      <ellipse cx={-10} cy={-40} rx={9} ry={20} fill={LEAF} transform="rotate(-25 -10 -40)" {...s} />
      <ellipse cx={10} cy={-42} rx={9} ry={20} fill={LEAF} transform="rotate(25 10 -42)" {...s} />
      <ellipse cx={0} cy={-50} rx={8} ry={22} fill={LEAF_DARK} {...s} />
      <path d="M-14 -24 L14 -24 L10 0 L-10 0 Z" fill={PINK_DEEP} {...s} />
    </g>
  ),
  rug: () => (
    <g>
      <ellipse cx={0} cy={0} rx={78} ry={18} fill="var(--ink-light)" {...s} />
      <ellipse cx={0} cy={0} rx={60} ry={12} fill="none" stroke="#ffffff" strokeWidth={2} strokeDasharray="4 5" />
    </g>
  ),
  catTree: () => (
    <g>
      <rect x={-34} y={-8} width={68} height={8} rx={3} fill={WOOD} {...s} />
      <rect x={-8} y={-118} width={16} height={110} fill="#e9d6b4" {...s} />
      {[-100, -84, -68, -52, -36, -20].map((y) => (
        <line key={y} x1={-8} y1={y} x2={8} y2={y + 4} stroke={LINE} strokeWidth={0.8} />
      ))}
      <rect x={-30} y={-70} width={44} height={8} rx={4} fill={PINK} {...s} />
      <rect x={-26} y={-126} width={52} height={10} rx={5} fill={PINK} {...s} />
      <circle cx={18} cy={-60} r={5} fill={PINK_DEEP} {...s} />
      <line x1={14} y1={-62} x2={18} y2={-55} stroke={LINE} strokeWidth={1} />
    </g>
  ),
  bowl: () => (
    <g>
      <path d="M-14 -10 L14 -10 L10 0 L-10 0 Z" fill="var(--ink)" {...s} />
      <circle cx={-5} cy={-12} r={2.6} fill={WOOD_DARK} />
      <circle cx={1} cy={-13} r={2.6} fill={WOOD_DARK} />
      <circle cx={6} cy={-11} r={2.6} fill={WOOD_DARK} />
    </g>
  ),
  catBed: () => (
    <g>
      <ellipse cx={0} cy={-8} rx={36} ry={12} fill={PINK_DEEP} {...s} />
      <ellipse cx={0} cy={-11} rx={26} ry={7} fill={CREAM} {...s} />
    </g>
  ),
  vanity: () => (
    <g>
      <ellipse cx={0} cy={-84} rx={22} ry={26} fill={WOOD} {...s} />
      <ellipse cx={0} cy={-84} rx={16} ry={20} fill="#e8f1f7" {...s} />
      <path d="M-8 -96 L-2 -100" stroke="#ffffff" strokeWidth={2} />
      <rect x={-40} y={-52} width={80} height={8} rx={3} fill={CREAM} {...s} />
      <rect x={-36} y={-44} width={72} height={18} rx={3} fill={PINK} {...s} />
      <rect x={-34} y={-26} width={5} height={26} fill={WOOD_DARK} {...s} />
      <rect x={29} y={-26} width={5} height={26} fill={WOOD_DARK} {...s} />
      <rect x={-30} y={-64} width={7} height={12} rx={2} fill="var(--ink-light)" {...s} />
      <rect x={24} y={-60} width={8} height={8} rx={4} fill={PINK_DEEP} {...s} />
    </g>
  ),
  recordPlayer: () => (
    <g>
      <rect x={-38} y={-48} width={76} height={48} rx={5} fill={WOOD} {...s} />
      <rect x={-34} y={-30} width={68} height={4} fill={WOOD_DARK} />
      <rect x={-40} y={-56} width={80} height={8} rx={3} fill={WOOD_DARK} {...s} />
      <ellipse cx={-4} cy={-58} rx={22} ry={5} fill="#3b2f35" {...s} />
      <ellipse cx={-4} cy={-58} rx={6} ry={1.6} fill="var(--ink)" />
      <line x1={24} y1={-64} x2={10} y2={-58} stroke={LINE} strokeWidth={2} />
    </g>
  ),
  frame: () => (
    <g>
      <rect x={-18} y={-40} width={36} height={40} rx={3} fill={WOOD} {...s} />
      <rect x={-13} y={-35} width={26} height={30} rx={2} fill={CREAM} />
      <path d="M0 -14 C-10 -20 -8 -30 0 -25 C8 -30 10 -20 0 -14 Z" fill="var(--ink)" />
    </g>
  ),
  coffeeTable: () => (
    <g>
      <ellipse cx={0} cy={-18} rx={30} ry={7} fill={WOOD} {...s} />
      <rect x={-3} y={-18} width={6} height={18} fill={WOOD_DARK} {...s} />
      <rect x={-6} y={-30} width={10} height={11} rx={3} fill={CREAM} {...s} />
      <path className="pp-steam" d="M-1 -34 q-4 -6 0 -10 q4 -4 0 -10" fill="none" stroke="#ffffff" strokeWidth={1.6} />
    </g>
  ),
};

function Books({ x, y, alt }: { x: number; y: number; alt?: boolean }) {
  const colors = alt
    ? [PINK_DEEP, CREAM, 'var(--ink-light)', LEAF, PINK]
    : ['var(--ink-light)', PINK, LEAF, CREAM, PINK_DEEP];
  let cx = x;
  return (
    <g>
      {colors.map((c, i) => {
        const w = 8 + (i % 2) * 3;
        const h = 24 + ((i * 7) % 8);
        const el = <rect key={i} x={cx} y={y - h + 4} width={w} height={h} rx={1.5} fill={c} {...s} strokeWidth={1} />;
        cx += w + 1.5;
        return el;
      })}
    </g>
  );
}

export function Furniture({ kind, x, y, scale = 1 }: { kind: FurnitureKind; x: number; y: number; scale?: number }) {
  return <g transform={`translate(${x} ${y}) scale(${scale})`}>{PIECES[kind]()}</g>;
}

/** Shared gradients the pieces reference. Render once inside each room <svg>. */
export function FurnitureDefs() {
  return (
    <defs>
      <linearGradient id="pp-window-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#c7a6e6" />
        <stop offset="0.55" stopColor="#f3aac8" />
        <stop offset="1" stopColor="#ffd2b0" />
      </linearGradient>
      <radialGradient id="pp-glow">
        <stop offset="0" stopColor="#fff1c4" stopOpacity="0.95" />
        <stop offset="1" stopColor="#ffe0a0" stopOpacity="0" />
      </radialGradient>
      <pattern id="pp-wallpaper" width="22" height="22" patternUnits="userSpaceOnUse">
        <circle cx="11" cy="11" r="2" fill="#ffffff" opacity="0.55" />
      </pattern>
    </defs>
  );
}
