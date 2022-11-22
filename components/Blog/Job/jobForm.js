import React,{ useEffect, useState } from 'react';
import { Box, HStack, VStack ,ScrollView , Text, Radio} from 'native-base';
import { TouchableOpacity } from 'react-native';
import { MyInputItem, MyTextArea } from '../HouseRent/RentFormItems';
import MyDatePicker from '../HouseRent/DateTimePicker';
import { Myddl, Prefectureddl } from '../HomeWifi/homeWifiFormItems';
import { CertificateImg } from '../defaultImages';
import config from '../../../config/config';
import axios from 'axios';
import styles from '../../../assets/css/blog/Job/jobFormStyle';
import { useIsFocused } from '@react-navigation/native' // for re-render
import {MyCheckBoxItem} from '../HouseRent/TourFormComponents'
import ToastHelper from '../../Helper/toast';
import { translate } from 'react-native-translate';

function JobForm ({navigation,route}){
    const serviceId = route.params.service_id;
    const [eng_name,setEngName] = useState('');
    const [jpn_name,setJpnName] = useState('');
    const [dob, setDob] = useState(new Date());
    const [certificateImg, setCertificateImg] = useState('');
    const [roomNo,setRoomNo] = useState('');
    const [building,setBuilding] = useState('');
    const [city,setCity] = useState('');
    const [prefecture,setPrefecture] = useState(''); 
    const [postal,setPostal] = useState('');
    const [chome,setChome] = useState('');
    const [homePhone,setHomePhone] = useState('');
    const [mobilePhone,setMobilePhone] = useState('');
    const [gender,setGender] = useState('');
    const [primaryYear,setPrimaryYear] = useState('');
    const [primaryMonth,setPrimaryMonth] = useState('');
    const [primaryUni,setPrimaryUni] = useState('');
    const [secondaryYear,setSecondaryYear] = useState('');
    const [secondaryMonth,setSecondaryMonth] = useState('');
    const [secondaryUni,setSecondaryUni] = useState('');
    const [tertiaryYear,setTerTiaryYear] = useState('');
    const [tertiaryMonth,setTerTiaryMonth] = useState('');
    const [tertiaryUni,setTertiaryUni] = useState('');
    const [purpose,setPurpose] = useState('');
    const [advantage,setAdvantage] = useState('');
    const [expYear, setExpYear] = useState('');
    const [expMonth, setExpMonth] = useState('');
    const [expCompany, setExpCompany] = useState('');
    const [expYearArr, setExpYearArr] = useState([]);
    const [expMonthArr, setExpMonthArr] = useState([]);
    const [expCompanyArr, setExpcompanyArr] = useState([]);
    const [photo,setPhoto] = useState([]);
    const [monday, setMonDay] = useState(false);
    const [tuesday, setTuesDay] = useState(false);
    const [wedday, setWedDay] = useState(false);
    const [thursday, setThursDay] = useState(false);
    const [friday, setFriDay] = useState(false);
    const [satday, setSatDay] = useState(false);
    const [sunday, setSunDay] = useState(false);

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

    const [isApplyClick,setIsApplyClick] = useState(false);

    const [expObject, setExpObject] = useState([]);

    const [townData,setTownData] = useState(['Cit/Town']);
    const [prefectureData,setPrefectureData] = useState(['Prefecture']);
   

    const town_baseUrl = config.baseUrl + '/api/town';
    const prefecture_baseUrl = config.baseUrl + '/api/prefecture';

    const isFocused = useIsFocused();
   

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

    const addExperience = () => {
        if(expYear != '' && expMonth != '' && expCompany != ''){
            console.log('exp data is existed');
            expYearArr.push(expYear);
            expMonthArr.push(expMonth);
            expCompanyArr.push(expCompany);

            var expObj = {
                year : expYear,
                month:expMonth,
                company:expCompany,
            }

            expObject.push(expObj);

            setExpObject(expObject);

            console.log(expObject);

            setExpYear('');
            setExpMonth('');
            setExpCompany('');
        }
        
    }

    const removeExperience = (exp) => {
        var toRemove = exp;
        var index = expObject.indexOf(toRemove);
        if (index > -1) { //Make sure item is present in the array, without if condition, -n indexes will be considered from the end of the array.
            expObject.splice(index, 1);
        }

        var toRemoveYear = exp.year;
        var toRemoveMonth = exp.month;
        var toRemoveCompany = exp.company;

        var yearIndex = expYearArr.indexOf(toRemoveYear);
        var monthIndex = expMonthArr.indexOf(toRemoveMonth);
        var companyIndex = expCompanyArr.indexOf(toRemoveCompany);

        if (yearIndex > -1) { //Make sure item is present in the array, without if condition, -n indexes will be considered from the end of the array.
            expYearArr.splice(yearIndex, 1);
        }

        if (monthIndex > -1) { //Make sure item is present in the array, without if condition, -n indexes will be considered from the end of the array.
            expMonthArr.splice(monthIndex, 1);
        }

        if (companyIndex > -1) { //Make sure item is present in the array, without if condition, -n indexes will be considered from the end of the array.
            expCompanyArr.splice(companyIndex, 1);
        }

        setExpObject(expObject);
        setExpYearArr(expYearArr);
        setExpMonthArr(expMonthArr);
        setExpcompanyArr(expCompanyArr);

        setExpYear(exp.year);
        setExpMonth(exp.month);
        setExpCompany(exp.company);

    }

    useEffect(()=>{
        getTown();
      },[])

    useEffect(()=>{
        getPrefecture();
    },[])

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

    let day = [];    

    const baseUrl = config.baseUrl+'/api/job-apply/add';      

    const ApplyAction = () => {

        setIsApplyClick(true);

        const postData = {
            "eng_name" : eng_name,
            "jp_name" : jpn_name,
            "dob" : formatToString(dob),
            "phone_home" : homePhone,
            "phone_mobile" : mobilePhone,
            "gender" : gender,
            "postal_code" : postal,
            "prefecture" : prefecture ,
            "service_id" : serviceId,
            "city" : city,
            "town" : city,
            "ward" : chome,
            "building" : building,
            "room_no" : roomNo,
            "edu_year_primary" : primaryYear,
            "edu_month_primary" : primaryMonth,
            "edu_university_primary" : primaryUni,
            "edu_year_secondary" : secondaryYear ,
            "edu_month_secondary" : secondaryMonth,
            "edu_university_secondary" : secondaryUni,
            "edu_year_tertiary" : tertiaryYear ,
            "edu_month_tertiary" : tertiaryMonth,
            "edu_university_tertiary" : tertiaryUni,
            "purpose" : purpose,
            "advantages" : advantage,
            "photo" : photo,
            "exp_company":expCompanyArr,
            "exp_year" : expYearArr,
            "exp_month" : expMonthArr,
        }
    
        if(certificateImg !== null && certificateImg != ""){
            photo.push(certificateImg);
        }

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

        if(global.auth == '' || global.auth == null){

            global.forceLoginMsg = config.forceLoginMsg;

            navigation.replace('Sign In');
            
        }else{
            console.log('auth');
            
            const headers = { 
                'Accept' : 'application/json',
                'Authorization' : 'Bearer '+ global.auth,
            }; 
            axios.post(baseUrl, postData, { headers })
            .then(response => {
            if(response.data.status_code == 200){
                console.log(response.data.status_code);
                console.log("success");

                navigation.replace('Blog Complete Status');            

                ToastHelper.toast(response.data.status, null, 'success');
                // alert(response.data.status);
                }    
            })    
            .catch((error) => {
                alert(error);
                console.log(error);
                navigation.replace('Blog Failed Status');
            });
        }  
    }

    return (
        <ScrollView backgroundColor='#fff'>
<           Box m={5}>
                <VStack mb={10}>
                    <MyInputItem lbl={translate('nameEng')} value={eng_name} setValue={setEngName}/>
                    <MyInputItem lbl={translate('nameJpn')} value={jpn_name} setValue={setJpnName}/>
                    <MyDatePicker lbl={translate('birthday')} date={dob} setDate={setDob}/>
                    <HStack justifyContent='space-between'>
                        <VStack w='45%'>
                            <MyInputItem lbl={translate('phoneHome')} value={homePhone} setValue={setHomePhone}/>
                        </VStack>
                        <VStack w='45%'>
                            <MyInputItem lbl={translate('phoneMobile')} value={mobilePhone} setValue={setMobilePhone}/>
                        </VStack>
                    </HStack>
                    <VStack>
                        <Text style={styles.MyInputItem}>{translate('gender')}</Text>
                        <Radio.Group name="myRadioGroup" value={gender} onChange={nextValue => {setGender(nextValue);}} colorScheme='red'>
                            <HStack space={3}>
                                <Radio value="male" my={1}>
                                    <Text style={styles.radioLbl}>{translate('male')}</Text>
                                </Radio>
                                <Radio value="female" my={1}>
                                    <Text style={styles.radioLbl}>{translate('female')}</Text>
                                </Radio>
                            </HStack>
                        </Radio.Group>
                    </VStack>
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
                                <Prefectureddl lbl={translate('prefecture')} town={prefectureData} value={prefecture} setSelectedValue={setPrefecture}/>
                            </VStack>
                        }                    
                    </HStack>
                    <VStack>
                        <MyInputItem lbl={translate('unitRoom')} value={roomNo} setValue={setRoomNo}/>
                    </VStack>
                    <VStack>
                        <MyInputItem lbl={translate('building')} value={building} setValue={setBuilding}/>
                    </VStack>
                    <VStack mt={10}>
                        <Text style={styles.eduTitle}>{translate('educationPrimary')}</Text>
                        <HStack justifyContent='space-between'>
                            <VStack w='45%'>
                                <MyInputItem lbl={translate('year')} value={primaryYear} setValue={setPrimaryYear}/>
                            </VStack>
                            <VStack w='45%'>
                                <MyInputItem lbl={translate('month')} value={primaryMonth} setValue={setPrimaryMonth}/>
                            </VStack>
                        </HStack>
                        <MyInputItem lbl={translate('university')} value={primaryUni} setValue={setPrimaryUni}/>
                    </VStack>
                    <VStack mt={10}>
                        <Text style={styles.eduTitle}>{translate('educationSecondary')}</Text>
                        <HStack justifyContent='space-between'>
                            <VStack w='45%'>
                                <MyInputItem lbl={translate('year')} value={secondaryYear} setValue={setSecondaryYear}/>
                            </VStack>
                            <VStack w='45%'>
                                <MyInputItem lbl={translate('month')} value={secondaryMonth} setValue={setSecondaryMonth}/>
                            </VStack>
                        </HStack>
                        <MyInputItem lbl={translate('university')} value={secondaryUni} setValue={setSecondaryUni}/>
                    </VStack>
                    <VStack mt={10}>
                        <Text style={styles.eduTitle}>{translate('educationTertiary')}</Text>
                        <HStack justifyContent='space-between'>
                            <VStack w='45%'>
                                <MyInputItem lbl={translate('year')} value={tertiaryYear} setValue={setTerTiaryYear}/>
                            </VStack>
                            <VStack w='45%'>
                                <MyInputItem lbl={translate('month')} value={tertiaryMonth} setValue={setTerTiaryMonth}/>
                            </VStack>
                        </HStack>
                        <MyInputItem lbl={translate('university')} value={tertiaryUni} setValue={setTertiaryUni}/>
                    </VStack>
                    <CertificateImg image = {certificateImg} setImage ={setCertificateImg}/>

                    <VStack>
                        <HStack alignItems='center' mt={10}>
                            <Text style={styles.eduTitle}>{translate('workingExp')} </Text>
                        </HStack>

                        {expObject && expObject.map((exp, i) => {
                            return (
                            <HStack mt={5} justifyContent='space-between' style={styles.exptbl} key={i}>
                                <VStack w="30%">
                                    <Text>{exp.year}</Text>
                                </VStack>
                                <VStack w="30%">
                                    <Text>{exp.month}</Text>
                                </VStack>
                                <VStack w="30%">
                                    <Text>{exp.company}</Text>
                                </VStack>
                                <TouchableOpacity onPress={()=>removeExperience(exp)}><Text style={styles.minusBtn}>-</Text></TouchableOpacity>
                            </HStack>                        
                            )
                        })}
                        
                       <HStack alignItems='center' justifyContent='space-between'>
                            <VStack w="85%" style={styles.addFrm}>
                                <HStack justifyContent='space-between'>                            
                                    <VStack w='45%'>
                                        <MyInputItem lbl={translate('year')} value={expYear} setValue={setExpYear}/>
                                    </VStack>
                                    <VStack w='45%'>
                                        <MyInputItem lbl={translate('month')} value={expMonth} setValue={setExpMonth}/>
                                    </VStack>
                                </HStack>
                                <MyInputItem lbl={translate('company')} value={expCompany} setValue={setExpCompany}/>
                            </VStack>
                            <TouchableOpacity onPress={()=>addExperience()}><Text style={styles.addBtn}>+</Text></TouchableOpacity>                            
                       </HStack>
                    </VStack>
                    <MyTextArea lbl='Purpose for applying this job *' value={purpose} setValue = {setPurpose} />
                    <MyTextArea lbl='Strong Point *' value={advantage} setValue = {setAdvantage} />
                    <VStack mb={10} mt={10}>
                        <Text>{translate('availableDateTime')}</Text>
                        <MyCheckBoxItem value={monday} setValue={setMonDay} lbl={translate('monday')} FromTime={monStart} setFromTime={setMonStart} ToTime={monEnd} setToTime={setMonEnd}/>  
                        <MyCheckBoxItem value={tuesday} setValue={setTuesDay} lbl={translate('tuesday')} FromTime={tueStart} setFromTime={setTueStart} ToTime={tueEnd} setToTime={setTueEnd}/>  
                        <MyCheckBoxItem value={wedday} setValue={setWedDay} lbl={translate('wedday')} FromTime={wedStart} setFromTime={setwedStart} ToTime={wedEnd} setToTime={setWedEnd}/>  
                        <MyCheckBoxItem value={thursday} setValue={setThursDay} lbl={translate('thursday')} FromTime={thurStart} setFromTime={setThurStart} ToTime={thurEnd} setToTime={setThurEnd}/>  
                        <MyCheckBoxItem value={friday} setValue={setFriDay} lbl={translate('friday')} FromTime={friStart} setFromTime={setFriStart} ToTime={friEnd} setToTime={setFriEnd}/>  
                        <MyCheckBoxItem value={satday} setValue={setSatDay} lbl={translate('satday')} FromTime={satStart} setFromTime={setSatStart} ToTime={satEnd} setToTime={setSatEnd}/>  
                        <MyCheckBoxItem value={sunday} setValue={setSunDay} lbl={translate('sunday')} FromTime={sunStart} setFromTime={setSunStart} ToTime={sunEnd} setToTime={setSunEnd}/>  
                    </VStack>                    
                   {isApplyClick? 
                    <VStack pl={5} pr={5} mt={10}>
                        <TouchableOpacity style={styles.dimbtn} m={5} onPress={()=>alert('processing ...')} >
                            <Text style={styles.btnLbl}>{translate('apply')}</Text>
                        </TouchableOpacity>
                    </VStack> :  
                    <VStack pl={5} pr={5} mt={10}>
                            <TouchableOpacity style={styles.btn} m={5} onPress={()=>ApplyAction()}>
                                <Text style={styles.btnLbl}>{translate('apply')}</Text>
                            </TouchableOpacity>
                        </VStack>
                    }
                </VStack>                
            </Box>
        </ScrollView>
    )
}

export default JobForm;