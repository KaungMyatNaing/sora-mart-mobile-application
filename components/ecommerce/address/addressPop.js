import React, { useState,useEffect } from 'react';

import { Box, useSafeArea, VStack, HStack,Button, Radio,Text, Center,Modal} from 'native-base';
import { View, FlatList, TouchableOpacity } from 'react-native';
import { styles } from '../../../assets/css/ecommerce/addressStyle';
import config from '../../../config/config';
import {ActivityIndicator} from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native' // for re-render
import { translate } from 'react-native-translate';
import axios from 'axios';

function AddressPop({route, navigation },props) {
    const [orderId, setOrderId] = useState(null);    
    // const dispatch = useDispatch();
    // const addresses  = useSelector((state) => state.apiReducer.data);
    const [addresses,setAddresses] = useState([]);
    const [loading, setLoading] = useState(false); 
    const [plsreload, setPlsreload] = useState(false); 
    
    const [chooseAddress, setChooseAddress] = useState(null);

    const isFocused = useIsFocused()
     // for re-render
    
    const [radiopress, setRadiopress] = useState(true);
  const [isdelete, setIsdelete] = useState(true);
  const [open, setOpen] = useState(false);
   
    useEffect(()=>{getAddress()},[plsreload])
    useEffect(() => {
        if(route.params != null){
            setOrderId(route.params);
        }
        if(global.auth == '' || global.auth == null){
            global.forceLoginMsg = config.forceLoginMsg;
            navigation.replace('Sign In');
        }else{
       
        //    fetch('https://sora-mart.com/api/address', {headers: {
        //        "Content-Type": "application/json",
        //        'Authorization':  global.auth,
        //      }})
        // .then((response) => response.json())
        //        .then((data) => {
        //            console.log(data);
        //            setAddresses(data.data);
        //            setLoading(false);
        //        })   
        //        .catch((error) => {
        //            console.log(error);
        //            setLoading(false);
        //        });
            getAddress();
        }
    }, [radiopress]);
    const getAddress = () => {
        fetch('https://sora-mart.com/api/address', {headers: {
            "Content-Type": "application/json",
            'Authorization':  global.auth,
          }})
     .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setAddresses(data.data);
                setLoading(false);
            })   
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }

    const [choosedValue, setChoosedValue] = useState(null);
    const safeAreaProps = useSafeArea({
        safeAreaTop: true,
        pt: 1
      });

    const getChooseStyle = ({item}) => {
      
       
            global.chooseAddress = item;
            // setChooseAddress(item);
            fetch(`https://sora-mart.com/api/set-default-address/${item.guid}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': global.auth,
                }
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.status == 200) {
                        getAddress();
                        console.log(item.guid + " default address is set")
                    }
                    
                }).catch((error) => {
                    console.log(error);
                });
      

            return styles.radioSelectStyle;
      
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

    const deleteAddress = (id) => {
        fetch(`https://sora-mart.com/api/delete-address/${id}`, {
            method: "DELETE", 
            headers: {
              "Content-Type": "application/json",
              'Authorization':  global.auth,
            }
          })
            .then((response) => response.json())
            .then((data) => {
                if (data.status == 200) {
                    getAddress();
                    console.log(id + " address is deleted !")
                    
                }
                
            }) .catch((error) => {
              console.log(error);
            });
    }
    
    const renderItem = ({item}) => {
        return (
            //<Radio value={item.guid} my={1} mt={2} mb={5} colorScheme="red" onChange={()=>setRadiopress(!radiopress)}>
            <TouchableOpacity onPress={()=>getChooseStyle({item})}>
                <Box ml={3} p={4} style={{width: 350}} mb={3} backgroundColor={'white'} borderRadius={15}>
                    <HStack justifyContent='space-between' alignItems='center' p={2}>
                        <Text style={{fontFamily: 'Inter_700Bold'}}>{item.full_name}</Text>
                        <TouchableOpacity onPress={() => deleteAddress(item.guid)}>
                            <Text style={[styles.editText,{fontFamily: 'Inter_500Medium'}]}>Delete</Text>
                        </TouchableOpacity>

                        {/*<TouchableOpacity onPress={() => navigation.navigate('Update Address',{detailData:item})}>
                            <Text style={[styles.editText,{fontFamily: 'Inter_500Medium'}]}>Delete</Text>
                        </TouchableOpacity>*/}

                        
                    </HStack>
                    <Text p={1} style={{fontFamily: 'Inter_400Regular'}}>{item.phone}</Text>
                    <Text p={1} style={{fontFamily: 'Inter_400Regular'}}>{item.ward}</Text>
                    <Text p={1} style={{fontFamily: 'Inter_400Regular'}}>{item.town}</Text>
                    <Text p={1} style={{fontFamily: 'Inter_400Regular'}}>{item.city}</Text>
                    <Text p={1} style={{fontFamily: 'Inter_400Regular'}}>{item.region}</Text>
                    {item.is_default ?
                        <Text p={3} pl={1} style={[styles.defaultText, { fontFamily: 'Inter_500Medium' }]}>{item.is_default = 1 ? 'Your default address' : 'Not your default address'}</Text>
                    : null}
                </Box>
                </TouchableOpacity>
            //{/*</Radio>*/}
        )
    }

    
  
  return (
    <Modal isOpen={props.isOpen} onClose={() => props.onClose} safeAreaTop={true}>
    <Modal.Content maxWidth="350">
      <Modal.CloseButton />
      <Modal.Header>Addresses</Modal.Header>
      <Modal.Body>
      <Center>
            {loading ? (
                <ActivityIndicator color="red" justifyContent='center' alignItems='center'/>
            ):
            (<VStack>
            <Box  style={{width:'100%'}}>
            <Center>
             
                    <FlatList
                        data={addresses}
                        renderItem={renderItem}
                        ListEmptyComponent={renderListEmptyComponent}
                                    keyExtractor={item => item.guid}
                                    style={{ width: "100%" }} 
                    />                  
                    
              
                </Center>               
                </Box>
                    {orderId == null ? 
                    <HStack alignItems='center' justifyContent="space-around">
                        <TouchableOpacity>
                                    <Text style={styles.addNewAddress} onPress={() => { navigation.navigate('Add New Address'); setPlsreload(!plsreload); }}>{translate('addNewAddress')}</Text>
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
      </Modal.Body>
      <Modal.Footer>

      </Modal.Footer>
    </Modal.Content>
  </Modal>
  )
  }

  export default AddressPop;