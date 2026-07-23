import { ContactPickerSheet } from "@/components/ContactPickerSheet";
import { groupCategories, GroupCategory, groupIcon } from "@/utils/constants";
import { Feather } from "@expo/vector-icons";
import BottomSheet from "@gorhom/bottom-sheet";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";

import * as Contacts from "expo-contacts";
import { useRouter } from "expo-router";
import { useMemo, useRef, useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const selectedMembers = [
  {
    id: "1",
    name: "Rahul Verma",
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: "2",
    name: "Aman Raj",
    avatar: "https://i.pravatar.cc/150?img=2",
  },
  {
    id: "3",
    name: "Sneha Sharma",
    avatar: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: "4",
    name: "Riya Patel",
    avatar: "https://i.pravatar.cc/150?img=4",
  },
];

export default function CreateGroupScreen() {
  const router = useRouter();
  const contactPickerSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["70%"], []);

  const [selectedCategory, setSelectedCategory] =
    useState<GroupCategory>("Home");

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      {/* Header */}

      <View className="flex-row items-center gap-4 px-6 mb-6">
        <TouchableOpacity
          className="bg-surface rounded-full w-12 h-12 flex items-center justify-center"
          activeOpacity={0.6}
          onPress={() => router.back()}
        >
          <Feather name="chevron-left" size={20} color="#314B5E" />
        </TouchableOpacity>
        <View className="flex-row items-center justify-center gap-2">
          <Text className="text-xl font-semibold text-primary ">New Group</Text>
        </View>
      </View>

      <View className="px-6">
        <View className="mb-6">
          <Text className="text-sm text-muted font-medium mb-2 uppercase">
            Group Name
          </Text>
          <TextInput
            className="border border-border rounded-3xl h-[50px] px-4 text-md text-muted"
            placeholder="eg. Goa Trip"
            placeholderTextColor="#65747F"
            autoCorrect={false}
          />
        </View>

        {/* Group category section */}
        <View className="mb-6">
          <Text className="text-sm text-muted font-medium mb-2 uppercase">
            Group Category
          </Text>
          <View className="flex-row items-center gap-x-2 gap-y-3  flex-wrap">
            {groupCategories.map((category, index) => (
              <TouchableOpacity
                key={index}
                className={`rounded-full px-4 py-2  flex-row items-center justify-center gap-1 ${selectedCategory === category ? "bg-button" : "bg-surface"}`}
                onPress={() => setSelectedCategory(category)}
              >
                <Image source={groupIcon[category]} className="w-5 h-5" />
                <Text
                  className={`text-sm  font-regular ${selectedCategory === category ? "text-white" : "text-primary"}`}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Member section */}
        <MembersSection contactPickerSheetRef={contactPickerSheetRef} />

        {/* Contact picker bottom sheet */}
        <ContactPickerSheet
          contactPickerSheetRef={contactPickerSheetRef}
          snapPoints={snapPoints}
        />
        
      </View>
    </SafeAreaView>
  );
}

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
};

interface MemberSectionProps {
  contactPickerSheetRef: React.RefObject<BottomSheetMethods | null>;
}
export const MembersSection = ({
  contactPickerSheetRef,
}: MemberSectionProps) => {
  const handleAddMember = async () => {
    const { status } = await Contacts.requestPermissionsAsync();

    if (status !== "granted") {
      alert("Contact permission is required");
      return;
    }

    contactPickerSheetRef.current?.expand();
  };

  return (
    <View className="mb-8">
      {/* Header */}
      <View className="mb-4">
        <Text className="text-lg font-semibold text-primary">
          Members ({selectedMembers.length})
        </Text>

        <Text className="text-sm text-muted font-regular">
          Add people to split expenses with
        </Text>
      </View>

      {/* Members */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingRight: 20,
        }}
      >
        <View className="flex-row items-start gap-4">
          {selectedMembers.map((member) => (
            <View key={member.id} className="items-center w-20">
              {member.avatar ? (
                <Image
                  source={{ uri: member.avatar }}
                  className="w-16 h-16 rounded-full"
                />
              ) : (
                <View className="w-16 h-16 rounded-full bg-surface items-center justify-center border border-border">
                  <Text className="text-primary font-semibold text-base">
                    {getInitials(member.name)}
                  </Text>
                </View>
              )}

              <Text
                numberOfLines={1}
                className="text-xs text-primary font-medium mt-2 text-center"
              >
                {member.name.split(" ")[0]}
              </Text>
            </View>
          ))}

          {/* Add Member */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleAddMember}
            className="items-center w-20"
          >
            <View className="w-16 h-16 rounded-full bg-surface border border-dashed border-primary items-center justify-center">
              <Feather name="plus" size={24} color="#314B5E" />
            </View>

            <Text className="text-xs text-primary font-medium mt-2 text-center">
              Add
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};
