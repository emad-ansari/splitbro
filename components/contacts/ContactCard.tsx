import { Tick02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { Text, TouchableOpacity, View } from "react-native";

import { Contact } from "@/utils/constants";
import Avatar from "./Avatar";

interface ContactCardProps {
  contact: Contact;
  onPress: () => void;
}

export default function ContactCard({ contact, onPress }: ContactCardProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      className="flex-row items-center py-4"
    >
      <Avatar name={contact.name} avatarUri={contact.avatarUri} size={56} />

      <View className="flex-1 ml-4">
        <Text className="text-primary font-medium text-base" numberOfLines={1}>
          {contact.name}
        </Text>

        <Text className="text-muted text-sm mt-1">
          {contact.onApp ? "Available on SplitBro" : contact.phone}
        </Text>
      </View>

      {contact.onApp ? (
        <View
          className={`w-6 h-6 rounded-full border-2 items-center justify-center ${
            contact.isSelected ? "bg-primary border-primary" : "border-border"
          }`}
        >
          {contact.isSelected && (
            <HugeiconsIcon icon={Tick02Icon} size={14} color="white" />
          )}
        </View>
      ) : (
        <View className="px-4 py-2 rounded-full bg-surface">
          <Text className="text-primary font-medium text-sm">Invite</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}
