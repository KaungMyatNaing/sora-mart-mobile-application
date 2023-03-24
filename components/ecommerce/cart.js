import React,{useCallback, useEffect,useState,useRef} from 'react';
import {
    Box,
    FlatList,
    HStack,
    VStack,
    Text,
    Spacer,
    Center,
    Checkbox,
    Divider,
    Image,
    CloseIcon,
} from 'native-base';
import { styles } from '../../assets/css/ecommerce/cartStyle';
import { TouchableOpacity,View, ScrollView} from 'react-native';
import config from '../../config/config';
import { ActivityIndicator } from 'react-native-paper';
import axios from 'axios'; 
import { AsyncStorage } from 'react-native';
import TabbarMenu from '../layouts/TabberMenu';
import { useIsFocused } from '@react-navigation/native' // for re-render
import ToastHelper from '../Helper/toast';
import Toast from 'react-native-toast-message';
import AwesomeAlert from 'react-native-awesome-alerts'
import { data } from '../Blog/HomeWifi/homeWifiFormItems';
import { translate } from 'react-native-translate';


function ShoppingCart({navigation}) {
    const [checked, setChecked] = useState(false);
    const [quantity,setQuantit] = useState(1);
    const [isLocal,setIsLocal] = useState(false);
    const [cart_product,setCartProduct] = useState([]);
    const [loading,setLoading] = useState(true);
    const baseUrl = config.baseUrl + '/api/carts';
    const profile_url = config.baseUrl + '/api/profile/get';
    const componentMounted = useRef(true);
    const [show,setShow] = useState(false);
    const [totalAmount, setTotalAmount] = useState(0);
    const [myPoint,setMyPoint] = useState(0);
    const [maxPoint,setMaxPoint] = useState(0);
    const [usePointAmount,setUsePointAmount] = useState(0);
    const [extra, setExtra] = useState(0);
    const [returnData, setReturnData] = useState(false);
    const isFocused = useIsFocused();
    const [remove, setRemove] = useState(false);
    const [plus, setPlus] = useState(false);
    const [minus, setMinus] = useState(false);
    const [first, setFirst] = useState(true);

    const [total, setTotal] = useState();
    const [erate, setErate] = useState();

    const headers = { 
        'Accept': 'application/json', 
        'Authorization' : 'Bearer '+ global.auth,        
    }

    const [value, setValue] = useState('one');
    const [currencyValue, setCurrencyValue] = useState(0);   
    
    const getData = async() => {
      try {
        const res = await AsyncStorage.getItem("currency");
        const result2 = await AsyncStorage.getItem("currency_value");
        setValue(res);
        setExtra(extra + 1);
        setCurrencyValue(result2);
      } catch (error) {
        console.log(error);
      }
    };

    const [itemData, setItemData] = useState([]);
    //const retrieveData = async () => {
    //  try {
    //    const value = await AsyncStorage.getItem('item');
    //    if (value !== null) {
    //        setItemData(JSON.parse(value));  
    //        
    //       
    //    }
    //  } catch (error) {
    //    // Error retrieving data
    //      console.log(error);
    //    }
    //    if (itemData) {
    //        setCartProduct(itemData);
    //        console.log('Cart loaded')
    //        let amount = itemData.reduce((total, i) => total + i.quantity * i.price, 0)
    //    setTotal(amount);
    //       
    //      
    //    }
    //};

    const retrieveData = async () => {
        let amount = 0;
        try {
          const value = await AsyncStorage.getItem('item');
          if (value !== null) {
              setItemData(JSON.parse(value)); 
              global.final_cart = JSON.parse(value);
              amount = JSON.parse(value).reduce((total, i) => total + i.quantity * i.price, 0)
              console.log(amount)
             
          }
        } catch (error) {
          // Error retrieving data
            console.log(error);
          }
        if (itemData) {
              setCartProduct(itemData)
            console.log('Cart loaded')
            global.final_cart = cart_product;
             amount = cart_product.reduce((total, i) => total + i.quantity * i.price, 0)
            console.log(amount);
            setTotal(amount);
             
            
          }
      };

    function getCats() {
        //if(global.auth == '' || global.auth == null){
            if(itemData) {
                setCartProduct(itemData)
                //console.log("itemDatea", itemData);
                setLoading(false);
                setIsLocal(true);
            } else {
                setTimeout(function(){setReturnData(true)}, 1000);
                if(returnData) {
                    setLoading(false);
                    navigation.replace('Drawer');
                    ToastHelper.toast("There is no item", null, 'error');
                }  
            }
        //}else{
        //    axios.get(baseUrl, { headers })
        //    .then(response => { 
        //        if (componentMounted.current){ // (5) is component still mounted?
        //            setCartProduct(response.data.data[0].cart_products);
        //            calculateTotalAmount(response.data.data[0].cart_products);
        //            setLoading(false);
        //        }                
        //    })    
        //    .catch((error) => {
        //        console.log(error);
        //    });
        //}
    }

    function getProfile() {
        if(global.auth == '' || global.auth == null){
        }else{
           
            fetch('https://sora-mart.com/api/me', {
            headers: {
                'Accept' : 'application/json',
                'Authorization' : global.auth,
              },
        })
        .then((response) => response.json())
                .then((data) => {
                    if (componentMounted.current) { 
                        setMyPoint(data.data.m_point.current_point);
                        setMaxPoint(data.data.m_point.current_point);
                        console.log(myPoint, maxPoint);
                        setLoading(false);
                    }
    
                }).catch((error) => {
                    setLoading(false);
                    navigation.replace('Drawer');
                    ToastHelper.toast("There is no item", null, 'error');
          });
        }
    }

    function getExchange() {
        fetch('https://sora-mart.com/api/settings?key=m_point_rate', {
            headers: {
                'Accept' : 'application/json',
               
              },
        })
        .then((response) => response.json())
                .then((data) => {
                   
                        setErate(data.data.value);
                       
              
    
                }).catch((error) => {
                    console.log(error);
          });
    }
   

    useEffect(()=>{  
        getProfile();  
        getCats();
        getExchange();
        
        //calculateTotalAmount(cart_product);
    }, [value])
   

    useEffect(async() => {
        const value = await AsyncStorage.getItem('item');
        if (value !== null) { 
            setTotal(JSON.parse(value).reduce((total, i) => total + i.quantity * i.price, 0));
        }
        retrieveData();
        //calculateTotal(cart_product);
        //getData();
    }, [remove, plus, minus,cart_product])
    

    //useEffect(() => {
    //   
    //    if (cart_product) {
    //        calculateTotal(cart_product);
    //    }
    //},[])

    
   
    const minusAction = () => {
        let qty = quantity - 1;

        if(qty > 0){
            setQuantit(qty);
        }else{
            ToastHelper.toast('at least 1 item need to be choosed', null, 'error');
            // alert('at least 1 item need to be choosed');
        }
    }

    const minusMyPoint = () => {
        if(myPoint > 0 ) {
            setMyPoint(myPoint - 1);
        }
    }

    const plusAction = () => {
        setQuantit(quantity + 1);
    }

    const plusMyPoint = () => {
        if(myPoint >= 0 && myPoint < maxPoint){
            setMyPoint(myPoint + 1);
        }
    }
    const calculateTotal = (data) => {
       
        let amount = data.reduce((total, i) => total + i.quantity * i.price, 0)
        setTotal(amount);


        };

    const calculateTotalAmount = async (cart_products) => {
        var amount = 0;
        await cart_products.forEach(product => {
            if (value == "one") {
                if(isLocal) {
                if(product.cart_product.price){
                    amount =  parseFloat(amount) + parseFloat(product.cart_product.price) * (product.quantity && product.quantity != 0? parseFloat(product.quantity) : 1); 
                }else{
                    amount = 0;
                }
            } else {
                if(product.cart_product.price){
                    amount =  parseFloat(amount) + parseFloat(product.cart_product.price) * (product.quantity && product.quantity != 0? parseFloat(product.quantity) : 1); 
                }else{
                    amount = 0;
                } 
            }
            } else {
                if(isLocal) {
                    if(product.price_mm){
                        amount =  parseFloat(amount) + parseFloat(product.price_mm) * (product.quantity && product.quantity != 0? parseFloat(product.quantity) : 1);
                    }else{
                        amount = 0;
                    }
                } else {
                    if(product.cart_product.price_mm){
                        amount =  parseFloat(amount) + parseFloat(product.cart_product.price_mm) * (product.quantity && product.quantity != 0? parseFloat(product.quantity) : 1);
                    }else{
                        amount = 0;
                    }
                }
            }         
        });

        

        calculateUsedPointAmount(amount);

        // amount = amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
     
        setTotalAmount(parseFloat(amount));
    }

    const calculateUsedPointAmount = (amt) => {
        var usedamt = 0;
        usedamt = amt - myPoint;
        // usedamt = usedamt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        setUsePointAmount(usedamt);
    }

    const showAlert = () => {
        setShow(true);
    };

    const hideAlert = () => {
        setShow(false);
    }; 

    const renderListEmptyComponent = () => (
        <View style={styles.noNotification}>
            <Text>
                {translate('noItem')}
            </Text>
        </View>
    );

  
    const removeAction = async (guid) => {

    let items = itemData.filter((dd)=> dd.product_id != guid);
    try {
        await AsyncStorage.setItem(
          'item',
          JSON.stringify(items)
        );
        setRemove(!remove);
        retrieveData();
        //ToastHelper.toast("item successfully removed", null, 'success');
        //showAlert();
    } catch (error) {
        ToastHelper.toast(error, null, 'error');
         alert(error);
      }
    }

    const getUsedPointStyle = (isChecked) => {
        if(isChecked){
            // setIsUsedPoint(true);
            return styles.usePoint;
        }else{
            // setIsUsedPoint(false);
            return styles.unUsePoint;
        }
    }

    const getUsedPointTxtStyle = (isChecked) => {
        if(isChecked){
            return styles.usePointTxt;
        }else{
            return styles.unUsePointTxt;
        }
    }

    const checkUsePoint = (isChecked) => {
        if(isChecked){
            setUsedPoint(myPoint);
        }
    }

    const plusActionQty = async(id) => { 
        itemData.map(i => i.product_id == id && i.quantity <= i.max - 1 ? i.quantity += 1 : null)
        await AsyncStorage.setItem(
            'item',
            JSON.stringify(itemData));
           
        setPlus(!plus);
    
    }

    const minusActionQty = async(id) => {
        itemData.map(i => i.product_id == id && i.quantity <= i.max && i.quantity > 1 ? i.quantity -= 1 : null)
        await AsyncStorage.setItem(
            'item',
            JSON.stringify(itemData));
            
        setMinus(!minus);
      }

    const renderItem = ({ item }) => (
        
        <Box mb="5" justifyContent='center'>
            <VStack>                            
                <HStack justifyContent="space-between" ml={5} mr={5}>
                    {/*{isLocal? 
                        item.product_picture.length != 0 &&
                        <Image resizeMode='contain' w={95} h={130} source={{uri:config.imageUrl +'/'+ item.product_pictures[0].image_url}} alt='image' pt='5%' pb='5%' maxW='30%' mr={5}/> 
                        :
                        item.cart_product.product_picture.length != 0 &&
                        <Image resizeMode='contain' w={95} h={130} source={{uri:config.imageUrl +'/'+ item.cart_product.product_pictures[0].image_url}} alt='image' pt='5%' pb='5%' maxW='30%' mr={5}/>                                       
                    }*/}
                     <Image resizeMode='contain' w={95} h={130} source={{ uri: 'https://sora-mart.com/storage/product_picture/6374b5719d119_photo.png'}} alt='image' pt='5%' pb='5%' maxW='30%' mr={5}/> 
                    <VStack w='40%' justifyContent='space-between' alignItem='flex-start'>
                        <Text _dark={{color: "warmGray.50"}} color="coolGray.800" style={{fontFamily:'Inter_500Medium'}} >
                            {item.name}
                        </Text>
                        <Text color="coolGray.600" _dark={{color: "warmGray.200"}}>
                            {item.product_id} {item.p_attribute}
                        </Text>                                                
                        <HStack style={styles.getPoints} justifyContent='center'>
                            <Text style={[{fontFamily:'Inter_600SemiBold'},styles.getPointText]} px="2"  _dark={{ color: "warmGray.50"}} color="coolGray.800" alignSelf="flex-start">
                                {/*{myPoint} Points*/}
                                {item.m_point >= 0 ? item.m_point+" Points" : "No Points"}
                            </Text>
                        </HStack>
                        <Spacer size='5'/>
                        {/* <HStack>
                        <Text style={[{fontFamily:'Inter_600SemiBold'},styles.priceMMK]}>{value == 'one'? currencyName + ' ' : value == 'two'? 'MMK ' : 'MMK ' }</Text> 
                        {currencyValue != 0?<Text style={{fontFamily:'Inter_700Bold'}} fontWeight='bold' fontSize="md" _dark={{ color: "warmGray.50"}} color="coolGray.800" alignSelf="flex-start">{value == 'one'? item.cart_product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : item.cart_product.price_mm && item.cart_product.price_mm.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text> : <Text></Text>}
                        </HStack> */}
                        <HStack justifyContent='flex-start' alignItems='center'>
                        <Text style={[{fontFamily:'Inter_600SemiBold',marginRight:10},styles.priceMMK]}>{value == 'two' ? "MMK" : "JPY" }</Text> 
                        <Text style={{fontFamily:'Inter_700Bold'}} fontWeight='bold' fontSize="md" _dark={{ color: "warmGray.50"}} color="coolGray.800" alignSelf="flex-start">{value == 'two'? item.price_mm && item.price_mm.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : item.price && item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text> 
                        </HStack>
                    </VStack>
                    <Spacer />
                    <VStack justifyContent='space-between' maxW='20%' alignItems='flex-end'>
                        <TouchableOpacity style={{padding:10}} onPress={()=>removeAction(item.product_id)}>
                            <CloseIcon size="3" />
                        </TouchableOpacity>
                        <View  style={styles.itemCount}>
                        <HStack justifyContent='space-evenly' alignContent='center'alignItems='center'> 
                            <TouchableOpacity onPress={() => plusActionQty(item.product_id)} style={{padding:10}}>
                                <Image source={require('../../assets/image/png_icons/plus3x.png')}  alt='decrese item' style={{width:10,height:10}} resizeMode='contain'/>
                            </TouchableOpacity>
                            <Text textAlign='center' style={{fontSize:12,fontFamily:'Inter_600SemiBold'}}>{item.quantity}</Text>
                            <TouchableOpacity onPress={() => minusActionQty(item.product_id)} style={{padding:10}}>
                                <Image source={require('../../assets/image/png_icons/minus3x.png')}  alt='decrese item' style={{width:10,height:10}} resizeMode='contain'/>
                            </TouchableOpacity>                                                    
                        </HStack>
                        </View>
                    </VStack>                    
                </HStack>                            
            </VStack>
            <Divider my={2}/>
        </Box>   
    );
    
    //if (loading || cart_product) {
        if(loading || cart_product){
        return (  
            loading ?   <ActivityIndicator color='red' justifyContent='center' alignItems='center' backgroundColor='#fff' height='100%'/>  :      
            <Box w={{base: "100%", md: "25%"}} mb={0} backgroundColor='#fff' style={{flex:1}} pb={20}> 
                <VStack h={{base: "100%"}}>
                    {cart_product.length > 0 && 
                    <HStack justifyContent='flex-end' alignItems='center' p='5'>
                        <Image w="28" h="28" resizeMode="cover" source={require('../../assets/image/ShoppingCart/ActiveShop3x.png')} alt='cart'/>
                        <Divider w={39}/>
                        <Image w='28' h='28' resizeMode="cover" source={require('../../assets/image/ShoppingCart/InActivePayment3x.png')} alt='checkout'/>
                    </HStack> 
                    }                   
                      
                            {/*<FlatList
                                data={cart_product}
                                extraData={extra}
                                randomUpdateProp={cart_product}
                                // onRefresh={true}
                                refeshing={true}
                                renderItem={renderItem}
                                ListEmptyComponent={renderListEmptyComponent}
                                keyExtractor={item => item.product_id}
                            />*/}
                         <FlatList
                                data={itemData}
                                extraData={extra}
                                randomUpdateProp={itemData}
                                // onRefresh={true}
                                refeshing={true}
                                renderItem={renderItem}
                                ListEmptyComponent={renderListEmptyComponent}
                                keyExtractor={item => item.product_id}
                            />
                            {/*{
                                itemData.map(
                                    (c,index) => (
                                        <Text key={index}>{c.product_id} {c.name} {c.quantity}</Text>
                                 )
                                )
                            }*/}
                       
                    
                    {/* <Divider my={2} /> */}
                    {/*{ cart_product.length > 0 &&*/}
                    {/*<ScrollView showsVerticalScrollIndicator={false} backgroundColor='#fff'>*/}

                    <HStack minH='4%' m={5} justifyContent='space-between' alignItems='center'>
                        <HStack justifyContent='flex-start' alignItem='center' alignContent='center'>
                            <Checkbox colorScheme="red" mr='3'
                                accessible={true} 
                                accessibilityLabel="check me!"
                                onPress={() => {
                                    calculateTotalAmount(cart_product);
                                    setChecked(!checked);
                                }}/>
                            <Text style={{fontFamily: 'Inter_400Regular'}}>{translate('useMyPoint')}</Text>
                        </HStack>                        
                        <View  style={getUsedPointStyle(checked)}>
                            <HStack justifyContent='space-around' alignItems='center'>
                                <TouchableOpacity onPress={()=> minusMyPoint()} p={20}>
                                    <Image source={require('../../assets/image/png_icons/minus3x.png')}  alt='decrese item' style={{width:10,height:10}} resizeMode='contain'/>
                                </TouchableOpacity>
                                            {/*<Text style={[getUsedPointTxtStyle(checked), { fontFamily: 'Inter_600SemiBold' }]}>{value == 'one' ? (Math.round(Number(myPoint) / Number(currencyValue))) : myPoint}</Text>*/}
                                            <Text style={[getUsedPointTxtStyle(checked), { fontFamily: 'Inter_600SemiBold' }]}>{myPoint}</Text>
                                <TouchableOpacity onPress={() => plusMyPoint()} p={20}>
                                    <Image source={require('../../assets/image/png_icons/plus3x.png')}  alt='increse item' style={{width:10,height:10}} resizeMode='contain'/>
                                </TouchableOpacity>                                                   
                            </HStack>
                        </View>
                    </HStack>
                    <Divider my="2" justifyContent='flex-start' alignItem='center'/>
                    {checked ? (
                        <>
                            <HStack minH='4%' m={5} justifyContent='center' alignItems='center'>
                                    {/*<Text style={{fontFamily: 'Inter_400Regular'}}>{translate('pointDiscount')}</Text><Spacer/><Text style={{fontFamily: 'Inter_400Regular'}}>{value == 'one'? <Text>JPY - {(Math.round(Number(myPoint) / Number(currencyValue)))}</Text> : <Text>MMK - {myPoint}</Text>}</Text>*/}
                                    <Text style={{ fontFamily: 'Inter_400Regular' }}>{translate('pointDiscount')}</Text><Spacer /><Text style={{ fontFamily: 'Inter_400Regular' }}>{erate * myPoint} MMK</Text>
                                    
                            </HStack>
                                <Divider my="2" />
                                
                        </>
                    ): null}
                    {checked ?
                    (
                                totalAmount >= 0 ?
                                    //This section is about showing total when m-point is used
                        <HStack minH='5%' m='5%' justifyContent='center' alignItems='center'>
                            <Text style={{fontFamily: 'Inter_700Bold'}}>{translate('subTotal')}</Text>
                            <Spacer/>
                            <Text color='#EC1C24' style={{fontFamily: 'Inter_500Medium',marginRight:10}} mr='1' fontSize='14' >{value == 'two'? "MMK" : "JPY"}</Text>
                                        {/*<Text style={{ color: "#EC1C24", fontFamily: 'Inter_700Bold', fontSize: 18, marginRight: 3 }}>{usePointAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>*/}
                                        <Text style={{color:"#EC1C24",fontFamily:'Inter_700Bold',fontSize:18,marginRight:3}}>{total - myPoint * erate}MMK</Text>
                                                <Text style={[styles.oldPrice, { fontFamily: 'Inter_400Regular' }]}>{total}</Text>
                        </HStack>  
                        : <ActivityIndicator color='red'/>                                            
                    ):(
                        totalAmount >= 0 ?
                        <HStack minH='4%' m={5} justifyContent='center' alignItems='center'>
                            <Text style={{fontFamily: 'Inter_400Regular'}}>{translate('subTotal')}</Text>
                            <Spacer/>
                            <Text color='#EC1C24' mr='1' style={{fontFamily: 'Inter_400Regular',marginRight:10}} fontSize='14'>{value == 'two'? "MMK" : "JPY" }</Text>                            
                                                <Text mr={1} style={{ color: "#EC1C24", fontFamily: 'Inter_700Bold', fontSize: 18 }}>{totalAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{total}</Text> 
                        </HStack>
                        : <ActivityIndicator color='red'/>  
                        )                  
                        }  
                         <HStack minH='5%' m='5%' justifyContent='center' alignItems='center'>
                            <Text style={{fontFamily: 'Inter_700Bold'}}>{translate('subTotal')}</Text>
                            <Spacer/>
                            <Text color='#EC1C24' style={{fontFamily: 'Inter_500Medium',marginRight:10}} mr='1' fontSize='14' >{value == 'two'? "MMK" : "JPY"}</Text>
                                        {/*<Text style={{ color: "#EC1C24", fontFamily: 'Inter_700Bold', fontSize: 18, marginRight: 3 }}>{usePointAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>*/}
                                        <Text style={{color:"#EC1C24",fontFamily:'Inter_700Bold',fontSize:18,marginRight:3}}>{total - (myPoint * erate)}MMK</Text>
                                                <Text style={[styles.oldPrice, { fontFamily: 'Inter_400Regular' }]}>{total}</Text>
                        </HStack> 
                    {/* <Center>
                        <TouchableOpacity style={styles.signInBtn} onPress={() => navigation.replace('Shipping and Payments',{point:myPoint,isUsed:checked})}>
                            <Text style={{fontFamily: 'Inter_700Bold',fontSize:16,fontWeight:'700',color:'#FFF',textAlign:'center'}}>{translate('checkout')}</Text>
                        </TouchableOpacity>
                    </Center>    */}
                                
                {/*</ScrollView>*/}
                {/*}                                  */}
                    </VStack>  
                    
            <View style={styles.tab}>
                        <Center>
                            {cart_product.length > 0 || itemData.length > 0 ? <TouchableOpacity style={styles.signInBtn} onPress={() => navigation.replace('Shipping and Payments', {point: myPoint, isUsed: checked, total: total,m_discount: erate * myPoint})}>
                                <Text style={{ fontFamily: 'Inter_700Bold', fontSize: 16, fontWeight: '700', color: '#FFF', textAlign: 'center' }}>{translate('checkout')}</Text>
                        </TouchableOpacity> :   <TouchableOpacity disabled  style={styles.signInBtn} onPress={() => navigation.replace('Shipping and Payments',{point:myPoint,isUsed:checked})}>
                                <Text style={{ fontFamily: 'Inter_700Bold', fontSize: 16, fontWeight: '700', color: '#FFF', textAlign: 'center' }}>{translate('checkout')}</Text>
                        </TouchableOpacity>}
                      
                    </Center>   
                <TabbarMenu cartCount={cart_product && cart_product != ''? cart_product.length: ''}/>   
            </View>
                <Toast/>
            <AwesomeAlert
                show={show}
                showProgress={false}
                title="Removed"
                message="Item is removed from your cart"
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}                
                showConfirmButton={true}                
                confirmText="OK"
                confirmButtonColor="#EC1C24"
                confirmButtonStyle={styles.btn}                
                titleStyle={styles.alertTitle}
                messageStyle={styles.alertMsg}
                contentContainerStyle={styles.alertContainer}
                onConfirmPressed={() => {
                    hideAlert();
                }}
                />
            </Box>    
        )
    }else{
        return (
            <View style={styles.noNotification} backgroundColor='#fff'>
                <Text>
                    {translate('noItem')}
                </Text>
            </View>
        );
    }
}

export {ShoppingCart};
