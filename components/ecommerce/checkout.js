import React,{ useState ,useEffect,useRef} from 'react';
import {
    Box,
    FlatList,
    HStack,
    VStack,
    Spacer,
    Center,
    Divider,
    Image,
    View,
    Text,
    Switch,
    ScrollView,
    Modal
} from 'native-base';
import { styles } from '../../assets/css/ecommerce/checkoutStyle';
import {ActivityIndicator, TouchableOpacity,Alert} from 'react-native';
import { useDispatch,useSelector } from 'react-redux';
import config from '../../config/config';
import { apiGetActionCreator, apiGetAuthActionCreator, apiGetMultipleActionCreator } from '../../backend/ApiActionCreator';
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native' // for re-render
import ToastHelper from '../Helper/toast';
import ToastManager from 'toastify-react-native';
import { AsyncStorage } from 'react-native';
import { translate } from 'react-native-translate';
import { SuccessToast } from 'react-native-toast-message';
import Toast from 'react-native-toast-message';

import ModalExample from './address/modalExample';
import PaymentModal from './payments/paymentModal';

function ShippingAndPayment({route,navigation}) {

    if(route.params != null){
        global.point = route.params.point;
        global.isUsedPoint = route.params.isUsed;
        global.total = route.params.total;
        global.m_discount = route.params.m_discount;
        //global.final_cart = route.params.cart;
    }
    // const chooseAddressData = route.params.chooseAddressData;

    // const choosePaymentData = route.params.choosePaymentData;

    const componentMounted = useRef(true);
    const [deliMethod,setDeliMethod]    = useState(''); 
    const [isEnabled, setIsEnabled]     = useState(false);    
    // const [orderId, setOrderId] = useState('');
    const dispatch = useDispatch();
    const cart_baseUrl =  config.baseUrl + '/api/carts';
    const deli_baseUrl = config.baseUrl + '/api/deliveries';
    const baseUrl_checkout = config.baseUrl + '/api/orders/checkout';
    // const baseUrl_processOrder = config.baseUrl + '/api/orders/'+orderId+'/update';
    // const baseUrl_ComfirmOrder = config.baseUrl + '/api/orders/'+orderId+'/confirm';
    const myData = "{}";
    // const delis  = useSelector((state) => state.apiReducer.data);
    // const cart_product = useSelector((state) =>state.apiReducer.data2);
    const [loading,setLoading] = useState(true);
    const [deliAmount,setDeliAmount] = useState(0);
    const [usePointAmount,setUsePointAmount] = useState(0);
    const [totalAmount,setTotalAmount] = useState(0);
    const [delis,setDelis] = useState(null);
    const [cartProduct,setCartProduct] = useState();
    const [subTotal, setSubTotalAmount] = useState(0);
    const [addressshow, setAddressShow] = useState(false);
    const [paymentshow, setPaymentShow] = useState(false);
   
    const headers = { 
        'Accept': 'application/json', 
        'Authorization' : 'Bearer '+ global.auth,
    }

    function checkDefault() {
        //const default_address = '';
        //const default_payment = '';
        fetch("https://sora-mart.com/api/address", {
            headers: {
                "Content-Type": "application/json",
                'Authorization' : global.auth,  
            },
           
          })
            .then((response) => response.json())
            .then((data) => {
                if (data.status == 200) {
                    console.log(data);
                    const findAddress = data.data.filter(d => d.is_default == 1);
                    if (findAddress.length > 0) {
                        global.chooseAddress = findAddress[0];
                    } else {
                        console.log(`Since nothing is here. I don't need to do anything.`)
                    }
                  }
                }
                
            )
              .catch((error) => {
                  console.log(error)
              });
        

        //global.choosePayment = {name : "Cash On Delivery"}

    }
    function getCats() {
        axios.get(cart_baseUrl, { headers })
        .then(response => { 
            if (componentMounted.current){ // (5) is component still mounted?
                setCartProduct(response.data.data[0].cart_products);
                calculateTotalAmount(response.data.data[0].cart_products,global.isUsedPoint);
                setLoading(false);
            }               
        })    
        .catch((error) => {
            // alert("There is no item");
            console.log(error);
            // navigation.navigate('Home');
        });
    }

    const [value, setValue] = useState(null);
    const [currencyName, setCurrencyName] = useState();
    const [currencyValue, setCurrencyValue] = useState(0);
    const getData = async () => {
      try {
        const res = await AsyncStorage.getItem("currency");
        const result1 = await AsyncStorage.getItem("currency_name");
        const result2 = await AsyncStorage.getItem("currency_value");

        if (res !== null) {
          setValue(res);
        //   setExtra(extra + 1);
        //   return ;
        }
        if(result1 !== null){
            setCurrencyName(result1);
        }
        if(result2 != null){
            setCurrencyValue(result2);
        }
      } catch (error) {
        console.log(error);
      }
    };

    function getDelis() {
        fetch('https://sora-mart.com/api/deliveries', {
            headers: {
                'Accept' : 'application/json',
               
              },
        })
        .then((response) => response.json())
                .then((data) => {
                    if (componentMounted.current) {
                        setDelis(data.data);
                    }
                       
              
    
                }).catch((error) => {
                    console.log(error);
          });
        //axios.get(deli_baseUrl, { headers })
        //.then(response => { 
        //    if (componentMounted.current){ // (5) is component still mounted?
        //        setDelis(response.data.data);
        //        setLoading(false);
        //    }               
        //})    
        //.catch((error) => {
        //    // alert("There is no item");
        //    console.log(error);
        //    // navigation.navigate('Home');
        //});
    }

    const isFocused = useIsFocused() // for re-render
    useEffect(async()=>{
        await value;
        await getDelis(); 
        await getCats();
        if(value != null) {
           await calculateTotalAmount(cart_product);
        }
    }, [isFocused, value]); 

    useEffect(() => {
        //let final_cart = [];
        //global.final_cart.map((i, index) => final_cart.push(global.final_cart[index]))
        //setCartProduct(final_cart);
        //console.log(cartProduct)
        checkDefault();
        getData();
    },[]);

    // useEffect(()=>{
    //     if(global.chooseAddress != null){
    //         global.chooseAddress = route.params.chooseAddress;       
    //     } 
    //     if(global.choosePayment != null){
    //         global.choosePayment = route.params.choosePayment;
    //     }
    // },[isFocused])
    
    

    const calculateTotalAmount = async (cart_products,isUsed) => {
        var amount = 0;
        await cart_products.forEach(product => {
            if(value == "one") {
                if(product.cart_product.price){
                    amount += parseFloat(product.cart_product.price) * product.quantity;
                }else{
                    amount += 0;
                }
            } else {
                if(product.cart_product.price_mm){
                    amount += parseFloat(product.cart_product.price_mm) * product.quantity;
                }else{
                    amount += 0;
                }
            }
        });

        setSubTotalAmount(amount);

        if(point > 0 && isUsed){
            amount = amount - point; //point discount
        }

        // calculateDeliveryAmount(amount);

        amount = amount;

        setTotalAmount(amount);
    }

    // const calculateDeliveryAmount = (amt) => {
    //     var deliAmt = 0;
    //     deliAmt = amt + 3000;
    //     deliAmt = deliAmt;
    //     // setDeliAmount(deliAmt);
    // }

    //function checkoutOrder(cart_product,total, deli){
    //    if(parseFloat(total) > 0 ){
    //        if(cart_product[0] == null){
    //            alert('There is no items');
    //            navigation.replace('Home');
    //        }else{
    //            var cardId = cart_product[0].cart_id;
    //            const myData ={
    //                cart_id:cardId,
    //                order_delivery: deli
    //            };
    //            axios.post(baseUrl_checkout,myData, { headers })
    //            .then(response => {
    //                var orderId = response.data.data.guid;
    //                processOrder(orderId);
    //            })    
    //            .catch((error) => {
    //                console.log('checkout order error is ' + error);
    //            });
    //        } 
    //    }else{
    //        console.log('total amount is less than 0');
    //        navigation.replace('Home');
    //    }     
    //}

    function checkoutOrder() {
        //const final_cart =  global.final_cart;
        const final_payment = global.choosePayment.name;
        const final_point = global.point;
        const final_code = 'HHH';
    
       
        let final_cart = [];
        global.final_cart.map((i, index) => final_cart.push({product_id : global.final_cart[index].product_id, qty : global.final_cart[index].quantity  }))
        if (final_payment && final_point && final_code && final_cart) {
            const final_order = {
                cart_item: final_cart,
                payment_method: final_payment,
                used_point: final_point,
                broker_code: final_code,
        
            }
            
            fetch("https://sora-mart.com/api/checkout", {
      method: "POST", // or 'PUT'
      headers: {
          "Content-Type": "application/json",
          'Authorization' : global.auth,  
      },
      body: JSON.stringify(final_order),
    })
      .then((response) => response.json())
      .then((data) => {
          if (data.status == 200) {
              console.log('Order is success')
              Alert.alert("Success", "Your order has been successfully placed !", [{
                  text: 'Return to Home', onPress: async() => {
                      navigation.navigate("Home");
                  
                      await AsyncStorage.setItem(
                        'item',
                          null)
                      console.log('Cart cleared !')
            }}])
          }
          
      })
        .catch((error) => {
        console.log(error)
       
      });
        }

        const final_order = {
            cart_item: final_cart,
            payment_method: final_payment,
            used_point: final_point,
            broker_code: final_code,
    
        }
        console.log(final_order);
       
    }
 
    const processOrder = (oId) =>{        
        const baseUrl_ComfirmOrder = config.baseUrl + '/api/orders/'+oId+'/confirm';
        axios.post(baseUrl_ComfirmOrder,myData,{ headers })
        .then(response => { 
            // console.log(response);
            navigation.replace('Order Details',{orderId:oId});
        })    
        .catch((error) => {
            console.log("process order error is " +error);
            alert(error);
        });
    }

    const renderListEmptyComponent = () => (
        <View style={styles.noNotification}>
            <Text>
                {translate('noItem')}
            </Text>
        </View>
    );
    const renderItem = ({item}) => (          
        <HStack justifyContent='space-evenly' alignItems='center'>
            {item.cart_product.product_pictures.length == 0 ? 
            null
            :
            <Image width={100} height={100} resizeMode="contain" source={{uri:config.imageUrl +'/'+ item.cart_product.product_pictures[0].image_url}} alt='image' pt='5%' pb='5%' maxW='30%'/>        
            }
            <VStack w='40'>
                <Text m="1" style={{fontFamily: 'Inter_400Regular'}}> {item.cart_product.name}</Text>
                <Text m="1" style={[styles.notiSubTitle, {fontFamily: 'Inter_400Regular'}]}>#{item.product_id}</Text>
                <Text m="1" style={{fontFamily: 'Inter_500Medium'}}>Qty: {item.quantity}</Text>
                <HStack alignItems='center'>
                <Text m="1" style={[styles.price, {fontFamily: 'Inter_700Bold'}]}>{value == 'one'? 'JPY' : 'MMK' } </Text>
                <Text mr={1} style={{color:"#EC1C24",fontFamily:'Inter_700Bold'}}>{value == 'one'? item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : item.cart_product.price_mm && item.cart_product.price_mm.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                </HStack>
            </VStack>
        </HStack>         
    );

    function MyListWithoutPadding({lbl}){
        return(
            <HStack alignItems='center' p={1}> 
                <Image mr={2} source={require('../../assets/image/png_icons/chk_list_logo.png')} w={2} h={2} resizeMode="contain" alt='list'/>
                <Text w='90%'>{lbl}</Text>
            </HStack>
        )
    }

    function getDeliStyle(guid){
        if(guid == deliMethod){
            return styles.activeStyle;
        }else{
            return styles.inactiveStyle;
        }
    }
    function changeMethod(guid, fee){
        setDeliMethod(guid);    
        setDeliAmount(fee)   
    }

    const toggleSwitch = () => {
        setDeliMethod('');
        setDeliAmount(0);
        setIsEnabled(!isEnabled);
    }
   
    return (         
            <Box w={{base: "100%", md: "25%"}} h={{base: "100%"}} backgroundColor='#fff'>  
                <ScrollView>             
                    <VStack h={{base: "100%"}} space="5" m='4'>
                        <HStack justifyContent="flex-end" alignItems="center" p="2">
                            <Image width={28} height={28} resizeMode="cover" source={require('../../assets/image/ShippingAndPayment/InActiveShop3x.png')} alt='cart'/>
                            <Divider w={39}/>
                            <Image width={28} height={28} resizeMode="cover" source={require('../../assets/image/ShippingAndPayment/ActivePayment3x.png')} alt='checkout'/>
                        </HStack>                        
                        {/*{loading  ? <ActivityIndicator/> : 
                            <HStack>                       
                            <FlatList
                                data={final_cart}
                                renderItem={renderItem}
                                ListEmptyComponent={renderListEmptyComponent}
                                keyExtractor={item => item.name}
                                horizontal={true}
                            />
                            </HStack>
                        }*/}
                        <Divider my='2'/>
                    <TouchableOpacity onPress={() => setAddressShow(true)}>
                                <Text style={{fontFamily: 'Inter_700Bold',color:'#00A5E2',fontSize:14}}>Choose Address</Text>
                            </TouchableOpacity>
                       {global.chooseAddress == null ?
                        <>
                        <HStack alignItems='center'>
                            <Image width={6} height={6} mr={3} resizeMode="contain" source={require('../../assets/image/ShippingAndPayment/AddressIcon.png')} alt='cart'/>
                            <TouchableOpacity onPress={() => navigation.replace('Choose Address',{orderId:cartProduct})}>
                                <Text style={{fontFamily: 'Inter_700Bold',color:'#00A5E2',fontSize:14}}>{translate('choosedAddress')}</Text>
                            </TouchableOpacity>                            
                        </HStack>
                        </> :
                            <> 
                                <HStack alignItems='center' justifyContent='space-between'>
                                    <HStack>
                                        <Image width={6} height={6} mr={3} resizeMode="contain" source={require('../../assets/image/ShippingAndPayment/AddressIcon.png')} alt='cart'/>
                                        <Text style={{fontFamily: 'Inter_700Bold',fontSize:14}}>{translate('address')}</Text>
                                    </HStack>
                                    <TouchableOpacity onPress={() => navigation.replace('Choose Address',{orderId:cartProduct})}>
                                    <Text style={{ fontFamily: 'Inter_700Bold', color: '#00A5E2', fontSize: 14 }}>
                                        {/*{translate('change')}*/}
                                        Edit Address
                                    </Text>
                                    </TouchableOpacity>                            
                                </HStack>
                            {/*<MyListWithoutPadding lbl={chooseAddress.user_id}/>*/}
                                <MyListWithoutPadding lbl={chooseAddress.full_name}/>
                            <MyListWithoutPadding lbl={chooseAddress.phone} />
                            <MyListWithoutPadding lbl={chooseAddress.building_room_no} />
                            <MyListWithoutPadding lbl={chooseAddress.city} />
                            <MyListWithoutPadding lbl={chooseAddress.township}/>
                               
                            </>
                        }

                                      
                    <Divider my='2' />
                    <TouchableOpacity onPress={() => setPaymentShow(true)}>
                                <Text style={{fontFamily: 'Inter_700Bold',color:'#00A5E2',fontSize:14}}>Choose Payment</Text>
                            </TouchableOpacity>
                        {global.choosePayment == null ? 
                        <HStack alignItems="center">
                            <Image width={6} height={6} mr={3} resizeMode="contain" source={require('../../assets/image/ShippingAndPayment/PaymentMethodIcon3x.png')} alt='cart'/>
                            <TouchableOpacity onPress={() => navigation.replace('Choose Payment Method',{orderId:cartProduct})}>
                                <Text style={{fontFamily: 'Inter_700Bold',color:'#00A5E2',fontSize:14}}>{translate('choosedPaymentMethod')}</Text>
                            </TouchableOpacity>
                        </HStack> : 
                        <> 
                            <HStack alignItems='center' justifyContent='space-between'>
                                <HStack>
                                    <Image width={6} height={6} mr={3} resizeMode="contain" source={require('../../assets/image/ShippingAndPayment/PaymentMethodIcon3x.png')} alt='cart'/>
                                    <Text style={{fontFamily: 'Inter_700Bold',fontSize:14}}>{translate('payment')}</Text>
                                </HStack>
                                <TouchableOpacity onPress={() => navigation.replace('Choose Payment Method',{orderId:cartProduct})}>
                                    <Text style={{fontFamily: 'Inter_700Bold',color:'#00A5E2',fontSize:14}}>{translate('change')}</Text>
                                </TouchableOpacity>                            
                            </HStack>
                            <HStack alignItems='center' p={1}>
                                <Image alt='card' source={require('../../assets/image/master.png')} mr={2} w={5} h={5} resizeMode='contain'/> 
                                <Text style={styles.secondText}>{choosePayment.name}</Text>
                            </HStack>
                            {/*<MyListWithoutPadding lbl={choosePayment.name}/>*/}
                            {/*<MyListWithoutPadding lbl={choosePayment.card_no}/>*/}
                        </>
                        }
                        <Divider my='2'/>
                        <HStack alignItems='flex-end'>
                            <VStack>
                                <HStack>
                                    <Image mr="3" width={6} height={6} resizeMode="contain" source={require('../../assets/image/ShippingAndPayment/DeliveyMethodIcon3x.png')} alt='cart'/>
                                    <Text mb="3" style={{fontFamily: 'Inter_700Bold'}}>{translate('deliMethod')}</Text>
                                </HStack>
                                <Spacer size='1'/>                        
                                {delis != null && !isEnabled ?
                                    (
                                        <HStack justifyContent='space-evenly' mb="3">
                                            {delis.map((deli)=>
                                                <TouchableOpacity style={getDeliStyle(deli.guid)} onPress={()=>changeMethod(deli.guid, deli.fee)}>
                                                    <Text>{deli.name}</Text>
                                                </TouchableOpacity>
                                            )}
                                        </HStack> 
                                    ): null
                                }                         
                                <Text>
                                     {translate('pickupMyself')}
                                    <Image width={5} height={5} resizeMode="contain" source={require('../../assets/image/ShippingAndPayment/AddressIcon.png')} alt='cart'/>
                                    <Text underline color="#ec1c24" style={{fontFamily: 'Inter_400Regular'}}> M-Drive Shop</Text>                            
                                </Text>  
                                <Text fontSize='xs' color='grey' style={{fontFamily: 'Inter_400Regular'}}>{translate('pickupAndSave')}</Text>                                                
                            </VStack>
                            <Spacer size='1'/>                                                     
                            <Switch                            
                                onTrackColor="red.200"
                                onThumbColor="red.500"
                                justifyContent='flex-end'
                                size='md'
                                onChange={() =>toggleSwitch()}
                                value={isEnabled}
                            />
                        </HStack>
                    <Divider my='2' />
                    {global.isUsedPoint ?  <HStack alignItems='center'>
                            <Image mr="3" width={6} height={6} resizeMode="contain" source={require('../../assets/image/png_icons/InfoIcon.png')} alt='cart'/>
                            <Text>{translate('use')} <Text bold>{point.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text> M-Points</Text>
                        </HStack> : null}
                       
                        <Divider my='2'/>                        
                        <VStack>
                            <HStack>
                                <Text style={styles.paymentTitle}>{translate('subTotal')}</Text>
                                <Spacer size='1'/>
                            {/*<Text style={{fontFamily: 'Inter_400Regular'}}>{subTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>*/}
                            <Text style={{fontFamily: 'Inter_400Regular'}}>{global.total}</Text>
                            </HStack>
                            {/* <HStack>
                                <Text style={styles.paymentTitle}>Discount</Text>
                                <Spacer size='1'/>
                                <Text style={{fontFamily: 'Inter_400Regular'}}>100</Text>
                            </HStack> */}
                            <HStack>
                                <Text style={styles.paymentTitle}>{translate('pointDiscount')}</Text>
                                <Spacer size='1'/>

                            {/*<Text style={{ fontFamily: 'Inter_400Regular' }}>{global.isUsedPoint ? point.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0}</Text>*/}
                            {global.isUsedPoint ? <Text style={{fontFamily: 'Inter_400Regular'}}>{ global.m_discount}</Text> : null}
                         
                            </HStack>
                            {!isEnabled && 
                            <HStack>
                                <Text style={styles.paymentTitle}>{translate('deliFee')}</Text>
                                <Spacer size='1'/>
                                <Text style={{fontFamily: 'Inter_400Regular'}}>{deliAmount}</Text>
                            </HStack>}
                        </VStack>                        
                        <Divider/>
                        <HStack justifyContent='space-between' alignItems='center'>
                            <Text style={{fontFamily: 'Inter_700Bold',fontSize:16}}>{translate('total')}</Text>
                            <Spacer size='1'/>
                            <Text mr='1' style={[{fontFamily:'Inter_500Medium',fontSize:14,marginRight:10},styles.spTotalCost]}>{value == 'one'? "JYP" : "MMK" }</Text>
                            {/* <Text bold fontSize='lg' style={[{fontFamily:'Inter_700Bold',fontSize:19},styles.spTotalCost]}>{isEnabled? totalAmount : deliAmount}</Text> */}
                            <Text bold fontSize='lg' style={[{fontFamily:'Inter_700Bold',fontSize:19},styles.spTotalCost]}>{isEnabled ? Math.round(Number(global.total - global.m_discount)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 
                            Math.round(Number(global.total - global.m_discount) + Number(deliAmount)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                        </HStack>
                        <Center>
                            <TouchableOpacity style={styles.signInBtn}  onPress={() => checkoutOrder()}>
                                <Text style={{fontFamily: 'Inter_700Bold',fontSize:16,fontWeight:'700',color:'#FFF',textAlign:'center'}}>{translate('proceedtopayment')}</Text>
                            </TouchableOpacity>
                        </Center>
                    </VStack>                
                </ScrollView>    
            {/* <Toast />           */}
            <ModalExample isOpen={addressshow} onClose={() => setAddressShow(false)} />
            <PaymentModal isOpen={paymentshow} onClose={()=> setPaymentShow(false)} />
            </Box> 
    )
}
export default ShippingAndPayment;