import React from 'react';
import { View, Pressable } from 'react-native';
import { Wordmark } from './Wordmark';
import { CloseIcon, MenuIcon } from './icons';
import { KCColors } from '../theme/colors';

export function AppHeader({
  onMenu,
  dark,
  hideMenu,
  closeMode,
}: {
  onMenu?: () => void;
  dark?: boolean;
  hideMenu?: boolean;
  closeMode?: boolean;
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 22,
        paddingTop: 16,
        paddingBottom: 14,
        borderBottomWidth: 1,
        borderBottomColor: dark ? KCColors.darkBorder : '#EFEFEF',
        backgroundColor: dark ? KCColors.darkBg : 'transparent',
      }}
    >
      <Wordmark size={26} dark={dark} />
      {!hideMenu && (
        <Pressable
          onPress={onMenu}
          style={{ width: 38, height: 38, alignItems: 'center', justifyContent: 'center' }}
          hitSlop={8}
        >
          {closeMode ? <CloseIcon dark={dark} /> : <MenuIcon dark={dark} />}
        </Pressable>
      )}
    </View>
  );
}
