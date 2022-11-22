import React,{useState,useEffect} from 'react'
import {ScrollView, HStack,VStack, Box} from 'native-base'
import { BankImage, PassportImg, ResidenceImg } from '../defaultImages'
import { MyInputItem, MyRadioVerticalGroup } from '../HouseRent/RentFormItems'
import { MyWifiType, WifiRadioGroup, WifiStepOneBtn, WifiStepTwoBtn ,MyDatePicker,Myddl} from './homeWifiFormItems'
import HomeWifiFormStatus from './homeWifiStatus'
import { useIsFocused } from '@react-navigation/native' // for re-render
import config from '../../../config/config'
import axios from 'axios'
import { ActivityIndicator } from 'react-native-paper'
import { translate } from 'react-native-translate'

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

function WifiRequestFormOne({route,navigation}){
    const {item} = route.params;
    const companyId = item.company_id;
    const serviceId = item.guid;
    const [engName,setEngName] = useState('');
    const [jpnName,setJpnName] = useState('');
    const [dob,setDob] = useState(new Date());
    const [frontResidence,setFrontResidence] = useState('');
    const [backResidence,setBackResidence] = useState('');
    const [passport,setPassport] = useState('');
    const [bankBook,setBankBook] = useState('');
    const myData = {
        "name" : engName,
        "japanese_name" : jpnName,
        "dob" : formatToString(dob),
        "NRC1" : frontResidence,
        "NRC2" : backResidence,
        "passport" : passport,
        "bank_book" : bankBook,
        "company_id" : companyId,
        "service_id" : serviceId,
        "start_date" : "2022-04-01 11:53:40",
        "expired_date" : "2022-09-01 11:53:40"
    }
    return (
        <ScrollView background='#FFF' p={5}>
            <Box>
                <HStack alignItems='center' justifyContent='flex-end'>
                    <HomeWifiFormStatus step='1'/>
                </HStack>
                <MyWifiType type={translate('wifiMsg')}/>
                <MyInputItem lbl={translate('nameEng')} value={engName} setValue={setEngName}/>
                <MyInputItem lbl={translate('nameJpn')} value={jpnName} setValue={setJpnName}/>
                <MyDatePicker lbl={translate('birthday')} date={dob} setDate={setDob}/>
                <ResidenceImg fImg={frontResidence} bImg={backResidence} setFImg={setFrontResidence} setBImg={setBackResidence}/>                                              
            </Box>
            <PassportImg image={passport} setImage={setPassport}/>
            <BankImage image={bankBook} setImage={setBankBook}/>
            <WifiStepOneBtn navigation={navigation} myData={myData}/>                
        </ScrollView>
    )
}

function WifiRequestFormTwo({route,navigation}){
    const myData = route.params.myData;
    const [mobile,setMobile] = useState('');
    const [postal,setPostal] = useState('');
    const [prefecture,setPrefecture] = useState('');
    const [city,setCity] = useState('');
    const [chome,setchome] = useState('');
    const [building,setBuilding] = useState('');
    const [unit,setUnit] = useState('');    
    const [plan,setPlan] = useState('');

    const [prefectureData,setPrefectureData] = useState(['Prefecture']);
    const [townData,setTownData] = useState(['City/Town']);

    const town_baseUrl = config.baseUrl + '/api/town';
    const prefecture_baseUrl = config.baseUrl + '/api/prefecture';

    myData['phone'] = mobile;
    myData['postal'] = postal;
    myData['prefecture'] = prefecture;
    myData['city'] = city;
    myData['chome'] = chome;
    myData['building'] = building;
    myData['room_number'] = unit;
    myData['plan'] = plan;



    const getTown = () => {
        axios.get(town_baseUrl)
            .then(response => {  
                setTownData(response.data.data);
            })    
            .catch((error) => {
                console.log(error);
            });
    }

    const getPrefecture = () => {
        axios.get(prefecture_baseUrl)
            .then(response => {   
                setPrefectureData(response.data.data);
            })    
            .catch((error) => {
                console.log(error);
            });
    }

    useEffect(()=>{
        getTown();
        getPrefecture();
    },[])
   
    return(
        <ScrollView backgroundColor='#FFF' p={5}>
            <HStack justifyContent='flex-end' alignItems='center'>
                <HomeWifiFormStatus step='2'/>  
            </HStack>     
            <MyInputItem lbl={translate('mobileNo')} value={mobile} setValue={setMobile}/>
            <HStack justifyContent='space-between' alignItems='center'>
                <VStack w='45%'>
                    <MyInputItem lbl={translate('postal')} value={postal} setValue={setPostal}/>
                </VStack>
                <VStack w='45%'>
                    <MyInputItem lbl={translate('chome')} value={chome} setValue={setchome}/>
                </VStack>
                
            </HStack>
            <HStack justifyContent='space-between' alignItems='center' pt={5}>
                <VStack w='45%'>
                    {townData ? <Myddl town={townData} lbl={translate('city')} value={city} setSelectedValue={setCity}/> : <ActivityIndicator color='red'/>}
                </VStack>
                <VStack w='45%'>
                    {prefectureData ? <Myddl town={prefectureData} lbl={translate('prefecture')} value={prefecture} setSelectedValue={setPrefecture}/> : <ActivityIndicator color='red'/>}
                </VStack>
            </HStack>  
                <VStack>
                    <MyInputItem lbl={translate('building')} value={building} setValue={setBuilding}/>
                </VStack>
                <VStack>
                    <MyInputItem lbl={translate('unitRoom')} value={unit} setValue={setUnit}/>
                </VStack>
            
            <WifiRadioGroup setSubscription={setPlan}/>
            <WifiStepTwoBtn navigation={navigation} postData={myData} />
        </ScrollView>
    )
}

export {WifiRequestFormOne,WifiRequestFormTwo}