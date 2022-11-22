import { TouchableOpacity} from "react-native";
import { styles } from "../../../assets/css/blog/HouseRent/HouseRentStyle";
import {VStack, Text, Radio, Box,Image, HStack} from 'native-base'
import {useState} from 'react';
import config from "../../../config/config";
import axios from "axios";
import ToastHelper from "../../Helper/toast";
import Toast from 'react-native-toast-message';
import { translate } from "react-native-translate";
import {TextInput} from 'react-native-paper';

function MyInputItem({lbl,value,setValue}){

    return(
        <TextInput 
            theme={{colors: {primary: '#EC1C24', underlineColor: 'transparent'}}} 
            selectionColor='#EC1C24'
            style={styles.MyInputItem} 
            label={lbl}
            value={value} 
            onChangeText={(value) =>setValue(value)}
        />
    )
}

function MyTextArea({lbl,value,setValue}){
    return(
        <VStack mt={5} mb={5}>
            <TextInput
                theme={{colors: {primary: '#EC1C24', underlineColor: 'transparent'}}}
                selectionColor='#EC1C24'
                multiline numberOfLines={10} 
                style={styles.MyTextArea} 
                value={value}
                onChangeText={(value)=>setValue(value)}
                label={lbl} />
        </VStack>
    )
}

function StepOneBtn({navigation,myData}){
    return(
        <VStack pl={5} pr={5}>
            <TouchableOpacity style={styles.btn} m={5} onPress={()=>navigation.replace('Rent Form Two',{myData:myData})}>
                <Text style={styles.btnLbl}>NEXT</Text>
            </TouchableOpacity>
        </VStack>
    )
}

function StepTwoBtn({navigation,myData}){
    return(
        <VStack>
            <TouchableOpacity style={styles.btn} m={5} onPress={()=>navigation.replace('Rent Form Three',{myData:myData})}>
                <Text style={styles.btnLbl}>NEXT</Text>
            </TouchableOpacity>
        </VStack>
    )
}

function StepThreeBtn({navigation,postData}){

    const baseUrl = config.baseUrl+'/api/rent-house/add'; 

    console.log("==============postData house rent ==================");
    console.log(postData);
   
    const rentNowAction = () => {

        if(global.auth == ''){
            global.forceLoginMsg = config.forceLoginMsg;
            navigation.replace('Sign In');            
        }else{
            const headers = { 
                'Accept' : 'application/json',
                'Authorization' : 'Bearer '+ global.auth,
            }; 
            axios.post(baseUrl, postData, { headers })
            .then(response => {
            if(response.data.status_code == 200){

                navigation.replace('Blog Complete Status');            

                ToastHelper.toast(response.data.status, null, 'success');
                // alert(response.data.status);
                }    
            })    
            .catch((error) => {
                console.log(error);
                navigation.replace('Blog Failed Status');
            });
        }        
    }
    return(
        <VStack>
            <TouchableOpacity style={styles.btn} m={5} onPress={()=>{rentNowAction()}}>
                <Text style={styles.btnLbl}>{translate('rentNow')}</Text>
            </TouchableOpacity>
        </VStack>
    )
}

function MyRadioVerticalGroup({data,choosedValue,setChoosedValue}){
    const renderItem = ({item}) => {
        return(
            <Radio colorScheme="red" value={item.guid} mt={1} mb={2} ml={2} justifyContent='flex-start'>
                <Box ml={2}><Text>{item.value}</Text></Box>
            </Radio>
        )
    }
    return(        
        <VStack justifyContent='flex-start' mt={5} mb='30%'> 
            <Text mb={3}>{translate('visaType')}</Text>
                <Radio.Group 
                name="myRadioGroup"
                accessibilityLabel="Visa Type"
                value={choosedValue}
                onChange={(nextValue) => {
                setChoosedValue(nextValue)
                }}>
                {data.map((item) => 
                <Radio colorScheme="red" value={item.guid} mt={1} mb={2} ml={2} justifyContent='flex-start'>
                    <Box ml={2}><Text>{item.value}</Text></Box>
                </Radio>)}                
            </Radio.Group>
             <Toast />
        </VStack>
    )
}

export {MyInputItem,StepOneBtn,MyRadioVerticalGroup,StepTwoBtn,StepThreeBtn,MyTextArea}