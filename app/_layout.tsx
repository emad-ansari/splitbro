import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "../global.css";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [loaded] = useFonts({
		GeistRegular: require("../assets/fonts/Geist-Regular.otf"),
		GeistMedium: require("../assets/fonts/Geist-Medium.otf"),
		GeistSemiBold: require("../assets/fonts/Geist-SemiBold.otf"),
		GeistBold: require("../assets/fonts/Geist-Bold.otf"),
	});

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	if (!loaded) {
		return null;
	}

	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen name="(auth)" />
		</Stack>
	);
}
