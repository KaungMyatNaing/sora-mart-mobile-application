import React,{useCallback,useState, useEffect} from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import {
    Box,
    FlatList,
    HStack,
    VStack,
    Text,
    Divider,
    Image,
    Spacer,
    CloseIcon
} from 'native-base';
import * as ErrorRecovery from 'expo-error-recovery';
import { styles } from '../../assets/css/ecommerce/favouriteStyle';
import { TouchableOpacity, View , ActivityIndicator} from 'react-native';
import AppLoading from 'expo-app-loading';
import config from '../../config/config'; 
import { useIsFocused} from '@react-navigation/native' // for re-render
import ToastHelper from '../Helper/toast';
import { AntDesign } from '@expo/vector-icons';
import { AsyncStorage } from 'react-native';
import { 
    useFonts,
    Inter_100Thin,
    Inter_200ExtraLight,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black, } from '@expo-google-fonts/inter';
import Toast from 'react-native-toast-message';
import { wishlistStore } from '../store/wishlistStore';

function SearchResult({route, navigation }) {
    const {text} = route.params; 
    const [product,setProduct] = useState();
  const [loading, setLoading] = useState(false);
  const [isWishList, setIsWishList] = useState(false);
  const [wishid, setWishid] = useState([]);
  const wishlist = wishlistStore(state => state.wishlist);
  const replaceWishlist = wishlistStore(state => state.replaceWishlist);
  const updateWishlist = wishlistStore(state => state.updateWishlist);
  const getWishlist = wishlistStore(state => state.getWishlist);
    const baseUrl = config.baseUrl + '/api/products';
    const headers = { 
        'Accept': 'application/json', 
        'Authorization' : 'Bearer '+ global.auth,        
    }

    const isFocused = useIsFocused() // for re-render

    const [value, setValue] = React.useState("one");
    const [currencyName, setCurrencyName] = React.useState();
    const [currencyValue, setCurrencyValue] = React.useState(0);
    const [extra, setExtra] = useState(0);
    const getData = async () => {
      try {
        const res = await AsyncStorage.getItem("currency");
        const result1 = await AsyncStorage.getItem("currency_name");
        const result2 = await AsyncStorage.getItem("currency_value");
        if (res !== null && result1 !== null && result2 !== null) {
          setValue(res);
          setCurrencyName(result1);
          setCurrencyValue(result2);
          // alert(res);
          return ;
        }
      } catch (error) {
        console.log(error);
      }
  };
  
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

  const getProduct = (search) => {
    console.log("Searched !")
        setLoading(true)
      
      
      
              fetch(`https://sora-mart.com/api/products?keyword=${search}`, {
                method: "GET", // or 'PUT'
                headers: {
                  "Content-Type": "application/json",
                },
                
              })
                .then((response) => response.json())
                .then((data) => {
                  setProduct(data.data.products);
                  console.log(data.data.products);
                  setLoading(false)
                  console.log("Searched !")
                   
                })
                  .catch((error) => {
                    console.log(error);
                    setLoading(false)
                 
                });
      }



    useEffect(async() => {
      await getData();   
        if(text != undefined) {
          await getProduct(text);
        }
    }, [isFocused, text]);
    
  const productsRenderItems = ({ item }) => {
    const checkId = wishlist.filter((i) => i == item.id);
      return (
        <TouchableOpacity onPress={() => { navigation.navigate('Product Details', { item: item.id }); global.product_id = item.id; }} >
          <Box mr={3} my={3}>            
            <Box style={styles.ImgContainer} alignItems="center" justifyContent="center">
            <TouchableOpacity onPress={() => {
          checkId.length > 0 ? unlikeAction(item.id) : likeAction(item.id);
        }} style={styles.whishListWrap}>
              <View>
                {checkId.length > 0 ? <AntDesign name="heart" size={24} color="red" /> : <AntDesign name="hearto" size={24} color="black" />}
              </View>
            </TouchableOpacity>
                 {/*{item.product_pictures[0] == undefined ? null :
                <Image alt="product img" source={{ uri: config.baseUrl +'/'+ item.product_pictures[0].image_url }} style={styles.productImg}/>}*/}
              

              {
                item.product_picture.length > 0 ? 
              <Image alt="product img" source={{ uri: `https://sora-mart.com/storage/${item.product_picture[0].image}` }} style={styles.productImg}/>
              
                :
                <Image alt="product img" source={{ uri: "https://sora-mart.com/storage/product_picture/624572b54cc90_photo.jpg"}} style={styles.productImg}/>

            }
            </Box>
            <Box mt="3">
            <Text style={[{fontFamily:'Inter_500Medium',width: 150},styles.label]}>{item.name}</Text>
            <HStack justifyContent='flex-start' alignItems='center'>
                <Text style={[{fontFamily:'Inter_600SemiBold'},styles.priceMMK]}>JPY</Text>    
                <Text style={[{fontFamily:'Inter_600SemiBold'},styles.price]}>{item.price}</Text>
            </HStack>
            <HStack justifyContent='flex-start' alignItems='center'>
                <Text style={[{fontFamily:'Inter_600SemiBold'},styles.priceMMK]}>MMK</Text>    
                <Text style={[{fontFamily:'Inter_600SemiBold'},styles.price]}>{item.mm_price}</Text>
            </HStack>
            </Box>
          </Box>
        </TouchableOpacity>
      )
    }


      const renderListEmptyComponent = () => (
        <Text style={{display:'flex', textAlign:"center", color:"#cccccc", paddingTop:3}}>No items result for {text}</Text>
      )

      
    let [fontsLoaded] = useFonts({
        Inter_100Thin,
        Inter_200ExtraLight,
        Inter_300Light,
        Inter_400Regular,
        Inter_500Medium,
        Inter_600SemiBold,
        Inter_700Bold,
        Inter_800ExtraBold,
        Inter_900Black,
      });
    
      if (!fontsLoaded) {
        return <AppLoading />;
      }
      
    return (
        <SafeAreaView style={{backgroundColor:'#FFF'}}>
          {loading ? <ActivityIndicator size="large" color="red" justifyContent='center' alignItems='center' style={{height:'80%'}}/> :
      // <ScrollView showsVerticalScrollIndicator={false} pt='5%'>
            <VStack px={3} h='100%'>
              <Text>Search result for: {text}</Text>
              {product?
                <FlatList
                  data={product}
                  renderItem={productsRenderItems}
                  ListEmptyComponent={renderListEmptyComponent}
                  numColumns={2}
                  showsVerticalScrollIndicator={false}
                  horizontal={false}
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={item => item.guid}
                  mb='5%' mt='3%'         
              />: <Text></Text>}
            </VStack>        
              // </ScrollView>    
          }
             {/* <Toast /> */}
        </SafeAreaView>        
    )
}

export default SearchResult;
