import * as React from 'react';
import { Text, SafeAreaView,TouchableOpacity, Icon  } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useIsFocused } from '@react-navigation/native' // for re-render
import Blog from '../Blog/blog';
import MyDrawer from './navDrawer';
import { Box, Center, NativeBaseProvider, Image } from "native-base"
import AddAddress from '../ecommerce/address/addAddressForm';
import Home from './home';
import Profile from '../profile/profile';
import ProfileSetting from '../profile/profileSetting';
import { ShoppingCart } from '../ecommerce/cart';
import HomeHeaderIcon from './HomeHeaderIcon';
import Toggle from './ToggleMenu';
import {SearchAndFilter} from './searchAndFilter';
const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();

const screenOptions = {
  tabBarStyle:{
    paddingTop:15,
    paddingBottom:15,
    height:70,
  },
};

// const MenuButton =({navigation})=>{
//   return(
//        <View>        
//        <TouchableOpacity onPress={()=>(navigation.navigate('DrawerToggle'))}>
//            <Icon name="person" size= {20}/>
//        </TouchableOpacity>
//      </View>)}; 

export default function TabMenu({navigation}) {

  return (
      <NativeBaseProvider>
      <Tab.Navigator 
      tabBarOptions={{
        inactiveTintColor: '#707070',
        activeTintColor: '#EC1C24',}}
        {...{ screenOptions }}>
        <Tab.Screen 
          name="Home" 
          options={{ 
            // headerShown: false,
            headerLeft: () => (
              <Toggle />
            ),
            headerRight: () => (
              <HomeHeaderIcon navigation={navigation} />
            ),
            tabBarIcon: ({focused}) => (
              <Image 
                source={focused ? require("../../assets/image/Home/HomeFilledIcon3x.png") : require("../../assets/image/Blog/HomeIcon3x.png")}
                style={{ height: 20, width: 20 }}
              />
            ), }} 
          component={HomeStackScreen} />
        <Tab.Screen 
          name="Other Services" 
          options={{ 
            tabBarIcon: ({focused}) => (
              <Image 
                source={focused ? require("../../assets/image/Blog/BlogFilledIcon3x.png") : require("../../assets/image/Home/BlogIcon3x.png")}
                style={{ height: 20, width: 20 }}
              />
            ),
            headerRight: () => (
              <SearchAndFilter />
            ),
          }} 
          component={Blog} />
        <Tab.Screen 
          name="Cart" 
          options={{ 
            // headerShown: false,
            title:"Cart",
            tabBarLabel:"Cart",
            tabBarIcon: ({focused}) => (
              <Image 
                source={focused ? require("../../assets/image/ShoppingCart/CartFilledIcon3x.png") : require("../../assets/image/Home/CartIcon3x.png")}
                style={{ height: 20, width: 20 }}
              />
            ), }} 
          component={ShoppingCart} />
        <Tab.Screen 
          name="Profile" 
          options={{ 
            // headerShown: false,
            tabBarIcon: ({focused}) => (
              <Image 
                source={focused ? require("../../assets/image/profile/ProfilefilledIcon3x.png") : require("../../assets/image/Home/AccIcon3x.png")}
                style={{ height: 20, width: 20 }}
              />
            ), }} 
          component={Profile} />
      </Tab.Navigator>
      </NativeBaseProvider>
  );
}

function HomeStackScreen() {
    return (
      <HomeStack.Navigator>
       <HomeStack.Screen name="Drawer" options={{ headerShown: false }} component={Home} />             
      </HomeStack.Navigator>
     );
   }

  //  function ProfileStackScreen() {
  //   return (
  //     <ProfileStack.Navigator>
  //      <ProfileStack.Screen name="Profile"  options={{ headerShown: false }} component={Profile} />             
  //      <ProfileStack.Screen name="Profile Setting" component={ProfileSetting} />             
  //     </ProfileStack.Navigator>
  //    );
  //  }