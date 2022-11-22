import {Divider, ScrollView} from 'native-base'
import {DetailsTitle, ImagePart,KeyValuePart,RentFooter, IconAndLbl, MyList,IconAndLblFacilities, RentBtn} from '../detailComponents';
import { useIsFocused } from '@react-navigation/native' // for re-render
import {apiGetAuthActionCreator} from '../../../backend/ApiActionCreator'
import config from '../../../config/config'
import React,{useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { ActivityIndicator } from 'react-native'

function HouseRentDetails({route,navigation}){
    const {id} = route.params;
    const dispatch = useDispatch();
    const rentdata  = useSelector((state) => state.apiReducer.data[0]);
    const loading = useSelector((state) => state.apiReducer.loading);
    const baseUrl = config.baseUrl + '/api/service/detail/' + id;

    const isFocused = useIsFocused() // for re-render
    useEffect(() => {
        dispatch(apiGetAuthActionCreator(baseUrl,global.auth));
    }, [id, isFocused]);
    
    if(loading){
        return (<ActivityIndicator/>)
    }else{
        return(
            <ScrollView backgroundColor='#fff'>
                <DetailsTitle pdata={rentdata}/>
                <ImagePart favCount='200' type={rentdata}/>
                <KeyValuePart twidth='80%' tkey='Rental Price' value={rentdata.price}/>
                <IconAndLbl mt={3}/>
                <MyList lbl='Nishi-ku, Yakohoma City,Kanagawa Pref.'/>
                <MyList lbl='1 min walk from Azabu-juban Sta.'/>
                <MyList lbl='Minato-ku, Tokyo / 1LDK / 44.7m2'/>
                <Divider my={2} mt={5} mb={5}/>
                <IconAndLblFacilities/>
                <MyList lbl='1 Room-Sharehouse'/>
                <MyList lbl='2 Beds, 1 Bath'/>
                <MyList lbl='Air-Con, TV, Washing Machine, Wide Space Kitchen'/>
                <MyList lbl='Good Water, Good Electricity'/>
                <RentFooter nav={navigation}/>
                <RentBtn lbl='RENT' navigation={navigation}/>
            </ScrollView>
        )
    }
}
export default HouseRentDetails