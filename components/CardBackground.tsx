import { LinearGradient } from "expo-linear-gradient";
import { View } from "react-native";

export const CardBackground = () => {
	return (
		<>
			{/* Primary gradient using app's exact brand colors */}
			<LinearGradient
				colors={["#1A2E3B", "#2A4155", "#314B5E"]}
				className="absolute inset-0 rounded-[32px]"
				start={{ x: 0, y: 0 }}
				end={{ x: 1, y: 1 }}
			/>

			{/* Subtle diagonal highlight to add depth */}
			<LinearGradient
				colors={["rgba(255,255,255,0.06)", "rgba(255,255,255,0)"]}
				className="absolute inset-0 rounded-[32px]"
				start={{ x: 0, y: 0 }}
				end={{ x: 0.6, y: 0.6 }}
			/>

			{/* Ambient glow circle — top right */}
			<View
				className="absolute rounded-full -right-10 -top-10"
				style={{
					width: 200,
					height: 200,
					backgroundColor: "rgba(49, 75, 94, 0.5)",
					transform: [{ scale: 1 }],
				}}
			/>

			{/* Ambient glow circle — bottom left */}
			<View
				className="absolute rounded-full -bottom-10 -left-14"
				style={{
					width: 180,
					height: 180,
					backgroundColor: "rgba(26, 46, 59, 0.6)",
				}}
			/>

			{/* Subtle inner top border shimmer */}
			<View
				className="absolute top-0 left-0 right-0 rounded-t-[32px]"
				style={{
					height: 1,
					backgroundColor: "rgba(255,255,255,0.12)",
				}}
			/>
		</>
	);
};
