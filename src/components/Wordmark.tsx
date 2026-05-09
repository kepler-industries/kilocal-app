import React from 'react';
import { View, Text } from 'react-native';
import { LeafLogo } from './icons';
import { KCColors } from '../theme/colors';

export function Wordmark({ size = 28, dark }: { size?: number; dark?: boolean }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
      <LeafLogo size={size} />
      <Text
        style={{
          fontFamily: 'Nunito_900Black',
          fontSize: size,
          fontWeight: '900',
          letterSpacing: -0.5,
          color: dark ? KCColors.darkText : KCColors.ink,
        }}
      >
        Kilocal
      </Text>
    </View>
  );
}
