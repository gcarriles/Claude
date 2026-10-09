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
| Each character's house: furniture, spots, activities | `house` in `src/characters.ts` |
| How often the running nudge changes (default 5 min) | `NUDGE_EVERY_MIN` in `src/characters.ts` |
| How often they move to a new spot (default 2 min) | `ACTIVITY_EVERY_MIN` in `src/characters.ts` |
| Portraits for the roster (transparent cut-outs) | `public/art/<id>.png` (e.g. `mochi.png`). Missing file → initials in the character's ink |
| Walking sprites used in the houses | `public/art/sprites/<id>.png` — one horizontal strip of walk frames; set `sprite.frames` and `sprite.height` in `src/characters.ts`. Missing file → the portrait is used instead |
| Room colors (wall, stripe, floor) | `house.theme` in `src/characters.ts` |
| Furniture drawings | `src/components/furniture.tsx` |
| Colors, fonts, sky, layout | `src/styles.css` (font choices are the `--display`, `--hand`, `--timer`, `--body` variables) |
| Timer rules (focus → break → … → set complete) | `src/timer.ts` |

To add a character, add an entry to `CHARACTERS` and drop `public/art/<id>.png` in.

### Houses

Each character has a little room. While focus runs, they hop between the
`stations` in their `house` config (one every `ACTIVITY_EVERY_MIN` minutes),
with a speech bubble saying what they're up to. On break and at the end of a
set they go to their `rest` spot. Tap them in the house (or in the roster) to
make them wiggle.

Characters walk between spots using their sprite strip (and turn to face
the way they're going), then stand on frame 1 while they're "doing" the
activity.

The room is 400 × 300 units. `x` runs left → right, `y` top → bottom, and a
station's `y` is where the character's feet/bottom sit.

**Using painted house art instead:** drop `public/art/house-<id>.png` in (4:3,
e.g. 1200 × 900) and it replaces the drawn room automatically. Adjust the
station `x`/`y` values to line up with your art.

### Opening screen

A sleepy cloud says "loading household…" while the portraits load (at least
1.8s, at most 4s), then fades into the roster. See `src/components/Loader.tsx`.

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
