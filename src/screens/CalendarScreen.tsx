import React, { useState } from 'react';
import { ScrollView, View, Text, Pressable } from 'react-native';
import { Card } from '../components/Card';
import { Chunky } from '../components/Chunky';
import { DayPill } from '../components/DayPill';
import { ChevronLeftSmall, ChevronRight } from '../components/icons';
import { KCColors } from '../theme/colors';
import { KCMonth, type DayCell } from '../data/mock';
import { useTheme } from '../theme/ThemeContext';

export function CalendarScreen() {
  const { dark } = useTheme();
  const [, setMonthOffset] = useState(0);
  const startCol = 4; // May 2026: 1st = Vendredi (col index 4)

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: dark ? KCColors.darkBg : '#fff' }}
      contentContainerStyle={{ paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={{ paddingTop: 14, paddingHorizontal: 22, alignItems: 'center' }}>
        <Text
          style={{
            fontFamily: 'Nunito_900Black',
            fontWeight: '900',
            fontSize: 30,
            color: dark ? KCColors.darkText : KCColors.ink,
            letterSpacing: -0.5,
          }}
        >
          Calendrier
        </Text>
        <Text
          style={{
            fontSize: 14,
            fontFamily: 'Nunito_700Bold',
            fontWeight: '700',
            color: dark ? KCColors.darkSub : KCColors.inkSoft,
            marginTop: 2,
          }}
        >
          Ton historique mois par mois
        </Text>
      </View>

      <View style={{ paddingHorizontal: 18, paddingTop: 18 }}>
        <Card dark={dark} style={{ padding: 18 }}>
          {/* Month header */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 16,
            }}
          >
            <NavBtn dark={dark} onPress={() => setMonthOffset((o) => o - 1)}>
              <ChevronLeftSmall dark={dark} />
            </NavBtn>
            <Text
              style={{
                fontFamily: 'Nunito_900Black',
                fontWeight: '900',
                fontSize: 20,
                color: dark ? KCColors.darkText : KCColors.ink,
              }}
            >
              Mai 2026
            </Text>
            <NavBtn dark={dark} onPress={() => setMonthOffset((o) => o + 1)}>
              <ChevronRight dark={dark} />
            </NavBtn>
          </View>

          {/* DOW header */}
          <View style={{ flexDirection: 'row', marginBottom: 6 }}>
            {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((d, i) => (
              <View key={i} style={{ flex: 1, alignItems: 'center' }}>
                <Text
                  style={{
                    fontSize: 11,
                    fontFamily: 'Nunito_800ExtraBold',
                    fontWeight: '800',
                    color: dark ? KCColors.darkSub : '#9AA0AC',
                    letterSpacing: 0.4,
                  }}
                >
                  {d}
                </Text>
              </View>
            ))}
          </View>

          {/* Days grid */}
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {Array.from({ length: startCol }).map((_, i) => (
              <View key={`b${i}`} style={{ width: `${100 / 7}%`, padding: 2 }} />
            ))}
            {KCMonth.map((d) => (
              <View key={d.day} style={{ width: `${100 / 7}%`, padding: 2 }}>
                <CalendarTile d={d} />
              </View>
            ))}
          </View>
        </Card>

        {/* Legend */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: 18,
            paddingHorizontal: 4,
          }}
        >
          {[
            { c: KCColors.green, l: 'Objectif visé' },
            { c: KCColors.orange, l: 'Objectif raté' },
            { c: KCColors.red, l: 'Manquant' },
          ].map((x) => (
            <View key={x.l} style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: x.c }} />
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: 'Nunito_700Bold',
                  fontWeight: '700',
                  color: dark ? KCColors.darkSub : '#9AA0AC',
                }}
              >
                {x.l}
              </Text>
            </View>
          ))}
        </View>

        {/* Month summary */}
        <View style={{ flexDirection: 'row', gap: 10, marginTop: 18 }}>
          <SmallStat label="Jours réussis" value="7" color={KCColors.green} dark={dark} />
          <SmallStat label="Jours ratés" value="2" color={KCColors.orange} dark={dark} />
          <SmallStat label="Manquants" value="0" color={KCColors.red} dark={dark} />
        </View>
      </View>
    </ScrollView>
  );
}

function CalendarTile({ d }: { d: DayCell }) {
  if (d.status === 'empty') {
    return (
      <Chunky color="#EFEFEF" depthColor="#D4D4D4" radius={11} depth={3} paddingVertical={0} paddingHorizontal={0} innerStyle={{ height: 38 }}>
        <Text style={{ color: '#A8A8A8', fontSize: 13, fontFamily: 'Nunito_800ExtraBold', fontWeight: '800' }}>{d.day}</Text>
      </Chunky>
    );
  }
  return <DayPill code="" day={d.day} status={d.status} />;
}

function NavBtn({
  children,
  onPress,
  dark,
}: {
  children: React.ReactNode;
  onPress?: () => void;
  dark?: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        width: 38,
        height: 38,
        borderWidth: 1.5,
        borderColor: dark ? KCColors.darkBorder : '#E5E1DA',
        borderRadius: 12,
        backgroundColor: dark ? KCColors.darkCard : '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {children}
    </Pressable>
  );
}

function SmallStat({
  label,
  value,
  color,
  dark,
}: {
  label: string;
  value: string;
  color: string;
  dark?: boolean;
}) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: dark ? KCColors.darkCard : '#FBFAF7',
        borderWidth: 1.5,
        borderColor: dark ? KCColors.darkBorder : '#EFECE5',
        borderRadius: 14,
        padding: 12,
        alignItems: 'center',
      }}
    >
      <Text
        style={{
          fontSize: 22,
          fontFamily: 'Nunito_900Black',
          fontWeight: '900',
          color,
          letterSpacing: -0.3,
        }}
      >
        {value}
      </Text>
      <Text
        style={{
          fontSize: 10,
          fontFamily: 'Nunito_800ExtraBold',
          fontWeight: '800',
          color: dark ? KCColors.darkSub : '#9AA0AC',
          letterSpacing: 0.4,
          textTransform: 'uppercase',
          marginTop: 2,
        }}
      >
        {label}
      </Text>
    </View>
  );
}
