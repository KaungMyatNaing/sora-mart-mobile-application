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

function SearchResult({route, navigation }) {
    const {text} = route.params; 
    const [product,setProduct] = useState(null);
    const [loading,setLoading] = useState(false);
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

    const getProduct = (search) => {
        setLoading(true)
        const product_baseUrl = config.baseUrl + '/api/products?search='+ search;
          axios.get(product_baseUrl)
              .then(response => {   
                setProduct(response.data.data);
                setLoading(false)
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
    
    const productsRenderItems=({item})=>{
      return (
        <TouchableOpacity onPress={() => navigation.navigate('Product Details',{item:item})} >
          <Box mr={3} my={3}>            
            <Box style={styles.ImgContainer} alignItems="center" justifyContent="center">
              <TouchableOpacity onPress={() => setWishList(item.id)} style={styles.whishListWrap}>
                <View>
                 <Image alt="wishlist" source={require('../../assets/image/Blog/Favicon.png')} resizeMode='contain'/>
                </View>
              </TouchableOpacity>
                 {item.product_pictures[0] == undefined ? null :
                <Image alt="product img" source={{ uri: config.baseUrl +'/'+ item.product_pictures[0].image_url }} style={styles.productImg}/>}
            </Box>
            <Box mt="3">
            <Text style={[{fontFamily:'Inter_500Medium'},styles.label]}>{item.name}</Text>
            <HStack justifyContent='flex-start' alignItems='center'>
                <Text style={[{fontFamily:'Inter_600SemiBold'},styles.priceMMK]}>JPY</Text>    
                <Text style={[{fontFamily:'Inter_600SemiBold'},styles.price]}>{item.price}</Text>
            </HStack>
            <HStack justifyContent='flex-start' alignItems='center'>
                <Text style={[{fontFamily:'Inter_600SemiBold'},styles.priceMMK]}>MMK</Text>    
                <Text style={[{fontFamily:'Inter_600SemiBold'},styles.price]}>{item.price_mm}</Text>
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
