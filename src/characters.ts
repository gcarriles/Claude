// The household. Edit names, minutes, colors and copy here.

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
}

// How often (in minutes of focus time) the running nudge line changes.
export const NUDGE_EVERY_MIN = 5;

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
  },
];

export function getCharacter(id: string | null | undefined): Character {
  return CHARACTERS.find((c) => c.id === id) ?? CHARACTERS[0];
}
