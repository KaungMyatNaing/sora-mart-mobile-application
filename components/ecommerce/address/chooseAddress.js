import React, { useState,useEffect } from 'react';

import { Box, useSafeArea, VStack, HStack,Button, Radio,Text, Center} from 'native-base';
import { View, FlatList, TouchableOpacity } from 'react-native';
import { styles } from '../../../assets/css/ecommerce/addressStyle';
import config from '../../../config/config';
import {ActivityIndicator} from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native' // for re-render
import { translate } from 'react-native-translate';
import axios from 'axios';

function MyAddress({route, navigation }) {
    const [orderId, setOrderId] = useState(null);    
    // const dispatch = useDispatch();
    // const addresses  = useSelector((state) => state.apiReducer.data);
    const [addresses,setAddresses] = useState([]);
    const [loading,setLoading] = useState(false); 
    
    const [chooseAddress, setChooseAddress] = useState(null);

    const isFocused = useIsFocused() // for re-render
    
    useEffect(() => {
        if(route.params != null){
            setOrderId(route.params);
        }
        if(global.auth == '' || global.auth == null){
            global.forceLoginMsg = config.forceLoginMsg;
            navigation.replace('Sign In');
        }else{
            const baseUrl = config.baseUrl + '/api/address';
            const headers = { 
                'Accept': 'application/json', 
                'Authorization' : 'Bearer '+ global.auth,  
            }
            axios.get(baseUrl,{headers})
                .then(response => {   
                    setAddresses(response.data.data);
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
            global.chooseAddress = item;
            // setChooseAddress(item);
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
        if(global.chooseAddress == null){
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
                        <Text style={{fontFamily: 'Inter_700Bold'}}>{item.full_name}</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Update Address',{detailData:item})}>
                            <Text style={[styles.editText,{fontFamily: 'Inter_500Medium'}]}>Edit</Text>
                        </TouchableOpacity>
                    </HStack>
                    <Text p={1} style={{fontFamily: 'Inter_400Regular'}}>{item.phone}</Text>
                    <Text p={1} style={{fontFamily: 'Inter_400Regular'}}>{item.ward}</Text>
                    <Text p={1} style={{fontFamily: 'Inter_400Regular'}}>{item.town}</Text>
                    <Text p={1} style={{fontFamily: 'Inter_400Regular'}}>{item.city}</Text>
                    <Text p={1} style={{fontFamily: 'Inter_400Regular'}}>{item.region}</Text>
                    {item.is_default ?
                    <Text p={3} pl={1} style={[styles.defaultText,{fontFamily: 'Inter_500Medium'}]}>Default Address</Text>
                    : null}
                </Box>
            </Radio>
        )
    }

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
                        data={addresses}
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
                            <Text style = {styles.addNewAddress} onPress={() => navigation.navigate('Add New Address')}>{translate('addNewAddress')}</Text>
                        </TouchableOpacity>                        
                    </HStack> :
                    <HStack alignItems='center' justifyContent="space-around" ml={5}>
                        <TouchableOpacity>
                            <Text style = {styles.createAccount} onPress={() => applyAction()}>{translate('apply')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style = {styles.createAccount} onPress={() => navigation.navigate('Add New Address')}>{translate('addNewAddress')}</Text>
                        </TouchableOpacity>                        
                    </HStack>}
            </VStack>)}
            </Center>
        </Box>
    );
  }

  export default MyAddress;