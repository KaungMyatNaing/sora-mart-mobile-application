import {ScrollView,Image,Text,HStack, VStack} from 'native-base'
import {TouchableOpacity} from 'react-native'
import {DetailsTitle, ImagePart,KeyValuePart,BodyPart,ApplyBtn} from '../detailComponents'
import config from '../../../config/config'
import React,{useState,useEffect} from 'react'
import { ActivityIndicator } from 'react-native'
import styles from '../../../assets/css/blog/Job/jobDetailsStyle'
import axios from 'axios'
import { useIsFocused } from '@react-navigation/native' // for re-render

function JobDetails({route, navigation}){

    const {id} = route.params;
    console.log('id is ' + id);
    const [jobdata, setJobData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [jobFavData, setJobFavData] = useState([]);
    const [jobSavedData, setJobSavedData] = useState([]);
    const [jobCompanyData, setJobCompanyData] = useState([]);
    const [isDoJobFav,setIsDoJobFav] = useState(false);
    const [isDoJobSaved,setIsDoJobSaved] = useState(false);

    const isFocused = useIsFocused() // for re-render
    useEffect(() => {
        getJobDetails(id);
    }, [isDoJobSaved,isDoJobFav,isFocused]);

    const getJobDetails = (id) => {
        if(global.auth !== ''  && global.auth != null){

            const headers = {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + global.auth,
              }
            
            const job_url = config.baseUrl + '/api/auth/service/detail/' + id;
            setLoading(true);
            axios.get(job_url, {headers})
                .then(response => {
                if(response.data.status_code === 200){
                    console.log('job data is');
                    console.log(response.data);
                    setJobData(response.data.data[0]);
                    setJobFavData(response.data.data[0].favourite_service);
                    setJobSavedData(response.data.data[0].save_job);
                    setJobCompanyData(response.data.data[0].company);
                    }
                    setLoading(false);   
                })    
                .catch((error) => {
                    setLoading(false);
                    console.log(error);
                    console.log('error auth services');
                });
        }else{
            const job_url = config.baseUrl + '/api/service/detail/' + id;
            setLoading(true);
            axios.get(job_url)
                .then(response => {
                if(response.data.status_code === 200){
                    console.log('job data is');
                    console.log(response.data);
                    setJobData(response.data.data[0]);
                    setJobFavData(response.data.data[0].favourite_service);
                    setJobSavedData(response.data.data[0].save_job);
                    setJobCompanyData(response.data.data[0].company);
                    }
                    setLoading(false);   
                })    
                .catch((error) => {
                    setLoading(false);
                    console.log(error);
                    console.log('error auth services');
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
        //           setIsDoJobFav(!isDoJobFav);
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
                setIsDoJobSaved(!isDoJobSaved);
                console.log(response.data.data.desc);
            })    
            .catch((error) => {
                console.log(error);
            }); 
      } 
    
      const saveJob = (service_id,company_id) => {
        alert('save job');
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
                setIsDoJobSaved(!isDoJobSaved);
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
                    setIsDoJobFav(!isDoJobFav);
                    console.log(response.data.data.desc);
              })    
              .catch((error) => {
                    console.log(error);
              });      
        }   
      }


        if(jobdata != null){
            return(
                loading ? 
                <ActivityIndicator size="small" color="red" justifyContent='center' alignItems='center' style={{height:'100%'}}/> :
                <ScrollView backgroundColor='#fff'>
                    <DetailsTitle  pdata={jobdata}/>
                    {/* <ImagePart favCount='200' type={jobdata}/> */}
                    <Image style={styles.mainImg} source={{uri:config.imageUrl +'/' + jobCompanyData.logo_url}} resizeMode="cover" alt='Image' mt={5}/>
                    <HStack justifyContent='flex-end'>
                        <HStack justifyContent='space-evenly' alignItems='flex-start' w={20} style={styles.favAndSaveBtn}>          
                            {jobFavData.length > 0 ?                            
                                <TouchableOpacity onPress={() => removeFav()} >
                                    <HStack justifyContent='center'>
                                        <Image alt='fav icon' source={require('../../../assets/image/Blog/FillheartIcon3x.png')} w={6} h={6}/>
                                        <Text style={{fontFamily:'Inter_400Regular',fontSize:10,color:'#A1A1A1',textAlign:'center'}}>200</Text>
                                    </HStack>
                                </TouchableOpacity>                                    
                                :
                                <TouchableOpacity onPress={() => addFav(jobdata.guid,jobdata.type)}>
                                    <HStack>
                                        <Image alt='fav icon' source={require('../../../assets/image/Blog/favIcon3x.png')} w={6} h={6}/>
                                        <Text style={{fontFamily:'Inter_400Regular',fontSize:10,color:'#A1A1A1',textAlign:'center'}}>200</Text> 
                                    </HStack>             
                                </TouchableOpacity>
                            }                        
    
                            {jobSavedData.length > 0 ?                               
                                <TouchableOpacity onPress={() => removeJob(jobdata.guid)}>
                                    <Image alt='save icon' source={require('../../../assets/image/Blog/filledSaveIcon.png')} w={6} h={6}/>
                                </TouchableOpacity>
                                :
                                <TouchableOpacity onPress={() => saveJob(jobdata.guid,jobdata.company_id)} >
                                    <Image alt='save icon' source={require('../../../assets/image/Blog/saveIcon3x.png')} w={6} h={6}/>            
                                </TouchableOpacity>
                            }
                        </HStack>
                    </HStack>
                    <KeyValuePart tkey='Salary' value={jobdata.salary}/>
                    <BodyPart txt={jobdata}/>
                    <ApplyBtn lbl='APPLY' mtValue='30%' navigation={navigation} service_id = {id}/>
                </ScrollView>
            )
        }else{
            return(
                <ActivityIndicator color='red'/>
            )
        }

   
}
export default JobDetails