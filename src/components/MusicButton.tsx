// Speaker button that toggles the lofi loop: pastel speaker with sound waves
// when on, crossed out when muted.

const LINE = '#8a6aa8';
const YELLOW = '#f7dc8f';
const YELLOW_DEEP = '#f2c56f';
const BLUE = '#c3cee8';
const BLUE_LIGHT = '#dbe2f3';

export function MusicButton({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  const s = { stroke: LINE, strokeWidth: 2, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const };
  return (
    <button
      className={`music-btn${on ? ' is-on' : ''}`}
      onClick={onToggle}
      aria-pressed={on}
      aria-label={on ? 'Mute lofi music' : 'Play lofi music'}
      title={on ? 'Mute music' : 'Play music'}
    >
      <svg viewBox="0 0 40 40" aria-hidden="true">
        {/* magnet */}
        <rect x="4" y="14" width="9" height="12" rx="3" fill={YELLOW} {...s} />
        <rect x="5" y="15" width="2.5" height="10" rx="1.2" fill={YELLOW_DEEP} />
        {[17, 20, 23].map((y) => (
          <line key={y} x1="7.5" y1={y} x2="9.5" y2={y} {...s} strokeWidth={1.6} />
        ))}
        {/* cone */}
        <path d="M13 14 L25 6.5 L25 33.5 L13 26 Z" fill={BLUE} {...s} />
        <path d="M14 17 L24 11 L24 14.5 L14 19.8 Z" fill={BLUE_LIGHT} />
        <line x1="18.5" y1="12" x2="18.5" y2="22" {...s} strokeWidth={1.6} />
        <line x1="18.5" y1="24.5" x2="18.5" y2="26.5" {...s} strokeWidth={1.6} />
        {/* rim */}
        <rect x="25" y="4.5" width="4" height="31" rx="2" fill={YELLOW} {...s} />
        {on ? (
          <>
            <path className="wave" d="M32.5 16 Q35 20 32.5 24" fill="none" {...s} strokeWidth={2.2} />
            <path className="wave wave-2" d="M35.5 12 Q40.5 20 35.5 28" fill="none" {...s} strokeWidth={2.2} />
          </>
        ) : (
          <>
            <line x1="5" y1="35" x2="36" y2="5" stroke="#fffaf6" strokeWidth={5} strokeLinecap="round" />
            <line x1="5" y1="35" x2="36" y2="5" {...s} strokeWidth={2.2} />
          </>
        )}
      </svg>
    </button>
  );
}
