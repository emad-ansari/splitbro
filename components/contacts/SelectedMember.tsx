import { Cancel01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { Text, TouchableOpacity, View } from "react-native";
import Avatar from "./Avatar";

interface SelectedMemberProps {
  name: string;
  avatarUri?: string;
  onRemove: () => void;
}

export default function SelectedMember({
  name,
  avatarUri,
  onRemove,
}: SelectedMemberProps) {
  return (
    <TouchableOpacity
      className="items-center mr-5"
      onPress={onRemove}
      activeOpacity={0.8}
    >
      <View>
        <Avatar name={name} avatarUri={avatarUri} size={60} />

        <View className="absolute -top-1 -right-1 bg-white rounded-full p-1">
          <HugeiconsIcon icon={Cancel01Icon} size={16} color="#EF4444" />
        </View>
      </View>

      <Text
        numberOfLines={1}
        className="text-xs mt-2 text-primary w-16 text-center"
      >
        {name.split(" ")[0]}
      </Text>
    </TouchableOpacity>
  );
}
