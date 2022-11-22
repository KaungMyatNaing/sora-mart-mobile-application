import React,{useEffect, useState} from "react"
import { Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import { Box, HStack, ScrollView, FlatList,useSafeArea, VStack, Image, View } from "native-base"
import { styles } from '../../assets/css/layouts/homeStyle';
import config from "../../config/config";
import {useDispatch, useSelector} from 'react-redux';
import {apiGetMultipleActionCreator} from '../../backend/ApiActionCreator';
import axios from 'axios';
import { AsyncStorage } from 'react-native';

// import { useIsFocused } from '@react-navigation/native' // for re-render
function ShowMoreFav ({route, navigation}) {
  const dispatch = useDispatch();
  const baseUrl = config.baseUrl;
  const product_baseUrl = config.baseUrl + '/api/products';
  const [product,setProduct] = useState(null);
  const [loading,setLoading] = useState(false);
  const [value, setValue] = useState("one");
  const [currencyName, setCurrencyName] = useState();
  const [currencyValue, setCurrencyValue] = useState(0);
  const [extra, setExtra] = useState(0);
  const [isWishList, setIsWishList] = useState(false);  

  const [image,setImage] = useState('');

  const safeAreaProps = useSafeArea({
    safeAreaTop: true,
    pt: 2
  });

  // const getData = async () => {
  //   try {
  //     const res = await AsyncStorage.getItem("currency");
  //     const result1 = await AsyncStorage.getItem("currency_name");
  //     const result2 = await AsyncStorage.getItem("currency_value");
  //     if (res !== null && result1 !== null && result2 !== null) {
  //       setValue(res);
  //       setCurrencyName(result1);
  //       setCurrencyValue(result2);
  //       // alert(res);
  //       setExtra(extra + 1);
  //       return ;
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const getCurrency = ( ) => {
  //   const myData = {
  //     // "product_id": item,
  //   }
  //   const headers = { 
  //       'Accept' : 'application/json',
  //       'Authorization' : 'Bearer '+ global.auth,
  //   }; 
  //   axios.get(config.baseUrl+'/api/exchange-rates', myData, { headers })
  //   .then(response => {

  //     response.data.data.map((data) =>  
  //     data.currency == 'JPY' ? AsyncStorage.setItem( "currency_name", data.currency.toString()) : ''
  //     )
  //     response.data.data.map((data) =>  
  //     data.currency == 'JPY' ? AsyncStorage.setItem( "currency_value", data.rate.toString()) : ''
  //     )    
  //   })    
  //   .catch((error) => {
  //     console.log(error);
  //   });
  // } 

  const getFavouriteProduct = () => {
    setLoading(true);
    const headers = { 
        'Accept' : 'application/json',
        'Authorization' : 'Bearer '+ global.auth,
    };
    if(global.auth != '' && global.auth != null){
      const auth_fav_product_baseUrl = config.baseUrl + '/api/auth/products/get-list/most-popular-products?page=1&limit=15&orderBy=desc';
      axios.get(auth_fav_product_baseUrl,{headers})
          .then(response => {   
            setProduct(response.data.data);
            setLoading(false);

          })    
          .catch((error) => {
              console.log(error);
              setLoading(false);

          });
    }else{
      const Fav_product_baseUrl = config.baseUrl + '/api/products/get-list/most-popular-products?page=1&limit=15&orderBy=desc';
      axios.get(Fav_product_baseUrl)
          .then(response => {   
            setProduct(response.data.data);
            setLoading(false);

          })    
          .catch((error) => {
              console.log(error);
              setLoading(false);
          });
    }
  }

  useEffect(async()=>{
    // await getData();
    // await getCurrency();
    await getFavouriteProduct();
  },[isWishList])
  
  const setWishList = (item) => {
    if(global.auth == ''){
      global.forceLoginMsg = config.forceLoginMsg
      // navigation.navigate('Sign In');
    }else{
      const myData = {
        "product_id": item,
      }
      const headers = { 
          'Accept' : 'application/json',
          'Authorization' : 'Bearer '+ global.auth,
      }; 
      axios.post(baseUrl+'/api/wish-lists', myData, { headers })
      .then(response => {
        if(response.data.status_code === 200){
            setIsWishList(!isWishList);            
          }
      })    
      .catch((error) => {
        console.log(error);
      });
    }
  }

  const removeWishList = (remove_id) => {
    const removeUrl = config.baseUrl + '/api/wish-lists/remove/' + remove_id;
    const headers = { 
        'Accept': 'application/json', 
        'Authorization' : 'Bearer '+ global.auth,
    }
    axios.get(removeUrl,{ headers })
        .then(response => {
            setIsWishList(!isWishList);
            console.log(response.data.data.desc);
        })    
        .catch((error) => {
        console.log(error);
        }); 
  }
 
  const productsRenderItems=({item})=>{
    return(
      <TouchableOpacity onPress={() => navigation.navigate('Product Details',{item:item})}>
        <Box mr={3} my={3}>            
          <Box style={styles.ImgContainer} alignItems="center" justifyContent="center">
              {item.wishlist.length > 0 ? 
                <TouchableOpacity onPress={() => removeWishList(item.id)} style={styles.whishListWrap}>
                  <View>
                    <Image alt="wishlist" source={require('../../assets/image/Blog/filledheart.png')} resizeMode='contain' w={6} h={6} />
                  </View>
                </TouchableOpacity> : 
                <TouchableOpacity onPress={() => setWishList(item.id)} style={styles.whishListWrap}>
                  <View>
                    <Image alt="wishlist" source={require('../../assets/image/Blog/favIcon3x.png')} resizeMode='contain' w={6} h={6} />
                  </View>
                </TouchableOpacity>
              } 
              {/* {item.product_pictures == null ? 
              <Image alt="product img" source={{ uri: ''}} style={styles.productImg} resizeMode='contain'/>
              : <Image alt="product img" source={{ uri: baseUrl +'/'+ item.product_pictures[0].image_url }} style={styles.productImg} resizeMode='contain'/>}
               */}
               {item.product_pictures[0] == undefined ? null :
              <Image alt="product img" source={{ uri: config.imageUrl +'/'+ item.product_pictures[0].image_url }} style={styles.productImg}/>}
          </Box>
          <Box mt="3">
          <Text style={[{fontFamily:'Inter_500Medium'},styles.label]}>{item.name}</Text>
          {item.price && 
            <HStack justifyContent='flex-start' alignItems='center'>
                <Text style={[{fontFamily:'Inter_600SemiBold'},styles.priceMMK]}>JPY</Text>    
                <Text style={[{fontFamily:'Inter_600SemiBold'},styles.price]}>{item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
            </HStack>
          }
            
          {item.price_mm && 
            <HStack justifyContent='flex-start' alignItems='center'>
                <Text style={[{fontFamily:'Inter_600SemiBold'},styles.priceMMK]}>MMK</Text>    
                <Text style={[{fontFamily:'Inter_600SemiBold'},styles.price]}>{item.price_mm.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
            </HStack>
          }
          {/* <HStack justifyContent='flex-start' alignItems='center'>
                <Text style={[{fontFamily:'Inter_600SemiBold'},styles.priceMMK]}>{value == 'one'? currencyName : value == 'two'? 'MMK' : 'MMK' }</Text>    
                {currencyValue != 0?<Text style={[{fontFamily:'Inter_600SemiBold'},styles.price]}>{value == 'one'? Math.floor((Number(item.price) / Number(currencyValue))): item.price}</Text> : <Text></Text>}
          </HStack> */}
          </Box>
        </Box>
      </TouchableOpacity>
    )
  }
  const renderListEmptyComponent = () => (
    <ActivityIndicator/>
  )


  return (
    <View px={3} style={{backgroundColor:'#FFF'}} h='100%'>
      {loading ? <ActivityIndicator size="large" color="red" justifyContent='center' alignItems='center' style={{height:'80%'}}/> :
      // <ScrollView showsVerticalScrollIndicator={false} pt='5%'>
            <VStack>
                <FlatList
                  data={product}
                  renderItem={productsRenderItems}
                  ListEmptyComponent={renderListEmptyComponent}
                  numColumns={2}
                  showsVerticalScrollIndicator={false}
                  horizontal={false}
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={item => item.id}
                  mb='5%' mt='3%'         
              />
            </VStack>        
      // </ScrollView>    
}
    </View>
  )
}

export default ShowMoreFav;

