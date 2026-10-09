import { useEffect, useRef, useState } from 'react';
import { ACTIVITY_EVERY_MIN, type Character, type Station } from '../characters';
import type { TimerState } from '../timer';
import { Furniture, FurnitureDefs } from './furniture';
import { Portrait } from './Portrait';

const W = 400;
const H = 300;
const WALK_MS = 2200;

/** Which spot the character should be at right now. */
function currentStation(c: Character, s: TimerState, elapsed: number): Station {
  const { stations, rest } = c.house;
  if (s.phase !== 'focus') return rest;
  if (s.status === 'idle') return stations[0];
  const idx = Math.floor(elapsed / (ACTIVITY_EVERY_MIN * 60_000)) % stations.length;
  return stations[idx];
}

// Keep the speech bubble inside the room near the walls.
function bubbleAlign(x: number) {
  if (x < W * 0.25) return ' align-left';
  if (x > W * 0.75) return ' align-right';
  return '';
}

interface Props {
  character: Character;
  state: TimerState;
  elapsed: number;
}

export function House({ character: c, state, elapsed }: Props) {
  const station = currentStation(c, state, elapsed);
  const [walking, setWalking] = useState(false);
  const [wiggle, setWiggle] = useState(0);
  const first = useRef(true);

  // Hop while walking between spots.
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    setWalking(true);
    const id = window.setTimeout(() => setWalking(false), WALK_MS);
    return () => window.clearTimeout(id);
  }, [station.x, station.y]);

  // Optional painted house: drop public/art/house-<id>.png in and it replaces the drawn room.
  const [painted, setPainted] = useState(false);
  useEffect(() => {
    setPainted(false);
    const img = new Image();
    img.onload = () => setPainted(true);
    img.src = `${import.meta.env.BASE_URL}art/house-${c.id}.png`;
  }, [c.id]);

  const resting = state.phase !== 'focus';

  return (
    <div className="house">
      {painted ? (
        <img className="house-art" src={`${import.meta.env.BASE_URL}art/house-${c.id}.png`} alt="" />
      ) : (
        <Room character={c} />
      )}

      <button
        className={`resident${walking ? ' is-walking' : ''}${resting ? ' is-resting' : ''}`}
        style={{ left: `${(station.x / W) * 100}%`, bottom: `${((H - station.y) / H) * 100}%` }}
        onClick={() => setWiggle((n) => n + 1)}
        aria-label={`${c.name} is ${station.activity}`}
      >
        <span className={`bubble${bubbleAlign(station.x)}`} key={station.activity}>
          {station.activity}
        </span>
        <span className={`resident-body${wiggle ? ' wiggle' : ''}`} key={wiggle}>
          <Portrait character={c} />
        </span>
        <span className="resident-shadow" />
      </button>
    </div>
  );
}

function Room({ character: c }: { character: Character }) {
  return (
    <svg className="room" viewBox={`0 0 ${W} ${H}`} aria-hidden="true">
      <FurnitureDefs />
      {/* side walls */}
      <path d="M0 0 L28 14 L28 210 L0 296 Z" fill="var(--horizon)" />
      <path d="M0 0 L28 14 L28 210 L0 296 Z" fill="#a0636b" opacity={0.12} />
      <path d="M400 0 L372 14 L372 210 L400 296 Z" fill="var(--horizon)" />
      <path d="M400 0 L372 14 L372 210 L400 296 Z" fill="#a0636b" opacity={0.08} />
      {/* back wall + wallpaper */}
      <rect x={28} y={14} width={344} height={196} fill="var(--horizon)" />
      <rect x={28} y={14} width={344} height={196} fill="url(#pp-wallpaper)" />
      <rect x={28} y={150} width={344} height={60} fill="var(--ink-light)" opacity={0.35} />
      <rect x={28} y={148} width={344} height={4} fill="#ffffff" opacity={0.7} />
      {/* floor */}
      <path d="M28 210 L372 210 L400 296 L0 296 Z" fill="#f0cfa8" />
      {[230, 252, 276].map((y) => (
        <line key={y} x1={0} y1={y} x2={W} y2={y} stroke="#d9ab80" strokeWidth={1} opacity={0.6} />
      ))}
      <path d="M28 210 L372 210" stroke="#a0636b" strokeWidth={1.4} opacity={0.5} />
      {/* dollhouse cut edge */}
      <path d="M0 296 L400 296 L400 300 L0 300 Z" fill="#d29f74" />
      <path d="M0 0 L400 0" stroke="#d29f74" strokeWidth={6} />

      <Furniture kind="stringLights" x={200} y={22} />
      {c.house.furniture.map((f, i) => (
        <Furniture key={i} {...f} />
      ))}
      {/* warm light from the window side */}
      <rect x={0} y={0} width={W} height={H} fill="url(#pp-glow)" opacity={0.25} />
    </svg>
  );
}
