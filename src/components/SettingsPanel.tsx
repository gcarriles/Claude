import { CHARACTERS } from '../characters';
import type { Settings } from '../storage';

interface Props {
  settings: Settings;
  onChange: (s: Settings) => void;
}

export function SettingsPanel({ settings, onChange }: Props) {
  const set = (patch: Partial<Settings>) => onChange({ ...settings, ...patch });

  return (
    <details className="settings">
      <summary className="kicker">Settings</summary>
      <label className="setting">
        <span>Sessions per set</span>
        <span className="stepper">
          <button
            aria-label="Fewer sessions"
            disabled={settings.sessionsPerSet <= 2}
            onClick={() => set({ sessionsPerSet: settings.sessionsPerSet - 1 })}
          >
            −
          </button>
          <output>{settings.sessionsPerSet}</output>
          <button
            aria-label="More sessions"
            disabled={settings.sessionsPerSet >= 8}
            onClick={() => set({ sessionsPerSet: settings.sessionsPerSet + 1 })}
          >
            +
          </button>
        </span>
      </label>
      <label className="setting">
        <span>Show nudge line</span>
        <input
          type="checkbox"
          checked={settings.showNudge}
          onChange={(e) => set({ showNudge: e.target.checked })}
        />
      </label>
      <label className="setting">
        <span>Timer sounds</span>
        <input
          type="checkbox"
          checked={settings.timerSounds}
          onChange={(e) => set({ timerSounds: e.target.checked })}
        />
      </label>
      <label className="setting">
        <span>Default character</span>
        <select
          value={settings.defaultCharacterId}
          onChange={(e) => set({ defaultCharacterId: e.target.value })}
        >
          {CHARACTERS.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </label>
    </details>
  );
}
