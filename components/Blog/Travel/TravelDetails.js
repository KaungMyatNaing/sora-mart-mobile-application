import React,{useState,useEffect} from 'react'
import {ScrollView, Image,HStack} from 'native-base'
import {DetailsTitle, ImagePart,KeyValuePart,BodyPart,ApplyBtn} from '../detailComponents'
import config from '../../../config/config'
import { ActivityIndicator } from 'react-native'
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native' // for re-render
import { TouchableOpacity,Text } from 'react-native'
import { styles } from '../../../assets/css/blog/Travel/TravelStyle'



function TravelDetails({route,navigation}){
    const {id} = route.params;
    
    const [traveldata,setTravelData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [travelFavData,setTravelFavData] = useState([]);
    const [travelSavedJobData, setTravelSavedJobData] = useState([]);
    const [travelCompanyData,setTravelCompanyData] = useState([]);
    const [isDoTravelFav, setIsDoTravelFav] = useState(false);
    const [isDoTravelSaved, setIsDoTravelSaved] = useState(false);

    const isFocused = useIsFocused() // for re-render
    useEffect(() => {
        getTravelDetails(id);
    }, [isDoTravelFav,isDoTravelSaved,isFocused]);

    const getTravelDetails = () => {
      if(global.auth != '' && global.auth != null){
        const headers = {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + global.auth,
        }
        const travelUrl = config.baseUrl + '/api/auth/service/detail/' + id;
        axios.get(travelUrl, {headers})
        .then(response => {
          if(response.data.status_code === 200){
            setTravelData(response.data.data[0]);  
            setTravelSavedJobData(response.data.data[0].save_job);
            setTravelFavData(response.data.data[0].favourite_service);
            setLoading(false);
            }
            setLoading(false);   
        })    
        .catch((error) => {
            setLoading(false);
            console.log(error);
        });
      }else{
          const travelUrl = config.baseUrl + '/api/service/detail/' + id;
          axios.get(travelUrl)
          .then(response => {
            if(response.data.status_code === 200){
              setTravelData(response.data.data[0]);  
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
                setIsDoTravelSaved(!isDoTravelSaved);
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
                setIsDoTravelSaved(!isDoTravelSaved);
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
                  setIsDoTravelFav(!isDoTravelFav)
                  console.log(response.data.data.desc);
              })    
              .catch((error) => {
                console.log(error);
              });      
        }   
      }


        return(
            loading? 
            <ActivityIndicator size="small" color="red" justifyContent='center' alignItems='center' style={{height:'100%'}}/> :
            <ScrollView backgroundColor='#fff' p={5}>
                <DetailsTitle pdata={traveldata}/>
                {/* <ImagePart favCount='200' type={traveldata}/> */}
                <Image style={styles.mainImg} source={{uri:config.imageUrl +'/' + travelCompanyData.logo_url}} resizeMode="cover" alt='Image' mt={5}/>

                <HStack justifyContent='flex-end'>
                    <HStack justifyContent='space-evenly' alignItems='flex-start' w={20} style={styles.favAndSaveBtn}>          
                        {travelFavData.length > 0 ?                            
                            <TouchableOpacity onPress={() => removeFav()} >
                                <HStack justifyContent='center'>
                                    <Image alt='fav icon' source={require('../../../assets/image/Blog/FillheartIcon3x.png')} w={6} h={6}/>
                                    <Text style={{fontFamily:'Inter_400Regular',fontSize:10,color:'#A1A1A1',textAlign:'center'}}>200</Text>
                                </HStack>
                            </TouchableOpacity>                                    
                            :
                            <TouchableOpacity onPress={() => addFav(traveldata.guid,traveldata.type)}>
                                <HStack>
                                    <Image alt='fav icon' source={require('../../../assets/image/Blog/favIcon3x.png')} w={6} h={6}/>
                                    <Text style={{fontFamily:'Inter_400Regular',fontSize:10,color:'#A1A1A1',textAlign:'center'}}>200</Text> 
                                </HStack>             
                            </TouchableOpacity>
                        }                        

                        {travelSavedJobData.length > 0 ?
                            <TouchableOpacity onPress={() => removeJob(traveldata.guid)}>
                                <Image alt='save icon' source={require('../../../assets/image/Blog/filledSaveIcon.png')} w={6} h={6}/>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={() => saveJob(traveldata.guid,traveldata.company_id)} >
                                <Image alt='save icon' source={require('../../../assets/image/Blog/saveIcon3x.png')} w={6} h={6}/>            
                            </TouchableOpacity>
                        }
                    </HStack>
                </HStack>
                <KeyValuePart tkey='Price' value={traveldata && traveldata.price}/>
                <BodyPart txt={traveldata}/>
                <TouchableOpacity style={styles.btn} onPress={()=>navigation.navigate('Request a Tour',{type:"travel",tour_data:traveldata})}>
                    <Text style={styles.btnLbl}>Request a Tour</Text>
                </TouchableOpacity>
            </ScrollView>
        )

   
}
export default TravelDetails