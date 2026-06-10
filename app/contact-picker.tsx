import { Feather } from "@expo/vector-icons";
import * as Contacts from "expo-contacts";
import { useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import {
	ActivityIndicator,
	FlatList,
	Image,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ContactCard } from "@/components/ContactCard";
import { Contact } from "@/utils/constants";

export default function ContactPickerScreen() {
	const router = useRouter();

	const [loading, setLoading] = useState(true);
	const [search, setSearch] = useState("");
	const [contacts, setContacts] = useState<Contact[]>([]);
	const [selectedContacts, setSelectedContacts] = useState<Contact[]>([]);

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

	const getInitials = (name: string) => {
		return name
			.split(" ")
			.map((part) => part[0])
			.slice(0, 2)
			.join("")
			.toUpperCase();
	};

	if (loading) {
		return (
			<SafeAreaView className="flex-1 items-center justify-center">
				<ActivityIndicator size="large" />
			</SafeAreaView>
		);
	}

	return (
		<SafeAreaView className="flex-1 bg-background">
			{/* Header */}
			<View className="flex-row items-center justify-between px-6 py-4">
				<TouchableOpacity onPress={() => router.back()}>
					<Feather name="chevron-left" size={24} color="#314B5E" />
				</TouchableOpacity>

				<Text className="text-lg font-semibold text-primary">
					Select Members
				</Text>

				<TouchableOpacity
					onPress={() => {
						console.log(selectedContacts);
						router.back();
					}}
				>
					<Text className="text-button font-medium text-md">
						Done
					</Text>
				</TouchableOpacity>
			</View>

			{/* Search */}
			<View className="px-6 mb-4">
				<View className="bg-white rounded-2xl px-4 h-14 flex-row items-center">
					<Feather name="search" size={18} color="#888" />

					<TextInput
						placeholder="Search contacts"
						value={search}
						onChangeText={setSearch}
						className="flex-1 ml-3"
					/>
				</View>
			</View>

			{/* Selected Members */}
			{selectedContacts.length > 0 && (
				<View className="mb-4">
					<Text className="px-6 mb-3 text-primary font-medium">
						Selected ({selectedContacts.length})
					</Text>

					<FlatList
						horizontal
						showsHorizontalScrollIndicator={false}
						contentContainerStyle={{
							paddingHorizontal: 24,
							gap: 16,
						}}
						data={selectedContacts}
						keyExtractor={(item) => item.id}
						renderItem={({ item }) => (
							<View className="items-center w-20">
								{item.avatar ? (
									<Image
										source={{
											uri: item.avatar,
										}}
										className="w-16 h-16 rounded-full"
									/>
								) : (
									<View className="w-16 h-16 rounded-full bg-surface items-center justify-center">
										<Text className="text-primary font-semibold">
											{getInitials(item.name)}
										</Text>
									</View>
								)}

								<Text
									numberOfLines={1}
									className="mt-2 text-xs text-center"
								>
									{item.name.split(" ")[0]}
								</Text>
							</View>
						)}
					/>
				</View>
			)}

			{/* Contacts */}
			<FlatList
				data={filteredContacts}
				keyExtractor={(item) => item.id}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{
					paddingHorizontal: 24,
					paddingBottom: 120,
				}}
				renderItem={({ item }) => (
					<ContactCard
						contact={item}
						selected={selectedContacts.some(
							(selected) => selected.id === item.id,
						)}
						onPress={() => toggleSelection(item)}
					/>
				)}
			/>
		</SafeAreaView>
	);
}
