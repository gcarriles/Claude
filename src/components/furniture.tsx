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
  | 'coffeeTable'
  // Danny: neon gaming loft
  | 'ledStrip'
  | 'neonSign'
  | 'neonController'
  | 'loftBed'
  | 'gamingDesk'
  | 'gamingChair'
  | 'pcTower'
  // Mochi: bonsai cat room
  | 'bonsaiTree'
  | 'kitchenette'
  | 'pawRug'
  | 'shootingStar'
  | 'moonWindow'
  | 'moonBed'
  | 'yarnBalls'
  | 'wallClouds'
  // Yuki: blossom cat room
  | 'blossomTree'
  | 'starWindow'
  | 'cloudMat'
  | 'hangingStars'
  // Geneva: coffee + library nook
  | 'archLibrary'
  | 'espressoBar'
  | 'chalkboard'
  | 'lowBookcase'
  | 'globe'
  | 'laptop';

const LINE = '#a0636b';
const WOOD = '#ecc49c';
const WOOD_DARK = '#d29f74';
const CREAM = '#fff4e8';
const PINK = '#f6c3cc';
const PINK_DEEP = '#e895a5';
const LEAF = '#9cc79a';
const LEAF_DARK = '#74a874';
const GLOW = '#ffe3a3';
const TEAL = '#5ef2d6';
const NEON_PINK = '#ff7ad9';
const NIGHT = '#3a2f63';

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

  // ---------- Danny ----------
  ledStrip: () => (
    <g filter="url(#pp-neon)">
      <line x1={-172} y1={0} x2={172} y2={0} stroke={TEAL} strokeWidth={3} strokeLinecap="round" />
    </g>
  ),
  neonSign: () => (
    <g className="pp-neon-flicker">
      <text
        x={0}
        y={0}
        textAnchor="middle"
        fontFamily="Sniglet, sans-serif"
        fontWeight={800}
        fontSize={34}
        fill="none"
        stroke={NEON_PINK}
        strokeWidth={2.2}
        filter="url(#pp-neon)"
      >
        GAMER
      </text>
      <text x={0} y={0} textAnchor="middle" fontFamily="Sniglet, sans-serif" fontWeight={800} fontSize={34} fill="none" stroke="#ffe0f6" strokeWidth={0.8}>
        GAMER
      </text>
    </g>
  ),
  neonController: () => (
    <g filter="url(#pp-neon)" fill="none" stroke={TEAL} strokeWidth={2.2} strokeLinejoin="round">
      <path d="M-26 -12 C-34 -12 -38 4 -32 12 C-28 18 -20 14 -16 6 L16 6 C20 14 28 18 32 12 C38 4 34 -12 26 -12 Z" />
      <path d="M-20 -3 h8 M-16 -7 v8" />
      <circle cx={16} cy={-4} r={2} stroke={NEON_PINK} />
      <circle cx={22} cy={0} r={2} stroke={NEON_PINK} />
    </g>
  ),
  loftBed: () => (
    <g>
      <rect x={-72} y={-112} width={6} height={112} fill={NIGHT} {...s} />
      <rect x={66} y={-112} width={6} height={112} fill={NIGHT} {...s} />
      <rect x={-76} y={-112} width={152} height={10} rx={2} fill={NIGHT} {...s} />
      <line x1={-74} y1={-100} x2={74} y2={-100} stroke={TEAL} strokeWidth={2.5} filter="url(#pp-neon)" />
      <rect x={-64} y={-126} width={100} height={14} rx={5} fill="#a993e0" {...s} />
      <rect x={-60} y={-132} width={26} height={10} rx={4} fill="#e6defa" {...s} />
      <rect x={40} y={-150} width={4} height={38} fill={NIGHT} />
      <rect x={-76} y={-140} width={4} height={28} fill={NIGHT} />
      <line x1={-76} y1={-140} x2={-30} y2={-140} stroke={NIGHT} strokeWidth={3} />
      {/* ladder */}
      {[-90, -70, -50, -30, -10].map((y) => (
        <line key={y} x1={52} y1={y} x2={66} y2={y} stroke={NIGHT} strokeWidth={2.5} />
      ))}
      <line x1={52} y1={-100} x2={52} y2={0} stroke={NIGHT} strokeWidth={3} />
    </g>
  ),
  gamingDesk: () => (
    <g>
      {/* two curved monitors */}
      {[-40, 40].map((x) => (
        <g key={x}>
          <rect x={x - 3} y={-74} width={6} height={22} fill={NIGHT} />
          <path d={`M${x - 36} -110 Q${x} -116 ${x + 36} -110 L${x + 36} -74 Q${x} -80 ${x - 36} -74 Z`} fill="url(#pp-screen)" stroke="#1d1738" strokeWidth={2.5} />
        </g>
      ))}
      <rect x={-84} y={-54} width={168} height={8} rx={2} fill={NIGHT} stroke="#1d1738" strokeWidth={1.6} />
      <rect x={-80} y={-46} width={8} height={46} fill={NIGHT} />
      <rect x={72} y={-46} width={8} height={46} fill={NIGHT} />
      {/* RGB keyboard + mouse */}
      <rect x={-30} y={-60} width={46} height={6} rx={1.5} fill="url(#pp-rgb)" stroke="#1d1738" strokeWidth={1} />
      <ellipse cx={30} cy={-57} rx={5} ry={3} fill={TEAL} stroke="#1d1738" strokeWidth={1} />
      <rect x={-70} y={-66} width={8} height={12} rx={2} fill="#b6e3f5" opacity={0.8} />
    </g>
  ),
  gamingChair: () => (
    <g>
      <rect x={-17} y={-78} width={34} height={44} rx={9} fill="#3a2f63" stroke="#1d1738" strokeWidth={1.8} />
      <rect x={-10} y={-74} width={20} height={36} rx={6} fill={NEON_PINK} opacity={0.35} />
      <rect x={-20} y={-38} width={40} height={10} rx={5} fill="#3a2f63" stroke="#1d1738" strokeWidth={1.8} />
      <rect x={-2} y={-28} width={4} height={18} fill="#1d1738" />
      <path d="M-18 -4 L0 -12 L18 -4" fill="none" stroke="#1d1738" strokeWidth={3} strokeLinecap="round" />
      <circle cx={-18} cy={-2} r={2.5} fill="#1d1738" />
      <circle cx={18} cy={-2} r={2.5} fill="#1d1738" />
    </g>
  ),
  pcTower: () => (
    <g>
      <rect x={-26} y={-84} width={52} height={84} rx={3} fill="#1e2747" stroke="#1d1738" strokeWidth={2} />
      <rect x={-21} y={-78} width={42} height={72} rx={2} fill="#7fe3ff" opacity={0.25} />
      {[-58, -32].map((y) => (
        <circle key={y} className="pp-spin" cx={0} cy={y} r={10} fill="none" stroke={TEAL} strokeWidth={2} strokeDasharray="5 3" filter="url(#pp-neon)" />
      ))}
      <rect x={-16} y={-18} width={32} height={6} rx={2} fill={NEON_PINK} opacity={0.7} />
      <rect x={-30} y={-88} width={60} height={6} rx={2} fill="#2c2550" stroke="#1d1738" strokeWidth={1.5} />
    </g>
  ),

  // ---------- Mochi ----------
  bonsaiTree: () => (
    <g>
      <rect x={-44} y={-12} width={88} height={12} rx={3} fill="#9b6b45" {...s} />
      <rect x={-40} y={-15} width={80} height={5} rx={2} fill={LEAF_DARK} />
      <path d="M-6 -12 C-14 -50 18 -70 4 -110 C-4 -130 10 -140 6 -150 L16 -150 C22 -130 10 -118 18 -100 C30 -70 6 -50 12 -12 Z" fill="#8a6446" {...s} />
      <path d="M8 -92 C-10 -96 -26 -100 -40 -112" fill="none" stroke="#8a6446" strokeWidth={6} strokeLinecap="round" />
      <path d="M10 -70 C26 -72 40 -80 52 -92" fill="none" stroke="#8a6446" strokeWidth={6} strokeLinecap="round" />
      {/* platforms */}
      <ellipse cx={-8} cy={-48} rx={26} ry={6} fill="#c79a6e" {...s} />
      <ellipse cx={20} cy={-150} rx={30} ry={7} fill="#c79a6e" {...s} />
      {/* foliage puffs */}
      {[
        [-46, -118, 22],
        [-24, -132, 20],
        [52, -98, 22],
        [40, -122, 18],
        [-6, -168, 16],
        [44, -170, 16],
      ].map(([x, y, r], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r={r} fill={i % 2 ? '#6fae6a' : '#5c9a5a'} {...s} />
          <circle cx={x - r / 3} cy={y - r / 3} r={r / 3} fill="#9fd08f" />
        </g>
      ))}
      {/* pink blossoms */}
      {[
        [-52, -124],
        [-30, -140],
        [-40, -108],
        [46, -104],
        [58, -92],
        [36, -128],
        [-10, -174],
        [50, -176],
        [40, -164],
      ].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r={3.2} fill="#ffc6dc" stroke={LINE} strokeWidth={0.6} />
          <circle cx={x} cy={y} r={1} fill="#fff3c4" />
        </g>
      ))}
      {/* tiny glowing stars hung in the branches */}
      {[
        [-60, -96],
        [62, -76],
        [-20, -112],
      ].map(([x, y], i) => (
        <g key={i} className="pp-dangle" style={{ animationDelay: `${i * 0.7}s` }}>
          <line x1={x} y1={y - 16} x2={x} y2={y} stroke="#e0b44a" strokeWidth={0.8} />
          <path transform={`translate(${x} ${y})`} d="M0 -6 l1.8 3.7 4 .6 -2.9 2.8 .7 4 -3.6 -1.9 -3.6 1.9 .7 -4 -2.9 -2.8 4 -.6 Z" fill={GLOW} stroke="#e0b44a" strokeWidth={0.8} />
        </g>
      ))}
      <path d="M-46 -96 l0 18" stroke={LINE} strokeWidth={1} />
      <circle cx={-46} cy={-76} r={4} fill="#7fb6ff" {...s} />
    </g>
  ),
  kitchenette: () => (
    <g>
      {/* shelf with bowls */}
      <rect x={-50} y={-122} width={100} height={6} rx={2} fill={WOOD} {...s} />
      {[-36, -16, 6, 28].map((x, i) => (
        <path key={x} d={`M${x - 8} -130 h16 l-3 8 h-10 Z`} fill={['#b9d4f5', PINK, '#d9c6f2', '#fde2a8'][i]} {...s} strokeWidth={1.1} />
      ))}
      <rect x={-50} y={-100} width={100} height={6} rx={2} fill={WOOD} {...s} />
      <rect x={-34} y={-112} width={12} height={12} rx={3} fill="#fff" {...s} strokeWidth={1.1} />
      <rect x={10} y={-112} width={14} height={12} rx={3} fill="#b9d4f5" {...s} strokeWidth={1.1} />
      {/* counter */}
      <rect x={-54} y={-58} width={108} height={58} rx={4} fill="#cfe0f5" {...s} />
      <rect x={-48} y={-46} width={44} height={38} rx={3} fill="#dbe8f8" {...s} strokeWidth={1.1} />
      <rect x={4} y={-46} width={44} height={38} rx={3} fill="#2f2f3a" {...s} strokeWidth={1.1} />
      <rect x={10} y={-40} width={32} height={22} rx={2} fill="#4a4a5a" />
      <rect x={-58} y={-64} width={116} height={8} rx={3} fill={PINK} {...s} />
      <ellipse cx={-24} cy={-64} rx={16} ry={3} fill="#9cc7ef" {...s} strokeWidth={1.1} />
      <path d="M-24 -66 v-10 h8" fill="none" stroke="#9aa6b8" strokeWidth={2.5} />
      <circle cx={24} cy={-66} r={7} fill="#2f2f3a" {...s} />
    </g>
  ),
  pawRug: () => (
    <g>
      <ellipse cx={0} cy={0} rx={44} ry={13} fill="#fff1d6" {...s} />
      <ellipse cx={0} cy={3} rx={13} ry={6} fill={PINK_DEEP} />
      {[-20, -7, 7, 20].map((x, i) => (
        <ellipse key={x} cx={x} cy={i === 0 || i === 3 ? -4 : -7} rx={5} ry={3} fill={PINK_DEEP} />
      ))}
    </g>
  ),
  moonWindow: () => (
    <g>
      <circle cx={0} cy={-40} r={40} fill={WOOD} {...s} />
      <circle cx={0} cy={-40} r={33} fill="url(#pp-night)" {...s} />
      <circle className="pp-glow" cx={6} cy={-46} r={20} fill="url(#pp-glow)" />
      <circle cx={6} cy={-46} r={13} fill="#fff3c4" stroke="#e0b44a" strokeWidth={1} />
      <circle cx={13} cy={-50} r={11} fill="#2a2d70" />
      {[
        [-18, -56],
        [-10, -24],
        [20, -30],
        [-22, -38],
        [18, -58],
      ].map(([x, y], i) => (
        <circle key={i} className="pp-bulb" style={{ animationDelay: `${i * 0.5}s` }} cx={x} cy={y} r={1.5} fill="#fff" />
      ))}
      <path d="M-33 -30 q10 -8 20 -2 q8 -6 18 0 q8 -4 28 4 L30 -18 A33 33 0 0 1 -30 -18 Z" fill="#cfd8f2" opacity={0.9} />
      <line x1={-33} y1={-40} x2={33} y2={-40} stroke={WOOD} strokeWidth={2.5} />
      <line x1={0} y1={-73} x2={0} y2={-7} stroke={WOOD} strokeWidth={2.5} />
    </g>
  ),
  moonBed: () => (
    <g>
      <path d="M-40 -6 C-40 -40 0 -52 26 -40 C4 -36 -14 -22 -12 -6 Z" fill="#fff3c4" {...s} />
      <ellipse cx={0} cy={-6} rx={42} ry={10} fill="#b9c6ee" {...s} />
      <ellipse cx={4} cy={-9} rx={30} ry={6} fill="#e8edfb" {...s} strokeWidth={1.1} />
      <circle cx={-22} cy={-30} r={2} fill="#e0b44a" />
      <circle cx={-10} cy={-38} r={1.6} fill="#e0b44a" />
    </g>
  ),
  yarnBalls: () => (
    <g>
      {[
        [-12, -9, 9, PINK_DEEP],
        [8, -8, 8, '#b9a4ec'],
      ].map(([x, y, r, c], i) => (
        <g key={i}>
          <circle cx={x as number} cy={y as number} r={r as number} fill={c as string} {...s} />
          <path d={`M${(x as number) - 6} ${(y as number) - 3} q6 4 12 0 M${(x as number) - 5} ${(y as number) + 3} q5 -5 10 -1`} fill="none" stroke="#fff" strokeWidth={1} opacity={0.7} />
        </g>
      ))}
      <path d="M16 -6 q14 4 22 0" fill="none" stroke="#b9a4ec" strokeWidth={1.4} />
    </g>
  ),
  wallClouds: () => (
    <g fill="#fff" opacity={0.75}>
      {[
        [-150, 0],
        [-40, 24],
        [80, -6],
      ].map(([x, y], i) => (
        <path key={i} transform={`translate(${x} ${y})`} d="M-18 0 C-24 0 -24 -9 -16 -9 C-14 -16 -2 -17 1 -10 C6 -15 16 -12 15 -5 C22 -5 22 0 16 0 Z" />
      ))}
    </g>
  ),
  shootingStar: () => (
    <g>
      <path d="M-40 10 Q-10 -6 14 -10" fill="none" stroke="url(#pp-rainbow)" strokeWidth={6} strokeLinecap="round" opacity={0.8} />
      <path d="M18 -20 l3.5 7 7.7 1.1 -5.6 5.4 1.3 7.7 -6.9 -3.6 -6.9 3.6 1.3 -7.7 -5.6 -5.4 7.7 -1.1 Z" fill={GLOW} stroke="#e0b44a" strokeWidth={1} />
    </g>
  ),

  // ---------- Yuki ----------
  blossomTree: () => (
    <g>
      <ellipse cx={0} cy={-8} rx={56} ry={12} fill="#f9d2e0" {...s} />
      <path d="M-10 -12 C-14 -60 6 -90 -4 -140 L10 -140 C18 -96 6 -60 12 -12 Z" fill="#b8a3a8" {...s} />
      <ellipse cx={-30} cy={-56} rx={24} ry={6} fill="#f6c7d8" {...s} />
      <ellipse cx={30} cy={-104} rx={24} ry={6} fill="#f6c7d8" {...s} />
      <ellipse cx={0} cy={-176} rx={30} ry={7} fill="#f6c7d8" {...s} />
      {[
        [-40, -140, 24],
        [-14, -164, 22],
        [26, -162, 22],
        [48, -134, 20],
        [-50, -100, 18],
        [8, -130, 18],
      ].map(([x, y, r], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r={r} fill={i % 2 ? '#f7b8cf' : '#fbcfe0'} {...s} />
          <circle cx={x - r / 3} cy={y - r / 3} r={r / 3} fill="#fff0f6" />
        </g>
      ))}
      {[
        [-58, -80],
        [56, -92],
        [-22, -96],
      ].map(([x, y], i) => (
        <g key={i} className="pp-dangle" style={{ animationDelay: `${i * 0.6}s` }}>
          <line x1={x} y1={y - 22} x2={x} y2={y} stroke="#e0b44a" strokeWidth={0.8} />
          <path transform={`translate(${x} ${y})`} d="M0 -6 l1.8 3.7 4 .6 -2.9 2.8 .7 4 -3.6 -1.9 -3.6 1.9 .7 -4 -2.9 -2.8 4 -.6 Z" fill={GLOW} stroke="#e0b44a" strokeWidth={0.8} />
        </g>
      ))}
    </g>
  ),
  starWindow: () => (
    <g>
      <path d="M-34 0 L-34 -70 A34 34 0 0 1 34 -70 L34 0 Z" fill="#c9b8e8" {...s} />
      <path d="M-27 -6 L-27 -70 A27 27 0 0 1 27 -70 L27 -6 Z" fill="url(#pp-night)" {...s} />
      {[
        [-12, -84],
        [10, -70],
        [-4, -52],
        [14, -94],
        [-16, -40],
      ].map(([x, y], i) => (
        <circle key={i} className="pp-bulb" style={{ animationDelay: `${i * 0.5}s` }} cx={x} cy={y} r={1.6} fill="#fff" />
      ))}
      <path d="M-27 -14 q8 -10 18 -4 q8 -8 18 0 q6 -4 18 2 L27 -6 L-27 -6 Z" fill="#f6c7d8" />
      <rect x={-38} y={-4} width={76} height={6} rx={3} fill="#c9b8e8" {...s} />
    </g>
  ),
  cloudMat: () => (
    <g>
      <path d="M-46 4 C-56 4 -56 -10 -44 -10 C-42 -18 -26 -20 -20 -12 C-14 -20 6 -20 10 -12 C16 -20 34 -18 36 -10 C50 -10 52 4 40 4 Z" fill="#fff" {...s} />
      {[-26, 0, 26].map((x) => (
        <g key={x}>
          <path d={`M${x - 10} -12 h20 l-3 8 h-14 Z`} fill="#f3c69a" {...s} strokeWidth={1.1} />
          <ellipse cx={x} cy={-12} rx={7} ry={2} fill={WOOD_DARK} />
        </g>
      ))}
    </g>
  ),
  hangingStars: () => (
    <g>
      {[-150, -110, -60, 60, 110, 150].map((x, i) => {
        const y = 14 + (i % 3) * 10;
        return (
          <g key={x} className="pp-dangle" style={{ animationDelay: `${i * 0.4}s` }}>
            <line x1={x} y1={0} x2={x} y2={y} stroke="#e0b44a" strokeWidth={0.8} />
            <path transform={`translate(${x} ${y + 5})`} d="M0 -6 l1.8 3.7 4 .6 -2.9 2.8 .7 4 -3.6 -1.9 -3.6 1.9 .7 -4 -2.9 -2.8 4 -.6 Z" fill={GLOW} stroke="#e0b44a" strokeWidth={0.8} />
          </g>
        );
      })}
    </g>
  ),

  // ---------- Geneva ----------
  archLibrary: () => (
    <g>
      <path d="M-82 0 L-82 -118 A82 82 0 0 1 82 -118 L82 0 Z" fill="#e9a3a6" {...s} />
      <path d="M-66 0 L-66 -118 A66 66 0 0 1 66 -118 L66 0 Z" fill="#f8dcd8" {...s} />
      {[-150, -116, -82].map((y) => (
        <g key={y}>
          <rect x={-62} y={y} width={124} height={4} fill={WOOD_DARK} />
        </g>
      ))}
      <Books x={-58} y={-150} />
      <Books x={10} y={-150} alt />
      <Books x={-58} y={-116} alt />
      <Books x={14} y={-116} />
      <Books x={-58} y={-82} />
      <circle className="pp-glow" cx={0} cy={-100} r={44} fill="url(#pp-glow)" />
      <path d="M-8 -82 L-5 -98 L5 -98 L8 -82 Z" fill={CREAM} {...s} strokeWidth={1.1} />
      {/* reading nook seat + cushions */}
      <rect x={-64} y={-34} width={128} height={34} rx={4} fill={WOOD} {...s} />
      <rect x={-60} y={-46} width={120} height={14} rx={7} fill={CREAM} {...s} />
      <circle cx={-34} cy={-52} r={13} fill="#f3d4f0" {...s} />
      <circle cx={-8} cy={-52} r={13} fill="#d9e9fb" {...s} />
      <circle cx={34} cy={-52} r={12} fill={PINK} {...s} />
    </g>
  ),
  espressoBar: () => (
    <g>
      {/* shelves: coffee bags + mugs */}
      <rect x={-56} y={-150} width={112} height={6} rx={2} fill={WOOD_DARK} {...s} />
      {[
        ['#d9a46c', -44],
        ['#c99be6', -28],
        ['#8fcf8f', -12],
      ].map(([c, x]) => (
        <path key={x as number} d={`M${x} -150 v-18 l3 -4 h8 l3 4 v18 Z`} fill={c as string} {...s} strokeWidth={1.1} />
      ))}
      <rect x={-56} y={-118} width={112} height={6} rx={2} fill={WOOD_DARK} {...s} />
      {[-44, -28, -12, 4].map((x, i) => (
        <rect key={x} x={x} y={-130} width={11} height={12} rx={3} fill={i % 2 ? PINK : '#fff'} {...s} strokeWidth={1.1} />
      ))}
      {/* counter */}
      <rect x={-58} y={-58} width={116} height={58} rx={3} fill="#8a5a3c" {...s} />
      <rect x={-52} y={-50} width={32} height={42} rx={2} fill="#9d6a48" {...s} strokeWidth={1.1} />
      <rect x={-16} y={-50} width={32} height={42} rx={2} fill="#9d6a48" {...s} strokeWidth={1.1} />
      <rect x={20} y={-50} width={32} height={18} rx={2} fill="#9d6a48" {...s} strokeWidth={1.1} />
      <rect x={20} y={-28} width={32} height={20} rx={2} fill="#9d6a48" {...s} strokeWidth={1.1} />
      <rect x={-62} y={-64} width={124} height={8} rx={2} fill="#3b3540" {...s} />
      {/* espresso machine */}
      <rect x={-50} y={-100} width={44} height={36} rx={4} fill="#e8eaef" {...s} />
      <rect x={-46} y={-108} width={36} height={8} rx={2} fill="#cfd3dc" {...s} strokeWidth={1.1} />
      {[-42, -32, -22].map((x) => (
        <rect key={x} x={x} y={-115} width={8} height={7} rx={2} fill="#fff" {...s} strokeWidth={0.9} />
      ))}
      <rect x={-40} y={-80} width={24} height={4} fill="#3b3540" />
      <path className="pp-steam" d="M-28 -72 q-3 -5 0 -9" fill="none" stroke="#fff" strokeWidth={1.4} />
      {/* grinder */}
      <rect x={6} y={-96} width={22} height={32} rx={3} fill="#3b3540" {...s} />
      <path d="M8 -96 L4 -116 L30 -116 L26 -96 Z" fill="#c8d6e6" opacity={0.9} {...s} />
    </g>
  ),
  chalkboard: () => (
    <g>
      <rect x={-26} y={-64} width={52} height={64} rx={3} fill="#8a5a3c" {...s} />
      <rect x={-21} y={-59} width={42} height={54} rx={2} fill="#33363b" />
      <text x={0} y={-46} textAnchor="middle" fontFamily="Bubblegum Sans, cursive" fontSize={9} fill="#fff">
        Coffee
      </text>
      {[-36, -28, -20, -12].map((y) => (
        <line key={y} x1={-14} y1={y} x2={10 - (y % 3) * 3} y2={y} stroke="#fff" strokeWidth={1} opacity={0.7} />
      ))}
    </g>
  ),
  lowBookcase: () => (
    <g>
      <rect x={-34} y={-58} width={68} height={58} rx={3} fill={WOOD} {...s} />
      <rect x={-34} y={-30} width={68} height={3} fill={WOOD_DARK} />
      <Books x={-30} y={-31} />
      <Books x={-30} y={-3} alt />
      <rect x={-38} y={-62} width={76} height={6} rx={2} fill={WOOD_DARK} {...s} />
    </g>
  ),
  globe: () => (
    <g>
      <path d="M-8 0 h16 l-3 -6 h-10 Z" fill={WOOD_DARK} {...s} strokeWidth={1.1} />
      <line x1={0} y1={-6} x2={0} y2={-12} stroke={LINE} strokeWidth={2} />
      <circle cx={0} cy={-24} r={13} fill="#8ccfc4" {...s} />
      <path d="M-7 -30 q4 -4 8 0 q2 6 -4 8 Z M3 -18 q5 -2 6 3" fill="#9ccf86" />
      <path d="M-14 -24 A14 14 0 0 0 0 -10" fill="none" stroke={WOOD_DARK} strokeWidth={1.6} />
    </g>
  ),
  laptop: () => (
    <g>
      <path d="M-18 0 L-15 -22 L13 -22 L10 0 Z" fill="#fff" {...s} />
      <path d="M-15 -4 L-13 -19 L11 -19 L9 -4 Z" fill="var(--ink-light)" />
      <rect x={-22} y={-2} width={40} height={3} rx={1.5} fill="#fff" {...s} />
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
      <linearGradient id="pp-screen" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#3b2a8a" />
        <stop offset="0.5" stopColor="#c86ee8" />
        <stop offset="1" stopColor="#4fd8e8" />
      </linearGradient>
      <linearGradient id="pp-rgb" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#ff6b9a" />
        <stop offset="0.25" stopColor="#ffd86b" />
        <stop offset="0.5" stopColor="#6bff9a" />
        <stop offset="0.75" stopColor="#6bc8ff" />
        <stop offset="1" stopColor="#c86bff" />
      </linearGradient>
      <linearGradient id="pp-rainbow" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#ffffff" stopOpacity="0" />
        <stop offset="0.4" stopColor="#b8e0ff" />
        <stop offset="1" stopColor="#ffd2f0" />
      </linearGradient>
      <linearGradient id="pp-night" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#1f2466" />
        <stop offset="1" stopColor="#6a5aa8" />
      </linearGradient>
      <filter id="pp-neon" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="2.4" result="b" />
        <feMerge>
          <feMergeNode in="b" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <pattern id="pp-wallpaper" width="22" height="22" patternUnits="userSpaceOnUse">
        <circle cx="11" cy="11" r="2" fill="#ffffff" opacity="0.55" />
      </pattern>
    </defs>
  );
}
