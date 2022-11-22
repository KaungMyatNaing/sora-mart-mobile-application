import React, { useState } from 'react';

import { View, Text, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { styles } from '../../../assets/css/ecommerce/paymentStyle';
import DatePicker from 'react-native-datepicker';
import { VStack } from 'native-base';
import config from '../../../config/config';
import axios from 'axios';
import ToastHelper from '../../Helper/toast';
// import ToastManager, { Toast } from 'toastify-react-native';

import { SwitchOff, SwitchOn} from '../switchComponent';
import { translate } from 'react-native-translate';
function UpdatePaymentInfo({ route, navigation }) {

    const {detailData} = route.params;
    const baseUrl = config.baseUrl + '/api/user-cards/' + detailData.guid;
    const [cardNo, setCardNo] = useState(detailData.card_no);
    const [date, setDate] = useState(detailData.month+'/'+ detailData.year);
    const [isDefault, setIsDefault] = useState(detailData.is_default);
    const [month,setMonth] = useState(detailData.month);
    const [year,setYear] = useState(detailData.year);
    const [cvv,setCvv] = useState(detailData.cvv.toString());
    const [cardHolderName,setCardHolderName] = useState(detailData.name);


    const setExpiredMonthYear = (date) => {
      setDate(date);  
      let d = String(date).split('/');
      setMonth(parseInt(d[0], 10));
      setYear(parseInt(d[1],10));
    }
    
    const saveAction = () => {  
      if(global.auth == ''){
        global.forceLoginMsg = config.forceLoginMsg
        navigation.replace('Sign In');
      }else{
        const myData = {
          "card_no": cardNo,
          "name": cardHolderName,
          "month": month,
          "year": year,
          "cvv": cvv,
          "is_default": isDefault
        }
        const headers = { 
            'Accept' : 'application/json',
            'Authorization' : 'Bearer '+ global.auth,
        }; 
        axios.put(baseUrl, myData, { headers })
        .then(response => {        
            if(response.data.status_code === 200){
              navigation.replace('Choose Payment');
            }
        })    
        .catch((error) => {
          ToastHelper.toast(error, null, 'error');
            // alert(error);
        });
      }
    }
    return (
        
          <ScrollView style={styles.container} justifyContent='space-between' alignItems='center'>
          <VStack style={[styles.wrapper, styles.containerPush]}>
            <TextInput
              selectionColor='#EC1C24'
              style={styles.InputField_2}
              placeholder={translate('cardNo')}
              keyboardType='number-pad'
              onChangeText={(cardNo) => setCardNo(cardNo)}
              value={cardNo}
            />
            <TextInput
              selectionColor='#EC1C24'
              style={styles.InputField_2}
              placeholder={translate('cardHolderName')}
              onChangeText={(cardHolderName) => setCardHolderName(cardHolderName)}
              value={cardHolderName}
            />
            <DatePicker
              style={[styles.datePickerStyle, styles.InputField_3]}
              date={date}
              mode="date"
              placeholder={translate('selectDate')}
              format="MM/YYYY"
              minDate="01-1900"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                  dateIcon: {
                  position: 'absolute',
                  right: -5,
                  top: 4,
                  marginLeft: 0,
                  },
                  dateInput: {
                  borderColor : "gray",
                  alignItems: "flex-start",
                  borderWidth: 0,
                  borderBottomWidth: 1,
                  },
                  placeholderText: {
                  fontSize: 12,
                  color: "gray"
                  },
                  dateText: {
                  fontSize: 17,
                  }
              }}
              onDateChange={(date) => {
                  setExpiredMonthYear(date);
              }}
              />
              <TextInput
                selectionColor='#EC1C24'
                style={styles.InputField_2}
                placeholder={translate('cvv')}
                keyboardType='number-pad'
                onChangeText={(cvv) => setCvv(cvv)}
                value={cvv}
            />  
          <View style={styles.addressBottomView}>
            <Text>{translate('saveCardInfo')}</Text>
            {isDefault? <SwitchOn setValue={setIsDefault}/> : <SwitchOff setValue={setIsDefault}/>}
          </View>
          </VStack>
          <VStack mt='70%' mb='5%'>
            <TouchableOpacity style={styles.button} onPress={saveAction}>
                <Text style={styles.buttonText}>{translate('save')}</Text>
            </TouchableOpacity>
          </VStack>
           {/* <Toast /> */}
      </ScrollView>
    );
  }

  export default UpdatePaymentInfo;