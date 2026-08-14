import UserAvatar from "@/assets/images/avatar.png";
import { CardBackground } from "@/components/CardBackground";
import { ExpenseCard } from "@/components/ExpenseCard";
import { GroupCard } from "@/components/GroupCard";
import { MemberCard } from "@/components/MemberCard";
import { useModalStore } from "@/store/useModalStore";
import { groups, PendingSettlement } from "@/utils/constants";
import { contacts, pendingSettlements, recentActivities } from "@/utils/data";
import {
  Add01Icon,
  ArrowDownLeft01Icon,
  ArrowRight01Icon,
  ArrowUpRight01Icon,
  Notification01Icon,
  UserGroup02Icon,
  Wallet01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { useRouter } from "expo-router";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const router = useRouter();
  const openAddExpense = useModalStore((state) => state.openAddExpense);

  const handleOpenGroupSelect = () => {
    openAddExpense();
  };

  // Map contacts to add avatar URLs to pending settlements
  const extendedPendingSettlements: (PendingSettlement & { avatarUri?: string })[] =
    pendingSettlements.map((item) => {
      const matchedContact = contacts.find(
        (c) => c.name.toLowerCase() === item.username.toLowerCase()
      );
      return {
        ...item,
        avatarUri: matchedContact?.avatarUri,
      };
    });

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          padding: 20,
          paddingBottom: 100,
        }}
      >
        {/* Header */}
        <View className="flex-row h-14 items-center justify-between mb-5">
          <View className="flex-row items-center gap-3">
            <View className="bg-surface border border-white rounded-full h-12 w-12 items-center justify-center shadow-xs">
              <Image
                source={UserAvatar}
                className="w-9 h-9"
                resizeMode="contain"
              />
            </View>
            <View className="flex flex-col">
              <Text className="font-bold text-primary text-base leading-5">
                Welcome back!
              </Text>
              <Text className="text-xs font-normal text-muted">Mohammad</Text>
            </View>
          </View>
          <View className="bg-surface flex items-center justify-center h-11 w-11 rounded-full border border-white relative shadow-xs">
            <HugeiconsIcon
              icon={Notification01Icon}
              size={20}
              color="#223543"
              strokeWidth={1.5}
            />
            <View className="absolute bg-red-500 h-2.5 w-2.5 rounded-full border border-white top-2 right-2" />
          </View>
        </View>

        {/* Hero Card */}
        <View className="relative flex-col gap-4 rounded-[32px] overflow-hidden p-6 mb-5 shadow-md">
          <CardBackground />
          <View className="flex-col justify-between gap-1">
            <Text className="uppercase text-secondary text-xs font-semibold tracking-wider">
              Net Balance
            </Text>
            <Text className="uppercase text-foreground text-4xl font-bold">
              +₹ 1,960
            </Text>
            <Text className="text-secondary text-xs font-medium mt-0.5">
              Across 4 active groups
            </Text>
          </View>

          {/* Color-Coded Balance Breakdown */}
          <View className="flex-row items-center justify-between gap-3">
            <View className="flex-1 gap-1.5 bg-emerald-950/20 p-3.5 rounded-2xl border border-emerald-500/20">
              <View className="flex-row gap-1.5 items-center justify-start">
                <View className="w-5 h-5 rounded-full bg-emerald-500/20 items-center justify-center">
                  <HugeiconsIcon
                    icon={ArrowDownLeft01Icon}
                    size={12}
                    color="#10B981"
                    strokeWidth={3}
                  />
                </View>
                <Text className="text-xs text-emerald-400 font-semibold">
                  To Receive
                </Text>
              </View>
              <Text className="text-foreground font-bold text-xl">
                ₹3,420
              </Text>
            </View>

            <View className="flex-1 gap-1.5 bg-rose-950/20 p-3.5 rounded-2xl border border-rose-500/20">
              <View className="flex-row gap-1.5 items-center justify-start">
                <View className="w-5 h-5 rounded-full bg-rose-500/20 items-center justify-center">
                  <HugeiconsIcon
                    icon={ArrowUpRight01Icon}
                    size={12}
                    color="#F43F5E"
                    strokeWidth={3}
                  />
                </View>
                <Text className="text-xs text-rose-400 font-semibold">
                  To Pay
                </Text>
              </View>
              <Text className="text-foreground font-bold text-xl">
                ₹1,460
              </Text>
            </View>
          </View>

          <TouchableOpacity
            className="bg-white/95 flex-row items-center justify-center rounded-2xl h-12 gap-2 shadow-xs"
            activeOpacity={0.85}
            onPress={() => router.push("/(tabs)/groups/expense-history")}
          >
            <Text className="text-primary font-semibold text-sm">
              View All Settlements
            </Text>
            <HugeiconsIcon
              icon={ArrowRight01Icon}
              size={16}
              color="#223543"
              strokeWidth={2.5}
            />
          </TouchableOpacity>
        </View>

        {/* Sleek 3-Button Quick Actions Bar */}
        <View className="flex-row items-center justify-between gap-3 mb-6">
          <TouchableOpacity
            className="bg-primary p-3.5 flex-1 flex-row items-center justify-center gap-2 rounded-2xl shadow-sm"
            activeOpacity={0.85}
            onPress={handleOpenGroupSelect}
          >
            <HugeiconsIcon
              icon={Add01Icon}
              size={18}
              color="white"
              strokeWidth={2}
            />
            <Text className="text-white font-semibold text-xs">
              Add Expense
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-white border border-border p-3.5 flex-1 flex-row items-center justify-center gap-2 rounded-2xl shadow-xs"
            activeOpacity={0.85}
            onPress={() => router.push("/(tabs)/groups/expense-history")}
          >
            <HugeiconsIcon
              icon={Wallet01Icon}
              size={18}
              color="#223543"
              strokeWidth={1.5}
            />
            <Text className="text-primary font-medium text-xs">
              Settle Up
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-white border border-border p-3.5 flex-1 flex-row items-center justify-center gap-2 rounded-2xl shadow-xs"
            activeOpacity={0.85}
            onPress={() => router.push("/(groups)/create")}
          >
            <HugeiconsIcon
              icon={UserGroup02Icon}
              size={18}
              color="#223543"
              strokeWidth={1.5}
            />
            <Text className="text-primary font-medium text-xs">
              New Group
            </Text>
          </TouchableOpacity>
        </View>

        {/* Group Section (Horizontal Carousel with fixed width cards) */}
        <View className="mb-6">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="uppercase font-semibold text-xs tracking-wider text-muted">
              Your Groups
            </Text>
            <TouchableOpacity onPress={() => router.push("/(tabs)/group")}>
              <Text className="text-primary font-semibold text-xs">See all</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            horizontal
            contentContainerStyle={{
              gap: 12,
              paddingRight: 10,
            }}
          >
            {groups.map((group) => (
              <View key={group.id} className="w-[285px]">
                <GroupCard group={group} />
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Recent Activity section */}
        <View className="mb-6">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="uppercase font-semibold text-xs tracking-wider text-muted">
              Recent Activity
            </Text>
            <TouchableOpacity onPress={() => router.push("/(tabs)/groups/expense-history")}>
              <Text className="text-primary font-semibold text-xs">View all</Text>
            </TouchableOpacity>
          </View>

          <View className="flex gap-2.5">
            {recentActivities.slice(0, 4).map((activity) => (
              <ExpenseCard
                key={activity.id}
                id={activity.id}
                title={activity.title}
                groupName={activity.groupName}
                amount={activity.amount}
                balanceType={activity.balanceType}
                paidBy={activity.paidBy}
                timeAgo={activity.timeAgo}
                category={activity.category}
              />
            ))}
          </View>
        </View>

        {/* Pending Settlements */}
        <View>
          <View className="flex-row items-center justify-between mb-3">
            <Text className="uppercase font-semibold text-xs text-muted tracking-wider">
              Pending Settlements ({extendedPendingSettlements.length})
            </Text>
          </View>
          <View className="flex-col gap-2.5">
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
      </ScrollView>
    </SafeAreaView>
  );
}
