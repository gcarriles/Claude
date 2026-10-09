import { useState, type CSSProperties } from 'react';
import { CHARACTERS } from '../characters';
import { Portrait } from './Portrait';

interface Props {
  activeId: string;
  onPick: (id: string) => void;
}

export function Roster({ activeId, onPick }: Props) {
  // Bumping the count re-mounts the icon, which replays the wiggle.
  const [wiggles, setWiggles] = useState<Record<string, number>>({});

  return (
    <section className="roster">
      <p className="kicker">Pomodoro Press</p>
      <h1 className="roster-title">Who is keeping time?</h1>
      <ul className="roster-list">
        {CHARACTERS.map((c) => (
          <li key={c.id}>
            <button
              className={`roster-item${c.id === activeId ? ' is-active' : ''}`}
              style={{ '--row-ink': c.colors.ink, '--row-ink-light': c.colors.inkLight } as CSSProperties}
              onClick={() => {
                setWiggles((w) => ({ ...w, [c.id]: (w[c.id] ?? 0) + 1 }));
                onPick(c.id);
              }}
            >
              <span className={`roster-icon${wiggles[c.id] ? ' wiggle' : ''}`} key={wiggles[c.id] ?? 0}>
                <Portrait character={c} />
              </span>
              <span className="roster-text">
                <span className="kicker">{c.role}</span>
                <span className="roster-name">{c.name}</span>
                <span className="roster-mins">
                  {c.focusMin} focus · {c.breakMin} break
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
