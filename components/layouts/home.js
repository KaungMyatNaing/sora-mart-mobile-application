// import React,{useEffect, useState} from "react"
// import { Text, TouchableOpacity, ActivityIndicator} from 'react-native';
// import { Box, HStack, ScrollView, FlatList,useSafeArea, VStack, Image } from "native-base"
// import { styles } from '../../assets/css/layouts/homeStyle';
// import config from "../../config/config";
// import {useDispatch, useSelector} from 'react-redux';
// import {apiGetMultipleActionCreator} from '../../backend/ApiActionCreator';

// const Home = ({navigation}) => {
//   const [userOption,setUserOption] = useState(5);
//   const dispatch = useDispatch();
//   const baseUrl = config.baseUrl;
//   const category_baseUrl = config.baseUrl + '/api/categories/list';
//   const product_baseUrl = config.baseUrl + '/api/products?category_id='+userOption;
//   const categories  = useSelector((state) => state.apiReducer.data1);
//   const products  = useSelector((state) => state.apiReducer.data2);
//   // const auth  = useSelector((state) => state.apiReducer.data);

//   const loading = useSelector((state) => state.apiReducer.loading);

//   const [image,setImage] = useState('');

//   const safeAreaProps = useSafeArea({
//     safeAreaTop: true,
//     pt: 2
//   });

//   useEffect(()=>{
//     dispatch(apiGetMultipleActionCreator(category_baseUrl,product_baseUrl,global.auth));
//   },[userOption])

//   const renderItem = ({item}) => {
//     return(      
//       <TouchableOpacity onPress={()=>setUserOption(item.id)}>
//         <Text style={getCategoryActiveStyle({item})}> {item.name}</Text>
//     </TouchableOpacity>
//     )
//   }

//   const productsRenderItems=({item})=>{
//     return(
//       <TouchableOpacity onPress={() => navigation.navigate('Product Details',{item:item})}>
//         <Box mr={3} my={3}>            
//           <Box style={styles.ImgContainer} alignItems="center" justifyContent="center">

//           {item.product_pictures ?
//               item.product_pictures.map((photo) => {
//                 return(
//                   <Image alt="product img" source={{ uri: baseUrl +'/'+ photo.image_url }} style={styles.productImg} resizeMode='contain'/>
//                 )
//             }): null
//           }
//           </Box>
//           <Box mt="3">
//           <Text style={[{fontFamily:'Inter_500Medium'},styles.label]}>{item.name}</Text>
//           <HStack justifyContent='flex-start' alignItems='center'>
//                 <Text style={[{fontFamily:'Inter_600SemiBold'},styles.priceMMK]}>MMK</Text>    
//                 <Text style={[{fontFamily:'Inter_600SemiBold'},styles.price]}>{item.price}</Text> 
//           </HStack>
//           </Box>
//         </Box>
//       </TouchableOpacity>
//     )
//   }

//   const renderListEmptyComponent = () => (
//     <ActivityIndicator/>
//   )

//   const getCategoryActiveStyle=({item})=>{
//     if(item.id == userOption){
//       return styles.productTagActive;
//     }else{
//       return styles.productTag;
//     }
//   }
//   return (
//     <Box px={3} style={{backgroundColor:'#FFF'}} h='100%'>
//       {loading ? <ActivityIndicator/> :
//       <Box mb={10}>
//       <FlatList
//           data={categories}
//           horizontal
//           renderItem={renderItem}
//           ListEmptyComponent={renderListEmptyComponent}
//           showsHorizontalScrollIndicator={true}
//           keyExtractor={item => item.id}
//           mb='5%' mt='3%'         
//       />
//       <ScrollView showsVerticalScrollIndicator={false} mt='5%' mb='10%'>
//             <VStack>
//                 <HStack alignItems='center' justifyContent="space-between">
//                     <Text style={[styles.productTitle,{fontFamily:'Inter_700Bold'}]}>Most Popular Products</Text>
//                     <Text style={[{fontFamily:'Inter_500Medium'},styles.showMore]}>Show More</Text>
//                 </HStack>

//                 <FlatList
//                   data={products}
//                   horizontal
//                   renderItem={productsRenderItems}
//                   ListEmptyComponent={renderListEmptyComponent}
//                   showsHorizontalScrollIndicator={true}
//                   keyExtractor={item => item.id}
//                   mb='5%' mt='3%'         
//               />
//               <HStack alignItems='center' justifyContent="space-between">
//                   <Text style={[styles.productTitle,{fontFamily:'Inter_700Bold'}]}>Accessories You Might Like</Text>
//                   <Text style={[{fontFamily:'Inter_500Medium'},styles.showMore]}>Show More</Text>
//               </HStack>
//               <FlatList
//                   data={products}
//                   horizontal
//                   renderItem={productsRenderItems}
//                   ListEmptyComponent={renderListEmptyComponent}
//                   showsHorizontalScrollIndicator={true}
//                   keyExtractor={item => item.id}
//                   mb='5%' mt='5%'         
//               />
//             </VStack>        
//       </ScrollView>      
//     </Box>}
//     </Box>
//   )
// }

// export default Home;


import React, { useEffect, useState } from "react"
import { Text, TouchableOpacity } from 'react-native';
import { Box, HStack, ScrollView, FlatList, useSafeArea, VStack, Image, View, Modal } from "native-base"
import { styles } from '../../assets/css/layouts/homeStyle';
import config from "../../config/config";
import TabbarMenu from '../layouts/TabberMenu';
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native' // for re-render
import { ActivityIndicator } from 'react-native-paper'
import { AsyncStorage } from 'react-native';
import ToastHelper from "../Helper/toast";
import Toast from 'react-native-toast-message';
import { data } from "../Blog/HomeWifi/homeWifiFormItems";
import { style } from "styled-system";
import { en } from "../translation/en";
import { my } from "../translation/my";
import { setLocalization ,translate } from "react-native-translate";

const Home = ({ navigation }) => {
  const [userOption, setUserOption] = useState(1);
  const [categories, setCategories] = useState(null);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingFav, setLoadingFav] = useState(false);
  const [favouriteProduct, setFavouriteProduct] = useState(null);
  const baseUrl = config.baseUrl;
  const [showModal, setShowModal] = useState(false);
  const [extra, setExtra] = useState(0);
  const baseUrlCart = config.baseUrl + '/api/carts';
  const [cart_product, setCartProduct] = useState('');
  const [isWishList, setIsWishList] = useState(false);

  // const [value, setValue] = React.useState("one");
  // const [currencyName, setCurrencyName] = React.useState();
  // const [currencyValue, setCurrencyValue] = React.useState(0);

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

  const safeAreaProps = useSafeArea({
    safeAreaTop: true,
    pt: 2
  });

  const headers = {
    'Accept': 'application/json',
    'Authorization': 'Bearer ' + global.auth,
  }

  const getCategory = () => {
    const category_baseUrl = config.baseUrl + '/api/categories/list';
    axios.get(category_baseUrl)
      .then(response => {
        setCategories(response.data.data);
      })
      .catch((error) => {
        console.log('cate gory error');
        console.log(error);
      });
  }

  const getProduct = (category_id) => {
    setLoading(true);
    
    if(global.auth != '' && global.auth != null ){      
      const product_auth_baseUrl =  config.baseUrl + '/api/auth/products';
      console.log('product auth base url ' + product_auth_baseUrl);
      axios.get(product_auth_baseUrl,{headers})
        .then(response => {
          setProduct(response.data.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log('product error');
          console.log(error);
          setLoading(false)

        });
    }else{
      const product_baseUrl = config.baseUrl + '/api/products?page=1&limit=10&category_id=' + category_id;
      axios.get(product_baseUrl)
        .then(response => {
          setProduct(response.data.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log('product error');
          console.log(error);
          setLoading(false)

        });
    }
   
  }

  const getFavouriteProduct = () => {
    setLoadingFav(true)
    if(global.auth != null && global.auth != ''){
      const fav_auth_product_baseUrl = config.baseUrl + '/api/auth/products/get-list/most-popular-products?page=1&limit=10&orderBy=desc';
      axios.get(fav_auth_product_baseUrl,{headers})
        .then(response => {
          setFavouriteProduct(response.data.data);
          setLoadingFav(false);
          console.log('auth fav');
        })
        .catch((error) => {
          console.log('fav product error');
          console.log(error);
          setLoadingFav(false)
        });
    }else{
      const Fav_product_baseUrl = config.baseUrl + '/api/products/get-list/most-popular-products?page=1&limit=10&orderBy=desc';
      axios.get(Fav_product_baseUrl)
        .then(response => {
          setFavouriteProduct(response.data.data);
          setLoadingFav(false);
          console.log('fav prouduct');
        })
        .catch((error) => {
          console.log('fav product error');

          console.log(error);
          setLoadingFav(false)
        });
    }
  }

  const isFocused = useIsFocused();
  function getCats() {
    if (global.auth == '' || global.auth == null) {
      // global.forceLoginMsg = config.forceLoginMsg;
      // navigation.navigate('Sign In');
      setCartProduct('');
    } else {
      axios.get(baseUrlCart, { headers })
        .then(response => {
          setCartProduct(response.data.data[0].cart_products.length);
          console.log(response.data.data[0].cart_products.length);
        })
        .catch((error) => {
          // alert("There is no item");
          console.log('get cats data error');
          console.log(error);
          // navigation.navigate('Home');
        });
    }
  }

  const getDefaultLocalization = async() => {
    console.log('localization default');
      var code = await AsyncStorage.getItem('language');
      if(code == 'my'){
        console.log('enter my loop');
          setLocalization(my);
      }else{
        console.log('enter en default loop');
          setLocalization(en);
      }
  }

  useEffect(async()=>{
    // await getData();  
    // await getCurrency();
    await getCats();    
  },[isFocused]);

  useEffect(()=>{
    getDefaultLocalization();
  },[]);

  useEffect(() => {
    getCategory();
    getProduct(userOption);
    getFavouriteProduct();    
  }, [isWishList])

//   const getCurrency = ( ) => {
//     const myData = {
//       // "product_id": item,
//     }
//     const headers = { 
//         'Accept' : 'application/json',
//         'Authorization' : 'Bearer '+ global.auth,
//     }; 
//   axios.get(config.baseUrl+'/api/exchange-rates', myData, { headers })
//   .then(response => {

//     response.data.data.map((data) =>  
//     data.currency == 'JPY' ? AsyncStorage.setItem( "currency_name", data.currency) : ''
//     )
//     response.data.data.map((data) =>  
//     data.currency == 'JPY' ? AsyncStorage.setItem( "currency_value", data.rate) : ''
//     )    
//   })    
//   .catch((error) => {
//     console.log(error);
//   });
// } 

  const alert = () => {

    return <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
      <Modal.Content maxWidth="400px">
        <Modal.CloseButton />
        <Modal.Header style={{ color: 'red' }}>Sorry !!</Modal.Header>
        <Modal.Body>This Function will available in version!</Modal.Body>
      </Modal.Content>
    </Modal>
  }

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity style={getCategoryActiveStyle({ item })}
        // onPress={()=>{
        //   setShowModal(true);
        //   alert();
        // }
        // }>
        onPress={() => userAction(item)}>
        <Text style={getCategoryTextStyle({item})}>{item.name}</Text>
      </TouchableOpacity>
    )
  }

  const userAction = (item) => {
    navigation.navigate('Products', { item: item })
    setUserOption(item.id);
    // getProduct(id);
  }

  const setWishList = (item) => {
    if (global.auth == '') {
      global.forceLoginMsg = config.forceLoginMsg
      navigation.navigate('Sign In');
    } else {
      const myData = {
        "product_id": item,
      }
      const headers = {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + global.auth,
      };
      axios.post(baseUrl + '/api/wish-lists', myData, { headers })
        .then(response => {
          if (response.data.status_code === 200) {
            setIsWishList(!isWishList);
            // dispatch(apiGetMultipleActionCreator(category_baseUrl, product_baseUrl, global.auth));
          }
          console.log(response.data);

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

  const productsRenderItems = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('Product Details', { item: item })}>
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
              <Image alt="product img" source={{ uri: config.imageUrl + '/' + item.product_pictures[0].image_url }} style={styles.productImg} />}
          </Box>
          <Box mt="3">
            <Text style={[{ fontFamily: 'Inter_500Medium' }, styles.label]}>{item.name}</Text>
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
            
          </Box>
        </Box>
      </TouchableOpacity>
    )
  }

  // const favouriteProductsRenderItems = ({ item }) => {
  //   return (
  //     <TouchableOpacity onPress={() => navigation.navigate('Product Details', { item: item })}>
  //       <Box mr={3} my={3}>
  //         <Box style={styles.ImgContainer} alignItems="center" justifyContent="center">
  //           {item.wishlist.length > 0 ? 
  //               <TouchableOpacity onPress={() => removeWishList(item.id)} style={styles.whishListWrap}>
  //                 <View>
  //                   <Image alt="wishlist" source={require('../../assets/image/Blog/filledheart.png')} resizeMode='contain' w={6} h={6} />
  //                 </View>
  //               </TouchableOpacity> : 
  //               <TouchableOpacity onPress={() => setWishList(item.id)} style={styles.whishListWrap}>
  //                 <View>
  //                   <Image alt="wishlist" source={require('../../assets/image/Blog/favIcon3x.png')} resizeMode='contain' w={6} h={6} />
  //                 </View>
  //               </TouchableOpacity>
  //             }
  //           {/* {item.product_pictures == null ? 
  //             <Image alt="product img" source={{ uri: ''}} style={styles.productImg} resizeMode='contain'/>
  //             : <Image alt="product img" source={{ uri: baseUrl +'/'+ item.product_pictures[0].image_url }} style={styles.productImg} resizeMode='contain'/>}
  //              */}
  //           {item.product_pictures[0] == undefined ? null :
  //             <Image alt="product img" source={{ uri: baseUrl + '/' + item.product_pictures[0].image_url }} style={styles.productImg} />}
  //         </Box>
  //         <Box mt="3">
  //           <Text style={[{ fontFamily: 'Inter_500Medium' }, styles.label]}>{item.name}</Text>
  //           <HStack justifyContent='flex-start' alignItems='center'>
  //               <Text style={[{fontFamily:'Inter_600SemiBold'},styles.priceMMK]}>JPY</Text>    
  //               <Text style={[{fontFamily:'Inter_600SemiBold'},styles.price]}>{item.price}</Text>
  //           </HStack>
  //           <HStack justifyContent='flex-start' alignItems='center'>
  //               <Text style={[{fontFamily:'Inter_600SemiBold'},styles.priceMMK]}>MMK</Text>    
  //               <Text style={[{fontFamily:'Inter_600SemiBold'},styles.price]}>{item.price_mm}</Text>
  //           </HStack>
  //         </Box>
  //       </Box>
  //     </TouchableOpacity>
  //   )
  // }

  const renderListEmptyComponent = () => (
    <Text w='100%' style={[{ fontFamily: 'Inter_500Medium' }, styles.no_items]}>{translate('noItem')}</Text>
  )

  const getCategoryActiveStyle = ({ item }) => {
    if (item.id == userOption) {
      return styles.productTagActive;
    } else {
      return styles.productTag;
    }
  }

  const getCategoryTextStyle = ({item}) => {
    if (item.id == userOption) {
      return styles.categoryTextActive;
    } else {
      return styles.categoryText;
    }
  }

  return (
    <View px={3} style={{ backgroundColor: '#FFF', flex: 1 }} h='100%'>
      <View mb={10}>
        {
          categories == null ? null :
            <FlatList
              data={categories}
              horizontal
              extraData={extra}
              renderItem={renderItem}
              ListEmptyComponent={renderListEmptyComponent}
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => item.id}
              mb='5%' mt='3%'
            />
        }
        <ScrollView showsVerticalScrollIndicator={false} mt='5%' mb='20%'>
          <VStack>
            <HStack alignItems='center' justifyContent="space-between">
              <Text style={[styles.productTitle, { fontFamily: 'Inter_700Bold' }]}>{translate('mostPopularProduct')}</Text>
              <TouchableOpacity  onPress={() => navigation.navigate('Most Popular Products')}>
                  <Text style={[{ fontFamily: 'Inter_500Medium' }, styles.showMore]} >{translate('showMore')}</Text>
                </TouchableOpacity>
            </HStack>
            {loadingFav ? <ActivityIndicator color="red" alignItems='center' style={{ padding: 5 }} /> :
              <FlatList
                data={favouriteProduct}
                horizontal
                extraData={extra}
                renderItem={productsRenderItems}
                ListEmptyComponent={renderListEmptyComponent}
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item.id}
                mb='5%' mt='3%'
              />}
            <HStack alignItems='center' justifyContent="space-between">
              <Text style={[styles.productTitle, { fontFamily: 'Inter_700Bold' }]}>{translate('accessoriesUML')}</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Accessories You May Like', { item: userOption })}>
                <Text style={[{ fontFamily: 'Inter_500Medium' }, styles.showMore]}>{translate('showMore')}</Text>
              </TouchableOpacity>
            </HStack>
            {loading ? <ActivityIndicator color="red" alignItems='center' style={{ padding: 5 }} /> :
              <FlatList
                data={product}
                horizontal
                extraData={extra}
                renderItem={productsRenderItems}
                ListEmptyComponent={renderListEmptyComponent}
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item.id}
                mb='5%' mt='5%'
              />
            }
          </VStack>
        </ScrollView>
      </View>
      <View style={styles.tab}>
        <TabbarMenu cartCount={cart_product && cart_product != '' ? cart_product : ''} />
      </View>
      {alert()}
      <Toast />
    </View>
  )
}

export default Home;

