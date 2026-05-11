import React, { useState } from 'react';
import { ScrollView, View, Text, Pressable } from 'react-native';
import { Card } from '../components/Card';
import { Chunky } from '../components/Chunky';
import { DayPill } from '../components/DayPill';
import { Eyebrow } from '../components/Eyebrow';
import { XPBar } from '../components/XPBar';
import { MascotBubble } from '../components/Mascot';
import { FlameIcon, ScaleIcon, CheckIcon } from '../components/icons';
import { KCColors } from '../theme/colors';
import { KCWeek, KCQuests, type Quest } from '../data/mock';
import { useTheme } from '../theme/ThemeContext';
import { useSession } from '../lib/auth-client';

export function HomeScreen({ onCelebrate }: { onCelebrate?: (q: Quest) => void }) {
  const { accent, dark, density, mascotOn, personality } = useTheme();
  const { data: session } = useSession();
  const firstName =
    session?.user?.name?.trim().split(/\s+/)[0] ||
    session?.user?.email?.split('@')[0] ||
    'toi';
  const pad = density === 'cozy' ? 14 : 18;
  const gap = density === 'cozy' ? 12 : 16;

  const [streak] = useState(7);
  const [xp, setXp] = useState(50);
  const [questsState, setQuestsState] = useState(KCQuests);

  const xpForLevel = 300;
  const level = Math.floor(xp / xpForLevel) + 4;
  const xpInLevel = xp % xpForLevel;

  const toggleQuest = (id: string) => {
    setQuestsState((qs) =>
      qs.map((q) => {
        if (q.id !== id) return q;
        if (!q.done) {
          setXp((prev) => prev + q.xp);
          if (q.id === 'q3' || q.id === 'q4') onCelebrate?.(q);
        }
        return { ...q, done: !q.done };
      })
    );
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: dark ? KCColors.darkBg : '#fff' }}
      contentContainerStyle={{ paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Week strip */}
      <View
        style={{
          flexDirection: 'row',
          gap: 8,
          paddingTop: pad,
          paddingHorizontal: 18,
          paddingBottom: 6,
          justifyContent: 'space-between',
        }}
      >
        {KCWeek.map((d) => (
          <DayPill key={d.day} code={d.code} day={d.day} status={d.status} />
        ))}
      </View>

      <Text
        style={{
          textAlign: 'center',
          paddingTop: 14,
          paddingBottom: 4,
          fontFamily: 'Nunito_900Black',
          fontWeight: '900',
          fontSize: 26,
          color: dark ? KCColors.darkText : KCColors.ink,
          letterSpacing: -0.4,
        }}
      >
        Aujourd&apos;hui
      </Text>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 13,
          fontFamily: 'Nunito_700Bold',
          fontWeight: '700',
          color: dark ? KCColors.darkSub : '#9AA0AC',
          letterSpacing: 0.2,
        }}
      >
        Samedi 9 mai
      </Text>

      <View style={{ flexDirection: 'column', gap, paddingTop: gap, paddingHorizontal: pad }}>
        {/* Mascot greeting */}
        {mascotOn && (
          <MascotBubble
            personality={personality}
            mood="idle"
            dark={dark}
            message={
              <Text
                style={{
                  fontFamily: 'Nunito_700Bold',
                  fontSize: 14,
                  fontWeight: '700',
                  color: dark ? KCColors.darkText : KCColors.ink,
                  lineHeight: 19,
                }}
              >
                Salut <Text style={{ fontFamily: 'Nunito_900Black', fontWeight: '900' }}>{firstName}</Text>
                {' '}! Reste deux quêtes — on file ?
              </Text>
            }
          />
        )}

        {/* Streak + XP combo */}
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <Card dark={dark} style={{ flex: 1, padding: 14, flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <View
              style={{
                width: 46,
                height: 46,
                borderRadius: 14,
                backgroundColor: '#FFEEDD',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <FlameIcon size={28} />
            </View>
            <View>
              <Text
                style={{
                  fontSize: 24,
                  fontFamily: 'Nunito_900Black',
                  fontWeight: '900',
                  color: dark ? KCColors.darkText : KCColors.ink,
                  lineHeight: 26,
                }}
              >
                {streak}
              </Text>
              <Text
                style={{
                  fontSize: 11,
                  fontFamily: 'Nunito_800ExtraBold',
                  fontWeight: '800',
                  color: dark ? KCColors.darkSub : '#9AA0AC',
                  letterSpacing: 0.6,
                  textTransform: 'uppercase',
                }}
              >
                Série
              </Text>
            </View>
          </Card>

          <Card dark={dark} style={{ flex: 1.4, padding: 14 }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                marginBottom: 8,
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: 'Nunito_800ExtraBold',
                  fontWeight: '800',
                  color: dark ? KCColors.darkSub : '#9AA0AC',
                  letterSpacing: 0.6,
                  textTransform: 'uppercase',
                }}
              >
                Niveau {level}
              </Text>
              <Text
                style={{
                  fontSize: 11,
                  fontFamily: 'Nunito_800ExtraBold',
                  fontWeight: '800',
                  color: dark ? KCColors.darkSub : '#9AA0AC',
                }}
              >
                {xpInLevel}/{xpForLevel} XP
              </Text>
            </View>
            <XPBar value={xpInLevel} max={xpForLevel} color={accent.primary} height={12} />
            <Text
              style={{
                fontSize: 11,
                fontFamily: 'Nunito_700Bold',
                fontWeight: '700',
                color: dark ? KCColors.darkSub : '#9AA0AC',
                marginTop: 6,
              }}
            >
              Plus que{' '}
              <Text style={{ fontFamily: 'Nunito_900Black', fontWeight: '900', color: accent.primary }}>
                {xpForLevel - xpInLevel} XP
              </Text>{' '}
              avant le niveau {level + 1}
            </Text>
          </Card>
        </View>

        {/* Weight estimate */}
        <Card dark={dark} style={{ flexDirection: 'row', alignItems: 'center', gap: 12, padding: 16 }}>
          <ScaleIcon />
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 13,
                fontFamily: 'Nunito_800ExtraBold',
                fontWeight: '800',
                color: dark ? KCColors.darkSub : '#9AA0AC',
              }}
            >
              Poids Estimé
            </Text>
            <Text
              style={{
                fontSize: 11,
                fontFamily: 'Nunito_700Bold',
                fontWeight: '700',
                color: dark ? KCColors.darkSub : '#B5B5B5',
              }}
            >
              −2.0 kg en 30 jours
            </Text>
          </View>
          <Text
            style={{
              fontSize: 26,
              fontFamily: 'Nunito_900Black',
              fontWeight: '900',
              color: KCColors.blue,
              letterSpacing: -0.4,
            }}
          >
            75.0
            <Text style={{ fontSize: 16 }}> kg</Text>
          </Text>
        </Card>

        {/* Daily summary */}
        <Card dark={dark} style={{ padding: 18 }}>
          <Eyebrow>Résumé du jour</Eyebrow>
          <View style={{ flexDirection: 'row', gap: 10, marginTop: 12 }}>
            <SummaryTile label="Consommé" value="2 476" unit="kcal" color={KCColors.orange} dark={dark} />
            <SummaryTile label="Brûlé" value="2 881" unit="kcal" color={KCColors.green} dark={dark} />
          </View>
          <View
            style={{
              height: 1,
              backgroundColor: dark ? KCColors.darkBorder : '#EFEFEF',
              marginVertical: 14,
            }}
          />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View>
              <Eyebrow>Objectif</Eyebrow>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: 'Nunito_900Black',
                  fontWeight: '900',
                  color: KCColors.blue,
                  marginTop: 2,
                }}
              >
                Sèche
              </Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Eyebrow>Impact est.</Eyebrow>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: 'Nunito_900Black',
                  fontWeight: '900',
                  color: KCColors.green,
                  marginTop: 2,
                }}
              >
                −53 g
              </Text>
            </View>
          </View>
        </Card>

        {/* Primary CTA */}
        <Chunky
          color={accent.cta}
          depthColor={accent.ctaD}
          radius={16}
          depth={6}
          fullWidth
          paddingVertical={16}
          paddingHorizontal={16}
        >
          <Text
            style={{
              color: '#fff',
              fontFamily: 'Nunito_800ExtraBold',
              fontWeight: '800',
              fontSize: 15,
              letterSpacing: 0.6,
              textTransform: 'uppercase',
            }}
          >
            Modifier les calories
          </Text>
        </Chunky>

        {/* Quests card */}
        <Card dark={dark} style={{ padding: 18 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Eyebrow>Quêtes du jour</Eyebrow>
            <Text
              style={{
                fontSize: 12,
                fontFamily: 'Nunito_800ExtraBold',
                fontWeight: '800',
                color: accent.primary,
              }}
            >
              {questsState.filter((q) => q.done).length}/{questsState.length}
            </Text>
          </View>
          <View style={{ flexDirection: 'column', gap: 8, marginTop: 12 }}>
            {questsState.map((q) => (
              <QuestRow key={q.id} q={q} onToggle={() => toggleQuest(q.id)} dark={dark} />
            ))}
          </View>
        </Card>

        {/* Secondary CTA */}
        <Chunky
          color={dark ? KCColors.darkCard : '#F4F2EE'}
          depthColor={dark ? KCColors.darkBorder : '#D8D2C4'}
          radius={16}
          depth={5}
          fullWidth
          paddingVertical={16}
          paddingHorizontal={16}
        >
          <Text
            style={{
              fontFamily: 'Nunito_800ExtraBold',
              fontWeight: '800',
              fontSize: 14,
              letterSpacing: 0.4,
              textTransform: 'uppercase',
              color: dark ? KCColors.darkText : '#9AA0AC',
            }}
          >
            + Ajouter une vraie pesée
          </Text>
        </Chunky>
      </View>
    </ScrollView>
  );
}

function SummaryTile({
  label,
  value,
  unit,
  color,
  dark,
}: {
  label: string;
  value: string;
  unit: string;
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
        borderRadius: 16,
        paddingVertical: 14,
        paddingHorizontal: 12,
        alignItems: 'center',
      }}
    >
      <Text
        style={{
          fontSize: 11,
          fontFamily: 'Nunito_800ExtraBold',
          fontWeight: '800',
          color,
          letterSpacing: 0.6,
          textTransform: 'uppercase',
        }}
      >
        {label}
      </Text>
      <Text
        style={{
          fontSize: 24,
          fontFamily: 'Nunito_900Black',
          fontWeight: '900',
          color: dark ? KCColors.darkText : KCColors.ink,
          marginTop: 4,
          letterSpacing: -0.3,
        }}
      >
        {value}
        <Text
          style={{
            fontSize: 12,
            fontFamily: 'Nunito_700Bold',
            fontWeight: '700',
            color: dark ? KCColors.darkSub : '#9AA0AC',
          }}
        >
          {' '}
          {unit}
        </Text>
      </Text>
    </View>
  );
}

function QuestRow({ q, onToggle, dark }: { q: Quest; onToggle: () => void; dark?: boolean }) {
  return (
    <Pressable
      onPress={onToggle}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        backgroundColor: q.done ? (dark ? '#102014' : '#F2FBE9') : dark ? '#0F1419' : '#FBFAF7',
        borderWidth: 1.5,
        borderColor: q.done ? (dark ? '#1A4022' : '#D5EDB8') : dark ? KCColors.darkBorder : '#EFECE5',
        borderRadius: 14,
        paddingVertical: 12,
        paddingHorizontal: 14,
      }}
    >
      <View
        style={{
          width: 28,
          height: 28,
          borderRadius: 14,
          backgroundColor: q.done ? KCColors.green : 'transparent',
          borderWidth: q.done ? 0 : 2.5,
          borderColor: dark ? '#39424E' : '#D8D2C4',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {q.done && <CheckIcon />}
      </View>
      <Text style={{ fontSize: 18 }}>{q.emoji}</Text>
      <Text
        style={{
          flex: 1,
          fontSize: 14,
          fontFamily: 'Nunito_800ExtraBold',
          fontWeight: '800',
          color: dark ? KCColors.darkText : KCColors.ink,
          textDecorationLine: q.done ? 'line-through' : 'none',
          opacity: q.done ? 0.6 : 1,
        }}
      >
        {q.title}
      </Text>
      <View
        style={{
          backgroundColor: KCColors.orange,
          borderRadius: 999,
          paddingHorizontal: 8,
          paddingVertical: 4,
        }}
      >
        <Text
          style={{
            color: '#fff',
            fontSize: 11,
            fontFamily: 'Nunito_900Black',
            fontWeight: '900',
          }}
        >
          +{q.xp} XP
        </Text>
      </View>
    </Pressable>
  );
}
