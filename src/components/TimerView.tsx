import { NUDGE_EVERY_MIN, type Character } from '../characters';
import { formatClock, formatMinutes, type TimerState } from '../timer';
import { Pips } from './Pips';
import { BubbleTimer } from './BubbleTimer';
import { House } from './House';

interface Props {
  character: Character;
  state: TimerState;
  remaining: number;
  elapsed: number;
  sessionsPerSet: number;
  showNudge: boolean;
  onStart: () => void;
  onPause: () => void;
  onSkip: () => void;
  onBackToWork: () => void;
  onRunAnother: () => void;
  onBackToRoster: () => void;
}

export function TimerView(p: Props) {
  const { character: c, state: s } = p;

  return (
    <section className={`timer-view phase-${s.phase}`}>
      <button className="link-btn back" onClick={p.onBackToRoster}>
        ← Household
      </button>

      <div className="stage">
        <House key={c.id} character={c} state={s} elapsed={p.elapsed} />
        <div className="stage-main">
          <p className="kicker">
            {c.role} · {s.phase === 'focus' ? 'Focus' : s.phase === 'break' ? 'Break' : 'Set complete'}
          </p>
          <h2 className="char-name">{c.name}</h2>

          {s.phase === 'done' ? <Done {...p} /> : <Running {...p} />}
        </div>
      </div>

      {/* Controls live in a bar pinned to the bottom of the screen. */}
      <div className="action-bar">
        <Actions {...p} />
      </div>
    </section>
  );
}

function Actions(p: Props) {
  const s = p.state;
  const running = s.status === 'running';
  if (s.phase === 'done') {
    return (
      <>
        <button className="btn primary" onClick={p.onRunAnother}>
          Run another
        </button>
        <button className="btn ghost" onClick={p.onBackToRoster}>
          Switch
        </button>
      </>
    );
  }
  if (s.phase === 'break') {
    return (
      <>
        <button className="btn ghost" onClick={running ? p.onPause : p.onStart}>
          {running ? 'Pause' : 'Resume'}
        </button>
        <button className="btn primary" onClick={p.onBackToWork}>
          Back to work
        </button>
      </>
    );
  }
  return (
    <>
      <button className="btn primary" onClick={running ? p.onPause : p.onStart}>
        {running ? 'Pause' : s.status === 'paused' ? 'Resume' : 'Start'}
      </button>
      <button className="btn ghost" onClick={p.onSkip}>
        Skip
      </button>
    </>
  );
}

function Running(p: Props) {
  const { character: c, state: s } = p;

  let line: string;
  if (s.phase === 'break') {
    line = c.copy.break;
  } else if (s.status !== 'idle' && p.showNudge) {
    // Swap to a new nudge every NUDGE_EVERY_MIN minutes of focus time.
    const idx = Math.floor(p.elapsed / (NUDGE_EVERY_MIN * 60_000)) % c.copy.nudges.length;
    line = c.copy.nudges[idx];
  } else {
    line = c.copy.head;
  }

  return (
    <>
      <BubbleTimer text={formatClock(p.remaining)} label={`${formatClock(p.remaining)} remaining`} />
      <Pips total={p.sessionsPerSet} session={s.session} phase={s.phase} />
      <p className="line" key={line}>
        {line}
      </p>

    </>
  );
}

function Done(p: Props) {
  const { character: c, state: s } = p;
  const n = s.session;
  return (
    <>
      <p className="done-summary">
        {n} {n === 1 ? 'session' : 'sessions'} with {c.name}.
      </p>
      <p className="line">{c.copy.done}</p>
      <dl className="stats">
        <div>
          <dt className="kicker">Total focus</dt>
          <dd>{formatMinutes(s.focusMsTotal)}</dd>
        </div>
        <div>
          <dt className="kicker">Breaks taken</dt>
          <dd>{s.breaksTaken}</dd>
        </div>
      </dl>
    </>
  );
}
