import UserAvatar from "@/assets/images/avatar.png";
import { GroupCard } from "@/components/GroupCard";
import { PendingSettlementCard } from "@/components/PendingSettlementCard";
import { RecentActivityCard } from "@/components/RecentActivityCard";
import {
	groups,
	pendingSettlements,
	recentActivities,
} from "@/utils/constants";
import {
	Add01Icon,
	ArrowDownLeft01Icon,
	ArrowRight01Icon,
	ArrowUpRight01Icon,
	Notification01Icon,
	ScanIcon,
	UserGroup03Icon,
	Wallet01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
	return (
		<SafeAreaView className="flex-1 bg-background" edges={["top"]}>
			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{
					padding: 20,
				}}
			>
				{/* Header */}
				<View className="flex-row  h-14 items-center justify-between mb-6">
					<View className="flex-row items-center gap-2">
						<View className="bg-surface border border-white  rounded-full h-14 w-14 items-center justify-center">
							<Image
								source={UserAvatar}
								className="w-10 h-10 "
								resizeMode="contain"
							/>
						</View>
						<View className="flex flex-col">
							<Text className="font-semibold text-primary text-base">
								Welcome back!
							</Text>
							<Text className="text-sm font-regular text-muted">
								Mohammad
							</Text>
						</View>
					</View>
					<View className="bg-surface flex items-center justify-center h-12 w-12 rounded-full border border-white relative">
						<HugeiconsIcon
							icon={Notification01Icon}
							size={20}
							color="#223543"
							strokeWidth={1.5}
						/>
						<View className="absolute bg-red-500 h-3 w-3 rounded-full border border-white top-2 right-2" />
					</View>
				</View>

				{/* Hero Card */}
				<View className="relative flex-col gap-5 rounded-[32px] overflow-hidden p-6 mb-5">
					<LinearGradient
						colors={["#324D5E", "#68A1C4"]}
						className="absolute inset-0 rounded-[32px]"
						start={{ x: 0, y: 0 }}
						end={{ x: 1, y: 1 }}
					/>
					<View className="absolute h-48 w-48 rounded-full bg-circle/30 -right-8 -top-8  " />
					<View className="absolute h-48 w-48 rounded-full bg-circle/30  -bottom-8 -left-12  " />
					<View className="flex-col justify-between gap-2">
						<Text className="uppercase text-secondary text-sm font-semibold tracking-wider">
							Net balance
						</Text>
						<Text className="uppercase text-foreground text-4xl font-bold ">
							₹ 1,960
						</Text>
						<Text className="text-secondary text-xs font-semibold">
							Across 4 active groups
						</Text>
					</View>
					<View className="flex-row items-center justify-between gap-4">
						<View className="flex-1  gap-2 bg-circle/50 p-4 rounded-3xl">
							<View className="flex-row gap-1 items-center justify-start">
								<HugeiconsIcon
									icon={ArrowDownLeft01Icon}
									size={16}
									color="#C2C9D0"
									strokeWidth={2.5}
								/>
								<Text className="text-sm text-secondary font-semibold ">
									To Recieve
								</Text>
							</View>
							<Text className="text-foreground font-semibold text-2xl">
								₹3,420
							</Text>
						</View>
						<View className="flex-1 gap-2 bg-circle/50 p-4 rounded-3xl">
							<View className="flex-row gap-1 items-center justify-start">
								<HugeiconsIcon
									icon={ArrowUpRight01Icon}
									size={16}
									color="#C2C9D0"
									strokeWidth={2.5}
								/>
								<Text className="text-sm text-secondary font-semibold ">
									To Pay
								</Text>
							</View>
							<Text className="text-foreground font-semibold text-2xl">
								₹1,460
							</Text>
						</View>
					</View>
					<TouchableOpacity
						className="bg-background flex-row items-center justify-center rounded-full h-[50px]"
						activeOpacity={0.8}
					>
						<Text className="text-primary font-semibold text-base">
							Settle up
						</Text>
						<HugeiconsIcon
							icon={ArrowRight01Icon}
							size={18}
							strokeWidth={2.5}
						/>
					</TouchableOpacity>
				</View>

				{/* Actions sections */}
				<View className="flex-row items-center justify-between gap-3 mb-8">
					<TouchableOpacity
						className="bg-white p-4 flex-1  flex-col items-center justify-center gap-2 rounded-4xl border border-border shadow-md"
						activeOpacity={0.6}
					>
						<View className="rounded-full w-10 h-10 bg-surface flex items-center justify-center">
							<HugeiconsIcon
								icon={Add01Icon}
								size={22}
								color="#223543"
								strokeWidth={2}
							/>
						</View>
						<Text className="text-primary font-medium text-sm">
							Add
						</Text>
					</TouchableOpacity>

					<TouchableOpacity
						className="bg-white p-4 flex-1 flex-col items-center justify-center gap-2 rounded-4xl border border-border shadow-md"
						activeOpacity={0.6}
					>
						<View className="rounded-full w-10 h-10 bg-surface flex items-center justify-center">
							<HugeiconsIcon
								icon={Wallet01Icon}
								size={22}
								color="#223543"
								strokeWidth={2}
							/>
						</View>
						<Text className="text-primary font-medium text-sm">
							Settle
						</Text>
					</TouchableOpacity>

					<TouchableOpacity
						className="bg-white p-4 flex-col items-center justify-center gap-2 rounded-[28px] border border-border flex-1 shadow-md"
						activeOpacity={0.6}
					>
						<View className="rounded-full w-10 h-10 bg-surface flex items-center justify-center">
							<HugeiconsIcon
								icon={UserGroup03Icon}
								size={22}
								color="#223543"
								strokeWidth={2}
							/>
						</View>
						<Text className="text-primary font-medium text-sm">
							Group
						</Text>
					</TouchableOpacity>

					<TouchableOpacity
						className="bg-white p-4 flex-col items-center justify-center gap-2 rounded-[28px] border border-border flex-1 shadow-md"
						activeOpacity={0.6}
					>
						<View className="rounded-full w-10 h-10 bg-surface flex items-center justify-center">
							<HugeiconsIcon
								icon={ScanIcon}
								size={22}
								color="#223543"
								strokeWidth={2}
							/>
						</View>
						<Text className="text-primary font-medium text-sm">
							Scan
						</Text>
					</TouchableOpacity>
				</View>

				{/* Group section */}
				<View className="mb-8">
					<View className="flex-row items-center justify-between mb-5">
						<Text className="uppercase font-semibold text-sm text-muted">
							Your Groups
						</Text>
						<TouchableOpacity>
							<Text className="text-muted font-medium text-sm ">
								See all
							</Text>
						</TouchableOpacity>
					</View>
					<ScrollView
						showsHorizontalScrollIndicator={false}
						horizontal
						contentContainerStyle={{
							gap: 12,
						}}
						pagingEnabled
						decelerationRate="fast"
						snapToAlignment="start"
					>
						{groups.map((group) => (
							<GroupCard key={group.id} group={group} />
						))}
					</ScrollView>
				</View>

				{/*  Recent Activity section */}
				<View className="mb-8">
					<View className="flex-row items-center justify-between mb-5">
						<Text className="uppercase font-semibold text-sm text-muted">
							Recent Activity
						</Text>
						<TouchableOpacity>
							<Text className="text-muted font-medium text-sm ">
								View all
							</Text>
						</TouchableOpacity>
					</View>

					<View className="flex gap-3">
						{recentActivities.map((activity) => (
							<RecentActivityCard
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

				{/* Pending settlement */}
				<View>
					<View className="flex-row items-center justify-between mb-5">
						<Text className="uppercase font-semibold text-sm text-muted tracking-wide">
							Pending Settlements
						</Text>
					</View>
					<View className="flex-col gap-3">
						{pendingSettlements.map((item) => (
							<PendingSettlementCard
								key={item.id}
								id={item.id}
								username={item.username}
								amount={item.amount}
								balanceType={item.balanceType}
							/>
						))}
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}
