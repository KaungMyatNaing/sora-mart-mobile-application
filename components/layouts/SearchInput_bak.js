import React,{useEffect, useState} from 'react';
import { HStack,Input, CloseIcon } from 'native-base';
import { TouchableOpacity } from 'react-native';
import axios from 'axios';
import config from '../../config/config';
import { useIsFocused } from '@react-navigation/native' // for re-render
import ToastHelper from '../Helper/toast';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';

function SearchInput ( ){
    const navigation = useNavigation(); 
    const [search, setSearch] = React.useState();
    const baseUrl = config.baseUrl + '/api/recent-searchs/store';
    const headers = { 
        'Accept': 'application/json', 
        'Authorization' : 'Bearer '+ global.auth,        
    }
  
    const handle = (text) => {
        const myData = {'keyword' : text};  
        axios.post(baseUrl, myData, { headers })
        .then(response => {        
        //    if(response) {
            navigation.navigate('Search Result', {text:text});
                // navigation.navigate('SearchResult');
        //    } else {
        //         navigation.navigate('SearchResult');
        //    }
        })    
        .catch((error) => {
            console.log(response); 
            ToastHelper.toast(error, null, 'error');
        });
    }

    return(
        <HStack w="90%" justifyContent='space-between' alignItems="center">
            <Input variant="unstyled" value={search} onSubmitEditing = {(event) => (handle(event.nativeEvent.text))} placeholder="search" w="80%" onChange={(e) => setSearch(e.target.value)}/>
            <TouchableOpacity onPress={() => setSearch('')}>
                <CloseIcon size="4" w="20%"/>   
            </TouchableOpacity>  
            <Toast />    
        </HStack>
    );
}
export default SearchInput;