import { useRouter } from 'expo-router';
import { useNavigation, DrawerActions } from '@react-navigation/native';

import { StyleSheet,Platform,TextInput,ActivityIndicator,
  Pressable, Text,Animated,ScrollView, View,Image, 
  Button, FlatList,TouchableOpacity,Modal,
  TouchableWithoutFeedback, Keyboard,Dimensions,
  
   
  KeyboardAvoidingView 
   } from 'react-native';
import React, {useState,useRef,useCallback, useEffect, useContext} from 'react';



//import useFetch from '../useFetch';
import { useFonts } from 'expo-font';
import AwesomeAlert from 'react-native-awesome-alerts';

// import theme from '../theme/theme';
// import themeContext from '../theme/themeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {MaterialIcons,Entypo,MaterialCommunityIcons,FontAwesome5, Ionicons,Feather,AntDesign, FontAwesome} from '@expo/vector-icons';


import { useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');


import LotterViewScreen from '../../src/Screens/LotterViewScreen';


import COLORS  from '../../src/constants/colors';
import { EndPoint } from "../../src/constants/links";
import MinorHeader from '../../src/Headers/MinorHeader';

//import Header from '../../components/Header';
import Header from '../../src/Headers/Header';
import {globalStyles} from '../../src/Styles/GlobalStyles';


// const contents = [
//     { id: '1', title: 'Mikopo', image: require('../../assets/tz.jpg') },
//     { id: '2', title: 'Akiba', image: require('../../assets/tz.jpg') },
//     { id: '3', title: 'Bima', image: require('../../assets/tz.jpg') },
//     { id: '4', title: 'Huduma za Kifedha', image: require('../../assets/tz.jpg') },
//     { id: '5', title: 'Malipo', image: require('../../assets/tz.jpg') },
// ];
const contents = [
    { id: '1', title: 'Farmers', icon: 'user-circle-o', screen: '/(main)/Farmers/all-farmers' },
    { id: '2', title: 'Transporters', icon: 'truck', screen: 'All Transporters' },


    { id: '3', title: 'Stake Holders', icon: 'user-md', screen: 'All StakeHolders' },
    { id: '4', title: 'Buyers', icon: 'user', screen: 'All Buyers' }
    
];

const contents2 = [
    
    { id: '1', title: 'Crops', icon: 'apple', screen: 'All Stocks Collection' },
     { id: '2', title: 'My Orders', icon: 'shopping-cart', screen: 'Stocks Collection Orders' },
    { id: '3', title: 'Collectors', icon: 'male', screen: 'All Collectors' },
    
     { id: '4', title: 'Farm Info', icon: 'building-o', screen: 'All Taarifa Za Wakulima' },
       { id: '5', title: 'Transport Loading', icon: 'shopping-cart', screen: 'Transport Loading Orders' },
];




export default function HomeScreen() {

	const router = useRouter();
  const navigation = useNavigation();


  

  let [fontsLoaded] = useFonts({
    
    'Bold': require('../../assets/fonts/Poppins-Bold.ttf'),
    'Medium': require('../../assets/fonts/Poppins-Medium.ttf'),
    'SemiBold': require('../../assets/fonts/Poppins-SemiBold.ttf'),
    'Regular': require('../../assets/fonts/Poppins-Regular.ttf'),
    'Thin': require('../../assets/fonts/Poppins-Thin.ttf'),
    'Light': require('../../assets/fonts/Poppins-Light.ttf'),
    
    
  
});


  const [dateTime, setDateTime] = useState({
    day: '',
    date: '',
    time: '',
  });

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();

      // Days of the week
      const days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ];

      // Formatting time with leading zeros
      const formatTime = (value) => (value < 10 ? `0${value}` : value);

      // Get current day, date, and time
      const day = days[now.getDay()];
      const date = `${now.getDate()}-${now.getMonth() + 1}-${now.getFullYear()}`;
      const time = `${formatTime(now.getHours())}:${formatTime(
        now.getMinutes()
      )}:${formatTime(now.getSeconds())}`;

      setDateTime({ day, date, time });
    };

    // Update every second
    const intervalId = setInterval(updateDateTime, 1000);

    // Cleanup interval on unmount
    return () => clearInterval(intervalId);
  }, []);



// kwaajili ya kupata taarifa za aliyelogin
const [userData, setUserData] = useState({});
  const [userToken, setUserToken] = useState('');

  useEffect(() => {
    AsyncStorage.getItem("userToken").then(token => {
      setUserToken(token)
    })
    fetchUserData();
  }, [userData]);

  const fetchUserData = async () => {
    try {
      const userDataJSON = await AsyncStorage.getItem('userData');
      if (userDataJSON) {
        const parsedUserData = JSON.parse(userDataJSON);
        setUserData(parsedUserData);

        //console.log(parsedUserData);
        //console.log(userDataJSON);
      }
    } catch (error) {
      // console.log(error);
    }
  };


 useEffect(() => {
    checkLoggedIn();


  }, [userToken]);

  const checkLoggedIn = async () => {
    const token = await AsyncStorage.getItem('userToken');
    setUserToken(token);
  };









    const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

 const showAlertFunction = (message) => {
    setAlertMessage(message);
    setShowAlert(true);
  };

  const hideAlert = () => {
    setShowAlert(false);
  };





// Filter contents2 to include item with id '5' only if user is admin or transporter
const filteredContents2 = contents2.filter(item => {
  if (item.id === '5') {
    return userData?.is_admin === true || userData?.is_transporter === true;
  }
  return true; // Allow all other items
});




  return (



    <>{!fontsLoaded ? (<View/>):(



 <LinearGradient colors={['#015d68', '#000']} style={globalStyles.TwinsMicrofinancecontainer}>



  <Header />

   <ScrollView style={globalStyles.TwinsMicrofinancecontainer22} contentContainerStyle={{ flexGrow: 1 }}>


  <View style={globalStyles.TwinsMicrofinanceheader}>
               <View style={globalStyles.TwinsMicrofinanceImageAndText}>
                <Image source={require('../../assets/icon.png')} style={globalStyles.TwinsMicrofinancelogo} />
                  <Text style={globalStyles.TwinsMicrofinanceTarehe}>{dateTime.date}, {dateTime.time} </Text>
            
                </View>
               <View style={globalStyles.TwinsMicrofinanceTextDescAndTarehe}>
               <Text style={globalStyles.TwinsMicrofinanceappTitle}>AgriHub-Tanzania </Text>
                <Text style={globalStyles.TwinsMicrofinanceappDesc}>Technology Driving Farming Forward</Text>
                 </View>

            </View>



            
            {/* First Content List */}
            <View style={globalStyles.TwinsMicrofinancesection}>
                <Text style={globalStyles.TwinsMicrofinancesectionTitle}>Connecting Farmers to Markets, Empowering Growth </Text>
                <Text style={globalStyles.TwinsMicrofinancesectionDesc}>Smart linkage for farmers, buyers, and Transporters</Text>
               <FlatList
                data={contents}
                horizontal
                nestedScrollEnabled
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity 
                        style={globalStyles.TwinsMicrofinancecard} 
                        onPress={() => router.push(item.screen)}
                    >
                        <FontAwesome name={item.icon} 
                        size={60} 
                        color="white" 
                        style={globalStyles.TwinsMicrofinancecardIcon} 
                         />
                        <Text style={globalStyles.TwinsMicrofinancecardTitle}>{item.title}</Text>
                        <Ionicons name="arrow-forward-circle" size={24} color="white" />
                    </TouchableOpacity>
                )}
            />
            </View>

            {/* Second Content List */}
            <View style={globalStyles.TwinsMicrofinancesection}>
                <Text style={globalStyles.TwinsMicrofinancesectionTitle}>Technology Driving Farming Forward</Text>
                <Text style={globalStyles.TwinsMicrofinancesectionDesc}>
                Innovative farming solutions for a better tomorrow
                </Text>
               <FlatList
                data={filteredContents2}
                horizontal
                nestedScrollEnabled
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity 
                        style={globalStyles.TwinsMicrofinancecard2} 
                        onPress={() => router.push(item.screen)}
                    >
                        <FontAwesome name={item.icon} size={60} 
                        color="white" 
                        style={globalStyles.TwinsMicrofinancecardIcon} 
                         />
                        <Text style={globalStyles.TwinsMicrofinancecardTitle}>{item.title}</Text>
                        <Ionicons name="arrow-forward-circle" size={24} color="white" />
                    </TouchableOpacity>
                )}
            />
            </View>




<View style={{
  marginBottom:30,
}}>
  {/*<Text style={{
    color:'white',
  }}>Vuta juu</Text>*/}
</View>










   <AwesomeAlert
                show={showAlert}
                showProgress={false}
                // title="Overdose Stores"
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showCancelButton={false}
                showConfirmButton={true}
                confirmText="OK"
                confirmButtonColor="green"
                onConfirmPressed={hideAlert}
                 confirmButtonStyle={globalStyles.alertButton}
                contentContainerStyle={globalStyles.alertContainer}
                customView={
                  <View style={globalStyles.alertContent}>
                    <Image source={require('../../assets/icon.png')} style={globalStyles.alertImage} />
                    <Text style={globalStyles.alertTitle}>Twins Microfinance</Text>
                    <Text style={globalStyles.alertMessage}>{alertMessage}</Text>
                  </View>
                }
              />


</ScrollView>
          </LinearGradient>




          )}</>


  );
}



const styles = StyleSheet.create({

});