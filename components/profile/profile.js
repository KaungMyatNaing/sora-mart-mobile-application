import React, { useState,useEffect } from 'react';

import { NativeBaseProvider, Box, ScrollView,useSafeArea, VStack, HStack, View} from 'native-base';
import { Text, Image, TouchableOpacity } from 'react-native';
import { styles } from '../../assets/css/profile/profileStyle';
import {StatusTracker,InCompleteStatusTracker, StatusTrackerWithoutLine,InCompleteStatusTrackerWithoutLine} from './statusTracker';
import config from '../../config/config';
import axios from 'axios';
import { ActivityIndicator } from 'react-native';
import TabbarMenu from '../layouts/TabberMenu'; 
import ToastHelper from '../Helper/toast';
import { useIsFocused } from '@react-navigation/native' // for re-render
import Toast from 'react-native-toast-message';
import { translate } from 'react-native-translate';
function Profile({ navigation }) {
    const [profileData,setProfileData] = useState('');
    const [orderData,setOrderData] = useState(null);
    const [loading,setLoading] = useState(true);
    const baseUrl = config.baseUrl + '/api/profile/get';
    const baseUrl2 = config.baseUrl + '/api/orders';

    const isFocused = useIsFocused() // for re-render

    useEffect(() => {

        if(global.auth == '' || global.auth == null){
            global.forceLoginMsg = config.forceLoginMsg;
            navigation.replace('Sign In');
        }else{
            const headers = { 
                'Accept': 'application/json', 
                'Authorization' : 'Bearer '+ global.auth,        
            }
            function getProdileData(){
                return axios.get(baseUrl,{ headers });
            }    
            function getOrderData(){
                return axios.get(baseUrl2,{ headers });
            }
            axios.all([getProdileData(), getOrderData()])
            .then(axios.spread(function (profileData, orderData) {     
                setProfileData(profileData.data.data);
                setOrderData(orderData.data.data[0]);
                setLoading(false);
            }))
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
        }
        
    }, [isFocused]); // ifFocuesd is for re-render

    const safeAreaProps = useSafeArea({
        safeAreaTop: true,
        pt: 2
      });

    const goToServices = (type)=>{
        global.service_type = type;
        navigation.navigate('Other Services');
    }

    return (
            <NativeBaseProvider>
                  <View style={[styles.container, {flex:1}]}>
                <ScrollView>
                <Box  {...safeAreaProps}  style={styles.container}>
                { loading? 
            <ActivityIndicator size="large" color="red" justifyContent='center' alignItems='center' style={{height:'80%'}}/> :
                    (<VStack space="2" m='5' mt={0} style={styles.bg}>
                    <HStack alignItems='center' justifyContent="space-between"> 
                        <HStack alignItems='flex-start'  space="3"  justifyContent="center">                            
                            {profileData.profil_pic ? <Image resizeMode='cover' source={{ uri: config.imageUrl +'/'+ profileData.profil_pic }} alt="profile img" style={styles.logo}/>
                            :<Image alt="profile" source={require('../../assets/image/profile/Profile_imgage.png')}  style={styles.logo}/>
                            }
                            <Box m='2'>
                                <Text style={[{fontFamily:'Inter_700Bold'},styles.bold]}>{profileData && profileData.fullname}</Text>
                                <Text style={[{fontFamily:'Inter_400Regular'},styles.regular]}>{profileData && profileData.ph_no}</Text>
                            </Box>
                        </HStack>
                        <TouchableOpacity onPress={()=>navigation.navigate('Profile Setting',{userData:profileData})}>
                            <Image alt="setting" source={require('../../assets/image/profile/Profile_setting-icon.png')} style={styles.logo_setting}/>           
                        </TouchableOpacity>             
                    </HStack>
                    <HStack alignItems='center' justifyContent="space-between" style={styles.point_stack}>
                        <HStack alignItems='center'  justifyContent="space-between" >
                            <TouchableOpacity onPress={()=>navigation.navigate('Point History')}>
                                <Box>
                                    <Text style={styles.text_point_title}>M-Point</Text>
                                    <Text   style={[{fontFamily:'Inter_500Medium'},styles.text_point]} >{profileData && profileData.total_point}</Text>
                                </Box>
                            </TouchableOpacity>
                            <Image alt="point" m="2" source={require('../../assets/image/profile/logo_poin.png')}   style={styles.logo_point}/>
                        </HStack>
                        <Box style={styles.earn_btn}>                           
                            <HStack>
                                <Image alt="earn" source={require('../../assets/image/earn_point.png')}   style={styles.logo_earn_point}/>
                                <Text style={{fontFamily:'Inter_500Medium',fontSize:14,color:'#ec1c24'}}>{translate('earnPoint')}</Text>
                            </HStack>
                        </Box>
                    </HStack>
                    <HStack mt={5} alignItems='center' justifyContent="space-between"  style={styles.orderStatus_stack}>
                        <Box>
                            <Text style={styles.orderStatus_text}>{translate('myOrderStatus')}</Text>
                            <Text style={styles.orderStatus_number}>#{orderData && orderData.order_number}</Text>
                        </Box>
                    </HStack>
                    <HStack mt={5} justifyContent='space-evenly'>
                        {orderData && orderData.status == 'pending' && 
                        (<>
                            <StatusTracker lbl='Pending'/>
                            <InCompleteStatusTracker lbl='Order Confirmed'/>
                            <InCompleteStatusTracker lbl='Packaging'/>
                            <InCompleteStatusTracker lbl='Delivery'/>
                            <InCompleteStatusTrackerWithoutLine lbl='Complete'/>
                        </>)}
                        {orderData && orderData.status == 'order confirmed' && 
                        (<>
                            <StatusTracker lbl='Pending'/>
                            <StatusTracker lbl='Order Confirmed'/>
                            <InCompleteStatusTracker lbl='Packaging'/>
                            <InCompleteStatusTracker lbl='Delivery'/>
                            <InCompleteStatusTrackerWithoutLine lbl='Complete'/>
                        </>)}
                        {orderData && orderData.status == 'packaging' && 
                        (<>
                            <StatusTracker lbl='Pending'/>
                            <StatusTracker lbl='Order Confirmed'/>
                            <StatusTracker lbl='Packaging'/>
                            <InCompleteStatusTracker lbl='Delivery'/>
                            <InCompleteStatusTrackerWithoutLine lbl='Complete'/>
                        </>)}
                        {orderData && orderData.status == 'delivery' && 
                        (<>
                            <StatusTracker lbl='Pending'/>
                            <StatusTracker lbl='Order Confirmed'/>
                            <StatusTracker lbl='Packaging'/>
                            <StatusTracker lbl='Delivery'/>
                            <InCompleteStatusTrackerWithoutLine lbl='Complete'/>
                        </>)}
                        {orderData && orderData.status == 'complete' && 
                        (<>
                            <StatusTracker lbl='Pending'/>
                            <StatusTracker lbl='Order Confirmed'/>
                            <StatusTracker lbl='Packaging'/>
                            <StatusTracker lbl='Delivery'/>
                            <StatusTrackerWithoutLine lbl='Complete'/>
                        </>)}
                    </HStack> 
                    <TouchableOpacity alignItems='center' onPress={()=>navigation.navigate('My Orders List')}>
                        <HStack justifyContent='flex-start' alignItems='center' mt={10}>
                            <Text style={{fontFamily:'Inter_500Medium',fontSize:12,color:'#00A5E2'}}>{translate('seeAllStatus')}</Text>
                            <Image alt="side arrow" source={require('../../assets/image/png_icons/sideArrowBlue3x.png')} resizeMode="contain" style={{width:10,height:10,marginHorizontal:5}}/>
                        </HStack>
                    </TouchableOpacity>                        
                </VStack>)
                }
                <VStack style={{backgroundColor:'#F8F8F8'}} p={5} mb={12}>
                    <HStack justifyContent='space-evenly' alignItems='center' style={styles.services_stack}>
                        <VStack>
                            <Text style={styles.services_title}>{translate('services')}</Text>
                            <HStack alignItems='center' justifyContent="space-evenly">
                                <TouchableOpacity onPress={()=>goToServices('Job')}>
                                    <VStack justifyContent='flex-start' alignItems='center' style={styles.service_logo} m={3}>
                                        <Image alt="service" source={require('../../assets/image/profile/serviceOne.png')}  style={styles.logo} />
                                        <Text style={[{fontFamily:'Inter_500Medium'},styles.logo_text]}>{translate('job')}</Text>
                                    </VStack>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=>goToServices('House')}>
                                    <VStack justifyContent='flex-start' alignItems='center' style={styles.service_logo} m={3}>
                                        <Image alt="logo" source={require('../../assets/image/profile/serviceTwo.png')}  style={styles.logo}  />
                                        <Text style={[{fontFamily:'Inter_500Medium'},styles.logo_text]}>{translate('houseRent')}</Text>
                                    </VStack>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=>goToServices('Wifi')}>
                                    <VStack justifyContent='flex-start' alignItems='center' style={styles.service_logo} m={3}>
                                        <Image alt="logo" source={require('../../assets/image/profile/ServiceThree.png')}   style={styles.logo} />
                                        <Text style={[{fontFamily:'Inter_500Medium'},styles.logo_text]}>{translate("simcard")}</Text>
                                    </VStack>
                                </TouchableOpacity><TouchableOpacity onPress={()=>goToServices('Travel')}>
                                    <VStack justifyContent='flex-start' alignItems='center' style={styles.service_logo} m={3}>
                                        <Image alt="logo" source={require('../../assets/image/profile/ServiceFour.png')} style={styles.logo} />
                                        <Text style={[{fontFamily:'Inter_500Medium'},styles.logo_text]}>{translate('travel')}</Text>
                                    </VStack>
                                </TouchableOpacity>
                            </HStack>  
                        </VStack>
                    </HStack> 
            
                    <HStack justifyContent='center' alignItems='center' style={styles.promotion_stack}>
                        <VStack>
                            <Text style={styles.services_title}>{translate('promotion')}</Text>
                            <Image alt="promotion" source={require('../../assets/image/profile/promotion_bg.png')}  style={styles.promotion_bg} />
                        </VStack> 
                    </HStack>
                </VStack>
            </Box>
        </ScrollView>
        <View style={styles.tab}>
            <TabbarMenu/>  
        </View>
  </View>
   <Toast />
    </NativeBaseProvider>
    );
  }

  export default Profile;