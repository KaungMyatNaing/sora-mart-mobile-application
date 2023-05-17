import { HStack, Image ,Text,VStack,Radio,Box,Select } from "native-base"
import styles from "../../../assets/css/blog/HomeWifi/HomeWifiStyle"
import {TouchableOpacity,TextInput} from 'react-native'
import { useEffect, useState } from "react"
import DateTimePicker from '@react-native-community/datetimepicker';
import { useIsFocused } from '@react-navigation/native' // for re-render
import DropDownPicker from 'react-native-dropdown-picker';

import config from "../../../config/config";
import axios from "axios";
import { translate } from "react-native-translate";

function formatToString(date) {
    var strDate = '';
    if(date == ''){
        strDate = '';
    }else{
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        strDate = year + '-' + month + '-' +  day;
    }
    return strDate;
  }

function MyWifiType({type}){
    return(
        <HStack justifyContent='center' alignItems='center' style={styles.typeDiv}>
            <Image alt='cart' w={6} h={6} source={require('../../../assets/image/Blog/HomeWifi/activeCartIcon.png')}/>
            <Text style={styles.type}>{type}</Text>
        </HStack>
    )
}

function MyDatePicker({lbl,date,setDate}){
    // const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');        
        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };
    return (
        <HStack justifyContent='space-between' alignItems='center' style={styles.MyDateItem}>
            <TextInput
                placeholder={lbl}
                value={formatToString(date)}
                textAlign='center'
                marginLeft={10}
            />
            <TouchableOpacity onPress={() => showDatepicker()} style={styles.MyInputLbl}>
                <Image alt='time' source={require('../../../assets/image/Blog/HouseRent/DateIcon.png')} w={6} h={6} resizeMode='contain'/>
            </TouchableOpacity>
                {show && (
                    <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    display="default"
                    onChange={onChange}
                    style={{width: 320, backgroundColor: "#fff"}}
                    />
                )}
        </HStack>
    )
}

function WifiStepOneBtn({myData,navigation}){
    return(
        <VStack>
            <TouchableOpacity style={styles.btn} m={5} onPress={()=>navigation.navigate('Home Wifi Request Form Two',{myData:myData})}>
                <Text style={styles.btnLbl}>{translate('next')}</Text>
            </TouchableOpacity>
        </VStack>
    )
}

function WifiStepTwoBtn(props){
//    
//    const baseUrl = config.baseUrl+'/api/wifi-request/add';
//
//    const reqNowAction = () => {
//        if(global.auth == ''){
//            global.forceLoginMsg = config.forceLoginMsg
//            navigation.replace('Sign In');
//          }else{ 
//            //navigation.replace('Blog Complete Status', { myData: postData, baseUrl: baseUrl });
//            navigation.replace('Blog Complete Status');
//        }
//    }

    return(
        <VStack pl={5} pr={5} mt='30%'>
            <TouchableOpacity style={styles.btn} m={5} onPress={props.action}>
                <Text style={styles.btnLbl}>{translate('requestNow')}</Text>
            </TouchableOpacity>
        </VStack>
    )
}

function WifiRadioGroup({setSubscription}){
    
    return(        
        <VStack justifyContent='flex-start' mt={10} mb='30%'> 
            <Text style={styles.title} pb={5}>{translate('suscriptionPlan')}</Text>
            <Radio.Group>
                <Radio colorScheme="red" value='Monthly' mb={2} onPress={()=>setSubscription('monthly')}>
                    <Box ml={2}><Text style={styles.radioLbl}>{translate('monthly')}</Text></Box>
                </Radio>
                <Radio colorScheme="red" value='Yearly' mb={2} onPress={()=>setSubscription('yearly')}>
                    <Box ml={2}><Text style={styles.radioLbl}>{translate('yearly')}</Text></Box>
                </Radio>
            </Radio.Group>
        </VStack>
    )
}

export const data = [
    
    {
      value: '1',
      label: 'Tiger Nixon',      
    },
    {
      value: '2',
      label: 'Garrett Winters',
    },
    {
      value: '3',
      label: 'Ashton Cox',
    },
    {
      value: '4',
      label: 'Cedric Kelly',
    },
  ];
  
const renderIcon=()=>{
    return(
        <Image source={require('../../../assets/image/Blog/HomeWifi/DropArrow.png')} w={6} h={6} alt='drop arrow'/>
    )
}

function AddressTypeddl({lbl,town,value,setSelectedValue}){
    //  const [value, setSelectedValue] = useState('');
    const [open,setOpen] = useState(false);
    // const [value,setValue] = useState('');
    const [item,setItem] = useState('');
    return(
        <VStack mb={5} mt={2}>
            {/* <SelectDropdown
                data={town.map(town=>(town.name))}
                defaultButtonText={lbl}
                dropdownBackgroundColor='#fff'
                buttonStyle={{backgroundColor:'#fff',borderBottomWidth:1,width:'100%',height:60,borderBottomColor:'#A0A0A0'}}
                buttonTextStyle={styles.btnTxt}
                renderDropdownIcon={renderIcon}
                rowStyle={{backgroundColor:'#fff'}}
                rowTextStyle={styles.ddlLbl}
                dropdownIconPosition='right'
                onSelect={(selectedItem,index) => {
                    console.log(selectedItem,index)
                    setSelectedValue(selectedItem);
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                   return selectedItem
                }}
                rowTextForSelection={(item, index) => {
                    console.log(item);
                    return item
                }}
            /> */}
            <DropDownPicker
                open={open}
                value={value}
                items={town.map(town=>({"value":town,"label" :town,"key" : town}))}
                setOpen={(open)=>setOpen(open)}
                setValue={(value)=>setSelectedValue(value)}
                setItems={(item) => setItem(item)}
                placeholder={lbl}
                placeholderStyle={{
                    color: "#A0A0A0",
                    marginRight:0,
                    paddingRight:0,
                }}
                showArrowIcon={true}
                showTickIcon={false}
                dropDownContainerStyle={{
                    borderColor:'#A0A0A0',
                    borderRadius:0,
                }}
                selectedItemContainerStyle={{
                    backgroundColor: "#fde7e8"
                }}
                listMode="SCROLLVIEW" 
                style={{borderWidth:0,borderBottomWidth:1,borderBottomColor:'#A0A0A0',borderRadius:0,paddingRight:10,paddingLeft:10}}                        
                />
        </VStack>
    );    
}
 
 function Myddl({lbl,town,value,setSelectedValue}){
    //  const [value, setSelectedValue] = useState('');
    const [open,setOpen] = useState(false);
    // const [value,setValue] = useState('');
    const [item,setItem] = useState('');
    return(
        <VStack mb={5} mt={2}>
            {/* <SelectDropdown
                data={town.map(town=>(town.name))}
                defaultButtonText={lbl}
                dropdownBackgroundColor='#fff'
                buttonStyle={{backgroundColor:'#fff',borderBottomWidth:1,width:'100%',height:60,borderBottomColor:'#A0A0A0'}}
                buttonTextStyle={styles.btnTxt}
                renderDropdownIcon={renderIcon}
                rowStyle={{backgroundColor:'#fff'}}
                rowTextStyle={styles.ddlLbl}
                dropdownIconPosition='right'
                onSelect={(selectedItem,index) => {
                    console.log(selectedItem,index)
                    setSelectedValue(selectedItem);
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                   return selectedItem
                }}
                rowTextForSelection={(item, index) => {
                    console.log(item);
                    return item
                }}
            /> */}
            <DropDownPicker
                open={open}
                value={value}
                items={town.map(town=>({"value":town.name,"label" :town.name,"key" : value}))}
                setOpen={(open)=>setOpen(open)}
                setValue={(value)=>setSelectedValue(value)}
                setItems={(item) => setItem(item)}
                placeholder={lbl}
                placeholderStyle={{
                    color: "#A0A0A0",
                    marginRight:0,
                    paddingRight:0,
                }}
                showArrowIcon={true}
                showTickIcon={false}
                dropDownContainerStyle={{
                    borderColor:'#A0A0A0',
                    borderRadius:0,
                }}
                selectedItemContainerStyle={{
                    backgroundColor: "#fde7e8"
                }}
                listMode="SCROLLVIEW" 
                style={{borderWidth:0,borderBottomWidth:1,borderBottomColor:'#A0A0A0',borderRadius:0,paddingRight:10,paddingLeft:10}}                        
                />
        </VStack>
    );    
 }

 function Prefectureddl({lbl,town,value,setSelectedValue}){
    //  const [value, setSelectedValue] = useState('');
    const [open,setOpen] = useState(false);
    // const [value,setValue] = useState('');
    const [item,setItem] = useState('');
    return(
        <VStack mb={5} mt={2}>
            {/* <SelectDropdown
                data={town.map(town=>(town.name))}
                defaultButtonText={lbl}
                dropdownBackgroundColor='#fff'
                buttonStyle={{backgroundColor:'#fff',borderBottomWidth:1,width:'100%',height:60,borderBottomColor:'#A0A0A0'}}
                buttonTextStyle={styles.btnTxt}
                renderDropdownIcon={renderIcon}
                rowStyle={{backgroundColor:'#fff'}}
                rowTextStyle={styles.ddlLbl}
                dropdownIconPosition='right'
                onSelect={(selectedItem,index) => {
                    console.log(selectedItem,index)
                    setSelectedValue(selectedItem);
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                   return selectedItem
                }}
                rowTextForSelection={(item, index) => {
                    console.log(item);
                    return item
                }}
            /> */}
            <DropDownPicker
                open={open}
                value={value}
                items={town.map(town=>({"value":town.guid,"label" :town.name,"key" : value}))}
                setOpen={(open)=>setOpen(open)}
                setValue={(value)=>setSelectedValue(value)}
                setItems={(item) => setItem(item)}
                placeholder = {lbl}
                placeholderStyle={{
                    color: "#A0A0A0",
                    marginRight:0,
                    paddingRight:0,
                }}
                showArrowIcon={true}
                showTickIcon={false}
                dropDownContainerStyle={{
                    borderColor:'#A0A0A0',
                    borderRadius:0,
                }}
                selectedItemContainerStyle={{
                    backgroundColor: "#fde7e8"
                }}
                listMode="SCROLLVIEW" 
                style={{borderWidth:0,borderBottomWidth:1,borderBottomColor:'#A0A0A0',borderRadius:0,paddingRight:0,paddingLeft:0}}                        
                />
        </VStack>
    );    
 }
export {MyWifiType,WifiStepOneBtn,WifiStepTwoBtn,WifiRadioGroup,MyDatePicker,Myddl,renderIcon,Prefectureddl,AddressTypeddl}