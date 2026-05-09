import React from 'react';
import Svg, { Path, Circle, Rect, Defs, LinearGradient, Stop, Ellipse } from 'react-native-svg';
import { KCColors } from '../../theme/colors';

export function FlameIcon({ size = 22, lit = true }: { size?: number; lit?: boolean }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 22 22" fill="none">
      <Path
        d="M11 2 C11 7, 4 8, 4 14 C4 18, 7 20, 11 20 C15 20, 18 18, 18 14 C18 11, 15 9, 14 7 C13 9, 12 9, 11 8 C11 5, 12 4, 11 2 Z"
        fill={lit ? '#FF6B1A' : '#C5C5C5'}
      />
      <Path
        d="M11 9 C11 11, 8 12, 8 15 C8 17, 9 18, 11 18 C13 18, 14 17, 14 15 C14 13, 12 12, 11 11 Z"
        fill="#FFD43B"
      />
    </Svg>
  );
}

export function CalIcon({ color = KCColors.red, size = 20 }: { color?: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20">
      <Rect x={2} y={4} width={16} height={14} rx={2} stroke={color} strokeWidth={2} fill="none" />
      <Path d="M2 8h16M6 2v4M14 2v4" stroke={color} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}

export function BarsIcon({ color = KCColors.blue, size = 20 }: { color?: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20">
      <Rect x={3} y={10} width={3.5} height={7} rx={1} fill={color} />
      <Rect x={8.25} y={6} width={3.5} height={11} rx={1} fill={color} />
      <Rect x={13.5} y={3} width={3.5} height={14} rx={1} fill={color} />
    </Svg>
  );
}

export function TrophyIcon({ color = '#9C57FF', size = 20 }: { color?: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20">
      <Path d="M5 3h10v5a5 5 0 01-10 0V3z" stroke={color} strokeWidth={2} fill="none" strokeLinejoin="round" />
      <Path
        d="M5 5H2v2a3 3 0 003 3M15 5h3v2a3 3 0 01-3 3M8 17h4M10 13v4"
        stroke={color}
        strokeWidth={2}
        fill="none"
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function UserIcon2({ color = KCColors.green, size = 20 }: { color?: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20">
      <Circle cx={10} cy={7} r={3.2} stroke={color} strokeWidth={2} fill="none" />
      <Path d="M3 17c1.5-3 4-4.5 7-4.5s5.5 1.5 7 4.5" stroke={color} strokeWidth={2} fill="none" strokeLinecap="round" />
    </Svg>
  );
}

export function UserIcon({ dark, size = 20 }: { dark?: boolean; size?: number }) {
  const color = dark ? KCColors.darkText : KCColors.ink;
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20">
      <Circle cx={10} cy={6} r={3.2} stroke={color} strokeWidth={2} fill="none" />
      <Path d="M3 18c1.5-3.5 4-5 7-5s5.5 1.5 7 5" stroke={color} strokeWidth={2} fill="none" strokeLinecap="round" />
    </Svg>
  );
}

export function TargetIcon({ size = 20 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20">
      <Circle cx={10} cy={10} r={8} stroke={KCColors.green} strokeWidth={2} fill="none" />
      <Circle cx={10} cy={10} r={4.5} stroke={KCColors.green} strokeWidth={2} fill="none" />
      <Circle cx={10} cy={10} r={1.5} fill={KCColors.green} />
    </Svg>
  );
}

export function ScaleIcon({ size = 42 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 42 42">
      <Rect x={2} y={2} width={38} height={38} rx={11} fill={KCColors.blueSoft} />
      <Path
        d="M11 14h20M16 14v3M26 14v3M14 17l-3 8h8l-3-8M28 17l-3 8h8l-3-8M21 22v8M16 30h10"
        stroke={KCColors.blue}
        strokeWidth={2.2}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function ScaleMini({ size = 22 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 22 22">
      <Path
        d="M5 8h12M7 8v2M15 8v2M6 10l-2 5h5l-2-5M16 10l-2 5h5l-2-5M11 13v5M8 18h6"
        stroke={KCColors.blue}
        strokeWidth={1.8}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function MenuIcon({ dark, size = 26 }: { dark?: boolean; size?: number }) {
  const color = dark ? KCColors.darkText : KCColors.ink;
  return (
    <Svg width={size} height={size * 0.77} viewBox="0 0 26 20" fill="none">
      <Path d="M2 3h22M2 10h22M2 17h22" stroke={color} strokeWidth={2.6} strokeLinecap="round" />
    </Svg>
  );
}

export function CloseIcon({ dark, size = 22 }: { dark?: boolean; size?: number }) {
  const color = dark ? KCColors.darkText : KCColors.ink;
  return (
    <Svg width={size} height={size} viewBox="0 0 22 22" fill="none">
      <Path d="M5 5l12 12M17 5L5 17" stroke={color} strokeWidth={2.6} strokeLinecap="round" />
    </Svg>
  );
}

export function ChevronLeft({ dark, size = 18 }: { dark?: boolean; size?: number }) {
  const color = dark ? KCColors.darkText : KCColors.ink;
  return (
    <Svg width={size} height={size} viewBox="0 0 18 18" fill="none">
      <Path d="M12 3l-6 6 6 6" stroke={color} strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function ChevronRight({ dark, size = 14 }: { dark?: boolean; size?: number }) {
  const color = dark ? KCColors.darkText : KCColors.ink;
  return (
    <Svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <Path d="M5 2l5 5-5 5" stroke={color} strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function ChevronLeftSmall({ dark, size = 14 }: { dark?: boolean; size?: number }) {
  const color = dark ? KCColors.darkText : KCColors.ink;
  return (
    <Svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <Path d="M9 2L4 7l5 5" stroke={color} strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function CheckIcon({ size = 14 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <Path d="M3 7l3 3 5-6" stroke="#fff" strokeWidth={2.6} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function PencilIcon({ size = 14, color = KCColors.blue }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <Path d="M9 1l4 4-9 9H0v-4z" fill={color} />
    </Svg>
  );
}

export function LogoutIcon({ dark, size = 20 }: { dark?: boolean; size?: number }) {
  const color = dark ? KCColors.darkText : KCColors.ink;
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20">
      <Path
        d="M3 4h9v12H3M16 6l4 4-4 4M20 10H8"
        stroke={color}
        strokeWidth={2}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function LeafLogo({ size = 28, withFace }: { size?: number; withFace?: boolean }) {
  return (
    <Svg width={size} height={size * 1.18} viewBox="0 0 40 47">
      <Defs>
        <LinearGradient id="kcLeaf" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0%" stopColor="#65DC34" />
          <Stop offset="100%" stopColor="#3FB016" />
        </LinearGradient>
      </Defs>
      <Path
        d="M20 2 C32 16 38 26 38 33 C38 41 30 46 20 46 C10 46 2 41 2 33 C2 26 8 16 20 2 Z"
        fill="url(#kcLeaf)"
      />
      <Path
        d="M20 2 C32 16 38 26 38 33"
        fill="none"
        stroke="rgba(255,255,255,0.35)"
        strokeWidth={2.2}
        strokeLinecap="round"
      />
      {withFace && (
        <>
          <Ellipse cx={15} cy={21} rx={1.6} ry={2.2} fill="#1F2A1A" />
          <Ellipse cx={25} cy={21} rx={1.6} ry={2.2} fill="#1F2A1A" />
        </>
      )}
    </Svg>
  );
}

export function UpwardChartIcon({ size = 28, color = KCColors.blue }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 28 28">
      <Path d="M4 8l8 8 4-4 8 8" stroke={color} strokeWidth={3} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M18 20h6v-6" stroke={color} strokeWidth={3} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}
