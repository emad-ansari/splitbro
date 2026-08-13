import {
  type Group,
  groupCategoryColors,
  groupIcon,
} from "@/utils/constants";
import { useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface GroupCardProps {
  group: Group;
}

export const GroupCard = ({ group }: GroupCardProps) => {
  const router = useRouter();
  const isSettled = group.balanceType === "settled" || group.amount === 0;
  const isReceivable = group.balanceType === "receivable";

  return (
    <TouchableOpacity
      className="flex-row items-center justify-between p-4 rounded-3xl border border-border bg-white shadow-xs"
      activeOpacity={0.85}
      onPress={() => router.push(`/(groups)/${group.id}` as any)}
    >
      {/* Left Column: Icon + Name + Subtitle */}
      <View className="flex-row items-center gap-3.5 flex-1 pr-3">
        <View
          className="rounded-2xl w-12 h-12 flex items-center justify-center p-2.5"
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
            className="text-primary font-semibold text-base leading-5"
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {group.name}
          </Text>
          <Text className="text-muted font-normal text-xs mt-0.5">
            {group.membersList.length} members • {group.lastActivity}
          </Text>
        </View>
      </View>

      {/* Right Column: Net Balance + Status Label */}
      <View className="items-end justify-center">
        <Text
          className={`font-bold text-lg ${
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
        <Text
          className={`text-[11px] font-medium mt-0.5 ${
            isSettled
              ? "text-muted font-normal"
              : isReceivable
              ? "text-emerald-600"
              : "text-red-500"
          }`}
        >
          {isSettled ? "settled up" : isReceivable ? "you get back" : "you owe"}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
