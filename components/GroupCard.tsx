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
  const isSettled = group.balanceType === "settled" || group.amount === 0;
  const isReceivable = group.balanceType === "receivable";

  return (
    <TouchableOpacity
      className="p-5 border border-border rounded-3xl gap-4 bg-white shadow-sm"
      activeOpacity={0.85}
      onPress={() => router.push(`/(groups)/${group.id}` as any)}
    >
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-3 flex-1">
          <View
            className="rounded-2xl w-13 h-13 flex items-center justify-center p-2.5"
            style={{
              backgroundColor: groupCategoryColors[group.category] || "#F1F5F9",
            }}
          >
            <Image
              source={groupIcon[group.category]}
              className="w-7 h-7"
              resizeMode="contain"
            />
          </View>
          <View className="flex-1">
            <Text
              className="text-primary font-semibold text-lg leading-6"
              numberOfLines={1}
            >
              {group.name}
            </Text>
            <Text className="text-muted font-normal text-xs">
              {group.membersList.length} members
            </Text>
          </View>
        </View>

        <View
          className="rounded-full px-3 py-1 items-center justify-center"
          style={{
            backgroundColor: groupCategoryColors[group.category] || "#F1F5F9",
          }}
        >
          <Text className="text-[11px] font-medium text-primary">
            {group.category}
          </Text>
        </View>
      </View>

      <View>
        <Text className="font-semibold uppercase text-muted text-[11px] tracking-wider mb-0.5">
          {getBalanceType[group.balanceType]}
        </Text>
        <Text
          className={`font-bold text-2xl ${
            isSettled
              ? "text-primary"
              : isReceivable
              ? "text-emerald-600"
              : "text-red-500"
          }`}
        >
          {isSettled
            ? "₹0"
            : isReceivable
            ? `+₹${group.amount.toLocaleString()}`
            : `-₹${group.amount.toLocaleString()}`}
        </Text>
      </View>

      <View className="flex-row items-center justify-between pt-1 border-t border-slate-100">
        <UserStack users={group.membersList} />
        <Text className="text-xs text-muted font-normal">
          {group.lastActivity}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
