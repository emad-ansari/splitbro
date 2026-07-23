import { Feather } from "@expo/vector-icons";
import { Image, Text, TouchableOpacity, View } from "react-native";

export interface ContactCardProps {
	contact: {
		id: string;
		name: string;
		imageAvailable?: boolean;
		image?: {
			uri: string;
		};
		phoneNumbers?: {
			number: string;
		}[];
	};
	selected: boolean;
	onPress: () => void;
}

export const ContactCard = ({
	contact,
	selected,
	onPress,
}: ContactCardProps) => {
	return (
		<TouchableOpacity
			onPress={onPress}
			activeOpacity={0.8}
			className="bg-white rounded-3xl px-4 py-3 mb-3 flex-row items-center"
		>
			{contact.imageAvailable ? (
				<Image
					source={{ uri: contact.image?.uri }}
					className="w-14 h-14 rounded-full"
				/>
			) : (
				<View className="w-14 h-14 rounded-full bg-surface items-center justify-center">
					<Text className="font-semibold text-primary">
						{contact.name
							.split(" ")
							.map((n) => n[0])
							.slice(0, 2)
							.join("")}
					</Text>
				</View>
			)}

			<View className="flex-1 ml-4">
				<Text className="text-primary font-medium">
					{contact.name}
				</Text>

				<Text className="text-muted text-sm">
					{contact.phoneNumbers?.[0]?.number}
				</Text>
			</View>

			<View
				className={`w-8 h-8 rounded-full items-center justify-center ${
					selected
						? "bg-button"
						: "bg-surface"
				}`}
			>
				<Feather
					name={selected ? "check" : "plus"}
					size={18}
					color={selected ? "#fff" : "#314B5E"}
				/>
			</View>
		</TouchableOpacity>
	);
};