import { Contact } from "@/utils/constants";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import * as Contacts from "expo-contacts";
import { useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { RenderBackdrop } from "./BottomSheetRenderBackdrop";

interface ContactPickerSheetProps {
  contactPickerSheetRef: React.RefObject<BottomSheetMethods | null>;
  snapPoints: string[];
}

export function ContactPickerSheet({
  contactPickerSheetRef,
  snapPoints,
}: ContactPickerSheetProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContacts, setSelectedContacts] = useState<Contact[]>([]);

  console.log(" contacts:", contacts);

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    try {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers, Contacts.Fields.Image],
      });

      const formattedContacts: Contact[] = data.map((contact) => ({
        id: contact.id,
        name: contact.name || "Unknown",
        phoneNumber: contact.phoneNumbers?.[0]?.number,
        avatar: contact.image?.uri,
      }));

      setContacts(formattedContacts);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const toggleSelection = (contact: Contact) => {
    const exists = selectedContacts.some((item) => item.id === contact.id);

    if (exists) {
      setSelectedContacts((prev) =>
        prev.filter((item) => item.id !== contact.id),
      );
    } else {
      setSelectedContacts((prev) => [...prev, contact]);
    }
  };

  const filteredContacts = useMemo(() => {
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [contacts, search]);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <BottomSheet
     ref={contactPickerSheetRef}
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
      <BottomSheetView className="flex-1 px-6 bg-red-500">
        <View></View>
        {/* <View className="flex-row items-center justify-between px-6 py-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Feather name="chevron-left" size={24} color="#314B5E" />
          </TouchableOpacity>

          <Text className="text-lg font-semibold text-primary">
            Select Members
          </Text>

          <TouchableOpacity
            onPress={() => {
              //   console.log(selectedContacts);
              router.back();
            }}
          >
            <Text className="text-button font-medium text-md">Done</Text>
          </TouchableOpacity>
        </View> */}

        {/* Search */}
        {/* <View className="px-6 mb-4">
          <View className="bg-white rounded-2xl px-4 h-14 flex-row items-center">
            <Feather name="search" size={18} color="#888" />

            <TextInput
              placeholder="Search contacts"
              value={search}
              onChangeText={setSearch}
              className="flex-1 ml-3"
            />
          </View>
        </View> */}

        {/* Contacts */}
        {/* <FlatList
          data={contacts}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <ContactCard
              contact={item}
              selected={selectedContacts.some(
                (selected) => selected.id === item.id,
              )}
              onPress={() => toggleSelection(item)}
            />
          )}
        /> */}
      </BottomSheetView>
    </BottomSheet>
  );
}
