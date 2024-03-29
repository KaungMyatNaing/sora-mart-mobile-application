// import React,{useState,useEffect} from "react"
// import { Box, HStack,Text,View,ScrollView} from "native-base"
// import { TouchableOpacity,FlatList,ActivityIndicator } from "react-native"
// import { styles } from "../../assets/css/blog/blogStyle"
// import SaveAndFav from "./saveAndFav"
// import RenderItem from "./renderItem"
// // import TabbarMenu from "../layouts/TabbarMenu"
// import config from '../../config/config'
// import {apiGetAuthActionCreator} from '../../backend/ApiActionCreator';
// import {useDispatch, useSelector} from 'react-redux';

// const renderListEmptyComponent = () =>{
//   return(
//     <View style={styles.noNotification}>
//             <Text>
//                 There is no item!
//             </Text>
//         </View>
//   );
// }

// function Blog({navigation}){ 

//   const [type ,setType] = useState('All');
  
//   const dispatch = useDispatch();
//   const data  = useSelector((state) => state.apiReducer.data);
//   const loading = useSelector((state) => state.apiReducer.loading);  
//   const baseUrl = config.baseUrl + '/api/service/list?type=' + type;

//   useEffect(() => {
//       dispatch(apiGetAuthActionCreator(baseUrl,global.auth));
//   }, [type]);

  
//   goFunction=({item})=>{
//     if(item.type == 'job'){
//       return navigation.navigate('Job Details');
//     }else if(item.type == 'rent'){
//       return navigation.navigate('House Rent Details');
//     }else if(item.type == 'wifi'){
//       return navigation.navigate('Home Wifi Details');
//     }
//   }

//   const getChooseStyle = (choose_type) => {
//     if(type == choose_type ){
//         return styles.active;
//     }else{
//         return styles.inactive;
//     }
//   }

//   return (  
//       <Box style={{backgroundColor:'#FFF', flex:1}}>
//       <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} m={3}>
//           <HStack mt={3} mb={6} h={10} alignItems='center' justifyContent='center'>
//             <TouchableOpacity onPress={()=>setType('')}>
//               <Text style={[{fontFamily:'Inter_500Medium'},getChooseStyle('All')]}>All</Text>
//             </TouchableOpacity>
//             <TouchableOpacity onPress={() =>setType('Job')}>
//               <Text style={[{fontFamily:'Inter_500Medium'},getChooseStyle('Job')]}>Jobs</Text>
//             </TouchableOpacity>
//             <TouchableOpacity onPress={()=>setType('House')}>
//               <Text style={[{fontFamily:'Inter_500Medium'},getChooseStyle('House')]} >House rent</Text>
//             </TouchableOpacity>
//             <TouchableOpacity onPress={()=>setType('Wifi')}>
//               <Text style={[{fontFamily:'Inter_500Medium'},getChooseStyle('Wifi')]}>Home Wifi</Text>
//             </TouchableOpacity>            
//           </HStack>
//       </ScrollView>
//       {loading ? (
//           <ActivityIndicator size="large" color="red" justifyContent='center' alignItems='center'/>
//         ):(
//           <FlatList
//               data={data}
//               renderItem={({ item }) =>
//                 <TouchableOpacity  onPress={() => goFunction({item})} >
//                     <RenderItem item={item} />
//                 </TouchableOpacity>}
//               ListEmptyComponent={renderListEmptyComponent}
//               keyExtractor={item => item.guid}        
//           />
//         )
//       }      
//       <View px={3}>
//         {/* <TabbarMenu /> */}
//       </View>
//     </Box>

//   )
// }

// export default Blog;


import React,{useState,useEffect} from "react"
import { Box, HStack,Text,View,ScrollView,VStack,Image} from "native-base"
import { TouchableOpacity,FlatList } from "react-native"
import { styles } from "../../assets/css/blog/blogStyle"
import TabbarMenu from "../layouts/TabberMenu"
import config from '../../config/config'
import axios from 'axios'; 
import {ActivityIndicator} from 'react-native-paper'
import { useIsFocused } from '@react-navigation/native' // for re-render
import Toast from 'react-native-toast-message';
import HTMLView from 'react-native-htmlview';

const renderListEmptyComponent = () =>{
  return(
    <View style={styles.noNotification}>
            <Text>
                {/* There is no item! */}
            </Text>
        </View>
  );
}

function Blog({navigation}){ 

  const [isDoSaveJob,setIsDoSaveJob] = useState(false);
  const [isDoSaveFav,setIsDoSaveFav] = useState(false);
  const [favCount, setFavCount] = useState(200);

  if(global.service_type == '' || global.service_type == null){
    var service_type = 'All';
  }else{
    var service_type = global.service_type;
  }

  const [type ,setType] = useState(service_type);
  
  // const dispatch = useDispatch();
  // const s_data  = useSelector((state) => state.apiReducer.data);
  // const loading = useSelector((state) => state.apiReducer.loading); 

  const blogUrl = config.baseUrl + '/api/service/list?type=' + type;
  const blogAuthUrl = config.baseUrl + '/api/auth/service/list?type=' + type;

  const [s_data,setSData] = useState([]);

  const [loading,setLoading] = useState(true);

  const baseUrlCart = config.baseUrl + '/api/carts';

  const [cart_product,setCartProduct] = useState('');

  const isFocused = useIsFocused() // for re-render

  useEffect(() => {    
    getCats();
}, [type,isFocused]);

useEffect(()=>{
  getBlogs();
},[isDoSaveFav,isDoSaveJob,type,isFocused]);

  const headers = { 
    'Accept': 'application/json', 
    'Authorization' : 'Bearer '+ global.auth,        
  }
  
 const goFunction=({item})=>{
    if(item.type == 'Job'){
      return navigation.navigate('Job Details',{id:item.guid});
    }else if(item.type == 'House'){
      return navigation.navigate('House Rent Details',{id:item.guid});      
    }else if(item.type == 'Wifi'){
      return navigation.navigate('Home Wifi Details',{id:item.guid});
    }else if(item.type == 'Travel'){
      return navigation.navigate('Travel Details',{id:item.guid});
    }
  }

  function getCats() {
    if(global.auth == '' || global.auth == null){
        // global.forceLoginMsg = config.forceLoginMsg;
        // navigation.navigate('Sign In');
    }else{
        axios.get(baseUrlCart, { headers })
        .then(response => {    
          setCartProduct(response.data.data[0].cart_products.length);
            // console.log(response.data.data[0].cart_products.length);
        })    
        .catch((error) => {
            // alert("There is no item");
            console.log(error);
            // navigation.navigate('Home');
        });
    }
}

const getBlogs = () => {
  if(global.auth != '' && global.auth != null ){
    axios.get(blogAuthUrl,{ headers })
      .then(response => {    
        setSData(response.data.data);
        setLoading(false);
      })    
      .catch((error) => {
          console.log(error);
      });
  }else{
    console.log('no auth blog');

    axios.get(blogUrl)
      .then(response => {    
        setSData(response.data.data);
        setLoading(false);
      })    
      .catch((error) => {
          console.log(error);
      });
  }
  
}

  const getChooseStyle = (choose_type) => {
    if(type == choose_type ){
        return styles.active;
    }else{
        return styles.inactive;
    }
  }

  const getChooseTextStyle = (choose_type) => {
    if(type == choose_type ){
        return styles.activeText;
    }else{
        return styles.inactiveText;
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
    //           setIsDoSaveFav(!isDoSaveFav);
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
          setIsDoSaveJob(!isDoSaveJob);
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
            setIsDoSaveJob(!isDoSaveJob);
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
              setIsDoSaveFav(!isDoSaveFav)
              console.log(response.data.data.desc);
          })    
          .catch((error) => {
            console.log(error);
          });      
    }   
  }


  function RenderItem ({services_data}) {

    return(
      <Box mb='5%'>
      <VStack ml={5} mr={5} mb={3}>
        <Text pb={2} style={{fontFamily:'Inter_400Regular',fontSize:11,color:'#A1A1A1'}}>{services_data.created_at}</Text>
        <HStack justifyContent='space-between' alignItems='flex-start' >
          <VStack>
            <Text style={{fontFamily:'Inter_600SemiBold',fontSize:18}}>{services_data.name}</Text>
            {
              services_data.company.length > 0 &&
                <Text style={{fontFamily:'Inter_400Regular',fontSize:13}}>{services_data.company[0].name}</Text>
            }
          </VStack>
          <HStack justifyContent='space-between' alignItems='flex-start' w={20}>          
              {services_data.favourite_service.length > 0 ?
                <TouchableOpacity onPress={() => removeFav()}>
                  <Image alt='fav icon' source={require('../../assets/image/Blog/FillheartIcon3x.png')} w={6} h={6}/>
                </TouchableOpacity>         
              : 
                <TouchableOpacity onPress={() => addFav(services_data.guid,services_data.type)}>
                  <Image alt='fav icon' source={require('../../assets/image/Blog/favIcon3x.png')} w={6} h={6}/>                
                </TouchableOpacity>
              }
              {/* <Text style={{fontFamily:'Inter_400Regular',fontSize:10,color:'#A1A1A1',textAlign:'center'}}>{favCount}</Text> */}

              {services_data.save_job.length > 0 ?
                <TouchableOpacity onPress={() => removeJob(services_data.guid)}>
                  <Image alt='save icon' source={require('../../assets/image/Blog/filledSaveIcon.png')} w={6} h={6}/>
                </TouchableOpacity>
              :
                <TouchableOpacity onPress={() => saveJob(services_data.guid,services_data.company_id)}>
                  <Image alt='save icon' source={require('../../assets/image/Blog/saveIcon3x.png')} w={6} h={6}/>            
                </TouchableOpacity>}
          </HStack>
        </HStack>
        {services_data.salary && <Text pt={3} style={{fontFamily:'Inter_400Regular',fontSize:12,color:'#A1A1A1'}}>Salary-{services_data.salary}</Text>}
        {services_data.price && <Text pt={3} style={{fontFamily:'Inter_400Regular',fontSize:12,color:'#A1A1A1'}}>Price-{services_data.price}</Text>}      
        {/* <Text style={{fontFamily:'Inter_400Regular',fontSize:12,color:'#A1A1A1'}}>{item.description}</Text>      */}
        
        {services_data.description && <HTMLView value={ services_data && services_data.description.substring(0,50)+' ........'}/>}
       
      </VStack>
      {/* <TouchableOpacity> */}
      <Box justifyContent='center' alignContent='center'> 
       <Image resizeMode="cover" style={styles.imgStyle} source={{uri:config.imageUrl +'/'+ services_data.logo_url}} alt="job-img"/>
      </Box>
      {/* </TouchableOpacity> */}
     </Box>
    );
  }

  return (  
    <Box style={{backgroundColor:'#FFF', flex:1}}>
    <View pb={32} mb={22}>
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} m={3}>
        <HStack mt={3} mb={6} h={10} alignItems='center' justifyContent='center'>
          <TouchableOpacity style={getChooseStyle('All')} onPress={()=>setType('All')}>
            <Text style={[{fontFamily:'Inter_500Medium'},getChooseTextStyle('All')]}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity style={getChooseStyle('Job')} onPress={() =>setType('Job')}>
            <Text style={[{fontFamily:'Inter_500Medium'},getChooseTextStyle('Job')]}>Jobs</Text>
          </TouchableOpacity>
          <TouchableOpacity style={getChooseStyle('House')} onPress={()=>setType('House')}>
            <Text style={[{fontFamily:'Inter_500Medium'},getChooseTextStyle('House')]} >House rent</Text>
          </TouchableOpacity>
          <TouchableOpacity style={getChooseStyle('Wifi')} onPress={()=>setType('Wifi')}>
            <Text style={[{fontFamily:'Inter_500Medium'},getChooseTextStyle('Wifi')]}>Home Wifi</Text>
          </TouchableOpacity> 
          <TouchableOpacity style={getChooseStyle('Travel')} onPress={()=>setType('Travel')}>
            <Text style={[{fontFamily:'Inter_500Medium'},getChooseTextStyle('Travel')]}>Travel</Text>
          </TouchableOpacity>            
        </HStack>
    </ScrollView>
    {loading && s_data.length < 0 ? (
        <ActivityIndicator color="red" height='50%'/>
      ):(
        <FlatList
            data={s_data}
            renderItem={({ item }) =>
              <TouchableOpacity  onPress={() => goFunction({item})} >                  
                {item != null &&  
                  <RenderItem services_data={item}/>
                }
              </TouchableOpacity>}
            ListEmptyComponent={renderListEmptyComponent}
            keyExtractor={item => item.guid}        
        />
      )
    }    
    </View>  
    <View style={styles.tab}>
      <TabbarMenu cartCount={cart_product && cart_product != ''? cart_product: ''}/>
    </View>
    {/* <Toast /> */}
  </Box>

)
 
}

export default Blog;

