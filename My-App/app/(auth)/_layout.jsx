// app/(auth)/_layout.jsx
import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ title: "Sign In" }} />
      <Stack.Screen name="signup" options={{ title: "Sign Up" }} />
      <Stack.Screen
        name="Other-User-Registration"
        options={{ title: "User Register" }}
      />
      <Stack.Screen
        name="Change-Password"
        options={{ title: "Change Password" }}
      />
    </Stack>
  );
}
