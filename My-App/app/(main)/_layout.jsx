// app/(main)/_layout.jsx
import React, { useEffect, useState } from 'react';
import { Stack, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, View } from 'react-native';

export default function MainLayout() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const seen = await AsyncStorage.getItem('isAppFirstLaunched');
        if (seen == null) {
          await AsyncStorage.setItem('isAppFirstLaunched', 'false');
          // on first launch nenda Welcome
          router.replace('/(main)/welcome-screen');
        }
      } finally {
        setChecking(false);
      }
    })();
  }, []);

  if (checking) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false, // tunatumia Header yetu custom
      }}
    >
      {/* Hapa hutaji kutaja kila screen; files kwenye (main) zinakuwa routes automatically */}
      <Stack.Screen 
      name="home" 
      options={{ title: "Home" }}
      />

      <Stack.Screen 
      name="welcome-screen" 
      options={{ title: "Welcome" }}
      />
      
    </Stack>
  );
}
