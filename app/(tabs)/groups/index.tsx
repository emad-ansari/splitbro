import { GroupCard } from "@/components/GroupCard";
import { Group, groupFilterBadges, groups } from "@/utils/constants";
import { Add01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import EmptyListIcon from '@/assets/icons/empty-folder.png'

export default function GroupsScreen() {
	const [currentFilter, setCurrentFilter] = useState("All");
	return (
		<SafeAreaView className="flex-1  bg-background p-5" edges={["top"]}>
			{/* Header */}
			<View className="mb-5">
				<View className="flex-row items-center justify-between mb-8">
					<View className=" ">
						<Text className="text-3xl font-bold text-primary ">
							Groups
						</Text>
						<Text className="text-muted font-regular text-sm tracking-wide">
							Manage shared expenses
						</Text>
					</View>
					<View className=" rounded-2xl p-px bg-button">
						<TouchableOpacity
							className="flex-row items-center justify-center gap-1 shadow-md bg-primary px-4 py-3  rounded-2xl"
							activeOpacity={0.8}
						>
							<HugeiconsIcon
								icon={Add01Icon}
								color="white"
								size={16}
								strokeWidth={2}
							/>
							<Text className="text-white font-medium text-sm">
								Create Group
							</Text>
						</TouchableOpacity>
					</View>
				</View>

				{/* filter badge */}

				<View className="flex-row items-center justify-between  px-1 py-1 rounded-full">
					{groupFilterBadges.map((badge) => (
						<TouchableOpacity
							key={badge}
							className={`rounded-full px-4 py-2  ${currentFilter === badge ? "bg-button" : "bg-surface"}`}
							activeOpacity={0.8}
                            onPress = {() => setCurrentFilter(badge)}
						>
							<Text
								className={`text-sm font-medium ${currentFilter === badge ? "text-white " : "text-muted"}`}
							>
								{badge}
							</Text>
						</TouchableOpacity>
					))}
				</View>
			</View>

			{/* group list */}

			<View className="">
				<View className="flex-row items-center justify-between mb-5">
					<Text className="uppercase text-muted font-medium text-sm tracking-wide">
						Your Groups
					</Text>
					<Text className="text-muted font-regular text-sm">
						4 active
					</Text>
				</View>

				<FlatList
					data={groups}
					contentContainerStyle={{ gap: 10, paddingBottom: 180 }}
					keyExtractor={(item: Group) => item.id}
					showsVerticalScrollIndicator={false}
					renderItem={({ item }) => (
						<View className="p-1 bg-surface/20 rounded-[38px] backdrop-blur-md">
							<GroupCard group={item} />
						</View>
					)}
					ListEmptyComponent={
						<View className="flex-1 items-center justify-center  py-20">
                            <Image source={EmptyListIcon} className="w-20 h-20" />
							<Text className="mb-2 text-xl font-semibold  text-primary">No Group Yet</Text>
							<Text className="text-center text-muted font-regular text-sm ">
								Create your first group and {"\n"} start splitting
								expenses with friends
							</Text>
						</View>
					}
				/>
			</View>
		</SafeAreaView>
	);
}
