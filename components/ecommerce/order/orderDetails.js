import { Divider, HStack, VStack,Image, Box,Text } from 'native-base';
import { View ,ScrollView} from 'react-native';
import React,{useState,useEffect} from 'react';
import { TouchableOpacity } from 'react-native';
import { styles } from '../../../assets/css/OrderDetailsStyle';
import config from '../../../config/config';
import axios from 'axios';
import { ActivityIndicator } from 'react-native';
import { useIsFocused } from '@react-navigation/native' // for re-render
import ToastHelper from '../../Helper/toast';
import { marginBottom, style } from 'styled-system';
import { translate } from 'react-native-translate';
import { Linking } from 'react-native';
import { AsyncStorage } from 'react-native';

// import ToastManager, { Toast } from 'toastify-react-native';

const statusData = {
    'pending' : 'Pending',
    'pendingDate' : 'Estimated 1 Day',
    'confirmed' : 'Order Confirmed',
    'confirmedDate' : 'On 31st Dec',
    'packaging' : 'Packaging',
    'packagingDate' : 'Estimated 1 Day',
    'delivery' : 'Delivery',
    'deliveredDate' : 'Estimated 2 Day',
    'complete' : 'Complete',
}

function OrderDetails({route,navigation}){

    const orderId = route.params.orderId;

    const [data,setData] = useState(null);
    const [cartProducts,setCartProducts] = useState(null);
    const [orderProfile, setOrderProfile] = useState([]);
    
    const headers = { 
        'Accept': 'application/json', 
        'Authorization' : 'Bearer '+ global.auth,        
    }
    const [loading,setLoading] = useState(true);

    const [currency,setCurrency] = useState('one');
     
    const baseUrl = config.baseUrl + '/api/orders/' + orderId;

    const profile_url = config.baseUrl + '/api/profile/get';

    const isFocused = useIsFocused(); // for re-render

    useEffect(() => {
        const {order_id} = route.params;
        if (order_id) {
            fetch(`https://sora-mart.com/api/order-detail/${order_id}`, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: global.auth,
            },
          })
            .then((response) => response.json())
            .then((data) => {

                setData(data.data);
                //console.log(data.data);
                setLoading(false); 
                data.data.cart.cart_items.map((i,index) => console.log(i.product.name))
               
              
            })
            .catch((error) => console.log(error));
        }
        
    }, [isFocused]);


    //useEffect(() => {      
    //    axios.get(baseUrl, { headers })
    //    .then(response => {        
    //        setCartProducts(response.data.data.order_cart.cart_products); 
    //        setData(response.data.data);
    //        setLoading(false);
    //    })    
    //    .catch((error) => {
    //        ToastHelper.toast(error, null, 'error');
    //        // alert(error);
    //    });
    //}, [isFocused]);
    
    useEffect(()=>{
        ProfileDate();
        getDefaultCurrency();
    },[]);

    const ProfileDate = () => {
        axios.get(profile_url, { headers })
        .then(response => {        
            setOrderProfile(response.data.data);             
            setLoading(false);
        })    
        .catch((error) => {
            ToastHelper.toast(error, null, 'error');
            // alert(error);
        });
    }

    const getDefaultCurrency = async() => {
        try {
            const res = await AsyncStorage.getItem("currency");        
            setCurrency(res);
          
        } catch (error) {
          console.log(error);
        }
      };


    const OrderStatusItems = ({status,date=''}) =>{
        return(
            <HStack justifyContent='flex-start'>
                <VStack justifyContent='flex-start' alignItems='flex-start'>
                    <Image alt="complete" mr='5' style={styles.orderStatusIcon} source={require('../../../assets/image/png_icons/completeStatus3x.png')}></Image>
                </VStack>
                <Text>{status}({date})</Text>
            </HStack>
        );    
    }
    
    const InCompleteOrderStatusItems = ({status,date=''}) => {
        return(
            <HStack>
                <Image alt="incomplete" mr='5' style={styles.orderStatusIcon} source={require('../../../assets/image/png_icons/inCompleteStatus3x.png')}></Image>
                <Text>{status}({date})</Text>
            </HStack>
        );
    }
    
    const OrderContactItems = ({txt}) =>{
        return(
            <HStack justifyContent='flex-start' alignItems='center' h={5}>
                <Image alt="contact icon" mr={2} style={styles.orderContactIcon} source={require('../../../assets/image/orderDetails/contactIcon.png')}></Image>
                <Text>{txt}</Text> 
            </HStack>
        );
    }
    
    const OrderContact = ({orderData}) => {
        return (
            <VStack justifyContent='space-evenly'>  
                <HStack justifyContent='flex-start'>
                    <Image alt="user regular" mr='3' w={6} h={6} source={require('../../../assets/image/png_icons/userRegular.png')} />
                    <Text>{translate('contact')}</Text>
                </HStack>
                <OrderContactItems txt='+959782816884'/>
                <OrderContactItems txt={orderData.order_address}/>
                
                <Text>Pick up by myself at <Image alt="address icon" w={4} h={4} source={require('../../../assets/image/png_icons/addressIcon.png')} />
                <Text>M-Drive Shop</Text></Text>
            </VStack>
        )
    }

    
    
    return (   
              
        <ScrollView backgroundColor='#fff' style={{ padding: 5 }}>
                <Box>
                {loading ? <ActivityIndicator/> :
                 <Box>
                     <HStack alignItems='flex-start' justifyContent='space-evenly' mb={5}>
                        <VStack>
                        <Text>{data && data.created_when}</Text> 
                        <Text>{translate('orderId')}: #{data && data.guid}</Text>
                        </VStack>  
                        {/*{orderProfile && 
                        <>
                            <TouchableOpacity style={{backgroundColor:'#EC1C24',padding:5,borderRadius:50}} onPress={()=>Linking.openURL('https://demo.myanmarwebc6.sg-host.com/live_chat?user_id='+orderProfile.guid+'&last_login=' + orderProfile.last_login)}>
                                <Image alt="sms icon" w={5} h={5} resizeMode='contain' source={require('../../../assets/image/png_icons/smsIcon.png')}/>
                            </TouchableOpacity>             
                            <TouchableOpacity style={styles.orderCancelledBtn} onPress={()=>Linking.openURL('https://demo.myanmarwebc6.sg-host.com/live_chat?user_id='+orderProfile.guid+'&last_login=' + orderProfile.last_login)}>
                                <Text style={styles.orderCancelledLbl}>{translate('cancelled')}</Text>
                            </TouchableOpacity> 
                        </>
                        }    */}
                    </HStack>
                    {data.status == 'pending' && (
                        <>
                        <OrderStatusItems status={statusData.pending} date={statusData.pendingDate}/>
                        <Image alt="vertical path" w={10} h={10} source={require('../../../assets/image/png_icons/verticalPath.png')} resizeMode='contain' ml={-2}/>
                        <InCompleteOrderStatusItems status={statusData.confirmed} date={statusData.confirmedDate}/>
                        <Image  alt="vertical path" w={10} h={10} source={require('../../../assets/image/png_icons/verticalPath.png')} resizeMode='contain' ml={-2}/>
                        <InCompleteOrderStatusItems status={statusData.packaging} date={statusData.packagingDate}/>
                        <Image alt="vertical path" w={10} h={10} source={require('../../../assets/image/png_icons/verticalPath.png')} resizeMode='contain' ml={-2}/>
                        <InCompleteOrderStatusItems status={statusData.delivery} date={statusData.deliveredDate}/>
                        <Image alt="vertical path" w={10} h={10} source={require('../../../assets/image/png_icons/verticalPath.png')} resizeMode='contain' ml={-2}/>
                        <InCompleteOrderStatusItems status={statusData.complete}/>
                        </>
                    )}
                    {data.status == 'finish' && (
                        <>
                        <OrderStatusItems status={statusData.pending} date={statusData.pendingDate}/>
                        <Image alt="vertical path" w={10} h={10} source={require('../../../assets/image/png_icons/verticalPath.png')} resizeMode='contain' ml={-2}/>
                        <OrderStatusItems status={statusData.confirmed} date={statusData.confirmedDate}/>
                        <Image alt="vertical path" w={10} h={10} source={require('../../../assets/image/png_icons/verticalPath.png')} resizeMode='contain' ml={-2}/>
                        <InCompleteOrderStatusItems status={statusData.packaging} date={statusData.packagingDate}/>
                        <Image alt="vertical path"  w={10} h={10} source={require('../../../assets/image/png_icons/verticalPath.png')} resizeMode='contain' ml={-2}/>
                        <InCompleteOrderStatusItems status={statusData.delivery} date={statusData.deliveredDate}/>
                        <Image alt="vertical path" w={10} h={10} source={require('../../../assets/image/png_icons/verticalPath.png')} resizeMode='contain' ml={-2}/>
                        <InCompleteOrderStatusItems status={statusData.complete}/>
                        </>
                    )}

                    {data.status == 'packaging' && (
                        <>
                        <OrderStatusItems status={statusData.pending} date={statusData.pendingDate}/>
                        <Image alt="vertical path" w={10} h={10} source={require('../../../assets/image/png_icons/verticalPath.png')} resizeMode='contain' ml={-2}/>
                        <OrderStatusItems status={statusData.confirmed} date={statusData.confirmedDate}/>
                        <Image alt="vertical path" w={10} h={10} source={require('../../../assets/image/png_icons/verticalPath.png')} resizeMode='contain' ml={-2}/>
                        <OrderStatusItems status={statusData.packaging} date={statusData.packagingDate}/>
                        <Image alt="vertical path" w={10} h={10} source={require('../../../assets/image/png_icons/verticalPath.png')} resizeMode='contain' ml={-2}/>
                        <InCompleteOrderStatusItems status={statusData.delivery} date={statusData.deliveredDate}/>
                        <Image alt="vertical path" w={10} h={10} source={require('../../../assets/image/png_icons/verticalPath.png')} resizeMode='contain' ml={-2}/>
                        <InCompleteOrderStatusItems status={statusData.complete}/>
                        </>
                    )}

                    {data.status == 'delivery' && (
                        <>
                        <OrderStatusItems status={statusData.pending} date={statusData.pendingDate}/>
                        <Image alt="vertical path" w={10} h={10} source={require('../../../assets/image/png_icons/verticalPath.png')} resizeMode='contain' ml={-2}/>
                        <OrderStatusItems status={statusData.confirmed} date={statusData.confirmedDate}/>
                        <Image alt="vertical path" w={10} h={10} source={require('../../../assets/image/png_icons/verticalPath.png')} resizeMode='contain' ml={-2}/>
                        <OrderStatusItems status={statusData.packaging} date={statusData.packagingDate}/>
                        <Image alt="vertical path" w={10} h={10} source={require('../../../assets/image/png_icons/verticalPath.png')} resizeMode='contain' ml={-2}/>
                        <OrderStatusItems status={statusData.delivery} date={statusData.deliveredDate}/>
                        <Image alt="vertical path" w={10} h={10} source={require('../../../assets/image/png_icons/verticalPath.png')} resizeMode='contain' ml={-2}/>
                        <InCompleteOrderStatusItems status={statusData.complete}/>
                        </>
                    )}
                    {data.status == 'complete' && (
                        <>
                        <OrderStatusItems status={statusData.pending} date={statusData.pendingDate}/>
                        <Image alt="vertical path" w={10} h={10} source={require('../../../assets/image/png_icons/verticalPath.png')} resizeMode='contain' ml={-2}/>
                        <OrderStatusItems status={statusData.confirmed} date={statusData.confirmedDate}/>
                        <Image alt="vertical path" w={10} h={10} source={require('../../../assets/image/png_icons/verticalPath.png')} resizeMode='contain' ml={-2}/>
                        <OrderStatusItems status={statusData.packaging} date={statusData.packagingDate}/>
                        <Image alt="vertical path" w={10} h={10} source={require('../../../assets/image/png_icons/verticalPath.png')} resizeMode='contain' ml={-2}/>
                        <OrderStatusItems status={statusData.delivery} date={statusData.deliveredDate}/>
                        <Image alt="vertical path" w={10} h={10} source={require('../../../assets/image/png_icons/verticalPath.png')} resizeMode='contain' ml={-2}/>
                        <OrderStatusItems status={statusData.complete}/>
                        </>
                    )} 

                    <Divider my={2}/>
                    <OrderContact orderData={data}/>
                    <Divider my={2}/>   
                    <VStack justifyContent='space-evenly'>
                            <HStack>
                                <Image alt="item icon" mr='3' w={6} h={6} source={require('../../../assets/image/png_icons/itemIcon.png')}></Image>
                                <Text>{translate('items')}</Text>
                            </HStack>
                            {data && data.cart.cart_items.map((item)=>(
                                <HStack key={item.guid} justifyContent='space-around' alignItems='center' mb='2' mt='2'>
                                    <Text style={styles.orderDetailsItems}>{item.product.name}</Text>
                                    <Text>{item.quantity}</Text>
                                    <Text>{currency == 'two' ? 'MMK' : 'JPY'} <Text>{item.product.price}</Text></Text>
                                </HStack>
                            ))}
                        </VStack>
                    <Divider my={2}/>
                    <HStack justifyContent='space-between'>
                        <Text>{translate('total')}</Text>
                        <Text>{currency == 'two' ? 'MMK' : 'JPY'} {data.net_price}</Text>
                    </HStack>
                    <Divider my={2}/>
                    <VStack style={[styles.card, styles.shadowProp, {marginBottom:"2%"}]} >                        
                        <Text style={{color:'#EC1C24'}}>
                            {translate('bankinfoMsg')}
                        </Text>                        
                    </VStack>
                    <VStack style={[styles.bank_info_card, styles.shadowProp, {marginBottom:"5%"}]}>
                        <Text>JB ゆうちょ銀行</Text>
                        <HStack><Text w={40}>{translate('name')} </Text><Text>:</Text><Text> フォン ミン スー ワィン</Text></HStack>                      
                        <HStack><Text w={40}>{translate('branch')} </Text><Text>:</Text><Text> 10140</Text></HStack>
                        <HStack><Text w={40}>{translate('bankAcc')}</Text><Text>:</Text><Text> 91602001</Text></HStack>
                        <HStack><Text w={40}>{translate('branchNo')} </Text><Text>:</Text><Text> 018</Text></HStack>
                        <Divider my={5}/>
                        <HStack><Text w={40}>三井住友銀行(SMBC)</Text></HStack>
                        <HStack><Text w={40}>{translate('name')} </Text><Text>:</Text><Text> フォン ミン スー ワィン</Text></HStack>
                        <HStack><Text w={40}>{translate('branch')} </Text><Text>:</Text><Text> 神田  (Kanda)</Text></HStack>
                        <HStack><Text w={40}>{translate('bankAcc')} </Text><Text>:</Text><Text> 3280588</Text></HStack>
                        <HStack><Text w={40}>{translate('branchNo')} </Text><Text>:</Text><Text> 219</Text></HStack>
                        <Divider my={5}/>
                        <HStack><Text w={40}>MUFJ Bank </Text></HStack>
                        <HStack><Text w={40}>{translate('name')} </Text><Text>:</Text><Text> バン ミャン ソー ワィン</Text></HStack>
                        <HStack><Text w={40}>{translate('branch')} </Text><Text>:</Text><Text> 神保町(Jimbocho)</Text></HStack>
                        <HStack><Text w={40}>{translate('bankAcc')} </Text><Text>:</Text><Text> 0974884</Text></HStack>
                        <HStack><Text w={40}>{translate('branchNo')}</Text><Text>:</Text><Text> 013</Text></HStack>
                    </VStack>
                    <VStack justifyContent='center' alignItems='center'>
                        <TouchableOpacity style={styles.seeOrderInfoBtn} onPress={() => navigation.replace('Home')}>
                            <Text style={{fontFamily: 'Inter_700Bold',fontSize:16,fontWeight:'700',color:'#FFF',textAlign:'center'}}>{translate('backhome')}</Text>
                        </TouchableOpacity>
                    </VStack>               
                    
                </Box>}</Box>
            </ScrollView>
        
    );
}

export default OrderDetails