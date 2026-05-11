import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, View, Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  useFonts,
  Nunito_600SemiBold,
  Nunito_700Bold,
  Nunito_800ExtraBold,
  Nunito_900Black,
} from '@expo-google-fonts/nunito';
import { Fraunces_400Regular, Fraunces_600SemiBold } from '@expo-google-fonts/fraunces';
import 'react-native-reanimated';

import { ThemeProvider, useTheme } from '@/src/theme/ThemeContext';
import { KCColors } from '@/src/theme/colors';
import { useSession } from '@/src/lib/auth-client';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold,
    Nunito_900Black,
    Fraunces_400Regular,
    Fraunces_600SemiBold,
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ color: KCColors.inkSoft }}>Chargement…</Text>
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <RootStack />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

function RootStack() {
  const { dark } = useTheme();
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: dark ? KCColors.darkBg : '#fff',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ActivityIndicator color={KCColors.green} />
      </View>
    );
  }

  const signedIn = !!session;

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Protected guard={signedIn}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="onboarding" options={{ presentation: 'modal' }} />
        </Stack.Protected>
        <Stack.Protected guard={!signedIn}>
          <Stack.Screen name="(auth)" />
        </Stack.Protected>
      </Stack>
      <StatusBar style={dark ? 'light' : 'dark'} />
    </>
  );
}
