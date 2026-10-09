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

## Install it like an app

Pomodoro Press is a Progressive Web App: once it's hosted on an `https://`
address, it can be installed and works offline (the app, art and music are
cached on first visit).

- **iPhone/iPad (Safari):** Share → *Add to Home Screen*
- **Android (Chrome):** menu → *Install app*
- **Mac/Windows (Chrome or Edge):** install icon in the address bar.
  Safari on Mac: File → *Add to Dock*

### Hosting

Any static host works. Easiest: connect this repo to Netlify, Vercel or
Cloudflare Pages with

- build command: `npm run build`
- output folder: `dist`

Every push then redeploys, and installed copies update themselves on next
launch.

App icons live in `public/` (`icon-192.png`, `icon-512.png`,
`icon-maskable-512.png`, `apple-touch-icon.png`, `favicon-64.png`); the
install settings are in `vite.config.ts`.

## Where to edit things

| What | Where |
|---|---|
| Characters: names, roles, minutes, colors, all copy | `src/characters.ts` |
| Each character's spots in their house, activities and poses | `house` in `src/characters.ts` |
| How often the running nudge changes (default 5 min) | `NUDGE_EVERY_MIN` in `src/characters.ts` |
| How often they move to a new spot (default 2 min) | `ACTIVITY_EVERY_MIN` in `src/characters.ts` |
| House art | `public/art/house-<id>.png` — transparent background, 4:3 (1200 × 900) |
| Walk cycle | `public/art/sprites/<id>.png` — 4 frames side by side, facing right |
| Poses | `public/art/sprites/<id>-poses.png` — 4 frames side by side, facing right, same scale as the walk strip |
| Roster portraits | `public/art/<id>.png` (transparent cut-outs). Missing file → initials in the character's ink |
| Colors, fonts, sky, layout | `src/styles.css` (font choices are the `--display`, `--hand`, `--timer`, `--body` variables) |

To add a character, add an entry to `CHARACTERS` and drop their art files in.

### Houses

Each character lives in their own room. While focus runs, they walk between
the `stations` in their `house` config (one every `ACTIVITY_EVERY_MIN`
minutes) with a speech bubble saying what they're up to. Once they arrive they
switch to that spot's `pose`:

- People: `0` stand, `1` sit, `2` read, `3` sleep
- Cats: `0` stand, `1` loaf, `2` sleep, `3` stretch

On break and at the end of a set they go to their `rest` spot. Tap them (in
the house or the roster) to make them wiggle.

Spots use 400 × 300 units laid over the 4:3 house art: `x` runs left → right,
`y` top → bottom, and `y` is where their feet (or bottom) sit. `face` turns
them left/right once they arrive.

If you replace a house image, re-check the spots — they're placed by eye on
the current art.

### Sound

- **Lofi music** loops in the background; the round note button (top right)
  mutes it. It's `public/audio/lofi.mp3`, which was rendered from the
  generator in `src/sound.ts` (`renderLofi`) — so it's ours, no licence needed.
  Replace the file with any track you have the rights to; if the file is
  missing, the app generates the loop on the fly.
- **Timer sounds** (Settings → Timer sounds): a soft chime at 5 minutes left,
  ticks for the last 10 seconds, and a music-box ring at zero. These are
  scheduled ahead on the audio clock, so they stay on time in a background tab.
- Browsers only allow sound after the first tap or click on the page.

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
