import React, { useState,useEffect } from 'react';

import { Box, useSafeArea, VStack, Radio, Text, Image,FlatList,Modal,Input } from 'native-base';
import { View,TouchableOpacity } from 'react-native';
//import { styles } from '.../../../assets/css/ecommerce/paymentStyle';


function AddnumberModal(props) {
  const [phnumber, setPhnumber] = React.useState('');
  const [addnumberevent, setAddNumberEvent] = React.useState(false);
  const [phlist, setPhlist] = React.useState();
  const safeAreaProps = useSafeArea({
    safeAreaTop: true,
    pt: 2
  });

 


 
  function AddNumber() {

    if (phnumber.length < 13) {
      console.log("We will process your information.")



      fetch(`https://sora-mart.com/api/sim/add-phone?phone=${phnumber}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: global.auth,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status == 200) {
            console.log("Phone number has been added successfully.")
            props.handleCreate();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log(typeof phnumber)
    }
  }


  return (
    <>
    
      <Modal isOpen={props.isOpen} onClose={props.onClose} safeAreaTop={true}>
        <Modal.Content maxWidth="70%" style={{
          marginBottom: "auto",
          marginTop: 0
        }}>
          <Modal.CloseButton />
          <Modal.Header>Add Phone Number</Modal.Header>
          <Modal.Body>
            
            <Text>Number</Text>
            <Input size="lg" placeholder="Please enter your phone number" onChangeText={(data)=> setPhnumber(data)} value={phnumber} keyboardType = 'number-pad' />
            <TouchableOpacity onPress={()=> AddNumber()}>
                    <Text style={{width: 150, backgroundColor: '#EC1C24', color:'white',textAlign:'center',padding: 8,borderRadius: 25,marginTop: 10}}>Add</Text>
            </TouchableOpacity>
          </Modal.Body>
          <Modal.Footer>
         
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
     
  )
              }

  export default AddnumberModal;