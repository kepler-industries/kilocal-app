import React from 'react';
import { View, type ViewStyle, type StyleProp } from 'react-native';
import { KCColors } from '../theme/colors';

export function Card({
  children,
  dark,
  style,
}: {
  children: React.ReactNode;
  dark?: boolean;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <View
      style={[
        {
          backgroundColor: dark ? KCColors.darkCard : '#fff',
          borderWidth: 1.5,
          borderColor: dark ? KCColors.darkBorder : '#EAEAEA',
          borderRadius: 22,
          padding: 18,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}
