import React, { useEffect, useMemo, useRef } from 'react';
import { View, Text, Modal, Animated, Easing, Dimensions } from 'react-native';
import { Chunky } from '../components/Chunky';
import { Mascot } from '../components/Mascot';
import { KCColors } from '../theme/colors';
import { useTheme } from '../theme/ThemeContext';
import type { Quest } from '../data/mock';

export function Celebration({
  open,
  onClose,
  quest,
}: {
  open: boolean;
  onClose: () => void;
  quest: Quest | null;
}) {
  const { accent, dark, mascotOn, personality } = useTheme();
  const popScale = useRef(new Animated.Value(0.6)).current;
  const popOpacity = useRef(new Animated.Value(0)).current;

  const confetti = useMemo(
    () =>
      Array.from({ length: 24 }).map((_, i) => ({
        id: `${i}-${Math.random()}`,
        left: Math.random() * 100,
        delay: Math.random() * 400,
        color: [KCColors.green, KCColors.orange, KCColors.blue, '#9C57FF', '#FFD43B'][i % 5],
        rotate: Math.random() * 360,
        size: 8 + Math.random() * 8,
      })),
    [open]
  );

  useEffect(() => {
    if (open) {
      popScale.setValue(0.6);
      popOpacity.setValue(0);
      Animated.parallel([
        Animated.spring(popScale, { toValue: 1, useNativeDriver: true, friction: 6, tension: 80 }),
        Animated.timing(popOpacity, { toValue: 1, duration: 220, useNativeDriver: true }),
      ]).start();
    }
  }, [open, popScale, popOpacity]);

  return (
    <Modal visible={open} transparent animationType="fade" onRequestClose={onClose}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.55)',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        {confetti.map((c) => (
          <ConfettiPiece
            key={c.id}
            left={c.left}
            delay={c.delay}
            color={c.color}
            rotate={c.rotate}
            size={c.size}
          />
        ))}

        <Animated.View
          style={{
            opacity: popOpacity,
            transform: [{ scale: popScale }],
            backgroundColor: dark ? KCColors.darkCard : '#fff',
            paddingTop: 26,
            paddingHorizontal: 22,
            paddingBottom: 22,
            borderRadius: 24,
            width: '78%',
            alignItems: 'center',
          }}
        >
          {mascotOn ? (
            <Mascot size={110} personality={personality} mood="celebrate" />
          ) : (
            <Text style={{ fontSize: 64 }}>🥬</Text>
          )}
          <Text
            style={{
              marginTop: 8,
              fontFamily: 'Nunito_900Black',
              fontWeight: '900',
              fontSize: 22,
              color: dark ? KCColors.darkText : KCColors.ink,
              letterSpacing: -0.3,
            }}
          >
            Quête réussie !
          </Text>
          <Text
            style={{
              marginTop: 4,
              fontSize: 14,
              fontFamily: 'Nunito_700Bold',
              fontWeight: '700',
              color: dark ? KCColors.darkSub : KCColors.inkSoft,
              lineHeight: 19,
              textAlign: 'center',
            }}
          >
            {quest?.title || 'Bien joué.'}
            {'\n'}Croquant validé. 🥬
          </Text>

          <View
            style={{
              marginTop: 16,
              paddingHorizontal: 14,
              paddingVertical: 8,
              borderRadius: 999,
              backgroundColor: KCColors.orange,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <Text
              style={{
                color: '#fff',
                fontSize: 16,
                fontFamily: 'Nunito_900Black',
                fontWeight: '900',
              }}
            >
              ⚡ +{quest?.xp || 25} XP
            </Text>
          </View>

          <View style={{ marginTop: 18, alignSelf: 'stretch' }}>
            <Chunky
              color={accent.cta}
              depthColor={accent.ctaD}
              radius={14}
              depth={5}
              fullWidth
              paddingVertical={14}
              paddingHorizontal={16}
              onPress={onClose}
            >
              <Text
                style={{
                  color: '#fff',
                  fontSize: 14,
                  fontFamily: 'Nunito_800ExtraBold',
                  fontWeight: '800',
                  letterSpacing: 0.6,
                  textTransform: 'uppercase',
                }}
              >
                Continuer
              </Text>
            </Chunky>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

function ConfettiPiece({
  left,
  delay,
  color,
  rotate,
  size,
}: {
  left: number;
  delay: number;
  color: string;
  rotate: number;
  size: number;
}) {
  const fall = useRef(new Animated.Value(0)).current;
  const screenH = Dimensions.get('window').height;

  useEffect(() => {
    Animated.timing(fall, {
      toValue: 1,
      duration: 1600,
      delay,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }, [fall, delay]);

  return (
    <Animated.View
      style={{
        position: 'absolute',
        top: -20,
        left: `${left}%`,
        width: size,
        height: size * 1.4,
        backgroundColor: color,
        borderRadius: 2,
        transform: [
          {
            translateY: fall.interpolate({ inputRange: [0, 1], outputRange: [0, screenH + 40] }),
          },
          {
            rotate: fall.interpolate({
              inputRange: [0, 1],
              outputRange: [`${rotate}deg`, `${rotate + 720}deg`],
            }),
          },
        ],
        opacity: fall.interpolate({ inputRange: [0, 0.8, 1], outputRange: [1, 0.8, 0.4] }),
      }}
    />
  );
}
