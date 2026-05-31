import { Image, Text, View } from "react-native";

interface UserStackProps {
	users: {
        id: string
		username: string;
		avatar?: string;
	}[];
}

export const UserStack = ({ users }: UserStackProps) => {
	return (
		<View className="flex-row items-center justify-center ">
			{users.slice(0, 4).map((user, index) => (
				<View
					key={user.id}
					className="border-2 border-white rounded-full w-9 h-9 flex items-center justify-center bg-surface"
					style={{
						marginLeft: index === 0 ? 0 : -12,
					}}
				>
					{user.avatar ? (
						<Image
							source={{ uri: user.avatar }}
							className="w-5 h-5"
						/>
					) : (
						<Text className="text-[9px] font-semibold text-primary ">
							{user.username
								.split(" ")
								.map((name) => name.charAt(0).toUpperCase())
								.join("")}
						</Text>
					)}
				</View>
			))}
			{users.length > 4 && (
				<View className="border-2 border-white rounded-full w-9 h-9 flex items-center justify-center bg-surface -mx-3">
					<Text className="text-[10px] font-semibold text-primary ">
						+ {users.length - 4}
					</Text>
				</View>
			)}
		</View>
	);
};
