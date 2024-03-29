import React, { useState, useEffect } from 'react';

import { Box, useSafeArea, VStack, HStack, Input, Radio,ScrollView, FormControl } from 'native-base';
import { Image } from 'react-native';
import { Text, TouchableOpacity} from 'react-native';
import { styles } from '../../assets/css/profile/profileStyle';
import DatePicker from 'react-native-datepicker';
import config from '../../config/config';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import ToastHelper from '../Helper/toast';
import Toast from 'react-native-toast-message';
import { translate } from 'react-native-translate';
import { TextInput } from 'react-native-paper';



function ProfileSetting({route, navigation }) {

    const userData  = route.params.userData;

    const [name, setName] = useState(userData.fullname);
    const [email, setEmail] = useState(userData.email);
    const [userId, setUserId] = useState(userData.guid);
    const [phno, setPhno] = useState(userData.ph_no);
    const [gender, setGender] = useState(userData.gender);
    const [image, setImage] = useState('');
    const [isPickupImg,setIsPickupImg] = useState(false);
    const [date, setDate] = useState(userData.dob);   

    const updateProfile = () => {
        if(global.auth == ''){
            global.forceLoginMsg = config.forceLoginMsg
            navigation.navigate('Sign In');
          }else{
            const myData = {
                "fullname": name,
                "email": email,
                "ph_no": phno,
                "dob":date,
                "gender": gender,
                "username": email,                
                "is_reset": "0",
                "status": "1"
            } 
            if(image != '' && image != null){
                myData['profil_pic'] = image;
            }
            const headers = { 
                'Accept' : 'application/json',
                'Authorization' : 'Bearer '+ global.auth,
            }; 

          axios.post(config.baseUrl+'/api/profile/update/'+userId, myData, { headers })
          .then(response => {
            if(response.data.status_code == 200){
                navigation.navigate('Profile');
                // alert(response.data.data.desc);
              }
            console.log(response.data);      
          })    
          .catch((error) => {
            // alert(error);
            ToastHelper.toast(error.message, null, 'error');
            console.log(error);
          });
        }
    }

    const pickImage = async () => {
        setIsPickupImg(true);
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
       
        if (!result.cancelled) {
            const base64_data = await FileSystem.readAsStringAsync(result.uri, { encoding: 'base64' });
            // var base64Icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAwBQTFRF7c5J78kt+/Xm78lQ6stH5LI36bQh6rcf7sQp671G89ZZ8c9V8c5U9+u27MhJ/Pjv9txf8uCx57c937Ay5L1n58Nb67si8tVZ5sA68tJX/Pfr7dF58tBG9d5e8+Gc6chN6LM+7spN1pos6rYs6L8+47hE7cNG6bQc9uFj7sMn4rc17cMx3atG8duj+O7B686H7cAl7cEm7sRM26cq/vz5/v767NFY7tJM78Yq8s8y3agt9dte6sVD/vz15bY59Nlb8txY9+y86LpA5LxL67pE7L5H05Ai2Z4m58Vz89RI7dKr+/XY8Ms68dx/6sZE7sRCzIEN0YwZ67wi6rk27L4k9NZB4rAz7L0j5rM66bMb682a5sJG6LEm3asy3q0w3q026sqC8cxJ6bYd685U5a457cIn7MBJ8tZW7c1I7c5K7cQ18Msu/v3678tQ3aMq7tNe6chu6rgg79VN8tNH8c0w57Q83akq7dBb9Nld9d5g6cdC8dyb675F/v327NB6////AAA...AA/LvB3QAAAMFJREFUeNpiqIcAbz0ogwFKm7GgCjgyZMihCLCkc0nkIAnIMVRw2UhDBGp5fcurGOyLfbhVtJwLdJkY8oscZCsFPBk5spiNaoTC4hnqk801Qi2zLQyD2NlcWWP5GepN5TOtSxg1QwrV01itpECG2kaLy3AYiCWxcRozQWyp9pNMDWePDI4QgVpbx5eo7a+mHFOqAxUQVeRhdrLjdFFQggqo5tqVeSS456UEQgWE4/RBboxyC4AKCEI9Wu9lUl8PEGAAV7NY4hyx8voAAAAASUVORK5CYII=';
            var base64Icon = 'data:image/png;base64,'+base64_data;
            setImage(base64Icon);
            // setProfil_pic(base64Icon);
        }else{
            setIsPickupImg(false);
        }
      };

      function MyDefaultImg({lbl}){
        return (
            <VStack style={styles.defaultImgs} w='100%' h={60} p={5} justifyContent='center' alignItems='center'>
                <Image source={require('../../assets/image/profile/Profile_imgage.png')} style={{width:30,height:30}} alt='default img'/>
            </VStack>
        )
    }      
    const safeAreaProps = useSafeArea({
        safeAreaTop: true,
        pt: 2
      });

    //   const [date, setDate] = useState(new Date());
      const [mode, setMode] = useState('date');
      const [show, setShow] = useState(false);
  
      const onChange = (event, selectedDate) => {
          const currentDate = selectedDate || date;
          setShow(Platform.OS === 'ios');
          var dd = currentDate.getDate();
          var mm = currentDate.getMonth() + 1; //January is 0!
          var yyyy = currentDate.getFullYear();
          var birthdate = yyyy + '-' + mm + '-' + dd;
          setDate(birthdate);
      };


    return (            
        <ScrollView backgroundColor='#fff'>         
            <VStack h={{base: "100%"}} space="5" m='4'>
                <HStack alignItems='center' justifyContent="center">
                    <Box alignItems='center' justifyContent="center">
                        <TouchableOpacity onPress={() => pickImage()}>
                            {userData.profil_pic && isPickupImg ? <Image resizeMode='cover' source={{ uri: image }} alt="profile img" style={styles.profileImg}/>
                            : userData.profil_pic && !isPickupImg ? <Image resizeMode='cover' source={{ uri: config.imageUrl + '/' + userData.profil_pic }} alt="profile img" style={styles.profileImg}/>
                            :<MyDefaultImg lbl='Profile'/>
                            }            
                        </TouchableOpacity>
                        <TouchableOpacity>
                        <Text style={styles.signin} onPress={() =>pickImage()}>{translate('uploadImg')}</Text>
                        </TouchableOpacity>
                    </Box>
                </HStack>
                <FormControl>
                    <TextInput
                        theme={{colors: {primary: '#EC1C24', underlineColor: 'transparent'}}}
                        style={[styles.TextInput, { fontFamily: 'Inter_400Regular'}]}
                        selectionColor='#EC1C24'
                        placeholder={translate('name')}
                        onChangeText={(name) => setName(name)}
                        value={name}
                        arialLabel='Your Name'
                        label={translate('name')}
                        />
                </FormControl>
                <FormControl>
                    <TextInput
                        theme={{colors: {primary: '#EC1C24', underlineColor: 'transparent'}}}
                        style={[styles.TextInput, { fontFamily: 'Inter_400Regular'}]}
                        selectionColor='#EC1C24'
                        label={translate('email')}                        
                        placeholder={translate('email')}
                        onChangeText={(email) => setEmail(email)}
                        value={email}
                        arialLabel='Your Email'
                        />
                </FormControl>
                <FormControl>
                    <TextInput
                        theme={{colors: {primary: '#EC1C24', underlineColor: 'transparent'}}}
                        style={[styles.TextInput, { fontFamily: 'Inter_400Regular'}]}
                        selectionColor='#EC1C24'                        
                        placeholder={translate('mobileNo')}
                        label={translate('mobileNo')}
                        onChangeText={(phno) => setPhno(phno)}
                        value={phno}
                        keyboardType='number-pad'
                        arialLabel='Your mobile'
                        />
                </FormControl>
                <FormControl>
                    <DatePicker
                        style={[styles.datePickerStyle, styles.InputField_2]}
                        date={date}
                        mode="date"
                        placeholder="select date"
                        format="YYYY-MM-DD"
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
                            color: "#A0A0A0"
                            },
                            dateText: {
                            fontSize: 12,
                            }
                        }}
                        onDateChange={(date) => {
                            setDate(date);
                        }}
                    />
                </FormControl>
                <FormControl>
                    <Text>{translate('gender')}</Text>
                    <Radio.Group name="myRadioGroup" value={gender} onChange={nextValue => {setGender(nextValue);}} colorScheme='red'>
                        <HStack space={3}>
                            <Radio value="male" my={1}>
                                {translate('male')}
                            </Radio>
                            <Radio value="female" my={1}>
                                {translate('female')}
                            </Radio>
                        </HStack>
                    </Radio.Group>
                </FormControl>
                <TouchableOpacity style={styles.saveBtn}>
                    <Text style={styles.saveBtnlabel} onPress={() =>updateProfile()}>{translate('save')}</Text>
                </TouchableOpacity>
            </VStack>
             <Toast />
        </ScrollView>
    );
  }

  export default ProfileSetting;