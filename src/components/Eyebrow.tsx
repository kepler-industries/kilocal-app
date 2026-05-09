import React from 'react';
import { Text, type TextStyle, type StyleProp } from 'react-native';

export function Eyebrow({
  children,
  color = '#9AA0AC',
  style,
}: {
  children: React.ReactNode;
  color?: string;
  style?: StyleProp<TextStyle>;
}) {
  return (
    <Text
      style={[
        {
          fontFamily: 'Nunito_800ExtraBold',
          fontSize: 12,
          fontWeight: '800',
          letterSpacing: 1.2,
          color,
          textTransform: 'uppercase',
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
}
