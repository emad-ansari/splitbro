import SelectedMember from "@/components/contacts/SelectedMember";
import { useContactStore } from "@/store/useContactStore";
import { groupCategories, GroupCategory, groupIcon } from "@/utils/constants";
import { Feather } from "@expo/vector-icons";
import { AddSquareIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";

import * as Contacts from "expo-contacts";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CreateGroupScreen() {
  const router = useRouter();

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
        <MembersSection />

        {/* Create group button */}

        <TouchableOpacity className="mt-4 flex-row gap-2 items-center justify-center bg-button h-[50px] px-4 rounded-3xl">
          <HugeiconsIcon icon = {AddSquareIcon} size = {20} strokeWidth={1.5} color = "#ffffff"/>
          <Text className="text-md font-medium  text-white">Create Group</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export const MembersSection = () => {
  const router = useRouter();

  const contacts = useContactStore((state) => state.contacts);
  const toggleSelected = useContactStore((state) => state.toggleSelected);

  const selectedMembers = contacts.filter((contact) => contact.isSelected);

  const handleAddMember = async () => {
    const { status } = await Contacts.requestPermissionsAsync();

    if (status !== "granted") {
      alert("Contact permission is required");
      return;
    }

    router.push("/contact-picker");
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
            <SelectedMember
              key={member.id}
              name={member.name}
              avatarUri={member.avatarUri}
              onRemove={() => toggleSelected(member.id)}
            />
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
