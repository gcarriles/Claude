import { useCallback, useEffect, useState, type CSSProperties } from 'react';
import { getCharacter } from './characters';
import { loadSettings, saveSettings, type Settings } from './storage';
import { formatClock, type PhaseEndEvent } from './timer';
import { useTimer } from './useTimer';
import { cancelCues, isAudioReady, onAudioReady, scheduleCues, setMusic, unlockAudio } from './sound';
import { Loader } from './components/Loader';
import { MusicButton } from './components/MusicButton';
import { Roster } from './components/Roster';
import { SettingsPanel } from './components/SettingsPanel';
import { Sky } from './components/Sky';
import { TimerView } from './components/TimerView';

// Sounds for phase ends are scheduled ahead in sound.ts. Future: a notification in the character's voice.
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

  // Audio can only start after the first tap/click anywhere. Phones count a
  // finished tap (touchend/click), not a finger landing, so listen for those.
  const [audioReady, setAudioReady] = useState(isAudioReady);
  useEffect(() => {
    const unlock = () => unlockAudio();
    const events = ['pointerdown', 'touchend', 'click', 'keydown'] as const;
    events.forEach((e) => window.addEventListener(e, unlock, { capture: true }));
    const off = onAudioReady(setAudioReady);
    return () => {
      events.forEach((e) => window.removeEventListener(e, unlock, { capture: true }));
      off();
    };
  }, []);

  useEffect(() => setMusic(settings.music), [settings.music]);

  // The speaker button: if sound is still blocked, the first tap just starts the
  // music (it was already "on"); otherwise it toggles. Runs inside the tap itself.
  const toggleMusic = () => {
    unlockAudio();
    const next = audioReady ? !settings.music : true;
    setMusic(next);
    setSettings((s) => ({ ...s, music: next }));
  };

  // Chime at 5 min left, ticks for the last 10 s, ring at zero — scheduled on the audio clock.
  const { status, endAt } = timer.state;
  useEffect(() => {
    if (settings.timerSounds && status === 'running' && endAt !== null) scheduleCues(endAt);
    else cancelCues();
  }, [status, endAt, settings.timerSounds]);

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
      <MusicButton on={settings.music} waiting={settings.music && !audioReady} onToggle={toggleMusic} />
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
