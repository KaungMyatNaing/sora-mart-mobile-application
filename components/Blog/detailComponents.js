import {Text,VStack,Image, HStack} from 'native-base'
import { TouchableOpacity } from 'react-native'
import styles from '../../assets/css/blog/Job/jobDetailsStyle'
import config from '../../config/config'
import Toast from 'react-native-toast-message';
import { useIsFocused } from '@react-navigation/native' // for re-render
import HTMLView from 'react-native-htmlview'
import axios from 'axios';
import { translate } from 'react-native-translate';

const favAction = (favdata) => {

    if(global.auth == '' || global.auth == null){

        global.forceLoginMsg = config.forceLoginMsg;
        navigation.replace('Sign In');

      }else{
        const addServiceUrl = config.baseUrl + '/api/favourite-service/add/' + favdata.guid + '/' + favdata.type;
        const headers = { 
            'Accept': 'application/json', 
            'Authorization' : 'Bearer '+ global.auth,
        }
        axios.get(addServiceUrl,{ headers })
            .then(response => {
                console.log(response.data.data.desc);
            })    
            .catch((error) => {
            console.log(error);
            });
      
      }
}

const saveAction = (savedata) => {

    const postData = {
        service_id : savedata.guid,
        company_id : savedata.company_id
    } 

    console.log('post dat i');
    console.log(postData);

    if(global.auth == '' || global.auth == null){

        global.forceLoginMsg = config.forceLoginMsg;
        navigation.replace('Sign In');

      }else{
  
        const saveUrl = config.baseUrl + '/api/save-job/add';
  
        const headers = { 
            'Accept': 'application/json', 
            'Authorization' : 'Bearer '+ global.auth,
        };
  
        axios.post(saveUrl,postData,{ headers })
            .then(response => {
                console.log(response.data.data.desc);
            })    
            .catch((error) => {
                console.log(error);
            });
      } 
}

function DetailsTitle({pdata}){ 
    return(
        <VStack p={5} pb={0}>
            <Text style={styles.title} >{pdata.name}</Text>
            <HStack justifyContent='space-between' alignItems='center' mt={1}>
                <HStack>
                    <Image source={{uri:config.imageUrl + '/6221a22170e97_laravel5.jpg'}} style={styles.companyLogo} resizeMode='cover' alt='logo'/>
                    <Text style={styles.companyName}>{pdata.company_id}</Text>
                </HStack>
                <Text style={styles.postDate}>{pdata.created_at}</Text>
            </HStack>
        </VStack>
    )
}

function FavAndSave({favCnt,type}){
    return(
        <HStack style={styles.favAndSaveBtn} mt={-5} m={2}>
            <HStack>
                <Image source={require('../../assets/image/Blog/favIcon3x.png')} w={6} h={6} resizeMode="contain" alt='fav'/>
                <Text>{favCnt}</Text>
            </HStack>
            <Image source={require('../../assets/image/Blog/saveIcon3x.png')} w={6} h={6} resizeMode="contain" alt='save'/>
        </HStack>
    )
}

function ImagePart({favCount,type}){
    return(
        <>
            <Image style={styles.mainImg} source={{uri:config.imageUrl +'/'+ type.logo_url}} resizeMode="cover" alt='Image' mt={5}/>
            <HStack justifyContent='flex-end'>
                <FavAndSave favCnt = {favCount} type={type}/>
            </HStack>
        </>
    )
    
}

function KeyValuePart({tkey,value}){
    return(
        <HStack style={styles.keyValue} pl={5} pr={5}>
            <Text mr={3}>{tkey}</Text>
            <Text mr={3}>-</Text>
            <Text>{value}</Text>
        </HStack>
    )
}

function BodyPart({txt}){
    return(
        <VStack mt={5} pr={5} mb='30%' pl={5}>
            <HTMLView style={styles.bodyTxt} value={txt.description}/>
        </VStack>
    )
}

function ApplyBtn({lbl, navigation,service_id}){
    return(
        <VStack pl={5} pr={5}>
            <TouchableOpacity style={styles.btn} m={5} onPress={()=>navigation.replace('Job Form',{service_id})}>
                <Text style={styles.btnLbl}>{lbl}</Text>
            </TouchableOpacity>
        </VStack>
    )
}

function RentBtn({lbl,navigation,house_data}){
    return(
        <VStack pl={5} pr={5}>
            <TouchableOpacity style={styles.btn} m={5} onPress={()=>navigation.navigate('Rent Form',{house_data:house_data})}>
                <Text style={styles.btnLbl}>{lbl}</Text>
            </TouchableOpacity>
        </VStack>
    )
}

function SearchBtn(){
    return(
        <TouchableOpacity>
            <Image source={require('../../assets/image/Blog/SearchIcon3x.png')} w={6} h={6} resizeMode="contain" alt='search'/>
        </TouchableOpacity>
    )
}

function IconAndLbl(){
    return (
        <HStack mt={5} pl={5} pr={5}>
            <Image mr={3} source={require('../../assets/image/Blog/HouseRent/AddressIcon.png')} w={6} h={6} resizeMode="contain" alt='address'/>
            <Text>Address</Text>
        </HStack>
    )
}

function IconAndLblFacilities(){
    return (
        <HStack pl={5} pr={5}>
            <Image mr={3} source={require('../../assets/image/Blog/HouseRent/FacilitiesIcon3x.png')} w={6} h={6} resizeMode="contain" alt='facilities'/>
            <Text>Facilities</Text>
        </HStack>
    )
}

function MyList({lbl}){
    return(
        <HStack alignItems='center' pl={5} pr={5}> 
            <Image mr={2} source={require('../../assets/image/png_icons/MyListIcon3x.png')} w={2} h={2} resizeMode="contain" alt='list'/>
            <Text w='90%'>{lbl}</Text>
        </HStack>
    )
}

function MyListWithoutPadding({lbl}){
    return(
        <HStack alignItems='center'> 
            <Image mr={2} source={require('../../assets/image/png_icons/MyListIcon3x.png')} w={2} h={2} resizeMode="contain" alt='list'/>
            <Text w='90%'>{lbl}</Text>
        </HStack>
    )
}

function RentFooter({nav,tour_data}){
    return(
        <VStack justifyContent='center' alignItems='center' mt={10} mb={10} style={styles.rentFooter}>
            <Text style={styles.RentFooterTitle}>{translate('footerMsg1')}</Text>
            <Text style={styles.rentFooterDesc}>{translate('footerMsg2')}</Text>
            <TouchableOpacity style={styles.rentBtn} onPress={()=>nav.navigate('Request a Tour',{type:"house",tour_data:tour_data})}>
                <Text style={styles.rentBtnLbl}>{translate('requestTour')}</Text>
            </TouchableOpacity>
        </VStack>
    )
}

export {
    DetailsTitle,
    ImagePart,
    KeyValuePart,
    BodyPart,
    ApplyBtn,
    SearchBtn,
    IconAndLbl,
    IconAndLblFacilities,
    MyList,
    RentFooter,
    RentBtn,
    FavAndSave,
    MyListWithoutPadding
}