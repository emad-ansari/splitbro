import EmptyListIcon from "@/assets/icons/empty-folder.png";
import { GroupCard } from "@/components/GroupCard";
import { Group, groupFilterBadges, groups } from "@/utils/constants";
import { Add01Icon, Cancel01Icon, Search01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function GroupsScreen() {
  const [currentFilter, setCurrentFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredGroups = useMemo(() => {
    return groups.filter((group) => {
      // 1. Search Query filter (matches group name or category)
      const matchesSearch =
        searchQuery.trim() === "" ||
        group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        group.category.toLowerCase().includes(searchQuery.toLowerCase());

      // 2. Status Badge filter
      let matchesFilter = true;
      if (currentFilter === "You owe") {
        matchesFilter = group.balanceType === "payable";
      } else if (currentFilter === "Owes you") {
        matchesFilter = group.balanceType === "receivable";
      } else if (currentFilter === "Settled") {
        matchesFilter = group.balanceType === "settled";
      }

      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, currentFilter]);

  return (
    <SafeAreaView className="flex-1 bg-background px-5 pt-3" edges={["top"]}>
      {/* Header */}
      <View className="mb-4">
        <View className="flex-row items-center justify-between mb-4">
          <View>
            <Text className="text-3xl font-bold text-primary tracking-tight">
              Groups
            </Text>
            <Text className="text-muted font-normal text-xs tracking-wide mt-0.5">
              Manage shared expenses & balances
            </Text>
          </View>

          <TouchableOpacity
            className="flex-row items-center justify-center bg-primary w-12 h-12 rounded-full shadow-sm"
            activeOpacity={0.85}
            onPress={() => router.push("/(groups)/create")}
          >
            <HugeiconsIcon
              icon={Add01Icon}
              color="white"
              size={22}
              strokeWidth={2}
            />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View className="flex-row items-center bg-white border border-border rounded-full px-3.5 h-12 mb-3.5 gap-2 shadow-xs">
          <HugeiconsIcon icon={Search01Icon} size={18} color="#65747F" />
          <TextInput
            className="flex-1 text-sm text-primary font-normal h-full"
            placeholder="Search groups by name or category..."
            placeholderTextColor="#94A3B8"
            value={searchQuery}
            onChangeText={setSearchQuery}
            returnKeyType="search"
            clearButtonMode="while-editing"
          />
          {searchQuery !== "" && (
            <TouchableOpacity onPress={() => setSearchQuery("")} activeOpacity={0.7}>
              <HugeiconsIcon icon={Cancel01Icon} size={16} color="#65747F" />
            </TouchableOpacity>
          )}
        </View>

        {/* Compact Horizontal Filter Chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 8, paddingRight: 10 }}
          className="flex-grow-0"
        >
          {groupFilterBadges.map((badge) => {
            const isActive = currentFilter === badge;
            return (
              <TouchableOpacity
                key={badge}
                className={`rounded-full px-4 py-2 border transition-all ${
                  isActive
                    ? "bg-primary border-primary"
                    : "bg-white border-border"
                }`}
                activeOpacity={0.8}
                onPress={() => setCurrentFilter(badge)}
              >
                <Text
                  className={`text-xs font-medium ${
                    isActive ? "text-white" : "text-primary"
                  }`}
                >
                  {badge}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Group List Header */}
      <View className="flex-row items-center justify-between mb-3 px-1">
        <Text className="uppercase text-muted font-semibold text-xs tracking-wider">
          Your Groups
        </Text>
        <Text className="text-muted font-normal text-xs">
          {filteredGroups.length} {filteredGroups.length === 1 ? "group" : "groups"}
        </Text>
      </View>

      {/* Group List */}
      <FlatList
        data={filteredGroups}
        contentContainerStyle={{ gap: 12, paddingBottom: 100 }}
        keyExtractor={(item: Group) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <GroupCard group={item} />}
        ListEmptyComponent={
          <View className="items-center justify-center py-16 px-4">
            <Image source={EmptyListIcon} className="w-16 h-16 opacity-70 mb-3" />
            <Text className="mb-1 text-lg font-semibold text-primary text-center">
              {searchQuery ? "No Matching Groups" : "No Groups Yet"}
            </Text>
            <Text className="text-center text-muted font-normal text-xs max-w-[260px]">
              {searchQuery
                ? `No group matches "${searchQuery}". Try searching for a different keyword.`
                : "Create your first group to start splitting expenses with friends."}
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
