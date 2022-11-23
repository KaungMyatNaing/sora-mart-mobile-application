import React, { useState,useEffect } from 'react';

import { NativeBaseProvider, Box, useSafeArea, VStack, HStack, Input, Radio } from 'native-base';
import { Text, Image, TouchableOpacity, TextInput } from 'react-native';
import { styles } from '../../assets/css/profile/profileStyle';
import DatePicker from 'react-native-datepicker';
import config from '../../config/config';
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native' // for re-render
import ToastHelper from '../Helper/toast';
import Toast from 'react-native-toast-message';

function ProfileSetting({route,navigation }) {

    const userData = route.params.userData;

    console.log(userData);

    const baseUrl = config.baseUrl + '/api/profile/update/' + userData.guid;

    const [name, setName] = useState(userData.fullname);
    const [email, setEmail] = useState(userData.email);
    const [phone, setPhone] = useState(userData.ph_no);
    const [dob, setDOB] = useState(userData.dob);
    const [gender,SetGender] = useState(userData.gender);
    const [username,setUserName] = useState(userData.email);
    const safeAreaProps = useSafeArea({
        safeAreaTop: true,
        pt: 2
      });

    function changeDateFormat(date){
        let d = String(date).split('-');        
        setDOB(d[2]+'-'+d[1]+'-'+d[0]);
        console.log(dob);
    }

    const saveAction = () => {
    const myData = {
        "fullname":name,
        "email": email,
        "ph_no": phone,
        "status": "1",
        "is_reset": "0",
        "dob": dob,
        "gender": gender,
        "username":username,
        "profil_pic": ""
    }

    console.log(myData);
    const headers = { 
        'Accept': 'application/json',
        'Authorization' : 'Bearer '+ global.auth,
    }
    axios.post(baseUrl, myData, { headers })
        .then(response => {
        if(response.data.status_code === 200){
            navigation.push('Profile');
            }
        })    
        .catch((error) => {
            ToastHelper.toast(error.message, null, 'error');
            // alert(error);
        });
    }

    return (
            <NativeBaseProvider>
            <Box {...safeAreaProps} style={styles.container}>
            <VStack h={{base: "100%"}} space="5" m='4'>
                <HStack alignItems='center' justifyContent="center">
                <Box alignItems='center' justifyContent="center"> 
                    <Image alt="logo" source={require('../../assets/image/temp.png')}  style={styles.logo}/>
                    <TouchableOpacity>
                    <Text style={styles.signin} onPress={() => navigation.push('Sign In')}>Upload Image</Text>
                    </TouchableOpacity>
                </Box>
                </HStack>
                        <Box>
                            <Text>Name</Text>
                            <Input
                                variant="underlined"
                                placeholder='Contact Name'
                                onChangeText={(name) => setName(name)}
                                value={name}
                            />
                        </Box>
                        <Box>
                            <Text>Email</Text>
                            <Input
                                variant="underlined"
                                placeholder='Email'
                                onChangeText={(email) => setEmail(email)}
                                keyboardType='email-address'
                                value={email}
                                />
                        </Box>
                        <Box>
                            <Text>Mobile Number or Email</Text>
                            <Input
                                variant="underlined"
                                placeholder='Contact Number'
                                onChangeText={(phone) => setPhone(phone)}
                                keyboardType='number-pad'
                                value={phone}
                                />
                        </Box>
                        <Box>
                            <Text>Birthday</Text>
                            <DatePicker
                                style={[styles.datePickerStyle, styles.InputField_2]}
                                date={dob}
                                mode="date"
                                placeholder="select date"
                                format="DD-MM-YYYY"                                
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                customStyles={{
                                    dateIcon: {
                                    position: 'absolute',
                                    right: -5,
                                    top: 4,
                                    marginLeft: 0,
                                    },
                                    dateInput: {
                                    borderColor : "gray",
                                    alignItems: "flex-start",
                                    borderWidth: 0,
                                    borderBottomWidth: 1,
                                    },
                                    placeholderText: {
                                    fontSize: 12,
                                    color: "#a0a0a0"
                                    },
                                    dateText: {
                                    fontSize: 14,
                                    }
                                }}
                                onDateChange={(date) => {
                                    changeDateFormat(date);
                                }}
                            />
             </Box>
             <Box>
             <Text>Gender</Text>
             <Radio.Group name="myRadioGroup" value={gender} onChange={nextValue => {SetGender(nextValue);}}
             colorScheme='red'
             >
                 <HStack space={3}>
                <Radio value="male" my={1}>
                    <Text ml={3}>Male</Text>
                </Radio>
                <Radio value="female" my={1}>
                <Text ml={3}>Female</Text>
                </Radio>
                </HStack>
                </Radio.Group>
             </Box>
             <Box alignSelf='baseline'>
             <TouchableOpacity>
                    <Text style = {styles.createAccount} onPress={() => saveAction()}>SAVE</Text>
                </TouchableOpacity>
             </Box>
            </VStack>
            </Box>
             <Toast />
            </NativeBaseProvider>
    );
  }

  export default ProfileSetting;