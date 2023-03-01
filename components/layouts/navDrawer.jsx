// import * as React from 'react';
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { Text, TouchableOpacity,ScrollView } from 'react-native';
// import { Box, Center, HStack, NativeBaseProvider, useSafeArea, VStack, Image,Button } from "native-base"
// import AddAddress from '../ecommerce/address/addAddressForm';
// import SignIn from '../accounts/signIn'
// import Home from './home';
// import MyOrder from '../ecommerce/order/MyOrder';
// import PointHistory from '../ecommerce/pointHistory';
// import Profile from '../profile/profile';
// import ProfileSetting from '../profile/profileSetting';
// import TabMenu from './tabMenu';
// import MyAddress from '../ecommerce/address/chooseAddress';
// import MyPayment from '../ecommerce/payments/choosePayment';
// import Favourite from '../ecommerce/favourite';
// import { AboutUs } from './aboutUs';
// import {TermsAndConditions} from './termsAndConditions';
// import { useNavigationState } from '@react-navigation/native'
// import {styles} from '../../assets/css/accounts/welcomeStyle';
// import AppLoading from 'expo-app-loading';
// import { 
//     useFonts,
//     Inter_100Thin,
//     Inter_200ExtraLight,
//     Inter_300Light,
//     Inter_400Regular,
//     Inter_500Medium,
//     Inter_600SemiBold,
//     Inter_700Bold,
//     Inter_800ExtraBold,
//     Inter_900Black, } from '@expo-google-fonts/inter';
// import MySubscription from '../ecommerce/MySubscription';
// import Saved from '../ecommerce/saved';
// import { DrawerContentScrollView } from '@react-navigation/drawer';
// import { DrawerItemList } from '@react-navigation/drawer';
// import { DrawerItem } from '@react-navigation/drawer';
// import DrawerBackBtn from './drawerBackBtn';
// import { backgroundColor, style } from 'styled-system';
// import SettingComponent from './Drawer/setting';


// const Drawer = createDrawerNavigator();
// const MyOrderNav = createNativeStackNavigator();
// const MyAddressNav = createNativeStackNavigator();

// const signOutAction = ({navigation}) =>{
//   global.auth = '';
//   global.forceLoginMsg = '';
//   navigation.navigate("Sign In");
// }

// function MyDrawer({navigation}) {

//   let [fontsLoaded] = useFonts({
//           Inter_100Thin,
//           Inter_200ExtraLight,
//           Inter_300Light,
//           Inter_400Regular,
//           Inter_500Medium,
//           Inter_600SemiBold,
//           Inter_700Bold,
//           Inter_800ExtraBold,
//           Inter_900Black,
//         });
      
//         if (!fontsLoaded) {
//           return <AppLoading />;
//         }
//     return (
//       <Drawer.Navigator initialRouteName="Home"
//         screenOptions={{
//         drawerInactiveTintColor: '#707070',
//         drawerActiveTintColor: '#EC1C24',
//         drawerItemStyle:{margin:0},
//         style:{backgroundColor:'#FFF'}
//       }}
//         drawerContent={props => {
//           return (
//             <DrawerContentScrollView {...props}>
//               <DrawerItemList {...props} />
//               {global.auth === '' ? 
//                 <DrawerItem label="Sign In" labelStyle={{color:'#FFF',alignSelf:'center',fontFamily:'Inter_500Medium',fontSize:14}} onPress={() => navigation.navigate('Sign In')} style={styles.logOutBtn}/>
//                 :
//                 <DrawerItem label="Sign Out" labelStyle={{color:'#FFF',alignSelf:'center',fontFamily:'Inter_500Medium',fontSize:14}} onPress={() => signOutAction({navigation})} style={styles.logOutBtn}/>
//               }
//               <DrawerItem label='VERSION 1.0' labelStyle={{color:'#A1A1A1',fontFamily:'Inter_500Medium',fontSize:10,marginTop:'15%',marginBottom:'5%'}}/>
//             </DrawerContentScrollView>
//           )
//         }}
//         >
//         <Drawer.Screen
//           name="Home"
//           component={TabMenu}
//           options={{ 
//             headerShown: false,
//             drawerLabel: ({ focused }) => {
//               return (
//                 <Box>
//                   <HStack justifyContent="space-between" alignItems="center" my="12">
//                   <Text style={focused ? {color:'#EC1C24',fontFamily: 'Inter_700Bold',fontSize:16}: {color:'#000000',fontFamily: 'Inter_700Bold',fontSize:16}}>May Myint Thu</Text>
//                   <Image source={focused ? require('../../assets/image/png_icons/ActiveSidemenu3x.png') : require('../../assets/image/png_icons/ActiveSidemenu3x.png')} w={6} h={6} alt='home'/>
//                   </HStack>
//                 </Box>
//               );
//             },                   
//           }}
//         />
//         <Drawer.Screen
//           name="My Orders"
//           component={MyOrder} options={{ 
//             drawerLabel: ({focused}) => {
//               return (
//                 <Box>
//                   <HStack justifyContent="space-between" alignItems="center">
//                   <Text style={focused ? {color:'#EC1C24',fontFamily: 'Inter_400Regular'}: {color:'#000000',fontFamily: 'Inter_400Regular'}}>My Orders</Text>
//                   <Image source={require('../../assets/image/png_icons/sideArrow3x.png')} w={6} h={6}/>
//                   </HStack>
//                 </Box>
//               );
//             },
//             headerLeft: () => (
//               <DrawerBackBtn nav={navigation}/>
//             ),
//           }}
//         />
//         <Drawer.Screen
//           name="My Addresses"
//           component={MyAddress}
//           options={{ 
//             drawerLabel: ({ focused }) => {
//               return (
//                 <Box>
//                   <HStack justifyContent="space-between" alignItems="center">
//                   <Text style={focused ? {color:'#EC1C24',fontFamily: 'Inter_400Regular'}: {color:'#000000',fontFamily: 'Inter_400Regular'}}>My Addresses</Text>
//                   <Image source={require('../../assets/image/png_icons/sideArrow3x.png')} w={6} h={6}/>
//                   </HStack>
//                 </Box>
//               );
//             },
//             headerLeft: () => (
//               <DrawerBackBtn nav={navigation}/>
//             ),
//           }}
//         />
//         <Drawer.Screen
//           name="My Payment Methods"
//           component={MyPayment}
//           options={{ 
//             drawerLabel: ({ focused }) => {
//               return (
//                 <Box>
//                   <HStack justifyContent="space-between" alignItems="center">
//                   <Text style={focused ? {color:'#EC1C24',fontFamily: 'Inter_400Regular'}: {color:'#000000',fontFamily: 'Inter_400Regular'}}>My Payment Methods</Text>
//                   <Image source={require('../../assets/image/png_icons/sideArrow3x.png')} w={6} h={6}/>
//                   </HStack>
//                 </Box>
//               );
//             },
//             headerLeft: () => (
//               <DrawerBackBtn nav={navigation}/>
//             ),
//           }}
//         />
//         <Drawer.Screen
//           name="My Subscriptions"
//           component={MySubscription}
//           options={{ 
//             drawerLabel: ({ focused }) => {
//               return (
//                 <Box>
//                   <HStack justifyContent="space-between" alignItems="center">
//                   <Text style={focused ? {color:'#EC1C24',fontFamily: 'Inter_400Regular'}: {color:'#000000',fontFamily: 'Inter_400Regular'}}>My Subscriptions</Text>
//                   <Image source={require('../../assets/image/png_icons/sideArrow3x.png')} w={6} h={6}/>
//                   </HStack>
//                 </Box>
//               );
//             },
//             headerLeft: () => (
//               <DrawerBackBtn nav={navigation}/>
//             ),
//           }}
//         />
//         <Drawer.Screen
//           name="Point History"
//           component={PointHistory}
//           options={{ 
//             drawerLabel: ({ focused }) => {
//               return (
//                 <Box>
//                   <HStack justifyContent="space-between" alignItems="center">
//                   <Text style={focused ? {color:'#EC1C24',fontFamily: 'Inter_400Regular'}: {color:'#000000',fontFamily: 'Inter_400Regular'}}>Point History</Text>
//                   <Image source={require('../../assets/image/png_icons/sideArrow3x.png')} w={6} h={6}/>
//                   </HStack>
//                 </Box>
//               );
//             },
//             headerLeft: () => (
//               <DrawerBackBtn nav={navigation}/>
//             ),
//           }}
//         />
//         <Drawer.Screen
//           name="Saved"
//           component={Saved}
//           options={{ 
//             drawerLabel: ({ focused }) => {
//               return (
//                 <Box>
//                   <HStack justifyContent="space-between" alignItems="center">
//                   <Text style={focused ? {color:'#EC1C24',fontFamily: 'Inter_400Regular'}: {color:'#000000',fontFamily: 'Inter_400Regular'}}>Saved</Text>
//                   <Image source={require('../../assets/image/png_icons/sideArrow3x.png')} w={6} h={6}/>
//                   </HStack>
//                 </Box>
//               );
//             },
//             headerLeft: () => (
//               <DrawerBackBtn nav={navigation}/>
//             ),
//           }}
//         />
//         <Drawer.Screen
//           name="Setting"
//           component={SettingComponent}
//           options={{ 
//             drawerLabel: ({ focused }) => {
//               return (
//                 <Box>
//                   <HStack justifyContent="space-between" alignItems="center">
//                   <Text style={focused ? {color:'#EC1C24',fontFamily: 'Inter_400Regular'}: {color:'#000000',fontFamily: 'Inter_400Regular'}}>Setting</Text>
//                   <Image source={require('../../assets/image/png_icons/sideArrow3x.png')} w={6} h={6}/>
//                   </HStack>
//                 </Box>
//               );
//             },
//             headerLeft: () => (
//               <DrawerBackBtn nav={navigation}/>
//             ),
//           }}
//         />
//         <Drawer.Screen
//           name="Terms & Conditions"
//           component={TermsAndConditions}
//           options={{ 
//             drawerLabel: ({ focused }) => {
//               return (
//                 <Box>
//                   <HStack justifyContent="space-between" alignItems="center">
//                   <Text style={focused ? {color:'#EC1C24',fontFamily: 'Inter_400Regular'}: {color:'#000000',fontFamily: 'Inter_400Regular'}}>Terms & Conditions</Text>
//                   <Image source={require('../../assets/image/png_icons/sideArrow3x.png')} w={6} h={6}/>
//                   </HStack>
//                 </Box>
//               );
//             },
//             headerLeft: () => (
//               <DrawerBackBtn nav={navigation}/>
//             ),
//           }}
//         />
//         <Drawer.Screen
//           name="About Us"
//           component={AboutUs}
//           options={{ 
//             drawerLabel: ({ focused }) => {
//               return (
//                 <Box>
//                   <HStack justifyContent="space-between" alignItems="center">
//                   <Text style={focused ? {color:'#EC1C24',fontFamily: 'Inter_400Regular'}: {color:'#000000',fontFamily: 'Inter_400Regular'}}>About Us</Text>
//                   <Image source={require('../../assets/image/png_icons/sideArrow3x.png')} w={6} h={6}/>
//                   </HStack>
//                 </Box>
//               );
//             },
//             headerLeft: () => (
//               <DrawerBackBtn nav={navigation}/>
//             ),
//           }}
//         />
//       </Drawer.Navigator>
//     );
//   }

//    function MyAddressStack() {
//     return (
//       <MyAddressNav.Navigator>
//         <MyAddressNav.Screen name="Profile" component={Profile} />             
//         {/* <MyAddressNav.Screen name="Profile Setting" component={ProfileSetting} />  */}
//       </MyAddressNav.Navigator>
//      );
//    }


//   export default MyDrawer;
import React, { useState,useEffect } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text} from 'react-native';
import { Box, HStack, Image, VStack } from "native-base"
import { useIsFocused } from '@react-navigation/native' // for re-render
import Home from './home';
import MyOrder from '../ecommerce/order/MyOrder';
import PointHistory from '../ecommerce/pointHistory';
import Profile from '../profile/profile';
import MyAddress from '../ecommerce/address/chooseAddress';
import MyPayment from '../ecommerce/payments/choosePayment';
import { AboutUs } from './aboutUs';
import {TermsAndConditions} from './termsAndConditions';
import {styles} from '../../assets/css/accounts/welcomeStyle';
import AppLoading from 'expo-app-loading';
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
import MySubscription from '../ecommerce/MySubscription';
import Saved from '../ecommerce/saved';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { DrawerItemList } from '@react-navigation/drawer';
import { DrawerItem } from '@react-navigation/drawer';
import DrawerBackBtn from './drawerBackBtn';
import SettingComponent from './Drawer/setting';
import Toggle from './ToggleMenu';
import HomeHeaderIcon from './HomeHeaderIcon';
import config from '../../config/config';
import axios from 'axios';
import { CommonActions } from '@react-navigation/native';
import { AsyncStorage } from 'react-native';
import { translate, Translate } from 'react-native-translate';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ChooseAddress from '../ecommerce/address/chooseAddress'

const Drawer = createDrawerNavigator();
const MyOrderNav = createNativeStackNavigator();
const MyAddressNav = createNativeStackNavigator();

function MyDrawer({navigation}) {
  const [profileData,setProfileData] = useState(null);
  const [orderData,setOrderData] = useState(null);
  const [loading,setLoading] = useState(true);
  const baseUrl = config.baseUrl + '/api/profile/get';
  const baseUrl2 = config.baseUrl + '/api/orders';

  const [languae, setLanguage] = useState('en');

  // const [lngCode,setLngCode] = useState(en);

  const writeItemToStorage = async newValue => {
    await setItem(newValue);
  };

  const isFocused = useIsFocused() // for re-render

  useEffect(() => {
    getProfile();
  }, [profileData, isFocused]);

  // useEffect(()=>{
  //   doTransalate();

  // },[setLngCode,isFocused]);

  const getProfile = () => {
    if(global.auth != ''){
      const headers = { 
          'Accept' : 'application/json',
          'Authorization' : 'Bearer '+ global.auth,
      }; 
      axios.get(baseUrl, { headers })
      .then(response => {
        if(response.data.status_code === 200){
            setProfileData(response.data.data.fullname);
          }
        // console.log('asdf',response.data.data.fullname);
      })    
      .catch((error) => {
        console.log(error);
      });
    }
  }
  
  const signOutAction = () =>{
    global.auth = null;
    global.forceLoginMsg = null;
    global.fullname = null;
    global.currency = null;
    global.languae = null;
    global.currencyName = null;
    global.currencyValue = null;
    global.user = null;

    AsyncStorage.getAllKeys()
    .then(keys => AsyncStorage.multiRemove(keys));

    AsyncStorage.setItem( "userEmail", '');
    AsyncStorage.setItem( "userPassword", '');

    navigation.replace('Drawer');
  }

  // const doTransalate = async () => {
  //   const code = await AsyncStorage.getItem("languae");
  //   console.log('====== code ======' + code);
  //   setLocalization(my);
  // }

  // useEffect(()=>{
  //   console.log('lng code is ========' + lngCode);
  //   setLocalization(lngCode);
  //   console.log('home is ===========' + translate("home"));
  // },[lngCode,isFocused]); 

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
      <Drawer.Navigator initialRouteName="Home"
        screenOptions={{
          drawerInactiveTintColor: '#707070',
          drawerActiveTintColor: '#EC1C24',
          drawerItemStyle:{margin:0},
          style:{backgroundColor:'#FFF'}
        }}
        drawerContent={props => {
          return (
            <DrawerContentScrollView {...props}>
              <DrawerItemList {...props} />
              <TouchableOpacity onPress={()=>Linking.openURL('http://demo.myanmarwebc6.sg-host.com/about')}>
                <HStack justifyContent="space-between" alignItems="center" p={5} w='90%'>
                  <Text>{translate('aboutUs')}</Text>
                  <Image alt="image" source={require('../../assets/image/png_icons/sideArrow3x.png')} w={6} h={6}/>
                  </HStack>
              </TouchableOpacity>
              {global.auth == null || global.auth == '' ? 
                <TouchableOpacity onPress={() => navigation.navigate('Sign In')} style={styles.logOutBtn}>
                  <Text style={{color:'#FFF',alignSelf:'center',fontFamily:'Inter_500Medium',fontSize:14}}>{translate('signIn')}</Text>
                </TouchableOpacity>
                :
                <TouchableOpacity onPress={() => signOutAction()} style={styles.logOutBtn}>
                  <Text style={{color:'#FFF',alignSelf:'center',fontFamily:'Inter_500Medium',fontSize:14}}>{translate('signOut')}</Text>
                </TouchableOpacity>
              }
              
              <DrawerItem label='VERSION 1.0' labelStyle={{color:'#A1A1A1',fontFamily:'Inter_500Medium',fontSize:10,marginTop:'15%',marginBottom:'5%'}}/>
            </DrawerContentScrollView>
          )
        }}
        // drawerContent = {props => {
        //   return(
        //     <DrawerContentScrollView {...props}>
        //       <DrawerItemList {...props} />
        //       {global.auth === '' ? 
        //       <Text>Sign In</Text> :
        //       <Text>Sign Out</Text>}
        //     </DrawerContentScrollView>            
        //   )
        // }}
        >
        <Drawer.Screen
          name="Home"
          component={Home}
          options={{ 
              headerLeft: () => (
                <Toggle />
              ),
              headerRight: () => (
                <HomeHeaderIcon />
              ),
            drawerLabel: ({ focused }) => {
              return (
                <Box>
                  <HStack justifyContent="space-between" alignItems="center" my="12">
                  {global.user != '' && global.user != null ? 
                      <Text style={focused ? {color:'#EC1C24',fontFamily: 'Inter_700Bold',fontSize:16}: {color:'#000000',fontFamily: 'Inter_700Bold',fontSize:16}}>{profileData && profileData}</Text>
                      :
                      <Text style={focused ? {color:'#EC1C24',fontFamily: 'Inter_700Bold',fontSize:16}: {color:'#000000',fontFamily: 'Inter_700Bold',fontSize:16}}>Sora Myanmar</Text>
                    }
                  <Image alt='home icon' source={focused ? require('../../assets/image/png_icons/ActiveSidemenu3x.png') : require('../../assets/image/png_icons/ActiveSidemenu3x.png')} w={6} h={6}/>
                  </HStack>
                </Box>
              );
            },                   
          }}
        />
        <Drawer.Screen
          name="My Orders"
          component={MyOrder} options={{ 
            drawerLabel: ({focused}) => {
              return (
                <Box>
                  <HStack justifyContent="space-between" alignItems="center">
                  <Text style={focused ? {color:'#EC1C24',fontFamily: 'Inter_400Regular'}: {color:'#000000',fontFamily: 'Inter_400Regular'}}>{translate('myOrder')}</Text>
                  <Image alt="image" source={require('../../assets/image/png_icons/sideArrow3x.png')} w={6} h={6}/>
                  </HStack>
                </Box>
              );
            },
            headerLeft: () => (
              <DrawerBackBtn nav={navigation}/>
            ),
          }}
        />

<Drawer.Screen
          name="My Addresses"
          component={ChooseAddress} options={{ 
            drawerLabel: ({focused}) => {
              return (
                <Box>
                  <HStack justifyContent="space-between" alignItems="center">
                  <Text style={focused ? {color:'#EC1C24',fontFamily: 'Inter_400Regular'}: {color:'#000000',fontFamily: 'Inter_400Regular'}}>{translate('myAddress')}</Text>
                  <Image alt="image" source={require('../../assets/image/png_icons/sideArrow3x.png')} w={6} h={6}/>
                  </HStack>
                </Box>
              );
            },
            headerLeft: () => (
              <DrawerBackBtn nav={navigation}/>
            ),
          }}
        />
      
       
        <Drawer.Screen
          name="My Payment Methods"
          component={MyPayment}
          options={{ 
            drawerLabel: ({ focused }) => {
              return (
                <Box>
                  <HStack justifyContent="space-between" alignItems="center">
                  <Text style={focused ? {color:'#EC1C24',fontFamily: 'Inter_400Regular'}: {color:'#000000',fontFamily: 'Inter_400Regular'}}>{translate('myPaymentMethod')}</Text>
                  <Image alt="image" source={require('../../assets/image/png_icons/sideArrow3x.png')} w={6} h={6}/>
                  </HStack>
                </Box>
              );
            },
            headerLeft: () => (
              <DrawerBackBtn nav={navigation}/>
            ),
          }}
        />
        <Drawer.Screen
          name="My Subscriptions"
          component={MySubscription}
          options={{ 
            drawerLabel: ({ focused }) => {
              return (
                <Box>
                  <HStack justifyContent="space-between" alignItems="center">
                  <Text style={focused ? {color:'#EC1C24',fontFamily: 'Inter_400Regular'}: {color:'#000000',fontFamily: 'Inter_400Regular'}}>{translate('mySubscription')}</Text>
                  <Image alt="image" source={require('../../assets/image/png_icons/sideArrow3x.png')} w={6} h={6}/>
                  </HStack>
                </Box>
              );
            },
            headerLeft: () => (
              <DrawerBackBtn nav={navigation}/>
            ),
          }}
        />
        <Drawer.Screen
          name="Point History"
          component={PointHistory}
          options={{ 
            drawerLabel: ({ focused }) => {
              return (
                <Box>
                  <HStack justifyContent="space-between" alignItems="center">
                  <Text style={focused ? {color:'#EC1C24',fontFamily: 'Inter_400Regular'}: {color:'#000000',fontFamily: 'Inter_400Regular'}}>{translate('pointHistory')}</Text>
                  <Image alt="image" source={require('../../assets/image/png_icons/sideArrow3x.png')} w={6} h={6}/>
                  </HStack>
                </Box>
              );
            },
            headerLeft: () => (
              <DrawerBackBtn nav={navigation}/>
            ),
          }}
        />
        <Drawer.Screen
          name="Saved"
          component={Saved}
          options={{ 
            drawerLabel: ({ focused }) => {
              return (
                <Box>
                  <HStack justifyContent="space-between" alignItems="center">
                  <Text style={focused ? {color:'#EC1C24',fontFamily: 'Inter_400Regular'}: {color:'#000000',fontFamily: 'Inter_400Regular'}}>{translate('saved')}</Text>
                  <Image alt="image" source={require('../../assets/image/png_icons/sideArrow3x.png')} w={6} h={6}/>
                  </HStack>
                </Box>
              );
            },
            headerLeft: () => (
              <DrawerBackBtn nav={navigation}/>
            ),
          }}
        />
        <Drawer.Screen
          name="Setting"
          component={SettingComponent}
          options={{ 
            drawerLabel: ({ focused }) => {
              return (
                <Box>
                  <HStack justifyContent="space-between" alignItems="center">
                  <Text style={focused ? {color:'#EC1C24',fontFamily: 'Inter_400Regular'}: {color:'#000000',fontFamily: 'Inter_400Regular'}}>{translate('setting')}</Text>
                  <Image alt="image" source={require('../../assets/image/png_icons/sideArrow3x.png')} w={6} h={6}/>
                  </HStack>
                </Box>
              );
            },
            headerLeft: () => (
              <DrawerBackBtn nav={navigation}/>
            ),
          }}
        />
        <Drawer.Screen
          name="Terms & Conditions"
          component={TermsAndConditions}
          options={{ 
            drawerLabel: ({ focused }) => {
              return (
                <Box>
                  <HStack justifyContent="space-between" alignItems="center">
                  <Text style={focused ? {color:'#EC1C24',fontFamily: 'Inter_400Regular'}: {color:'#000000',fontFamily: 'Inter_400Regular'}}>{translate('termAndCondition')}</Text>
                  <Image alt="image" source={require('../../assets/image/png_icons/sideArrow3x.png')} w={6} h={6}/>
                  </HStack>
                </Box>
              );
            },
            headerLeft: () => (
              <DrawerBackBtn nav={navigation}/>
            ),
          }}
        />
        {/* <Drawer.Screen
          name="About Us"
          component={AboutUs}
          options={{ 
            drawerLabel: ({ focused }) => {
              return (
                <Box>
                  <HStack justifyContent="space-between" alignItems="center">
                  <Text style={focused ? {color:'#EC1C24',fontFamily: 'Inter_400Regular'}: {color:'#000000',fontFamily: 'Inter_400Regular'}}>{translate('aboutUs')}</Text>
                  <Image alt="image" source={require('../../assets/image/png_icons/sideArrow3x.png')} w={6} h={6}/>
                  </HStack>
                </Box>
              );
            },
            headerLeft: () => (
              <DrawerBackBtn nav={navigation}/>
            ),
          }}
        /> */}
      </Drawer.Navigator>
    );
  }

  // function MyAddressStack() {
  //  return (
  //    <MyAddressNav.Navigator>
  //      <MyAddressNav.Screen name="Profile" component={Profile} />             
  //      {/* <MyAddressNav.Screen name="Profile Setting" component={ProfileSetting} />  */}
  //    </MyAddressNav.Navigator>
  //   );
  // }


  export default MyDrawer;
  