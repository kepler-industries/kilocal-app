import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { router, type Href } from 'expo-router';
import * as AppleAuthentication from 'expo-apple-authentication';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Chunky } from '@/src/components/Chunky';
import { Eyebrow } from '@/src/components/Eyebrow';
import { LeafLogo } from '@/src/components/icons';
import { KCColors } from '@/src/theme/colors';
import { useTheme } from '@/src/theme/ThemeContext';
import { authClient } from '@/src/lib/auth-client';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function SignInScreen() {
  const { dark, accent } = useTheme();
  const [email, setEmail] = useState('');
  const [sending, setSending] = useState(false);
  const [appleBusy, setAppleBusy] = useState(false);
  const [appleAvailable, setAppleAvailable] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    AppleAuthentication.isAvailableAsync().then(setAppleAvailable).catch(() => setAppleAvailable(false));
  }, []);

  const handleSendOtp = async () => {
    const trimmed = email.trim().toLowerCase();
    if (!EMAIL_RE.test(trimmed)) {
      setError('Email invalide.');
      return;
    }
    setError(null);
    setSending(true);
    try {
      const { error: sendErr } = await authClient.emailOtp.sendVerificationOtp({
        email: trimmed,
        type: 'sign-in',
      });
      if (sendErr) {
        setError(sendErr.message ?? 'Impossible d’envoyer le code.');
        return;
      }
      // Cast: typed routes regenerate via Metro on dev-server start; the
      // (auth) group isn't in the d.ts yet at first tsc pass.
      router.push({ pathname: '/(auth)/verify-otp', params: { email: trimmed } } as Href);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erreur réseau.');
    } finally {
      setSending(false);
    }
  };

  const handleAppleSignIn = async () => {
    setError(null);
    setAppleBusy(true);
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
      if (!credential.identityToken) {
        setError("Apple n’a pas renvoyé d’identityToken.");
        return;
      }
      const { error: signErr } = await authClient.signIn.social({
        provider: 'apple',
        idToken: { token: credential.identityToken },
      });
      if (signErr) setError(signErr.message ?? 'Connexion Apple refusée.');
    } catch (e: any) {
      if (e?.code === 'ERR_REQUEST_CANCELED') return;
      setError(e instanceof Error ? e.message : 'Erreur Apple Sign-In.');
    } finally {
      setAppleBusy(false);
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
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, padding: 24, justifyContent: 'center' }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={{ alignItems: 'center', marginBottom: 28 }}>
            <LeafLogo size={64} />
            <Text
              style={{
                fontFamily: 'Fraunces_600SemiBold',
                fontSize: 32,
                color: textColor,
                marginTop: 12,
                letterSpacing: -0.5,
              }}
            >
              Kilocal
            </Text>
            <Text
              style={{
                fontFamily: 'Nunito_700Bold',
                fontWeight: '700',
                fontSize: 14,
                color: subColor,
                marginTop: 4,
                textAlign: 'center',
              }}
            >
              Reste croquant. Reste fier.
            </Text>
          </View>

          <Eyebrow style={{ marginBottom: 8 }}>Email</Eyebrow>
          <TextInput
            value={email}
            onChangeText={(v) => {
              setEmail(v);
              if (error) setError(null);
            }}
            placeholder="toi@email.com"
            placeholderTextColor={subColor}
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="email"
            keyboardType="email-address"
            returnKeyType="send"
            onSubmitEditing={handleSendOtp}
            style={{
              backgroundColor: dark ? KCColors.darkCard : '#fff',
              borderWidth: 1.5,
              borderColor: dark ? KCColors.darkBorder : '#EAEAEA',
              borderRadius: 14,
              paddingHorizontal: 16,
              paddingVertical: 14,
              fontFamily: 'Nunito_700Bold',
              fontWeight: '700',
              fontSize: 16,
              color: textColor,
              marginBottom: 16,
            }}
          />

          <Chunky
            color={accent.cta}
            depthColor={accent.ctaD}
            fullWidth
            disabled={sending}
            onPress={handleSendOtp}
            radius={18}
            paddingVertical={16}
          >
            {sending ? (
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
                Recevoir un code
              </Text>
            )}
          </Chunky>

          {appleAvailable && (
            <>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 22 }}>
                <View style={{ flex: 1, height: 1, backgroundColor: dark ? KCColors.darkBorder : '#E5E5E5' }} />
                <Text
                  style={{
                    marginHorizontal: 12,
                    color: subColor,
                    fontFamily: 'Nunito_800ExtraBold',
                    fontWeight: '800',
                    fontSize: 11,
                    letterSpacing: 1.2,
                  }}
                >
                  OU
                </Text>
                <View style={{ flex: 1, height: 1, backgroundColor: dark ? KCColors.darkBorder : '#E5E5E5' }} />
              </View>

              <AppleAuthentication.AppleAuthenticationButton
                buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
                buttonStyle={
                  dark
                    ? AppleAuthentication.AppleAuthenticationButtonStyle.WHITE
                    : AppleAuthentication.AppleAuthenticationButtonStyle.BLACK
                }
                cornerRadius={14}
                style={{ height: 52, opacity: appleBusy ? 0.6 : 1 }}
                onPress={handleAppleSignIn}
              />
            </>
          )}

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

          <Text
            style={{
              color: subColor,
              fontFamily: 'Nunito_700Bold',
              fontWeight: '700',
              fontSize: 11,
              textAlign: 'center',
              marginTop: 28,
            }}
          >
            En continuant, tu acceptes nos conditions d’utilisation.
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
