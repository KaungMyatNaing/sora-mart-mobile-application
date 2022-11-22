import {Divider, ScrollView, View, HStack, Text} from 'native-base'
import { TouchableOpacity, Image } from 'react-native';
import {DetailsTitle, ImagePart,KeyValuePart,RentFooter, IconAndLbl, MyList,IconAndLblFacilities, RentBtn} from '../detailComponents';
import { useIsFocused } from '@react-navigation/native' // for re-render
import config from '../../../config/config'
import axios from 'axios';
import React,{useState, useEffect} from 'react'
import { ActivityIndicator } from 'react-native'
import HTMLView from 'react-native-htmlview'
import styles from '../../../assets/css/blog/Job/jobDetailsStyle'
import { translate } from 'react-native-translate'
import WebView from 'react-native-webview'

function HouseRentDetails({route,navigation}){
    const {id} = route.params;
    const [rentdata,setRentData]  = useState([]);
    const [rentFavData,setRentFavData] = useState([]);
    const [rentJobSavedData, setRentJobSavedData] = useState([]);
    const [rentCompanyData,setRentCompanyData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isDoRentFav,setIsDoRentFav] = useState(false);
    const [isDoRentSaveJob,setIsDoRenSaveJob] = useState(false);

    var decId = '886022';

    const isFocused = useIsFocused() // for re-render
    useEffect(() => {
       getHouseRentDetail(id);
    }, [isDoRentFav,isDoRentSaveJob,isFocused]);

    const getHouseRentDetail = (id) => {
      if(global.auth != '' && global.auth != null){
        const headers = {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + global.auth,
        }
        const baseUrl = config.baseUrl + '/api/auth/service/detail/' + id;
          axios.get(baseUrl,{headers})
          .then(response => {
            if(response.data.status_code === 200){
              setRentData(response.data.data[0]);
              setRentFavData(response.data.data[0].favourite_service);
              setRentJobSavedData(response.data.data[0].save_job);              
              setRentCompanyData(response.data.data[0].company);
              setLoading(false);
            }
            setLoading(false);
      
          })    
          .catch((error) => {
              setLoading(false);
              console.log(error);
          });
      }else{
        const baseUrl = config.baseUrl + '/api/service/detail/' + id;
          axios.get(baseUrl)
          .then(response => {
            if(response.data.status_code === 200){
              setRentData(response.data.data[0]);
              setRentFavData(respone.data.data[0].favourite_service);
              setRentJobSavedData(response.data.data[0].save_job);
              setRentCompanyData(response.data.data[0].company);
              setLoading(false);
              }
              setLoading(false);
      
          })    
          .catch((error) => {
              setLoading(false);
              console.log(error);
          });
        }
      
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
                setIsDoRenSaveJob(!isDoRentSaveJob);
                console.log(response.data.data.desc);
            })    
            .catch((error) => {
                console.log(error);
            }); 
      } 
    
      const saveJob = (service_id,company_id) => {
        alert(service_id + '/' + company_id);
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
                setIsDoRenSaveJob(!isDoRentSaveJob);
                console.log('save jog');
                console.log(response.data.data.desc);
              })    
              .catch((error) => {
                console.log(error);
              });
        } 
        
      }
    
      const addFav = (service_id,type) => {
        alert('add fav');
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
                  setIsDoRentFav(!isDoRentFav)
                  console.log(response.data.data.desc);
              })    
              .catch((error) => {
                console.log(error);
              });      
        }   
      }

        return(
          loading ? 
            <ActivityIndicator size="large" color="red" justifyContent='center' alignItems='center' style={{height:'100%'}}/> :
            <ScrollView backgroundColor='#fff'>
                <DetailsTitle pdata={rentdata && rentdata}/>
                {/* <ImagePart favCount='200' type={rentdata && rentdata}/> */}
                <Image style={styles.mainImg} source={{uri:config.imageUrl +'/' + rentCompanyData.logo_url}} resizeMode="cover" alt='Image' mt={5}/>

                <HStack justifyContent='flex-end'>
                    <HStack justifyContent='space-evenly' alignItems='flex-start' w={20} style={styles.favAndSaveBtn}>          
                        {rentFavData.length > 0 ?                            
                            <TouchableOpacity onPress={() => removeFav()} >
                                <HStack justifyContent='center'>
                                    <Image alt='fav icon' source={require('../../../assets/image/Blog/FillheartIcon3x.png')} style={{width:25, height:25}}/>
                                    <Text style={{fontFamily:'Inter_400Regular',fontSize:10,color:'#A1A1A1',textAlign:'center'}}>100</Text>
                                </HStack>
                            </TouchableOpacity>                                    
                            :
                            <TouchableOpacity onPress={() => addFav(rentdata.guid,rentdata.type)}>
                                <HStack>
                                    <Image alt='fav icon' source={require('../../../assets/image/Blog/favIcon3x.png')} style={{width:25, height:25}}/>
                                    <Text style={{fontFamily:'Inter_400Regular',fontSize:10,color:'#A1A1A1',textAlign:'center'}}>200</Text> 
                                </HStack>             
                            </TouchableOpacity>
                        }                        

                        {rentJobSavedData.length > 0 ?                            
                            <TouchableOpacity onPress={() => removeJob(rentdata.guid)}>
                                <Image alt='save icon' source={require('../../../assets/image/Blog/filledSaveIcon.png')} style={{width:25, height:25}}/>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={() => saveJob(rentdata.guid,rentdata.company_id)} >
                                <Image alt='save icon' source={require('../../../assets/image/Blog/saveIcon3x.png')} style={{width:25, height:25}}/>            
                            </TouchableOpacity>
                        }
                    </HStack>
                </HStack>
                <KeyValuePart twidth='80%' tkey='Rental Price' value={rentdata && rentdata.price}/>
                {/* <IconAndLbl mt={3}/> */}
                {/* <MyList lbl='Nishi-ku, Yakohoma City,Kanagawa Pref.'/>
                <MyList lbl='1 min walk from Azabu-juban Sta.'/>
                <MyList lbl='Minato-ku, Tokyo / 1LDK / 44.7m2'/> */}
                
                  {/* <HTMLView style={styles.bodyTxt} value={rentdata && rentdata.description}/> */}
                  <View>
                    <WebView
                      nestedScrollEnabled 
                      source={{ uri: 'https://demo.myanmarwebc6.sg-host.com/public/blog_service/'+decId+'/app/description' }} style={{ marginTop: 20, width:'100%', height:500 }} />                  
                  </View>
                {/* <Divider my={2} mt={5} mb={5}/> */}
                {/* <IconAndLblFacilities/> */}
                {/* <MyList lbl='1 Room-Sharehouse'/>
                <MyList lbl='2 Beds, 1 Bath'/>
                <MyList lbl='Air-Con, TV, Washing Machine, Wide Space Kitchen'/> */}
                {/* <MyList lbl='Good Water, Good Electricity'/> */}
                <RentFooter nav={navigation} tour_data = {rentdata}/>
                {rentdata && 
                  <RentBtn lbl={translate('rent')} navigation={navigation} house_data = {rentdata}/>
                }
            </ScrollView>
        )
}
export default HouseRentDetails