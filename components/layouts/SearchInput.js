import React,{useEffect, useState} from 'react';
import { HStack,Input, CloseIcon } from 'native-base';
import { TouchableOpacity } from 'react-native';
import axios from 'axios';
import config from '../../config/config';
import { useIsFocused } from '@react-navigation/native' // for re-render
import ToastHelper from '../Helper/toast';
import Toast from 'react-native-toast-message';
import { AsyncStorage } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

function SearchInput (){
     const navigation = useNavigation(); 
    const [search, setSearch] = React.useState();
    const [recentsearch, setRecentSearch] = React.useState([]);

   
  
    const handle = async(text) => {
      
        const recent = await AsyncStorage.getItem("recentsearch");
        if (recent !== null) {
            const recentAdd = [...JSON.parse(recent), text]
            await AsyncStorage.setItem("recentsearch",JSON.stringify(recentAdd));
            setRecentSearch(recentAdd); 
            console.log(recentsearch);
        } else {
            await AsyncStorage.setItem("recentsearch", JSON.stringify([text]));
            setRecentSearch(JSON.parse(recent)); 
        }
        navigation.navigate('Search Result', { text: text });
       
    }

    return(
        <HStack w="90%" justifyContent='space-between' alignItems="center">
            <Input variant="unstyled" value={search} onSubmitEditing = {(event) => (handle(event.nativeEvent.text))} placeholder="Search" w="80%" onChange={(e) => setSearch(e.target.value)}/>
            <TouchableOpacity onPress={() => setSearch('')}>
                <CloseIcon size="4" w="20%"/>   
            </TouchableOpacity>  
            <Toast />    
        </HStack>
    );
}
export default SearchInput;