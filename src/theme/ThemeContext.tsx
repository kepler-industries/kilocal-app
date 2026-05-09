import React, { createContext, useContext, useMemo, useState } from 'react';
import { KCAccentPresets, type AccentPreset, type Density, type Personality } from './colors';

type ThemeState = {
  accent: AccentPreset;
  accentKey: keyof typeof KCAccentPresets;
  setAccentKey: (k: keyof typeof KCAccentPresets) => void;
  dark: boolean;
  setDark: (v: boolean) => void;
  density: Density;
  setDensity: (v: Density) => void;
  mascotOn: boolean;
  setMascotOn: (v: boolean) => void;
  personality: Personality;
  setPersonality: (v: Personality) => void;
};

const ThemeCtx = createContext<ThemeState | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [accentKey, setAccentKey] = useState<keyof typeof KCAccentPresets>('classique');
  const [dark, setDark] = useState(false);
  const [density, setDensity] = useState<Density>('regular');
  const [mascotOn, setMascotOn] = useState(false);
  const [personality, setPersonality] = useState<Personality>('cheerful');

  const value = useMemo<ThemeState>(() => ({
    accent: KCAccentPresets[accentKey],
    accentKey,
    setAccentKey,
    dark,
    setDark,
    density,
    setDensity,
    mascotOn,
    setMascotOn,
    personality,
    setPersonality,
  }), [accentKey, dark, density, mascotOn, personality]);

  return <ThemeCtx.Provider value={value}>{children}</ThemeCtx.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeCtx);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
