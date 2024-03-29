import React, { useState ,useEffect} from 'react';

import { View, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import {Text} from 'native-base';
import { styles } from '../../../assets/css/ecommerce/addressStyle';
import config from '../../../config/config';
import {Myddl} from '../../Blog/HomeWifi/homeWifiFormItems';
import axios from 'axios';
import { ActivityIndicator } from 'react-native-paper';
import { SwitchOff, SwitchOn } from '../switchComponent';
import { translate } from 'react-native-translate';
import { Prefectureddl } from '../../Blog/HomeWifi/homeWifiFormItems';

function AddAddress({ navigation }) {
  
  const baseUrl = config.baseUrl + '/api/address';
  const [township,setTownship] = useState('');
  const [full_name,setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone,setPhone] = useState('');
  const [postal, setPostal] = useState('');
  const [prefecture,setPrefecture] = useState('');
  const [city,setCity] = useState('');
  const [chome,setChome] = useState('');
  const [building,setBuilding] = useState('');
  const [unit,setUnit] = useState('');
  const [region,setRegion] = useState('');
  const [isDefault,setIsDefault] = useState(0);   

  const [prefectureData,setPrefectureData] = useState(['Prefecture']);
  const [townData,setTownData] = useState(['Township']);

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
      global.forceLoginMsg = config.forceLoginMsg;
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
    console.log('=============== add address data');
    console.log(myData); 
      const headers = { 
        'Accept': 'application/json', 
        'Authorization' : 'Bearer '+ global.auth,
      }

      axios.post(baseUrl, myData, { headers })
      .then(response => {
        if(response.data.status_code === 200){
            navigation.replace('Choose Address');
          }
        console.log(response.data);
      })    
      .catch((error) => {
        console.log(error);
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
      </ScrollView>
    );
  }

  export default AddAddress;