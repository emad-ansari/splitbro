import { Activity, getActivityIcon } from "@/utils/constants";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { Text, View } from "react-native";

export const ExpenseCard = ({
	title,
	groupName,
	paidBy,
	amount,
	balanceType,
	timeAgo,
	category,
}: Activity) => {
	return (
		<View className="flex-row items-center justify-between rounded-4xl p-5 border border-border bg-white shadow-md">
			<View className="flex-row items-center justify-between gap-2">
				<View className="w-14 h-14 rounded-full bg-surface flex items-center justify-center">
					<HugeiconsIcon
						icon={getActivityIcon[category]}
						color="#314B5E"
					/>
				</View>
				<View>
					<Text className="text-md font-medium text-primary">
						{title}
					</Text>
					<Text className="text-sm  text-muted font-regular">
						{groupName} • Paid by {paidBy}
					</Text>
				</View>
			</View>
			<View className="flex-col items-end justify-center">
				<Text
					className={`font-semibold text-base ${balanceType === "payable" ? "text-red-600" : "text-primary"}`}
				>
					{balanceType === "payable" ? `-₹${amount}` : balanceType === "receivable" ? `+₹${amount}` : "done"}
				</Text>
				<Text className="text-muted font-regular text-sm">
					{timeAgo} ago
				</Text>
			</View>
		</View>
	);
};
