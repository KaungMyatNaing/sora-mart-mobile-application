import React,{useEffect, useState} from "react"
import { Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import { Box, HStack, ScrollView, FlatList,useSafeArea, VStack, Image, View } from "native-base"
import { styles } from '../../assets/css/layouts/homeStyle';
import config from "../../config/config";
import {useDispatch, useSelector} from 'react-redux';
import {apiGetMultipleActionCreator} from '../../backend/ApiActionCreator';
import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { wishlistStore } from "../store/wishlistStore";
import { AntDesign } from '@expo/vector-icons';


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

  const [image, setImage] = useState('');
  const [products, setProducts] = useState();
  const wishlist = wishlistStore(state => state.wishlist);
  const replaceWishlist = wishlistStore(state => state.replaceWishlist);
  const updateWishlist = wishlistStore(state => state.updateWishlist);


  const safeAreaProps = useSafeArea({
    safeAreaTop: true,
    pt: 2
  });

  const getProducts = () => {
    fetch('https://sora-mart.com/api/products')
    .then((response) => response.json())
      .then((data) => {
        setLoading(false);

        setProducts(data.data.products);
      
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


React.useEffect(() => {
  getAction();
  getProducts();}
  , [])
React.useEffect(() => {
  // getAction();
}, [wishlist]);




 
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
    <ActivityIndicator/>
  )


  return (
    <View px={3} style={{backgroundColor:'#FFF'}} h='100%'>
      {loading ? <ActivityIndicator size="large" color="red" justifyContent='center' alignItems='center' style={{height:'80%'}}/> :
      // <ScrollView showsVerticalScrollIndicator={false} pt='5%'>
            <VStack>
                <FlatList
                  data={products}
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

