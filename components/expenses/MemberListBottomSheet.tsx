import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";

import { Contact } from "@/utils/constants";
import { useMemo } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { RenderBackdrop } from "../BottomSheetRenderBackdrop";
import { MemberItem } from "./MemberItem";

interface MemberListBottomSheetProps {
  members: Contact[];
  bottomSheetRef: React.RefObject<BottomSheetMethods | null>;
  paidBy: Contact | { memberId: string; memberName: string; avatarUri?: string } | null;
  onSelect: (member: Contact) => void;
}

export const MemberListBottomSheet = ({
  members,
  bottomSheetRef,
  paidBy,
  onSelect,
}: MemberListBottomSheetProps) => {
  const snapPoints = useMemo(() => ["60%"], []);

  const handleCloseBottomSheet = () => {
    bottomSheetRef.current?.close();
  };

  const getPaidById = () => {
    if (!paidBy) return null;
    return "id" in paidBy ? paidBy.id : paidBy.memberId;
  };

  const currentPaidById = getPaidById();

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
        <Text className="text-lg text-primary font-semibold tracking-wide">
          Paid By
        </Text>
      </View>
      <BottomSheetScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 12, gap: 4 }}
        showsVerticalScrollIndicator={false}
      >
        {members.map((member) => (
          <MemberItem
            key={member.id}
            selected={currentPaidById === member.id}
            name={member.name}
            avatar={member.avatarUri}
            avatarSize={40}
            onSelect={() => onSelect(member)}
          />
        ))}
      </BottomSheetScrollView>

      <View className="p-4 px-6">
        <TouchableOpacity
          className={`mb-2 flex-row items-center justify-center px-4 py-3 h-14 rounded-3xl ${
            paidBy === null ? "bg-gray-400" : "bg-primary"
          }`}
          activeOpacity={0.9}
          onPress={handleCloseBottomSheet}
          disabled={paidBy === null}
        >
          <Text className="text-white font-medium text-base">Done</Text>
        </TouchableOpacity>
      </View>
    </BottomSheet>
  );
};
