import { LinearGradient } from "expo-linear-gradient";
import { View } from "react-native";

export const CardBackground = () => {
	return (
		<>
			<LinearGradient
				colors={["#324D5E", "#68A1C4"]}
				className="absolute inset-0 rounded-[32px]"
				start={{ x: 0, y: 0 }}
				end={{ x: 1, y: 1 }}
			/>
			<View className="absolute h-48 w-48 rounded-full bg-circle/30 -right-8 -top-8  " />
			<View className="absolute h-48 w-48 rounded-full bg-circle/30  -bottom-8 -left-12  " />
		</>
	);
};
