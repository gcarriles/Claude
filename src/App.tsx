import { useCallback, useEffect, useState, type CSSProperties } from 'react';
import { getCharacter } from './characters';
import { loadSettings, saveSettings, type Settings } from './storage';
import { formatClock, type PhaseEndEvent } from './timer';
import { useTimer } from './useTimer';
import { Loader } from './components/Loader';
import { Roster } from './components/Roster';
import { SettingsPanel } from './components/SettingsPanel';
import { Sky } from './components/Sky';
import { TimerView } from './components/TimerView';

// Future: play a sound / show a notification in the character's voice.
function handlePhaseEnd(_e: PhaseEndEvent) {}

export default function App() {
  const [settings, setSettings] = useState<Settings>(loadSettings);
  useEffect(() => saveSettings(settings), [settings]);

  const timer = useTimer(settings.defaultCharacterId, settings.sessionsPerSet, handlePhaseEnd);
  const character = getCharacter(timer.state.characterId);

  // On phones the roster is its own screen. Open on the timer if a session is in progress.
  const [mobileScreen, setMobileScreen] = useState<'roster' | 'timer'>(() =>
    timer.state.status === 'idle' && timer.state.phase === 'focus' && timer.state.session === 1
      ? 'roster'
      : 'timer',
  );

  const [loading, setLoading] = useState(true);
  const finishLoading = useCallback(() => setLoading(false), []);

  const pick = (id: string) => {
    if (id !== timer.state.characterId) timer.newSet(id);
    // Let the wiggle play before the phone swaps screens.
    window.setTimeout(() => setMobileScreen('timer'), 420);
  };

  // Countdown in the tab title.
  useEffect(() => {
    const s = timer.state;
    document.title =
      s.status === 'running' ? `${formatClock(timer.remaining)} · ${character.name}` : 'Pomodoro Press';
  }, [timer.remaining, timer.state, character.name]);

  const vars = {
    '--ink': character.colors.ink,
    '--ink-deep': character.colors.inkDeep,
    '--ink-light': character.colors.inkLight,
    '--horizon': character.colors.horizon,
  } as CSSProperties;

  return (
    <div className={`app show-${mobileScreen}`} style={vars}>
      <Sky />
      {loading && <Loader onDone={finishLoading} />}
      <aside className="col-roster">
        <Roster activeId={character.id} onPick={pick} />
        <SettingsPanel settings={settings} onChange={setSettings} />
      </aside>
      <main className="col-timer">
        <TimerView
          character={character}
          state={timer.state}
          remaining={timer.remaining}
          elapsed={timer.elapsed}
          sessionsPerSet={settings.sessionsPerSet}
          showNudge={settings.showNudge}
          onStart={timer.start}
          onPause={timer.pause}
          onSkip={timer.skip}
          onBackToWork={timer.backToWork}
          onRunAnother={() => timer.newSet(character.id)}
          onBackToRoster={() => setMobileScreen('roster')}
        />
      </main>
    </div>
  );
}
