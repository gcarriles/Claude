// The household. Edit names, minutes, colors, copy and houses here.

import type { FurnitureKind } from './components/furniture';

/** A spot in the house the character can hang out at. Room is 400 × 300; y is where they stand. */
export interface Station {
  x: number;
  y: number;
  activity: string;
}

export interface RoomTheme {
  wall: string;
  band: string; // lower wall stripe
  floor: string;
  floorLine: string;
  side: string; // side walls
}

export interface House {
  theme: RoomTheme;
  furniture: { kind: FurnitureKind; x: number; y: number; scale?: number }[];
  stations: Station[]; // visited in order while focus runs
  rest: Station; // where they go on break and when the set is done
}

export interface Character {
  id: string;
  name: string;
  role: string;
  initials: string; // shown if the portrait image is missing
  focusMin: number;
  breakMin: number;
  colors: {
    ink: string;
    inkDeep: string;
    inkLight: string;
    horizon: string;
  };
  copy: {
    head: string; // idle headline on the focus screen
    nudges: string[]; // rotates while the focus timer runs (see NUDGE_EVERY_MIN)
    break: string;
    done: string;
    streak: string; // reserved for the streaks feature (not shown yet)
  };
  house: House;
  /** Walk-cycle strip in public/art/sprites/<id>.png. Height is in room units (room is 300 tall). */
  sprite: { frames: number; height: number };
}

// How often (in minutes of focus time) the running nudge line changes.
export const NUDGE_EVERY_MIN = 5;

// How often (in minutes of focus time) the character moves to a new spot in their house.
export const ACTIVITY_EVERY_MIN = 2;

export const CHARACTERS: Character[] = [
  {
    id: 'mochi',
    name: 'Mochi',
    role: 'The Loaf',
    initials: 'MO',
    focusMin: 20,
    breakMin: 10,
    colors: { ink: '#2f8f4e', inkDeep: '#1b6033', inkLight: '#8fce9f', horizon: '#e6f4e4' },
    copy: {
      head: "I'll be on your keyboard if you need me. You need me.",
      nudges: [
        'Still working? Pet me. I can wait. I will not wait long.',
        "I've moved to the warm part of the laptop. You're welcome.",
        'My food bowl is half empty. Just saying. Keep going.',
        "Something fell off the desk. You didn't see that. Focus.",
      ],
      break: 'Break means lap time. Get in position.',
      done: 'Four rounds, zero belly rubs. Noted.',
      streak: 'Another day, another loaf. Consistency is my brand.',
    },
    sprite: { frames: 4, height: 50 },
    house: {
      theme: { wall: '#cfd8f2', band: '#b9c6ee', floor: '#efe3d3', floorLine: '#d9c9b4', side: '#c2cdeb' },
      furniture: [
        { kind: 'hangingStars', x: 200, y: 14 },
        { kind: 'wallClouds', x: 210, y: 70 },
        { kind: 'moonWindow', x: 318, y: 140 },
        { kind: 'kitchenette', x: 72, y: 228 },
        { kind: 'bonsaiTree', x: 196, y: 252 },
        { kind: 'pawRug', x: 300, y: 278 },
        { kind: 'moonBed', x: 336, y: 240 },
        { kind: 'yarnBalls', x: 240, y: 276 },
        { kind: 'bowl', x: 128, y: 282 },
      ],
      stations: [
        { x: 218, y: 101, activity: 'supervising from the bonsai' },
        { x: 300, y: 276, activity: 'loafing on the paw rug' },
        { x: 58, y: 164, activity: 'sitting in the sink, as one does' },
        { x: 318, y: 138, activity: 'moon-watching from the window' },
        { x: 150, y: 284, activity: 'staring at the food bowl' },
      ],
      rest: { x: 340, y: 232, activity: 'lap time. get in position.' },
    },
  },
  {
    id: 'yuki',
    name: 'Yuki',
    role: 'The Ghost',
    initials: 'YU',
    focusMin: 30,
    breakMin: 5,
    colors: { ink: '#d9a400', inkDeep: '#8a6a00', inkLight: '#f4dd8c', horizon: '#fdf5dc' },
    copy: {
      head: "I'm on the top shelf. Don't look at me.",
      nudges: [
        "You're doing fine. I'm not coming down.",
        "I gave you a slow blink. Don't make it weird.",
        'Still here. Still watching. Still not coming down.',
        "I'm pretending to sleep. Your phone should too.",
      ],
      break: 'Five minutes. You may have one head scratch.',
      done: 'Adequate. You may now approach.',
      streak: 'You came back. I noticed. I will not say more.',
    },
    sprite: { frames: 4, height: 46 },
    house: {
      theme: { wall: '#f6c9d6', band: '#f0b4c6', floor: '#f7d6e0', floorLine: '#efc2d0', side: '#efbccc' },
      furniture: [
        { kind: 'hangingStars', x: 200, y: 14 },
        { kind: 'frame', x: 80, y: 112 },
        { kind: 'starWindow', x: 330, y: 150 },
        { kind: 'catBed', x: 80, y: 262, scale: 1.2 },
        { kind: 'blossomTree', x: 200, y: 262 },
        { kind: 'cloudMat', x: 260, y: 286 },
      ],
      stations: [
        { x: 200, y: 87, activity: "on the top branch. don't look." },
        { x: 330, y: 148, activity: 'stargazing' },
        { x: 230, y: 159, activity: 'napping on a cloud' },
        { x: 260, y: 284, activity: 'guarding the food bowls' },
      ],
      rest: { x: 80, y: 256, activity: 'accepting one head scratch' },
    },
  },
  {
    id: 'geneva',
    name: 'Geneva',
    role: 'The Closer',
    initials: 'GE',
    focusMin: 25,
    breakMin: 5,
    colors: { ink: '#e0568f', inkDeep: '#aa0b56', inkLight: '#ffc0d0', horizon: '#fde4ee' },
    copy: {
      head: 'Twenty-five minutes. Hard thing first.',
      nudges: [
        'You opened a tab. I saw the tab. Close the tab.',
        'Is this the hard thing? Do the hard thing.',
        'Inbox can wait. It always waits.',
        'Ugly draft now. Pretty draft later. Keep moving.',
      ],
      break: 'Five. Four, really — you took a minute to start.',
      done: 'Done is done. Next.',
      streak: 'Streak alive. Protect it.',
    },
    sprite: { frames: 4, height: 84 },
    house: {
      theme: { wall: '#fbf3ec', band: '#f3dccf', floor: '#ddb084', floorLine: '#c4925f', side: '#f2e4d8' },
      furniture: [
        { kind: 'stringLights', x: 200, y: 22 },
        { kind: 'chalkboard', x: 340, y: 120 },
        { kind: 'archLibrary', x: 205, y: 214 },
        { kind: 'espressoBar', x: 62, y: 226 },
        { kind: 'lowBookcase', x: 330, y: 262 },
        { kind: 'globe', x: 344, y: 200 },
        { kind: 'plant', x: 312, y: 200, scale: 0.7 },
        { kind: 'lowBookcase', x: 150, y: 290 },
        { kind: 'laptop', x: 150, y: 228 },
      ],
      stations: [
        { x: 84, y: 266, activity: 'pulling an espresso shot' },
        { x: 205, y: 288, activity: 'answering the hard email' },
        { x: 205, y: 170, activity: 'reading in the nook' },
        { x: 282, y: 270, activity: 'reshelving the books' },
      ],
      rest: { x: 190, y: 170, activity: 'five minutes in the nook. four, really.' },
    },
  },
  {
    id: 'danny',
    name: 'Danny',
    role: 'The Slow Burn',
    initials: 'DA',
    focusMin: 40,
    breakMin: 15,
    colors: { ink: '#7a4fb5', inkDeep: '#553184', inkLight: '#c6b0e8', horizon: '#ece3f9' },
    copy: {
      head: "No rush. We've got all afternoon, technically.",
      nudges: [
        "You're doing great. Nobody's timing this. Well. It is timed.",
        'Little sip of water. Then back to it. No stress.',
        "Slow is smooth. Smooth is also slow. That's fine.",
        'Halfway is a vibe. Stay in the vibe.',
      ],
      break: 'Take fifteen. Take eighteen. Who is counting.',
      done: "See? Got there. Told you it wasn't a race.",
      streak: 'Look at us, showing up. Again. Casually.',
    },
    sprite: { frames: 4, height: 84 },
    house: {
      theme: { wall: '#4b3d7d', band: '#3d3168', floor: '#5a4a8f', floorLine: '#4a3c7a', side: '#3f3370' },
      furniture: [
        { kind: 'ledStrip', x: 200, y: 24 },
        { kind: 'neonController', x: 80, y: 66 },
        { kind: 'neonSign', x: 292, y: 82 },
        { kind: 'loftBed', x: 108, y: 214, scale: 0.8 },
        { kind: 'plant', x: 150, y: 124, scale: 0.55 },
        { kind: 'gamingDesk', x: 222, y: 220 },
        { kind: 'pcTower', x: 346, y: 228 },
        { kind: 'rug', x: 220, y: 282 },
        { kind: 'gamingChair', x: 212, y: 262 },
      ],
      stations: [
        { x: 212, y: 264, activity: "gaming. it's research." },
        { x: 300, y: 262, activity: 'tweaking the RGB' },
        { x: 84, y: 114, activity: 'reading up in the loft' },
        { x: 110, y: 282, activity: 'stretching. slowly.' },
      ],
      rest: { x: 84, y: 114, activity: 'napping in the loft' },
    },
  },
];

export function getCharacter(id: string | null | undefined): Character {
  return CHARACTERS.find((c) => c.id === id) ?? CHARACTERS[0];
}
