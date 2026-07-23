import {
	getBalanceType,
	type Group,
	groupCategoryColors,
	groupIcon,
} from "@/utils/constants";
import { useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { UserStack } from "./UserStack";

interface GroupCardProps {
	group: Group;
}
export const GroupCard = ({ group }: GroupCardProps) => {
	const router = useRouter();
	return (
		<TouchableOpacity
			className="p-5 border border-border rounded-4xl flex-1 gap-5  bg-white drop-shadow-sm"
			activeOpacity={0.8}
			onPress={() =>
				router.push(`/(groups)/?id=${group.id}`)
			}
		>
			<View className="flex-row items-center gap-6 justify-between">
				<View className="flex-row items-center gap-2">
					<View className="flex-row items-center justify-start">
						<View
							className={`rounded-full  w-14 h-14 flex items-center justify-center`}
							style={{
								backgroundColor:
									groupCategoryColors[group.category],
							}}
						>
							<Image
								source={groupIcon[group.category]}
								className="w-8 h-8"
							/>
						</View>
					</View>
					<View>
						<Text
							className="text-primary font-medium text-lg leading-5"
							numberOfLines={1}
						>
							{group.name}
						</Text>
						<Text className="text-muted font-regular text-sm">
							{group.membersList.length} members
						</Text>
					</View>
				</View>
				<View className="flex-row items-start  h-full pt-2">
					<View
						className="rounded-full  px-3 py-1  flex items-center justify-center"
						style={{
							backgroundColor:
								groupCategoryColors[group.category],
						}}
					>
						<Text className="text-xs font-regular text-primary">
							{group.category}
						</Text>
					</View>
				</View>
			</View>
			<View>
				<Text className="font-medium uppercase  text-muted text-xs tracking-wide">
					{getBalanceType[group.balanceType]}
				</Text>
				<Text
					className={`font-semibold  text-2xl ${group.balanceType === "payable" ? "text-red-500" : group.balanceType === "receivable" ? "text-emerald-600" : ""} `}
				>
					{group.balanceType === "receivable"
						? "+"
						: group.balanceType === "payable"
							? "-"
							: ""}
					₹{group.amount}
				</Text>
			</View>

			<View className="flex-row items-center justify-between gap-10">
				<UserStack users={group.membersList} />
				<Text className="text-xs text-muted font-regular">
					{group.lastActivity}
				</Text>
			</View>
		</TouchableOpacity>
	);
};
