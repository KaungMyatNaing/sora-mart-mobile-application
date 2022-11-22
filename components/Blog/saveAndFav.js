import {HStack,VStack,Image,Text} from 'native-base'
import {TouchableOpacity} from 'react-native'
import config from '../../config/config';
import axios from 'axios';
import { useEffect, useState } from 'react';


function SaveAndFav(props) { 

  const [isFav, setIsFav] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  
  const myData = {
    service_id : props.id,
    company_id : props.company_id,
  };

  const addAction = () => {

    if(global.auth == '' || global.auth == null){
      global.forceLoginMsg = config.forceLoginMsg;
      navigation.replace('Sign In');
    }else{
      const addServiceUrl = config.baseUrl + '/api/favourite-service/add/' + props.id + '/' + props.type;
      const headers = { 
          'Accept': 'application/json', 
          'Authorization' : 'Bearer '+ global.auth,
      }
      axios.get(addServiceUrl,{ headers })
          .then(response => {
              setIsFav(true);
              console.log(response.data.data.desc);
          })    
          .catch((error) => {
            console.log(error);
          });      
    }   
  }

  const saveAction = () => {

    if(global.auth == '' || global.auth == null){
      global.forceLoginMsg = config.forceLoginMsg;
      navigation.replace('Sign In');
    }else{

      const saveUrl = config.baseUrl + '/api/save-job/add';

      const headers = { 
          'Accept': 'application/json', 
          'Authorization' : 'Bearer '+ global.auth,
      };

      axios.post(saveUrl,myData,{ headers })
          .then(response => {
            setIsSaved(true);
            console.log(response.data.data.desc);
          })    
          .catch((error) => {
            console.log(error);
          });
    } 
    
  }

  // const getFavList = (type) => {
    
  //   if(global.auth == '' || global.auth == null){
  //     // global.forceLoginMsg = config.forceLoginMsg;
  //     // navigation.navigate('Sign In');
  //   }else{
  //     const url = config.baseUrl + '/api/favourite-service/list/' + type;

  //     const headers = { 
  //       'Accept': 'application/json', 
  //       'Authorization' : 'Bearer '+ global.auth,        
  //     }
  //     axios.get(url, { headers })
  //     .then(response => {
  //         setSerData(response.data.data);
  //         // console.log(response.data.data[0].cart_products.length);
  //     })    
  //     .catch((error) => {
  //         // alert("There is no item");
  //         console.log(error);
  //         // navigation.navigate('Home');
  //     });
  //   }
  // }

  // const getSavedList = () => {

  //   if(global.auth == '' || global.auth == null){
  //       global.forceLoginMsg = config.forceLoginMsg;
  //       navigation.replace('Sign In');
  //   }else{
  //       const baseUrl = config.baseUrl + '/api/save-job/list';
  //       const headers = { 
  //           'Accept': 'application/json', 
  //           'Authorization' : 'Bearer '+ global.auth,  
  //       }
  //       axios.get(baseUrl,{headers})
  //           .then(response => {   
  //               setJobData(response.data.data);
  //           })    
  //           .catch((error) => {
  //               console.log(error);
  //               setLoading(false);
  //           });
  //   }
  // }

  // useEffect (()=>{
  //   getFavList('All');
  //   getSavedList();
  // },[]);  

  // useEffect(()=>{
  //   getFavStyle();
  //   getSavedStyle();
  // },[isFav,isSaved])

  // const getFavStyle = () => {

  //   var result = [];
  //     if(serData.length > 0 ){
  //        result = ( serData.filter(serData => serData.guid == props.id));
  //     }
  //     if(result){
  //       console.log('save data is exists');
  //       setIsFav(!isFav);
  //     }
  // }

  // const getSavedStyle = () => {

  //   var result = [];

  //     if(jobData.length > 0 ){
  //        result = ( job_data.filter(jobData => jobData.guid == props.id));
  //     }
  //     if(result){
  //       console.log('job save existed');
  //       setIsSaved(!isFav);
  //     }
  // }


    return (
        <HStack justifyContent='space-between' alignItems='flex-start' w={20}>
          <TouchableOpacity onPress={() => addAction()}>
            {isFav ? <Image alt='fav icon' source={require('../../assets/image/Blog/FillheartIcon3x.png')} w={6} h={6}/>
            : <Image alt='fav icon' source={require('../../assets/image/Blog/favIcon3x.png')} w={6} h={6}/>}
            
          <Text style={{fontFamily:'Inter_400Regular',fontSize:10,color:'#A1A1A1',textAlign:'center'}}>{props.favCount}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => saveAction()}>
            {isSaved ? <Image alt='save icon' source={require('../../assets/image/Blog/filledSaveIcon.png')} w={6} h={6}/>
            : <Image alt='save icon' source={require('../../assets/image/Blog/saveIcon3x.png')} w={6} h={6}/>}
            
          </TouchableOpacity>
        </HStack>
    )
}

export default SaveAndFav;