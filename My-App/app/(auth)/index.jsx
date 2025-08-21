
import { useRouter } from 'expo-router';
import { useNavigation, DrawerActions } from '@react-navigation/native';

import { View,SafeAreaView,ImageBackground,KeyboardAvoidingView,
  Pressable,
 TextInput,
 Linking,
 Animated,
  
  Alert, Image, StyleSheet, ActivityIndicator,Platform, Text, Dimensions, ScrollView, Touchable, TouchableOpacity } from 'react-native';


import React, {useState,useRef,useCallback, useEffect, useContext} from 'react';

import { EventRegister } from 'react-native-event-listeners';

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



import LotterViewScreen from '../../src/Screens/LotterViewScreen';


import COLORS  from '../../src/constants/colors';
import { EndPoint } from "../../src/constants/links";
import MinorHeader from '../../src/Headers/MinorHeader';

//import Header from '../../components/Header';
import Header from '../../src/Headers/Header';
import {globalStyles} from '../../src/Styles/GlobalStyles';


const { width, height } = Dimensions.get('window');


const SigninScreen = () => {

  const router = useRouter();

     const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

 const showAlertFunction = (message) => {
    setAlertMessage(message);
    setShowAlert(true);
  };

  const hideAlert = () => {
    setShowAlert(false);
  };



    //const [isPending, setIsPending] = useState(false);
let [fontsLoaded] = useFonts({
    
    'Bold': require('../../assets/fonts/Poppins-Bold.ttf'),
    'Medium': require('../../assets/fonts/Poppins-Medium.ttf'),
    'SemiBold': require('../../assets/fonts/Poppins-SemiBold.ttf'),
    'Regular': require('../../assets/fonts/Poppins-Regular.ttf'),
    'Thin': require('../../assets/fonts/Poppins-Thin.ttf'),
    'Light': require('../../assets/fonts/Poppins-Light.ttf'),
    
    
  
});





  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  //TO MAKE A LOADING MESSAGE ON A BUTTON
  const [isPending, setPending] = useState(false);
    const [secureText, setSecureText] = useState(true);
    const [loading, setLoading] = useState(false);
    const fadeAnim = useState(new Animated.Value(1))[0];

  //const navigation = useNavigation();

  useEffect(() => {
    checkLoggedIn();
  }, []);

  const checkLoggedIn = async () => {
    const token = await AsyncStorage.getItem('userToken');


    if (token) {
      try {
        const userResponse = await axios.get(
          EndPoint + '/Account/user_data/',
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );

        const userData = userResponse.data;
       

      } catch (error) {
        
      }
    }
  };




// const [error, setError] = useState(null);
const [errorMessage, setErrorMessage] = useState('');
const emailRegex = /\S+@\S+\.\S+/;

const handleErrorMessage = (error) => {
    if (error.response) {
      // The request was made and the server responded with an error status code
      // if (error.response.status === 401) {
      //   showAlertFunction('Authentication Error: You are not authorized.');
      // } 
      // else if (error.response.status === 404) {
      //   showAlertFunction('Not Found: The requested resource was not found.');

      // } 
      //else if{
      //   showAlertFunction('An error occurred while processing your request.');
      // }
    }  if (error.message === 'Network Error') {
      setLoading(false);
      setPending(false);
      showAlertFunction('Network issue: please turn on your mobile data and try again');
    } else {
      setLoading(false);
      setPending(false);
      showAlertFunction('An error occurred, please try again.');
    }
  };

  const handleLogin = async () => {
     //setLoading(true);

        // // Start fade animation
        // Animated.timing(fadeAnim, {
        //     toValue: 0.3,
        //     duration: 200,
        //     useNativeDriver: true
        // }).start();

        // // Simulating API Call (3s)
        // setTimeout(() => {
        //     setLoading(false);
        //     Animated.timing(fadeAnim, {
        //         toValue: 1,
        //         duration: 200,
        //         useNativeDriver: true
        //     }).start();
        // }, 3000);
    

    if (!username && !password) {
      //setError('Please fill in all fields correctly');
      showAlertFunction("Please fill in all the information accurately");
       setLoading(false);
      return;
    }

    if (!username) {
     // setError('Please enter your registration username correctly');
      showAlertFunction("Please fill in your username accurately");
      setLoading(false);
      return;
    }

      // Validate email format
  
  // if (!emailRegex.test(email)) {
  //   showAlertFunction("Please enter a valid email address");
  //   return;
  // }

    if (!password) {
      //setError('Please enter your registration password correctly');
      showAlertFunction("Please fill in your password accurately");
      setLoading(false);
      return;
    }
    setPending(true);
     setLoading(true);

    try {
      const response = await axios.post(EndPoint + '/Account/login_user/', {
        username: username,
        password: password,
      });

      const token = response.data.token;
      await AsyncStorage.setItem('userToken', token);
      //navigation.emit('updateUserToken', token);

      // Now, make another request to get user data
      const userResponse = await axios.get(EndPoint + '/Account/user_data/', {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      const userData = userResponse.data;
      // Save user data to AsyncStorage
      await AsyncStorage.setItem('userData', JSON.stringify(userData));

      // Emit the 'updateUserToken' event
      // hii inasaidia kupata a login user token automatically without
      // page refreshing
      EventRegister.emit('updateUserToken', token);

        // Confirm AsyncStorage writes are complete before navigating
    await Promise.all([
      AsyncStorage.getItem('userToken'),
      AsyncStorage.getItem('userData'),
    ]);
   

   console.log("Token Saved:", token);
console.log("UserData Saved:", userData);



      // Pass the userData to Home Stack
      // navigation.replace('MainScreen', { userData });
      // navigation.reset({
      //   index: 0,
      //   routes: [{ name: 'Home Stack' }],
      // });

       // router.push('/');
      // router.replace("/");
      router.replace("/(main)/home");

      setLoading(false);
      setPending(false);


    } catch (error) {
      //setError('Invalid credentials');
      // showAlertFunction("Invalid credentials");
      
      handleErrorMessage(error);
      setPending(false);
      console.log("Error", error);
       setLoading(false);
    }
  };




  const [isPasswordVisible, setPasswordVisible] = useState(false);


    return(

        <>{!fontsLoaded ? (<View/>):(

   
       

    <LinearGradient
  colors={['#134e5e', '#71b280']}
  start={{ x: 0, y: 0 }}
  end={{ x: 1, y: 1 }}
  style={styles.container}
>
  


            <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
                
                {/* Logo & Company Info */}
                <View style={styles.logoContainer}>
                    <Image source={require('../../assets/icon.png')} style={styles.logo} />
                    <Text style={styles.companyName}>AgriHub Tanzania</Text>
                    <Text style={styles.description}>Welcome back! Please log in to continue.</Text>
                </View>

                {/* Username Field */}
                <View style={styles.inputContainer}>
                    <Ionicons name="person-outline" size={20} color="black" style={styles.icon} />
                    <TextInput 
                        style={styles.input} 
                        placeholder="Username"
                        placeholderTextColor="black"
                        value={username}
                        onChangeText={text => setUsername(text)} 
                    />
                </View>

                {/* Password Field */}
                <View style={styles.inputContainer}>
                    <Ionicons name="lock-closed-outline" size={20} color="black" style={styles.icon} />
                    <TextInput 
                        style={styles.input} 
                        placeholder="Password"
                        placeholderTextColor="black"
                        secureTextEntry={secureText}
                        value={password}
                     onChangeText={(text) => setPassword(text)}
                    />
                    <TouchableOpacity onPress={() => setSecureText(!secureText)}>
                        <Ionicons name={secureText ? "eye-off-outline" : "eye-outline"} size={20} color="#fff" />
                    </TouchableOpacity>
                </View>

       


               <Pressable 
              style={{
                flexDirection:'row',
                justifyContent:'space-between',
                alignItems:'center',
                  //backgroundColor:'green',
                  marginTop:50,
                  paddingVertical:10,
                  paddingHorizontal:20,
                  borderRadius:8,
                  color:'white',
                  borderColor:'white',
                  borderWidth:1,
               // backgroundColor:'white'
               marginBottom:20,
              }}
            // onPress={() => navigation.navigate("Buyer Registration")}
             onPress={() => router.push("/signup")} 
             //router.push("/signup"); 

              >
              
                <Text style={[styles.registerLbl,

                  {
                    color:'white',
                    //marginLeft:20,
                  }

                  ]}>You don't have an acccout? | Register here</Text>

                   <Ionicons name='arrow-forward-circle' 
                size={28}
                color='white' 
                style={{
                 // marginTop:70,
                }} 
                
                 />
                
              </Pressable>   



                {/* Login Button */}
                <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                    <Text style={styles.loginText}>Login</Text>
                </TouchableOpacity>
            </Animated.View>

            {/* Loader Overlay */}
            {loading && (
                <View style={styles.loadingOverlay}>
                    <ActivityIndicator size="large" color="#fff" />
                </View>
            )}












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
                    <Text style={globalStyles.alertTitle}>AgriHub Tanzania</Text>
                    <Text style={globalStyles.alertMessage}>{alertMessage}</Text>
                  </View>
                }
              />


      
        </LinearGradient>






  
      



  

         )}</>
    )
}

export default SigninScreen;



const styles = StyleSheet.create({
  container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        width: '85%',
        alignItems: 'center',
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 30,
    },
    logo: {
        width: 80,
        height: 80,
        marginBottom: 10,
        borderRadius:50,
    },
    companyName: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
    },
    description: {
        fontSize: 14,
        color: '#bbb',
        textAlign: 'center',
        marginTop: 5,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#71b280',
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginBottom: 15,
        width: '100%',
         borderColor:'white',
         borederWidth:1,
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: 'black',

    },
    loginButton: {
        // backgroundColor: '#007AFF',
        //backgroundColor: '#0c9b56',
        backgroundColor:'#015d68',
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center',
        width: '100%',
    },
    loginText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    loadingOverlay: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});


