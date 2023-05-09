import React, { useState } from 'react';
import { View, Text, ScrollView,  TextInput, TouchableOpacity } from 'react-native';
import { styles } from '../../assets/css/accounts/signInStyle'
import { Box } from "native-base"
import AppLoading from 'expo-app-loading';
import config from '../../config/config';
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native' // for re-render
import validator from 'validator';
import ToastHelper from '../Helper/toast';
import Toast from 'react-native-toast-message';
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

function SignUp({ navigation }) {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  const [btnlock, setBtnLock] = useState(false);
    const baseUrl = config.baseUrl + '/register';

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
  const CreateAction = () => {
    setBtnLock(true);
     if(validator.isEmail(email)){
          const myData = {
            "fullname": userName,
            "email": email,
            "password": password,
            "referral_code" : null
          }
          const headers = { 
              'Accept' : 'application/json',
          };      
       console.log(myData);
          fetch(`https://sora-mart.com/api/register?fullname=${myData.fullname}&email=${myData.email}&password=${myData.password}`, {
            method: "POST", // or 'PUT'
            headers: {
              "Content-Type": "application/json",
            },
         
          })
            .then((response) => response.json())
            .then((data) => {
              console.log(data)
              if (data.status == 200) {
                setBtnLock(false);
                Toast.show({
                  position: 'top',
                  type: 'info',
                  text1: "Your account has been successfully created. We sent an OTP code to your email address to verify your account."
              })
                   
                  //
                  navigation.push("Verified Code",{email:email});
              } else {
                setBtnLock(false);
                Toast.show({
                  position: 'top',
                  type: 'info',
                  text1: 'Your Email is already taken.'
              })
                }
                
            })
            .catch((error) => {
              setBtnLock(false);
             
                Toast.show({
                  position: 'top',
                  type: 'error',
                  text1: "Please check your input."
              })
             
            });

     } else {
      setBtnLock(false);
        Toast.show({
          position: 'top',
          type: 'error',
          text1: "Please check your Email Address."
      })
      }      
    }
    
    return (
    <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor:'#FFF'}} height="100%">
       
        <Toast ref={(ref) => {Toast.setRef(ref)} } />
      <Box style={styles.container} py="3">
      <View>
        <View style={styles.wrapper}>
        <Text style={[styles.header, { fontFamily: 'Inter_700Bold'}]}>Create Your Account</Text>
        <Text>Shop with us, See more opportunity products</Text>

        <TextInput
          style={[styles.InputField, { fontFamily: 'Inter_500Medium'}]}
          placeholder='User Name' arialLabel='Your Name'
          onChangeText={(userName) => setUserName(userName)}
          value={userName}
        />
        <TextInput
          style={[styles.InputField_2, { fontFamily: 'Inter_500Medium'}]}
          placeholder='Email' arialLabel='Your Email' keyboardType="email-address"
          onChangeText={(email) => setEmail(email)}
          value={email}
        />
         <TextInput
          style={[styles.InputField_2, { fontFamily: 'Inter_500Medium'}]}
          placeholder='Password' secureTextEntry={true} arialLabel='Your Password'
          onChangeText={(password) => setPassword(password)}
          value={password}
        />
        </View> 
      </View>
      <View style={[styles.buttonContainer, { fontFamily: 'Inter_500Medium'}]}>
      <Box width="100%" px="3.5" justifyContent="center" alignItems="center">
              <TouchableOpacity style={btnlock ? styles.signInBtnOff : styles.signInBtn} arialLabel="Sign In" disabled={btnlock} onPress={() => CreateAction()} disabled={btnlock}>
          <Text style={styles.signInBtnlabel}>CREATE AN ACCOUNT</Text>
        </TouchableOpacity>
      </Box>            
        <View style={styles.bottomView}>
            <Text style={[styles.bottomViewText, { fontFamily: 'Inter_400Regular'}]}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.push('Sign In')}>
              <Text style={{color: '#ec1c24', fontFamily: 'Inter_500Medium'}}>Sign In</Text>
            </TouchableOpacity>
        </View>
      </View>
    </Box>
  </ScrollView>
);
}
export default SignUp;