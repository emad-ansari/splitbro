import { Activity, getActivityIcon } from "@/utils/constants";
import { CheckmarkCircle02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { Text, TouchableOpacity, View } from "react-native";

interface ExpenseCardProps extends Activity {
  onPress?: () => void;
}

export const ExpenseCard = ({
  title,
  groupName,
  paidBy,
  amount,
  balanceType,
  timeAgo,
  category,
  onPress,
}: ExpenseCardProps) => {
  const isSettlement = balanceType === "settled" || (category as string) === "Settlement";

  const Content = (
    <View className="flex-row items-center justify-between rounded-3xl p-4 border border-border bg-white shadow-sm">
      <View className="flex-row items-center gap-3 flex-1">
        <View
          className={`w-12 h-12 rounded-full items-center justify-center ${
            isSettlement ? "bg-emerald-100" : "bg-surface"
          }`}
        >
          {isSettlement ? (
            <HugeiconsIcon icon={CheckmarkCircle02Icon} color="#059669" size={22} />
          ) : (
            <HugeiconsIcon
              icon={getActivityIcon[category as keyof typeof getActivityIcon]}
              color="#314B5E"
              size={20}
            />
          )}
        </View>
        <View className="flex-1 pr-2">
          <Text
            className="text-base font-semibold text-primary"
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {title}
          </Text>
          <Text
            className="text-xs text-muted font-normal"
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {groupName} • {isSettlement ? `Settlement by ${paidBy}` : `Paid by ${paidBy}`}
          </Text>
        </View>
      </View>
      <View className="flex-col items-end justify-center">
        <Text
          className={`font-semibold text-base ${
            isSettlement
              ? "text-emerald-600"
              : balanceType === "payable"
              ? "text-red-500"
              : "text-emerald-600"
          }`}
        >
          {isSettlement
            ? `₹${amount}`
            : balanceType === "payable"
            ? `-₹${amount}`
            : `+₹${amount}`}
        </Text>
        <Text className="text-muted font-normal text-xs">{timeAgo} ago</Text>
      </View>
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity activeOpacity={0.75} onPress={onPress}>
        {Content}
      </TouchableOpacity>
    );
  }

  return Content;
};
