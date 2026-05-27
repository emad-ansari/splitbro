import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from 'expo-status-bar';
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

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
		<SafeAreaProvider>
      <StatusBar style = "dark"/>
			<Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(welcome)" />
				<Stack.Screen name="(auth)" />
			</Stack>
		</SafeAreaProvider>
	);
}
