// app/_layout.jsx
import {
  StyleSheet, ActivityIndicator, ScrollView, View, Image,
  Text, TouchableOpacity, Modal, Dimensions, Alert, Linking
} from 'react-native';
import React, { useState, useEffect, useContext } from 'react';

import { Drawer } from "expo-router/drawer";
import { DrawerItemList } from "@react-navigation/drawer";

import { UserProvider, UserContext } from "../src/context/UserContext";

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { FontAwesome } from '@expo/vector-icons';

import { useRouter } from 'expo-router';
import { EndPoint } from "../src/constants/links";
import { globalStyles } from '../src/Styles/GlobalStyles';

const { width } = Dimensions.get("window");

// ----------- Custom DrawerContent ---------
function CustomDrawerContent(props) {
  const { userData, setUserData, userToken, setUserToken } = useContext(UserContext);
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      if (!userToken) return;

      const response = await axios.post(
        EndPoint + `/Account/logout_user/`,
        null,
        { headers: { Authorization: `Token ${userToken}` } }
      );

      if (response.status === 200) {
        await AsyncStorage.removeItem('userToken');
        await AsyncStorage.removeItem('userData');

        setUserData(null);
        setUserToken(null);
        setModalVisible(false);

        router.replace("/(auth)");
      }
    } catch (error) {
      console.error('Error while logging out:', error);
    }
  };


  //console.log("USERDATA", userData.username);

  return (
    <View style={{ flex: 1, backgroundColor: "#063164" }}>
      <ScrollView>
        {/* Header */}
         <View
          style={{
            alignItems: "center",
            paddingVertical: 30,
            borderBottomColor: "#f4f4f4",
            borderBottomWidth: 1,
          }}
        >
          <Image
            source={require("../assets/icon.png")}
            style={{ width: 80, height: 80, borderRadius: 40, marginBottom: 10 }}
          />
          <Text style={{ color: "white", fontFamily: "Medium" }}>
             {userData ? userData.username : ""}
          </Text>
        </View>

        <DrawerItemList {...props} />
      </ScrollView>

      {/* Logout Button */}
      <TouchableOpacity
        style={{ position: "absolute", bottom: 20, left: 20, right: 20, borderColor: "white", borderWidth: 1, borderRadius: 6, padding: 12 }}
        onPress={() => setModalVisible(true)}
      >
        <Text style={{ color: "white", textAlign: "center", fontFamily: "Light" }}>Logout</Text>
      </TouchableOpacity>

      {/* Logout Modal */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.4)" }}>
          <View style={{ backgroundColor: "white", padding: 20, borderRadius: 10, width: "80%" }}>
            <Text style={{ marginBottom: 20, fontFamily: "Light" }}>
              Hello {userData?.username}, unataka kutoka?
            </Text>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={{ color: "red" }}>NO</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleLogout}>
                <Text style={{ color: "green" }}>YES</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

// ----------- RootLayout ---------
function RootLayoutContent() {
  const { userData } = useContext(UserContext);
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  // ✅ Version Checking (moved from App.js)
  const checkForUpdate = async () => {
    try {
      const response = await fetch(EndPoint + '/LatestVersionView/');
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();
      const latestVersion = data.latest_version;
      const currentVersion = "2"; // or Application.nativeApplicationVersion

      if (currentVersion < latestVersion) {
        Alert.alert(
          'New Version of AgriHub Tanzania',
          'A new version is available. Please update via Play Store.',
          [
            { text: 'Download Now', onPress: () => Linking.openURL('https://play.google.com/store/apps/details?id=ttpc.AgriHub') },
            { text: 'Later', style: 'cancel' }
          ]
        );
      }
    } catch (error) {
      console.error('Error checking update:', error.message);
    }
  };

  useEffect(() => { checkForUpdate(); }, []);

  // ✅ Auto redirect based on token
  useEffect(() => {
    (async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        if (token) {
          router.replace("/(main)");
        } else {
          router.replace("/(auth)");
        }
      } finally {
        setChecking(false);
      }
    })();
  }, []);

  if (checking) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <View style={globalStyles.loaderOverlay}>
          <View style={globalStyles.loaderContent}>
            <ActivityIndicator size={40} color="#fff" />
            <Text style={globalStyles.loaderText}>Welcome AgriHub Tanzania</Text>
            <Text style={globalStyles.loaderCounter2}>please wait....</Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        swipeEnabled: false,
        overlayColor: "#1f1f1f",
        drawerStyle: { backgroundColor: "#063164", width: width - 70 },
        drawerLabelStyle: { color: "white", fontFamily: "Light" },
      }}
    >
      {/* (auth) hidden */}
      <Drawer.Screen
        name="(auth)"
        options={{
          drawerLabel: "Signin",
          title: "Signin",
          drawerIcon: () => <FontAwesome name="sign-in" size={20} color="white" />,
          drawerItemStyle: { display: "none" },
        }}
      />

      {/* ✅ Home visible only if userData exists */}
      {userData?.is_admin && (
        <Drawer.Screen
          name="(main)"
          options={{
            drawerLabel: "Home",
            title: "Home",
            drawerIcon: () => <FontAwesome name="home" size={20} color="white" />,
          }}
        />
      )}

      {/* ✅ Conditional screens */}
      {userData?.is_admin && (
        <Drawer.Screen
          name="payment"
          options={{
            drawerLabel: "Payment",
            title: "Payment",
            drawerIcon: () => <FontAwesome name="users" size={20} color="white" />,
          }}
        />
      )}


  
        <Drawer.Screen
          name="registration"
          options={{
            drawerLabel: "User Registration",
            title: "User Registration",
            drawerIcon: () => <FontAwesome name="user-o" size={20} color="white" />,
          }}
        />
      




    </Drawer>
  );
}

// ✅ Wrap everything with UserProvider
export default function RootLayout() {
  return (
    <UserProvider>
      <RootLayoutContent />
    </UserProvider>
  );
}
