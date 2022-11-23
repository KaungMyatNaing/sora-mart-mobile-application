import React,{useCallback, useEffect,useState} from 'react';
import { Text } from 'react-native';
import { Image, VStack, HStack, Button, View } from "native-base"
import { TouchableOpacity } from 'react-native';
import { fontFamily } from "styled-system";
import {useRoute} from '@react-navigation/native';
import AppLoading from 'expo-app-loading';
import config from '../../config/config';
import axios from 'axios'; 
import { useIsFocused } from '@react-navigation/native' // for re-render
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
  import { useNavigation } from '@react-navigation/native';
import { translate } from 'react-native-translate';
const TabbarMenu = (props) => {
    const [checked, setChecked] = useState(false);
    const [quantity,setQuantit] = useState(1);
    const [cart_product,setCartProduct] = useState(null);
    const [loading,setLoading] = useState(true);
    const [itemID,setItemID] = useState('');
    const baseUrl = config.baseUrl + '/api/carts';
    const baseUrl_checkout = config.baseUrl + '/api/orders/checkout';

    const isFocused = useIsFocused();
    useEffect(()=>{
      },[props, isFocused])
   
    const headers = { 
        'Accept': 'application/json', 
        'Authorization' : 'Bearer '+ global.auth,        
    }
    const navigation = useNavigation();
    const route = useRoute();
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
        <HStack justifyContent='space-around' my='3' alignItems='center' style={{backgroundColor: '#fff'}}>
          <VStack justifyContent="center" alignItems="center" width="25%">
              <TouchableOpacity onPress={() => navigation.navigate('Drawer')}>
                  <VStack justifyContent="center" alignItems="center">
                      <Image alt="home icon" resizeMode='contain' source={route.name == "Home" ? require("../../assets/image/Home/HomeFilledIcon3x.png") : require("../../assets/image/Blog/HomeIcon3x.png")} w={7} h={7} />
                      <Text style={route.name == "Home" ? { fontFamily: 'Inter_500Medium', fontSize: 12, color: '#EC1C24' } : { fontFamily: 'Inter_500Medium', fontSize: 12 }}>{translate('home')}</Text>
                  </VStack>
              </TouchableOpacity>
          </VStack>

          <VStack justifyContent="center" alignItems="center" width="25%">
              <TouchableOpacity onPress={() => navigation.navigate('Other Services')}>
                  <VStack justifyContent="center" alignItems="center">
                      <Image alt="service other icon" resizeMode='contain' source={route.name == "Other Services" ? require("../../assets/image/Blog/BlogFilledIcon3x.png") : require("../../assets/image/Home/BlogIcon3x.png")} w={7} h={7} />
                      <Text style={route.name == "Other Services" ? { fontFamily: 'Inter_500Medium', fontSize: 12, color: '#EC1C24',textAlign:'center' } : { fontFamily: 'Inter_500Medium', fontSize: 12 }}>{translate('otherService')}</Text>
                  </VStack>
              </TouchableOpacity>
          </VStack>

          <VStack justifyContent="center" alignItems="center" width="25%">
              <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
                  <VStack justifyContent="center" alignItems="center" style={{position: 'relative'}}>
                      {props.cartCount && props.cartCount != '' ? <View style={{ width:14, height: 14, borderRadius: 50, backgroundColor:'red', position: 'absolute', right:-10, top: -5, display:'flex', justifyContent:'center', alignItems:'center'}}><Text style={{color:'#fff', fontSize: 10}}>{props.cartCount}</Text></View> : null}
                      <Image alt="cart icon" resizeMode='contain' source={route.name == "Cart" ? require("../../assets/image/ShoppingCart/CartFilledIcon3x.png") : require("../../assets/image/Home/CartIcon3x.png")} w={7} h={7} />
                      <Text style={route.name == "Cart" ? { fontFamily: 'Inter_500Medium', fontSize: 12, color: '#EC1C24' } : { fontFamily: 'Inter_500Medium', fontSize: 12 }}>{translate('cart')}</Text>
                  </VStack>
              </TouchableOpacity>
          </VStack>

          <VStack justifyContent="center" alignItems="center" width="25%">
              <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                  <VStack justifyContent="center" alignItems="center">
                      <Image alt="profile icon" resizeMode='contain' source={route.name == "Profile" ? require("../../assets/image/profile/ProfilefilledIcon3x.png") : require("../../assets/image/Home/AccIcon3x.png")} w={7} h={7} />
                      <Text style={route.name == "Profile" ? { fontFamily: 'Inter_500Medium', fontSize: 12, color: '#EC1C24' } : { fontFamily: 'Inter_500Medium', fontSize: 12 }}>{translate('profile')}</Text>
                  </VStack>
              </TouchableOpacity>
          </VStack>
        </HStack>
  );
}
export default TabbarMenu;