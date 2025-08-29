// app/_layout.jsx
import { Slot } from "expo-router";
import { UserProvider } from "../src/context/UserContext";

export default function RootLayout() {
  return (
    <UserProvider>
      <Slot />
    </UserProvider>
  );
}
