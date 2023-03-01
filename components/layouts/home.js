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
import WishList from "../ecommerce/wishList";
import { AntDesign } from '@expo/vector-icons';
import { wishlistStore } from "../store/wishlistStore";

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

  const [products, setProducts] = useState();
  
  const [wishlistproducts, setWishlistproducts] = useState();
  const [wishid, setWishid] = useState([]);
  const wishlist = wishlistStore(state => state.wishlist);
  const replaceWishlist = wishlistStore(state => state.replaceWishlist);
  const updateWishlist = wishlistStore(state => state.updateWishlist);
  
  //global.back = 0;
  //const [watchpd,setWatchpd] = useState(global.back)
  console.log(global.auth)

  const safeAreaProps = useSafeArea({
    safeAreaTop: true,
    pt: 2
  });

  const headers = {
    'Accept': 'application/json',
    'Authorization': 'Bearer ' + global.auth,
  }

  const getCategory = () => {
    //const category_baseUrl = config.baseUrl + '/categories';
    //axios.get(category_baseUrl)
    //  .then(response => {
    //    setCategories(response.data.categories);
    //    console.log(categories);
    //  })
    //  .catch((error) => {
    //    console.log('category error');
    //    console.log(error);
    //  });
    //
    
      fetch('https://sora-mart.com/api/categories')
      .then((response) => response.json())
        .then((data) => { setCategories(data.data.categories);
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
      const product_baseUrl = config.baseUrl + '/products?page=1&limit=10&category_id=' + category_id;
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

  const getProducts = () => {
  

   
      fetch('https://sora-mart.com/api/products')
      .then((response) => response.json())
        .then((data) => {
          setLoading(false);
          setProducts(data.data.products);
          //console.log('Products length is '+products.length)
        });
   
   

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

  //useEffect(async()=>{
  //  // await getData();  
  //  // await getCurrency();
  //  await getCats();    
  //},[isFocused]);

  //useEffect(()=>{
  //  //getDefaultLocalization();
  //  console.log("Test: ",wishid);
  //},[]);
  React.useEffect(() => {
    getDefaultLocalization();
    getAction();
    getCategory();
    getProducts();}
    , [])
  React.useEffect(() => {
    // getAction();
  }, [wishlist]);


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
        onPress={() => { goCategory(item); global.category_name = item.name }}>
        <Text style={getCategoryTextStyle({item})}>{item.name}</Text>
      </TouchableOpacity>
    )
  }

  const userAction = (item) => {
    navigation.navigate('Products', { item: item })
    setUserOption(item.id);
    // getProduct(id);
  }

  const goCategory = (item) => {
    global.category_name = item.name;
    navigation.navigate('Products')
  }

  const setWishList = (product_id) => {
    if (global.auth == '') {
      global.forceLoginMsg = config.forceLoginMsg
      navigation.navigate('Sign In');
    } else {
    
      
          fetch(`https://sora-mart.com/api/add-wishlist/${product_id}`, {
            method: "POST", // or 'PUT'
            headers: {
              "Content-Type": "application/json",
              'Authorization':  global.auth,
            }
          })
            .then((response) => response.json())
            .then((data) => {
                if (data.status == 200) {
                setIsWishList(!isWishList);
                 console.log("added")
                }
                
            }) .catch((error) => {
              console.log(error);
            });
  
      
      
      
      
      
      //end
    }
  }

  const removeWishList = (remove_id) => {
   
    fetch(`https://sora-mart.com/api/remove-wishlist/${remove_id}`, {
      method: "DELETE", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
        'Authorization':  global.auth,
      }
    })
      .then((response) => response.json())
      .then((data) => {
          if (data.status == 200) {
          setIsWishList(!isWishList);
           console.log("removed")
          }
          
      }) .catch((error) => {
        console.log(error);
      });


  }

  const unlikeAction = (id) => {
    fetch(`https://sora-mart.com/api/remove-wishlist/${id}`, {
      method: 'DELETE', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
        Authorization: global.auth,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status == 200) {
          getAction();
          console.log('removed');
        }
      })
      .catch((error) => {
        console.log(error);
      });
    const fdata = wishlist.filter(i => i !== id);
    replaceWishlist(fdata);
    console.log(wishlist);
   
  };

  const likeAction = (id) => {

   fetch(`https://sora-mart.com/api/add-wishlist/${id}`, {
     method: 'POST', // or 'PUT'
     headers: {
       'Content-Type': 'application/json',
       Authorization: global.auth,
     },
   })
     .then((response) => response.json())
     .then((data) => {
       if (data.status == 200) {
         getAction();
         console.log('added');
       }
     })
     .catch((error) => {
       console.log(error);
     });
    updateWishlist(id);
    console.log(wishlist);
    
    
 };
  
  const getAction = () => {
    if (global.pd) {
      fetch(`https://sora-mart.com/api/wishlists/`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: global.auth,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          let len = data.data.wishlists.length;
          console.log(len);
          let dumbdata = [];
          for (let i = 0; i < len; i++) {
            dumbdata.push(data.data.wishlists[i].products.id);
          }
          setWishid(dumbdata);
          console.log('wishlist grab successful.');
        })
        .catch((error) => console.log(error));
    }

}

  
  const productsRenderItems = ({ item }) => {
    const checkId = wishlist && wishlist.filter((i) => i == item.id);
    return (
      <TouchableOpacity onPress={() => { navigation.navigate('Product Details', { item: item.id }); global.product_id = item.id; }}>
        <Box mr={3} my={3}>
          <Box style={styles.ImgContainer} alignItems="center" justifyContent="center">
             <TouchableOpacity onPress={() => {
          checkId.length > 0 ? unlikeAction(item.id) : likeAction(item.id);
        }} style={styles.whishListWrap}>
              <View>
                {checkId.length > 0 ? <AntDesign name="heart" size={24} color="red" /> : <AntDesign name="hearto" size={24} color="black" />}
              </View>
            </TouchableOpacity>
            
        
            <Image alt="product img" source={{ uri: 'https://sora-mart.com/storage/product_picture/6374b5719d119_photo.png'}} style={styles.productImg} resizeMode='contain'/> 
                      
            {/*{item.product_pictures == null ? 
              <Image alt="product img" source={{ uri: ''}} style={styles.productImg} resizeMode='contain'/>
              : <Image alt="product img" source={{ uri: 'https://sora-mart.com/storage/product_picture/6374b5719d119_photo.png'}} style={styles.productImg} resizeMode='contain'/>}
              
            {item.product_picture[0] == undefined ? null :
              <Image alt="product img" source={{ uri: config.imageUrl + '/' + item.product_picture[0].image}} style={styles.productImg} />}*/}
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
                data={products}
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
              <TouchableOpacity onPress={() =>  navigation.navigate('Most Popular Products')}>
              {/*<TouchableOpacity onPress={() => navigation.navigate('Accessories You May Like', { item: userOption })}>*/}
                <Text style={[{ fontFamily: 'Inter_500Medium' }, styles.showMore]}>{translate('showMore')}</Text>
              </TouchableOpacity>
             
            </HStack>
            {loading ? <ActivityIndicator color="red" alignItems='center' style={{ padding: 5 }} /> :
              <FlatList
                data={products}
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
      <Text>{products && products.length}</Text>
        {
               products && products.map((item, key) =>  (
                 <Text key={key}>{item.id}{item.name}{item.category.name}</Text>
              ))
            }
    </View>
  )
}

export default Home;

