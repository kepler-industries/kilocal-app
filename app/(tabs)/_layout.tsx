import React, { useState } from 'react';
import { View, Pressable, Text } from 'react-native';
import { Tabs, useRouter, usePathname } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';

import { useTheme } from '@/src/theme/ThemeContext';
import { KCColors } from '@/src/theme/colors';
import { AppHeader } from '@/src/components/AppHeader';
import { Drawer, type DrawerRoute } from '@/src/screens/Drawer';
import { FlameIcon, CalIcon, BarsIcon, TrophyIcon, UserIcon2 } from '@/src/components/icons';

type TabConfig = {
  name: 'index' | 'calendar' | 'insights' | 'achievements' | 'profile';
  route: DrawerRoute;
  label: string;
  activeColor: string;
  icon: (active: boolean, dark: boolean) => React.ReactNode;
};

const TABS: TabConfig[] = [
  {
    name: 'index',
    route: 'home',
    label: 'Aujourd’hui',
    activeColor: KCColors.ink,
    icon: () => <FlameIcon size={20} />,
  },
  {
    name: 'calendar',
    route: 'calendar',
    label: 'Calendrier',
    activeColor: KCColors.red,
    icon: (active, dark) => <CalIcon color={active ? KCColors.red : dark ? KCColors.darkSub : '#9AA0AC'} />,
  },
  {
    name: 'insights',
    route: 'insights',
    label: 'Insights',
    activeColor: KCColors.blue,
    icon: (active, dark) => <BarsIcon color={active ? KCColors.blue : dark ? KCColors.darkSub : '#9AA0AC'} />,
  },
  {
    name: 'achievements',
    route: 'achievements',
    label: 'Trophées',
    activeColor: '#9C57FF',
    icon: (active, dark) => <TrophyIcon color={active ? '#9C57FF' : dark ? KCColors.darkSub : '#9AA0AC'} />,
  },
  {
    name: 'profile',
    route: 'profile',
    label: 'Profil',
    activeColor: KCColors.green,
    icon: (active, dark) => <UserIcon2 color={active ? KCColors.green : dark ? KCColors.darkSub : '#9AA0AC'} />,
  },
];

export default function TabLayout() {
  const { dark } = useTheme();
  const insets = useSafeAreaInsets();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const currentRoute: DrawerRoute = (() => {
    if (pathname.includes('calendar')) return 'calendar';
    if (pathname.includes('insights')) return 'insights';
    if (pathname.includes('achievements')) return 'achievements';
    if (pathname.includes('profile')) return 'profile';
    return 'home';
  })();

  const handleDrawerNav = (id: DrawerRoute) => {
    if (id === 'home') router.push('/(tabs)' as never);
    else router.push(`/(tabs)/${id}` as never);
  };

  return (
    <View style={{ flex: 1, backgroundColor: dark ? KCColors.darkBg : '#fff', paddingTop: insets.top }}>
      <AppHeader dark={dark} onMenu={() => setDrawerOpen(true)} />
      <Tabs
        screenOptions={{ headerShown: false }}
        tabBar={(props) => <KilocalTabBar {...props} />}
      >
        <Tabs.Screen name="index" />
        <Tabs.Screen name="calendar" />
        <Tabs.Screen name="insights" />
        <Tabs.Screen name="achievements" />
        <Tabs.Screen name="profile" />
      </Tabs>

      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        current={currentRoute}
        onNav={handleDrawerNav}
      />
    </View>
  );
}

function KilocalTabBar({ state, navigation }: BottomTabBarProps) {
  const { dark } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        borderTopWidth: 1,
        borderTopColor: dark ? KCColors.darkBorder : '#EFEFEF',
        backgroundColor: dark ? KCColors.darkBg : '#fff',
        paddingBottom: insets.bottom > 0 ? insets.bottom : 12,
        paddingTop: 8,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
      }}
    >
      {state.routes.map((route, i) => {
        const tab = TABS.find((t) => t.name === route.name);
        if (!tab) return null;
        const isActive = state.index === i;

        return (
          <Pressable
            key={route.key}
            onPress={() => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });
              if (!isActive && !event.defaultPrevented) {
                navigation.navigate(route.name as never);
              }
            }}
            style={{
              flex: 1,
              alignItems: 'center',
              gap: 3,
              paddingHorizontal: 6,
              paddingVertical: 4,
            }}
          >
            <View style={{ opacity: isActive ? 1 : 0.6 }}>{tab.icon(isActive, dark)}</View>
            <Text
              numberOfLines={1}
              style={{
                fontSize: 9.5,
                fontFamily: 'Nunito_800ExtraBold',
                fontWeight: '800',
                color: isActive ? (dark ? KCColors.darkText : KCColors.ink) : dark ? KCColors.darkSub : '#9AA0AC',
                letterSpacing: 0.2,
              }}
            >
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
