import React, { useState,useEffect } from 'react';

import { NativeBaseProvider, Box, ScrollView,useSafeArea, VStack, HStack,Button,Stack  } from 'native-base';
import { Text, Image, TouchableOpacity } from 'react-native';
import { styles } from '../../assets/css/profile/profileStyle';
import {StatusTracker,InCompleteStatusTracker, StatusTrackerWithoutLine,InCompleteStatusTrackerWithoutLine} from './statusTracker';
import config from '../../config/config';
import axios from 'axios';
import { ActivityIndicator } from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {apiGetMultipleActionCreatorProfile} from '../../backend/ApiActionCreator';
import Toast from 'react-native-toast-message';
import { useIsFocused } from '@react-navigation/native' // for re-render
function Profile({ navigation }) {
    // const [profileData,setProfileData] = useState(null);
    // const [orderData,setOrderData] = useState(null);
    // const [loading,setLoading] = useState(true);
    const profile_url = config.baseUrl + '/api/profile/get';
    const order_url = config.baseUrl + '/api/orders';

    const dispatch = useDispatch();
    const profileData  = useSelector((state) => state.apiReducer.data1);
  const orderData  = useSelector((state) => state.apiReducer.data2);
  const loading = useSelector((state) => state.apiReducer.loading);

   
  const isFocused = useIsFocused() // for re-render
    useEffect(() => {
        dispatch(apiGetMultipleActionCreatorProfile(profile_url,order_url,global.auth));

        

        // const headers = { 
        //     'Accept': 'application/json', 
        //     'Authorization' : 'Bearer '+ global.auth,        
        // }
        // function getProfileData(){
        //     return axios.get(profile_url,{ headers });
        // }
    
        // function getOrderData(){
        //     return axios.get(order_url,{ headers });
        // }
        // axios.all([getProfileData(), getOrderData()])
        // .then(axios.spread(function (profileData, orderData) {     
        //     setProfileData(profileData.data.data);
        //     setOrderData(orderData.data.data);
        //     console.log('-----------start-------');
        //     console.log(profileData);
        //     console.log('-----------end---------');
        //     console.log(orderData);
        //     setLoading(false);
        // }))
        // .catch((error) => {
        //     console.log(error);
        //     setLoading(false);
        //     navigation.navigate('profile setting');
        //     alert(error);
        // });
    }, [isFocused]);

    const safeAreaProps = useSafeArea({
        safeAreaTop: true,
        pt: 2
      });

    if(loading){
        return(<ActivityIndicator/>);
    }else{
        return (
            <NativeBaseProvider>
                <ScrollView>
                <Box {...safeAreaProps} style={styles.container}>
                <VStack space="2" m='5' mt={0} style={styles.bg}>
                    <HStack alignItems='center' justifyContent="space-between"> 
                        <HStack alignItems='flex-start'  space="3"  justifyContent="center">
                            <Image alt="profile" source={require('../../assets/image/profile/Profile_imgage.png')}  style={styles.logo}/>
                            <Box m='2'>
                                <Text style={[{fontFamily:'Inter_700Bold'},styles.bold]}>{profileData.fullname}</Text>
                                <Text style={[{fontFamily:'Inter_400Regular'},styles.regular]}>{profileData.ph_no}</Text>
                            </Box>
                        </HStack>
                        <TouchableOpacity onPress={()=>navigation.navigate('Profile Setting',{userData:profileData})}>
                            <Image alt="setting" source={require('../../assets/image/profile/Profile_setting-icon.png')} style={styles.logo_setting}/>           
                        </TouchableOpacity>             
                    </HStack>
                    <HStack alignItems='center' justifyContent="space-between" style={styles.point_stack}>
                        <HStack alignItems='center'  justifyContent="space-between" >
                            <Box>
                                <Text style={styles.text_point_title}>M-Point</Text>
                                <Text   style={[{fontFamily:'Inter_500Medium'},styles.text_point]} >{profileData.total_point}</Text>
                            </Box>
                            <Image alt="logo point" m="2" source={require('../../assets/image/profile/logo_poin.png')}   style={styles.logo_point}/>
                        </HStack>
                        <Box style={styles.earn_btn}>                           
                            <HStack>
                                <Image alt="earn point" source={require('../../assets/image/earn_point.png')}   style={styles.logo_earn_point}/>
                                <Text style={{fontFamily:'Inter_500Medium',fontSize:14,color:'#ec1c24'}}>Earn Points</Text>
                            </HStack>
                        </Box>
                    </HStack>
                    <HStack mt={5} alignItems='center' justifyContent="space-between"  style={styles.orderStatus_stack}>
                        <Box>
                            <Text style={styles.orderStatus_text}>My Order Status</Text>
                            <Text style={styles.orderStatus_number}>#{orderData.order_number}</Text>
                        </Box>
                    </HStack>
                    <HStack mt={5} justifyContent='space-evenly'>
                        {orderData.status == 'pending' && 
                        (<>
                            <StatusTracker lbl='Pending'/>
                            <InCompleteStatusTracker lbl='Order Confirmed'/>
                            <InCompleteStatusTracker lbl='Packaging'/>
                            <InCompleteStatusTracker lbl='Delivery'/>
                            <InCompleteStatusTrackerWithoutLine lbl='Complete'/>
                        </>)}
                        {orderData.status == 'order confirmed' && 
                        (<>
                            <StatusTracker lbl='Pending'/>
                            <StatusTracker lbl='Order Confirmed'/>
                            <InCompleteStatusTracker lbl='Packaging'/>
                            <InCompleteStatusTracker lbl='Delivery'/>
                            <InCompleteStatusTrackerWithoutLine lbl='Complete'/>
                        </>)}
                        {orderData.status == 'packaging' && 
                        (<>
                            <StatusTracker lbl='Pending'/>
                            <StatusTracker lbl='Order Confirmed'/>
                            <StatusTracker lbl='Packaging'/>
                            <InCompleteStatusTracker lbl='Delivery'/>
                            <InCompleteStatusTrackerWithoutLine lbl='Complete'/>
                        </>)}
                        {orderData.status == 'delivery' && 
                        (<>
                            <StatusTracker lbl='Pending'/>
                            <StatusTracker lbl='Order Confirmed'/>
                            <StatusTracker lbl='Packaging'/>
                            <StatusTracker lbl='Delivery'/>
                            <InCompleteStatusTrackerWithoutLine lbl='Complete'/>
                        </>)}
                        {orderData.status == 'complete' && 
                        (<>
                            <StatusTracker lbl='Pending'/>
                            <StatusTracker lbl='Order Confirmed'/>
                            <StatusTracker lbl='Packaging'/>
                            <StatusTracker lbl='Delivery'/>
                            <StatusTrackerWithoutLine lbl='Complete'/>
                        </>)}
                    </HStack> 
                    <TouchableOpacity alignItems='center'>
                        <HStack justifyContent='flex-start' alignItems='center' mt={10}>
                            <Text style={{fontFamily:'Inter_500Medium',fontSize:12,color:'#00A5E2'}}>See All Order Status</Text>
                            <Image alt="side arrow" source={require('../../assets/image/png_icons/sideArrowBlue3x.png')} resizeMode="contain" style={{width:10,height:10,marginHorizontal:5}}/>
                        </HStack>
                    </TouchableOpacity>                        
                </VStack>
                <VStack style={{backgroundColor:'#F8F8F8'}} p={5}>
                    <HStack justifyContent='space-evenly' alignItems='center' style={styles.services_stack}>
                        <VStack>
                            <Text style={styles.services_title}>Services</Text>
                            <HStack alignItems='center' justifyContent="space-evenly">
                                <VStack justifyContent='flex-start' alignItems='center' style={styles.service_logo} m={3}>
                                    <Image alt="sevice" source={require('../../assets/image/profile/serviceOne.png')}  style={styles.logo} />
                                    <Text style={[{fontFamily:'Inter_500Medium'},styles.logo_text]}>Jobs</Text>
                                </VStack>
                                <VStack justifyContent='flex-start' alignItems='center' style={styles.service_logo} m={3}>
                                    <Image alt="logo" source={require('../../assets/image/profile/serviceTwo.png')}  style={styles.logo}  />
                                    <Text style={[{fontFamily:'Inter_500Medium'},styles.logo_text]}>House Rent</Text>
                                </VStack>
                                <VStack justifyContent='flex-start' alignItems='center' style={styles.service_logo} m={3}>
                                    <Image alt="service" source={require('../../assets/image/profile/ServiceThree.png')}   style={styles.logo} />
                                    <Text style={[{fontFamily:'Inter_500Medium'},styles.logo_text]}>Simcard And Wifi</Text>
                                </VStack>
                                <VStack justifyContent='flex-start' alignItems='center' style={styles.service_logo} m={3}>
                                    <Image alt="logo" source={require('../../assets/image/profile/ServiceFour.png')} style={styles.logo} />
                                    <Text style={[{fontFamily:'Inter_500Medium'},styles.logo_text]}>Travel</Text>
                                </VStack>
                            </HStack>  
                        </VStack>
                    </HStack> 
            
                    <HStack justifyContent='center' alignItems='center' style={styles.promotion_stack}>
                        <VStack>
                            <Text style={styles.services_title}>Promotions</Text>
                            <Image alt="promotion" source={require('../../assets/image/profile/promotion_bg.png')}  style={styles.promotion_bg} />
                        </VStack> 
                    </HStack>
                </VStack>
            </Box>
        </ScrollView>
         <Toast />
    </NativeBaseProvider>
    );
    }
  }

  export default Profile;