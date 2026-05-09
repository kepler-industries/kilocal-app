import { useRouter } from 'expo-router';
import { OnboardingScreen } from '@/src/screens/OnboardingScreen';

export default function OnboardingRoute() {
  const router = useRouter();
  return <OnboardingScreen onDone={() => router.back()} />;
}
