import React,{useCallback,useState, useEffect} from 'react';
import { HStack, VStack,Text,View,FlatList, Divider } from 'native-base';
import {styles} from '../../assets/css/ecommerce/pointHistoryStyle';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppLoading from 'expo-app-loading';
import config from '../../config/config'; 
import axios from 'axios';
import Moment from 'moment';
import { useIsFocused } from '@react-navigation/native' // for re-render
import ToastHelper from '../Helper/toast';
// import ToastManager, { Toast } from 'toastify-react-native';
import { 
    useFonts,
    Inter_100Thin,
    Inter_200ExtraLight,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black, } from '@expo-google-fonts/inter';
import { fontSize } from 'styled-system';
import { translate } from 'react-native-translate';

const points = [
    { 
        id: 1,
        title: "Oppo Reno6 4GB",
        orderId: "Order ID: #119977351",
        total : "MMK 150,000",
        time : "Thu, 30 Dec 2021",
        point : "+250",
        unit : "Points",
    },
    { 
        id: 2,
        title: "Oppo Reno6 4GB",
        orderId: "Order ID: #119977351",
        total : "MMK 150,000",
        time : "Thu, 30 Dec 2021",
        point : "-250",
        unit : "Points",

    },
    { 
        id: 3,
        title: "Oppo Reno6 4GB",
        orderId: "Order ID: #119977351",
        total : "MMK 150,000",
        time : "Thu, 30 Dec 2021",
        point : "+250",
        unit : "Points",

    },    
];

// const notifications = [];

const getColor = ({item}) => {
    let color;
        if (item.point_amount > 0) {
            color = 'green';
        }else{
            color = 'orange';
        }
        return color;
    };

const renderItem = ({ item }) => (
    <>
    <HStack m='5' justifyContent='space-between'>
        <VStack>
        {/* <Text style={{ fontFamily: 'Inter_700Bold',fontSize:14}}>{item.title}</Text> */}
        <Text pb="3" style={{ fontFamily: 'Inter_400Regular',fontSize:14}}>Order ID: {item.order.order_number}</Text>
                <Text style={{ fontFamily: 'Inter_600SemiBold', fontSize: 12 }}>MMK {item.order.total_price}</Text>
        </VStack>
        <VStack justifyContent='space-between'>
            <Text style={{fontFamily: 'Inter_400Regular',fontSize:10,color:'#A1A1A1'}}>{Moment(item.created_at).format('LL')}</Text>
            <Text style={{fontFamily:'Inter_800ExtraBold',color:getColor({item}), fontSize:16}}>{item.point_amount}<Text style={{fontFamily:'Inter_400Regular',fontSize:12,color:'#A1A1A1'}}> Points</Text></Text>
        </VStack>
    </HStack> 
    <Divider my='2'/>
    </>
    ); 
    
const renderListEmptyComponent = () => (
    <View style={styles.noNotification}>
        <Text>
            {translate('noItem')}
        </Text>
    </View>
);

function PointHistory(){ 

    const [data, setData] = React.useState();
    if(global.auth == '' || global.auth == null){
        global.forceLoginMsg = config.forceLoginMsg;
        navigation.replace('Sign In');
    }else{
        const headers = { 
            'Accept': 'application/json', 
            'Authorization' : 'Bearer '+ global.auth,        
        }
        const isFocused = useIsFocused() // for re-render
    
        useEffect(() => {      

            fetch(`https://sora-mart.com/api/point-histories`, {
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: global.auth,
                },
              })
                .then((response) => response.json())
              .then((data) => {
                
                setData(data.data);
                  
                })  
                    .catch((error) => {
                      
                        ToastHelper.toast(error, null, 'error');
                        // alert(error);
                    });
        }, [isFocused]);
    }  
    

    let [fontsLoaded] = useFonts({
        Inter_100Thin,
        Inter_200ExtraLight,
        Inter_300Light,
        Inter_400Regular,
        Inter_500Medium,
        Inter_600SemiBold,
        Inter_700Bold,
        Inter_800ExtraBold,
        Inter_900Black,
      });
    
      if (!fontsLoaded) {
        return <AppLoading />;
      }

    return ( 
        <SafeAreaView style={{backgroundColor:'#FFF'}} height='100%'> 
            <FlatList
                data={data}
                renderItem={renderItem}
                ListEmptyComponent={renderListEmptyComponent}
                keyExtractor={item => item.guid}
            />
             {/* <Toast /> */}
        </SafeAreaView>  
    )
      
}

export default PointHistory
