import { HStack, VStack ,Image,FlatList,Text, Divider, Spacer,Box } from 'native-base';
import React, { useEffect } from 'react';
import { styles } from '../../assets/css/ecommerce/notificationStyle';
import config from '../../config/config';
import {apiGetAuthActionCreator} from '../../backend/ApiActionCreator';
import {useDispatch, useSelector} from 'react-redux';
import { TouchableOpacity } from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native' // for re-render
import axios from 'axios';
import { translate } from 'react-native-translate';
function Notification({navigation}) {
    const dispatch = useDispatch();
    const data  = useSelector((state) => state.apiReducer.data);
    const loading = useSelector((state) => state.apiReducer.loading);
    const baseUrl = config.baseUrl + '/api/notifications';
    const isFocused = useIsFocused() // for re-render
    if(global.auth == '' || global.auth == null){
        global.forceLoginMsg = config.forceLoginMsg;
        navigation.navigate('Sign In');        
    }else{
        useEffect(() => {
            dispatch(apiGetAuthActionCreator(baseUrl,global.auth));
        }, [isFocused]);
    }

    const getSeenStyle = (isSeen) => {
        if(isSeen){
            return styles.seenStyle;
        }else{
            return styles.unSeenStyle;
        }
    }

    const seenAction = (guid) => {

        const myData = {};
        
        const headers = { 
            'Accept' : 'application/json',
            'Authorization' : 'Bearer '+ global.auth,
        };

        axios.post(config.baseUrl+'/api/notifications/'+ guid + '/seen',myData, { headers })
        .then(response => {
            if(response.data.status_code == 200){
                dispatch(apiGetAuthActionCreator(baseUrl,global.auth));
                console.log(response.data.data.desc);
            }    
        })    
        .catch((error) => {
            navigation.navigate('Drawer');
            console.log(error);
        });
    }

    const renderItem = ({ item }) => {
        return(
        <><TouchableOpacity onPress={()=>seenAction(item.guid)}>
            <HStack p='5' style={getSeenStyle(item.is_seen)}>
                <VStack alignItems='flex-start' w='75%' flexWrap='wrap'>
                    <Text>{item.title}</Text>
                    <Text style={styles.subTitle}>Order ID : {item.order_id}</Text>
                    <Spacer size='3'/>
                    <Text>{item.title}</Text>
                    <Spacer size='5'/>
                    <Text style={styles.time}>{item.created_at}</Text>
                </VStack>       
                    <Image size="lg" source={{uri:config.imageUrl+'/'+item.image_url}} alt='image' pt='5%' pb='5%' maxW='30%'/>   
            </HStack>
        </TouchableOpacity>
        <Divider/></>
        );            
    } 
      
    const renderListEmptyComponent = () => (
        <VStack justifyContent='center' alignItems='center' alignSelf='center'>
            <Text>
                {translate('noItem')}
            </Text>
        </VStack>
    );  

    return(
        <Box w={{base: "100%", md: "25%"}} h={{base:"100%"}} backgroundColor='#fff'>
            {loading? <Box mt={5}><ActivityIndicator color='red'/></Box>
            :
            <FlatList
                data={data}
                renderItem={renderItem}
                ListEmptyComponent={renderListEmptyComponent}
                keyExtractor={item => item.guid}
            />
            }            
        </Box>
    )    
}

export default Notification;
