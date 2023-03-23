import {Divider, ScrollView, Text, VStack, HStack} from 'native-base'
import {WifiDetailsTitle,WifiDescItem,PriceItem} from './homeWifiDetailsItems'
import {FlatList,TouchableOpacity,View,Image} from 'react-native'
import styles from '../../../assets/css/blog/HomeWifi/HomeWifiStyle'
import config from '../../../config/config'
import axios from 'axios'
import React,{useState,useEffect} from 'react'
import { ActivityIndicator } from 'react-native-paper'
import { useIsFocused } from '@react-navigation/native' // for re-render
import ToastHelper from '../../Helper/toast'
import { translate } from 'react-native-translate'
import { savedStore } from '../../store/savedStore'


function HomeWifiDetails({route,navigation}){

    const { id,company_id } = route.params;
    const [savedata, setSaveData] = useState();
    const [loading, setLoading] = useState(false);
    const [saveaction, setSaveAction] = useState(false);
    const [unsaveaction, setUnSaveAction] = useState(false);
    const getSaved = savedStore(state => state.getSaved);
    const savedlist = savedStore(state => state.savedlist);
    const updateSaved = savedStore(state => state.updateSaved);
    const deleteSaved = savedStore(state => state.deleteSaved);
    const isFocused = useIsFocused() // for re-render
    const [wifipackages, setWifiPackages] = useState();

     useEffect(() => {
         getWifiDetails(id);
         getWifiPackages();
}, [isFocused,saveaction,unsaveaction]);
useEffect(() => {
    getSaved();
  },[saveaction,unsaveaction])

    const getWifiDetails = (id) => {
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

    const getWifiPackages = async() => {
        if (global.auth !== '' && global.auth != null) {
           await fetch(`https://sora-mart.com/api/blog/services?type=Wifi`, {
        headers: {
          "Content-Type": "application/json",
         
        }
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status == 200) {
            
           
              setWifiPackages(data.data.services.filter((i, index) => i.company.guid = company_id));
          }
  
        }).catch((error) => {
          console.log(error);
        });
        }
        
    }

    const goWifiRequestForm = ({item}) =>{
        return navigation.navigate('Home Wifi Request Form',{item:item});
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
    
    const renderItem = ({item}) => {
        return (
            <VStack mt={5}>
                <Text style={styles.title}>{item && item.name}</Text>
                <WifiDescItem desc = {item && item.description}/>
                <HStack justifyContent='space-between' alignItems='center' mt='10%'>
                    <PriceItem price={item && item.price} currency='MMK' perType='mo' />
                    <VStack w='50%' alignItems='center'>
                        <TouchableOpacity style={styles.requestBtn} onPress={()=>goWifiRequestForm({item})}>
                            <Text style={styles.requestBtnLbl}>{translate('request')}</Text>
                        </TouchableOpacity>
                    </VStack>
                </HStack>            
                <Divider my={2} mt={10}/>
            </VStack>
        )
    }
    const renderListEmptyComponent = () =>{
        return(
          <View justifyContent='center' alignItems='center'>
            <Text style={{textAlign:'center'}}>
                {translate('noItem')}
            </Text>
        </View>
        );
    }   

    return(
        <VStack p={5} backgroundColor='#fff' height='100%'>
            {savedata == null? 
                <ActivityIndicator color='red' height='100%'/> 
            :
            <>
            <VStack>
                <HStack justifyContent='space-between' alignItems='center' mt={1}>
                    <HStack>
                                {/*<Image source={{ uri: config.imageUrl + wifiCompanyData.logo_url }} w={6} h={6} resizeMode='contain' alt='logo' />*/}
                                <Image style={styles.mainImg} source={{uri:'https://1.bp.blogspot.com/-hG85Di3-8Co/WCqdqTdvxuI/AAAAAAAA_lE/HFKBj1184Gc2c50Yc35KkNItdaprTWcaACLcB/s180-c/businesscard.png'}}   resizeMode="contain" alt='logo'/>
                                <Text style={styles.companyName}>{savedata.company.name && savedata.company.name}</Text>
                    </HStack>
                    {/* <SaveAndFav favCount={pdata.favCount}/> */}
                    <HStack justifyContent='space-between' alignItems='flex-start' w={20}>          
                    {checkId.length > 0 ?
<TouchableOpacity onPress={() => removeJob(id)}>
                      <Image alt='save icon' source={require('../../../assets/image/Blog/filledSaveIcon.png')} w={25} h={25} />
                     
</TouchableOpacity>
:
<TouchableOpacity onPress={() => saveJob(id)}>
<Image alt='save icon' source={require('../../../assets/image/Blog/saveIcon3x.png')} w={25} h={25}/> 
</TouchableOpacity>}
                    </HStack>
                </HStack>
            </VStack>
            <FlatList
                data={wifipackages}
                renderItem={renderItem}
                ListEmptyComponent={renderListEmptyComponent}
                keyExtractor={item => item.guid}        
            />
            </>
            }
             {/* <Toast /> */}
        </VStack>
    )
}
export default HomeWifiDetails