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

function HomeWifiDetails({route,navigation}){

    const pdata = {
        'companyName' : 'Xfinity',
        'favCount' : '100k',
    }
    
    const {id} = route.params;

    const [wData,setWData] = useState([]);

    const [wiFiFavData, setWifiFavData] = useState([]);

    const [wifiJobSavedData, setWifiJobSavedData] = useState([]);

    const [wifiCompanyData, setWifiCompanyData] = useState([]);

    const [loading, setLoading] = useState(true);
 
    const [isDoFav,setIsDoFav] = useState(false);

    const [isDojob,setIsDoJob] = useState(false);

    const isFocused = useIsFocused();
     // for re-render
    useEffect(() => {
        getWifiDetails(id);
    }, [isDoFav,isDojob,isFocused]);

    const getWifiDetails = (id) => {
        const headers = {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + global.auth,
        }
        if(global.auth != '' && global.auth != null){
            const wifiUrl = config.baseUrl + '/api/auth/service/detail/' + id;
            axios.get(wifiUrl,{headers})
            .then(response => {
                if(response.data.status_code === 200){
                    console.log('response services ');
                    // console.log(response);
                    setWData(response.data.data);
                    setWifiFavData(response.data.data[0].favourite_service);
                    console.log('wifi fav data is ');
                    console.log(response.data.data[0].favourite_service);
                    setWifiJobSavedData(response.data.data[0].save_job);
                    setWifiCompanyData(response.data.data[0].company);
                }
                console.log(wData);
                setLoading(false);            
            })    
            .catch((error) => {
                setLoading(false);
                console.log(error);
                ToastHelper.toast(error, null, 'error');
                // alert(error);
            });
        }else{
            const wifiUrl = config.baseUrl + '/api/service/detail/' + id;
            axios.get(wifiUrl)
            .then(response => {
                if(response.data.status_code === 200){
                    setWData(response.data.data);
                    setWifiFavData(response.data.data[0].favourite_service);
                    setWifiJobSavedData(response.data.data[0].save_job);
                    setWifiCompanyData(response.data.data[0].company);
                }
                console.log(wData);
                setLoading(false);            
            })    
            .catch((error) => {
                setLoading(false);
                console.log(error);
                ToastHelper.toast(error, null, 'error');
                // alert(error);
            });
        }
        
    }

    const goWifiRequestForm = ({item}) =>{
        return navigation.navigate('Home Wifi Request Form',{item:item});
    }

    const removeFav = () => {
        alert('remove fav');
        // const addServiceUrl = config.baseUrl + '/api/favourite-service/remove/' + props.id + '/' + props.type;
        //   const headers = { 
        //       'Accept': 'application/json', 
        //       'Authorization' : 'Bearer '+ global.auth,
        //   }
        //   axios.get(addServiceUrl,{ headers })
        //       .then(response => {
        //           setIsDoFav(!isDoFav);
        //           console.log(response.data.data.desc);
        //       })    
        //       .catch((error) => {
        //         console.log(error);
        //       });      
      }
    
      const removeJob = (service_id) => {        
        const removeUrl = config.baseUrl + '/api/save-job/remove/' + service_id;
        const headers = { 
            'Accept': 'application/json', 
            'Authorization' : 'Bearer '+ global.auth,
        }
        axios.get(removeUrl,{ headers })
            .then(response => {
                setIsDoJob(!isDojob);
                console.log(response.data.data.desc);
            })    
            .catch((error) => {
                console.log(error);
            }); 
      } 
    
      const saveJob = (service_id,company_id) => {
                
        if(global.auth == '' || global.auth == null){
          global.forceLoginMsg = config.forceLoginMsg;
          navigation.replace('Sign In');
        }else{
          const saveUrl = config.baseUrl + '/api/save-job/add';
    
          const myData = {
            service_id : service_id,
            company_id : company_id
          };
    
          const headers = { 
              'Accept': 'application/json', 
              'Authorization' : 'Bearer '+ global.auth,
          };
    
          axios.post(saveUrl,myData,{ headers })
              .then(response => {
                setIsDoJob(!isDojob);
                console.log(response.data.data.desc);
              })    
              .catch((error) => {
                console.log(error);
              });
        } 
        
      }
    
      const addFav = (service_id,type) => {
        if(global.auth == '' || global.auth == null){
          global.forceLoginMsg = config.forceLoginMsg;
          navigation.replace('Sign In');
        }else{
          const addServiceUrl = config.baseUrl + '/api/favourite-service/add/' + service_id + '/' + type;
          const headers = { 
              'Accept': 'application/json', 
              'Authorization' : 'Bearer '+ global.auth,
          }
          axios.get(addServiceUrl,{ headers })
              .then(response => {
                  setIsDoFav(!isDoFav);
                  console.log(response.data.data.desc);
              })    
              .catch((error) => {
                console.log(error);
              });      
        }   
      }
    
    const renderItem = ({item}) => {
        return (
            <VStack mt={5}>
                <Text style={styles.title}>{item && item.name}</Text>
                <WifiDescItem desc = {item && item.guid}/>
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
            {wData == null? 
                <ActivityIndicator color='red' height='100%'/> 
            :
            <>
            <VStack>
                <HStack justifyContent='space-between' alignItems='center' mt={1}>
                    <HStack>
                        <Image source={{uri : config.imageUrl + wifiCompanyData.logo_url}} w={6} h={6} resizeMode='contain' alt='logo'/>
                        <Text style={styles.companyName}>{wifiCompanyData && wifiCompanyData.companyName}</Text>
                    </HStack>
                    {/* <SaveAndFav favCount={pdata.favCount}/> */}
                    <HStack justifyContent='space-between' alignItems='flex-start' w={20}>          
                        {wiFiFavData.length > 0 ?                           
                            <TouchableOpacity onPress={() => removeFav()}>
                                <HStack justifyContent='center'>
                                    <Image alt='fav icon' source={require('../../../assets/image/Blog/FillheartIcon3x.png')} style={{width:25,height:25}}/>
                                    <Text style={{fontFamily:'Inter_400Regular',fontSize:10,color:'#A1A1A1',textAlign:'center'}}>200</Text>
                                </HStack>
                            </TouchableOpacity>                                    
                            :
                            <TouchableOpacity onPress={() => addFav(wData[0].guid,wData[0].type)}>
                                 <HStack>
                                    <Image alt='fav icon' source={require('../../../assets/image/Blog/favIcon3x.png')} style={{width:25,height:25}}/>
                                    <Text style={{fontFamily:'Inter_400Regular',fontSize:10,color:'#A1A1A1',textAlign:'center'}}>200</Text> 
                                </HStack> 
                            </TouchableOpacity>
                        }

                        {wifiJobSavedData.length > 0 ?
                            <TouchableOpacity onPress={() => removeJob(wData[0].guid)}>
                                <Image alt='save icon' source={require('../../../assets/image/Blog/filledSaveIcon.png')} style={{width:25,height:25}}/>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={() => saveJob(wData[0].guid,wData[0].company_id)}>
                                <Image alt='save icon' source={require('../../../assets/image/Blog/saveIcon3x.png')} style={{width:25,height:25}}/>
                            </TouchableOpacity>
                        }
                    </HStack>
                </HStack>
            </VStack>
            <FlatList
                data={wData}
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