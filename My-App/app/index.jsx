// app/index.jsx
import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Index() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkFirstLaunch = async () => {
      try {
        const appData = await AsyncStorage.getItem("isAppFirstLaunched");
        if (appData == null) {
          // Mara ya kwanza kabisa
          await AsyncStorage.setItem("isAppFirstLaunched", "false");
          router.replace("/onboarding");
        } else {
          // Si mara ya kwanza
          router.replace("/(auth)");
        }
      } catch (err) {
        console.error("Error checking app launch:", err);
        router.replace("/(auth)");
      } finally {
        setLoading(false);
      }
    };
    checkFirstLaunch();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="green" style={{ flex: 1 }} />;
  }

  return null;
}
