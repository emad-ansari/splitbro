import { Tick02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { Pressable, Text, View } from "react-native";
import Avatar from "../contacts/Avatar";

interface MemberItemProps {
  name: string;
  avatar?: string;
  selected: boolean;
  avatarSize?: number;
  onSelect: () => void;
}

export const MemberItem = ({
  name,
  avatar,
  selected,
  onSelect,
  avatarSize = 50,
}: MemberItemProps) => {
  return (
    <Pressable
      className=" flex-row items-center justify-between py-2"
      onPress={onSelect}
    >
      <View className="flex-row items-center gap-4">
        <Avatar name={name} avatarUri={avatar} size={avatarSize} />

        <Text className="font-normal text-primary text-sm">{name}</Text>
      </View>
      <View>
        <View
          className={`w-6 h-6 rounded-full border-2 items-center justify-center ${
            selected ? "bg-primary border-primary" : "border-border"
          }`}
        >
          {selected && (
            <HugeiconsIcon icon={Tick02Icon} size={14} color="white" />
          )}
        </View>
      </View>
    </Pressable>
  );
};
