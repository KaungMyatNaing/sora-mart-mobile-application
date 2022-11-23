import Reat,{useState} from 'react';
import { VStack, HStack} from 'native-base';
import {Image} from 'native-base';
import {TextInput,TouchableOpacity} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { styles } from "../../../assets/css/blog/HouseRent/HouseRentStyle";
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
    console.log('format dob ==========');
    console.log(strDate);
    return strDate;
  }

function MyDatePicker({lbl,date,setDate}){
    // const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    // const [currentFT,setCurrentFT] = useState('from');


    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);

        console.log('date is =================');
        console.log(currentDate);
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
                label={lbl}
                onFocus={() => showDatepicker()}
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

export default MyDatePicker;