import React, { useState,useEffect } from 'react';

import { View, Switch, ScrollView, TextInput, TouchableOpacity,ActivityIndicator } from 'react-native';
import {Text} from 'native-base';
import { styles } from '../../../assets/css/ecommerce/addressStyle';
import config from '../../../config/config';
import axios from 'axios';
import ToastHelper from '../../Helper/toast';
// import ToastManager, { Toast } from 'toastify-react-native';
import { Myddl } from '../../Blog/HomeWifi/homeWifiFormItems';
import { SwitchOff, SwitchOn } from '../switchComponent';
import { translate } from 'react-native-translate';
import { Prefectureddl } from '../../Blog/HomeWifi/homeWifiFormItems';

function UpdateAddress({route, navigation }) {

  const {detailData} = route.params;  

  const [phone,setPhone] = useState(detailData.phone);  
  const [city,setCity] = useState(detailData.region);
  const [postal, setPostal] = useState(detailData.postal);
  const [isDefault,setIsDefault] = useState(detailData.is_default); 
  const [township,setTownship] = useState(detailData.town); 
  const [full_name,setFullName] = useState(detailData.full_name); 
  const [prefecture,setPrefecture] = useState(detailData.prefecture_id);
  const [chome,setChome] = useState(detailData.ward);
  const [building,setBuilding] = useState(detailData.building);
  const [unit,setUnit] = useState(detailData.room_no);  
  const [townData,setTownData] = useState(['Township']);
  const [prefectureData,setPrefectureData] = useState(['Prefecture']);
  const [region, setRegion] = useState(detailData.region);
 
  const town_baseUrl = config.baseUrl + '/api/town';
  const prefecture_baseUrl = config.baseUrl + '/api/prefecture';

  const getTown = () => {
    axios.get(town_baseUrl)
        .then(response => {  
            setTownData(response.data.data);
        })    
        .catch((error) => {
            console.log(error);
        });
  }

  const getPrefecture = () => {
    axios.get(prefecture_baseUrl)
        .then(response => {   
            setPrefectureData(response.data.data);
        })    
        .catch((error) => {
            console.log(error);
        });
  }

  useEffect(()=>{
    getTown();
    getPrefecture();
  },[])

  const saveAction = () => {
    if(global.auth == ''){
      global.forceLoginMsg = config.forceLoginMsg
      navigation.replace('Sign In');
    }else{

     const myData = {
        "prefecture_id": prefecture,
        "city": city,
        "town": township,
        "ward": chome,
        "building": building,
        "room_no": unit,
        "region": region,
        "phone": phone,
        "full_name": full_name,
        "is_default": isDefault,
        "address_type": "office",
        "is_active": 0
    }

    // console.log('================ my data update ==============');
    // console.log(myData);
      const headers = { 
          'Accept': 'application/json',
          'Authorization' : 'Bearer '+ global.auth,
      }

      const baseUrl = config.baseUrl + '/api/address/'+ detailData.guid;

      console.log(baseUrl);

      axios.put(baseUrl, myData, { headers })
        .then(response => {
          if(response.data.status_code === 200){
              navigation.navigate('My Addresses');
            }
        })    
        .catch((error) => {
          ToastHelper.toast(error, null, 'error');
          alert(error);
        });
      }    
    }
    return (
      <ScrollView>      
        <View style={styles.container}>
          <View style={styles.wrapper}>

            {townData == null ? <ActivityIndicator color='red'/> :
              <Myddl lbl={translate('town')} town={townData} value={township} setSelectedValue={setTownship}/>
            }
            <TextInput
              selectionColor='#EC1C24'
              style={styles.InputField_2}
              placeholder={translate('fullName')}
              onChangeText={(value) =>setFullName(value)}
              value={full_name}
              marginTop={-20}
            />
              <TextInput
              selectionColor='#EC1C24'
              style={styles.InputField_2}
              placeholder={translate('phone')}
              onChangeText={(value) => setPhone(value)}
              value={phone}
            />
            {/* <TextInput
              style={styles.InputField_2}
              placeholder={translate('postal')}
              onChangeText={(value) => setPostal(value)}
              value={postal}
            /> */}

            {prefectureData == null ? <ActivityIndicator color='red'/> :
              <Prefectureddl lbl={translate('prefecture')} town={prefectureData} value={prefecture} setSelectedValue={setPrefecture}/>
            }

            <TextInput
              selectionColor='#EC1C24'
              style={styles.InputField_2}
              placeholder={translate('region')}
              onChangeText={(value) => setRegion(value)}
              value={region}
              marginTop={-20}
            />
            
            <TextInput
              selectionColor='#EC1C24'
              style={styles.InputField_2}
              placeholder={translate('city')}
              onChangeText={(value) => setCity(value)}
              value={city}
            />

            <TextInput
              selectionColor='#EC1C24'
              style={styles.InputField_2}
              placeholder={translate('chome')}
              onChangeText={(value) => setChome(value)}
              value={chome}
            />

            <TextInput
              selectionColor='#EC1C24'
              style={styles.InputField_2}
              placeholder={translate('building')}
              onChangeText={(value) => setBuilding(value)}
              value={building}
            />

            <TextInput
              selectionColor='#EC1C24'
              style={styles.InputField_2}
              placeholder={translate('unitRoom')}
              onChangeText={(value) => setUnit(value)}
              value={unit}
            />            
            
            <View style={styles.addressBottomView}>
              <Text style={{fontFamily:'Inter_500Medium'}}>Set as default Address</Text>
              {isDefault ? <SwitchOn setValue={setIsDefault}/> : <SwitchOff setValue={setIsDefault}/>}
          </View>
          <TouchableOpacity
              style={styles.button}
              onPress={() =>saveAction()}
              ><Text style={[{fontFamily:'Inter_700Bold'},styles.buttonText]}>{translate('save')}</Text>
          </TouchableOpacity >
          </View>
        </View>
         {/* <Toast /> */}
      </ScrollView>
    );
  }
  export default UpdateAddress