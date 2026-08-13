import {
  Activity01Icon,
  Home01Icon,
  User02Icon,
  UserGroup02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { withLayoutContext } from "expo-router";
import { useEffect, useRef } from "react";
import { Pressable, View } from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// ─── Tab Definitions ──────────────────────────────────────────────────────────
const TABS = [
  { name: "home", label: "Home", icon: Home01Icon },
  { name: "group", label: "Groups", icon: UserGroup02Icon },
  { name: "activity", label: "Activity", icon: Activity01Icon },
  { name: "profile", label: "Profile", icon: User02Icon },
] as const;

// ─── Design Tokens ────────────────────────────────────────────────────────────
const BAR_BG = "#DDE8EE";
const PILL_ACTIVE_BG = "#294355";
const PILL_INACTIVE_BG = "rgba(255,255,255,0.7)";
const ICON_ACTIVE = "#F8F9FA";
const ICON_INACTIVE = "#65747F";

const PILL_H = 56; // taller for a more premium feel
const COMPACT_W = 56; // inactive pill width — equal to PILL_H so it's a perfect circle
const EXPANDED_W = 122; // active pill width (icon zone + label + right padding)

// Slow, premium-feeling spring
const SPRING = { damping: 38, stiffness: 85, mass: 1.3 };

// ─── Single Tab Item ──────────────────────────────────────────────────────────
function TabItem({
  tab,
  isFocused,
  onPress,
}: {
  tab: (typeof TABS)[number];
  isFocused: boolean;
  onPress: () => void;
}) {
  const progress = useSharedValue(isFocused ? 1 : 0);
  const animWidth = useSharedValue(isFocused ? EXPANDED_W : COMPACT_W);
  const labelOpacity = useSharedValue(isFocused ? 1 : 0);
  const hasMounted = useRef(false);

  useEffect(() => {
    if (!hasMounted.current) {
      progress.value = isFocused ? 1 : 0;
      animWidth.value = isFocused ? EXPANDED_W : COMPACT_W;
      labelOpacity.value = isFocused ? 1 : 0;
      hasMounted.current = true;
      return;
    }

    if (isFocused) {
      animWidth.value = withSpring(EXPANDED_W, SPRING);
      progress.value = withSpring(1, SPRING);
      labelOpacity.value = withTiming(1, { duration: 300 });
    } else {
      labelOpacity.value = withTiming(0, { duration: 100 });
      animWidth.value = withSpring(COMPACT_W, SPRING);
      progress.value = withSpring(0, SPRING);
    }
  }, [isFocused]);

  const pillStyle = useAnimatedStyle(() => ({
    width: animWidth.value,
    backgroundColor: interpolateColor(
      progress.value,
      [0, 1],
      [PILL_INACTIVE_BG, PILL_ACTIVE_BG],
    ),
  }));

  const labelStyle = useAnimatedStyle(() => ({
    opacity: labelOpacity.value,
  }));

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="tab"
      accessibilityState={{ selected: isFocused }}
    >
      <Animated.View
        style={[
          pillStyle,
          {
            height: PILL_H,
            borderRadius: 999,
            flexDirection: "row",
            alignItems: "center",
            overflow: "hidden", // clips label naturally as pill contracts
          },
        ]}
      >
        {/*
				  ── Icon zone: always COMPACT_W wide & PILL_H tall ──
				  When pill = COMPACT_W, this zone fills 100% → icon is perfectly centered.
				  When pill = EXPANDED_W, this zone is the left portion → label fills the right.
				  NO gap or sibling text here affecting centering.
				*/}
        <View
          style={{
            width: COMPACT_W,
            height: PILL_H,
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0, // never compress the icon zone
          }}
        >
          <HugeiconsIcon
            icon={tab.icon}
            size={20}
            color={isFocused ? ICON_ACTIVE : ICON_INACTIVE}
            strokeWidth={1.5}
          />
        </View>

        {/*
				  ── Label: lives to the right of the icon zone ──
				  Clipped by overflow:hidden when pill is at COMPACT_W.
				  paddingRight gives breathing room on the right side.
				*/}
        <Animated.Text
          style={[
            labelStyle,
            {
              color: ICON_ACTIVE,
              fontSize: 13,
              fontWeight: "600",
              letterSpacing: 0.1,
              marginLeft: -12, // ← pulls text into the icon zone's unused space
              paddingRight: 16,
              flexShrink: 1,
            },
          ]}
          numberOfLines={1}
        >
          {tab.label}
        </Animated.Text>
      </Animated.View>
    </Pressable>
  );
}

// ─── Custom Tab Bar ───────────────────────────────────────────────────────────
function CustomTabBar({ state, navigation }: any) {
  const insets = useSafeAreaInsets();

  return (
    // Outer wrapper: transparent — no white strip, pill floats cleanly
    <View
      style={{
        paddingBottom: insets.bottom + 10,
        paddingTop: 10,
        paddingHorizontal: 20,
        backgroundColor: "transparent",
      }}
    >
      {/* Floating pill container — single background, no double layers */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-evenly",
          backgroundColor: BAR_BG,
          borderRadius: 999,
          paddingVertical: 5,
          shadowColor: "#1A2E3B",
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.12,
          shadowRadius: 20,
          elevation: 10,
        }}
      >
        {state.routes.map((route: any, index: number) => {
          const tab = TABS.find((t) => t.name === route.name);
          if (!tab) return null;
          const isFocused = state.index === index;

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
            <TabItem
              key={route.key}
              tab={tab}
              isFocused={isFocused}
              onPress={onPress}
            />
          );
        })}
      </View>
    </View>
  );
}

// ─── Layout ───────────────────────────────────────────────────────────────────
const { Navigator } = createMaterialTopTabNavigator();
const Tabs: any = withLayoutContext(Navigator);

export default function TabsLayout() {
  return (
    <Tabs
      tabBarPosition="bottom"
      tabBar={(props: any) => <CustomTabBar {...props} />}
      screenOptions={{ swipeEnabled: false, lazy: true }}
    >
      <Tabs.Screen name="home" />
      <Tabs.Screen name="group" />
      <Tabs.Screen name="activity" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}
