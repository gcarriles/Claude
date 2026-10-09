# Pomodoro Press

A cozy pomodoro timer where someone from the household keeps time. Each
character has their own session lengths, colors and voice.

Built with React + TypeScript + Vite.

## Run it

```bash
npm install
npm run dev       # local dev server (open the URL it prints)
npm run build     # type-check + production build into dist/
npm run preview   # serve the production build
```

To try it on your phone, run `npm run dev -- --host` and open the "Network"
URL on a phone on the same Wi-Fi.

## Where to edit things

| What | Where |
|---|---|
| Characters: names, roles, minutes, colors, all copy | `src/characters.ts` |
| How often the running nudge changes (default 5 min) | `NUDGE_EVERY_MIN` in `src/characters.ts` |
| Portraits | `public/art/<id>.png` (e.g. `mochi.png`). Missing file → initials in the character's ink |
| Colors, fonts, sky, layout | `src/styles.css` |
| Timer rules (focus → break → … → set complete) | `src/timer.ts` |

To add a character, add an entry to `CHARACTERS` and drop `public/art/<id>.png` in.

### Rotating nudges

While focus is running, the line under the timer cycles through that
character's `nudges` list, moving to the next one every `NUDGE_EVERY_MIN`
minutes. Add or remove lines freely. Turn the line off in Settings.

## How it works

- **Timer accuracy:** the clock stores an end timestamp and computes time left
  from it, so it stays right when the tab is in the background. If phases
  finished while the tab was asleep, they're caught up on return.
- **Flow:** focus → break (starts automatically) → next focus (waits for Start)
  … last focus → Set complete. Skip jumps to the next phase.
- **Saved in localStorage:** settings (sessions per set, nudge on/off, default
  character) and the current session (character, phase, end time, session
  count, paused time left), so a refresh resumes where you were.

## Built to grow into (not done yet)

- **Sound / notifications at phase end** — hook in `handlePhaseEnd` in `src/App.tsx`
  (it receives `{ characterId, from, to }`).
- **Daily log + streaks** — each character already has a `streak` line in the config.
- **Sync across phone and desktop** — timer state is a plain object in `src/timer.ts`,
  so it can be sent to a server as-is.
- **PWA install** — add a manifest + service worker (e.g. `vite-plugin-pwa`).
