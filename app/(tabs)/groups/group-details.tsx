import FlatmateIcon from "@/assets/icons/house.png";
import { CardBackground } from "@/components/CardBackground";
import { ExpenseCard } from "@/components/ExpenseCard";
import { MemberCard } from "@/components/MemberCard";
import { pendingSettlements, recentActivities } from "@/utils/constants";
import { Feather } from "@expo/vector-icons";

import {
	Add01Icon,
	Dollar02Icon,
	Invoice03Icon,
	UserGroup02Icon,
	Wallet01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import {
	Easing,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function GroupDetails() {
	const router = useRouter();

	const [activeTab, setActiveTab] = useState<"Expenses" | "Members">(
		"Expenses",
	);

	const translateX = useSharedValue(0);

	const [tabWidth, setTabWidth] = useState(0);

	const handleTabPress = (tab: "Expenses" | "Members") => {
		setActiveTab(tab);

		translateX.value = withTiming(tab === "Expenses" ? 0 : tabWidth - 4, {
			duration: 300,
			easing: Easing.out(Easing.cubic),
		});
	};

	const indicatorStyle = useAnimatedStyle(() => ({
		transform: [
			{
				translateX: translateX.value,
			},
		],
	}));

	return (
		<SafeAreaView className="flex-1 bg-background" edges={["top"]}>
			{/* Header */}

			<View className="flex-row items-center justify-between px-6 mb-6">
				<TouchableOpacity
					className="bg-surface rounded-full w-12 h-12 flex items-center justify-center"
					activeOpacity={0.6}
					onPress={() => router.back()}
				>
					<Feather name="chevron-left" size={20} color="#314B5E" />
				</TouchableOpacity>
				<View className="flex-row items-center justify-center gap-2">
					<Text className="text-xl font-semibold text-primary ">
						Flatmates
					</Text>
					<Image source={FlatmateIcon} className="w-5 h-5" />
				</View>
				<TouchableOpacity
					className="flex items-center justify-center rounded-full bg-surface w-12 h-12"
					activeOpacity={0.8}
				>
					<Feather name="more-horizontal" size={20} color="#314B5E" />
				</TouchableOpacity>
			</View>
			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ paddingBottom: 10 }}
			>
				{/* Details */}
				<View className="px-6 flex-1">
					{/*  Group Details card */}
					<View className="relative flex-col  rounded-4xl overflow-hidden p-6 mb-5 gap-4 ">
						<CardBackground />
						<View className="">
							<Text className="uppercase text-secondary font-semibold text-sm mb-2">
								Total Group Balance
							</Text>
							<Text className="text-foreground font-bold text-4xl ">
								₹ 1,450.25
							</Text>
						</View>

						{/* total spent */}
						<View className="flex-row items-center justify-between border border-border rounded-4xl  p-5 bg-white shadow-md">
							<View className="flex-col items-center justify-center gap-2">
								<View className="rounded-full bg-surface w-12 h-12 flex items-center justify-center ">
									<HugeiconsIcon
										icon={UserGroup02Icon}
										color="#314B5E"
										size={24}
									/>
								</View>

								<Text className="text-muted font-regular text-xs ">
									Active Members
								</Text>
								<Text className="text-primary font-semibold text-lg ">
									4
								</Text>
							</View>

							{/* divider */}
							<View className="w-px flex bg-surface h-full" />

							<View className="flex-col items-center justify-center gap-2">
								<View className="rounded-full bg-surface w-12 h-12 flex items-center justify-center ">
									<HugeiconsIcon
										icon={Dollar02Icon}
										color="#314B5E"
										size={24}
									/>
								</View>

								<Text className="text-muted font-regular text-xs ">
									Total Spent
								</Text>
								<Text className="text-primary font-semibold text-lg ">
									₹1,450.25
								</Text>
							</View>

							{/* divider */}
							<View className="w-px flex bg-surface h-full" />

							<View className="flex-col items-center justify-center gap-2">
								<View className="rounded-full bg-surface w-12 h-12 flex items-center justify-center ">
									<HugeiconsIcon
										icon={Invoice03Icon}
										color="#314B5E"
										size={24}
									/>
								</View>

								<Text className="text-muted font-regular text-xs ">
									Total Expenses
								</Text>
								<Text className="text-primary font-semibold text-lg ">
									20
								</Text>
							</View>
						</View>
					</View>

					{/* Actions */}
					<View className="flex-row items-center gap-4 justify-between mb-6">
						<TouchableOpacity
							className="bg-button rounded-3xl h-14 flex-row items-center justify-center px-4 flex-1 gap-1"
							activeOpacity={0.9}
						>
							<HugeiconsIcon
								icon={Add01Icon}
								color="white"
								size={22}
							/>
							<Text className="text-white font-medium text-sm">
								Add Expense
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							className="bg-button rounded-3xl h-14 flex-row items-center justify-center px-4 gap-1"
							activeOpacity={0.8}
						>
							<HugeiconsIcon
								icon={Wallet01Icon}
								color="white"
								size={22}
							/>
						</TouchableOpacity>
					</View>

					{/*  Recent Activity section */}
					<View className="mb-8">
						<View className="flex-row items-center justify-between mb-5">
							<Text className="uppercase font-semibold text-sm text-muted">
								Recent Activity
							</Text>
							<TouchableOpacity activeOpacity={0.8} onPress = {() => router.push('/(tabs)/groups/expense-history')}>
								<Text className="text-muted font-medium text-sm ">
									View all
								</Text>
							</TouchableOpacity>
						</View>

						<View className="flex gap-3">
							{recentActivities.map((activity) => (
								<ExpenseCard
									key={activity.id}
									id={activity.id}
									title={activity.title}
									groupName={activity.groupName}
									amount={activity.amount}
									balanceType={activity.balanceType}
									paidBy={activity.paidBy}
									timeAgo={activity.timeAgo}
									category={activity.category}
								/>
							))}
						</View>
					</View>

					{/* Members Details */}
					<View>
						<View className="flex-row items-center justify-between mb-5">
							<Text className="uppercase font-semibold text-sm text-muted tracking-wide">
								Members Details (2)
							</Text>
						</View>
						<View className="flex-col gap-3">
							{pendingSettlements.map((item) => (
								<MemberCard
									key={item.id}
									id={item.id}
									username={item.username}
									amount={item.amount}
									balanceType={item.balanceType}
								/>
							))}
						</View>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}
