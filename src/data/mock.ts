// Mock data — Sat May 9 2026 = "today"

export type DayStatus = 'hit' | 'miss' | 'late' | 'future' | 'today' | 'empty';

export type DayCell = {
  code: string;
  day: number;
  status: DayStatus;
};

export const KCWeek: DayCell[] = [
  { code: 'ME', day: 6,  status: 'hit'    },
  { code: 'JE', day: 7,  status: 'hit'    },
  { code: 'VE', day: 8,  status: 'hit'    },
  { code: 'SA', day: 9,  status: 'today'  },
  { code: 'DI', day: 10, status: 'future' },
  { code: 'LU', day: 11, status: 'future' },
  { code: 'MA', day: 12, status: 'future' },
];

// Rough month grid for May 2026 (Friday = 1st)
export const KCMonth: DayCell[] = (() => {
  const arr: DayCell[] = [];
  for (let d = 1; d <= 31; d++) arr.push({ code: '', day: d, status: 'empty' });
  const set = (d: number, s: DayStatus) => { arr[d - 1].status = s; };
  set(1, 'miss');
  set(2, 'hit'); set(3, 'hit'); set(4, 'hit');
  set(5, 'miss');
  set(6, 'hit'); set(7, 'hit'); set(8, 'hit');
  set(9, 'today');
  return arr;
})();

export type Badge = {
  id: string;
  emoji: string;
  name: string;
  desc: string;
  unlocked: boolean;
  date?: string;
  progress?: number;
};

export const KCBadges: Badge[] = [
  { id: 'b1', emoji: '🌱', name: 'Première graine',     desc: 'Crée ton compte',                 unlocked: true,  date: '14 avr.' },
  { id: 'b2', emoji: '🔥', name: 'Trois en feu',        desc: 'Une série de 3 jours',            unlocked: true,  date: '17 avr.' },
  { id: 'b3', emoji: '🥇', name: 'Sept au sommet',      desc: 'Une série de 7 jours',            unlocked: true,  date: '24 avr.' },
  { id: 'b4', emoji: '⚖️', name: 'Pesée fidèle',         desc: '5 vraies pesées de suite',        unlocked: true,  date: '02 mai' },
  { id: 'b5', emoji: '📉', name: 'Le glissement',       desc: 'Première baisse de 1 kg',         unlocked: true,  date: '06 mai' },
  { id: 'b6', emoji: '🌙', name: 'Hibou nocturne',      desc: 'Loggue après 23 h',                unlocked: true,  date: '07 mai' },
  { id: 'b7', emoji: '🚀', name: 'Décollage',           desc: 'Termine 3 quêtes en un jour',     unlocked: false, progress: 0.66 },
  { id: 'b8', emoji: '🏔️', name: 'Trente sommets',      desc: 'Une série de 30 jours',           unlocked: false, progress: 0.43 },
  { id: 'b9', emoji: '💎', name: 'Diamant brut',        desc: 'Atteins le niveau 10',            unlocked: false, progress: 0.71 },
  { id: 'ba', emoji: '🌊', name: 'Marée basse',         desc: 'Perds 5 kg cumulés',              unlocked: false, progress: 0.55 },
  { id: 'bb', emoji: '🥬', name: 'Croquant suprême',    desc: 'Loggue 50 légumes',                unlocked: false, progress: 0.32 },
  { id: 'bc', emoji: '👑', name: 'Royal',               desc: 'Termine toutes les autres',       unlocked: false, progress: 0.05 },
];

export type Quest = {
  id: string;
  title: string;
  xp: number;
  done: boolean;
  emoji: string;
};

export const KCQuests: Quest[] = [
  { id: 'q1', title: 'Loggue tes calories',      xp: 30, done: true,  emoji: '✏️' },
  { id: 'q2', title: 'Bois 1,5 L d’eau',    xp: 20, done: true,  emoji: '💧' },
  { id: 'q3', title: 'Une vraie pesée du matin', xp: 25, done: false, emoji: '⚖️' },
  { id: 'q4', title: '6 000 pas',                xp: 35, done: false, emoji: '👟' },
];

export const KCDeficit30: number[] = [
  -480, -520, -610, -340, +180, -720, -510,
  -460, -390, -540, -410, -300, -250, +220,
  -380, -510, -640, -290, -550, -470, -390,
  -610, -520, -340, +120, -480, -550, -496,
  -549, -405,
];

export const KCWeight30: number[] = [
  77.0, 76.9, 76.8, 76.6, 76.6, 76.4, 76.2, 76.1, 76.0,
  75.9, 75.8, 75.7, 75.6, 75.7, 75.6, 75.5, 75.4, 75.3,
  75.2, 75.1, 75.0, 75.0, 75.1, 75.2, 75.1, 75.0, 75.0, 75.1, 75.0, 75.0,
];
