import React, { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Chunky } from '@/src/components/Chunky';
import { Eyebrow } from '@/src/components/Eyebrow';
import { ChevronLeft } from '@/src/components/icons';
import { KCColors } from '@/src/theme/colors';
import { useTheme } from '@/src/theme/ThemeContext';
import { authClient } from '@/src/lib/auth-client';

const OTP_LENGTH = 6;

export default function VerifyOtpScreen() {
  const { dark, accent } = useTheme();
  const { email } = useLocalSearchParams<{ email: string }>();
  const [code, setCode] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resent, setResent] = useState(false);

  const handleVerify = async (override?: string) => {
    const otp = (override ?? code).replace(/\D/g, '');
    if (otp.length !== OTP_LENGTH) {
      setError(`Le code doit faire ${OTP_LENGTH} chiffres.`);
      return;
    }
    if (!email) {
      setError('Email manquant. Reviens en arrière et recommence.');
      return;
    }
    setError(null);
    setVerifying(true);
    try {
      const { error: verifyErr } = await authClient.signIn.emailOtp({ email, otp });
      if (verifyErr) {
        setError(verifyErr.message ?? 'Code invalide.');
        return;
      }
      // Session is now valid — root layout will react and route to (tabs).
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erreur réseau.');
    } finally {
      setVerifying(false);
    }
  };

  const handleResend = async () => {
    if (!email) return;
    setError(null);
    setResending(true);
    try {
      const { error: sendErr } = await authClient.emailOtp.sendVerificationOtp({
        email,
        type: 'sign-in',
      });
      if (sendErr) {
        setError(sendErr.message ?? 'Impossible de renvoyer le code.');
        return;
      }
      setResent(true);
      setTimeout(() => setResent(false), 3000);
    } finally {
      setResending(false);
    }
  };

  const bg = dark ? KCColors.darkBg : '#FAF7F2';
  const textColor = dark ? KCColors.darkText : KCColors.ink;
  const subColor = dark ? KCColors.darkSub : KCColors.inkSoft;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: bg }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <Pressable
          onPress={() => router.back()}
          hitSlop={10}
          style={{ paddingHorizontal: 18, paddingTop: 8, alignSelf: 'flex-start' }}
        >
          <ChevronLeft dark={dark} />
        </Pressable>

        <ScrollView
          contentContainerStyle={{ flexGrow: 1, padding: 24, justifyContent: 'center' }}
          keyboardShouldPersistTaps="handled"
        >
          <Text
            style={{
              fontFamily: 'Fraunces_600SemiBold',
              fontSize: 28,
              color: textColor,
              letterSpacing: -0.5,
              marginBottom: 8,
            }}
          >
            Vérifie ton email
          </Text>
          <Text
            style={{
              fontFamily: 'Nunito_700Bold',
              fontWeight: '700',
              fontSize: 14,
              color: subColor,
              marginBottom: 28,
            }}
          >
            On a envoyé un code à 6 chiffres à{' '}
            <Text style={{ color: textColor, fontFamily: 'Nunito_800ExtraBold', fontWeight: '800' }}>
              {email ?? 'ton email'}
            </Text>
            .
          </Text>

          <Eyebrow style={{ marginBottom: 8 }}>Code</Eyebrow>
          <TextInput
            value={code}
            onChangeText={(v) => {
              const digits = v.replace(/\D/g, '').slice(0, OTP_LENGTH);
              setCode(digits);
              if (error) setError(null);
              if (digits.length === OTP_LENGTH) handleVerify(digits);
            }}
            placeholder="123456"
            placeholderTextColor={subColor}
            keyboardType="number-pad"
            autoComplete="sms-otp"
            textContentType="oneTimeCode"
            maxLength={OTP_LENGTH}
            autoFocus
            style={{
              backgroundColor: dark ? KCColors.darkCard : '#fff',
              borderWidth: 1.5,
              borderColor: dark ? KCColors.darkBorder : '#EAEAEA',
              borderRadius: 14,
              paddingHorizontal: 16,
              paddingVertical: 18,
              fontFamily: 'Nunito_900Black',
              fontWeight: '900',
              fontSize: 28,
              color: textColor,
              textAlign: 'center',
              letterSpacing: 14,
              marginBottom: 18,
            }}
          />

          <Chunky
            color={accent.primary}
            depthColor={accent.primaryD}
            fullWidth
            disabled={verifying || code.length !== OTP_LENGTH}
            onPress={() => handleVerify()}
            radius={18}
            paddingVertical={16}
          >
            {verifying ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text
                style={{
                  color: '#fff',
                  fontFamily: 'Nunito_900Black',
                  fontWeight: '900',
                  fontSize: 16,
                  letterSpacing: 0.4,
                  textTransform: 'uppercase',
                }}
              >
                Valider
              </Text>
            )}
          </Chunky>

          {error && (
            <Text
              style={{
                color: KCColors.red,
                fontFamily: 'Nunito_700Bold',
                fontWeight: '700',
                fontSize: 13,
                textAlign: 'center',
                marginTop: 16,
              }}
            >
              {error}
            </Text>
          )}

          <Pressable
            onPress={handleResend}
            disabled={resending}
            style={{ marginTop: 24, alignSelf: 'center' }}
          >
            <Text
              style={{
                color: resent ? KCColors.green : KCColors.blue,
                fontFamily: 'Nunito_800ExtraBold',
                fontWeight: '800',
                fontSize: 14,
              }}
            >
              {resending ? 'Envoi…' : resent ? 'Code renvoyé ✓' : 'Renvoyer le code'}
            </Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
