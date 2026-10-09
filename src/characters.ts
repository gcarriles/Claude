// The household. Edit names, minutes, colors, copy and houses here.

/**
 * A spot in the house (public/art/house-<id>.png). The art is shown at 4:3 and
 * spots use 400 × 300 units: x left → right, y top → bottom, y = where they stand.
 */
export interface Station {
  x: number;
  y: number;
  activity: string;
  /** Frame in public/art/sprites/<id>-poses.png. People: 0 stand, 1 sit, 2 read, 3 sleep. Cats: 0 stand, 1 loaf, 2 sleep, 3 stretch. */
  pose?: number;
  /** Which way to face once there (otherwise: the way they walked in). */
  face?: 'left' | 'right';
}

export interface House {
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
export const ACTIVITY_EVERY_MIN = 1;

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
    sprite: { frames: 4, height: 34 },
    house: {
      stations: [
        { x: 104, y: 146, activity: 'supervising from the bonsai', pose: 0 },
        { x: 274, y: 224, activity: 'loafing on the paw rug', pose: 1 },
        { x: 306, y: 158, activity: 'sitting in the sink, as one does', pose: 0, face: 'left' },
        { x: 236, y: 182, activity: 'attacking the yarn', pose: 3, face: 'right' },
        { x: 182, y: 278, activity: 'staring at the food bowl', pose: 0 },
        { x: 80, y: 191, activity: 'loafing on the low branch', pose: 1, face: 'right' },
        { x: 208, y: 232, activity: 'sudden floor nap', pose: 2 },
        { x: 168, y: 260, activity: 'batting the other yarn', pose: 3, face: 'left' },
      ],
      rest: { x: 196, y: 150, activity: 'napping in the moon. lap later.', pose: 2 },
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
    sprite: { frames: 4, height: 32 },
    house: {
      stations: [
        { x: 221, y: 120, activity: "on the top branch. don't look.", pose: 0, face: 'left' },
        { x: 86, y: 168, activity: 'stargazing from the sofa', pose: 1, face: 'left' },
        { x: 210, y: 232, activity: 'grooming, very seriously', pose: 3 },
        { x: 286, y: 204, activity: 'guarding the food bowls', pose: 0, face: 'right' },
        { x: 193, y: 141, activity: 'loafing mid-tree', pose: 1, face: 'left' },
        { x: 236, y: 170, activity: 'napping under the blossoms', pose: 2 },
        { x: 300, y: 252, activity: 'patrolling the perimeter', pose: 0, face: 'left' },
      ],
      rest: { x: 110, y: 184, activity: 'accepting one head scratch', pose: 1 },
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
    sprite: { frames: 4, height: 72 },
    house: {
      stations: [
        { x: 96, y: 236, activity: 'pulling an espresso shot', pose: 0, face: 'left' },
        { x: 196, y: 246, activity: 'answering the hard email', pose: 0, face: 'left' },
        { x: 262, y: 170, activity: 'reading in the nook', pose: 2 },
        { x: 318, y: 228, activity: 'reshelving the books', pose: 0, face: 'right' },
        { x: 202, y: 190, activity: 'picking the next book', pose: 0, face: 'right' },
        { x: 258, y: 240, activity: 'watering the plant. growth mindset.', pose: 0, face: 'right' },
        { x: 210, y: 270, activity: 'reading on the floor. it counts.', pose: 2 },
      ],
      rest: { x: 262, y: 170, activity: 'five minutes in the nook. four, really.', pose: 3 },
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
    sprite: { frames: 4, height: 72 },
    house: {
      stations: [
        { x: 148, y: 206, activity: "gaming. it's research.", pose: 1, face: 'left' },
        { x: 184, y: 204, activity: 'tweaking the RGB', pose: 0, face: 'left' },
        { x: 198, y: 94, activity: 'reading up in the loft', pose: 2 },
        { x: 222, y: 250, activity: 'stretching. slowly.', pose: 0 },
        { x: 300, y: 208, activity: 'admiring the neon. it admires back.', pose: 0, face: 'right' },
        { x: 262, y: 160, activity: 'halfway up the ladder. taking five.', pose: 0, face: 'left' },
        { x: 262, y: 248, activity: 'sitting on the floor. vibing.', pose: 1 },
      ],
      rest: { x: 198, y: 94, activity: 'napping in the loft', pose: 3 },
    },
  },
];

export function getCharacter(id: string | null | undefined): Character {
  return CHARACTERS.find((c) => c.id === id) ?? CHARACTERS[0];
}
