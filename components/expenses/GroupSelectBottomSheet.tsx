import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { Group, groupCategoryColors, groupIcon, groups } from "@/utils/constants";
import { useRouter } from "expo-router";
import { useMemo } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { RenderBackdrop } from "../BottomSheetRenderBackdrop";

interface GroupSelectBottomSheetProps {
  bottomSheetRef: React.RefObject<BottomSheetMethods | null>;
}

export const GroupSelectBottomSheet = ({
  bottomSheetRef,
}: GroupSelectBottomSheetProps) => {
  const router = useRouter();
  const snapPoints = useMemo(() => ["55%"], []);

  const handleSelectGroup = (group: Group) => {
    bottomSheetRef.current?.close();
    router.push({
      pathname: "/(groups)/[id]/add-expense",
      params: { id: group.id },
    });
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      enablePanDownToClose
      snapPoints={snapPoints}
      backdropComponent={RenderBackdrop}
      backgroundStyle={{
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
      }}
      handleIndicatorStyle={{
        backgroundColor: "#CBD5E1",
        width: 50,
      }}
    >
      <View className="px-6 pt-4 pb-2">
        <Text className="text-lg text-primary font-bold tracking-wide">
          Add Expense to...
        </Text>
        <Text className="text-xs text-muted font-normal mt-0.5">
          Select the group this expense belongs to
        </Text>
      </View>

      <BottomSheetScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 12, gap: 10 }}
        showsVerticalScrollIndicator={false}
      >
        {groups.map((group) => (
          <TouchableOpacity
            key={group.id}
            className="flex-row items-center p-3.5 rounded-2xl border border-border bg-white justify-between shadow-xs"
            activeOpacity={0.85}
            onPress={() => handleSelectGroup(group)}
          >
            <View className="flex-row items-center gap-3 flex-1">
              <View
                className="rounded-xl w-11 h-11 flex items-center justify-center p-2"
                style={{
                  backgroundColor: groupCategoryColors[group.category] || "#F1F5F9",
                }}
              >
                <Image
                  source={groupIcon[group.category]}
                  className="w-6 h-6"
                  resizeMode="contain"
                />
              </View>
              <View className="flex-1">
                <Text className="text-primary font-semibold text-base">
                  {group.name}
                </Text>
                <Text className="text-muted font-normal text-xs">
                  {group.membersList.length} members
                </Text>
              </View>
            </View>

            <View className="bg-primary/10 px-3 py-1.5 rounded-full">
              <Text className="text-xs font-semibold text-primary">Select</Text>
            </View>
          </TouchableOpacity>
        ))}
      </BottomSheetScrollView>
    </BottomSheet>
  );
};
