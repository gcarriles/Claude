// Round sticker-style speaker button that toggles the lofi loop.

export function MusicButton({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button
      className={`music-btn${on ? ' is-on' : ''}`}
      onClick={onToggle}
      aria-pressed={on}
      aria-label={on ? 'Mute lofi music' : 'Play lofi music'}
      title={on ? 'Mute music' : 'Play music'}
    >
      <svg viewBox="0 0 32 32" aria-hidden="true">
        {/* little music note */}
        <path
          d="M12 22.5 V9.5 L23 7 V20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <ellipse cx="9.3" cy="22.8" rx="3.4" ry="2.7" fill="currentColor" />
        <ellipse cx="20.3" cy="20.3" rx="3.4" ry="2.7" fill="currentColor" />
        {!on && <path d="M6 6 L26 26" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />}
      </svg>
      {on && (
        <span className="eq" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
      )}
    </button>
  );
}
