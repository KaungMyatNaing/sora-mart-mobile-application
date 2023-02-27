import React,{useEffect, useState} from "react"
import { Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import { Box, HStack, ScrollView, FlatList,useSafeArea, VStack, Image, View } from "native-base"
import { styles } from '../../assets/css/layouts/homeStyle';
import config from "../../config/config";
import {useDispatch, useSelector} from 'react-redux';
import {apiGetMultipleActionCreator} from '../../backend/ApiActionCreator';
import axios from 'axios';
import { useIsFocused } from "@react-navigation/native";
import { AsyncStorage } from 'react-native';
import { translate } from "react-native-translate";

const ShowMoreCategory = ({route, navigation}) => {
  const dispatch = useDispatch();
  const baseUrl = config.baseUrl;
  const item_cat = route.params;  
  // const product_baseUrl = config.baseUrl + '/api/products';
  const [product,setProduct] = useState(null);
  const [loading,setLoading] = useState(false);
  const [extra, setExtra] = useState(0);
  const [image,setImage] = useState('');

  const [value, setValue] = useState("one");
  const [currencyName, setCurrencyName] = useState();
  const [currencyValue, setCurrencyValue] = useState(0);
  const [isWishList, setIsWishList] = useState(false);
  const [products, setProducts] = useState();

  const isFocused = useIsFocused();

  const safeAreaProps = useSafeArea({
    safeAreaTop: true,
    pt: 2
  });
  // getProductByCategory();

  const getProducts = () => {
    let category_name = global.category_name;
    console.log(category_name)
    fetch('https://sora-mart.com/api/products')
    .then((response) => response.json())
      .then((data) => {
        setLoading(false);

        setProducts(data.data.products.filter(i => i.category.name == category_name));
        console.log(products);
      });
}

  function getProductByCategory  ( )  {
    setLoading(true);
    console.log("item__",item_cat.item.id);
    const headers = { 
        'Accept' : 'application/json',
        'Authorization' : 'Bearer '+ global.auth,
    }; 
    if(global.auth != '' && global.auth != null){
      const auth_fav_product_baseUrl = config.baseUrl + '/products?page=1&limit=10';
      axios.get(auth_fav_product_baseUrl,{headers})
        .then(response => {   
          setProduct(response.data.products);
          setLoading(false);
        })    
        .catch((error) => {
            console.log(error);
            setLoading(false);
        });
    }else{
      const Fav_product_baseUrl = config.baseUrl + '/products?page=1&limit=10';
      axios.get(Fav_product_baseUrl)
        .then(response => {   
          setProduct(response.data.products);
          setLoading(false);
        })    
        .catch((error) => {
            console.log(error);
            setLoading(false);
        });
    }
  }
  // const isFocused = useIsFocused() // for re-render
  useEffect(()=>{
    // getData();
    // getCurrency();
    getProducts();
    //getProductByCategory();
  },[isWishList]);

  
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
              {/*{item.wishlist.length > 0 ? 
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
              }           */}
            {/* {item.product_pictures == null ? 
              <Image alt="product img" source={{ uri: ''}} style={styles.productImg} resizeMode='contain'/>
              : <Image alt="product img" source={{ uri: baseUrl +'/'+ item.product_pictures[0].image_url }} style={styles.productImg} resizeMode='contain'/>}
               */}
            {item.product_picture[0] == undefined ? null :
              <Image alt="product img" source={{ uri: config.imageUrl + '/' + item.product_picture[0].image}} style={styles.productImg} />}
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
    <Text>{translate('noItem')}</Text>
  )


  return (
    <View px={3} style={{backgroundColor:'#FFF'}} h='100%'>
      {/*{loading ? <ActivityIndicator size="large" color="red" justifyContent='center' alignItems='center' style={{height:'80%'}}/> :*/}
       <ScrollView showsVerticalScrollIndicator={false} pt='5%'>
        <VStack>
           {/*<FlatList
                  data={products}
                  renderItem={productsRenderItems}
                  ListEmptyComponent={renderListEmptyComponent}
                  numColumns={2}
                  showsVerticalScrollIndicator={false}
                  horizontal={false}
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={item => item.id}
                  mb='5%' mt='3%'         
              />*/}
             {products && products.map((item, key) => (
            <Text key={key}>{item.id}</Text>
          ))}
              
            </VStack>        
       </ScrollView>    

    </View>
  )
}

export default ShowMoreCategory;