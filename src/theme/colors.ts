// Color palette extracted from the Kilocal design system.
// Mirrors the Duolingo-style "tactile" approach: solid color top + darker bottom edge.

export const KCColors = {
  // base palette
  green: '#4ECB1F',
  greenD: '#3AA816',
  greenSoft: '#E8F8DD',
  orange: '#FF9416',
  orangeD: '#E07700',
  orangeSoft: '#FFEFD9',
  blue: '#14C0F5',
  blueD: '#0FA0CC',
  blueSoft: '#DCF3FF',
  red: '#FF4945',
  redD: '#D63630',
  redSoft: '#FFE0DE',
  selectRing: '#1CB0F6',
  ink: '#2B3140',
  inkSoft: '#5A6172',
  border: '#E5E5E5',
  bgLight: '#FFFFFF',
  bgPaper: '#FAF7F2',
  bgGray: '#F1F1F1',
  // dark mode
  darkBg: '#0F1419',
  darkCard: '#1A2029',
  darkBorder: '#2A323D',
  darkText: '#EEF2F6',
  darkSub: '#8C95A3',
} as const;

export type AccentPreset = {
  name: string;
  primary: string;
  primaryD: string;
  cta: string;
  ctaD: string;
};

export const KCAccentPresets: Record<string, AccentPreset> = {
  classique: { name: 'Classique', primary: '#4ECB1F', primaryD: '#3AA816', cta: '#14C0F5', ctaD: '#0FA0CC' },
  agrume:    { name: 'Agrumes',   primary: '#FF8A30', primaryD: '#E06A10', cta: '#9C57FF', ctaD: '#7B3DDD' },
  myrtille:  { name: 'Myrtille',  primary: '#5C7CFF', primaryD: '#3D58D9', cta: '#FF4D8C', ctaD: '#D9306E' },
  matcha:    { name: 'Matcha',    primary: '#7CB342', primaryD: '#598B2F', cta: '#FF7043', ctaD: '#D9522A' },
};

export type Density = 'cozy' | 'regular';
export type Personality = 'cheerful' | 'chill' | 'coach';
