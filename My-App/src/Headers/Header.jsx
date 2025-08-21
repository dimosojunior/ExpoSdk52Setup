// components/Header.jsx

import { useRouter } from 'expo-router';
import { useNavigation, DrawerActions } from '@react-navigation/native';

import { StyleSheet,Platform,TextInput,ActivityIndicator,
  Pressable, Text,Animated,ScrollView, View,Image, 
  Button, FlatList,TouchableOpacity,Modal,
  TouchableWithoutFeedback, Keyboard,Dimensions,
  
   
  KeyboardAvoidingView 
   } from 'react-native';
import React, {useState,useRef,useCallback, useEffect, useContext} from 'react';


import { EndPoint } from "../../src/constants/links";
//import useFetch from '../useFetch';
import { useFonts } from 'expo-font';
import AwesomeAlert from 'react-native-awesome-alerts';
//import LotterViewScreen from '../../Screens/LotterViewScreen';


// import theme from '../theme/theme';
// import themeContext from '../theme/themeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {MaterialIcons,Entypo,MaterialCommunityIcons,FontAwesome5, Ionicons,Feather,AntDesign, FontAwesome} from '@expo/vector-icons';

import COLORS  from '../../src/constants/colors';
import { useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

import LottieView from 'lottie-react-native';
import {globalStyles} from '../Styles/GlobalStyles';

export default function Header({ title }) {

    let [fontsLoaded] = useFonts({
    
    'Bold': require('../../assets/fonts/Poppins-Bold.ttf'),
    'Medium': require('../../assets/fonts/Poppins-Medium.ttf'),
    'SemiBold': require('../../assets/fonts/Poppins-SemiBold.ttf'),
    'Regular': require('../../assets/fonts/Poppins-Regular.ttf'),
    'Thin': require('../../assets/fonts/Poppins-Thin.ttf'),
    'Light': require('../../assets/fonts/Poppins-Light.ttf'),
    
    
  
});

 // const navigation = useNavigation();
  const {width, height} = Dimensions.get('window');
  


  const router = useRouter();
  const navigation = useNavigation();

  const openMenu = () => navigation.dispatch(DrawerActions.openDrawer());
 const GoHome = () => router.push("/(main)/home");




  return (

    <>{!fontsLoaded ? (<View/>):(


    <View style={{ backgroundColor: '#015d68', marginBottom: 10 }}>
      <View
        style={{
          paddingHorizontal: 12,
          paddingVertical: 10,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <TouchableOpacity onPress={openMenu}>
          <View>
            <View style={{ width: 20, height: 3, marginVertical: 5, backgroundColor: 'white' }} />
            <View style={{ width: 15, height: 3, backgroundColor: 'white' }} />
            <View style={{ width: 10, height: 3, marginVertical: 5, backgroundColor: 'white' }} />
          </View>
        </TouchableOpacity>

        <Text style={{ fontSize: 16, color: 'white' }}>{title || 'TW 👩 CC'}</Text>

        <TouchableOpacity onPress={GoHome}>
          <FontAwesome name="calendar-plus-o" size={26} color="white" />
        </TouchableOpacity>
      </View>
    </View>

    )}</>

  );
}


const styles = StyleSheet.create({
      headerbar:{
        paddingTop:30,
        //paddingBottom:20,
        paddingHorizontal:20,
        flexDirection:"row",
        backgroundColor:"#015d68",
        alignItems:"center",
        justifyContent:"space-between",
        marginBottom:20
    },
    filters:
    {
        flexDirection:"row",
        marginTop:10,
        marginHorizontal:5,
        justifyContent:"space-between"
    },
    footer:{
      position:"absolute",
      left:1,
      right:1,
      bottom:0,
      backgroundColor:"#fff",
      paddingHorizontal:25,
      paddingTop:20
    }
     });

