// import * as React from 'react';
// import { View, Text, Image,TouchableOpacity } from 'react-native';
// import {Box} from 'native-base';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import {styles} from '../../assets/css/accounts/welcomeStyle';
// import AppLoading from 'expo-app-loading';
// import { 
//     useFonts,
//     Inter_100Thin,
//     Inter_200ExtraLight,
//     Inter_300Light,
//     Inter_400Regular,
//     Inter_500Medium,
//     Inter_600SemiBold,
//     Inter_700Bold,
//     Inter_800ExtraBold,
//     Inter_900Black, } from '@expo-google-fonts/inter';
// function Welcome({ navigation }) {
    
//     let [fontsLoaded] = useFonts({
//         Inter_100Thin,
//         Inter_200ExtraLight,
//         Inter_300Light,
//         Inter_400Regular,
//         Inter_500Medium,
//         Inter_600SemiBold,
//         Inter_700Bold,
//         Inter_800ExtraBold,
//         Inter_900Black,
//       });
    
//       if (!fontsLoaded) {
//         return <AppLoading />;
//       }

//       const skipAction = () => {
//         global.auth = '';
//         navigation.navigate('Drawer');
//       }

//     return (
//         <SafeAreaView style={styles.container}>
//             <Box alignItems='flex-end' pr="5" w="100%">
//                 <TouchableOpacity onPress={() => skipAction()}>
//                     <Text style={{ fontFamily: 'Inter_500Medium', color:'#EC1C24'}}>skip for now</Text>
//                 </TouchableOpacity>
//             </Box>
//             <View style={styles.logoContainer}>
//                 <Image source={require('../../assets/image/WelcomeLogo.png')}  style={styles.logo} resizeMode='contain'/>
//             </View>
//             <View style = {styles.headerContainer}>                
//                 <Text style = {[styles.header, { fontFamily: 'Inter_900Black'}]}>Welcome</Text>
                
//                 <Text style = {[styles.pragraph, { fontFamily: 'Inter_400Regular', lineHeight:25}]}>
//                     Sign up to get started and experience great shopping deals
//                 </Text>
//             </View>
//             <View style={styles.btnContainer}>
//                 <TouchableOpacity onPress={() => navigation.push('Sign In')} ariaLable='Sign In'>
//                     <Text style={[styles.signin, { fontFamily: 'Inter_700Bold'}]}>SIGN IN</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity onPress={() => navigation.push('Sign Up')} ariaLable='Create Account'>
//                     <Text style = {[styles.createAccount, { fontFamily: 'Inter_700Bold'}]}>CREATE AN ACCOUNT</Text>
//                 </TouchableOpacity>
//             </View>                        
//         </SafeAreaView>
//     )
      
// }

// export default Welcome;

import React,{useEffect, useState} from "react"
import { View, Text, Image,TouchableOpacity } from 'react-native';
import {Box} from 'native-base';
import { AsyncStorage } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {styles} from '../../assets/css/accounts/welcomeStyle';
import AppLoading from 'expo-app-loading';
import { 
    useFonts,
    Inter_100Thin,
    Inter_200ExtraLight,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black, } from '@expo-google-fonts/inter';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import config from '../../config/config';
import MyDrawer from '../layouts/navDrawer';
import { useIsFocused } from '@react-navigation/native' // for re-render
import ToastHelper from "../Helper/toast";

function Welcome({ navigation }) {
    
    const baseUrl = config.baseUrl + '/api/login';
    const [ user, setUser ] = useState('');
    const [ pass, setPass ] = useState('');
    const [value, setValue] = React.useState("one");
    const [currencyName, setCurrencyName] = React.useState(null);
    const [currencyValue, setCurrencyValue] = React.useState(0);
    const getData = async () => {
        try {
          const data = await AsyncStorage.getItem("userEmail");
          const data2 = await AsyncStorage.getItem("userPassword");
          const res = await AsyncStorage.getItem("currency");
          const result1 = await AsyncStorage.getItem("currency_name");
          const result2 = await AsyncStorage.getItem("currency_value");
          if (data !== null && data2 !== null) {
            setUser(data);
            setPass(data2);
            setValue(res);
            setCurrencyName(result1);
            setCurrencyValue(result2);
            return ;
          }
        } catch (error) {
          console.log(error);
        }
      };
    
      const isFocused = useIsFocused() // for re-render
      useEffect(async ()=>{
              await getData();   
              if (currencyName == null && currencyValue == 0) {
                  AsyncStorage.setItem( "currency_name", 'mmk');
                  AsyncStorage.setItem( "currency_value", '1');
              }  
              if(user != '' && pass != '' ){
              loginAction();
              }
      }, [user, pass, isFocused])
      // user, pass, isFocused

    function loginAction(){
        let myData = '';
            myData = {'mail' : user,'password' : pass};  
        const headers = { 
            'Accept' : 'application/json',
        };      

        axios.post(baseUrl, myData, { headers })
        .then(response => {         
            if(response.data.data.authentication != undefined ){
                global.forceLoginMsg = '';
                global.auth = response.data.data.authentication;
                global.user = response.data.data;
                navigation.replace('Drawer');
            // alert('Login work');

            }
        })    
        .catch((error) => {
            ToastHelper.toast('Login Credentail', null, 'error');
            navigation.navigate('Sign In');
            // console.log(error);
        });
    }

    function signInAction(){
        getData();
        if(user != '' && pass != ''){
            navigation.replace('Drawer');
        }else{
            navigation.navigate('Sign In');
        }

    }
      

    let [fontsLoaded] = useFonts({
        Inter_100Thin,
        Inter_200ExtraLight,
        Inter_300Light,
        Inter_400Regular,
        Inter_500Medium,
        Inter_600SemiBold,
        Inter_700Bold,
        Inter_800ExtraBold,
        Inter_900Black,
      });
    
      if (!fontsLoaded) {
        return <AppLoading />;
      }

      const skipAction = () => {
        global.auth = '';
        navigation.navigate('Drawer');
      }

    if(global.auth == '' || global.auth == null){
        return (
            <SafeAreaView style={styles.container}>
                 <Toast />
                <Box alignItems='flex-end' pr="5" w="100%">
                    <TouchableOpacity onPress={() => skipAction()}>
                        <Text style={{ fontFamily: 'Inter_500Medium', color:'#EC1C24'}}>skip for now</Text>
                    </TouchableOpacity>
                </Box>
                <View style={styles.logoContainer}>
                    <Image alt="welcome logo" source={require('../../assets/image/WelcomeLogo.png')}  style={styles.logo} resizeMode='contain'/>
                </View>
                <View style = {styles.headerContainer}>                
                    <Text style = {[styles.header, { fontFamily: 'Inter_900Black'}]}>Welcome</Text>
                    
                    <Text style = {[styles.pragraph, { fontFamily: 'Inter_400Regular', lineHeight:25}]}>
                        Sign up to get started and experience great shopping deals
                    </Text>
                </View>
                <View style={styles.btnContainer}>
                    <TouchableOpacity onPress={() => signInAction()} ariaLable='Sign In'>
                        <Text style={[styles.signin, { fontFamily: 'Inter_700Bold'}]}>SIGN IN</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Sign Up')} ariaLable='Create Account'>
                        <Text style = {[styles.createAccount, { fontFamily: 'Inter_700Bold'}]}>CREATE AN ACCOUNT</Text>
                    </TouchableOpacity>
                </View>                        
            </SafeAreaView>
        ) 
    }else{
        return(
            <MyDrawer/>
        )
    }     
}

export default Welcome;
