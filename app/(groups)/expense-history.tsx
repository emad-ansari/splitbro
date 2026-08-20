import { ExpenseCard } from "@/components/ExpenseCard";
import { RenderBackdrop } from "@/components/BottomSheetRenderBackdrop";
import {
  Activity,
  getActivityIcon,
} from "@/utils/constants";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import {
  ArrowLeft01Icon,
  Cancel01Icon,
  CheckmarkCircle02Icon,
  Download01Icon,
  Invoice03Icon,
  Search01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import { useMemo, useRef, useState } from "react";
import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

// Sample dataset with exact date strings for date-wise grouping
const FULL_LEDGER: (Activity & {
  date: string;
  time: string;
  splitWith: { name: string; share: number; avatarBg: string }[];
})[] = [
  {
    id: "1",
    title: "Dinner at Toit",
    groupName: "Goa Trip",
    paidBy: "you",
    amount: 540,
    balanceType: "receivable",
    timeAgo: "2h",
    category: "Food",
    date: "14 Aug 2024",
    time: "8:30 PM",
    splitWith: [
      { name: "You (Mohammad)", share: 135, avatarBg: "#10B981" },
      { name: "Rahul Sharma", share: 135, avatarBg: "#3B82F6" },
      { name: "Priya Patel", share: 135, avatarBg: "#F59E0B" },
      { name: "Aman Gupta", share: 135, avatarBg: "#8B5CF6" },
    ],
  },
  {
    id: "settle-1",
    title: "Settlement from Rahul",
    groupName: "Goa Trip",
    paidBy: "Rahul",
    amount: 350,
    balanceType: "settled",
    timeAgo: "4h",
    category: "Settlement",
    date: "14 Aug 2024",
    time: "6:15 PM",
    splitWith: [
      { name: "Rahul Sharma", share: 350, avatarBg: "#3B82F6" },
      { name: "You (Mohammad)", share: 350, avatarBg: "#10B981" },
    ],
  },
  {
    id: "2",
    title: "Uber to Airport",
    groupName: "Goa Trip",
    paidBy: "Rahul",
    amount: 180,
    balanceType: "payable",
    timeAgo: "1d",
    category: "Travel",
    date: "13 Aug 2024",
    time: "10:00 AM",
    splitWith: [
      { name: "Rahul Sharma", share: 60, avatarBg: "#3B82F6" },
      { name: "You (Mohammad)", share: 60, avatarBg: "#10B981" },
      { name: "Priya Patel", share: 60, avatarBg: "#F59E0B" },
    ],
  },
  {
    id: "3",
    title: "Weekly Groceries & Snacks",
    groupName: "Flatmates",
    paidBy: "you",
    amount: 820,
    balanceType: "receivable",
    timeAgo: "2d",
    category: "Grocery",
    date: "12 Aug 2024",
    time: "7:45 PM",
    splitWith: [
      { name: "You (Mohammad)", share: 205, avatarBg: "#10B981" },
      { name: "Sneha Roy", share: 205, avatarBg: "#EC4899" },
      { name: "Aman Gupta", share: 205, avatarBg: "#8B5CF6" },
      { name: "Rohan Verma", share: 205, avatarBg: "#14B8A6" },
    ],
  },
  {
    id: "4",
    title: "High-Speed WiFi & Power",
    groupName: "Flatmates",
    paidBy: "Sneha",
    amount: 420,
    balanceType: "payable",
    timeAgo: "3d",
    category: "Utility",
    date: "11 Aug 2024",
    time: "11:30 AM",
    splitWith: [
      { name: "Sneha Roy", share: 140, avatarBg: "#EC4899" },
      { name: "You (Mohammad)", share: 140, avatarBg: "#10B981" },
      { name: "Aman Gupta", share: 140, avatarBg: "#8B5CF6" },
    ],
  },
  {
    id: "5",
    title: "IMAX Movie Night",
    groupName: "Friends",
    paidBy: "Aman",
    amount: 250,
    balanceType: "payable",
    timeAgo: "5d",
    category: "Entertainment",
    date: "09 Aug 2024",
    time: "9:00 PM",
    splitWith: [
      { name: "Aman Gupta", share: 125, avatarBg: "#8B5CF6" },
      { name: "You (Mohammad)", share: 125, avatarBg: "#10B981" },
    ],
  },
  {
    id: "6",
    title: "Late Night Woodfired Pizza",
    groupName: "Friends",
    paidBy: "you",
    amount: 360,
    balanceType: "receivable",
    timeAgo: "1w",
    category: "Food",
    date: "06 Aug 2024",
    time: "11:15 PM",
    splitWith: [
      { name: "You (Mohammad)", share: 120, avatarBg: "#10B981" },
      { name: "Rahul Sharma", share: 120, avatarBg: "#3B82F6" },
      { name: "Aman Gupta", share: 120, avatarBg: "#8B5CF6" },
    ],
  },
];

const FILTERS = [
  "All",
  "You Paid",
  "Others Paid",
  "Settlements",
  "Food",
  "Travel",
  "Grocery",
];

export default function ExpenseHistoryScreen() {
  const router = useRouter();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["50%"], []);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [selectedExpense, setSelectedExpense] = useState<
    (typeof FULL_LEDGER)[0] | null
  >(null);

  // Filter & Search Logic
  const filteredLedger = useMemo(() => {
    return FULL_LEDGER.filter((item) => {
      // 1. Search Query Filter
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        q === "" ||
        item.title.toLowerCase().includes(q) ||
        item.groupName.toLowerCase().includes(q) ||
        item.paidBy.toLowerCase().includes(q) ||
        item.amount.toString().includes(q);

      // 2. Category / Status Filter
      let matchesFilter = true;
      if (selectedFilter === "You Paid") {
        matchesFilter = item.paidBy.toLowerCase() === "you";
      } else if (selectedFilter === "Others Paid") {
        matchesFilter = item.paidBy.toLowerCase() !== "you";
      } else if (selectedFilter === "Settlements") {
        matchesFilter =
          item.balanceType === "settled" || item.category === "Settlement";
      } else if (selectedFilter !== "All") {
        matchesFilter = item.category === selectedFilter;
      }

      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, selectedFilter]);

  // Group by chronological Calendar Dates (e.g. "14 Aug 2024", "13 Aug 2024", etc.)
  const groupedSections = useMemo(() => {
    const groups: { [date: string]: typeof FULL_LEDGER } = {};

    filteredLedger.forEach((item) => {
      if (!groups[item.date]) {
        groups[item.date] = [];
      }
      groups[item.date].push(item);
    });

    return Object.entries(groups);
  }, [filteredLedger]);

  // Total summary of current view
  const summaryStats = useMemo(() => {
    let totalSpent = 0;
    let receivable = 0;
    let payable = 0;

    filteredLedger.forEach((item) => {
      totalSpent += item.amount;
      if (item.balanceType === "receivable") receivable += item.amount;
      if (item.balanceType === "payable") payable += item.amount;
    });

    return { totalSpent, receivable, payable };
  }, [filteredLedger]);

  const handleFilterSelect = (filter: string) => {
    Haptics.selectionAsync();
    setSelectedFilter(filter);
  };

  const handleOpenDetail = (expense: (typeof FULL_LEDGER)[0]) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedExpense(expense);
    bottomSheetRef.current?.expand();
  };

  const handleExport = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Alert.alert(
      "Export Ledger",
      `Exporting ${filteredLedger.length} transaction records as CSV/PDF report.`,
      [{ text: "Download Report", onPress: () => {} }, { text: "Cancel", style: "cancel" }]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      {/* ── Top Header ─────────────────────────────────────────────────────── */}
      <View className="px-5 pt-2 pb-3 bg-background border-b border-border/40">
        <View className="flex-row items-center justify-between mb-4">
          <View className="flex-row items-center gap-3">
            <TouchableOpacity
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                router.back();
              }}
              className="w-10 h-10 rounded-full bg-surface items-center justify-center border border-white shadow-xs"
              activeOpacity={0.8}
            >
              <HugeiconsIcon
                icon={ArrowLeft01Icon}
                size={20}
                color="#294355"
                strokeWidth={2}
              />
            </TouchableOpacity>

            <View>
              <Text className="text-2xl font-bold text-primary tracking-tight">
                Expense History
              </Text>
              <Text className="text-muted text-xs font-normal">
                Complete shared ledger & logs
              </Text>
            </View>
          </View>

          <TouchableOpacity
            onPress={handleExport}
            className="w-10 h-10 rounded-full bg-surface items-center justify-center border border-white shadow-xs"
            activeOpacity={0.8}
          >
            <HugeiconsIcon
              icon={Download01Icon}
              size={18}
              color="#294355"
              strokeWidth={1.8}
            />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View className="flex-row items-center bg-white px-4 py-2.5 rounded-2xl border border-border mb-3 shadow-xs">
          <HugeiconsIcon
            icon={Search01Icon}
            size={18}
            color="#65747F"
            strokeWidth={2}
          />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search by title, group, person, or ₹"
            placeholderTextColor="#94A3B8"
            className="flex-1 ml-2.5 text-xs text-primary font-medium p-0"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <HugeiconsIcon
                icon={Cancel01Icon}
                size={16}
                color="#65747F"
                strokeWidth={2}
              />
            </TouchableOpacity>
          )}
        </View>

        {/* Filter Horizontal Scroll */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 8 }}
        >
          {FILTERS.map((filter) => {
            const isSelected = selectedFilter === filter;
            return (
              <TouchableOpacity
                key={filter}
                onPress={() => handleFilterSelect(filter)}
                className={`px-3.5 py-1.5 rounded-full border transition-all ${
                  isSelected
                    ? "bg-primary border-primary"
                    : "bg-white border-border"
                }`}
                activeOpacity={0.8}
              >
                <Text
                  className={`text-xs font-medium ${
                    isSelected ? "text-white font-semibold" : "text-muted"
                  }`}
                >
                  {filter}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* ── Ledger Stream ──────────────────────────────────────────────────── */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 16,
          paddingBottom: 40,
        }}
      >
        {/* Ledger Balance Quick Summary */}
        <Animated.View
          entering={FadeInDown.duration(400)}
          className="bg-[#162530] p-4 rounded-3xl mb-5 flex-row items-center justify-between border border-white/10 shadow-sm"
        >
          <View>
            <Text className="text-[11px] font-semibold text-secondary uppercase tracking-wider">
              Total in View
            </Text>
            <Text className="text-xl font-bold text-white mt-0.5">
              ₹ {summaryStats.totalSpent}
            </Text>
          </View>

          <View className="flex-row items-center gap-2">
            <View className="bg-emerald-500/20 px-2.5 py-1 rounded-xl border border-emerald-500/30">
              <Text className="text-[11px] font-bold text-emerald-300">
                +₹{summaryStats.receivable} back
              </Text>
            </View>
            <View className="bg-red-500/20 px-2.5 py-1 rounded-xl border border-red-500/30">
              <Text className="text-[11px] font-bold text-red-300">
                -₹{summaryStats.payable} owed
              </Text>
            </View>
          </View>
        </Animated.View>

        {/* Chronological Date-wise Groups */}
        {groupedSections.length > 0 ? (
          groupedSections.map(([dateTitle, items], sectionIndex) => (
            <Animated.View
              key={dateTitle}
              entering={FadeInDown.delay(sectionIndex * 60).duration(350)}
              className="mb-5"
            >
              {/* Date Header */}
              <View className="flex-row items-center justify-between mb-3 px-1">
                <Text className="text-xs font-bold text-muted uppercase tracking-wider">
                  {dateTitle}
                </Text>
                <Text className="text-[11px] font-medium text-muted">
                  {items.length} {items.length === 1 ? "transaction" : "transactions"}
                </Text>
              </View>

              {/* Items in Section using shared ExpenseCard */}
              <View className="gap-2.5">
                {items.map((item) => (
                  <ExpenseCard
                    key={item.id}
                    {...item}
                    onPress={() => handleOpenDetail(item)}
                  />
                ))}
              </View>
            </Animated.View>
          ))
        ) : (
          /* Empty / No Matches State */
          <View className="items-center justify-center py-20 px-6">
            <View className="w-16 h-16 rounded-full bg-surface items-center justify-center mb-3">
              <HugeiconsIcon
                icon={Invoice03Icon}
                size={28}
                color="#65747F"
                strokeWidth={1.5}
              />
            </View>
            <Text className="text-base font-bold text-primary text-center">
              No Transactions Found
            </Text>
            <Text className="text-xs text-muted text-center mt-1 max-w-[260px]">
              No expenses or settlements match your current search or filter.
            </Text>
            <TouchableOpacity
              onPress={() => {
                setSearchQuery("");
                setSelectedFilter("All");
              }}
              className="mt-4 bg-primary px-4 py-2 rounded-xl"
            >
              <Text className="text-xs font-semibold text-white">
                Reset Filters
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* ── Clean & Minimal Expense Split Breakdown Bottom Sheet ───────────────── */}
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        enablePanDownToClose
        snapPoints={snapPoints}
        backdropComponent={RenderBackdrop}
        backgroundStyle={{
          borderTopLeftRadius: 32,
          borderTopRightRadius: 32,
          backgroundColor: "#FFFFFF",
        }}
        handleIndicatorStyle={{
          backgroundColor: "#CBD5E1",
          width: 50,
        }}
      >
        <BottomSheetView className="px-6 pt-3 pb-8">
          {selectedExpense && (
            <View>
              {/* Header Info */}
              <View className="flex-row items-center justify-between mb-4 pb-3 border-b border-border/40">
                <View className="flex-row items-center gap-3">
                  <View className="w-11 h-11 rounded-2xl bg-surface items-center justify-center">
                    <HugeiconsIcon
                      icon={
                        selectedExpense.category === "Settlement"
                          ? CheckmarkCircle02Icon
                          : getActivityIcon[
                              selectedExpense.category as keyof typeof getActivityIcon
                            ] || Invoice03Icon
                      }
                      size={20}
                      color="#294355"
                      strokeWidth={2}
                    />
                  </View>
                  <View>
                    <Text className="text-base font-bold text-primary">
                      {selectedExpense.title}
                    </Text>
                    <Text className="text-xs text-muted">
                      {selectedExpense.groupName} • {selectedExpense.date}, {selectedExpense.time}
                    </Text>
                  </View>
                </View>

                <View className="items-end">
                  <Text className="text-lg font-bold text-primary">
                    ₹{selectedExpense.amount}
                  </Text>
                  <Text className="text-[11px] text-muted">
                    Paid by {selectedExpense.paidBy}
                  </Text>
                </View>
              </View>

              {/* Clean Split Distribution Breakdown */}
              <Text className="text-xs font-bold text-muted uppercase tracking-wider mb-2.5">
                Split Breakdown ({selectedExpense.splitWith.length} members)
              </Text>

              <View className="bg-surface/50 rounded-2xl p-3 border border-border gap-2.5">
                {selectedExpense.splitWith.map((member) => (
                  <View
                    key={member.name}
                    className="flex-row items-center justify-between py-1 border-b border-border/40 last:border-0"
                  >
                    <View className="flex-row items-center gap-2.5">
                      <View
                        style={{ backgroundColor: member.avatarBg }}
                        className="w-7 h-7 rounded-full items-center justify-center"
                      >
                        <Text className="text-[11px] font-bold text-white">
                          {member.name.charAt(0)}
                        </Text>
                      </View>
                      <Text className="text-xs font-semibold text-primary">
                        {member.name}
                      </Text>
                    </View>

                    <Text className="text-xs font-bold text-primary font-mono">
                      ₹ {member.share}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          )}
        </BottomSheetView>
      </BottomSheet>
    </SafeAreaView>
  );
}
