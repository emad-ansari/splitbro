import { useMemo, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

import { router } from "expo-router";

import ContactCard from "@/components/contacts/ContactCard";
import SearchBar from "@/components/contacts/SearchBar";
import SectionHeader from "@/components/contacts/SectionHeader";
import SelectedMember from "@/components/contacts/SelectedMember";

import { Contact } from "@/utils/constants";
import { contacts as initialContacts } from "@/utils/data";
import { ArrowLeft01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ContactPickerScreen() {
  const [search, setSearch] = useState("");

  const [contacts, setContacts] = useState<Contact[]>(initialContacts);

  const selectedMembers = contacts.filter((item) => item.isSelected);

  const filteredContacts = useMemo(() => {
    return contacts.filter((item) => {
      return (
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.phone.includes(search)
      );
    });
  }, [contacts, search]);

  const onAppContacts = filteredContacts.filter((item) => item.onApp);

  const inviteContacts = filteredContacts.filter((item) => !item.onApp);

  function toggleContact(id: string) {
    setContacts((prev) =>
      prev.map((contact) =>
        contact.id === id
          ? {
              ...contact,
              isSelected: !contact.isSelected,
            }
          : contact,
      ),
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Header */}

      <View className="flex-row items-center justify-between px-6 pt-4 pb-3">
        <TouchableOpacity onPress = {() => router.back()}>
          <HugeiconsIcon icon={ArrowLeft01Icon} size={22} strokeWidth={1.5} />
        </TouchableOpacity>
        <Text className="text-2xl font-semibold text-primary">
          Select Members
        </Text>

        <TouchableOpacity
          disabled={!selectedMembers.length}
          onPress={() => router.back()}
        >
          <Text
            className={`text-base font-semibold ${
              selectedMembers.length ? "text-primary" : "text-muted"
            }`}
          >
            Done
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingBottom: 40,
        }}
      >
        <SearchBar value={search} onChangeText={setSearch} />

        {selectedMembers.length > 0 && (
          <>
            <SectionHeader title={`Selected (${selectedMembers.length})`} />

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {selectedMembers.map((member) => (
                <SelectedMember
                  key={member.id}
                  name={member.name}
                  avatarUri={member.avatarUri}
                  onRemove={() => toggleContact(member.id)}
                />
              ))}
            </ScrollView>
          </>
        )}

        <SectionHeader title="Available on SplitBro" />

        {onAppContacts.map((contact) => (
          <ContactCard
            key={contact.id}
            contact={contact}
            onPress={() => toggleContact(contact.id)}
          />
        ))}

        <SectionHeader title="Invite Friends" />

        {inviteContacts.map((contact) => (
          <ContactCard
            key={contact.id}
            contact={contact}
            onPress={() => {
              // Later:
              // Share Invite Link
            }}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
