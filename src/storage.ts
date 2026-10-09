// localStorage helpers. Every access is wrapped: storage can be blocked
// (private mode, cleared data) and the app must still work without it.

import { CHARACTERS } from './characters';
import type { TimerState } from './timer';

export interface Settings {
  sessionsPerSet: number; // 2–8
  showNudge: boolean;
  defaultCharacterId: string;
}

export const DEFAULT_SETTINGS: Settings = {
  sessionsPerSet: 4,
  showNudge: true,
  defaultCharacterId: CHARACTERS[0].id,
};

const SETTINGS_KEY = 'pomodoro-press:settings';
const TIMER_KEY = 'pomodoro-press:timer';

function read<T>(key: string): Partial<T> | null {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as Partial<T>) : null;
  } catch {
    return null;
  }
}

function write(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore — persistence is a convenience
  }
}

export function loadSettings(): Settings {
  const s = { ...DEFAULT_SETTINGS, ...read<Settings>(SETTINGS_KEY) };
  s.sessionsPerSet = Math.min(8, Math.max(2, Math.round(Number(s.sessionsPerSet) || 4)));
  if (!CHARACTERS.some((c) => c.id === s.defaultCharacterId)) {
    s.defaultCharacterId = DEFAULT_SETTINGS.defaultCharacterId;
  }
  return s;
}

export function saveSettings(s: Settings) {
  write(SETTINGS_KEY, s);
}

export function loadTimer(): TimerState | null {
  const t = read<TimerState>(TIMER_KEY);
  if (!t || !CHARACTERS.some((c) => c.id === t.characterId)) return null;
  if (!['focus', 'break', 'done'].includes(t.phase as string)) return null;
  return t as TimerState;
}

export function saveTimer(t: TimerState) {
  write(TIMER_KEY, t);
}
