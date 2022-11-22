import {ScrollView} from 'native-base'
import {DetailsTitle, ImagePart,KeyValuePart,BodyPart,ApplyBtn} from '../detailComponents'

import {apiGetAuthActionCreator} from '../../../backend/ApiActionCreator'
import config from '../../../config/config'
import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { ActivityIndicator } from 'react-native'
import { useIsFocused } from '@react-navigation/native' // for re-render
function JobDetails({route}){
    const {id} = route.params;

    const dispatch = useDispatch();
    const jobdata  = useSelector((state) => state.apiReducer.data[0]);
    const loading = useSelector((state) => state.apiReducer.loading);
    const job_url = config.baseUrl + '/api/service/detail/' + id;

    const isFocused = useIsFocused() // for re-render
    useEffect(() => {
        dispatch(apiGetAuthActionCreator(job_url,global.auth));
    }, [id, isFocused]);

    // console.log('job data is');
    // console.log(jobdata);

    if(loading){
        return <ActivityIndicator/>
    }else{
        return(
        
            <ScrollView backgroundColor='#fff'>
                <DetailsTitle pdata={jobdata}/>
                <ImagePart favCount='200' type={jobdata}/>
                <KeyValuePart tkey='Salary' value={jobdata.salary}/>
                <BodyPart txt={jobdata}/>
                <ApplyBtn lbl='APPLY' mtValue='30%'/>
            </ScrollView>
        )
    }

   
}
export default JobDetails