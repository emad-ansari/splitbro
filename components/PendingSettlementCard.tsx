import { getBalanceType, PendingSettlement } from "@/utils/constants";
import { Notification01Icon, SentIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { Text, TouchableOpacity, View } from "react-native";

export const PendingSettlementCard = ({
	id,
	username,
	amount,
	balanceType,
}: PendingSettlement) => {
	return (
		<View className="flex-row items-center p-5 rounded-4xl shadow-md border border-border bg-white justify-between">
			<View className="flex-row items-center justify-between gap-2">
				<View
					className={`flex items-center justify-center  h-14 w-14 rounded-full  ${balanceType === "receivable" ? "bg-green-100" : "bg-red-100"}`}
				>
					<Text
						className={`text-base font-semibold  ${balanceType === "receivable" ? "text-green-500" : "text-red-500"}`}
					>
						{username
							.split(" ")
							.map((word) => word.charAt(0).toUpperCase())
							.join("")}
					</Text>
				</View>
				<View>
					<Text className="text-primary font-medium text-md">
						{username}
					</Text>
					<Text className="font-regular text-sm text-muted">
						{getBalanceType[balanceType]}
					</Text>
				</View>
			</View>
			<View className="flex-row  items-center justify-center gap-2">
				<Text
					className={`text-base font-semibold ${balanceType === "receivable" ? "text-primary" : "text-red-500"}`}
				>
					₹{amount}
				</Text>
				<TouchableOpacity
					className={`flex-row items-center justify-center rounded-full px-4 py-2  gap-1 ${balanceType === 'receivable' ? "bg-green-50 border border-green-500/10" : "bg-primary"}  `}
					activeOpacity={0.6}
				>
					{balanceType === "receivable" ? (
						<HugeiconsIcon icon={Notification01Icon} size = {16} color = "#00c950" />
					) : (
						<HugeiconsIcon icon={SentIcon} size = {16} color = "white"/>
					)}
					<Text className={` text-xs font-medium ${balanceType === 'receivable' ? "text-green-500" : "text-white"}`}>
						{balanceType === "receivable" ? "Remind" : "Pay"}{" "}
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};
