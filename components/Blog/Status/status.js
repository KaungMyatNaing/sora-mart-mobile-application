import {HStack, Image,Text,VStack} from 'native-base'
import {TouchableOpacity,ScrollView} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import {styles} from '../../../assets/css/blog/HouseRent/HouseRentStyle'
import { useIsFocused } from '@react-navigation/native' // for re-render
import { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native-paper';
import config from '../../../config/config';
import axios from 'axios';
const OrderComponent = ({header,txt}) => {
    return(
        <>
            <Text style={styles.header} mt='10%' mb='3%' p='3'>{header}</Text>
            <Text style={styles.orderTxt} mb='10%'>{txt}</Text>
        </>           
        
    );
}

const CompletedItem = ({txt,header,navigation}) => {
    return(
        <>
            <VStack h='20%' alignItems='flex-end' justifyContent='flex-start'> 
                <TouchableOpacity onPress={()=>navigation.navigate('Other Services')}>
                    <Image style={styles.img} alt="status" source={require('../../../assets/image/png_icons/closeIcon3x.png')} m={5} w={6} h={6} resizeMode='contain' />
                </TouchableOpacity>
            </VStack>
            <VStack justifyContent='center' alignItems='center' h='40%'>            
                <Image style={styles.img} alt="status" source={require('../../../assets/image/png_icons/successIcon3x.png')} w={150} h={150} resizeMode='contain' />
                <OrderComponent header={header} txt={txt}/>                           
            </VStack>
        </>
    )
}

function CompletedStatus({navigation}){

    return(
        <ScrollView>                  
            <CompletedItem txt='Mr.John will follow up and contact you.' header='Successfully Submitted!' navigation={navigation}/>
            <VStack mt='60%' pl={5} pr={5} mb='10%'>
                <TouchableOpacity style={styles.btn} onPress={() => navigation.replace('Drawer')}>
                    <Text style={styles.btnLbl}>BACK TO HOME</Text>
                </TouchableOpacity>
            </VStack>
        </ScrollView>
    )
    
}

function FailedStatusItem({txt,header,navigation}){
    return(
        <>
            <VStack h='20%' alignItems='flex-end' justifyContent='flex-start'> 
                <TouchableOpacity onPress={()=>navigation.navigate('Other Services')}>
                    <Image alt="closed icon" style={styles.img} source={require('../../../assets/image/png_icons/closeIcon3x.png')} m={5} w={6} h={6} resizeMode='contain' />
                </TouchableOpacity>
            </VStack>
            <VStack justifyContent='center' alignItems='center' h='40%'>            
                <Image alt="failed icon" style={styles.img} source={require('../../../assets/image/png_icons/failedIcon3x.png')} w={150} h={150} resizeMode='contain' />
                <OrderComponent header={header} txt={txt}/>                           
            </VStack>
        </>
    )
}

function FailedStatus({navigation}){
    return (
        <SafeAreaView>                   
             <ScrollView>
                <FailedStatusItem txt='Your order was Failed. You can Live Chat and report a problem.' header='Order Failed!' navigation={navigation}/>
                <VStack mt='60%' pl={5} pr={5} mb='10%'>
                    <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Drawer')}>
                        <Text style={styles.btnLbl}>BACK TO HOME</Text>
                    </TouchableOpacity>
                </VStack>
             </ScrollView>
        </SafeAreaView>
    )
}

export {CompletedStatus,FailedStatus}