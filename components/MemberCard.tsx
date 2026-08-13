import Avatar from "@/components/contacts/Avatar";
import { getBalanceType, PendingSettlement } from "@/utils/constants";
import { CheckmarkCircle02Icon, Notification01Icon, SentIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { Text, TouchableOpacity, View } from "react-native";

interface MemberCardProps extends PendingSettlement {
  avatarUri?: string;
  onActionPress?: () => void;
}

export const MemberCard = ({
  id,
  username,
  amount,
  balanceType,
  avatarUri,
  onActionPress,
}: MemberCardProps) => {
  const isSettled = balanceType === "settled" || amount === 0;
  const isReceivable = balanceType === "receivable";

  return (
    <TouchableOpacity
      className="flex-row items-center p-4 rounded-3xl border border-border bg-white justify-between shadow-sm"
      activeOpacity={0.8}
    >
      <View className="flex-row items-center gap-3">
        <Avatar name={username} avatarUri={avatarUri} size={48} />
        <View>
          <Text className="text-primary font-semibold text-base">
            {username}
          </Text>
          <Text className="font-normal text-xs text-muted">
            {isSettled ? "Settled up" : getBalanceType[balanceType]}
          </Text>
        </View>
      </View>

      <View className="flex-row items-center gap-3">
        {!isSettled && (
          <Text
            className={`text-base font-bold ${
              isReceivable ? "text-emerald-600" : "text-red-500"
            }`}
          >
            ₹{amount}
          </Text>
        )}

        {isSettled ? (
          <View className="flex-row items-center bg-gray-100 px-3 py-1.5 rounded-full gap-1">
            <HugeiconsIcon icon={CheckmarkCircle02Icon} size={14} color="#64748B" />
            <Text className="text-xs font-medium text-gray-500">Settled</Text>
          </View>
        ) : (
          <TouchableOpacity
            className={`flex-row items-center justify-center rounded-full px-3.5 py-2 gap-1 ${
              isReceivable
                ? "bg-emerald-50 border border-emerald-500/20"
                : "bg-primary"
            }`}
            activeOpacity={0.7}
            onPress={onActionPress}
          >
            {isReceivable ? (
              <HugeiconsIcon icon={Notification01Icon} size={14} color="#059669" />
            ) : (
              <HugeiconsIcon icon={SentIcon} size={14} color="white" />
            )}
            <Text
              className={`text-xs font-medium ${
                isReceivable ? "text-emerald-600" : "text-white"
              }`}
            >
              {isReceivable ? "Remind" : "Pay"}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};
