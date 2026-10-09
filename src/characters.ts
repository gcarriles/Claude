// The household. Edit names, minutes, colors, copy and houses here.

import type { FurnitureKind } from './components/furniture';

/** A spot in the house the character can hang out at. Room is 400 × 300; y is where they stand. */
export interface Station {
  x: number;
  y: number;
  activity: string;
}

export interface House {
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
    house: {
      furniture: [
        { kind: 'window', x: 120, y: 125 },
        { kind: 'catTree', x: 52, y: 238 },
        { kind: 'desk', x: 292, y: 215 },
        { kind: 'tableLamp', x: 330, y: 165 },
        { kind: 'plant', x: 372, y: 228 },
        { kind: 'rug', x: 175, y: 262 },
        { kind: 'bowl', x: 250, y: 284 },
      ],
      stations: [
        { x: 270, y: 166, activity: 'sitting on your keyboard' },
        { x: 175, y: 262, activity: 'loafing in the sunbeam' },
        { x: 52, y: 112, activity: 'supervising from the cat tree' },
        { x: 250, y: 284, activity: 'staring at the food bowl' },
      ],
      rest: { x: 175, y: 262, activity: 'lap time. get in position.' },
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
    house: {
      furniture: [
        { kind: 'window', x: 150, y: 128 },
        { kind: 'frame', x: 248, y: 100 },
        { kind: 'bookshelf', x: 330, y: 215 },
        { kind: 'floorLamp', x: 40, y: 226 },
        { kind: 'plant', x: 232, y: 222 },
        { kind: 'rug', x: 200, y: 266 },
        { kind: 'catBed', x: 95, y: 270 },
      ],
      stations: [
        { x: 330, y: 71, activity: "on the top shelf. don't look." },
        { x: 150, y: 128, activity: 'staring out the window' },
        { x: 200, y: 266, activity: 'grooming, very seriously' },
        { x: 250, y: 226, activity: 'inspecting the plant' },
      ],
      rest: { x: 95, y: 262, activity: 'accepting one head scratch' },
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
    house: {
      furniture: [
        { kind: 'window', x: 315, y: 120 },
        { kind: 'desk', x: 95, y: 215 },
        { kind: 'tableLamp', x: 130, y: 165 },
        { kind: 'vanity', x: 205, y: 212 },
        { kind: 'plant', x: 26, y: 232 },
        { kind: 'bed', x: 318, y: 252 },
        { kind: 'rug', x: 170, y: 270 },
      ],
      stations: [
        { x: 80, y: 222, activity: 'answering the hard email' },
        { x: 205, y: 222, activity: 'tidying the vanity' },
        { x: 40, y: 262, activity: 'watering the plants' },
        { x: 318, y: 228, activity: 'making the bed. hospital corners.' },
      ],
      rest: { x: 330, y: 222, activity: 'five minutes horizontal. four, really.' },
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
    house: {
      furniture: [
        { kind: 'window', x: 150, y: 120 },
        { kind: 'shortShelf', x: 260, y: 212 },
        { kind: 'recordPlayer', x: 340, y: 214 },
        { kind: 'floorLamp', x: 44, y: 240 },
        { kind: 'plant', x: 380, y: 236 },
        { kind: 'couch', x: 150, y: 252 },
        { kind: 'rug', x: 215, y: 276 },
        { kind: 'coffeeTable', x: 250, y: 286 },
      ],
      stations: [
        { x: 130, y: 226, activity: 'reading a book on the couch' },
        { x: 340, y: 230, activity: 'flipping the record' },
        { x: 200, y: 276, activity: 'sweeping. slowly.' },
        { x: 260, y: 230, activity: 'browsing for a different book' },
      ],
      rest: { x: 150, y: 226, activity: 'horizontal on the couch' },
    },
  },
];

export function getCharacter(id: string | null | undefined): Character {
  return CHARACTERS.find((c) => c.id === id) ?? CHARACTERS[0];
}
