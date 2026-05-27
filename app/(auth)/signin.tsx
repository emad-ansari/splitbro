import googleIcon from "@/assets/images/google-icon.png";
import { FontAwesome6 } from "@expo/vector-icons";
import { Mail01Icon, SquareLock02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { useState } from "react";
import {
	ActivityIndicator,
	Image,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignInScreen() {
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);

	return (
		<SafeAreaView className="flex-1 bg-background">
			{/* header */}
			<View className="h-11 p-5 flex-row items-center mb-4">
				<TouchableOpacity
					className="bg-surface w-10 h-10 rounded-full flex items-center justify-center  border border-white "
					activeOpacity={0.7}
				>
					<FontAwesome6
						name="chevron-left"
						size={12}
						color="#223543"
					/>
				</TouchableOpacity>
			</View>
			<View className=" flex-row  items-center justify-center  mb-8">
				<View className="w-24 h-24 bg-surface border border-white rounded-full"></View>
			</View>

			<Text className="text-center font-semibold text-2xl text-primary mb-4">
				Welcome Back!
			</Text>
			<Text className="text-center font-regular tracking-normal text-muted mb-12 text-[14px]">
				Split bills and manage expenses{"\n"} with your favourite people
			</Text>
			{/*  Login form */}
			<View className="p-5">
				{/* Email Feild */}
				<View className="mb-4">
					<Text className="font-semibold text-sm text-muted mb-2">
						Email address*
					</Text>
					<View className="border border-border rounded-2xl h-[50px] flex-row gap-2 px-3 items-center">
						<HugeiconsIcon
							icon={Mail01Icon}
							size={22}
							color="#65747F"
							strokeWidth={1.5}
						/>
						<TextInput
							className=" flex-1 text-muted text-md"
							placeholder="john@example.com"
							placeholderTextColor="#65747F"
							keyboardType="email-address"
							autoCapitalize="none"
							autoCorrect={false}
							autoComplete="email"
							textContentType="emailAddress"
						/>
					</View>
				</View>

				{/* Password field */}
				<View className="mb-3">
					<Text className="font-semibold text-sm text-muted mb-2">
						Password*
					</Text>
					<View className="border border-border rounded-2xl h-[50px] flex-row gap-2 px-3 items-center">
						<HugeiconsIcon
							icon={SquareLock02Icon}
							size={22}
							color="#65747F"
							strokeWidth={1.5}
						/>
						<TextInput
							className=" flex-1 text-muted text-md"
							placeholder="••••••••"
							placeholderTextColor={"#65747F"}
							secureTextEntry={showPassword ? false : true}
							autoCapitalize="none"
							autoCorrect={false}
							keyboardType="default"
						/>
						<TouchableOpacity
							activeOpacity={0.8}
							onPress={() => setShowPassword((prev) => !prev)}
						>
							<Text className="text-xs font-medium text-muted">
								{showPassword ? "Hide" : "Show"}
							</Text>
						</TouchableOpacity>
					</View>
				</View>
				<TouchableOpacity
					className="flex-row items-center justify-end mb-5"
					activeOpacity={0.8}
				>
					<Text className="text-xs font-medium text-muted">
						Forgot password?
					</Text>
				</TouchableOpacity>

				<TouchableOpacity
					className=" items-center justify-center bg-button rounded-full h-[50px] mb-5"
					activeOpacity={0.8}
				>
					<Text className="font-semibold text-base text-white">
                        {
                            loading ? "Logging..." : "Continue"
                        }
						
					</Text>
				</TouchableOpacity>
				{/* divider */}

				<View className="flex-row items-center justify-between gap-1 mb-5">
					<View className=" flex-1 h-px bg-border " />
					<Text className="text-sm text-muted font-regular">OR</Text>
					<View className="flex-1  h-px bg-border " />
				</View>

				<TouchableOpacity
					className="flex-row items-center justify-center  rounded-full h-[50px] mb-5 border border-border gap-2"
					activeOpacity={0.8}
				>
					{loading ? (
						<ActivityIndicator size={"small"} color="#294355" />
					) : (
						<Image
							source={googleIcon}
							width={200}
							height={200}
							className="w-8 h-8"
							resizeMode="contain"
						/>
					)}
					<Text className="font-semibold text-base text-primary">
						{loading ? "Connecting..." : "Continue with Google"}
					</Text>
				</TouchableOpacity>

				<View className="flex-row items-center justify-center gap-1">
					<Text className="font-regular text-sm text-muted">
						Don't have an account?
					</Text>
					<TouchableOpacity className="font-semibold text-primary text-sm ">
						<Text className="font-semibold text-sm text-primary">
							Signup
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		</SafeAreaView>
	);
}
