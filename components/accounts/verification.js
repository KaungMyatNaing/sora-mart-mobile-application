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

function VerificationCode({route,navigation}) {
    const email = route.params.email;
    //const auth = route.params.authentication;
    const CELL_COUNT = 5;
    const [value, setValue] = useState('');

    const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });

    const resendAction = () => {
        const resendUrl = config.baseUrl + '/api/verification/resend';
         
        const headers = { 
            'Accept' : 'application/json'
            //'Authorization' : 'Bearer '+ auth,
        }
        const myData = {};
        axios.post(resendUrl, myData, { headers })
        .then(response => {   
            if(response.data.status === 200){
                console.log('resend verification code is success');
                // navigation.replace('Sign In');
            }
        })    
        .catch((error) => {
            ToastHelper.toast(error, error, 'error');
            alert(error);
        });
        // alert('resend');
    }    
    const continueAction = () => {

        const baseUrl = config.baseUrl + '/verify-account';

        const myData = {
            "email" : email,
            "verification_code": value
        }
        const headers = { 
            'Accept' : 'application/json',
            //'Authorization' : 'Bearer '+ auth,
        }
        axios.post(baseUrl, myData, { headers })
        .then(response => {   
            if(response.data.status === 200){
                navigation.replace('Sign In');
            }
        })    
        .catch((error) => {
            ToastHelper.toast(error, error, 'error');
            alert(error);
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
                    <Text>Dont't recieved the PIN?</Text>
                    <TouchableOpacity onPress={() => resendAction()}>
                        <Text style={styles.txtResend}>RESEND</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.verificationBottom}>                
                    <TouchableOpacity p='3' style={styles.signInBtn} onPress={() => continueAction()}>
                        <Text style={styles.signInBtnlabel}>CONTINUE</Text>
                    </TouchableOpacity>
                </View>  
                </ScrollView>                     
            </SafeAreaView>
    )
      
}

export {VerificationCode};
