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
import { Box, HStack,Text,View,ScrollView} from "native-base"
import { TouchableOpacity,FlatList } from "react-native"
import { styles } from "../../assets/css/blog/blogStyle"
import SaveAndFav from "./saveAndFav"
import RenderItem from "./renderItem"
import TabbarMenu from "../layouts/TabberMenu"
import config from '../../config/config'
import {apiGetAuthActionCreator} from '../../backend/ApiActionCreator';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios'; 
import {ActivityIndicator} from 'react-native-paper'
import { useIsFocused } from '@react-navigation/native' // for re-render
import ToastHelper from "../Helper/toast"
import Toast from 'react-native-toast-message';

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

  if(global.service_type == '' || global.service_type == null){
    var service_type = 'All';
  }else{
    var service_type = global.service_type;
  }

  const [type ,setType] = useState(service_type);
  
  const dispatch = useDispatch();
  const data  = useSelector((state) => state.apiReducer.data);
  const loading = useSelector((state) => state.apiReducer.loading);  
  const baseUrl = config.baseUrl + '/api/service/list?type=' + type;

  const baseUrlCart = config.baseUrl + '/api/carts';
  const [cart_product,setCartProduct] = useState('');

  const isFocused = useIsFocused() // for re-render

  useEffect(() => {
      dispatch(apiGetAuthActionCreator(baseUrl,global.auth));
      getCats();
  }, [type,isFocused]);

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

  const getChooseStyle = (choose_type) => {
    if(type == choose_type ){
        return styles.active;
    }else{
        return styles.inactive;
    }
  }

  return (  
      <Box style={{backgroundColor:'#FFF', flex:1}}>
      <View pb={32} mb={22}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} m={3}>
          <HStack mt={3} mb={6} h={10} alignItems='center' justifyContent='center'>
            <TouchableOpacity onPress={()=>setType('All')}>
              <Text style={[{fontFamily:'Inter_500Medium'},getChooseStyle('All')]}>All</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() =>setType('Job')}>
              <Text style={[{fontFamily:'Inter_500Medium'},getChooseStyle('Job')]}>Jobs</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>setType('House')}>
              <Text style={[{fontFamily:'Inter_500Medium'},getChooseStyle('House')]} >House rent</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>setType('Wifi')}>
              <Text style={[{fontFamily:'Inter_500Medium'},getChooseStyle('Wifi')]}>Home Wifi</Text>
            </TouchableOpacity> 
            <TouchableOpacity onPress={()=>setType('Travel')}>
              <Text style={[{fontFamily:'Inter_500Medium'},getChooseStyle('Travel')]}>Travel</Text>
            </TouchableOpacity>            
          </HStack>
      </ScrollView>
      {loading ? (
          <ActivityIndicator color="red" height='50%'/>
        ):(
          <FlatList
              data={data}
              renderItem={({ item }) =>
                <TouchableOpacity  onPress={() => goFunction({item})} >
                    <RenderItem item={item} />
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
       <Toast />
    </Box>

  )
}

export default Blog;

