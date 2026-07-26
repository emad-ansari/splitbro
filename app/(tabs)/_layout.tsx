import {
	Activity01Icon,
	Home01Icon,
	User02Icon,
	UserGroup02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { withLayoutContext } from "expo-router";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useEffect, useRef, useState } from "react";
import { LayoutChangeEvent, Pressable, Text, View } from "react-native";
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const TABS = [
	{ name: "home", label: "Home", icon: Home01Icon },
	{ name: "group", label: "Groups", icon: UserGroup02Icon },
	{ name: "activity", label: "Activity", icon: Activity01Icon },
	{ name: "profile", label: "Profile", icon: User02Icon },
] as const;

function CustomTabBar({ state, navigation }: any) {
	const insets = useSafeAreaInsets();

	const [layouts, setLayouts] = useState<Record<number, { x: number; width: number }>>({});

	const pillX = useSharedValue(0);
	const pillWidth = useSharedValue(44);
	const hasMounted = useRef(false);

	const pillStyle = useAnimatedStyle(() => ({
		transform: [{ translateX: pillX.value }],
		width: pillWidth.value,
	}));

	const handleLayout = (index: number) => (e: LayoutChangeEvent) => {
		const { x, width } = e.nativeEvent.layout;
		setLayouts((prev) => ({ ...prev, [index]: { x, width } }));
	};

	useEffect(() => {
		const layout = layouts[state.index];
		if (!layout) return;

		const target = layout.x + layout.width / 2 - 22;

		if (pillWidth.value === 44 && pillX.value === 0 && !hasMounted.current) {
			// first paint: snap instantly, no animation
			pillX.value = target;
			hasMounted.current = true;
		} else {
			pillX.value = withSpring(target, { stiffness: 250 });
		}
		pillWidth.value = withSpring(44, { stiffness: 250 });
	}, [state.index, layouts]);

	return (
		<View
			style={{
				paddingBottom: insets.bottom,
				backgroundColor: "#F8F9FA",
				borderTopWidth: 1,
				borderTopColor: "#DEE2E5",
			}}
		>
			<View
				style={{
					flexDirection: "row",
					paddingTop: 8,
					justifyContent: "space-between",
				}}
			>
				<Animated.View
					style={[
						{
							position: "absolute",
							left: 0,
							top: 8,
							height: 44,
							borderRadius: 18,
							backgroundColor: "#2F4656",
						},
						pillStyle,
					]}
				/>

				{state.routes.map((route: any, index: number) => {
					const tab = TABS.find((t) => t.name === route.name);
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
						<Pressable
							key={route.key}
							onPress={onPress}
							onLayout={handleLayout(index)}
							style={{
								alignItems: "center",
								paddingHorizontal: 20,
								paddingBottom: 8,
							}}
							accessibilityRole="tab"
							accessibilityState={{ selected: isFocused }}
						>
							<View
								style={{
									width: 44,
									height: 44,
									borderRadius: 18,
									alignItems: "center",
									justifyContent: "center",
								}}
							>
								{tab && (
									<HugeiconsIcon
										icon={tab.icon}
										size={24}
										color={isFocused ? "#F8F9FA" : "#65747F"}
									/>
								)}
							</View>
							<Text
								style={{
									fontSize: 10,
									fontWeight: isFocused ? "700" : "500",
									color: isFocused ? "#314B5E" : "#65747F",
									marginTop: 2,
								}}
							>
								{tab?.label}
							</Text>
						</Pressable>
					);
				})}
			</View>
		</View>
	);
}

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