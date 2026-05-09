import React from 'react';
import { View, Pressable, Text } from 'react-native';
import { KCColors } from '../theme/colors';

export function TabPills({
  tabs,
  active,
  onChange,
  dark,
}: {
  tabs: string[];
  active: string;
  onChange: (t: string) => void;
  dark?: boolean;
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        gap: 6,
        backgroundColor: dark ? KCColors.darkCard : '#F4F2EE',
        borderWidth: 1.5,
        borderColor: dark ? KCColors.darkBorder : '#E5E1DA',
        padding: 4,
        borderRadius: 14,
      }}
    >
      {tabs.map((t) => {
        const isActive = active === t;
        return (
          <View key={t} style={{ flex: 1, marginBottom: isActive ? 3 : 0 }}>
            <Pressable
              onPress={() => onChange(t)}
              style={{
                paddingVertical: 12,
                paddingHorizontal: 8,
                borderRadius: 10,
                backgroundColor: isActive ? KCColors.blue : 'transparent',
                alignItems: 'center',
              }}
            >
              <Text
                numberOfLines={1}
                style={{
                  fontFamily: 'Nunito_800ExtraBold',
                  fontWeight: '800',
                  fontSize: 13,
                  color: isActive ? '#fff' : dark ? KCColors.darkSub : '#9AA0AC',
                }}
              >
                {t}
              </Text>
            </Pressable>
            {isActive && (
              <View
                style={{
                  height: 3,
                  backgroundColor: KCColors.blueD,
                  borderRadius: 10,
                  marginHorizontal: 0,
                }}
              />
            )}
          </View>
        );
      })}
    </View>
  );
}
