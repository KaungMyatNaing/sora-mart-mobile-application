import { ScrollView,Box,Text,Radio,HStack,VStack} from 'native-base'
import { styles } from '../../../assets/css/blog/HouseRent/HouseRentStyle'
import {LblAndInput} from './TourFormComponents'
import { MyInputItem } from './RentFormItems'
import React,{useState} from 'react'
import { MyCheckBoxItem ,MyDailyStartEndTime} from './TourFormComponents'
import { TouchableOpacity } from 'react-native'
import axios from 'axios'
import config from '../../../config/config'
import ToastHelper from '../../Helper/toast'
import ToastManager, { Toast } from 'toastify-react-native';
import { translate } from 'react-native-translate'

function RequestTourForm({navigation,route}){  
    const type = route.params.type;
    const tour_data = route.params.tour_data;
    const [contactName,setContactName] = useState('');
    const [mobile,setMobile] = useState('');
    const [pickupType,setPickupType] = useState("eachDay");
    // daily
    const [dailyStart,setDailyStart] = useState(new Date());
    const [dailyEnd,setDailyEnd] = useState(new Date());
    //each day
    const [monStart,setMonStart] = useState(new Date());
    const [monEnd,setMonEnd] = useState(new Date());
    const [tueStart,setTueStart] = useState(new Date());
    const [tueEnd,setTueEnd] = useState(new Date());
    const [wedStart,setwedStart] = useState(new Date());
    const [wedEnd,setWedEnd] = useState(new Date());
    const [thurStart,setThurStart] = useState(new Date());
    const [thurEnd,setThurEnd] = useState(new Date());
    const [friStart,setFriStart] = useState(new Date());
    const [friEnd,setFriEnd] = useState(new Date());
    const [satStart,setSatStart] = useState(new Date());
    const [satEnd,setSatEnd] = useState(new Date());
    const [sunStart,setSunStart] = useState(new Date());
    const [sunEnd,setSunEnd] = useState(new Date());

    const [monday, setMonDay] = useState(false);
    const [tuesday, setTuesDay] = useState(false);
    const [wedday, setWedDay] = useState(false);
    const [thursday, setThursDay] = useState(false);
    const [friday, setFriDay] = useState(false);
    const [satday, setSatDay] = useState(false);
    const [sunday, setSunDay] = useState(false);

    const baseUrl = config.baseUrl + '/api/tour-request/add?type=' + type;

    let day = [];

    const radioHandler = (radioValue) => {
        setPickupType(radioValue);
    };

    function submitAction() {
        const postData = {
            "name" : contactName,
            "phone" : mobile,
            "pickup_type" : pickupType,
            "service_id" : tour_data.guid,
        };       

        if(pickupType == 'daily'){
           postData["start"] = formatAMPM(dailyStart);
           postData["end"] = formatAMPM(dailyEnd);
        }else{
            if(monday){
                postData['m_start'] = formatAMPM(monStart);
                postData['m_end'] = formatAMPM(monEnd);
                day.push("monday");
            }
            
            if(tuesday){
                postData['tue_start'] = formatAMPM(tueStart);
                postData['tue_end'] = formatAMPM(tueEnd);
                day.push("tuesday");
            }
            
            if(wedday){
                postData['wed_tart'] = formatAMPM(wedStart);
                postData['wed_end'] = formatAMPM(wedEnd);
                day.push("wedday");
            }
            
            if(thursday){
                postData['thur_start'] = formatAMPM(thurStart);
                postData['thur_end'] = formatAMPM(thurEnd);
                day.push("thursday");
            }
            
            if(friday){
                postData['fri_start'] = formatAMPM(friStart);
                postData['fri_end'] = formatAMPM(friEnd);
                day.push("friday");
            }
            
            if(satday){
                postData['sat_start'] = formatAMPM(satStart);
                postData['sat_end'] = formatAMPM(satEnd);
                day.push("satday");
            }
            
            if(sunday){
                postData['sun_start'] = formatAMPM(sunStart);
                postData['sun_end'] = formatAMPM(sunEnd);
                day.push("sunday");
            }
    
            postData['day'] = day;
        }

        if(global.auth == ''){
            global.forceLoginMsg = config.forceLoginMsg
            navigation.replace('Sign In');
          }else{ 
            if(pickupType == 'daily'){
                if(contactName != '' && mobile != ''){
                    const headers = { 
                        'Accept' : 'application/json',
                        'Authorization' : 'Bearer '+ global.auth,
                    }; 
                    axios.post(baseUrl, postData, { headers })
                    .then(response => {
                        if(response.data.status_code == 200){
                            ToastHelper.toast(response.data.status, null, 'success');
                            // alert(response.data.status);
                            navigation.replace('Blog Complete Status');
                        }    
                    })    
                    .catch((error) => {
                        console.log(error);
                        ToastHelper.toast(error, null, 'error');
                        // alert(error);
                        navigation.replace('Blog Failed Status');
                    });
                    // navigation.replace('Blog Complete Status',{baseUrl:baseUrl,myData:postData});
                    // const headers = { 
                    //     'Accept' : 'application/json',
                    //     'Authorization' : 'Bearer '+ global.auth,
                    // }; 
                    // axios.post(baseUrl, postData, { headers })
                    // .then(response => {
                    //     if(response.data.status_code == 200){
                    //         alert(response.data.status);
                    //         navigation.replace('Blog Complete Status');
                    //     }    
                    // })    
                    // .catch((error) => {
                    //     console.log(error);
                    //     alert(error);
                    //     navigation.replace('Blog Failed Status');
                    // });
                }else{
                    ToastHelper.toast('Please fill up all data', null, 'error');
                    // alert('Please fill up all data');
                }
            }else{
                console.log('request tour data');
                console.log(postData);
                console.log(baseUrl);
                if(day.length > 0 && contactName != '' && mobile != ''){
                    const headers = { 
                        'Accept' : 'application/json',
                        'Authorization' : 'Bearer '+ global.auth,
                    }; 
                    axios.post(baseUrl, postData, { headers })
                    .then(response => {
                        if(response.data.status_code == 200){
                            // ToastHelper.toast(response.data.status, null, 'success');
                            alert(response.data.status);
                            navigation.replace('Blog Complete Status',{baseUrl:baseUrl,myData:postData});
                        }    
                    })    
                    .catch((error) => {
                        console.log(error);
                        ToastHelper.toast(error, null, 'error');
                        // alert(error);
                        navigation.navigate('Blog Failed Status');
                    });
                    // navigation.replace('Blog Complete Status',{baseUrl:baseUrl,myData:postData})
                    // const headers = { 
                    //     'Accept' : 'application/json',
                    //     'Authorization' : 'Bearer '+ global.auth,
                    // }; 
                    // axios.post(baseUrl, postData, { headers })
                    // .then(response => {
                    //     if(response.data.status_code == 200){
                    //         alert(response.data.status);
                    //         navigation.replace('Blog Complete Status');
                    //     }    
                    // })    
                    // .catch((error) => {
                    //     console.log(error);
                    //     alert(error);
                    //     navigation.replace('Blog Failed Status');
                    // });
                }else{
                    ToastHelper.toast('Please fill up all data and choose day', null, 'error');
                    // alert('Please fill up all data and choose day');
                }
            }
        }
    }

    function formatAMPM(date) {
        var strTime = '';
        if(date == ''){
            strTime = '';
        }else{
            var hours = date.getHours();
            var minutes = date.getMinutes();
            // var ampm = hours >= 12 ? 'pm' : 'am';
            hours = hours % 12;
            hours = hours ? hours : 12; // the hour '0' should be '12'
            minutes = minutes < 10 ? '0'+minutes : minutes;
            strTime = hours + ':' + minutes;
        }
        return strTime;
      }

    return (
        <ScrollView backgroundColor='#FFF'>
            <Box m={5}>
                <MyInputItem lbl={translate('name')} value={contactName} setValue={setContactName}/>
                <MyInputItem lbl={translate('mobileNo')} value={mobile} setValue={setMobile}/>
                <Text style={styles.radioTitle}>{translate('pickupAvailableTime')}</Text>
                <Text style={styles.followUpLbl}>{translate('rentContMsg')}</Text>
                {/* <MyHorizontalRadioGroup radioValue={pickupType} setRadioValue={setPickupType} FromTime={FromTime} setFromTime={setFromTime} ToTime={ToTime} setToTime={setToTime} />                           */}
                <Radio.Group>
                    <HStack alignItems='center' mt={5}> 
                        <Radio colorScheme="red" mr={3} value='daily' onPress={()=>radioHandler("daily")}>
                            <Box ml={2}><Text>{translate('daily')}</Text></Box>
                        </Radio>
                        <Radio colorScheme="red" value='eachDay' onPress={()=>radioHandler("eachDay")}>
                            <Box ml={2}><Text ml={3}>{translate('eachDay')}</Text></Box>
                        </Radio>
                    </HStack>                   
                </Radio.Group>
                {pickupType === "eachDay" ? 
                <VStack mb={10}>
                    <MyCheckBoxItem value={monday} setValue={setMonDay} lbl={translate('monday')} FromTime={monStart} setFromTime={setMonStart} ToTime={monEnd} setToTime={setMonEnd}/>  
                    <MyCheckBoxItem value={tuesday} setValue={setTuesDay} lbl={translate('tuesday')} FromTime={tueStart} setFromTime={setTueStart} ToTime={tueEnd} setToTime={setTueEnd}/>  
                    <MyCheckBoxItem value={wedday} setValue={setWedDay} lbl={translate('wedday')} FromTime={wedStart} setFromTime={setwedStart} ToTime={wedEnd} setToTime={setWedEnd}/>  
                    <MyCheckBoxItem value={thursday} setValue={setThursDay} lbl={translate('thursday')} FromTime={thurStart} setFromTime={setThurStart} ToTime={thurEnd} setToTime={setThurEnd}/>  
                    <MyCheckBoxItem value={friday} setValue={setFriDay} lbl={translate('friday')} FromTime={friStart} setFromTime={setFriStart} ToTime={friEnd} setToTime={setFriEnd}/>  
                    <MyCheckBoxItem value={satday} setValue={setSatDay} lbl={translate('satday')} FromTime={satStart} setFromTime={setSatStart} ToTime={satEnd} setToTime={setSatEnd}/>  
                    <MyCheckBoxItem value={sunday} setValue={setSunDay} lbl={translate('sunday')} FromTime={sunStart} setFromTime={setSunStart} ToTime={sunEnd} setToTime={setSunEnd}/>  
                </VStack>
             : null}
                {pickupType === "daily" ? <MyDailyStartEndTime FromTime={dailyStart} setFromTime={setDailyStart} ToTime={dailyEnd} setToTime={setDailyEnd}/> : null}
                <TouchableOpacity style={styles.btn} onPress={()=>submitAction()}>
                    <Text style={styles.btnLbl}>{translate('apply')}</Text>
                </TouchableOpacity>
            </Box>
             {/* <Toast /> */}
        </ScrollView>
    )
}

export default RequestTourForm