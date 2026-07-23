import EmptyListItem from "@/assets/icons/empty-folder.png";
import { recentActivities as expenses } from "@/utils/data";
import { FlatList, Image, Text, View } from "react-native";
import { ExpenseCard } from "./ExpenseCard";

export const ExpenseList = () => {
	return (
		<FlatList
			contentContainerStyle={{ gap: 10, paddingBottom: 10 }}
			showsVerticalScrollIndicator={false}
			data={expenses}
			keyExtractor={(item) => item.id}
			renderItem={({ item }) => (
				<ExpenseCard
					id={item.id}
					title={item.title}
					groupName={item.groupName}
					amount={item.amount}
					paidBy={item.paidBy}
					timeAgo={item.timeAgo}
					category={item.category}
					balanceType={item.balanceType}
				/>
			)}
			ListEmptyComponent={
				<View className="flex-1 pt-20 items-center justify-center">
					<Image source={EmptyListItem} className="w-20 h-20" />
					<Text className="text-base font-medium text-primary">
						No Expense Yet
					</Text>
				</View>
			}
		/>
	);
};
