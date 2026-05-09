import React from 'react';
import { Pressable, View, type ViewStyle, type StyleProp } from 'react-native';
import { KCColors } from '../theme/colors';

type ChunkyProps = {
  color: string;
  depthColor: string;
  radius?: number;
  depth?: number;
  padding?: number | string;
  paddingHorizontal?: number;
  paddingVertical?: number;
  selected?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  onPress?: () => void;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  innerStyle?: StyleProp<ViewStyle>;
};

/**
 * Duolingo-style 3D button. Achieves the "tactile" depth via a stacked
 * background View offset by `depth` pixels (RN equivalent of CSS bottom
 * border / box-shadow on the design prototype).
 */
export function Chunky({
  color,
  depthColor,
  radius = 16,
  depth = 4,
  padding,
  paddingHorizontal,
  paddingVertical,
  selected,
  disabled,
  fullWidth,
  onPress,
  children,
  style,
  innerStyle,
}: ChunkyProps) {
  const [pressed, setPressed] = React.useState(false);

  return (
    <Pressable
      onPress={disabled ? undefined : onPress}
      onPressIn={() => !disabled && setPressed(true)}
      onPressOut={() => setPressed(false)}
      style={[
        {
          alignSelf: fullWidth ? 'stretch' : 'flex-start',
          opacity: disabled ? 0.5 : 1,
        },
        style,
      ]}
    >
      <View style={{ marginBottom: depth, position: 'relative' }}>
        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: depth,
            bottom: -depth,
            backgroundColor: depthColor,
            borderRadius: radius,
          }}
        />
        <View
          style={[
            {
              backgroundColor: color,
              borderRadius: radius,
              paddingHorizontal: paddingHorizontal ?? (typeof padding === 'number' ? padding : 16),
              paddingVertical: paddingVertical ?? (typeof padding === 'number' ? padding : 10),
              borderWidth: selected ? 3 : 0,
              borderColor: selected ? KCColors.selectRing : 'transparent',
              transform: [{ translateY: pressed && !disabled ? depth / 2 : 0 }],
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
            },
            innerStyle,
          ]}
        >
          {children}
        </View>
      </View>
    </Pressable>
  );
}
