import { CardBackground } from "@/components/CardBackground";
import {
  Analytics01Icon,
  ArrowDownLeft01Icon,
  Car01Icon,
  Home01Icon,
  Restaurant01Icon,
  ShoppingBag01Icon,
  SparklesIcon,
  UserGroup02Icon,
  Wallet01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import * as Haptics from "expo-haptics";
import { useState } from "react";
import {
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

type Timeframe = "This Month" | "Last Month" | "All Time";

const TIMEFRAMES: Timeframe[] = ["This Month", "Last Month", "All Time"];

// Mock dataset tailored for each timeframe
const DATA_BY_TIMEFRAME = {
  "This Month": {
    totalSpent: "18,450",
    totalPaid: "24,800",
    netRecoverable: "+6,350",
    savingsPct: "12.4%",
    isSavings: true,
    weeklyBars: [
      { label: "W1", amount: 3200, heightPct: 45 },
      { label: "W2", amount: 5600, heightPct: 80 },
      { label: "W3", amount: 4100, heightPct: 60 },
      { label: "W4", amount: 5550, heightPct: 78 },
    ],
    categories: [
      {
        id: "food",
        name: "Food & Dining",
        icon: Restaurant01Icon,
        amount: "₹ 7,750",
        percentage: 42,
        color: "#10B981",
        bgLight: "rgba(16, 185, 129, 0.12)",
      },
      {
        id: "rent",
        name: "Rent & Bills",
        icon: Home01Icon,
        amount: "₹ 5,160",
        percentage: 28,
        color: "#3B82F6",
        bgLight: "rgba(59, 130, 246, 0.12)",
      },
      {
        id: "travel",
        name: "Travel & Fuel",
        icon: Car01Icon,
        amount: "₹ 3,320",
        percentage: 18,
        color: "#F59E0B",
        bgLight: "rgba(245, 158, 11, 0.12)",
      },
      {
        id: "shopping",
        name: "Groceries & Shopping",
        icon: ShoppingBag01Icon,
        amount: "₹ 2,220",
        percentage: 12,
        color: "#8B5CF6",
        bgLight: "rgba(139, 92, 246, 0.12)",
      },
    ],
    topGroup: "Goa Trip",
    topGroupAmount: "₹ 11,800",
    topGroupShare: "64%",
    topPartner: "Rahul Sharma",
    topPartnerBills: "6 splits",
    smartTip:
      "You paid for 68% of group dinners upfront this month. ₹ 3,420 has already been settled back!",
  },
  "Last Month": {
    totalSpent: "21,050",
    totalPaid: "28,300",
    netRecoverable: "+7,250",
    savingsPct: "8.2%",
    isSavings: false,
    weeklyBars: [
      { label: "W1", amount: 4800, heightPct: 68 },
      { label: "W2", amount: 6200, heightPct: 88 },
      { label: "W3", amount: 5300, heightPct: 75 },
      { label: "W4", amount: 4750, heightPct: 65 },
    ],
    categories: [
      {
        id: "food",
        name: "Food & Dining",
        icon: Restaurant01Icon,
        amount: "₹ 9,200",
        percentage: 44,
        color: "#10B981",
        bgLight: "rgba(16, 185, 129, 0.12)",
      },
      {
        id: "travel",
        name: "Travel & Fuel",
        icon: Car01Icon,
        amount: "₹ 6,100",
        percentage: 29,
        color: "#F59E0B",
        bgLight: "rgba(245, 158, 11, 0.12)",
      },
      {
        id: "rent",
        name: "Rent & Bills",
        icon: Home01Icon,
        amount: "₹ 3,850",
        percentage: 18,
        color: "#3B82F6",
        bgLight: "rgba(59, 130, 246, 0.12)",
      },
      {
        id: "shopping",
        name: "Groceries & Shopping",
        icon: ShoppingBag01Icon,
        amount: "₹ 1,900",
        percentage: 9,
        color: "#8B5CF6",
        bgLight: "rgba(139, 92, 246, 0.12)",
      },
    ],
    topGroup: "Flatmates",
    topGroupAmount: "₹ 14,200",
    topGroupShare: "67%",
    topPartner: "Priya Patel",
    topPartnerBills: "8 splits",
    smartTip:
      "Travel expenses were highest in Week 2. You settled all your pending dues within 3 days!",
  },
  "All Time": {
    totalSpent: "94,300",
    totalPaid: "128,400",
    netRecoverable: "+34,100",
    savingsPct: "15.0%",
    isSavings: true,
    weeklyBars: [
      { label: "Jan", amount: 18400, heightPct: 62 },
      { label: "Feb", amount: 22100, heightPct: 75 },
      { label: "Mar", amount: 26500, heightPct: 90 },
      { label: "Apr", amount: 27300, heightPct: 94 },
    ],
    categories: [
      {
        id: "food",
        name: "Food & Dining",
        icon: Restaurant01Icon,
        amount: "₹ 38,600",
        percentage: 41,
        color: "#10B981",
        bgLight: "rgba(16, 185, 129, 0.12)",
      },
      {
        id: "rent",
        name: "Rent & Bills",
        icon: Home01Icon,
        amount: "₹ 28,200",
        percentage: 30,
        color: "#3B82F6",
        bgLight: "rgba(59, 130, 246, 0.12)",
      },
      {
        id: "travel",
        name: "Travel & Fuel",
        icon: Car01Icon,
        amount: "₹ 16,900",
        percentage: 18,
        color: "#F59E0B",
        bgLight: "rgba(245, 158, 11, 0.12)",
      },
      {
        id: "shopping",
        name: "Groceries & Shopping",
        icon: ShoppingBag01Icon,
        amount: "₹ 10,600",
        percentage: 11,
        color: "#8B5CF6",
        bgLight: "rgba(139, 92, 246, 0.12)",
      },
    ],
    topGroup: "Flatmates",
    topGroupAmount: "₹ 52,400",
    topGroupShare: "55%",
    topPartner: "Rahul Sharma",
    topPartnerBills: "24 splits",
    smartTip:
      "You have maintained an exceptional 98% on-time settlement score across all 4 groups!",
  },
};

export default function InsightsScreen() {
  const [selectedTimeframe, setSelectedTimeframe] =
    useState<Timeframe>("This Month");
  const [selectedBarIndex, setSelectedBarIndex] = useState<number>(3); // default highlight last bar

  const currentData = DATA_BY_TIMEFRAME[selectedTimeframe];

  const handleSelectTimeframe = (tf: Timeframe) => {
    Haptics.selectionAsync();
    setSelectedTimeframe(tf);
  };

  const handleSelectBar = (index: number) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedBarIndex(index);
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 12,
          paddingBottom: 120, // Extra breathing room for floating tab dock
        }}
      >
        {/* ── Header ──────────────────────────────────────────────────────── */}
        <Animated.View
          entering={FadeInDown.duration(400)}
          className="flex-row items-center justify-between mb-5"
        >
          <View>
            <Text className="text-3xl font-bold text-primary tracking-tight">
              Insights
            </Text>
            <Text className="text-muted font-normal text-xs tracking-wide mt-0.5">
              Spending habits & group split dynamics
            </Text>
          </View>

          <View className="bg-surface h-11 w-11 rounded-full items-center justify-center border border-white shadow-xs">
            <HugeiconsIcon
              icon={Analytics01Icon}
              size={22}
              color="#294355"
              strokeWidth={1.8}
            />
          </View>
        </Animated.View>

        {/* ── Timeframe Filter Segmented Control ──────────────────────────── */}
        <Animated.View
          entering={FadeInDown.delay(80).duration(400)}
          className="flex-row items-center bg-surface p-1 rounded-2xl mb-5 border border-border/60"
        >
          {TIMEFRAMES.map((tf) => {
            const isSelected = selectedTimeframe === tf;
            return (
              <TouchableOpacity
                key={tf}
                onPress={() => handleSelectTimeframe(tf)}
                className={`flex-1 py-2.5 rounded-xl items-center justify-center transition-all ${
                  isSelected ? "bg-primary shadow-xs" : "bg-transparent"
                }`}
                activeOpacity={0.8}
              >
                <Text
                  className={`text-xs font-semibold ${
                    isSelected ? "text-white" : "text-muted"
                  }`}
                >
                  {tf}
                </Text>
              </TouchableOpacity>
            );
          })}
        </Animated.View>

        {/* ── Hero Split & Spending Card ──────────────────────────────────── */}
        <Animated.View
          entering={FadeInDown.delay(160).duration(500)}
          className="relative rounded-[32px] overflow-hidden p-6 mb-5 shadow-md"
        >
          <CardBackground />

          <View className="flex-row items-center justify-between mb-1">
            <Text className="uppercase text-secondary text-xs font-semibold tracking-wider">
              Your Net Share
            </Text>
            <View className="flex-row items-center gap-1 bg-emerald-500/20 px-2.5 py-1 rounded-full border border-emerald-400/30">
              <HugeiconsIcon
                icon={ArrowDownLeft01Icon}
                size={12}
                color="#34D399"
                strokeWidth={2.2}
              />
              <Text className="text-[11px] font-bold text-emerald-300">
                {currentData.savingsPct} vs prev
              </Text>
            </View>
          </View>

          <Text className="text-foreground text-4xl font-bold uppercase mb-4">
            ₹ {currentData.totalSpent}
          </Text>

          {/* Metric Pill Grid */}
          <View className="flex-row items-center gap-3">
            <View className="flex-1 bg-white/10 p-3 rounded-2xl border border-white/10">
              <Text className="text-secondary text-[11px] font-medium mb-0.5">
                Total Paid by You
              </Text>
              <Text className="text-white text-base font-bold">
                ₹ {currentData.totalPaid}
              </Text>
            </View>

            <View className="flex-1 bg-emerald-950/30 p-3 rounded-2xl border border-emerald-500/25">
              <Text className="text-emerald-300 text-[11px] font-medium mb-0.5">
                Net to Receive
              </Text>
              <Text className="text-emerald-400 text-base font-bold">
                ₹ {currentData.netRecoverable}
              </Text>
            </View>
          </View>
        </Animated.View>

        {/* ── Weekly Spending Velocity Chart ──────────────────────────────── */}
        <Animated.View
          entering={FadeInDown.delay(240).duration(500)}
          className="bg-white rounded-[28px] p-5 mb-5 border border-border shadow-xs"
        >
          <View className="flex-row items-center justify-between mb-4">
            <View>
              <Text className="text-base font-bold text-primary">
                Spending Velocity
              </Text>
              <Text className="text-xs text-muted font-normal mt-0.5">
                Your split share over time
              </Text>
            </View>

            <View className="bg-surface px-3 py-1.5 rounded-full border border-border">
              <Text className="text-xs font-semibold text-primary">
                ₹ {currentData.weeklyBars[selectedBarIndex]?.amount || 0}
              </Text>
            </View>
          </View>

          {/* Interactive Bar Chart */}
          <View className="flex-row items-end justify-between h-36 pt-4 pb-1 px-3">
            {currentData.weeklyBars.map((bar, index) => {
              const isSelected = selectedBarIndex === index;
              return (
                <Pressable
                  key={bar.label}
                  onPress={() => handleSelectBar(index)}
                  className="items-center flex-1"
                >
                  {/* Selected Tooltip */}
                  {isSelected && (
                    <View className="bg-primary px-2 py-0.5 rounded-md mb-1.5">
                      <Text className="text-[10px] text-white font-bold">
                        ₹ {bar.amount}
                      </Text>
                    </View>
                  )}

                  {/* Bar Background Track */}
                  <View className="w-8 h-24 bg-surface rounded-xl items-center justify-end overflow-hidden">
                    <View
                      style={{
                        height: `${bar.heightPct}%`,
                        backgroundColor: isSelected ? "#294355" : "#65747F",
                        width: "100%",
                        borderRadius: 8,
                      }}
                    />
                  </View>

                  <Text
                    className={`text-xs mt-2 font-medium ${
                      isSelected ? "text-primary font-bold" : "text-muted"
                    }`}
                  >
                    {bar.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </Animated.View>

        {/* ── Category Breakdown ──────────────────────────────────────────── */}
        <Animated.View
          entering={FadeInDown.delay(320).duration(500)}
          className="bg-white rounded-[28px] p-5 mb-5 border border-border shadow-xs"
        >
          <View className="flex-row items-center justify-between mb-4">
            <View>
              <Text className="text-base font-bold text-primary">
                Category Breakdown
              </Text>
              <Text className="text-xs text-muted font-normal mt-0.5">
                Where your shared money goes
              </Text>
            </View>

            <Text className="text-xs font-semibold text-muted">
              {currentData.categories.length} categories
            </Text>
          </View>

          <View className="gap-3.5">
            {currentData.categories.map((cat) => (
              <View key={cat.id} className="gap-1.5">
                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center gap-2.5">
                    <View
                      style={{ backgroundColor: cat.bgLight }}
                      className="w-8 h-8 rounded-xl items-center justify-center"
                    >
                      <HugeiconsIcon
                        icon={cat.icon}
                        size={16}
                        color={cat.color}
                        strokeWidth={2}
                      />
                    </View>
                    <Text className="text-xs font-semibold text-primary">
                      {cat.name}
                    </Text>
                  </View>

                  <View className="flex-row items-center gap-2">
                    <Text className="text-xs font-bold text-primary">
                      {cat.amount}
                    </Text>
                    <Text className="text-[11px] font-semibold text-muted">
                      ({cat.percentage}%)
                    </Text>
                  </View>
                </View>

                {/* Animated Progress Bar Track */}
                <View className="h-2 bg-surface rounded-full overflow-hidden w-full">
                  <View
                    style={{
                      width: `${cat.percentage}%`,
                      backgroundColor: cat.color,
                      height: "100%",
                      borderRadius: 999,
                    }}
                  />
                </View>
              </View>
            ))}
          </View>
        </Animated.View>

        {/* ── Social & Group Split Stats (2 Column Grid) ─────────────────── */}
        <Animated.View
          entering={FadeInDown.delay(400).duration(500)}
          className="flex-row items-center gap-3 mb-5"
        >
          {/* Top Group Card */}
          <View className="flex-1 bg-white p-4 rounded-3xl border border-border shadow-xs">
            <View className="flex-row items-center justify-between mb-2">
              <View className="w-8 h-8 rounded-xl bg-blue-50 items-center justify-center">
                <HugeiconsIcon
                  icon={UserGroup02Icon}
                  size={16}
                  color="#2563EB"
                  strokeWidth={2}
                />
              </View>
              <Text className="text-[11px] font-bold text-blue-600">
                {currentData.topGroupShare}
              </Text>
            </View>
            <Text className="text-[11px] font-semibold text-muted uppercase tracking-wider">
              Top Group
            </Text>
            <Text className="text-sm font-bold text-primary mt-0.5" numberOfLines={1}>
              {currentData.topGroup}
            </Text>
            <Text className="text-xs font-medium text-muted mt-0.5">
              {currentData.topGroupAmount} total
            </Text>
          </View>

          {/* Top Split Partner */}
          <View className="flex-1 bg-white p-4 rounded-3xl border border-border shadow-xs">
            <View className="flex-row items-center justify-between mb-2">
              <View className="w-8 h-8 rounded-xl bg-emerald-50 items-center justify-center">
                <HugeiconsIcon
                  icon={Wallet01Icon}
                  size={16}
                  color="#059669"
                  strokeWidth={2}
                />
              </View>
              <Text className="text-[11px] font-bold text-emerald-600">
                Top Ally
              </Text>
            </View>
            <Text className="text-[11px] font-semibold text-muted uppercase tracking-wider">
              Top Partner
            </Text>
            <Text className="text-sm font-bold text-primary mt-0.5" numberOfLines={1}>
              {currentData.topPartner}
            </Text>
            <Text className="text-xs font-medium text-muted mt-0.5">
              {currentData.topPartnerBills} shared
            </Text>
          </View>
        </Animated.View>

        {/* ── Smart SplitBro Tip ──────────────────────────────────────────── */}
        <Animated.View
          entering={FadeInDown.delay(480).duration(500)}
          className="bg-[#162530] p-4 rounded-3xl border border-white/10 flex-row items-center gap-3.5 shadow-sm"
        >
          <View className="w-10 h-10 rounded-2xl bg-amber-400/20 items-center justify-center border border-amber-400/30 flex-shrink-0">
            <HugeiconsIcon
              icon={SparklesIcon}
              size={20}
              color="#FBBF24"
              strokeWidth={2}
            />
          </View>
          <View className="flex-1 pr-2">
            <Text className="text-xs font-bold text-amber-300">
              SplitBro Smart Tip
            </Text>
            <Text className="text-[11px] text-secondary font-normal mt-0.5 leading-4">
              {currentData.smartTip}
            </Text>
          </View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}
