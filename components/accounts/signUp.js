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

    const baseUrl = config.baseUrl + '/api/createAccount';

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
     if(validator.isEmail(email)){
          const myData = {
            "username": userName,
            "email": email,
            "password": password
          }
          const headers = { 
              'Accept' : 'application/json',
          };      

          axios.post(baseUrl, myData, { headers })
          .then(response => {          
              console.log(response.data.status_code);
              if(response.data.status_code === 200){
                const token = response.data.data.token;
                navigation.replace('Verified Code',{email:email,authentication:token});
              }
          })    
          .catch((error) => {
            ToastHelper.toast(error, null, 'error');
              // alert(error);
              console.log(error);
          });

      }else{
        ToastHelper.toast('Please check your email', null, 'error');
        // alert('Please check your email');
      }      
    }
    
    return (
    <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor:'#FFF'}} height="100%">
      <Toast/>
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
        <TouchableOpacity style={styles.signInBtn} arialLabel="Sign In" onPress={() => CreateAction()}>
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