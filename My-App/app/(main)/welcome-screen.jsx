// app/(main)/welcome-screen.jsx
import React from 'react';
import { View, Text, Button } from 'react-native';
//import Header from '../../components/Header';
import { useRouter } from 'expo-router';

export default function WelcomeScreen() {
  const router = useRouter();
  return (
    <View style={{ flex: 1 }}>
     
      <View style={{ padding: 16 }}>
        <Text>Karibu! (itaonekana mara ya kwanza tu)</Text>
        <Button title="Endelea" onPress={() => router.replace('/(main)')} />
      </View>
    </View>
  );
}
