
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


export default function LotterViewScreen() {


    // To change color
// const theme = useContext(themeContext)
// const [darkMode, setdarkMode] = useState(false)


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
  
 
  return (
    
<>{!fontsLoaded ? (<View/>):(

   

<View 
style={[{
  justifyContent:'center',
  alignItems:'center',
   flex:1,
  // zIndex:1,
  // height:height,
  // backgroundColor:'red',

},{backgroundColor:COLORS.white}]}
>

 {/*<Text style={{
        color:'green',
        fontFamily:'Bold',

      }}>Free Projects Share</Text>*/}
{/* <LottieView
        style={{
          //flex:1,
          height:150,
          width:150,

          // position: 'absolute',
          // top: 0,
          // left: 0,
          // right: 0,
          // bottom: 0,
          // backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
          // justifyContent: 'center',
          // alignItems: 'center',

        }}
        source={require('../../assets/Loading/loading4.json')} // Replace with your animation JSON file
        autoPlay
        loop
      />
     */}


   <Image
 style={{
        alignItems: 'center',
        width: width,
        justifyContent: 'center',
        height: height / 2,
      }}
      resizeMode="cover"
   source={require('../../assets/1.jpg')} 
      >
      </Image>


</View>


)}</>

  );
}

const styles = StyleSheet.create({

  Profilecontainer:{
    // justifyContent:'center',
    // alignItems:'center',
     //flex:1,
     justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor:'wheat',
    zIndex:1,
  },


});