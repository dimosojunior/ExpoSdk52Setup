
import { StyleSheet,Platform,TextInput,ActivityIndicator,
  Pressable, Text,Animated,ScrollView, View,Image, 
  Button, FlatList,TouchableOpacity,Modal,
  TouchableWithoutFeedback, Keyboard,Dimensions,
  
   
  KeyboardAvoidingView 
   } from 'react-native';
import React, {useState,useRef,useCallback, useEffect, useContext} from 'react';



//import useFetch from '../../useFetch';
import { useFonts } from 'expo-font';
import AwesomeAlert from 'react-native-awesome-alerts';

// import theme from '../../theme/theme';
// import themeContext from '../../theme/themeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {MaterialIcons,Entypo,MaterialCommunityIcons,FontAwesome5, Ionicons,Feather,AntDesign, FontAwesome} from '@expo/vector-icons';

import { useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');


import LotterViewScreen from '../../src/Screens/LotterViewScreen';


import COLORS  from '../../src/constants/colors';
import { EndPoint } from "../../src/constants/links";
import MinorHeader from '../../src/Headers/MinorHeader';

//import Header from '../../../../components/Header';
import Header from '../../src/Headers/Header';
import {globalStyles} from '../../src/Styles/GlobalStyles';


export default function Test() {
  return (
    <View style={{ flex: 1 }}>
      <MinorHeader title="Payment" />
      <View style={{ padding: 16 }}>
        <Text>Test Screen (Drawer item)</Text>
      </View>
    </View>
  );
}
