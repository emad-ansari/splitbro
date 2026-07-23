import { Image, Text, View } from "react-native";

interface AvatarProps {
  name: string;
  avatarUri?: string;
  size?: number;
}

export default function Avatar({
  name,
  avatarUri,
  size = 52,
}: AvatarProps) {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((item) => item[0])
    .join("")
    .toUpperCase();

  if (avatarUri) {
    return (
      <Image
        source={{ uri: avatarUri }}
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
        }}
      />
    );
  }

  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
      }}
      className="bg-surface items-center justify-center"
    >
      <Text className="text-primary font-semibold">
        {initials}
      </Text>
    </View>
  );
}