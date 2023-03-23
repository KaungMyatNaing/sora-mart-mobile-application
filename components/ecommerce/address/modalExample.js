//@ts-nocheck
import React, { useEffect } from "react";
import { Button, Modal, Stack, FormControl, Input, Center, NativeBaseProvider,Box, useSafeArea, VStack, HStack,Radio,Text } from "native-base";
import { useState } from "react";
import { View, FlatList, TouchableOpacity } from 'react-native';
//import { styles } from '../../assets/css/ecommerce/checkoutStyle';


const ModalExample = (props) => {
 
  const [open, setOpen] = useState(false);
  const [addresses, setAddresses] = useState();
const [loading, setLoading] = useState(false); 
const [defaultaddress, setDefaultAddress] = useState(false);
  

  const openModal = placement => {
    setOpen(true);
    setPlacement(placement);
  };

  const getChooseStyle = ({item}) => {
      
       
    global.chooseAddress = item;
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
               
                console.log(item.guid + " default address is set")
                setDefaultAddress(!defaultaddress);
            }
            
        }).catch((error) => {
            console.log(error);
        });


    //return styles.radioSelectStyle;

}

  useEffect(() => {
    fetch('https://sora-mart.com/api/address', {headers: {
            "Content-Type": "application/json",
            'Authorization':  global.auth,
          }})
     .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setAddresses(data.data);
               
            })   
            .catch((error) => {
                console.log(error);
                
            });
    }
  ,[defaultaddress])

  const renderItem = ({item}) => {
    return (
        //<Radio value={item.guid} my={1} mt={2} mb={5} colorScheme="red" onChange={()=>setRadiopress(!radiopress)}>
        <TouchableOpacity onPress={()=>getChooseStyle({item})}>
            <Box ml={3} p={4} style={{ width: 350 }} mb={3} backgroundColor={'white'} borderRadius={15}>
                <HStack justifyContent='space-between' alignItems='center' p={2}>
                    <Text style={{fontFamily: 'Inter_700Bold'}}>{item.full_name}</Text>
                    {/*<TouchableOpacity onPress={() => deleteAddress(item.guid)}>
                        <Text style={[styles.editText,{fontFamily: 'Inter_500Medium'}]}>Delete</Text>
                    </TouchableOpacity>*/}

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
                    <Text p={3} pl={1} style={{ fontFamily: 'Inter_500Medium', color: item.is_default = 1 ? 'red' : 'black' }}>{item.is_default = 1 ? 'Your default address' : 'Not your default address'}</Text>
                : null}
            </Box>
            </TouchableOpacity>
        //{/*</Radio>*/}
    )
}

  return <>
    
      <Modal isOpen={props.isOpen} onClose={props.onClose} safeAreaTop={true}>
      <Modal.Content maxWidth="70%" style={{marginBottom: "auto",
    marginTop: 0}}>
          <Modal.CloseButton />
          <Modal.Header>Your Address</Modal.Header>
          <Modal.Body>
          <Center>
          <FlatList
                        data={addresses}
                        renderItem={renderItem}
                        //ListEmptyComponent={renderListEmptyComponent}
                                    keyExtractor={item => item.guid}
                                    style={{ width: "100%" }} 
                    />    
            </Center>
          </Modal.Body>
          <Modal.Footer>
           
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>;
};



    export default ModalExample
    
    