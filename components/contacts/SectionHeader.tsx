import { Text, View } from "react-native";

interface Props {
  title: string;
}

export default function SectionHeader({ title }: Props) {
  return (
    <View className="mb-3 mt-6">
      <Text className="text-muted uppercase text-xs tracking-wider font-semibold">
        {title}
      </Text>
    </View>
  );
}
