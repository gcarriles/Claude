import type { CSSProperties } from 'react';
import { CHARACTERS } from '../characters';
import { Portrait } from './Portrait';

interface Props {
  activeId: string;
  onPick: (id: string) => void;
}

export function Roster({ activeId, onPick }: Props) {
  return (
    <section className="roster">
      <p className="kicker">Pomodoro Press</p>
      <h1 className="roster-title">Who is keeping time?</h1>
      <ul className="roster-list">
        {CHARACTERS.map((c) => (
          <li key={c.id}>
            <button
              className={`roster-item${c.id === activeId ? ' is-active' : ''}`}
              style={{ '--row-ink': c.colors.ink } as CSSProperties}
              onClick={() => onPick(c.id)}
            >
              <Portrait character={c} size={64} />
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
