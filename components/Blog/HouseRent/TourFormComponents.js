import {TextInput,Text} from 'react-native'
import { styles } from '../../../assets/css/blog/HouseRent/HouseRentStyle'
import {HStack, Radio,Box, VStack, Image,Checkbox} from 'native-base'
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useIsFocused } from '@react-navigation/native' // for re-render
import { translate } from 'react-native-translate';
function formatAMPM(date) {
    var strTime = '';
    if(date == ''){
        strTime = '';
    }else{
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        strTime = hours + ':' + minutes + ' ' + ampm;
    }
    return strTime;
  }

function LblAndInput({lbl,value,setValue}){
    return (
        <TextInput
            selectionColor='#EC1C24'
            theme={{colors: {primary: '#EC1C24', underlineColor: 'transparent'}}}
            style={styles.TextInput} 
            lable={lbl}
            onChangeText={(value)=>setValue(value)}
        />
    )
}

function MyHorizontalRadioGroup({radioValue,setRadioValue,FromTime,setFromTime,ToTime,setToTime}){

    // const [radioValue, setRadioValue] = React.useState("eachDay");

    const radioHandler = (radioValue) => {
        setRadioValue(radioValue);
    };
    
    return (
        <>
        <Radio.Group>
            <HStack alignItems='center' mt={5}> 
                <Radio colorScheme="red" mr={3} value='daily' onPress={()=>radioHandler("daily")}>
                    <Box ml={2}><Text>Daily</Text></Box>
                </Radio>
                <Radio colorScheme="red" value='eachDay' onPress={()=>radioHandler("eachDay")}>
                    <Box ml={2}><Text ml={3}>Each Day</Text></Box>
                </Radio>
            </HStack>                   
        </Radio.Group>
        {radioValue === "eachDay" ? <MyCheckBoxGroup FromTime={FromTime} setFromTime={setFromTime} ToTime={ToTime} setToTime={setToTime}/> : null}
        {radioValue === "daily" ? <MyDailyStartEndTime FromTime={FromTime} setFromTime={setFromTime} ToTime={ToTime} setToTime={setToTime}/> : null}
        </>
    )
}

const MyCheckBox = ({value,setValue,lbl}) => {
    return(
        <HStack justifyContent='flex-start' alignItems='center' mt={5}>
            <Checkbox value={value} onChange={() => setValue(!value)} colorScheme='red' accessible={true} accessibilityLabel="Check Me"/>
            <Box ml={2}><Text>{lbl}</Text></Box>
        </HStack>
    )
}

const MyTimePicker = ({lbl,fromToType,FromTime,setFromTime,ToTime,setToTime}) => {
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [currentFT,setCurrentFT] = useState('from');
    // const [FromTime,setFromTime] = useState(new Date());
    // const [ToTime,setToTime] = useState(new Date());

    const onChange =(event,selectedDate) =>{
        if (currentFT === 'from') {
            const currentDate = selectedDate || FromTime;
            setShow(Platform.OS === 'ios');
            setFromTime(currentDate);
          } else {
            const currentDate = selectedDate || ToTime;
            setShow(Platform.OS === 'ios');
            setToTime(currentDate);
          }
    }
    
      const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
      };
    
      const showTimepicker = (ft) => {
        showMode('time');
        setCurrentFT(ft);
      };
    return(
        <VStack justifyContent='flex-start' alignItems='flex-start' w='45%'>
            <Text>{lbl}</Text>
            <HStack justifyContent='space-between' alignItems='center' style={styles.TimePicker}>
                {fromToType == 'from' ? 
                (
                    <>
                    <TextInput
                        placeholder=""
                        onFocus={() => showTimepicker('from')}
                        value={formatAMPM(FromTime)}
                        textAlign='center'
                        marginLeft={0}
                    />
                    <TouchableOpacity onPress={()=>showTimepicker('from')}>
                        <Image mr={3} alt='time' source={require('../../../assets/image/Blog/HouseRent/TimeIcon.png')} w={6} h={6} resizeMode='contain'/>
                    </TouchableOpacity>
                </>
                ) : (
                    <>
                        <TextInput
                            placeholder=""
                            onFocus={() => showTimepicker('to')}
                            value={formatAMPM(ToTime)}
                            textAlign='center'
                            marginLeft={0}
                        />
                        <TouchableOpacity onPress={()=>showTimepicker('to')}>
                            <Image mr={3} alt='time' source={require('../../../assets/image/Blog/HouseRent/TimeIcon.png')} w={6} h={6} resizeMode='contain'/>
                        </TouchableOpacity>
                    </>
                )}
                
                {show && (
                    <DateTimePicker
                    testID="dateTimePicker"
                    value={FromTime}
                    mode={mode}
                    is24Hour={false}
                    display="default"
                    onChange={onChange}
                    style={{width: 320}}                    
                    />
                )}
            </HStack>
        </VStack>
    )
}

const MyStartEndTime = ({FromTime,setFromTime,ToTime,setToTime}) => {
    return(
        <HStack justifyContent='space-between' mt={2}>
            <MyTimePicker lbl={translate('startFrom')} fromToType='from' FromTime={FromTime} setFromTime={setFromTime} ToTime={ToTime} setToTime={setToTime}/>            
            <MyTimePicker lbl={translate('endIn')} fromToType='to' FromTime={FromTime} setFromTime={setFromTime} ToTime={ToTime} setToTime={setToTime}/>            
        </HStack>
    )
}

// const MyDailyTimePicker = ({lbl,fromToType}) => {
//     const [From, setFrom] = useState(new Date());
//     const [To, setTo] = useState(new Date());
//     const [show, setShow] = useState(false);
//     const [currentSetting, setcurrentSetting] = useState('from');

//     const onChange = (event, selectedDate) => {
//         if (currentSetting === 'from') {
//             const currentDate = selectedDate || From;
//             setShow(Platform.OS === 'ios');
//             setFrom(currentDate);
//         } else {
//             const currentDate = selectedDate || To;
//             setShow(Platform.OS === 'ios');
//             setTo(currentDate);
//         }
//     };

//     const showTimepicker = (current) => {
//         setShow(true);
//         setcurrentSetting(current);    
//     };

//     return(
//         <VStack justifyContent='flex-start' alignItems='flex-start' w='45%'>
//             <Text>{lbl}</Text>
//             <HStack style={styles.TimePicker} justifyContent='flex-end' alignItems='center'>
//                 {fromToType == 'from' ?
//                     (
//                         <>
//                             <TextInput
//                                 placeholder=""
//                                 onFocus={() => showTimepicker('from')}
//                                 value={formatAMPM(From)}
//                             />
//                             <TouchableOpacity>
//                                 <Image mr={3} alt='time' source={require('../../../assets/image/Blog/HouseRent/TimeIcon.png')} w={6} h={6} resizeMode='contain'/>
//                             </TouchableOpacity>
//                         </>
//                     ) : (
//                         <>
//                             <TextInput
//                                 placeholder=""
//                                 onFocus={() => showTimepicker('to')}
//                                 value={formatAMPM(From)}
//                             />
//                             <TouchableOpacity>
//                                 <Image mr={3} alt='time' source={require('../../../assets/image/Blog/HouseRent/TimeIcon.png')} w={6} h={6} resizeMode='contain'/>
//                             </TouchableOpacity>
//                         </>
//                     )
//                 }
//                 {show && (
//                     <DateTimePicker
//                     testID="dateTimePicker"
//                     value={From}
//                     mode={'time'}
//                     is24Hour={false}
//                     display="default"
//                     onChange={onChange}
//                     />
//                 )}
//             </HStack>
//         </VStack>
//     )
// }

const MyDailyStartEndTime = ({FromTime,setFromTime,ToTime,setToTime}) => {
    return(
        <HStack justifyContent='space-between' mt={10} mb='80%'>
            <MyTimePicker lbl={translate('startFrom')} fromToType='from' FromTime={FromTime} setFromTime={setFromTime} ToTime={ToTime} setToTime={setToTime} />            
            <MyTimePicker lbl={translate('endIn')} fromToType='to' FromTime={FromTime} setFromTime={setFromTime} ToTime={ToTime} setToTime={setToTime}/>            
        </HStack>
    )
}

const MyCheckBoxItem = ({value,setValue,lbl,FromTime,setFromTime,ToTime,setToTime}) => {
    return (
        <>
            <MyCheckBox value={value} setValue={setValue} lbl={lbl}/>
            <MyStartEndTime FromTime={FromTime} setFromTime={setFromTime} ToTime={ToTime} setToTime={setToTime}/>
        </>
    )
}

function MyCheckBoxGroup({FromTime,setFromTime,ToTime,setToTime}){
    const [monday, setMonDay] = useState(true);
    const [tuesday, setTuesDay] = useState(false);
    const [wedday, setWedDay] = useState(false);
    const [thursday, setThursDay] = useState(true);
    const [friday, setFriDay] = useState(true);
    const [satday, setSatDay] = useState(false);
    const [sunday, setSunDay] = useState(false);

    return(
        <VStack mb={10}>
            <MyCheckBoxItem value={monday} setValue={setMonDay} lbl='Monday' FromTime={FromTime} setFromTime={setFromTime} ToTime={ToTime} setToTime={setToTime}/>  
            <MyCheckBoxItem value={tuesday} setValue={setTuesDay} lbl='Tuesday' FromTime={FromTime} setFromTime={setFromTime} ToTime={ToTime} setToTime={setToTime}/>  
            <MyCheckBoxItem value={wedday} setValue={setWedDay} lbl='Wednesday' FromTime={FromTime} setFromTime={setFromTime} ToTime={ToTime} setToTime={setToTime}/>  
            <MyCheckBoxItem value={thursday} setValue={setThursDay} lbl='Thursday' FromTime={FromTime} setFromTime={setFromTime} ToTime={ToTime} setToTime={setToTime}/>  
            <MyCheckBoxItem value={friday} setValue={setFriDay} lbl='Friday' FromTime={FromTime} setFromTime={setFromTime} ToTime={ToTime} setToTime={setToTime}/>  
            <MyCheckBoxItem value={satday} setValue={setSatDay} lbl='Saturday' FromTime={FromTime} setFromTime={setFromTime} ToTime={ToTime} setToTime={setToTime}/>  
            <MyCheckBoxItem value={sunday} setValue={setSunDay} lbl='Sunday' FromTime={FromTime} setFromTime={setFromTime} ToTime={ToTime} setToTime={setToTime}/>  
        </VStack>
    )
}

function SubmitBtn({navigation,postData}){
    return(
        <TouchableOpacity style={styles.btn} onPress={()=>submitAction()}>
            <Text style={styles.btnLbl}>Submit</Text>
        </TouchableOpacity>
    )
}
export {LblAndInput,MyHorizontalRadioGroup,MyCheckBoxGroup,SubmitBtn,MyCheckBoxItem,MyDailyStartEndTime}