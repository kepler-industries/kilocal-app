import React, { useState } from 'react';
import { ScrollView, View, Text } from 'react-native';
import Svg, { Path, Line, Text as SvgText, G } from 'react-native-svg';
import { Card } from '../components/Card';
import { Eyebrow } from '../components/Eyebrow';
import { TabPills } from '../components/TabPills';
import { FlameIcon, ScaleMini, UpwardChartIcon } from '../components/icons';
import { KCColors } from '../theme/colors';
import { KCDeficit30, KCWeight30 } from '../data/mock';
import { useTheme } from '../theme/ThemeContext';

export function InsightsScreen() {
  const { dark } = useTheme();
  const [tab, setTab] = useState('30 derniers jours');

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
          Insights
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
          Vue d&apos;ensemble de ton aventure
        </Text>
      </View>

      <View style={{ paddingHorizontal: 18, paddingTop: 18, gap: 14 }}>
        {/* Metric tiles */}
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <Card dark={dark} style={{ flex: 1, padding: 16, alignItems: 'center' }}>
            <View
              style={{
                width: 52,
                height: 52,
                borderRadius: 14,
                backgroundColor: KCColors.orangeSoft,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <FlameIcon size={32} />
            </View>
            <Text
              style={{
                marginTop: 10,
                fontSize: 11,
                fontFamily: 'Nunito_800ExtraBold',
                fontWeight: '800',
                color: dark ? KCColors.darkSub : '#9AA0AC',
                letterSpacing: 0.6,
                textTransform: 'uppercase',
                textAlign: 'center',
              }}
            >
              Déficit moyen (7j)
            </Text>
            <Text
              style={{
                marginTop: 6,
                fontSize: 22,
                fontFamily: 'Nunito_900Black',
                fontWeight: '900',
                color: KCColors.green,
                letterSpacing: -0.3,
              }}
            >
              −453 kcal
            </Text>
          </Card>

          <Card dark={dark} style={{ flex: 1, padding: 16, alignItems: 'center' }}>
            <View
              style={{
                width: 52,
                height: 52,
                borderRadius: 14,
                backgroundColor: KCColors.blueSoft,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <UpwardChartIcon size={28} />
            </View>
            <Text
              style={{
                marginTop: 10,
                fontSize: 11,
                fontFamily: 'Nunito_800ExtraBold',
                fontWeight: '800',
                color: dark ? KCColors.darkSub : '#9AA0AC',
                letterSpacing: 0.6,
                textTransform: 'uppercase',
              }}
            >
              Progression (30j)
            </Text>
            <Text
              style={{
                marginTop: 6,
                fontSize: 18,
                fontFamily: 'Nunito_900Black',
                fontWeight: '900',
                color: dark ? KCColors.darkText : KCColors.ink,
                letterSpacing: -0.3,
              }}
            >
              −2.0 kg
            </Text>
          </Card>
        </View>

        <TabPills
          tabs={['7 derniers jours', '30 derniers jours', 'Historique']}
          active={tab}
          onChange={setTab}
          dark={dark}
        />

        <Card dark={dark} style={{ padding: 18 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <ScaleMini />
            <Text
              style={{
                fontFamily: 'Nunito_900Black',
                fontWeight: '900',
                fontSize: 18,
                color: dark ? KCColors.darkText : KCColors.ink,
              }}
            >
              Courbe du Poids
            </Text>
          </View>
          <WeightChart dark={dark} />
        </Card>

        <Card dark={dark} style={{ padding: 18 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <FlameIcon size={22} />
            <Text
              style={{
                fontFamily: 'Nunito_900Black',
                fontWeight: '900',
                fontSize: 18,
                color: dark ? KCColors.darkText : KCColors.ink,
              }}
            >
              Évolution du Déficit
            </Text>
          </View>
          <DeficitChart dark={dark} />
        </Card>

        <Card
          dark={dark}
          style={{
            padding: 16,
            backgroundColor: dark ? KCColors.darkCard : '#F2FBE9',
            borderColor: dark ? KCColors.darkBorder : '#D5EDB8',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <Text style={{ fontSize: 26 }}>🌱</Text>
          <Text
            style={{
              flex: 1,
              fontSize: 13,
              fontFamily: 'Nunito_700Bold',
              fontWeight: '700',
              color: dark ? KCColors.darkText : '#3F6418',
              lineHeight: 18,
            }}
          >
            <Text style={{ fontFamily: 'Nunito_900Black', fontWeight: '900' }}>3 semaines de série.</Text> La régularité gagne contre la perfection — keep it crunchy.
          </Text>
        </Card>
      </View>
    </ScrollView>
  );
}

function WeightChart({ dark }: { dark?: boolean }) {
  const data = KCWeight30;
  const w = 320, h = 160, pl = 28, pr = 8, pt = 12, pb = 24;
  const min = 74, max = 78;
  const x = (i: number) => pl + (i / (data.length - 1)) * (w - pl - pr);
  const y = (v: number) => pt + (1 - (v - min) / (max - min)) * (h - pt - pb);
  const path = data.map((v, i) => `${i ? 'L' : 'M'}${x(i)} ${y(v)}`).join(' ');
  const yLabels = [78, 77, 76, 75, 74];
  const xLabels = [
    { i: 0, l: '13 avr.' },
    { i: 7, l: '19 avr.' },
    { i: 14, l: '25 avr.' },
    { i: 21, l: '01 mai' },
    { i: 29, l: '08 mai' },
  ];
  const gridColor = dark ? '#2A323D' : '#E5E5E5';
  const labelColor = dark ? KCColors.darkSub : '#A7A7A7';

  return (
    <Svg width="100%" height={h} viewBox={`0 0 ${w} ${h}`} style={{ marginTop: 8 }}>
      {yLabels.map((v) => (
        <G key={v}>
          <Line x1={pl} x2={w - pr} y1={y(v)} y2={y(v)} stroke={gridColor} strokeWidth={1} strokeDasharray="3,4" />
          <SvgText
            x={pl - 4}
            y={y(v) + 3}
            textAnchor="end"
            fontSize="9"
            fontWeight="700"
            fill={labelColor}
            fontFamily="Nunito_700Bold"
          >
            {String(v)}
          </SvgText>
        </G>
      ))}
      <Path d={path} stroke={KCColors.blue} strokeWidth={2.4} fill="none" strokeDasharray="5,4" strokeLinecap="round" strokeLinejoin="round" />
      {xLabels.map((l, i) => (
        <SvgText
          key={i}
          x={x(l.i)}
          y={h - 4}
          textAnchor="middle"
          fontSize="9"
          fontWeight="700"
          fill={labelColor}
          fontFamily="Nunito_700Bold"
        >
          {l.l}
        </SvgText>
      ))}
    </Svg>
  );
}

function DeficitChart({ dark }: { dark?: boolean }) {
  const data = KCDeficit30;
  const w = 320, h = 160, pl = 30, pr = 8, pt = 12, pb = 24;
  const min = -800, max = 300;
  const x = (i: number) => pl + (i / (data.length - 1)) * (w - pl - pr);
  const y = (v: number) => pt + (1 - (v - min) / (max - min)) * (h - pt - pb);
  const baseline = y(0);
  const path = data.map((v, i) => `${i ? 'L' : 'M'}${x(i)} ${y(v)}`).join(' ');
  const fill = `M ${x(0)} ${baseline} ${data.map((v, i) => `L ${x(i)} ${y(v)}`).join(' ')} L ${x(data.length - 1)} ${baseline} Z`;
  const gridColor = dark ? '#2A323D' : '#E5E5E5';
  const labelColor = dark ? KCColors.darkSub : '#A7A7A7';

  return (
    <Svg width="100%" height={h} viewBox={`0 0 ${w} ${h}`} style={{ marginTop: 8 }}>
      {[300, 0, -400, -800].map((v) => (
        <G key={v}>
          <Line x1={pl} x2={w - pr} y1={y(v)} y2={y(v)} stroke={gridColor} strokeWidth={1} strokeDasharray="3,4" />
          <SvgText
            x={pl - 4}
            y={y(v) + 3}
            textAnchor="end"
            fontSize="9"
            fontWeight="700"
            fill={labelColor}
            fontFamily="Nunito_700Bold"
          >
            {String(v)}
          </SvgText>
        </G>
      ))}
      <Path d={fill} fill={KCColors.orange} opacity={0.18} />
      <Path d={path} stroke={KCColors.orange} strokeWidth={2.4} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <SvgText x={pl} y={h - 4} fontSize="9" fontWeight="700" fill={labelColor} fontFamily="Nunito_700Bold">
        10 avr.
      </SvgText>
      <SvgText
        x={w - pr}
        y={h - 4}
        textAnchor="end"
        fontSize="9"
        fontWeight="700"
        fill={labelColor}
        fontFamily="Nunito_700Bold"
      >
        08 mai
      </SvgText>
    </Svg>
  );
}
