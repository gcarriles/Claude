// Pure timer state machine. No React here, so it's easy to test and to sync later.
//
// Time is always computed from `endAt` (a wall-clock timestamp), never by
// counting ticks, so it stays accurate when the tab is in the background.

import { getCharacter } from './characters';

export type Phase = 'focus' | 'break' | 'done';
export type Status = 'idle' | 'running' | 'paused';

export interface TimerState {
  characterId: string;
  phase: Phase;
  status: Status;
  endAt: number | null; // set while running
  remainingMs: number; // used while idle or paused
  session: number; // current focus session, 1-based
  focusMsTotal: number; // focus time actually spent this set
  breaksTaken: number;
}

export interface PhaseEndEvent {
  characterId: string;
  from: Phase;
  to: Phase;
}

const MIN = 60_000;

export function phaseDurationMs(characterId: string, phase: Phase): number {
  const c = getCharacter(characterId);
  if (phase === 'focus') return c.focusMin * MIN;
  if (phase === 'break') return c.breakMin * MIN;
  return 0;
}

export function newSet(characterId: string): TimerState {
  return {
    characterId,
    phase: 'focus',
    status: 'idle',
    endAt: null,
    remainingMs: phaseDurationMs(characterId, 'focus'),
    session: 1,
    focusMsTotal: 0,
    breaksTaken: 0,
  };
}

export function remainingMs(s: TimerState, now: number): number {
  if (s.status === 'running' && s.endAt !== null) return Math.max(0, s.endAt - now);
  return s.remainingMs;
}

export function elapsedMs(s: TimerState, now: number): number {
  return phaseDurationMs(s.characterId, s.phase) - remainingMs(s, now);
}

export function start(s: TimerState, now: number): TimerState {
  if (s.status === 'running' || s.phase === 'done') return s;
  return { ...s, status: 'running', endAt: now + s.remainingMs };
}

export function pause(s: TimerState, now: number): TimerState {
  if (s.status !== 'running') return s;
  return { ...s, status: 'paused', endAt: null, remainingMs: remainingMs(s, now) };
}

/**
 * Move to the next phase. `at` is when the current phase ended (its endAt for a
 * natural finish, or "now" for a skip), so a following break starts on time
 * even if the tab was asleep.
 */
export function advance(s: TimerState, at: number, sessionsPerSet: number): TimerState {
  if (s.phase === 'focus') {
    const focusMsTotal = s.focusMsTotal + elapsedMs(s, at);
    if (s.session >= sessionsPerSet) {
      return { ...s, phase: 'done', status: 'idle', endAt: null, remainingMs: 0, focusMsTotal };
    }
    // Breaks start automatically.
    const dur = phaseDurationMs(s.characterId, 'break');
    return { ...s, phase: 'break', status: 'running', endAt: at + dur, remainingMs: dur, focusMsTotal };
  }
  if (s.phase === 'break') {
    // Next focus waits for the user to press Start.
    return {
      ...s,
      phase: 'focus',
      status: 'idle',
      endAt: null,
      remainingMs: phaseDurationMs(s.characterId, 'focus'),
      session: s.session + 1,
      breaksTaken: s.breaksTaken + 1,
    };
  }
  return s;
}

/** Catch up on any phases that finished while we weren't looking. */
export function settle(
  s: TimerState,
  now: number,
  sessionsPerSet: number,
): { state: TimerState; events: PhaseEndEvent[] } {
  const events: PhaseEndEvent[] = [];
  let cur = s;
  while (cur.status === 'running' && cur.endAt !== null && now >= cur.endAt) {
    const next = advance(cur, cur.endAt, sessionsPerSet);
    events.push({ characterId: cur.characterId, from: cur.phase, to: next.phase });
    cur = next;
  }
  return { state: cur, events };
}

export function formatClock(ms: number): string {
  const total = Math.ceil(ms / 1000);
  const m = Math.floor(total / 60);
  const sec = total % 60;
  return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
}

export function formatMinutes(ms: number): string {
  const m = Math.round(ms / MIN);
  if (m < 60) return `${m} min`;
  const h = Math.floor(m / 60);
  return `${h} hr ${m % 60} min`;
}
