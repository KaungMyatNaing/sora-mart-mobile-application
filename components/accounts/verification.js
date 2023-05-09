import React,{useState} from 'react';
import { View, Text, Image,TouchableOpacity,ScrollView } from 'react-native';
import {styles} from '../../assets/css/accounts/signInStyle';

import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
  } from 'react-native-confirmation-code-field';
import { SafeAreaView } from 'react-native-safe-area-context';
import config from '../../config/config';
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native' // for re-render
import ToastHelper from '../Helper/toast';
import Toast from 'react-native-toast-message';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { useEffect } from 'react';

function VerificationCode({route,navigation}) {
    const email = route.params.email;
    //const auth = route.params.authentication;
    const CELL_COUNT = 5;
    const [btnlock, setBtnLock] = useState(false);
    const [linkbtnlock, setLinkBtnLock] = useState(false);
    const [locktimer, setLockTimer] = useState(false);
    const [timer, setTimer] = useState(5);

    const [value, setValue] = useState('');

    const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });
    

    const resendAction = () => {
        setLinkBtnLock(true);

        fetch(`https://sora-mart.com/api/resend-verify-code?email=${email}`, {
            method: "POST", // or 'PUT'
            headers: {
              "Content-Type": "application/json",
            },
           
          })
            .then((response) => response.json())
            .then((data) => {
                console.log("Success:", data);
              if (data.status == 200) {
                setLinkBtnLock(true);
                console.log("OTP Code resend success.")
                }
                setLockTimer(true);

                //timerInterval = setInterval(() => {
                //    setTimer(timer - 1)
                //    
                //}, 1000);
                
                setTimeout(() => {
                    setLinkBtnLock(false);
                    setLockTimer(false);
                }, 5000);
                
            
              
            })
            .catch((error) => {
              setLinkBtnLock(false);
                   
               
             
            });
    }    
    const continueAction = () => {
       
            setBtnLock(true);
       

            const myData = {
                "email": email,
                "verification_code": value
            }
            const headers = {
                'Accept': 'application/json',
                //'Authorization' : 'Bearer '+ auth,
            }

            fetch(`https://sora-mart.com/api/verify-account?verification_code=${myData.verification_code}&email=${myData.email}`, {
                method: "POST", // or 'PUT'
                headers: {
                    "Content-Type": "application/json",
                },
           
            })
                .then((response) => response.json())
                .then((data) => {
                
                    if (data.status == 200) {
                        setBtnLock(false);
                        global.auth = data.token;
                        navigation.replace('Drawer');
                    }
                    if (data.status == 400) {
                        setBtnLock(false);
                    
                    }

                
            
              
                })
                .catch((error) => {
                    setBtnLock(false);
                   
               
             
                });
      
        
   
    }

    return (
            <SafeAreaView style={styles.verificationContainer}>
                 <Toast />
                <ScrollView>
                <View style={styles.verificationTop}>
                    <Image alt='verification' source={require('../../assets/image/Verification.png')} resizeMode='contain'  style={styles.verificationLogo}/>
                </View>
                <View style = {styles.verificationMiddle}>                
                    <Text style = {styles.verificationHeader}>Verification</Text>                
                    <Text style = {styles.verificationP}>A 5-Digit PIN has been sent to your</Text>
                    <Text> Email {email}. Enter it below to continue.</Text>               
                </View>
                <View style = {styles.verificationMiddle2}>
                <CodeField
                    ref={ref}
                    {...props}
                    value={value}
                    onChangeText={setValue}
                    cellCount={CELL_COUNT}
                    rootStyle={styles.codeFieldRoot}
                    keyboardType="number-pad"
                    textContentType="oneTimeCode"
                    renderCell={({index, symbol, isFocused}) => (
                    <Text
                        key={index}
                        style={[styles.cell, isFocused && styles.focusCell]}
                        onLayout={getCellOnLayoutHandler(index)}>
                        {symbol || (isFocused ? <Cursor /> : null)}
                    </Text>
                    )}
                />
                </View>
                <View style={styles.verificationMiddle3}>
                    <Text>{locktimer ? null : `Dont't recieved the PIN?`}</Text>
                    <TouchableOpacity disabled={linkbtnlock} onPress={() => resendAction()}>
                        <Text style={styles.txtResend} >{locktimer ? `Please wait 5 seconds.` : `Resend`}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.verificationBottom}>                
                    <TouchableOpacity p='3'style={btnlock ? styles.signInBtnOff : styles.signInBtn} disabled={btnlock} onPress={() => continueAction()}>
                        <Text style={styles.signInBtnlabel}>CONTINUE</Text>
                    </TouchableOpacity>
                </View>  
                </ScrollView>                     
            </SafeAreaView>
    )
      
}

export {VerificationCode};
