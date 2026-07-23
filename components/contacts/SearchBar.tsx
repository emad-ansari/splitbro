import { Search01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { TextInput, View } from "react-native";

interface Props {
  value: string;
  onChangeText: (text: string) => void;
}

export default function SearchBar({ value, onChangeText }: Props) {
  return (
    <View className="bg-surface rounded-full flex-row items-center px-4 h-14">
      <HugeiconsIcon icon = {Search01Icon} size={20} color="#65747F" />

      <TextInput
        className="flex-1 ml-3 text-primary"
        placeholder="Search name or phone"
        placeholderTextColor="#65747F"
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}
