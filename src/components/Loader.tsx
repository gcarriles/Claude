import { useEffect, useState } from 'react';
import { CHARACTERS } from '../characters';

const MIN_MS = 1800; // long enough to enjoy the cloud
const MAX_MS = 4000; // never block on slow images

/** Opening screen: a sleepy cloud while the household's art loads, then a fade. */
export function Loader({ onDone }: { onDone: () => void }) {
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const art = Promise.all(
      CHARACTERS.map(
        (c) =>
          new Promise<void>((resolve) => {
            const img = new Image();
            img.onload = img.onerror = () => resolve();
            img.src = `${import.meta.env.BASE_URL}art/${c.id}.png`;
          }),
      ),
    );
    const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
    let cancelled = false;
    Promise.race([Promise.all([art, wait(MIN_MS)]), wait(MAX_MS)]).then(() => {
      if (cancelled) return;
      setLeaving(true);
      setTimeout(onDone, 700);
    });
    return () => {
      cancelled = true;
    };
  }, [onDone]);

  return (
    <div className={`loader${leaving ? ' is-leaving' : ''}`} role="status" aria-live="polite">
      <svg className="loader-cloud" viewBox="0 0 220 140" aria-hidden="true">
        <path
          d="M52 118 C22 118 12 92 30 76 C22 50 50 34 72 46 C80 18 124 12 138 40 C160 28 192 44 186 72 C210 80 206 118 176 118 Z"
          fill="#fff8fb"
          stroke="#a0636b"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <path d="M84 80 q6 -7 12 0" fill="none" stroke="#5a3a40" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M126 80 q6 -7 12 0" fill="none" stroke="#5a3a40" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M104 92 q7 6 14 0" fill="none" stroke="#5a3a40" strokeWidth="3" strokeLinecap="round" />
        <ellipse cx="74" cy="94" rx="9" ry="5" fill="#f6b3c4" />
        <ellipse cx="148" cy="94" rx="9" ry="5" fill="#f6b3c4" />
      </svg>
      <p className="loader-text">
        loading household<span className="dots"><span>.</span><span>.</span><span>.</span></span>
      </p>
    </div>
  );
}
