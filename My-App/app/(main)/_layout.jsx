// app/(main)/_layout.jsx
import {
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
  TouchableOpacity,
  Modal,
  Dimensions,
  Alert,
  Linking,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { Drawer } from "expo-router/drawer";
import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { StatusBar } from "expo-status-bar";
import { UserContext } from "../../src/context/UserContext";
import { EndPoint } from "../../src/constants/links";
import { useFonts } from "expo-font";
import { useRouter } from "expo-router";

import { DrawerItemList } from '@react-navigation/drawer';

const { width } = Dimensions.get("window");

export default function MainLayout() {
  const router = useRouter();
  const { userData, userToken, setUserData, setUserToken } =
    useContext(UserContext);

  const [modalVisible, setModalVisible] = useState(false);

  let [fontsLoaded] = useFonts({
    Bold: require("../../assets/fonts/Poppins-Bold.ttf"),
    Medium: require("../../assets/fonts/Poppins-Medium.ttf"),
    SemiBold: require("../../assets/fonts/Poppins-SemiBold.ttf"),
    Regular: require("../../assets/fonts/Poppins-Regular.ttf"),
    Thin: require("../../assets/fonts/Poppins-Thin.ttf"),
    Light: require("../../assets/fonts/Poppins-Light.ttf"),
  });

  useEffect(() => {
    checkForUpdate();
  }, []);

  const checkForUpdate = async () => {
    try {
      const response = await fetch(EndPoint + "/LatestVersionView/");
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      const latestVersion = data.latest_version;
      const currentVersion = "2";
      if (currentVersion < latestVersion) {
        Alert.alert(
          "New Version of AgriHub Tanzania",
          "The new version of AgriHub Tanzania is now available on the Play store. Please download it.",
          [
            {
              text: "Download Now",
              onPress: () =>
                Linking.openURL(
                  "https://play.google.com/store/apps/details?id=ttpc.AgriHub"
                ),
            },
            { text: "Later", style: "cancel" },
          ]
        );
      }
    } catch (error) {
      console.error("Error checking for update:", error.message);
    }
  };

  const handleLogout = async () => {
    try {
      if (!userToken) {
        setModalVisible(false);
        router.replace("/(auth)");
        return;
      }

      const response = await axios.post(
        EndPoint + `/Account/logout_user/`,
        null,
        {
          headers: {
            Authorization: `Token ${userToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        await AsyncStorage.removeItem("userToken");
        await AsyncStorage.removeItem("userData");
        setUserData(null);
        setUserToken(null);
        setModalVisible(false);
        router.replace("/(auth)");
      }
    } catch (error) {
      console.error("Error while logging out:", error);
      setModalVisible(false);
      router.replace("/(auth)");
    }
  };

  if (!fontsLoaded) return null;

  return (
    <View style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          headerShown: false,
          swipeEnabled: false,
          overlayColor: '#1f1f1f',
          hideStatusBar: true,
          drawerStyle: {
            backgroundColor: '#063164',
            width: width - 70,
          },
          drawerLabelStyle: {
            color: 'white',
            fontFamily: 'Light',
          },
        }}
        drawerContent={(props) => (
          <View style={{ flex: 1, backgroundColor: '#063164' }}>
            <ScrollView
              contentContainerStyle={{
                paddingBottom: 140, // nafasi ya kutosha juu ya logout button
              }}
            >
              {/* Header ya drawer */}
              <View
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderBottomColor: '#f4f4f4',
                  borderBottomWidth: 1,
                  marginBottom: 12,
                }}
              >
                <Image
                  source={require('../../assets/icon.png')}
                  style={{
                    height: 80,
                    width: 80,
                    borderRadius: 60,
                    marginBottom: 10,
                    marginTop: 30,
                  }}
                />

                <Text
                  style={{
                    fontFamily: 'Medium',
                    color: 'white',
                  }}
                >
                  Welcome => {userData ? userData.username : ''}
                </Text>

                {/* Change password */}
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 10,
                    marginTop: 12,
                    marginLeft: 15,
                    justifyContent: 'space-between',
                    borderColor: 'white',
                    borderWidth: 1,
                    marginBottom: 10,
                    borderRadius: 10,
                    alignSelf: 'stretch',
                    marginRight: 15,
                  }}
                  onPress={() => router.push('/(auth)/Change-Password')}
                >
                  <Text
                    style={{
                      fontFamily: 'Medium',
                      color: 'wheat',
                      marginRight: 20,
                    }}
                  >
                    Change password
                  </Text>
                  <FontAwesome name="key" size={20} color="white" />
                </TouchableOpacity>
              </View>

              {/* 🔸 HII NDIYO ILIYOKOSEKANA: Render drawer items */}
              <DrawerItemList {...props} />

              <View style={{ height: 40 }} />
            </ScrollView>

            {/* Logout button */}
            <TouchableOpacity
              style={styles.logoutBtn}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>

            {/* Logout Modal (centered) */}
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
        )}
      >
  {/* MANUAL SCREENS ONLY */}
  <Drawer.Screen
    name="home"
    options={{
      drawerLabel: "Home",
      title: "Home",
      drawerIcon: () => <FontAwesome name="home" size={20} color="white" />,
    }}
  />

  {userData?.is_admin && (
    <Drawer.Screen
      name="payment"
      options={{
        drawerLabel: "Payment",
        title: "Payment",
        drawerIcon: () => (
          <FontAwesome name="users" size={20} color="white" />
        ),
      }}
    />
  )}

 {/* <Drawer.Screen
  name="(auth)"
  options={{
    drawerLabel: 'Signin',
    title: 'Signin',
    drawerIcon: () => <FontAwesome name="sign-in" size={20} color="white" />,
    drawerItemStyle: { display: 'none' },
  }}
/>
*/}


 <Drawer.Screen
    name="registration"
    options={{
      drawerLabel: "User Registration",
      title: "User Registration",
      drawerIcon: () => (
        <FontAwesome name="user-o" size={20} color="white" />
      ),
    }}
  />




</Drawer>

        
      <StatusBar backgroundColor="white" style="dark" />
    </View>
  );
}

const styles = StyleSheet.create({
  logoutBtn: {
    position: "absolute",
    bottom: 16,
    left: 16,
    backgroundColor: "#063164",
    padding: 12,
    borderRadius: 8,
    width: "50%",
    borderColor: "white",
    borderWidth: 1,
  },
  logoutText: {
    color: "#fff",
    fontFamily: "Light",
    textAlign: "center",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  modalCard: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "85%",
    maxWidth: 450,
  },
});
