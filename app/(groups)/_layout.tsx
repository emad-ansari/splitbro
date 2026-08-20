import { Stack } from "expo-router";

export default function GroupLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="create" />
      <Stack.Screen name="[id]" />
      <Stack.Screen name="[id]/add-expense" />
      <Stack.Screen name="expense-history" />
    </Stack>
  );
}
