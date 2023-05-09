
import React,{useState,useRef,useEffect} from 'react';
import { Font } from 'expo'
// import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUp from './components/accounts/signUp';
import TabMenu from './components/layouts/tabMenu';
import Welcome from './components/accounts/welcome';
import SignIn from './components/accounts/signIn';
import MyOrder from './components/ecommerce/order/MyOrder';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { HStack, NativeBaseProvider } from 'native-base';
import ProfileSetting from './components/profile/profileSetting';
import MyDrawer from './components/layouts/navDrawer';
import ProductDetail from './components/ecommerce/productDetail';
import { ShoppingCart } from './components/ecommerce/cart';
import ShippingAndPayment  from './components/ecommerce/checkout';
import AddAddress from './components/ecommerce/address/addAddressForm';
import MyPaymentMethod from './components/ecommerce/payments/choosePaymentMethod';
import MyPayment from './components/ecommerce/payments/choosePayment';
import PaymentInfo from './components/ecommerce/payments/addPaymentInfo';
import { AboutUs } from './components/layouts/aboutUs';
import { OrderComplete, OrderFailed } from './components/ecommerce/status/OrderComplete';
import Home from './components/layouts/home';
import MySubscription from './components/ecommerce/MySubscription';
import Saved from './components/ecommerce/saved';
import ShareAndFav from './components/layouts/ShareAndFav';
import JobDetails from './components/Blog/Job/jobDetails';
import {SearchBtn} from './components/Blog/detailComponents';
import HouseRentDetails from './components/Blog/HouseRent/HouseRentDetails';
import RequestTourForm from './components/Blog/HouseRent/RequestTourForm';
import { CompletedStatus, FailedStatus } from './components/Blog/Status/status';
import {RentFormOne,RentFormThree,RentFormTwo} from './components/Blog/HouseRent/RentForm';
import HomeWifiDetails from './components/Blog/HomeWifi/homeWifiDetails';
import { WifiRequestFormOne,WifiRequestFormTwo } from './components/Blog/HomeWifi/WifiRequestForm';
import Setting from './components/layouts/Setting';
import { Provider } from 'react-redux';
import { store } from './backend/Store';
import { VerificationCode } from './components/accounts/verification';
import UpdateAddress from './components/ecommerce/address/updateAddressForm';
import UpdatePaymentInfo from './components/ecommerce/payments/updatePaymentInfo';
import Notification from './components/ecommerce/notification';
import Blog from './components/Blog/blog';
import Profile from './components/profile/profile';
import WishList from './components/ecommerce/wishList';
import Search from './components/ecommerce/Search';
import SearchInput from './components/layouts/SearchInput';
import SearchResult from './components/layouts/SearchResult';
import OrderDetails from './components/ecommerce/order/orderDetails';
import MyAddress from './components/ecommerce/address/chooseAddress';
import PointHistory from './components/ecommerce/pointHistory';
import ShowMoreFav from './components/layouts/showMoreFav';
import AccessoriesYouMayLike from "./components/layouts/accessoriesYouMayLike"
import ShowMoreCategory from './components/layouts/showMoreCategory';
import TravelDetails from './components/Blog/Travel/TravelDetails';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import JobForm from './components/Blog/Job/jobForm';
import DrawerBackBtn from './components/layouts/drawerBackBtn';
import ChooseAddress from './components/ecommerce/address/chooseAddress'
import SimCard from './components/simcard/simcard';
import { AsyncStorage } from 'react-native';

import SimcardManager from './components/simcard/SimcardManager';

const Stack = createNativeStackNavigator();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();  
  const [existlogin, setExistLogin] = React.useState();

  useEffect(() => {
    
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    console.log('================= expo push token ================');
    console.log(expoPushToken);
    console.log('============ noti ===========');
    console.log(notification);

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
        Notifications.removeNotificationSubscription(notificationListener.current);
        Notifications.removeNotificationSubscription(responseListener.current);
      };
  }, []);
  
  React.useEffect(async () => {
  
      const checkLogin = await AsyncStorage.getItem("login");
    if (checkLogin !== null) {
      console.log("this is extracted from async storage ->"+checkLogin);
        global.auth = checkLogin;
        setExistLogin("Drawer");
        console.log("existing login")
      } else {
        setExistLogin("Welcome");
        console.log("new one")
      }
   
 
  },[])

  registerForPushNotificationsAsync = async () => {
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      const token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
      // this.setState({ expoPushToken: token });
      // setState({ expoPushToken: token });
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
    };

  return (
    <Provider store={store}>
      <SafeAreaProvider style={{backgroundColor:'#fff'}}>
       <NativeBaseProvider>
    {/* <ShowMoreFav/> */}
        <NavigationContainer>
            <Stack.Navigator initialRouteName={existlogin}>    
          <Stack.Screen name="Welcome" options={{ headerShown: false }} component={Welcome}/>
          <Stack.Screen name="Sign In" options={{ title: ' ' }} component={SignIn} />
          <Stack.Screen name="Sign Up" options={{ title: ' ' }} component={SignUp} />
          <Stack.Screen name="My Orders" options={{ headerShown: false }} component={MyOrder} />
          <Stack.Screen name="My Orders List" component={MyOrder} options={{ title: 'My Orders' }} />
          {/* <Stack.Screen name="Tab Menu" options={{ headerShown: false }} component={TabMenu} /> */}
          <Stack.Screen name="Drawer" options={{ headerShown: false }} component={MyDrawer} />
          <Stack.Screen name="Profile Setting" component={ProfileSetting}/>
          <Stack.Screen name="Favourite" component={WishList}/>
          <Stack.Screen name="Profile" component={Profile}/>
          <Stack.Screen name="Other Services" component={Blog}/>
          <Stack.Screen name="Search" component={Search} 
          options={{headerRight: () => (<SearchInput />)}} />
          <Stack.Screen name="Search Result" component={SearchResult} 
          options={{headerRight: () => (<SearchInput />)}} />
          <Stack.Screen name="Product Details" component={ProductDetail}
            options={{headerRight: () => (<ShareAndFav />)}}
              />
              {/*<Stack.Screen name="Product Details" component={ProductDetail}
           
          />*/}
          <Stack.Screen name="Cart" component={ShoppingCart}/>
              <Stack.Screen name="Shipping and Payments" component={ShippingAndPayment} />
          <Stack.Screen name="Choose Address" component={ChooseAddress}/>
          <Stack.Screen name="Add New Address" component={AddAddress}/>
          <Stack.Screen name="Choose Payment Method" component={MyPaymentMethod}/>
          <Stack.Screen name="Choose Payment" component={MyPayment}/>
          <Stack.Screen name="Card Information" component={PaymentInfo}/>
          <Stack.Screen name="Order Completed" component={OrderComplete} options={{headerShown:false}}/>
          <Stack.Screen name="Order Failed" component={OrderFailed} options={{headerShown:false}}/>
          <Stack.Screen name="Home" component={Home}/>
              <Stack.Screen name="Products" component={ShowMoreCategory} options={{title: global.category_name}} />
              <Stack.Screen name="Back" component={ DrawerBackBtn}/>
          <Stack.Screen name="Most Popular Products" component={ShowMoreFav}/>
          <Stack.Screen name="Accessories You May Like" component={AccessoriesYouMayLike}/>
          <Stack.Screen name='Job Details' component={JobDetails} 
            options={{title:'Job'}}
          /> 
          <Stack.Screen name='House Rent Details' component={HouseRentDetails} 
            options={{title:'House Rent'}}
          /> 
          <Stack.Screen name='Home Wifi Details' component={HomeWifiDetails} 
            options={{ title:'Home Wifi'}}
          /> 
          <Stack.Screen name='Request a Tour' component={RequestTourForm}/> 
          <Stack.Screen name='Blog Complete Status' component={CompletedStatus} options={{headerShown: false}}/>
          <Stack.Screen name='Blog Failed Status' component={FailedStatus} options={{headerShown: false}}/>
          <Stack.Screen name='Rent Form' component={RentFormOne}/>
          <Stack.Screen name='Rent Form Two' component={RentFormTwo} options={{title:'Rent Form'}}/>
          <Stack.Screen name='Rent Form Three' component={RentFormThree} options={{title:'Rent Form'}}/>
          <Stack.Screen name='Home Wifi Request Form' component={WifiRequestFormOne} options={{title:'Home Wifi Request Form'}}/>
          <Stack.Screen name='Home Wifi Request Form Two' component={WifiRequestFormTwo} options={{title:'Home Wifi Request Form'}} />         
          <Stack.Screen name="About Us" component={AboutUs}/>
          <Stack.Screen name="Verified Code" component={VerificationCode} options={{title:''}}/>
          <Stack.Screen name="Update Address" component={UpdateAddress} options={{title: 'Edit Address'}}/>
          <Stack.Screen name="Update PaymentInfo" component={UpdatePaymentInfo} options={{title:'Edit Payment Information'}}/>
          <Stack.Screen name="Notification" component={Notification}/>
          <Stack.Screen name="Order Details" component={OrderDetails}/>
              <Stack.Screen name='Sim Card Manager' component={SimcardManager} />
              <Stack.Screen name='Sim Card' component={SimCard}/>
          <Stack.Screen name='Point History' component={PointHistory}/>
          <Stack.Screen name='Travel Details' component={TravelDetails} options={{title:"Travel"}}/>
          <Stack.Screen name='Job Form' component={JobForm}/>
       </Stack.Navigator>
      </NavigationContainer>
      </NativeBaseProvider>
    </SafeAreaProvider>
    </Provider>   
  
  );
}
