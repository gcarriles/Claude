// All audio: the lofi loop and the timer cues.
//
// - Music is public/audio/lofi.mp3, a ~53s loop rendered from renderLofi()
//   below (so it's ours, no licence needed). If the file is missing the loop
//   is generated on the fly.
// - Browsers block sound until the person interacts with the page, and phones
//   only count a finished tap (touchend/click), not a finger landing. Call
//   unlockAudio() from those events; subscribe with onAudioReady() to know when
//   sound is actually allowed.
// - Timer cues (5-minute chime, last-10-seconds ticks, ring at zero) are
//   scheduled ahead on the audio clock, so they stay on time even when the tab
//   is in the background and page timers are throttled.

let ctx: AudioContext | null = null;
let musicGain: GainNode | null = null;
let musicSource: AudioBufferSourceNode | null = null;
let musicBuffer: Promise<AudioBuffer> | null = null;
let musicWanted = false;

const MUSIC_VOLUME = 0.32;
const CUE_VOLUME = 0.55;

const readyListeners = new Set<(ready: boolean) => void>();

function audio(): AudioContext {
  if (!ctx) {
    // iPhone: play as media, so sound isn't muted by the ring/silent switch (Safari 16.4+).
    const session = (navigator as Navigator & { audioSession?: { type: string } }).audioSession;
    if (session) session.type = 'playback';

    ctx = new AudioContext();
    ctx.addEventListener('statechange', () => {
      const ready = ctx?.state === 'running';
      readyListeners.forEach((fn) => fn(ready));
      if (ready) {
        if (musicWanted) void startMusic();
        if (cueEndAt !== null) scheduleCues(cueEndAt);
      }
    });
  }
  return ctx;
}

/** True once the browser allows sound. */
export function isAudioReady() {
  return ctx?.state === 'running';
}

/** Notified whenever sound becomes allowed / blocked again (e.g. iPhone after a call). */
export function onAudioReady(fn: (ready: boolean) => void) {
  readyListeners.add(fn);
  return () => readyListeners.delete(fn);
}

/**
 * Browsers only allow audio after a tap/click. Call this synchronously from a
 * user gesture (click, touchend, keydown) — not from a timeout or effect.
 */
export function unlockAudio() {
  const c = audio();
  if (c.state === 'running') return;
  void c.resume().catch(() => {});
  // Older iPhones only fully unlock once something actually plays inside the gesture.
  const blip = c.createBufferSource();
  blip.buffer = c.createBuffer(1, 1, c.sampleRate);
  blip.connect(c.destination);
  blip.start(0);
}

// ---------------------------------------------------------------- music

export function setMusic(on: boolean) {
  musicWanted = on;
  if (on) void startMusic();
  else stopMusic();
}

async function startMusic() {
  const c = audio();
  if (c.state !== 'running' || musicSource) return;
  if (!musicBuffer) musicBuffer = loadOwnTrack(c).then((b) => b ?? renderLofi(c.sampleRate));
  const buffer = await musicBuffer;
  if (!musicWanted || musicSource) return;

  musicGain = c.createGain();
  musicGain.gain.setValueAtTime(0, c.currentTime);
  musicGain.gain.linearRampToValueAtTime(MUSIC_VOLUME, c.currentTime + 2);
  musicGain.connect(c.destination);
  musicSource = c.createBufferSource();
  musicSource.buffer = buffer;
  musicSource.loop = true;
  musicSource.connect(musicGain);
  musicSource.start();
}

function stopMusic() {
  if (!ctx || !musicSource || !musicGain) return;
  const src = musicSource;
  const g = musicGain;
  musicSource = null;
  musicGain = null;
  g.gain.setTargetAtTime(0, ctx.currentTime, 0.25);
  src.stop(ctx.currentTime + 1.5);
}

async function loadOwnTrack(c: AudioContext): Promise<AudioBuffer | null> {
  try {
    const res = await fetch(`${import.meta.env.BASE_URL}audio/lofi.mp3`);
    if (!res.ok || !(res.headers.get('content-type') ?? '').startsWith('audio')) return null;
    return await c.decodeAudioData(await res.arrayBuffer());
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------- timer cues

let cueEndAt: number | null = null;
let cueBus: GainNode | null = null;

/** Schedule the 5-min chime, the last-10-second ticks and the ring for a phase ending at `endAt` (ms timestamp). */
export function scheduleCues(endAt: number) {
  cancelCues();
  cueEndAt = endAt;
  const c = audio();
  if (c.state !== 'running') return; // re-run from the statechange listener once unlocked

  cueBus = c.createGain();
  cueBus.gain.value = CUE_VOLUME;
  cueBus.connect(c.destination);
  const at = (ms: number) => c.currentTime + (ms - Date.now()) / 1000;
  const future = (t: number) => t > c.currentTime + 0.05;

  // Gentle "ding-dong" when 5 minutes are left (skipped if the phase is shorter than that).
  const five = at(endAt - 5 * 60_000);
  if (future(five) && five - c.currentTime > 1) {
    bell(c, cueBus, 1046.5, five, 0.5, 1.4);
    bell(c, cueBus, 784, five + 0.32, 0.45, 1.8);
  }
  // Soft ticks counting down the last 10 seconds; the last three go up a step.
  for (let s = 10; s >= 1; s--) {
    const t = at(endAt - s * 1000);
    if (future(t)) tick(c, cueBus, s <= 3 ? 1174.7 : 880, t);
  }
  // Music-box ring at zero.
  const end = at(endAt);
  if (future(end)) ring(c, cueBus, end);
}

export function cancelCues() {
  cueEndAt = null;
  if (cueBus) {
    cueBus.disconnect();
    cueBus = null;
  }
}

/** Play the ring right now (used as a preview). */
export function previewRing() {
  const c = audio();
  const g = c.createGain();
  g.gain.value = CUE_VOLUME;
  g.connect(c.destination);
  ring(c, g, c.currentTime + 0.05);
}

export function bell(c: BaseAudioContext, out: AudioNode, freq: number, t: number, vol: number, decay: number) {
  // Fundamental plus an inharmonic partial gives a soft glockenspiel tone.
  for (const [mult, v] of [
    [1, 1],
    [2.76, 0.25],
    [5.4, 0.08],
  ]) {
    const o = c.createOscillator();
    o.type = 'sine';
    o.frequency.value = freq * mult;
    const g = c.createGain();
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(vol * v, t + 0.006);
    g.gain.exponentialRampToValueAtTime(0.0001, t + decay / mult);
    o.connect(g).connect(out);
    o.start(t);
    o.stop(t + decay + 0.1);
  }
}

export function tick(c: BaseAudioContext, out: AudioNode, freq: number, t: number) {
  const o = c.createOscillator();
  o.type = 'triangle';
  o.frequency.value = freq;
  const g = c.createGain();
  g.gain.setValueAtTime(0, t);
  g.gain.linearRampToValueAtTime(0.35, t + 0.005);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.12);
  o.connect(g).connect(out);
  o.start(t);
  o.stop(t + 0.15);
}

export function ring(c: BaseAudioContext, out: AudioNode, t: number) {
  // C major arpeggio up and a sparkle on top, three times.
  const notes = [1046.5, 1318.5, 1568, 2093];
  for (let r = 0; r < 3; r++) {
    notes.forEach((f, i) => bell(c, out, f, t + r * 1.1 + i * 0.13, 0.42, 1.6));
  }
}

// ---------------------------------------------------------------- lofi generator

const midi = (n: number) => 440 * Math.pow(2, (n - 69) / 12);

/** Small seeded RNG so the loop is the same every time. */
function rng(seed: number) {
  return () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };
}

export async function renderLofi(sampleRate: number): Promise<AudioBuffer> {
  const BPM = 72;
  const beat = 60 / BPM;
  const bar = beat * 4;
  const BARS = 16;
  const length = bar * BARS;
  const c = new OfflineAudioContext(2, Math.ceil(length * sampleRate), sampleRate);
  const rand = rng(7);

  // Master: warm low-pass, like an old tape.
  const master = c.createBiquadFilter();
  master.type = 'lowpass';
  master.frequency.value = 3200;
  master.Q.value = 0.4;
  const masterGain = c.createGain();
  masterGain.gain.value = 1.5;
  master.connect(masterGain).connect(c.destination);

  // Tape wobble shared by the keys.
  const wow = c.createOscillator();
  wow.frequency.value = 0.55;
  const wowDepth = c.createGain();
  wowDepth.gain.value = 7; // cents
  wow.connect(wowDepth);
  wow.start();

  // Keys bus with a slow tremolo.
  const keys = c.createGain();
  keys.gain.value = 0.16;
  const trem = c.createOscillator();
  trem.frequency.value = 4.2;
  const tremDepth = c.createGain();
  tremDepth.gain.value = 0.03;
  trem.connect(tremDepth).connect(keys.gain);
  trem.start();
  keys.connect(master);

  const noise = c.createBuffer(1, sampleRate, sampleRate);
  const nd = noise.getChannelData(0);
  for (let i = 0; i < nd.length; i++) nd[i] = Math.random() * 2 - 1;

  // Fmaj9 – Em7 – Dm9 – Cmaj9
  const chords = [
    { root: 41, notes: [57, 60, 64, 67] },
    { root: 40, notes: [55, 59, 62, 64] },
    { root: 38, notes: [53, 57, 60, 64] },
    { root: 36, notes: [52, 55, 59, 62] },
  ];
  const swing = (eighth: number) => (eighth % 2 === 1 ? beat * 0.58 : 0) + Math.floor(eighth / 2) * beat;

  const keyNote = (n: number, t: number, dur: number, vol: number) => {
    for (const [type, mult, v] of [
      ['sine', 1, 1],
      ['triangle', 2, 0.12],
    ] as const) {
      const o = c.createOscillator();
      o.type = type;
      o.frequency.value = midi(n) * mult;
      wowDepth.connect(o.detune);
      const g = c.createGain();
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(vol * v, t + 0.02);
      g.gain.exponentialRampToValueAtTime(vol * v * 0.45, t + dur * 0.6);
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      o.connect(g).connect(keys);
      o.start(t);
      o.stop(t + dur + 0.05);
    }
  };

  const bass = (n: number, t: number, dur: number) => {
    const o = c.createOscillator();
    o.type = 'sine';
    o.frequency.value = midi(n);
    const g = c.createGain();
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(0.32, t + 0.03);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g).connect(master);
    o.start(t);
    o.stop(t + dur + 0.05);
  };

  const kick = (t: number) => {
    const o = c.createOscillator();
    o.frequency.setValueAtTime(110, t);
    o.frequency.exponentialRampToValueAtTime(45, t + 0.12);
    const g = c.createGain();
    g.gain.setValueAtTime(0.55, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.35);
    o.connect(g).connect(master);
    o.start(t);
    o.stop(t + 0.4);
  };

  const noiseHit = (t: number, type: BiquadFilterType, freq: number, vol: number, decay: number) => {
    const s = c.createBufferSource();
    s.buffer = noise;
    const f = c.createBiquadFilter();
    f.type = type;
    f.frequency.value = freq;
    const g = c.createGain();
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + decay);
    s.connect(f).connect(g).connect(master);
    s.start(t, rand() * 0.5);
    s.stop(t + decay + 0.02);
  };

  const pentatonic = [72, 74, 76, 79, 81, 84];

  for (let b = 0; b < BARS; b++) {
    const t0 = b * bar;
    const ch = chords[b % 4];
    const last = b === BARS - 1;

    // Keys: strummed chord on 1, softer re-hit on the "and" of 2.
    ch.notes.forEach((n, i) => keyNote(n, t0 + i * 0.018, bar * 0.62, 0.22));
    if (!last) ch.notes.forEach((n, i) => keyNote(n, t0 + swing(3) + i * 0.012, bar * 0.4, 0.12));

    // Bass.
    bass(ch.root, t0, beat * 1.6);
    if (!last) bass(ch.root + (b % 2 ? 7 : 12), t0 + swing(5), beat * 1.1);

    // Drums come in after the first two bars.
    if (b >= 2) {
      kick(t0);
      kick(t0 + swing(5));
      if (b % 4 === 3) kick(t0 + swing(7));
      noiseHit(t0 + beat, 'bandpass', 1700, 0.28, 0.2);
      noiseHit(t0 + beat * 3, 'bandpass', 1700, 0.28, 0.2);
      for (let e = 0; e < 8; e++) noiseHit(t0 + swing(e), 'highpass', 7000, e % 2 ? 0.05 : 0.09, 0.05);
    }

    // Music-box melody: sparse pentatonic notes from bar 4 on.
    if (b >= 4 && !last) {
      for (let e = 0; e < 8; e++) {
        if (rand() < 0.28) {
          const n = pentatonic[Math.floor(rand() * pentatonic.length)];
          const t = t0 + swing(e);
          const o = c.createOscillator();
          o.type = 'sine';
          o.frequency.value = midi(n);
          const g = c.createGain();
          g.gain.setValueAtTime(0, t);
          g.gain.linearRampToValueAtTime(0.06, t + 0.008);
          g.gain.exponentialRampToValueAtTime(0.0001, t + 0.9);
          o.connect(g).connect(master);
          o.start(t);
          o.stop(t + 1);
        }
      }
    }
  }

  // Vinyl: soft hiss plus random crackles across the whole loop.
  const hiss = c.createBufferSource();
  hiss.buffer = noise;
  hiss.loop = true;
  const hissF = c.createBiquadFilter();
  hissF.type = 'lowpass';
  hissF.frequency.value = 3500;
  const hissG = c.createGain();
  hissG.gain.value = 0.012;
  hiss.connect(hissF).connect(hissG).connect(c.destination);
  hiss.start(0);
  for (let t = 0; t < length; t += 0.04 + rand() * 0.25) {
    noiseHit(t, 'highpass', 2500, 0.02 + rand() * 0.06, 0.008);
  }

  return c.startRendering();
}
