import { UserProvider } from "./src/context/UserContext";
import { ExpoRoot } from "expo-router";

export default function App() {
  const ctx = require.context("./app");
  return (
    <UserProvider>
      <ExpoRoot context={ctx} />
    </UserProvider>
  );
}
