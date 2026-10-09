import { useEffect, useRef, useState } from 'react';
import { ACTIVITY_EVERY_MIN, type Character, type Station } from '../characters';
import type { TimerState } from '../timer';
import { Portrait } from './Portrait';

// Room space: the house art is shown at 4:3 and spots are given in 400 × 300 units.
const W = 400;
const H = 300;
const WALK_MS = 2200;

const art = (path: string) => `${import.meta.env.BASE_URL}art/${path}`;

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

interface Strip {
  url: string;
  frames: number;
  /** one frame's width / height */
  aspect: number;
  /** strip height relative to the walk strip (poses can be taller or shorter) */
  scale: number;
}

function loadImage(url: string): Promise<HTMLImageElement | null> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = url;
  });
}

/** Loads the walk strip and (optional) pose strip for a character. */
function useStrips(c: Character) {
  const [strips, setStrips] = useState<{ walk: Strip | null; poses: Strip | null }>({ walk: null, poses: null });
  useEffect(() => {
    let live = true;
    setStrips({ walk: null, poses: null });
    const walkUrl = art(`sprites/${c.id}.png`);
    const posesUrl = art(`sprites/${c.id}-poses.png`);
    Promise.all([loadImage(walkUrl), loadImage(posesUrl)]).then(([w, p]) => {
      if (!live || !w) return;
      const frames = c.sprite.frames;
      const walk = { url: walkUrl, frames, aspect: w.naturalWidth / frames / w.naturalHeight, scale: 1 };
      const poses = p
        ? { url: posesUrl, frames: 4, aspect: p.naturalWidth / 4 / p.naturalHeight, scale: p.naturalHeight / w.naturalHeight }
        : null;
      setStrips({ walk, poses });
    });
    return () => {
      live = false;
    };
  }, [c]);
  return strips;
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
  const { walk, poses } = useStrips(c);

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

  // While walking use the walk cycle; once there, use the spot's pose (or walk frame 1).
  const usePose = !walking && poses && station.pose !== undefined;
  const strip = usePose ? poses : walk;
  const frame = usePose ? station.pose! : 0;
  const left = !walking && station.face ? station.face === 'left' : facingLeft;

  const heightUnits = c.sprite.height * (strip?.scale ?? 1);
  const size = strip
    ? { width: `${((heightUnits * strip.aspect) / W) * 100}%`, height: `${(heightUnits / H) * 100}%` }
    : { width: '22%', height: `${((W * 0.22) / H) * 100}%` };

  const resting = state.phase !== 'focus';

  return (
    <div className="house">
      <img className="house-art" src={art(`house-${c.id}.png`)} alt="" draggable={false} />

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
          {strip ? (
            <span
              className={`sprite${left ? ' face-left' : ''}`}
              style={{
                backgroundImage: `url(${strip.url})`,
                backgroundSize: `${strip.frames * 100}% 100%`,
                backgroundPosition: `${(frame / (strip.frames - 1)) * 100}% 0`,
                animationTimingFunction: `steps(${strip.frames})`,
                ['--walk-end' as string]: `${(strip.frames / (strip.frames - 1)) * 100}%`,
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
