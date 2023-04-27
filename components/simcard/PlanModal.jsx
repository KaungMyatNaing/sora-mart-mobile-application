import React, { useState,useEffect } from 'react';

import { Box, useSafeArea, VStack, Radio, Text, Image,FlatList,Modal,Input } from 'native-base';
import { View,TouchableOpacity } from 'react-native';
//import { styles } from '.../../../assets/css/ecommerce/paymentStyle';


function PlanModal(props) {
  const safeAreaProps = useSafeArea({
    safeAreaTop: true,
    pt: 2
  });

 
  const [brokercode, setBrokerCode] = useState("");
  const [isvalidcode, setIsValidCode] = useState(false); 
      
  const paymentMethods = [
    {
      guid: 1,
      name: '1GB'
    },
    {
      guid: 2,
      name: '2GB'
    },
    {
      guid: 3,
      name: '3GB'
    }
  ]

  
  const [choosedValue, setChoosedValue] = useState(null);
      
 
  const renderItem = ({ item }) => {
    // setRequiredCard(item.is_card_require);
    return (
                  
      <Radio alignItems='flex-start' justifyContent='center' value={item.guid} my={1} ml={5} colorScheme='red' >
        <Text ml={2}>{item.name}</Text>
      </Radio>
    )
  }


  return (
    <>
    
      <Modal isOpen={props.isOpen} onClose={props.onClose} safeAreaTop={true}>
        <Modal.Content maxWidth="70%" style={{
          marginBottom: "auto",
          marginTop: 0
        }}>
          <Modal.CloseButton />
          <Modal.Header>Upgrade Plan</Modal.Header>
          <Modal.Body>
            
            <Text>Plans</Text>
            <Radio.Group
                    name="myRadioGroup"
                    accessibilityLabel="choose plan"
                    value={choosedValue}
                    onChange={(nextValue) => {
                      setChoosedValue(nextValue);
                   
                    }}
                  >
                    <FlatList
                      data={paymentMethods}
                      renderItem={renderItem}
                    
                      keyExtractor={item => item.guid}
                    />
                  </Radio.Group>
           <TouchableOpacity>
                    <Text style={{width: 150, backgroundColor: '#EC1C24', color:'white',textAlign:'center',padding: 8,borderRadius: 25,marginTop: 10}}>Request</Text>
            </TouchableOpacity>
          </Modal.Body>
          <Modal.Footer>
         
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
     
  )
              }

  export default PlanModal;