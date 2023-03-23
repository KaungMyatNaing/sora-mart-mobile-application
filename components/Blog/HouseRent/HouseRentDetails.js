import {Divider, ScrollView, View, HStack, Text} from 'native-base'
import { TouchableOpacity, Image } from 'react-native';
import {DetailsTitle, ImagePart,KeyValuePart,RentFooter, IconAndLbl, MyList,IconAndLblFacilities, RentBtn} from '../detailComponents';
import { useIsFocused } from '@react-navigation/native' // for re-render
import config from '../../../config/config'
import axios from 'axios';
import React,{useState, useEffect} from 'react'
import { ActivityIndicator } from 'react-native'
import HTMLView from 'react-native-htmlview'
import styles from '../../../assets/css/blog/Job/jobDetailsStyle';
import { translate } from 'react-native-translate';
import { savedStore } from '../../store/savedStore'


function HouseRentDetails({route,navigation}){
    
  const { id } = route.params;
  const [savedata, setSaveData] = useState();
  const [loading, setLoading] = useState(false);
  const [saveaction, setSaveAction] = useState(false);
  const [unsaveaction, setUnSaveAction] = useState(false);
  const getSaved = savedStore(state => state.getSaved);
  const savedlist = savedStore(state => state.savedlist);
  const updateSaved = savedStore(state => state.updateSaved);
  const deleteSaved = savedStore(state => state.deleteSaved);
  const isFocused = useIsFocused() // for re-render

  useEffect(() => {
    getHouseRentDetails(id);
}, [isFocused,saveaction,unsaveaction]);
useEffect(() => {
    getSaved();
  },[saveaction,unsaveaction])

    
  const getHouseRentDetails = (id) => {
    if (global.auth !== '' && global.auth != null) {
        setLoading(true);
        fetch(`https://sora-mart.com/api/blog/services/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: global.auth,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setSaveData(data.data)
                console.log(data.data)
                setLoading(false);
            })
            .catch((error) => console.log(error));
    }
}

 

   
const saveJob = (service_id) => {
  if (global.auth == '' || global.auth == null) {
      global.forceLoginMsg = config.forceLoginMsg;
      navigation.replace('Sign In');
  } else {
      fetch(`https://sora-mart.com/api/blog/save-service/${service_id}`, {
          method: "POST",
          headers: {
              'Content-Type': 'application/json',
              Authorization: global.auth,
          },
      })
          .then((response) => response.json())
          .then((data) => {
              console.log(data);
              if (data.status == 200) {
                  updateSaved(service_id);
                  setSaveAction(!saveaction);
                  console.log('Service has been added to your saved list.');
              }
  
 
          })
          .catch((error) => console.log('' + error));
  }
}

const removeJob = (service_id) => {
  if (global.auth == '' || global.auth == null) {
      global.forceLoginMsg = config.forceLoginMsg;
      navigation.replace('Sign In');
  } else {
      fetch(`https://sora-mart.com/api/blog/remove-service/${service_id}`, {
          method: "DELETE",
          headers: {
              'Content-Type': 'application/json',
              Authorization: global.auth,
          },
      })
          .then((response) => response.json())
          .then((data) => {
              console.log(data);
              if (data.status == 200) {
    
                  deleteSaved(service_id);
                  setUnSaveAction(!unsaveaction);
                  console.log('Service has been removed from your saved list.');
              }
  
 
          })
          .catch((error) => console.log('' + error));
  }

}
const checkId =  savedlist.filter((i) => i == id); 
        return(
          <ScrollView backgroundColor='#fff'>
          {savedata && <DetailsTitle pdata={savedata} />}
          {/* <ImagePart favCount='200' type={jobdata}/> */}
      {/*<Image style={styles.mainImg} source={{uri:config.imageUrl +'/' + jobCompanyData.logo_url}} resizeMode="cover" alt='Image' mt={5}/>*/}
       <Image style={styles.mainImg} source={{uri:'https://1.bp.blogspot.com/-hG85Di3-8Co/WCqdqTdvxuI/AAAAAAAA_lE/HFKBj1184Gc2c50Yc35KkNItdaprTWcaACLcB/s180-c/businesscard.png'}}   resizeMode="cover" alt='Image' mt={5}/>
          <HStack justifyContent='flex-end' mr={2}>
              <HStack justifyContent='space-evenly' alignItems='flex-start' w={20} style={styles.favAndSaveBtn}>
              {checkId.length > 0 ?
<TouchableOpacity onPress={() => removeJob(id)}>
                      <Image alt='save icon' source={require('../../../assets/image/Blog/filledSaveIcon.png')} w={6} h={6} />
                     
</TouchableOpacity>
:
<TouchableOpacity onPress={() => saveJob(id)}>
<Image alt='save icon' source={require('../../../assets/image/Blog/saveIcon3x.png')} w={6} h={6}/> 
</TouchableOpacity>}
              </HStack>
          </HStack>
                <KeyValuePart twidth='80%' tkey='Rental Price' value={savedata && savedata.price}/>
                {/* <IconAndLbl mt={3}/> */}
                {/* <MyList lbl='Nishi-ku, Yakohoma City,Kanagawa Pref.'/>
                <MyList lbl='1 min walk from Azabu-juban Sta.'/>
                <MyList lbl='Minato-ku, Tokyo / 1LDK / 44.7m2'/> */}
                <View m={5}>
                  <HTMLView style={styles.bodyTxt} value={savedata && savedata.description}/>
                </View>
                {/* <Divider my={2} mt={5} mb={5}/> */}
                {/* <IconAndLblFacilities/> */}
                {/* <MyList lbl='1 Room-Sharehouse'/>
                <MyList lbl='2 Beds, 1 Bath'/>
                <MyList lbl='Air-Con, TV, Washing Machine, Wide Space Kitchen'/> */}
                {/* <MyList lbl='Good Water, Good Electricity'/> */}
                <RentFooter nav={navigation} tour_data = {savedata}/>
                {savedata && 
                  <RentBtn lbl={translate('rent')} navigation={navigation} house_data = {savedata}/>
                }
            </ScrollView>
        )
}
export default HouseRentDetails