import React, { useState,useEffect } from 'react';

import { Box, useSafeArea, VStack, Radio, Text, Image,FlatList } from 'native-base';
import { View } from 'react-native';
import { styles } from '../../../assets/css/ecommerce/paymentStyle';
import config from '../../../config/config';
import { ActivityIndicator } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native' // for re-render
import { translate } from 'react-native-translate';
import axios from 'axios';

function MyPaymentMethod({ route, navigation }) {
    const safeAreaProps = useSafeArea({
        safeAreaTop: true,
        pt: 2
      });

      const [orderId,setOrderId] = useState(null);
      const [paymentMethods,setPaymentMethods] = useState([]);
      const [loading,setLoading] = useState(true);
      const isFocused = useIsFocused() // for re-render
      
      useEffect(() => {
          if(route.params !== null){
              setOrderId(route.params);
          }

          fetch('https://sora-mart.com/api/payments', {
            headers: {
                'Accept' : 'application/json',
                'Authorization' : global.auth,
              },
        })
        .then((response) => response.json())
                .then((data) => {
                  
                        setPaymentMethods(data.data);
                        setLoading(false);
                    
    
                }).catch((error) => {
                    console.log(error);
                    setLoading(false);
          });
         
      }, [isFocused]);
  
      const [choosedValue, setChoosedValue] = useState(null);
      const [isRequiredCard, setRequiredCard] = useState(false);

    const redirectAction = (is_card_require) => {
        //if(is_card_require){
        //    return navigation.replace('Choose Payment',{orderId:orderId});
        //}else{
        //    return navigation.replace('Shipping and Payments');
        //}

        return navigation.replace('Shipping and Payments');
    }

    const renderItem = ({item}) => {
        // setRequiredCard(item.is_card_require);
        return(  
            //<Radio alignItems='flex-start' justifyContent='center' value={item.guid} my={1} ml={5} colorScheme='red' onPress={() => redirectAction(item.is_card_require)}>                
            <Radio alignItems='flex-start' justifyContent='center' value={item.guid} my={1} ml={5} colorScheme='red' onPress={() => global.choosePayment = item}>                   
                <Text ml={2}>{item.name}</Text>                    
            </Radio>
        )
    }

    const renderListEmptyComponent = () => (
        <View style={styles.noNotification}>
            <Text>
                {translate('noItem')}
            </Text>
        </View>
    );

    return (
        <Box {...safeAreaProps} backgroundColor='#FFF' style={{height:'100%'}}>
            {loading ? 
                <ActivityIndicator color="red" justifyContent='center' alignItems='center'/>
                :
            (
            <VStack justifyContent='center' ml={5}>
                <Radio.Group
                name="myRadioGroup"
                accessibilityLabel="choose payment method"
                value={choosedValue}                
                onChange={(nextValue) => {
                    setChoosedValue(nextValue);
                   
                }}
                >
                <FlatList
                    data={paymentMethods}
                    renderItem={renderItem}
                    ListEmptyComponent={renderListEmptyComponent}
                    keyExtractor={item => item.guid}
                /> 
                </Radio.Group>
        </VStack>)}
        </Box>
    );
  }

  export default MyPaymentMethod;