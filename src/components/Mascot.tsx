import React from 'react';
import { View, Text } from 'react-native';
import Svg, { Path, Defs, LinearGradient, Stop, Ellipse } from 'react-native-svg';
import { KCColors } from '../theme/colors';
import type { Personality } from '../theme/colors';

type Mood = 'idle' | 'celebrate' | 'sad' | 'thinking' | 'sleep' | 'wave';

const mouths: Record<Mood, string> = {
  idle:      'M16 28 Q20 32 24 28',
  celebrate: 'M14 26 Q20 35 26 26 L24 28 L20 32 L16 28 Z',
  sad:       'M16 32 Q20 28 24 32',
  thinking:  'M17 30 Q20 30 23 30',
  sleep:     'M17 30 Q20 32 23 30',
  wave:      'M16 28 Q20 33 24 28',
};

export function Mascot({
  size = 80,
  personality = 'cheerful',
  mood = 'idle',
}: {
  size?: number;
  personality?: Personality;
  mood?: Mood;
}) {
  const w = size;
  const h = size * 1.18;
  const blush = mood === 'celebrate' || mood === 'wave';
  const mouthD = mouths[mood];

  return (
    <Svg width={w} height={h} viewBox="0 0 40 47">
      <Defs>
        <LinearGradient id={`mleaf-${personality}-${mood}`} x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0%" stopColor="#7BE74A" />
          <Stop offset="100%" stopColor="#3FB016" />
        </LinearGradient>
      </Defs>
      <Path
        d="M20 2 C32 16 38 26 38 33 C38 41 30 46 20 46 C10 46 2 41 2 33 C2 26 8 16 20 2 Z"
        fill={`url(#mleaf-${personality}-${mood})`}
      />
      <Path
        d="M20 4 C28 14 32 22 32 28"
        fill="none"
        stroke="rgba(255,255,255,0.4)"
        strokeWidth={2.2}
        strokeLinecap="round"
      />
      <Ellipse cx={15} cy={21} rx={1.6} ry={mood === 'sleep' ? 0.8 : 2.2} fill="#1F2A1A" />
      <Ellipse cx={25} cy={21} rx={1.6} ry={mood === 'sleep' ? 0.8 : 2.2} fill="#1F2A1A" />
      <Path
        d={mouthD}
        stroke="#1F2A1A"
        strokeWidth={1.6}
        fill={mood === 'celebrate' ? '#1F2A1A' : 'none'}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {blush && (
        <>
          <Ellipse cx={11} cy={27} rx={2} ry={1.3} fill="#FF7AA8" opacity={0.7} />
          <Ellipse cx={29} cy={27} rx={2} ry={1.3} fill="#FF7AA8" opacity={0.7} />
        </>
      )}
      {personality === 'coach' && (
        <Path d="M12 9 L20 14 L28 9 L26 14 L20 17 L14 14 Z" fill="#1F2A1A" opacity={0.85} />
      )}
      {personality === 'chill' && <Ellipse cx={32} cy={13} rx={3} ry={2} fill="#fff" opacity={0.5} />}
    </Svg>
  );
}

export function MascotBubble({
  message,
  personality,
  mood,
  dark,
}: {
  message: React.ReactNode;
  personality?: Personality;
  mood?: Mood;
  dark?: boolean;
}) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 10, paddingHorizontal: 4 }}>
      <Mascot size={64} personality={personality} mood={mood} />
      <View
        style={{
          flex: 1,
          backgroundColor: dark ? KCColors.darkCard : '#fff',
          borderWidth: 1.5,
          borderColor: dark ? KCColors.darkBorder : '#EAEAEA',
          borderRadius: 18,
          paddingVertical: 12,
          paddingHorizontal: 14,
          marginBottom: 8,
          position: 'relative',
        }}
      >
        {typeof message === 'string' ? (
          <Text
            style={{
              fontFamily: 'Nunito_700Bold',
              fontSize: 14,
              fontWeight: '700',
              color: dark ? KCColors.darkText : KCColors.ink,
              lineHeight: 19,
            }}
          >
            {message}
          </Text>
        ) : (
          message
        )}
      </View>
    </View>
  );
}
