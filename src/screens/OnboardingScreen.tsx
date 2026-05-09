import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView, TextInput } from 'react-native';
import { Card } from '../components/Card';
import { Chunky } from '../components/Chunky';
import { Eyebrow } from '../components/Eyebrow';
import { XPBar } from '../components/XPBar';
import { Mascot } from '../components/Mascot';
import { LeafLogo, ChevronLeft } from '../components/icons';
import { KCColors } from '../theme/colors';
import { useTheme } from '../theme/ThemeContext';

type FormState = {
  name: string;
  sex: 'Homme' | 'Femme' | 'Autre';
  height: number;
  age: number;
  goal: 'seche' | 'maintien' | 'prise';
  activity: 'sedentaire' | 'leger' | 'modere' | 'intense';
  pace: number;
  weight: number;
};

export function OnboardingScreen({ onDone }: { onDone: () => void }) {
  const { accent, dark, mascotOn, personality } = useTheme();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormState>({
    name: 'Alex',
    sex: 'Homme',
    height: 171,
    age: 28,
    goal: 'seche',
    activity: 'modere',
    pace: 0.5,
    weight: 76,
  });
  const totalSteps = 4;
  const set = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setData((d) => ({ ...d, [k]: v }));

  const next = () => setStep((s) => Math.min(3, s + 1));
  const prev = () => setStep((s) => Math.max(0, s - 1));

  return (
    <View style={{ flex: 1, backgroundColor: dark ? KCColors.darkBg : '#fff' }}>
      {/* Progress bar */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
          paddingHorizontal: 22,
          paddingTop: 16,
          paddingBottom: 6,
        }}
      >
        {step > 0 ? (
          <Pressable onPress={prev} style={{ padding: 6 }}>
            <ChevronLeft dark={dark} />
          </Pressable>
        ) : (
          <View style={{ width: 30 }} />
        )}
        <View style={{ flex: 1 }}>
          <XPBar value={step + 1} max={totalSteps} color={accent.primary} height={14} />
        </View>
        <Pressable onPress={onDone}>
          <Text
            style={{
              fontFamily: 'Nunito_800ExtraBold',
              fontWeight: '800',
              fontSize: 13,
              color: dark ? KCColors.darkSub : '#9AA0AC',
            }}
          >
            Passer
          </Text>
        </Pressable>
      </View>

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {step === 0 && <Welcome accentPrimary={accent.primary} mascotOn={mascotOn} personality={personality} dark={dark} />}
        {step === 1 && <PersoStep data={data} set={set} dark={dark} />}
        {step === 2 && <GoalStep data={data} set={set} dark={dark} />}
        {step === 3 && <FirstWeighStep data={data} set={set} dark={dark} />}
      </ScrollView>

      <View
        style={{
          paddingHorizontal: 22,
          paddingTop: 14,
          paddingBottom: 28,
          backgroundColor: dark ? KCColors.darkBg : '#fff',
        }}
      >
        <Chunky
          color={accent.cta}
          depthColor={accent.ctaD}
          radius={16}
          depth={6}
          fullWidth
          paddingVertical={18}
          paddingHorizontal={16}
          onPress={step === 3 ? onDone : next}
        >
          <Text
            style={{
              color: '#fff',
              fontFamily: 'Nunito_800ExtraBold',
              fontWeight: '800',
              fontSize: 16,
              letterSpacing: 0.6,
              textTransform: 'uppercase',
            }}
          >
            {step === 3 ? 'Allons-y !' : 'Continuer'}
          </Text>
        </Chunky>
      </View>
    </View>
  );
}

function Welcome({
  accentPrimary,
  mascotOn,
  personality,
  dark,
}: {
  accentPrimary: string;
  mascotOn: boolean;
  personality: 'cheerful' | 'chill' | 'coach';
  dark: boolean;
}) {
  return (
    <View style={{ paddingHorizontal: 26, paddingTop: 20, paddingBottom: 30, alignItems: 'center', gap: 18 }}>
      <View style={{ marginTop: 24 }}>
        {mascotOn ? (
          <Mascot size={140} personality={personality} mood="wave" />
        ) : (
          <LeafLogo size={120} />
        )}
      </View>
      <Text
        style={{
          fontFamily: 'Nunito_900Black',
          fontWeight: '900',
          fontSize: 32,
          lineHeight: 35,
          color: dark ? KCColors.darkText : KCColors.ink,
          letterSpacing: -0.5,
          textAlign: 'center',
        }}
      >
        Bienvenue chez{'\n'}Kilocal !
      </Text>
      <Text
        style={{
          fontFamily: 'Nunito_700Bold',
          fontSize: 16,
          fontWeight: '700',
          lineHeight: 23,
          color: dark ? KCColors.darkSub : KCColors.inkSoft,
          textAlign: 'center',
          maxWidth: 320,
        }}
      >
        Loggue moins. Apprends plus.{'\n'}On garde ça{' '}
        <Text style={{ color: accentPrimary, fontFamily: 'Nunito_800ExtraBold', fontWeight: '800' }}>
          croquant
        </Text>{' '}
        et calme. 🥬
      </Text>
      <View
        style={{
          flexDirection: 'row',
          gap: 8,
          marginTop: 6,
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        {[
          { c: KCColors.green, l: 'Séries' },
          { c: KCColors.orange, l: 'Quêtes' },
          { c: KCColors.blue, l: 'Pesées' },
          { c: '#9C57FF', l: 'Badges' },
        ].map((b) => (
          <View
            key={b.l}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 6,
              backgroundColor: dark ? KCColors.darkCard : '#F7F4EE',
              borderWidth: 1.5,
              borderColor: dark ? KCColors.darkBorder : '#EAE5DA',
              borderRadius: 999,
              paddingHorizontal: 14,
              paddingVertical: 8,
            }}
          >
            <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: b.c }} />
            <Text
              style={{
                fontFamily: 'Nunito_800ExtraBold',
                fontWeight: '800',
                fontSize: 13,
                color: dark ? KCColors.darkText : KCColors.ink,
              }}
            >
              {b.l}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

function PersoStep({
  data,
  set,
  dark,
}: {
  data: FormState;
  set: <K extends keyof FormState>(k: K, v: FormState[K]) => void;
  dark: boolean;
}) {
  return (
    <View style={{ paddingHorizontal: 22, paddingTop: 20, paddingBottom: 30, gap: 22 }}>
      <View>
        <Text
          style={{
            fontFamily: 'Nunito_900Black',
            fontWeight: '900',
            fontSize: 26,
            lineHeight: 30,
            color: dark ? KCColors.darkText : KCColors.ink,
            letterSpacing: -0.3,
          }}
        >
          On fait connaissance ?
        </Text>
        <Text
          style={{
            marginTop: 6,
            fontSize: 14,
            fontFamily: 'Nunito_700Bold',
            fontWeight: '700',
            color: dark ? KCColors.darkSub : KCColors.inkSoft,
          }}
        >
          Trois infos de base. Promis, c&apos;est tout.
        </Text>
      </View>

      <Field label="Comment on t'appelle ?" dark={dark}>
        <TextInput
          value={data.name}
          onChangeText={(v) => set('name', v)}
          style={{
            fontFamily: 'Nunito_800ExtraBold',
            fontWeight: '800',
            fontSize: 18,
            color: dark ? KCColors.darkText : KCColors.ink,
            paddingVertical: 6,
          }}
        />
      </Field>

      <Field label="Sexe (calcul du métabolisme)" dark={dark} noBox>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          {([
            { v: 'Homme', e: '👨' },
            { v: 'Femme', e: '👩' },
            { v: 'Autre', e: '✨' },
          ] as const).map((o) => {
            const sel = data.sex === o.v;
            return (
              <View key={o.v} style={{ flex: 1 }}>
                <Chunky
                  color={sel ? KCColors.blue : dark ? KCColors.darkCard : '#F4F2EE'}
                  depthColor={sel ? KCColors.blueD : dark ? KCColors.darkBorder : '#D8D2C4'}
                  radius={14}
                  depth={4}
                  paddingVertical={14}
                  paddingHorizontal={8}
                  onPress={() => set('sex', o.v)}
                  fullWidth
                >
                  <Text style={{ fontSize: 18, marginRight: 6 }}>{o.e}</Text>
                  <Text
                    style={{
                      fontFamily: 'Nunito_800ExtraBold',
                      fontWeight: '800',
                      fontSize: 14,
                      color: sel ? '#fff' : dark ? KCColors.darkText : KCColors.ink,
                    }}
                  >
                    {o.v}
                  </Text>
                </Chunky>
              </View>
            );
          })}
        </View>
      </Field>

      <View style={{ flexDirection: 'row', gap: 10 }}>
        <View style={{ flex: 1 }}>
          <Field label="Taille" dark={dark}>
            <Stepper value={data.height} onChange={(v) => set('height', v)} min={120} max={220} suffix=" cm" dark={dark} />
          </Field>
        </View>
        <View style={{ flex: 1 }}>
          <Field label="Âge" dark={dark}>
            <Stepper value={data.age} onChange={(v) => set('age', v)} min={14} max={99} suffix=" ans" dark={dark} />
          </Field>
        </View>
      </View>
    </View>
  );
}

function GoalStep({
  data,
  set,
  dark,
}: {
  data: FormState;
  set: <K extends keyof FormState>(k: K, v: FormState[K]) => void;
  dark: boolean;
}) {
  const goals = [
    { v: 'seche' as const,    label: 'Sèche',    desc: 'Léger déficit, perdre doucement', emoji: '📉', color: KCColors.green,  cd: KCColors.greenD },
    { v: 'maintien' as const, label: 'Maintien', desc: 'Garder le poids actuel',           emoji: '⚖️', color: KCColors.blue,   cd: KCColors.blueD },
    { v: 'prise' as const,    label: 'Prise',    desc: 'Surplus pour gagner du muscle',   emoji: '📈', color: KCColors.orange, cd: KCColors.orangeD },
  ];
  const activities = [
    { v: 'sedentaire' as const, label: 'Sédentaire', emoji: '🛋️' },
    { v: 'leger' as const,      label: 'Léger',      emoji: '🚶' },
    { v: 'modere' as const,     label: 'Modéré',     emoji: '🚴' },
    { v: 'intense' as const,    label: 'Intense',    emoji: '🏋️' },
  ];

  return (
    <View style={{ paddingHorizontal: 22, paddingTop: 20, paddingBottom: 30, gap: 22 }}>
      <View>
        <Text
          style={{
            fontFamily: 'Nunito_900Black',
            fontWeight: '900',
            fontSize: 26,
            lineHeight: 30,
            color: dark ? KCColors.darkText : KCColors.ink,
            letterSpacing: -0.3,
          }}
        >
          Quel est le plan ?
        </Text>
        <Text
          style={{
            marginTop: 6,
            fontSize: 14,
            fontFamily: 'Nunito_700Bold',
            fontWeight: '700',
            color: dark ? KCColors.darkSub : KCColors.inkSoft,
          }}
        >
          On choisit l&apos;objectif, on adapte la suite.
        </Text>
      </View>

      <View style={{ gap: 10 }}>
        {goals.map((g) => {
          const sel = data.goal === g.v;
          return (
            <Chunky
              key={g.v}
              color={sel ? g.color : dark ? KCColors.darkCard : '#fff'}
              depthColor={sel ? g.cd : dark ? KCColors.darkBorder : '#E0DCD3'}
              radius={18}
              depth={5}
              paddingVertical={16}
              paddingHorizontal={18}
              onPress={() => set('goal', g.v)}
              fullWidth
              innerStyle={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                gap: 14,
              }}
            >
              <Text style={{ fontSize: 28 }}>{g.emoji}</Text>
              <View style={{ flexShrink: 1 }}>
                <Text
                  style={{
                    fontSize: 17,
                    fontFamily: 'Nunito_900Black',
                    fontWeight: '900',
                    color: sel ? '#fff' : dark ? KCColors.darkText : KCColors.ink,
                  }}
                >
                  {g.label}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: 'Nunito_700Bold',
                    fontWeight: '700',
                    color: sel ? '#fff' : dark ? KCColors.darkText : KCColors.ink,
                    opacity: sel ? 0.9 : 0.6,
                  }}
                >
                  {g.desc}
                </Text>
              </View>
            </Chunky>
          );
        })}
      </View>

      <Field label="Niveau d'activité" dark={dark} noBox>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: -4 }}>
          {activities.map((a) => {
            const sel = data.activity === a.v;
            return (
              <View key={a.v} style={{ width: '50%', padding: 4 }}>
                <Chunky
                  color={sel ? KCColors.blue : dark ? KCColors.darkCard : '#F4F2EE'}
                  depthColor={sel ? KCColors.blueD : dark ? KCColors.darkBorder : '#D8D2C4'}
                  radius={14}
                  depth={4}
                  paddingVertical={12}
                  paddingHorizontal={10}
                  onPress={() => set('activity', a.v)}
                  fullWidth
                >
                  <Text style={{ fontSize: 18, marginRight: 8 }}>{a.emoji}</Text>
                  <Text
                    style={{
                      fontFamily: 'Nunito_800ExtraBold',
                      fontWeight: '800',
                      fontSize: 14,
                      color: sel ? '#fff' : dark ? KCColors.darkText : KCColors.ink,
                    }}
                  >
                    {a.label}
                  </Text>
                </Chunky>
              </View>
            );
          })}
        </View>
      </Field>
    </View>
  );
}

function FirstWeighStep({
  data,
  set,
  dark,
}: {
  data: FormState;
  set: <K extends keyof FormState>(k: K, v: FormState[K]) => void;
  dark: boolean;
}) {
  return (
    <View style={{ paddingHorizontal: 22, paddingTop: 20, paddingBottom: 30, gap: 22 }}>
      <View>
        <Text
          style={{
            fontFamily: 'Nunito_900Black',
            fontWeight: '900',
            fontSize: 26,
            lineHeight: 30,
            color: dark ? KCColors.darkText : KCColors.ink,
            letterSpacing: -0.3,
          }}
        >
          Première pesée ?
        </Text>
        <Text
          style={{
            marginTop: 6,
            fontSize: 14,
            fontFamily: 'Nunito_700Bold',
            fontWeight: '700',
            color: dark ? KCColors.darkSub : KCColors.inkSoft,
          }}
        >
          On part d&apos;ici. Pas de jugement, pas de drame. 🌱
        </Text>
      </View>

      <Card dark={dark} style={{ alignItems: 'center', gap: 12, paddingVertical: 24, paddingHorizontal: 18 }}>
        <Text
          style={{
            fontFamily: 'Nunito_900Black',
            fontWeight: '900',
            fontSize: 60,
            color: KCColors.blue,
            lineHeight: 60,
            letterSpacing: -1.5,
          }}
        >
          {data.weight.toFixed(1)}
          <Text style={{ fontSize: 24, color: dark ? KCColors.darkSub : KCColors.inkSoft }}>
            {' '}
            kg
          </Text>
        </Text>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <Pressable
            onPress={() => set('weight', Math.max(40, data.weight - 0.5))}
            style={{
              width: 48,
              height: 48,
              borderRadius: 14,
              backgroundColor: dark ? '#252D38' : '#F4F2EE',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                fontFamily: 'Nunito_900Black',
                fontWeight: '900',
                fontSize: 22,
                color: dark ? KCColors.darkText : KCColors.ink,
              }}
            >
              −
            </Text>
          </Pressable>
          <Pressable
            onPress={() => set('weight', Math.min(160, data.weight + 0.5))}
            style={{
              width: 48,
              height: 48,
              borderRadius: 14,
              backgroundColor: dark ? '#252D38' : '#F4F2EE',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                fontFamily: 'Nunito_900Black',
                fontWeight: '900',
                fontSize: 22,
                color: dark ? KCColors.darkText : KCColors.ink,
              }}
            >
              +
            </Text>
          </Pressable>
        </View>
      </Card>

      <Card
        dark={dark}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 12,
          backgroundColor: dark ? KCColors.darkCard : '#FFF8E8',
          borderColor: dark ? KCColors.darkBorder : '#F2E5BD',
        }}
      >
        <Text style={{ fontSize: 26 }}>💡</Text>
        <Text
          style={{
            flex: 1,
            fontSize: 13,
            fontFamily: 'Nunito_700Bold',
            fontWeight: '700',
            color: dark ? KCColors.darkText : '#7C6418',
            lineHeight: 18,
          }}
        >
          On préfère{' '}
          <Text style={{ color: KCColors.orangeD, fontFamily: 'Nunito_800ExtraBold', fontWeight: '800' }}>
            la régularité
          </Text>{' '}
          à la précision. Pèse-toi à jeun, même balance, même heure.
        </Text>
      </Card>
    </View>
  );
}

function Field({
  label,
  children,
  dark,
  noBox,
}: {
  label: string;
  children: React.ReactNode;
  dark: boolean;
  noBox?: boolean;
}) {
  return (
    <View style={{ gap: 8 }}>
      <Eyebrow color={dark ? KCColors.darkSub : '#9AA0AC'}>{label}</Eyebrow>
      {noBox ? (
        children
      ) : (
        <View
          style={{
            backgroundColor: dark ? KCColors.darkCard : '#fff',
            borderWidth: 1.5,
            borderColor: dark ? KCColors.darkBorder : '#E5E1DA',
            borderRadius: 14,
            paddingVertical: 10,
            paddingHorizontal: 14,
          }}
        >
          {children}
        </View>
      )}
    </View>
  );
}

function Stepper({
  value,
  onChange,
  min,
  max,
  suffix,
  dark,
}: {
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  suffix: string;
  dark: boolean;
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Pressable
        onPress={() => onChange(Math.max(min, value - 1))}
        style={{
          width: 32,
          height: 32,
          borderRadius: 10,
          backgroundColor: dark ? '#252D38' : '#F4F2EE',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text
          style={{
            color: dark ? KCColors.darkText : KCColors.ink,
            fontFamily: 'Nunito_900Black',
            fontWeight: '900',
            fontSize: 18,
          }}
        >
          −
        </Text>
      </Pressable>
      <Text
        style={{
          fontFamily: 'Nunito_900Black',
          fontWeight: '900',
          fontSize: 18,
          color: dark ? KCColors.darkText : KCColors.ink,
          letterSpacing: -0.3,
        }}
      >
        {value}
        {suffix}
      </Text>
      <Pressable
        onPress={() => onChange(Math.min(max, value + 1))}
        style={{
          width: 32,
          height: 32,
          borderRadius: 10,
          backgroundColor: dark ? '#252D38' : '#F4F2EE',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text
          style={{
            color: dark ? KCColors.darkText : KCColors.ink,
            fontFamily: 'Nunito_900Black',
            fontWeight: '900',
            fontSize: 18,
          }}
        >
          +
        </Text>
      </Pressable>
    </View>
  );
}
