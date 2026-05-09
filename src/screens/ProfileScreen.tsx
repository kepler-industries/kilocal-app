import React from 'react';
import { ScrollView, View, Text, Pressable } from 'react-native';
import { Card } from '../components/Card';
import { Eyebrow } from '../components/Eyebrow';
import { XPBar } from '../components/XPBar';
import { UserIcon, TargetIcon, PencilIcon } from '../components/icons';
import { KCColors } from '../theme/colors';
import { useTheme } from '../theme/ThemeContext';

export function ProfileScreen() {
  const { dark } = useTheme();

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: dark ? KCColors.darkBg : '#fff' }}
      contentContainerStyle={{ paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={{ paddingHorizontal: 22, paddingTop: 14, alignItems: 'center' }}>
        <Text
          style={{
            fontFamily: 'Nunito_900Black',
            fontWeight: '900',
            fontSize: 30,
            color: dark ? KCColors.darkText : KCColors.ink,
            letterSpacing: -0.5,
          }}
        >
          Mon Profil
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
          Tes données et objectifs
        </Text>
      </View>

      <View style={{ paddingHorizontal: 18, paddingTop: 18, gap: 14 }}>
        <Card dark={dark} style={{ padding: 18 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <UserIcon dark={dark} />
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: 'Nunito_800ExtraBold',
                  fontWeight: '800',
                  color: dark ? KCColors.darkText : KCColors.ink,
                }}
              >
                Informations
              </Text>
            </View>
            <Pressable style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
              <PencilIcon size={14} color={KCColors.blue} />
              <Text
                style={{
                  color: KCColors.blue,
                  fontFamily: 'Nunito_800ExtraBold',
                  fontWeight: '800',
                  fontSize: 14,
                }}
              >
                Modifier
              </Text>
            </Pressable>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14, marginTop: 14 }}>
            <View
              style={{
                width: 64,
                height: 64,
                borderRadius: 32,
                backgroundColor: KCColors.blue,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 4,
              }}
            >
              <Text
                style={{
                  color: '#fff',
                  fontSize: 28,
                  fontFamily: 'Nunito_900Black',
                  fontWeight: '900',
                }}
              >
                A
              </Text>
            </View>
            <View>
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: 'Nunito_900Black',
                  fontWeight: '900',
                  color: dark ? KCColors.darkText : KCColors.ink,
                  letterSpacing: -0.3,
                }}
              >
                Alexandre
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  fontFamily: 'Nunito_700Bold',
                  fontWeight: '700',
                  color: dark ? KCColors.darkSub : '#9AA0AC',
                }}
              >
                a.legal.contact@gmail.com
              </Text>
              <Text
                style={{
                  fontSize: 11,
                  fontFamily: 'Nunito_700Bold',
                  fontWeight: '700',
                  color: dark ? KCColors.darkSub : '#B5B5B5',
                  marginTop: 2,
                }}
              >
                Membre depuis avril 2026
              </Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', gap: 10, marginTop: 14 }}>
            <InfoTile label="Taille" value="171 cm" dark={dark} />
            <InfoTile label="Sexe" value="Homme" dark={dark} />
          </View>
        </Card>

        <Card dark={dark} style={{ padding: 18 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <TargetIcon />
            <Text
              style={{
                fontSize: 14,
                fontFamily: 'Nunito_800ExtraBold',
                fontWeight: '800',
                color: dark ? KCColors.darkText : KCColors.ink,
              }}
            >
              Objectif actif
            </Text>
          </View>
          <View
            style={{
              marginTop: 14,
              padding: 14,
              backgroundColor: dark ? '#102014' : '#F2FBE9',
              borderRadius: 14,
              borderWidth: 1.5,
              borderColor: dark ? '#1A4022' : '#D5EDB8',
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <View>
                <Text
                  style={{
                    fontSize: 11,
                    fontFamily: 'Nunito_800ExtraBold',
                    fontWeight: '800',
                    color: '#3F6418',
                    letterSpacing: 0.6,
                    textTransform: 'uppercase',
                  }}
                >
                  Sèche
                </Text>
                <Text
                  style={{
                    fontSize: 22,
                    fontFamily: 'Nunito_900Black',
                    fontWeight: '900',
                    color: dark ? KCColors.darkText : KCColors.ink,
                    marginTop: 2,
                    letterSpacing: -0.3,
                  }}
                >
                  76 → 72 kg
                </Text>
              </View>
              <Text style={{ fontSize: 38 }}>📉</Text>
            </View>
            <View style={{ marginTop: 10 }}>
              <XPBar value={50} max={100} color={KCColors.green} height={12} />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 6,
                }}
              >
                <Text
                  style={{
                    fontSize: 11,
                    fontFamily: 'Nunito_800ExtraBold',
                    fontWeight: '800',
                    color: dark ? KCColors.darkSub : '#7A8390',
                  }}
                >
                  −2 kg parcourus
                </Text>
                <Text
                  style={{
                    fontSize: 11,
                    fontFamily: 'Nunito_800ExtraBold',
                    fontWeight: '800',
                    color: dark ? KCColors.darkSub : '#7A8390',
                  }}
                >
                  4 kg restants
                </Text>
              </View>
            </View>
          </View>
        </Card>

        <Card dark={dark} style={{ padding: 18 }}>
          <Eyebrow>Statistiques</Eyebrow>
          <View style={{ flexDirection: 'row', gap: 10, marginTop: 12 }}>
            <BigStat value="42" label="Jours actifs" color={KCColors.blue} dark={dark} />
            <BigStat value="6" label="Badges" color={KCColors.orange} dark={dark} />
            <BigStat value="14" label="Record série" color={KCColors.green} dark={dark} />
          </View>
        </Card>
      </View>
    </ScrollView>
  );
}

function InfoTile({ label, value, dark }: { label: string; value: string; dark?: boolean }) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: dark ? '#0F1419' : '#FBFAF7',
        borderWidth: 1.5,
        borderColor: dark ? KCColors.darkBorder : '#EFECE5',
        borderRadius: 14,
        padding: 12,
      }}
    >
      <Text
        style={{
          fontSize: 10,
          fontFamily: 'Nunito_800ExtraBold',
          fontWeight: '800',
          color: dark ? KCColors.darkSub : '#9AA0AC',
          letterSpacing: 0.6,
          textTransform: 'uppercase',
        }}
      >
        {label}
      </Text>
      <Text
        style={{
          fontSize: 16,
          fontFamily: 'Nunito_900Black',
          fontWeight: '900',
          color: dark ? KCColors.darkText : KCColors.ink,
          marginTop: 4,
        }}
      >
        {value}
      </Text>
    </View>
  );
}

function BigStat({
  value,
  label,
  color,
  dark,
}: {
  value: string;
  label: string;
  color: string;
  dark?: boolean;
}) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: dark ? '#0F1419' : '#FBFAF7',
        borderWidth: 1.5,
        borderColor: dark ? KCColors.darkBorder : '#EFECE5',
        borderRadius: 14,
        padding: 12,
        alignItems: 'center',
      }}
    >
      <Text
        style={{
          fontSize: 24,
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
          textAlign: 'center',
        }}
      >
        {label}
      </Text>
    </View>
  );
}
