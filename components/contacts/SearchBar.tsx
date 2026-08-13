import { Search01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { TextInput, View } from "react-native";

interface Props {
  value: string;
  placeholder: string;
  onChangeText: (text: string) => void;
  height?: number;

}

export default function SearchBar({ value, height = 50, placeholder, onChangeText }: Props) {
  return (
    <View
      className=" rounded-full flex-row items-center px-4 border border-border"
      style={{ height: height }}
    >
      <HugeiconsIcon icon={Search01Icon} size={20} color="#65747F" />

      <TextInput
        className="flex-1 ml-3 text-primary"
        placeholder={placeholder}
        placeholderTextColor="#65747F"
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}
