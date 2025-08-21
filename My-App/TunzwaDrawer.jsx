// app/_layout.jsx
import {
  StyleSheet, Platform, TextInput, ActivityIndicator,
  Pressable, Text, Animated, ScrollView, View, Image,
  Button, FlatList, TouchableOpacity, Modal,
  TouchableWithoutFeedback, Keyboard, Dimensions,
  KeyboardAvoidingView
} from 'react-native';
import React, { useState, useRef, useCallback, useEffect, useContext } from 'react';

import { Drawer } from "expo-router/drawer";
import { DrawerItemList } from "@react-navigation/drawer";

import { UserProvider, UserContext } from "../src/context/UserContext";

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { MaterialIcons, Entypo, MaterialCommunityIcons, FontAwesome5, Ionicons, Feather, AntDesign, FontAwesome } from '@expo/vector-icons';

import { useRouter } from 'expo-router';

import COLORS from '../src/constants/colors';
import { EndPoint } from "../src/constants/links";
import MinorHeader from '../src/Headers/MinorHeader';
import Header from '../src/Headers/Header';
import { globalStyles } from '../src/Styles/GlobalStyles';

const { width } = Dimensions.get("window");

// ----------- Custom DrawerContent Example ---------
function CustomDrawerContent(props) {
  const { userData, setUserData, userToken, setUserToken } = useContext(UserContext);
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      if (!userToken) {
        return;
      }

      const response = await axios.post(
        EndPoint + `/Account/logout_user/`,
        null,
        {
          headers: {
            Authorization: `Token ${userToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        await AsyncStorage.removeItem('userToken');
        await AsyncStorage.removeItem('userData');

        setUserData(null);
        setUserToken(null);
        setModalVisible(false);

        // Navigate back to signin
        router.replace("/(auth)");
      } else {
        console.log('Failed to logout');
      }
    } catch (error) {
      console.error('Error while logging out:', error);
    }
  };

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
            Welcome {userData ? userData.username : ""}
          </Text>
        </View>

        {/* Drawer Items */}
        <DrawerItemList {...props} />
      </ScrollView>

      {/* Logout Button */}
      <TouchableOpacity
        style={{
          position: "absolute",
          bottom: 20,
          left: 20,
          right: 20,
          borderColor: "white",
          borderWidth: 1,
          borderRadius: 6,
          padding: 12,
        }}
        onPress={() => setModalVisible(true)}
      >
        <Text style={{ color: "white", textAlign: "center", fontFamily: "Light" }}>Logout</Text>
      </TouchableOpacity>

      {/* Logout Modal */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.4)",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              padding: 20,
              borderRadius: 10,
              width: "80%",
            }}
          >
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

// ---------------- Root Layout ----------------
export default function RootLayout() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        console.log("Token fetched", token);

        // Example: check version here
        // await checkLatestVersion();

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
    <UserProvider>
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

        {/* Home (main) visible to everyone */}
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


        {/* Conditional */}
        <ConditionalScreens />
      </Drawer>
    </UserProvider>
  );
}

// ------------- Conditional Drawer Screens ---------------
function ConditionalScreens() {
  const { userData } = useContext(UserContext);

  return (
    <>
      {userData?.is_admin && (
        <Drawer.Screen
          name="payment"
          options={{
            drawerLabel: "payment",
            title: "payment",
            drawerIcon: () => <FontAwesome name="users" size={20} color="white" />,
          }}
        />
      )}
    </>
  );
}
