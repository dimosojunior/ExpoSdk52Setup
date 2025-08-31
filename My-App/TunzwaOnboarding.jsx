// app/onboarding-screen.jsx
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { useRouter } from "expo-router";

export default function OnboardingScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Karibu AgriHub Tanzania!</Text>
      <Text style={styles.desc}>
        Hii ni onboarding screen, utaiona mara ya kwanza tu.
      </Text>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => router.replace("/(auth)")}
      >
        <Text style={styles.btnText}>Endelea</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  desc: { fontSize: 16, textAlign: "center", marginBottom: 30 },
  btn: { backgroundColor: "green", padding: 12, borderRadius: 8 },
  btnText: { color: "white", fontWeight: "bold" },
});
