import React from 'react';
import { Text } from 'react-native';
import { Chunky } from './Chunky';
import { KCColors } from '../theme/colors';
import type { DayStatus } from '../data/mock';

const palette: Record<DayStatus, { c: string; d: string; text: string }> = {
  hit:    { c: KCColors.green,  d: KCColors.greenD,  text: '#fff' },
  miss:   { c: KCColors.orange, d: KCColors.orangeD, text: '#fff' },
  late:   { c: KCColors.red,    d: KCColors.redD,    text: '#fff' },
  today:  { c: KCColors.red,    d: KCColors.redD,    text: '#fff' },
  future: { c: '#E2E2E2',       d: '#C3C3C3',        text: '#9A9A9A' },
  empty:  { c: '#EFEFEF',       d: '#D4D4D4',        text: '#A8A8A8' },
};

export function DayPill({
  code,
  day,
  status,
  onPress,
}: {
  code?: string;
  day: number;
  status: DayStatus;
  onPress?: () => void;
}) {
  const p = palette[status];
  const selected = status === 'today';

  return (
    <Chunky
      color={p.c}
      depthColor={p.d}
      radius={14}
      depth={5}
      paddingHorizontal={0}
      paddingVertical={0}
      selected={selected}
      onPress={onPress}
      innerStyle={{
        flexDirection: 'column',
        minWidth: 46,
        height: 60,
      }}
    >
      {code ? (
        <Text
          style={{
            fontSize: 11,
            fontFamily: 'Nunito_800ExtraBold',
            fontWeight: '800',
            color: p.text,
            opacity: 0.95,
            marginTop: 8,
            letterSpacing: 0.4,
          }}
        >
          {code}
        </Text>
      ) : null}
      <Text
        style={{
          fontSize: 22,
          fontFamily: 'Nunito_900Black',
          fontWeight: '900',
          color: p.text,
          marginTop: code ? 2 : 18,
          lineHeight: 22,
        }}
      >
        {day}
      </Text>
    </Chunky>
  );
}
