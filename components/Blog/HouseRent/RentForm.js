import { PassportImg, ResidenceImg,BankImage, DefaultFrontImgs, DefaultBackImgs } from '../defaultImages';
import { HStack, ScrollView, VStack, Text,Box,View} from 'native-base';
import RentFormStatus from './rentFormStatus';
import {MyInputItem} from './RentFormItems'
import { styles } from '../../../assets/css/blog/HouseRent/HouseRentStyle';
import { StepOneBtn,MyRadioVerticalGroup,StepTwoBtn,StepThreeBtn } from './RentFormItems';
import MyDatePicker from './DateTimePicker';
import { Myddl } from '../HomeWifi/homeWifiFormItems';
import { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native' // for re-render
import config from '../../../config/config';
import axios from 'axios';
import { ActivityIndicator } from 'react-native-paper';
import { translate } from 'react-native-translate';

function RentFormOne({navigation,route}) {

    const {house_data} = route.params;

    const [eng_name,setEngName] = useState('');
    const [jpn_name,setJpnName] = useState('');
    const [dob, setDob] = useState(new Date());
    const [residence_fImg,setResidenceFImg] = useState('');
    const [residence_bImg,setResidenceBImg] = useState('');
    const [passImg, setPassImg] = useState('');
    const [bankImg, setBankImg] = useState('');
    const company_id = house_data.company_id;
    const service_id = house_data.guid;

    const myData = {
        'eng_name' : eng_name,
        'jp_name' : jpn_name,
        'dob' : formatToString(dob),
        'NRC1' : residence_fImg,
        'NRC2' : residence_bImg,   
        'passport' : passImg,
        'bank_book' : bankImg,     
        'company_id' : company_id,
        'service_id' : service_id,
    } 
    
    return (        
        <ScrollView backgroundColor='#fff'>
            <Box m={5}>
                <HStack justifyContent='flex-end'>
                    <RentFormStatus step='1'/>
                </HStack>
                <VStack mb={10}>
                    <MyInputItem lbl={translate('nameEng')} value={eng_name} setValue={setEngName}/>
                    <MyInputItem lbl={translate('nameJpn')} value={jpn_name} setValue={setJpnName}/>
                    <MyDatePicker lbl={translate('birthday')} date={dob} setDate={setDob}/>
                </VStack>                
                <ResidenceImg fImg={residence_fImg} bImg={residence_bImg} setFImg={setResidenceFImg} setBImg={setResidenceBImg}/>
                <PassportImg image = {passImg} setImage ={setPassImg}/>
                <BankImage image = {bankImg} setImage ={setBankImg}/> 
            </Box>            
            <StepOneBtn navigation={navigation} myData={myData}/>
        </ScrollView>
    );      
}

function RentFormTwo({route,navigation}){

    const myData = route.params.myData;

    const [ph,SetPh] = useState('');
    const [roomNo,setRoomNo] = useState('');
    const [building,setBuilding] = useState('');
    const [city,setCity] = useState('');
    const [prefecture,setPrefecture] = useState('');
    const [visaType,setVisaType] = useState();
    const [townData,setTownData] = useState(['Cit/Town']);
    const [prefectureData,setPrefectureData] = useState(['Prefecture']);
    const [postal,setPostal] = useState('');
    const [chome,setChome] = useState('');
    const [visaData,setVisaData] = useState();

    const town_baseUrl = config.baseUrl + '/api/town';
    const prefecture_baseUrl = config.baseUrl + '/api/prefecture';
    const visa_baseUrl = config.baseUrl + '/api/visa-type';

    myData['phone'] = ph; 
    myData['postal'] = postal;
    myData['chome'] = chome;       
    myData['room_number'] = roomNo;
    myData['building'] = building;
    myData['city'] = city;
    myData['prefecture'] = prefecture;
    myData['visa'] = visaType;  


    const getTown = () => {
        fetch(`https://sora-mart.com/api/blog/town-lists`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.status == 200) {
                    console.log(data.data);
                    setTownData(data.data);
                }
            })
            .catch((error) => console.log('' + error));
}

const getPrefecture = () => {
    fetch(`https://sora-mart.com/api/blog/prefecture-lists`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status == 200) {
          setPrefectureData(data.data);
        }
      })
      .catch((error) => console.log("" + error));
  };

    const getVisaType = () => {
        fetch(`https://sora-mart.com/api/blog/visa-lists`, {
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((response) => response.json())
            .then((data) => {
              if (data.status == 200) {
                setVisaData(data.data);
              }
            })
            .catch((error) => console.log("" + error));
    }

    useEffect(()=>{
        getTown();
      },[])

    useEffect(()=>{
        getPrefecture();
    },[])

    useEffect(()=>{
        getVisaType();
    },[])
    
    return(
        <ScrollView p={5} backgroundColor='#fff'>
            <HStack justifyContent='flex-end'>
                <RentFormStatus step='2'/>
            </HStack>
            <VStack>
                <MyInputItem lbl={translate('mobileNo')} value={ph} setValue={SetPh}/>
                <HStack justifyContent='space-between'>
                    <VStack w='45%'>
                        <MyInputItem lbl={translate('postal')} value={postal} setValue={setPostal}/>
                    </VStack>
                    <VStack w='45%'>
                        <MyInputItem lbl={translate('chome')} value={chome} setValue={setChome}/>
                    </VStack>
                </HStack>
                <HStack justifyContent='space-between'>
                    {townData &&                    
                        <VStack w='45%'>
                            <Myddl lbl={translate('city')} town={townData} value = {city} setSelectedValue={setCity}/>
                        </VStack>
                    }
                    {prefectureData &&
                        <VStack w='45%'>
                            <Myddl lbl={translate('prefecture')} town={prefectureData} value={prefecture} setSelectedValue={setPrefecture}/>
                        </VStack>
                    }                    
                </HStack>
                <VStack>
                    <MyInputItem lbl={translate('unitRoom')} value={roomNo} setValue={setRoomNo}/>
                </VStack>
                <VStack>
                    <MyInputItem lbl={translate('building')} value={building} setValue={setBuilding}/>
                </VStack>
                {visaData != null ? 
                <MyRadioVerticalGroup data={visaData} chooseValue={visaType} setChoosedValue={setVisaType}/> : 
                <ActivityIndicator color='red'/>}
                <StepTwoBtn navigation={navigation} myData={myData}/>          
            </VStack>
        </ScrollView>
    )
}

function RentFormThree({ route, navigation }) {
    const postData = route.params.myData;

    const [conjp_eng_name, setConJpEngName] = useState('');
    const [conjp_eng_ph, setConJpEngPh] = useState('');
    const [conjp_eng_dob, setConJpEngDob] = useState(new Date());
    const [postal, setPostal] = useState('');
    const [chome, setChome] = useState('');
    const [roomNo, setRoomNo] = useState('');
    const [building, setBuilding] = useState('');
    const [city, setCity] = useState('');
    const [prefecture, setPrefecture] = useState('');
    // const [conjp_eng_address,setConJpEngAddress] = useState('');
    const [conmy_eng_name, setConMyEngName] = useState('');
    const [conmy_eng_ph, setConMyEngPh] = useState('');
    const [conmy_eng_dob, setConMyEngDob] = useState(new Date());
    const [conmy_eng_address, setConMyEngAddress] = useState('');
    
    const [townData, setTownData] = useState(['Cit/Town']);
    const [prefectureData, setPrefectureData] = useState(['Prefecture']);

    const town_baseUrl = config.baseUrl + '/api/town';
    const prefecture_baseUrl = config.baseUrl + '/api/prefecture';

    postData["con_jp_name"] = conjp_eng_name;
    postData["con_jp_phone"] = conjp_eng_ph;
    postData["con_jp_dob"] = formatToString(conjp_eng_dob);
    postData["con_jp_address"] = "remove address";
    postData["con_jp_postal"] = postal;
    postData["con_jp_chome"] = chome;
    postData["con_jp_room_number"] = roomNo;
    postData["con_jp_building"] = building;
    postData["con_jp_city"] = city;
    postData["con_jp_prefecture"] = prefecture;

    postData["con_mm_name"] = conmy_eng_name;
    postData["con_mm_phone"] = conmy_eng_ph;
    postData["con_mm_dob"] = formatToString(conmy_eng_dob);
    postData["con_mm_address"] = conmy_eng_address;
    const getTown = () => {
        fetch(`https://sora-mart.com/api/blog/town-lists`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.status == 200) {
                    console.log(data.data);
                    setTownData(data.data);
                }
            })
            .catch((error) => console.log('' + error));
    }

    const getPrefecture = () => {
        fetch(`https://sora-mart.com/api/blog/prefecture-lists`, {
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.status == 200) {
                    setPrefectureData(data.data);
                }
            })
            .catch((error) => console.log("" + error));
    };

    const submitRentForm = async() => {

        const formData = new FormData();
        formData.append("eng_name", postData["eng_name"])
        formData.append("jp_name", postData["jp_name"])
        formData.append("dob", postData["dob"])
        formData.append("service_id", postData["service_id"])
       
  
        formData.append("NRC1", {
            uri: postData["NRC1"], // your file path string
            name: "NRC1.jpg",
            type: "image/jpg",
        });
   
        formData.append("NRC2", {
            uri: postData["NRC2"], // your file path string
            name: "NRC2.jpg",
            type: "image/jpg",
        });
          
        formData.append("passport", {
            uri: postData["passport"], // your file path string
            name: "passport.jpg",
            type: "image/jpg",
        });
       
        formData.append("bank_book", {
            uri: postData["bank_book"], // your file path string
            name: "bank_book.jpg",
            type: "image/jpg",
        });
       
         
       
        formData.append("phone_no", postData["phone"])
        formData.append("room_no", postData["room_number"])
        formData.append("visa_id", postData["visa"])
        formData.append("contact_jp_name", postData["con_jp_name"])
        formData.append("contact_jp_phone", postData["con_jp_phone"])
        formData.append("contact_jp_dob", postData["con_jp_dob"])
        formData.append("contact_jp_address", postData["con_jp_address"])
        formData.append("contact_mm_name", postData["con_mm_name"])
        formData.append("contact_mm_phone", postData["con_mm_phone"])
        formData.append("contact_mm_dob", postData["con_mm_dob"])
        formData.append("contact_mm_address", postData["con_mm_address"])
        
        await fetch("https://sora-mart.com/api/blog/rent-house", {
            method: "POST", // or 'PUT'
            headers: {
                Authorization: global.auth,
            },
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
               
                  navigation.replace('Blog Complete Status');
                  
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
        <ScrollView p={5} backgroundColor='#fff'>
            <HStack justifyContent='flex-end'>
                <RentFormStatus step='3'/>
            </HStack>
            <VStack mt={5}>
                <Text style={styles.imgTitle}>{translate('contactPersonJpn')}</Text>
                <MyInputItem lbl={translate('nameEng')} value={conjp_eng_name} setValue={setConJpEngName}/>
                <MyInputItem lbl={translate('mobileNo')} value={conjp_eng_ph} setValue={setConJpEngPh}/>
                <MyDatePicker lbl={translate('birthday')} date={conjp_eng_dob} setDate={setConJpEngDob}/>
                <HStack justifyContent='space-between'>
                    <VStack w='45%'>
                        <MyInputItem lbl={translate('postal')} value={postal} setValue={setPostal}/>
                    </VStack>
                    <VStack w='45%'>
                        <MyInputItem lbl={translate('chome')} value={chome} setValue={setChome}/>
                    </VStack>
                </HStack>
                <HStack justifyContent='space-between'>
                    {townData &&                    
                        <VStack w='45%'>
                            <Myddl lbl={translate('city')} town={townData} value = {city} setSelectedValue={setCity}/>
                        </VStack>
                    }
                    {prefectureData &&
                        <VStack w='45%'>
                            <Myddl lbl={translate('prefecture')} town={prefectureData} value={prefecture} setSelectedValue={setPrefecture}/>
                        </VStack>
                    }                    
                </HStack>
                <VStack>
                    <MyInputItem lbl={translate('unitRoom')} value={roomNo} setValue={setRoomNo}/>
                </VStack>
                <VStack>
                    <MyInputItem lbl={translate('building')} value={building} setValue={setBuilding}/>
                </VStack>
                {/* <MyInputItem lbl='Address' value={conjp_eng_address} setValue={setConJpEngAddress}/> */}

            </VStack>
            <VStack mt={10} mb='15%'>
            <Text style={styles.imgTitle}>{translate('contactPersonMy')}</Text>
                <MyInputItem lbl={translate('nameEng')} value={conmy_eng_name} setValue={setConMyEngName}/>
                <MyInputItem lbl={translate('mobileNo')} value={conmy_eng_ph} setValue={setConMyEngPh}/>
                <MyDatePicker lbl={translate('birthday')} date={conmy_eng_dob} setDate={setConMyEngDob}/>
                <MyInputItem lbl={translate('address')} value={conmy_eng_address} setValue={setConMyEngAddress}/>
            </VStack>
            <StepThreeBtn action={()=> submitRentForm()} />
        </ScrollView>
    )
}

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

export {RentFormOne,RentFormTwo,RentFormThree};