import {
  Activity01Icon,
  Home01Icon,
  User03Icon,
  UserGroup03Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useState } from "react";
import { LayoutChangeEvent, Pressable, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ICONS: Record<string, any> = {
  home: Home01Icon,
  group: UserGroup03Icon,
  activity: Activity01Icon,
  profile: User03Icon,
};

export default function CustomTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const [tabWidth, setTabWidth] = useState(0);

  const onLayout = (e: LayoutChangeEvent) => {
    setTabWidth(e.nativeEvent.layout.width / state.routes.length);
  };

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: withSpring(tabWidth * state.index, {
          damping: 18,
          stiffness: 180,
          mass: 0.6,
        }),
      },
    ],
    width: tabWidth,
  }));

  return (
    <View
      style={{ paddingBottom: insets.bottom || 12 }}
      className="px-4 bg-transparent"
    >
      <View
        onLayout={onLayout}
        className="flex-row bg-surface rounded-4xl h-[68px] items-center px-2 border border-border relative overflow-hidden"
      >
        {/* sliding pill */}
        {tabWidth > 0 && (
          <Animated.View
            style={[
              {
                position: "absolute",
                height: 48,
                borderRadius: 24,
              },
              indicatorStyle,
            ]}
            className="items-center justify-center"
          >
            <View className="bg-circle w-12 h-12 rounded-full self-center" />
          </Animated.View>
        )}

        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;
          const icon = ICONS[route.name];

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <Pressable
              key={route.key}
              onPress={onPress}
              className="flex-1 items-center justify-center h-full"
              hitSlop={8}
            >
              <HugeiconsIcon
                icon={icon}
                size={22}
                color={isFocused ? "#F8F9FA" : "#65747F"}
                strokeWidth={isFocused ? 2 : 1.5}
              />
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
