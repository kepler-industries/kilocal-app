import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Card } from '../components/Card';
import { Eyebrow } from '../components/Eyebrow';
import { KCColors } from '../theme/colors';
import { KCBadges, type Badge } from '../data/mock';
import { useTheme } from '../theme/ThemeContext';

export function AchievementsScreen() {
  const { accent, dark } = useTheme();
  const unlocked = KCBadges.filter((b) => b.unlocked).length;

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
          Trophées
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
          Tes preuves de croquant 🥬
        </Text>
      </View>

      <View style={{ paddingHorizontal: 18, paddingTop: 18, gap: 14 }}>
        {/* Hero streak (gradient) */}
        <View style={{ borderRadius: 22, overflow: 'hidden' }}>
          <LinearGradient
            colors={['#FF6B1A', '#FFB740']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ padding: 18 }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>
              <Text style={{ fontSize: 56 }}>🔥</Text>
              <View>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 11,
                    fontFamily: 'Nunito_900Black',
                    fontWeight: '900',
                    letterSpacing: 1,
                    opacity: 0.9,
                  }}
                >
                  SÉRIE EN COURS
                </Text>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 38,
                    fontFamily: 'Nunito_900Black',
                    fontWeight: '900',
                    lineHeight: 40,
                    marginTop: 2,
                  }}
                >
                  7 jours
                </Text>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 12,
                    fontFamily: 'Nunito_700Bold',
                    fontWeight: '700',
                    marginTop: 4,
                    opacity: 0.95,
                  }}
                >
                  Record perso :{' '}
                  <Text style={{ fontFamily: 'Nunito_900Black', fontWeight: '900' }}>14 jours</Text>
                </Text>
              </View>
            </View>
            <View style={{ marginTop: 14, flexDirection: 'row', gap: 4 }}>
              {Array.from({ length: 14 }).map((_, i) => (
                <View
                  key={i}
                  style={{
                    flex: 1,
                    height: 6,
                    borderRadius: 999,
                    backgroundColor: i < 7 ? '#fff' : 'rgba(255,255,255,0.3)',
                  }}
                />
              ))}
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 6,
              }}
            >
              <Text style={{ color: '#fff', fontSize: 10, fontFamily: 'Nunito_800ExtraBold', fontWeight: '800', opacity: 0.9 }}>
                Aujourd&apos;hui
              </Text>
              <Text style={{ color: '#fff', fontSize: 10, fontFamily: 'Nunito_800ExtraBold', fontWeight: '800', opacity: 0.9 }}>
                +7 pour battre ton record
              </Text>
            </View>
          </LinearGradient>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between' }}>
          <Eyebrow>Badges</Eyebrow>
          <Text
            style={{
              fontSize: 12,
              fontFamily: 'Nunito_800ExtraBold',
              fontWeight: '800',
              color: accent.primary,
            }}
          >
            {unlocked}/{KCBadges.length} débloqués
          </Text>
        </View>

        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: -5 }}>
          {KCBadges.map((b) => (
            <View key={b.id} style={{ width: '33.333%', padding: 5 }}>
              <BadgeTile b={b} dark={dark} accentPrimary={accent.primary} />
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

function BadgeTile({ b, dark, accentPrimary }: { b: Badge; dark?: boolean; accentPrimary: string }) {
  return (
    <Card
      dark={dark}
      style={{
        padding: 12,
        alignItems: 'center',
        backgroundColor: b.unlocked ? (dark ? KCColors.darkCard : '#fff') : dark ? '#0F1419' : '#F5F3EE',
        borderColor: b.unlocked ? (dark ? KCColors.darkBorder : '#EAEAEA') : dark ? '#1F2630' : '#E5E1DA',
        opacity: b.unlocked ? 1 : 0.92,
      }}
    >
      <View
        style={{
          width: 56,
          height: 56,
          borderRadius: 28,
          backgroundColor: b.unlocked ? `${accentPrimary}22` : dark ? '#1A2029' : '#E8E4DC',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text style={{ fontSize: 30, opacity: b.unlocked ? 1 : 0.6 }}>{b.emoji}</Text>
      </View>
      <Text
        numberOfLines={1}
        style={{
          marginTop: 8,
          fontSize: 11,
          fontFamily: 'Nunito_900Black',
          fontWeight: '900',
          color: dark ? KCColors.darkText : KCColors.ink,
          textAlign: 'center',
        }}
      >
        {b.name}
      </Text>
      <Text
        numberOfLines={2}
        style={{
          marginTop: 3,
          fontSize: 9.5,
          fontFamily: 'Nunito_700Bold',
          fontWeight: '700',
          color: dark ? KCColors.darkSub : '#9AA0AC',
          lineHeight: 12,
          textAlign: 'center',
          minHeight: 24,
        }}
      >
        {b.desc}
      </Text>
      {b.unlocked ? (
        <Text
          style={{
            marginTop: 6,
            fontSize: 9,
            fontFamily: 'Nunito_800ExtraBold',
            fontWeight: '800',
            color: accentPrimary,
          }}
        >
          {b.date}
        </Text>
      ) : (
        <View
          style={{
            marginTop: 6,
            height: 4,
            width: '100%',
            backgroundColor: dark ? '#1F2630' : '#E5E1DA',
            borderRadius: 999,
            overflow: 'hidden',
          }}
        >
          <View
            style={{
              height: '100%',
              width: `${(b.progress || 0) * 100}%`,
              backgroundColor: accentPrimary,
            }}
          />
        </View>
      )}
    </Card>
  );
}
