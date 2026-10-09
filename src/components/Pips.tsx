import type { Phase } from '../timer';

// One pip per focus session: filled = done, ringed = current.
export function Pips({ total, session, phase }: { total: number; session: number; phase: Phase }) {
  return (
    <div className="pips" aria-label={`Session ${Math.min(session, total)} of ${total}`}>
      {Array.from({ length: total }, (_, i) => {
        const n = i + 1;
        const done = phase === 'done' || n < session || (n === session && phase === 'break');
        const current = !done && n === session;
        return <span key={n} className={`pip${done ? ' is-done' : ''}${current ? ' is-current' : ''}`} />;
      })}
    </div>
  );
}
