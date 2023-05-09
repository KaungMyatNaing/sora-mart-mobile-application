import React, { useState,useEffect } from 'react';

import { Box, useSafeArea, VStack, Radio, Text, Image,FlatList,Modal,Input } from 'native-base';
import { View,TouchableOpacity } from 'react-native';
//import { styles } from '.../../../assets/css/ecommerce/paymentStyle';

import { useIsFocused } from '@react-navigation/native' // for re-render
import { translate } from 'react-native-translate';
import axios from 'axios';
import { color } from 'react-native-reanimated';

function BrokerModal(props) {
  const safeAreaProps = useSafeArea({
    safeAreaTop: true,
    pt: 2
  });

 
  const [brokercode, setBrokerCode] = useState("");
  const [isvalidcode, setIsValidCode] = useState(false); 
      
  

  const submitAction = () => {
    console.log(`https://sora-mart.com/api/checkout/apply-broker-code?broker_code=${brokercode}`)
    if (brokercode !== null && brokercode !== "") {
      fetch(`https://sora-mart.com/api/checkout/apply-broker-code?broker_code=${brokercode}`, {
        method: "POST",
          headers: {
      
        'Accept': 'application/json',
        'Authorization': global.auth,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        global.broker_discount = data.data.broker_amount;
        global.broker_code = data.data.broker_code;
        props.setValidBrokerCode(true);
        setIsValidCode(true);
        props.onClose();
                    
    
      }).catch((error) => {
        console.log(error);
        props.setValidBrokerCode(false);
        setIsValidCode(false)
      });
    }
  
    console.log(brokercode);
  }
  
  const [choosedValue, setChoosedValue] = useState(null);
      
 


  return (
    <>
    
      <Modal isOpen={props.isOpen} onClose={props.onClose} safeAreaTop={true}>
        <Modal.Content maxWidth="70%" style={{
          marginBottom: "auto",
          marginTop: 0
        }}>
          <Modal.CloseButton />
          <Modal.Header>Apply Broker Code</Modal.Header>
          <Modal.Body>
            
            <Input size="lg" placeholder="Please enter broker code" onChangeText={(text)=> setBrokerCode(text)} value={brokercode} />
            <Text style={{ color: isvalidcode ? "blue" : "red" }}>{isvalidcode ? "You can use this code." : "Invalid Code"}</Text>
            <TouchableOpacity  onPress={()=>submitAction()}>
                    <Text style={{width: 150, backgroundColor:'blue', color:'white',textAlign:'center',padding: 4,borderRadius: 25}}>{translate('apply')}</Text>
            </TouchableOpacity>
               
          </Modal.Body>
          <Modal.Footer>
         
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
     
  )
              }

  export default BrokerModal;