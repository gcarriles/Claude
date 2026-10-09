import { useCallback, useEffect, useRef, useState } from 'react';
import * as T from './timer';
import { loadTimer, saveTimer } from './storage';

/**
 * React wrapper around the timer state machine.
 * `onPhaseEnd` is the hook for future sounds / notifications.
 */
export function useTimer(
  initialCharacterId: string,
  sessionsPerSet: number,
  onPhaseEnd?: (e: T.PhaseEndEvent) => void,
) {
  const [state, setState] = useState<T.TimerState>(() => {
    const saved = loadTimer();
    if (!saved) return T.newSet(initialCharacterId);
    return T.settle(saved, Date.now(), sessionsPerSet).state;
  });
  const [now, setNow] = useState(() => Date.now());

  const onPhaseEndRef = useRef(onPhaseEnd);
  onPhaseEndRef.current = onPhaseEnd;

  // Persist on every state change (not every tick).
  useEffect(() => saveTimer(state), [state]);

  // Tick while running. Also re-check when the tab becomes visible again.
  useEffect(() => {
    if (state.status !== 'running') return;
    const tick = () => {
      const t = Date.now();
      setNow(t);
      setState((s) => {
        const { state: next, events } = T.settle(s, t, sessionsPerSet);
        events.forEach((e) => onPhaseEndRef.current?.(e));
        return events.length ? next : s;
      });
    };
    tick();
    const id = window.setInterval(tick, 250);
    document.addEventListener('visibilitychange', tick);
    return () => {
      window.clearInterval(id);
      document.removeEventListener('visibilitychange', tick);
    };
  }, [state.status, state.endAt, sessionsPerSet]);

  const act = useCallback((fn: (s: T.TimerState, t: number) => T.TimerState) => {
    const t = Date.now();
    setNow(t);
    setState((s) => fn(s, t));
  }, []);

  return {
    state,
    now,
    remaining: T.remainingMs(state, now),
    elapsed: T.elapsedMs(state, now),
    start: () => act(T.start),
    pause: () => act(T.pause),
    skip: () => act((s, t) => T.advance(s, t, sessionsPerSet)),
    /** From a break: end it and start the next focus right away. */
    backToWork: () => act((s, t) => T.start(T.advance(s, t, sessionsPerSet), t)),
    newSet: (characterId: string) => act(() => T.newSet(characterId)),
  };
}
