// import React, { useState,useEffect } from 'react';

// import { Center, Box, useSafeArea, VStack, HStack, Radio, Text, Image,FlatList } from 'native-base';
// import { TouchableOpacity,View,ActivityIndicator } from 'react-native';
// import { styles } from '../../../assets/css/ecommerce/paymentStyle';
// import {apiGetAuthActionCreator} from '../../../backend/ApiActionCreator';
// import {useDispatch,useSelector} from 'react-redux';
// import config from '../../../config/config';
// import { useIsFocused } from '@react-navigation/native' // for re-render

// function MyPayment({ route,navigation }) {
//     const [orderId, setOrderId] = useState(null);    

//     const dispatch = useDispatch();
//     const data  = useSelector((state) => state.apiReducer.data);
//     const loading = useSelector((state) => state.apiReducer.loading);
//     const baseUrl = config.baseUrl + '/api/user-cards';
//     const [choosePayment, setChoosePayment] = useState(null);
//     const isFocused = useIsFocused() // for re-render

//     useEffect(() => {
//         if(route.params != null){
//             setOrderId(route.params);
//         }
//         if(global.auth == '' || global.auth == null){
//             global.forceLoginMsg = config.forceLoginMsg;
//             navigation.replace('Sign In');
//         }else{
//             dispatch(apiGetAuthActionCreator(baseUrl,global.auth));
//         }
//     }, [isFocused]);

//     const [choosedValue, setChoosedValue] = useState(null);

//     const safeAreaProps = useSafeArea({
//         safeAreaTop: true,
//         pt: 1
//       });
      
//       const getChooseStyle = ({item}) => {
        
//         if(choosedValue == item.guid ){
//             // global.choosePayment = item;
//             setChoosePayment(item);
//             return styles.radioSelectStyle;
//         }else{
//             return styles.radioSelectSecStyle;
//         }
//     }
    
//     const renderItem = ({item}) => {
//         return (
//             <Radio value={item.guid} my={1} colorScheme="red">
//                 <Box p={3} ml={3} mb={5} style={getChooseStyle({item})} width={'90%'}>
//                     <HStack justifyContent='space-between' alignItems='center' p={2}>
//                         <Box >
//                             <HStack alignItems='center'>
//                                 <Image alt='card' source={require('../../../assets/image/master.png')} mr={2}/> 
//                                 <Text style={styles.secondText}>Master Card</Text>
//                             </HStack>
//                         </Box>
//                         <TouchableOpacity onPress={() => navigation.navigate('Update PaymentInfo',{detailData:item})}>
//                             <Text style={[styles.editText,{fontFamily: 'Inter_400Regular'}]}>Edit</Text>
//                         </TouchableOpacity>
//                     </HStack>
//                     <Text p={1} style={{fontFamily: 'Inter_700Bold'}}>{item.name}</Text>
//                     <Text p={1} style={{fontFamily: 'Inter_400Regular'}}>{item.card_no}</Text>
//                     <Text p={1} style={{fontFamily: 'Inter_400Regular'}}>End in {item.month} / {item.year} </Text>
//                     <Text p={1} style={{fontFamily: 'Inter_400Regular'}}>{item.cvv}</Text>
//                     {item.is_default ?
//                     <Text p={1} style={[styles.defaultText,{fontFamily: 'Inter_400Regular'}]}>Default Address</Text>
//                     : null}
//                 </Box>
//             </Radio>
//         )
//     }

//     const renderListEmptyComponent = () => (
//         <View style={styles.noNotification}>
//             <Text>
//                 There is no card!
//             </Text>
//         </View>
//     );

//     return (                 
//         <Box {...safeAreaProps} style={styles.container} >
//             <Center>
//             {
//                 loading ?<ActivityIndicator color="red" justifyContent='center' alignItems='center' height='100%' background='#fff'/>
//                 :
//                 <VStack alignItems='center' justifyContent='center'>
//                     <Box  style={styles.containerPush}>            
//                         <Center>                        
//                             <Radio.Group
//                                 name="myRadioGroup"
//                                 accessibilityLabel="favorite number"
//                                 value={choosedValue}
//                                 onChange={(nextValue) => {
//                                 setChoosedValue(nextValue)
//                                 }}
//                             >        
//                                 <FlatList
//                                     data={data}
//                                     renderItem={renderItem}
//                                     ListEmptyComponent={renderListEmptyComponent}
//                                     keyExtractor={item => item.guid}
//                                 />  
//                             </Radio.Group>
                        
//                         </Center>            
//                         </Box>
//                         { orderId == null ?
//                             <HStack alignItems='center' justifyContent="center">
//                             <TouchableOpacity>
//                                 <Text style = {styles.addNewPayment} onPress={() => navigation.navigate('Card Information')}>ADD NEW CARD</Text>
//                             </TouchableOpacity>
//                         </HStack>
//                         :
//                         <HStack alignItems='center' justifyContent="center">
//                             <TouchableOpacity>
//                                 <Text style = {styles.createAccount} onPress={() => navigation.navigate('Card Information')}>ADD NEW CARD</Text>
//                             </TouchableOpacity>
//                         </HStack>}
//                 </VStack>}
//             )
//             </Center>
//         </Box>
//     );
//   }

//   export default MyPayment;

import React, { useState,useEffect } from 'react';

import { Box, useSafeArea, VStack, HStack,Button, Radio,Text, Center} from 'native-base';
import { View, FlatList, TouchableOpacity,Image } from 'react-native';
import { styles } from '../../../assets/css/ecommerce/addressStyle';
import config from '../../../config/config';
import {ActivityIndicator} from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native' // for re-render
import { translate } from 'react-native-translate';
import axios from 'axios';


function MyPayment({route, navigation }) {
    const [orderId, setOrderId] = useState(null);    
    const [payments, setPayments] = useState([]);
    const [loading,setLoading] = useState(true);
   
    const [userChoose, setUserChoose] = useState(null);

    const isFocused = useIsFocused() // for re-render
    
    useEffect(() => {
        if(route.params != null){
            setOrderId(route.params);
        }
        if(global.auth == '' || global.auth == null){
            global.forceLoginMsg = config.forceLoginMsg;
            navigation.replace('Sign In');
        }else{
            const baseUrl = config.baseUrl + '/api/user-cards';
            const headers = { 
                'Accept': 'application/json', 
                'Authorization' : 'Bearer '+ global.auth,  
            }
            axios.get(baseUrl,{headers})
                .then(response => {   
                    setPayments(response.data.data);
                    setLoading(false);
                })    
                .catch((error) => {
                    console.log(error);
                    setLoading(false);
                });
        }
    }, [isFocused]);

    const [choosedValue, setChoosedValue] = useState(null);
    const safeAreaProps = useSafeArea({
        safeAreaTop: true,
        pt: 1
      });

    const getChooseStyle = ({item}) => {
        
        if(choosedValue == item.guid ){
            global.choosePayment = item;
            // setUserChoose(item);
            return styles.radioSelectStyle;
        }else{
            return styles.radioSelectSecStyle;
        }
    }
    const renderListEmptyComponent = () => (
        <View style={styles.noNotification}>
            <Text>
                {translate('noItem')}
            </Text>
        </View>
    );

    const applyAction = () => {
        if(global.choosePayment == null){
            alert('Please choose address');
        }else{
            navigation.replace('Shipping and Payments');
        }
    }
    
    const renderItem = ({item}) => {
        return (
            <Radio value={item.guid} my={1} mt={2} mb={5} colorScheme="red">
                <Box ml={3} p={4} width={'88%'} style={getChooseStyle({item})}>
                    <HStack justifyContent='space-between' alignItems='center' p={2}>
                    <Box >
                       <HStack alignItems='center'>
                             <Image alt='card' source={require('../../../assets/image/master.png')} mr={2}/> 
                             <Text style={styles.secondText}>Master Card</Text>
                         </HStack>
                     </Box>
                     <TouchableOpacity onPress={() => navigation.navigate('Update PaymentInfo',{detailData:item})}>
                         <Text style={[styles.editText,{fontFamily: 'Inter_400Regular'}]}>Edit</Text>
                     </TouchableOpacity>
                    </HStack>
                    <Text p={1} style={{fontFamily: 'Inter_400Regular'}}>{item.name}</Text>
                    <Text p={1} style={{fontFamily: 'Inter_400Regular'}}>{item.card_no}</Text>
                    <Text p={1} style={{fontFamily: 'Inter_400Regular'}}>End in {item.month} / {item.year}</Text>
                    <Text p={1} style={{fontFamily: 'Inter_400Regular'}}>{item.cvv}</Text>
                    {item.is_default ?
                    <Text p={3} pl={1} style={[styles.defaultText,{fontFamily: 'Inter_500Medium'}]}>Default Address</Text>
                    : null}
                </Box>
            </Radio>
        )
    }
    // const renderItem = ({item}) => {
    //     return (
    //         <Radio value={item.guid} my={1} colorScheme="red">
    //             <Box p={3} ml={3} mb={5} style={getChooseStyle({item})} width={'90%'}>
    //                 <HStack justifyContent='space-between' alignItems='center' p={2}>
    //                     <Box >
    //                         <HStack alignItems='center'>
    //                             <Image alt='card' source={require('../../../assets/image/master.png')} mr={2}/> 
    //                             <Text style={styles.secondText}>Master Card</Text>
    //                         </HStack>
    //                     </Box>
    //                     <TouchableOpacity onPress={() => navigation.navigate('Update PaymentInfo',{detailData:item})}>
    //                         <Text style={[styles.editText,{fontFamily: 'Inter_400Regular'}]}>Edit</Text>
    //                     </TouchableOpacity>
    //                 </HStack>
    //                 <Text p={1} style={{fontFamily: 'Inter_700Bold'}}>{item.name}</Text>
    //                 <Text p={1} style={{fontFamily: 'Inter_400Regular'}}>{item.card_no}</Text>
    //                 <Text p={1} style={{fontFamily: 'Inter_400Regular'}}>End in {item.month} / {item.year} </Text>
    //                 <Text p={1} style={{fontFamily: 'Inter_400Regular'}}>{item.cvv}</Text>
    //                 {item.is_default ?
    //                 <Text p={1} style={[styles.defaultText,{fontFamily: 'Inter_400Regular'}]}>Default Address</Text>
    //                 : null}
    //             </Box>
    //         </Radio>
    //     )
    // }

    return (         
        <Box {...safeAreaProps} style={styles.container}>
            <Center>
            {loading ? (
                <ActivityIndicator color="red" justifyContent='center' alignItems='center'/>
            ):
            (<VStack alignItems='center' justifyContent='center'>
            <Box  style={styles.containerPush}>
            <Center>
                <Radio.Group
                name="myRadioGroup"
                accessibilityLabel="favorite number"
                value={choosedValue}
                onChange={(nextValue) => {
                setChoosedValue(nextValue)
                }}
                 >
                    <FlatList
                        data={payments}
                        renderItem={renderItem}
                        ListEmptyComponent={renderListEmptyComponent}
                        keyExtractor={item => item.guid}
                    />                  
                </Radio.Group>
                </Center>               
                </Box>
                    {orderId == null ? 
                    <HStack alignItems='center' justifyContent="space-around">
                        <TouchableOpacity>
                            <Text style = {styles.addNewAddress} onPress={() => navigation.navigate('Card Information')}>{translate('addNewCard')}</Text>
                        </TouchableOpacity>                        
                    </HStack> :
                    <HStack alignItems='center' justifyContent="space-around" ml={5}>
                        <TouchableOpacity>
                            <Text style = {styles.createAccount} onPress={() => applyAction()}>{translate('apply')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style = {styles.createAccount} onPress={() => navigation.navigate('Card Information')}>{translate('addNewCard')}</Text>
                        </TouchableOpacity>                        
                    </HStack>}
            </VStack>)}
            </Center>
        </Box>
    );
  }

  export default MyPayment;