import FlatmateIcon from "@/assets/icons/house.png";
import { RenderBackdrop } from "@/components/BottomSheetRenderBackdrop";
import { CardBackground } from "@/components/CardBackground";
import { ExpenseCard } from "@/components/ExpenseCard";
import {
  SettleUpBottomSheet,
  SettleUpTarget,
} from "@/components/expenses/SettleUpBottomSheet";
import { MemberCard } from "@/components/MemberCard";
import { groups, PendingSettlement } from "@/utils/constants";
import { contacts, pendingSettlements, recentActivities } from "@/utils/data";
import { Feather } from "@expo/vector-icons";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import {
  Add01Icon,
  Delete02Icon,
  Dollar02Icon,
  Invoice03Icon,
  Logout03Icon,
  PencilEdit02Icon,
  UserAdd01Icon,
  UserGroup02Icon,
  Wallet01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useMemo, useRef, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function GroupDetails() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const snapPoints = useMemo(() => ["50%"], []);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const settleUpBottomSheetRef = useRef<BottomSheet>(null);
  const [selectedSettleTarget, setSelectedSettleTarget] =
    useState<SettleUpTarget | null>(null);

  // Find active group data by ID or fallback to first group
  const currentGroup =
    groups.find((g) => g.id === (Array.isArray(id) ? id[0] : id)) || groups[0];

  const groupMembersCount = currentGroup?.membersList?.length || 4;
  const isReceivable = currentGroup.balanceType === "receivable";
  const isSettled = currentGroup.balanceType === "settled";

  // Map contacts to add avatar URLs to pending settlements
  const extendedPendingSettlements: (PendingSettlement & {
    avatarUri?: string;
  })[] = pendingSettlements.map((item) => {
    const matchedContact = contacts.find(
      (c) => c.name.toLowerCase() === item.username.toLowerCase(),
    );
    return {
      ...item,
      avatarUri: matchedContact?.avatarUri,
    };
  });

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      {/* Header */}
      <View className="flex-row items-center justify-between px-6 mb-6">
        <TouchableOpacity
          className="bg-surface rounded-full w-12 h-12 flex items-center justify-center"
          activeOpacity={0.6}
          onPress={() => router.back()}
        >
          <Feather name="chevron-left" size={20} color="#314B5E" />
        </TouchableOpacity>
        <View className="flex-row items-center justify-center gap-2">
          <Text className="text-xl font-semibold text-primary">
            {currentGroup.name}
          </Text>
          <Image source={FlatmateIcon} className="w-5 h-5" />
        </View>
        <TouchableOpacity
          className="flex items-center justify-center rounded-full bg-surface w-12 h-12"
          activeOpacity={0.8}
          onPress={() => bottomSheetRef.current?.expand()}
        >
          <Feather name="more-horizontal" size={20} color="#314B5E" />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        {/* Details */}
        <View className="px-6 flex-1">
          {/* Group Details Hero card focusing on YOUR BALANCE */}
          <View className="relative flex-col rounded-4xl overflow-hidden p-6 mb-5 gap-4 shadow-md">
            <CardBackground />
            <View>
              <Text className="uppercase text-secondary font-semibold text-xs tracking-wider mb-1">
                Your Net Balance
              </Text>
              <Text
                className={`font-bold text-4xl ${
                  isSettled
                    ? "text-primary"
                    : isReceivable
                      ? "text-green-500"
                      : "text-red-500"
                }`}
              >
                {isSettled
                  ? "₹ 0.00"
                  : isReceivable
                    ? `+₹ ${currentGroup.amount.toLocaleString()}`
                    : `-₹ ${currentGroup.amount.toLocaleString()}`}
              </Text>
              <Text className="text-xs text-secondary font-medium mt-1">
                {isSettled
                  ? "You are all settled up in this group"
                  : isReceivable
                    ? `Overall, you get back ₹${currentGroup.amount.toLocaleString()} in this group`
                    : `Overall, you owe ₹${currentGroup.amount.toLocaleString()} in this group`}
              </Text>
            </View>

            {/* Total spent & group stats */}
            <View className="flex-row items-center justify-between border border-border rounded-3xl p-4 bg-white/95 shadow-sm">
              <View className="flex-col items-center justify-center gap-1 flex-1">
                <View className="rounded-full bg-surface w-10 h-10 flex items-center justify-center">
                  <HugeiconsIcon
                    icon={UserGroup02Icon}
                    color="#314B5E"
                    size={20}
                  />
                </View>
                <Text className="text-muted font-normal text-[11px]">
                  Members
                </Text>
                <Text className="text-primary font-semibold text-base">
                  {groupMembersCount}
                </Text>
              </View>

              {/* divider */}
              <View className="w-px bg-border h-10" />

              <View className="flex-col items-center justify-center gap-1 flex-1">
                <View className="rounded-full bg-surface w-10 h-10 flex items-center justify-center">
                  <HugeiconsIcon
                    icon={Dollar02Icon}
                    color="#314B5E"
                    size={20}
                  />
                </View>
                <Text className="text-muted font-normal text-[11px]">
                  Total Spent
                </Text>
                <Text className="text-primary font-semibold text-base">
                  ₹{currentGroup.amount.toLocaleString()}
                </Text>
              </View>

              {/* divider */}
              <View className="w-px bg-border h-10" />

              <View className="flex-col items-center justify-center gap-1 flex-1">
                <View className="rounded-full bg-surface w-10 h-10 flex items-center justify-center">
                  <HugeiconsIcon
                    icon={Invoice03Icon}
                    color="#314B5E"
                    size={20}
                  />
                </View>
                <Text className="text-muted font-normal text-[11px]">
                  Expenses
                </Text>
                <Text className="text-primary font-semibold text-base">
                  {recentActivities.length}
                </Text>
              </View>
            </View>
          </View>

          {/* Actions */}
          <View className="flex-row items-center gap-4 justify-between mb-6">
            <TouchableOpacity
              className="bg-primary rounded-3xl h-14 flex-row items-center justify-center px-4 flex-1 gap-2 shadow-sm"
              activeOpacity={0.9}
              onPress={() =>
                router.push({
                  pathname: "/[id]/add-expense",
                  params: {
                    id: currentGroup.id,
                  },
                })
              }
            >
              <HugeiconsIcon icon={Add01Icon} color="white" size={22} />
              <Text className="text-white font-semibold text-sm">
                Add Expense
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-primary rounded-3xl h-14 flex-row items-center justify-center px-5 gap-1 shadow-sm"
              activeOpacity={0.8}
            >
              <HugeiconsIcon icon={Wallet01Icon} color="white" size={22} />
            </TouchableOpacity>
          </View>

          {/* Recent Activity section */}
          <View className="mb-8">
            <View className="flex-row items-center justify-between mb-4">
              <Text className="uppercase font-semibold text-xs tracking-wider text-muted">
                Recent Activity
              </Text>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => router.push("/expense-history")}
              >
                <Text className="text-primary font-semibold text-xs">
                  View all
                </Text>
              </TouchableOpacity>
            </View>

            <View className="flex gap-3">
              {recentActivities.map((activity) => (
                <ExpenseCard
                  key={activity.id}
                  id={activity.id}
                  title={activity.title}
                  groupName={currentGroup.name}
                  amount={activity.amount}
                  balanceType={activity.balanceType}
                  paidBy={activity.paidBy}
                  timeAgo={activity.timeAgo}
                  category={activity.category}
                />
              ))}
            </View>
          </View>

          {/* Members Details section */}
          <View>
            <View className="flex-row items-center justify-between mb-4">
              <Text className="uppercase font-semibold text-xs text-muted tracking-wider">
                Member Balances ({extendedPendingSettlements.length})
              </Text>
            </View>
            <View className="flex-col gap-3">
              {extendedPendingSettlements.map((item) => (
                <MemberCard
                  key={item.id}
                  id={item.id}
                  username={item.username}
                  amount={item.amount}
                  balanceType={item.balanceType}
                  avatarUri={item.avatarUri}
                />
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
        backgroundStyle={{
          borderTopLeftRadius: 32,
          borderTopRightRadius: 32,
        }}
        handleIndicatorStyle={{
          backgroundColor: "#CBD5E1",
          width: 50,
        }}
        backdropComponent={RenderBackdrop}
      >
        <BottomSheetView className="flex-1 px-6 pb-6">
          {/* Header */}
          <View className="items-center py-3">
            <View className="w-14 h-14 rounded-full bg-surface items-center justify-center mb-2">
              <Image source={FlatmateIcon} className="w-7 h-7" />
            </View>

            <Text className="text-xl font-semibold text-primary">
              {currentGroup.name}
            </Text>

            <Text className="text-muted text-xs font-normal">
              {groupMembersCount} Members • Active Group
            </Text>
          </View>

          {/* Management */}
          <Text className="text-[11px] uppercase text-muted font-semibold mb-1 mt-2 tracking-wider">
            Group Management
          </Text>

          <ActionItem
            icon={PencilEdit02Icon}
            title="Edit Group"
            description="Update group details"
          />

          <ActionItem
            icon={UserAdd01Icon}
            title="Add Member"
            description="Invite someone to join"
            onPress={() => {
              bottomSheetRef.current?.close();
              router.push("/contact-picker");
            }}
          />

          <ActionItem
            icon={Invoice03Icon}
            title="View Expense History"
            description="See all group expenses"
            onPress={() => {
              bottomSheetRef.current?.close();
              router.push("/expense-history");
            }}
          />

          <View className="h-px bg-border my-2" />

          <Text className="text-[11px] uppercase text-muted font-semibold mb-1 tracking-wider">
            Danger Zone
          </Text>

          <ActionItem
            icon={Logout03Icon}
            title="Leave Group"
            description="Exit this group"
            danger
          />

          <ActionItem
            icon={Delete02Icon}
            title="Delete Group"
            description="Permanently remove this group"
            danger
          />
        </BottomSheetView>
      </BottomSheet>
    </SafeAreaView>
  );
}

const ActionItem = ({
  icon,
  title,
  description,
  danger = false,
  onPress,
}: {
  icon: any;
  title: string;
  description: string;
  danger?: boolean;
  onPress?: () => void;
}) => (
  <TouchableOpacity
    activeOpacity={0.8}
    onPress={onPress}
    className="flex-row items-center py-4"
  >
    <View
      className={`w-12 h-12 rounded-full items-center justify-center ${
        danger ? "bg-red-50" : "bg-surface"
      }`}
    >
      <HugeiconsIcon
        icon={icon}
        size={22}
        color={danger ? "#DC2626" : "#314B5E"}
      />
    </View>

    <View className="flex-1 ml-4">
      <Text
        className={`font-medium text-base ${
          danger ? "text-red-600" : "text-primary"
        }`}
      >
        {title}
      </Text>

      <Text className="text-muted text-sm">{description}</Text>
    </View>

    <Feather name="chevron-right" size={18} color="#94A3B8" />
  </TouchableOpacity>
);
