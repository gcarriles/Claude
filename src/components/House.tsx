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

const spriteUrl = (c: Character) => `${import.meta.env.BASE_URL}art/sprites/${c.id}.png`;

/** Width/height of one sprite frame, or null if the sprite file is missing. */
function useSpriteAspect(c: Character): number | null {
  const [aspect, setAspect] = useState<number | null>(null);
  useEffect(() => {
    setAspect(null);
    const img = new Image();
    img.onload = () => setAspect(img.naturalWidth / c.sprite.frames / img.naturalHeight);
    img.src = spriteUrl(c);
  }, [c]);
  return aspect;
}

interface Props {
  character: Character;
  state: TimerState;
  elapsed: number;
}

export function House({ character: c, state, elapsed }: Props) {
  const station = currentStation(c, state, elapsed);
  const [walking, setWalking] = useState(false);
  const [facingLeft, setFacingLeft] = useState(false);
  const [wiggle, setWiggle] = useState(0);
  const prevX = useRef<number | null>(null);
  const aspect = useSpriteAspect(c);

  // Walk (and face the right way) when moving between spots.
  useEffect(() => {
    const from = prevX.current;
    prevX.current = station.x;
    if (from === null) return;
    if (station.x !== from) setFacingLeft(station.x < from);
    setWalking(true);
    const id = window.setTimeout(() => setWalking(false), WALK_MS);
    return () => window.clearTimeout(id);
  }, [station.x, station.y]);

  // Size: sprites use their configured height; the portrait fallback is a square.
  const size = aspect
    ? { width: `${((c.sprite.height * aspect) / W) * 100}%`, height: `${(c.sprite.height / H) * 100}%` }
    : { width: '22%', height: `${((W * 0.22) / H) * 100}%` };

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
        style={{ ...size, left: `${(station.x / W) * 100}%`, bottom: `${((H - station.y) / H) * 100}%` }}
        onClick={() => setWiggle((n) => n + 1)}
        aria-label={`${c.name} is ${station.activity}`}
      >
        <span className={`bubble${bubbleAlign(station.x)}`} key={station.activity}>
          {station.activity}
        </span>
        <span className={`resident-body${wiggle ? ' wiggle' : ''}`} key={wiggle}>
          {aspect ? (
            <span
              className={`sprite${facingLeft ? ' face-left' : ''}`}
              style={{
                backgroundImage: `url(${spriteUrl(c)})`,
                backgroundSize: `${c.sprite.frames * 100}% 100%`,
                animationTimingFunction: `steps(${c.sprite.frames})`,
                ['--walk-end' as string]: `${(c.sprite.frames / (c.sprite.frames - 1)) * 100}%`,
              }}
            />
          ) : (
            <Portrait character={c} />
          )}
        </span>
        <span className="resident-shadow" />
      </button>
    </div>
  );
}

function Room({ character: c }: { character: Character }) {
  const th = c.house.theme;
  return (
    <svg className="room" viewBox={`0 0 ${W} ${H}`} aria-hidden="true">
      <FurnitureDefs />
      {/* side walls */}
      <path d="M0 0 L28 14 L28 210 L0 296 Z" fill={th.side} />
      <path d="M400 0 L372 14 L372 210 L400 296 Z" fill={th.side} />
      {/* back wall + wallpaper */}
      <rect x={28} y={14} width={344} height={196} fill={th.wall} />
      <rect x={28} y={14} width={344} height={196} fill="url(#pp-wallpaper)" opacity={0.6} />
      <rect x={28} y={150} width={344} height={60} fill={th.band} />
      <rect x={28} y={148} width={344} height={4} fill="#ffffff" opacity={0.45} />
      {/* floor */}
      <path d="M28 210 L372 210 L400 296 L0 296 Z" fill={th.floor} />
      {[230, 252, 276].map((y) => (
        <line key={y} x1={0} y1={y} x2={W} y2={y} stroke={th.floorLine} strokeWidth={1} />
      ))}
      <path d="M28 210 L372 210" stroke="#a0636b" strokeWidth={1.4} opacity={0.4} />
      {/* dollhouse cut edge */}
      <path d="M0 296 L400 296 L400 300 L0 300 Z" fill="#fff" opacity={0.9} />
      <path d="M0 0 L400 0" stroke="#fff" strokeWidth={6} opacity={0.9} />

      {c.house.furniture.map((f, i) => (
        <Furniture key={i} {...f} />
      ))}
      {/* warm light from the window side */}
      <rect x={0} y={0} width={W} height={H} fill="url(#pp-glow)" opacity={0.25} />
    </svg>
  );
}
