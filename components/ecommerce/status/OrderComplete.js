import { VStack, Image,Text, ScrollView } from "native-base";
import { OrderComponent } from "./OrderComponet";
import { styles } from '../../../assets/css/ecommerce/status/orderStatusStyle';
import { TouchableOpacity } from "react-native";
import { useIsFocused } from '@react-navigation/native' // for re-render
import { translate } from "react-native-translate";

function OrderComplete({route,navigation}){  

    const orderId = route.params.orderId;

    const data = {
        'header':'Order Completed!',    
        'txt':'Your order #'+orderId+' has been placed. You can see the status of the order at any time.'
    };
    return(
        <ScrollView style={{backgroundColor:'#FFF'}}>
            <VStack justifyContent='center' alignItems='center'>
                <Image alt="order complete" style={styles.orderImg} source={require('../../../assets/image/orderCompleted.png')} m='10%' mt='15%' />
                <OrderComponent header={data.header} txt={data.txt}/>                
                <TouchableOpacity style={styles.seeOrderInfoBtn} onPress={() => navigation.replace('Order Details',{orderId:orderId})}> 
                    <Text style={{fontFamily: 'Inter_700Bold',fontSize:16,fontWeight:'700',color:'#FFF',textAlign:'center'}}>SEE ORDER INFO</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.orderCompleteBackBtn} onPress={() => navigation.replace('Drawer')}>
                    <Text style={{fontFamily: 'Inter_700Bold',fontSize:16,fontWeight:'700',color:'#EC1C24',textAlign:'center'}}>{translate('backhome')}</Text>
                </TouchableOpacity>
            </VStack>
        </ScrollView>
    );
}

function OrderFailed({route,navigation}){

    const orderId = route.params.orderId;

    const failed_data = {
        'header':'Order Failed!',
        'txt':'Your order #'+orderId+' was Failed. You can Live Chat and report a problem.'
    };
    return(
        <ScrollView  style={{backgroundColor:'#FFF'}}>
            <VStack justifyContent='center' alignItems='center'>
                <Image alt="order failed" style={styles.orderImg} source={require('../../../assets/image/orderFailed.png')} m='10%' mt='15%' />
                <OrderComponent header={failed_data.header} txt={failed_data.txt}/>
                <TouchableOpacity style={styles.seeOrderInfoBtn} onPress={() => navigation.replace('Home')}>
                    <Text style={{fontFamily: 'Inter_700Bold',fontSize:16,fontWeight:'700',color:'#FFF',textAlign:'center'}}>{translate('backhome')}</Text>
                </TouchableOpacity>           
            </VStack>
        </ScrollView>  
    );
}

export {OrderComplete,OrderFailed}