import {
	Activity01Icon,
	Home01Icon,
	User03Icon,
	UserGroup03Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { Tabs } from "expo-router";

export default function TabLayout() {
	return (
		<Tabs screenOptions={{ headerShown: false }}>
			<Tabs.Screen
				name="home"
				options={{
					title: "Home",
					tabBarIcon: ({ color, size }) => (
						<HugeiconsIcon
							icon={Home01Icon}
							size={size}
							color="black"
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="group"
				options={{
					title: "Groups",
					tabBarIcon: ({ color, size }) => (
						<HugeiconsIcon
							icon={UserGroup03Icon}
							size={size}
							color="black"
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="activity"
				options={{
					title: "Activity",
					tabBarIcon: ({ color, size }) => (
						<HugeiconsIcon
							icon={Activity01Icon}
							size={size}
							color="black"
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					title: "Profile",
					tabBarIcon: ({ color, size }) => (
						<HugeiconsIcon
							icon={User03Icon}
							size={size}
							color="black"
						/>
					),
				}}
			/>
		</Tabs>
	);
}
