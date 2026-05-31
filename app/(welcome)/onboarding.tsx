import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function OnboardingScreen() {
    const router = useRouter();
	return (
		<View className="flex-1 items-center justify-center bg-red-100">
			<Text className="text-2xl font-semibold mb-4 ">
				This is onboarding screen.
			</Text>
			<TouchableOpacity onPress = {() => router.push('/(tabs)/home')}>
				<Text className="text-lg font-semibold mb-4 bg-red-400 p-4 rounded-lg">
					Go to home screen
				</Text>
			</TouchableOpacity>
		</View>
	);
}
