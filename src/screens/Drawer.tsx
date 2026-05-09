import React, { useEffect, useRef } from 'react';
import { View, Text, Pressable, Modal, Animated, Dimensions } from 'react-native';
import { AppHeader } from '../components/AppHeader';
import { FlameIcon, CalIcon, BarsIcon, TrophyIcon, UserIcon2, LogoutIcon } from '../components/icons';
import { KCColors } from '../theme/colors';
import { useTheme } from '../theme/ThemeContext';

export type DrawerRoute = 'home' | 'calendar' | 'insights' | 'achievements' | 'profile';

export function Drawer({
  open,
  onClose,
  current,
  onNav,
}: {
  open: boolean;
  onClose: () => void;
  current: DrawerRoute;
  onNav: (id: DrawerRoute) => void;
}) {
  const { dark } = useTheme();
  const slide = useRef(new Animated.Value(0)).current;
  const screenW = Dimensions.get('window').width;
  const drawerW = screenW * 0.88;

  useEffect(() => {
    if (open) {
      slide.setValue(drawerW);
      Animated.timing(slide, {
        toValue: 0,
        duration: 220,
        useNativeDriver: true,
      }).start();
    }
  }, [open, slide, drawerW]);

  const items: {
    id: DrawerRoute;
    label: string;
    color: string;
    icon: (color: string) => React.ReactNode;
  }[] = [
    { id: 'home',         label: 'Tracking',   color: KCColors.orange, icon: () => <FlameIcon size={20} /> },
    { id: 'calendar',     label: 'Calendrier', color: KCColors.red,    icon: (c) => <CalIcon color={c} /> },
    { id: 'insights',     label: 'Insights',   color: KCColors.blue,   icon: (c) => <BarsIcon color={c} /> },
    { id: 'achievements', label: 'Trophées',   color: '#9C57FF',       icon: (c) => <TrophyIcon color={c} /> },
    { id: 'profile',      label: 'Profil',     color: KCColors.green,  icon: (c) => <UserIcon2 color={c} /> },
  ];

  return (
    <Modal visible={open} transparent animationType="none" onRequestClose={onClose}>
      <Pressable
        onPress={onClose}
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.35)',
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}
      >
        <Animated.View
          style={{
            width: drawerW,
            height: '100%',
            backgroundColor: dark ? KCColors.darkBg : '#fff',
            borderTopLeftRadius: 22,
            borderBottomLeftRadius: 22,
            transform: [{ translateX: slide }],
          }}
        >
          <Pressable style={{ flex: 1 }} onPress={() => {}}>
            <AppHeader dark={dark} onMenu={onClose} closeMode />

            {/* User card */}
            <View style={{ paddingHorizontal: 22, paddingTop: 16, paddingBottom: 8 }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 12,
                  paddingVertical: 14,
                  paddingHorizontal: 14,
                  backgroundColor: dark ? KCColors.darkCard : '#F4F8FB',
                  borderRadius: 14,
                }}
              >
                <View
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 22,
                    backgroundColor: KCColors.blue,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 18,
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
                      fontSize: 16,
                      fontFamily: 'Nunito_900Black',
                      fontWeight: '900',
                      color: dark ? KCColors.darkText : KCColors.ink,
                    }}
                  >
                    Alexandre
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: 'Nunito_700Bold',
                      fontWeight: '700',
                      color: dark ? KCColors.darkSub : '#9AA0AC',
                    }}
                  >
                    a.legal.contact@gmail.com
                  </Text>
                </View>
              </View>
            </View>

            <View style={{ paddingHorizontal: 22, flex: 1 }}>
              {items.map((it) => {
                const isCurrent = current === it.id;
                return (
                  <Pressable
                    key={it.id}
                    onPress={() => {
                      onNav(it.id);
                      onClose();
                    }}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 14,
                      paddingVertical: 16,
                      paddingHorizontal: 6,
                      borderBottomWidth: 1,
                      borderBottomColor: dark ? KCColors.darkBorder : '#F0EDE6',
                    }}
                  >
                    <View
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 12,
                        backgroundColor: it.color + '22',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {it.icon(it.color)}
                    </View>
                    <Text
                      style={{
                        flex: 1,
                        fontSize: 16,
                        fontFamily: 'Nunito_800ExtraBold',
                        fontWeight: '800',
                        color: isCurrent ? it.color : dark ? KCColors.darkText : KCColors.ink,
                      }}
                    >
                      {it.label}
                    </Text>
                    {isCurrent && (
                      <View
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: 4,
                          backgroundColor: it.color,
                        }}
                      />
                    )}
                  </Pressable>
                );
              })}

              <Pressable
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 14,
                  paddingVertical: 16,
                  paddingHorizontal: 6,
                  marginTop: 4,
                }}
              >
                <View
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 12,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <LogoutIcon dark={dark} />
                </View>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: 'Nunito_800ExtraBold',
                    fontWeight: '800',
                    color: dark ? KCColors.darkText : KCColors.ink,
                  }}
                >
                  Déconnexion
                </Text>
              </Pressable>
            </View>

            <View style={{ padding: 22, alignItems: 'center' }}>
              <Text
                style={{
                  fontSize: 11,
                  fontFamily: 'Nunito_700Bold',
                  fontWeight: '700',
                  color: dark ? KCColors.darkSub : '#B5B5B5',
                }}
              >
                Kilocal v1.0 · Reste croquant 🥬
              </Text>
            </View>
          </Pressable>
        </Animated.View>
      </Pressable>
    </Modal>
  );
}
