import React,{ useEffect,useState} from 'react';
import { HStack, VStack,View,Text,FlatList, Spacer,Divider } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { styles } from '../../../assets/css/ecommerce/orderStyle';
import AppLoading from 'expo-app-loading';
import config from '../../../config/config'; 
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native' // for re-render
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
import { ActivityIndicator } from 'react-native-paper';
import ToastHelper from '../../Helper/toast';
import { translate } from 'react-native-translate';
// import ToastManager, { Toast } from 'toastify-react-native';


function MyOrder({navigation}) {
    
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
    
    const [order,setOrder] = useState(null);   
    const [data,setData] = useState(null); 
    const [loading,setLoading] = useState(true);
    const [userOption, setUserOption] = useState('all');
    
    const baseUrl = config.baseUrl + '/api/orders';

    const isFocused = useIsFocused() // for re-render
    useEffect(() => {  
          
        setUserOption('all');

        if(global.auth == '' || global.auth == null){
            setLoading(false);
            global.forceLoginMsg = config.forceLoginMsg;
            navigation.replace('Sign In');
        }else{
            const headers = { 
                'Accept': 'application/json', 
                'Authorization' : global.auth,        
            }
            fetch(`https://sora-mart.com/api/order-lists`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: global.auth,
        },
      })
        .then((response) => response.json())
      .then((data) => {
          const tempData = data.data;
          console.log( typeof tempData);
        setData(tempData);
        setOrder(tempData);
          setLoading(false);
          
        })  
            .catch((error) => {
                setLoading(false);
                console.log(response); 
                ToastHelper.toast(error, null, 'error');
                // alert(error);
            });
        }
    }, [isFocused]);

      if (!fontsLoaded) {
        return <AppLoading />;
      }

      function getStatusStyle(id){
          if(id == userOption){
              return styles.orderBtnOpacityActive;
          }else{
              return styles.orderBtnOpacity;
          }
      }

      function getStatusTextStyle(id){
        if(id == userOption){
            return styles.orderTextOpacityActive;
        }else{
            return styles.orderTextOpacity;
        }
    }

      function getOrder(status){        
        switch(status) {
            case 'finish':
                setOrder( data.filter(data => data.status == 'finish'));
              break;
            case 'complete':
                setOrder( data.filter(data => data.status == 'complete'));              
              break;
            case 'cancel':
                setOrder( data.filter(data => data.status == 'cancel'));
              break;
            case 'deliver':
                setOrder( data.filter(data => data.status == 'deliver'));              
                break;
                case 'packaging':
                    setOrder( data.filter(data => data.status == 'packaging'));              
                  break;
            default:
                setOrder(data);
          }
      }

      const renderItem = ({ item }) => (
        <>
        <VStack mx='3' mt='3'>
            <HStack justifyContent='space-between'>
                      {/*<Text style={{ fontFamily: 'Inter_700Bold', fontSize: 14 }}>{translate('orderId')} : <Text style={{ fontFamily: 'Inter_700Bold', fontSize: 14 }}>#{item.guid}</Text>*/}
                      <Text style={{fontFamily: 'Inter_700Bold',fontSize:14}}>{translate('orderId')} : <Text style={{fontFamily: 'Inter_700Bold',fontSize:14}}>#{item.guid}</Text>
                </Text>
                <Spacer size='1'/>
                <Text alignItems='flex-end' style={[styles.orderViewDetails, {fontFamily: 'Inter_500Medium'}]} onPress={() => navigation.navigate('Order Details',{order_id:item.guid})}>{translate('viewDetail')}</Text>
            </HStack>
                  <Text style={[styles.orderDeliveryMethod, { fontFamily: 'Inter_400Regular', fontSize: 12 }]}>
                      {item.delivery && item.delivery.name}
                  </Text>
            <Spacer size='1'/>                        
            <HStack>
                <Text style={[{fontFamily: 'Inter_400Regular'},styles.myOrderTitle]}>{translate('placeOn')} : </Text>
                <Spacer size='1'/>
                <Text  style={{fontFamily: 'Inter_400Regular',fontSize:14}}>{item.created_when}</Text>
            </HStack>
            <HStack>
                <Text  style={[{fontFamily: 'Inter_400Regular'},styles.myOrderTitle]}>{translate('category')} : </Text>
                <Spacer size='1'/>
                <Text  style={{fontFamily: 'Inter_400Regular',fontSize:14}}></Text>
            </HStack>
            <HStack>
                <Text  style={[{fontFamily: 'Inter_400Regular'},styles.myOrderTitle]}>{translate('quantity')} : </Text>
                <Spacer size='1'/>
                <Text  style={{fontFamily: 'Inter_400Regular',fontSize:14}}>{item.cart.cart_items.length}</Text>
            </HStack>
            <HStack>
                <Text  style={[{fontFamily: 'Inter_400Regular'},styles.myOrderTitle]}>{translate('total')} : </Text>
                <Spacer size='1'/>
                <Text  style={{fontFamily: 'Inter_400Regular',fontSize:14}}>{item.total_price}</Text>
            </HStack>
            <HStack>
                <Text  style={[{fontFamily: 'Inter_400Regular'},styles.myOrderTitle]}>{translate('status')} : </Text>
                <Spacer size='1'/>
                <Text style = {[{color:'#EC1C24',fontFamily: 'Inter_400Regular'}]}>{item.status}</Text>
            </HStack>
        </VStack>
        <Divider my='2' mt={5}/>
        </>
      ); 
      
    const renderListEmptyComponent = () => (
        <View style={styles.noNotification}>
            <Text>
                {translate('noItem')}
            </Text>
        </View>
    );

    const userAction = (id) => {
        setUserOption(id);
        getOrder(id);
    }

    const statusRenderItem = ({item}) => {
        return(      
          <TouchableOpacity style={getStatusStyle(item.id)} onPress={()=>userAction(item.id)} ml={5}>
            <Text style={getStatusTextStyle(item.id)}> {item.value}</Text>
        </TouchableOpacity>
        )
      }
    
    const status_array = [{id:'all',value:'All'},{id:'finish',value:'Processing'},{id:'complete',value:'Completed'},{id:'deliver',value:'Delivered'},{id:'cancel',value:'Cancelled'},{id:'packaging',value:'packaging'}]

    return (
        <>
            <View justifyContent='space-evenly' alignItems='center' pt='3' pb={5} backgroundColor='#fff'>
                
                <FlatList
                    data={status_array}
                    horizontal
                    renderItem={statusRenderItem}
                    ListEmptyComponent={renderListEmptyComponent}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => item.id}       
                />
            </View>
            {loading ? <ActivityIndicator color='red' backgroundColor='#fff' height='100%'/> : 
            <FlatList backgroundColor='#fff'
                data={order}
                renderItem={renderItem}
                ListEmptyComponent={renderListEmptyComponent}
                keyExtractor={item => item.guid}
            />
            }
             {/* <Toast /> */}
        </>
    )      
}

export default MyOrder
