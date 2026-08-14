import {
  Add01Icon,
  Analytics01Icon,
  Home01Icon,
  User02Icon,
  UserGroup02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import * as Haptics from "expo-haptics";
import { withLayoutContext } from "expo-router";
import BottomSheet from "@gorhom/bottom-sheet";
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
import { GroupSelectBottomSheet } from "@/components/expenses/GroupSelectBottomSheet";
import { useModalStore } from "@/store/useModalStore";

// ─── Tab Definitions ──────────────────────────────────────────────────────────
const TABS = [
  { name: "home", label: "Home", icon: Home01Icon },
  { name: "group", label: "Groups", icon: UserGroup02Icon },
  { name: "insights", label: "Insights", icon: Analytics01Icon },
  { name: "profile", label: "Profile", icon: User02Icon },
] as const;

// ─── Design Tokens ────────────────────────────────────────────────────────────
const BAR_BG = "#162530";
const BAR_BORDER = "rgba(255, 255, 255, 0.08)";
const PILL_ACTIVE_BG = "#273D4D";
const PILL_INACTIVE_BG = "transparent";
const ICON_ACTIVE = "#FFFFFF";
const ICON_INACTIVE = "#7C8E9B";
const FAB_BG = "#294355";
const FAB_BORDER = "rgba(255, 255, 255, 0.15)";

const PILL_H = 44;
const COMPACT_W = 44; // Inactive circle tab item
const EXPANDED_W = 104; // Active expanding tab item

// Snappy, organic spring
const SPRING = { damping: 24, stiffness: 170, mass: 0.8 };

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
  const scale = useSharedValue(1);
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
      labelOpacity.value = withTiming(1, { duration: 200 });
    } else {
      labelOpacity.value = withTiming(0, { duration: 100 });
      animWidth.value = withSpring(COMPACT_W, SPRING);
      progress.value = withSpring(0, SPRING);
    }
  }, [isFocused, animWidth, labelOpacity, progress]);

  const pillStyle = useAnimatedStyle(() => ({
    width: animWidth.value,
    transform: [{ scale: scale.value }],
    backgroundColor: interpolateColor(
      progress.value,
      [0, 1],
      [PILL_INACTIVE_BG, PILL_ACTIVE_BG]
    ),
  }));

  const labelStyle = useAnimatedStyle(() => ({
    opacity: labelOpacity.value,
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.92, { damping: 15, stiffness: 300 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 300 });
  };

  const handlePress = () => {
    Haptics.selectionAsync();
    onPress();
  };

  return (
    <Pressable
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      accessibilityRole="tab"
      accessibilityState={{ selected: isFocused }}
      style={{ alignItems: "center", justifyContent: "center" }}
    >
      <Animated.View
        style={[
          pillStyle,
          {
            height: PILL_H,
            borderRadius: PILL_H / 2,
            flexDirection: "row",
            alignItems: "center",
            overflow: "hidden",
          },
        ]}
      >
        {/* Icon Zone */}
        <View
          style={{
            width: COMPACT_W,
            height: PILL_H,
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <HugeiconsIcon
            icon={tab.icon}
            size={20}
            color={isFocused ? ICON_ACTIVE : ICON_INACTIVE}
            strokeWidth={isFocused ? 2 : 1.6}
          />
        </View>

        {/* Dynamic Label */}
        <Animated.Text
          style={[
            labelStyle,
            {
              color: ICON_ACTIVE,
              fontSize: 12.5,
              fontWeight: "600",
              fontFamily: "GeistSemiBold",
              letterSpacing: 0.2,
              marginLeft: -6,
              paddingRight: 14,
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

// ─── Floating Quick-Add Action Button ─────────────────────────────────────────
function QuickAddButton({ onPress }: { onPress: () => void }) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.9, { damping: 15, stiffness: 300 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 300 });
  };

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onPress();
  };

  return (
    <Pressable
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      accessibilityRole="button"
      accessibilityLabel="Add Expense"
      style={{ alignItems: "center", justifyContent: "center" }}
    >
      <Animated.View
        style={[
          animatedStyle,
          {
            width: 52,
            height: 52,
            borderRadius: 26,
            backgroundColor: FAB_BG,
            borderWidth: 1,
            borderColor: FAB_BORDER,
            alignItems: "center",
            justifyContent: "center",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.28,
            shadowRadius: 12,
            elevation: 10,
          },
        ]}
      >
        <HugeiconsIcon
          icon={Add01Icon}
          size={24}
          color="#FFFFFF"
          strokeWidth={2.4}
        />
      </Animated.View>
    </Pressable>
  );
}

// ─── Custom Floating Tab Bar ──────────────────────────────────────────────────
function CustomTabBar({
  state,
  navigation,
  onOpenAddExpense,
}: {
  state: any;
  navigation: any;
  onOpenAddExpense: () => void;
}) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        paddingBottom: Math.max(insets.bottom, 12),
        paddingTop: 8,
        paddingHorizontal: 16,
        backgroundColor: "transparent",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
      }}
      pointerEvents="box-none"
    >
      {/* 1. Floating Navigation Island (Snug fit with tight padding & gaps) */}
      <View
        style={{
          backgroundColor: BAR_BG,
          borderRadius: 999,
          borderWidth: 1,
          borderColor: BAR_BORDER,
          flexDirection: "row",
          alignItems: "center",
          padding: 4,
          gap: 4,
          shadowColor: "#0D1820",
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.35,
          shadowRadius: 16,
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

      {/* 2. Floating Quick-Add Action Button (Right) */}
      <QuickAddButton onPress={onOpenAddExpense} />
    </View>
  );
}

// ─── Layout ───────────────────────────────────────────────────────────────────
const { Navigator } = createMaterialTopTabNavigator();
const Tabs: any = withLayoutContext(Navigator);

export default function TabsLayout() {
  const groupSelectBottomSheetRef = useRef<BottomSheet>(null);
  const isAddExpenseOpen = useModalStore((state) => state.isAddExpenseOpen);
  const openAddExpense = useModalStore((state) => state.openAddExpense);

  useEffect(() => {
    if (isAddExpenseOpen) {
      groupSelectBottomSheetRef.current?.expand();
    }
  }, [isAddExpenseOpen]);

  return (
    <View style={{ flex: 1, backgroundColor: "#F8F9FA" }}>
      <Tabs
        tabBarPosition="bottom"
        tabBar={(props: any) => (
          <CustomTabBar {...props} onOpenAddExpense={openAddExpense} />
        )}
        screenOptions={{ swipeEnabled: false, lazy: true }}
      >
        <Tabs.Screen name="home" />
        <Tabs.Screen name="group" />
        <Tabs.Screen name="insights" />
        <Tabs.Screen name="profile" />
      </Tabs>

      {/* Global Quick Add Expense Bottom Sheet */}
      <GroupSelectBottomSheet bottomSheetRef={groupSelectBottomSheetRef} />
    </View>
  );
}

