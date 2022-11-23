import React,{ useEffect, useState} from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
    Box,
    FlatList,
    HStack,
    VStack,
    Text,
    Divider,
    Image,
    Spacer,
    CloseIcon,
} from 'native-base';
import { styles } from '../../assets/css/ecommerce/favouriteStyle';
import { TouchableOpacity, View } from 'react-native';
import AppLoading from 'expo-app-loading';
import config from '../../config/config'; 
import { useIsFocused } from '@react-navigation/native' // for re-render
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
import ToastHelper from '../Helper/toast';
import { ActivityIndicator } from 'react-native-paper';
import {apiGetAuthActionCreator} from '../../backend/ApiActionCreator';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import { translate } from 'react-native-translate';

  
    

function WishList({navigation}) {

    const dispatch = useDispatch();
    const data  = useSelector((state) => state.apiReducer.data);
    const loading = useSelector((state) => state.apiReducer.loading);
    const baseUrl = config.baseUrl + '/api/wish-lists';   
    const [isDoRemove, setIsDoRemove] = useState(false);

    const isFocused = useIsFocused() // for re-render
    useEffect(() => {      
        if(global.auth == '' || global.auth == null){
            global.forceLoginMsg = config.forceLoginMsg;
            navigation.navigate('Sign In');
        }else{
            dispatch(apiGetAuthActionCreator(baseUrl,global.auth));

            setIsDoRemove(false);

            // axios.get(baseUrl, { headers })
            // .then(response => {        
            //     console.log(response); 
            //     setData(response.data.data);
            //     setLoading(false);
            // })    
            // .catch((error) => {
            //     console.log(response); 
            //     setLoading(false);
            //     alert(error);
            // });
        }
    }, [isDoRemove]);


    const renderListEmptyComponent = () => (
        <View style={styles.noNotification}>
            <Text style={{textAlign:'center'}}>
                {translate('noItem')}
            </Text>
        </View>
    ); 

    const removeItem = ({item}) => {
        
        // alert(item.wish_list_product.id);
        const removeUrl = config.baseUrl + '/api/wish-lists/remove/' + item.wish_list_product.id;
        const headers = { 
            'Accept': 'application/json', 
            'Authorization' : 'Bearer '+ global.auth,
        }
        axios.get(removeUrl,{ headers })
            .then(response => {
                setIsDoRemove(true);
                console.log(response.data.data.desc);
            })    
            .catch((error) => {
            console.log(error);
            }); 
    }

    const renderItem = ({ item }) => (
        <Box mb="5" justifyContent='center'>
            <VStack>                            
                <HStack justifyContent="space-between" ml={5} mr={5}>
                    <Image w={95} h={130} source={{uri:config.imageUrl+'/'+item.wish_list_product.product_pictures[0].image_url}} alt='wish list product image' pt='5%' pb='5%' maxW='30%' mr={5} resizeMode='contain'/>                                       
                    <VStack w='40%' justifyContent='space-between' alignItem='flex-start'>
                        <Text _dark={{color: "warmGray.50"}} color="coolGray.800" style={{fontFamily:'Inter_500Medium'}} >
                            {item.wish_list_product.name}
                        </Text>
                        <Text color="coolGray.600" _dark={{color: "warmGray.200"}}>
                            #{item.wish_list_product.id}
                        </Text>                                                
                        {/* <Text style={[{fontFamily:'Inter_600SemiBold'},styles.getPoints]} px="2"  _dark={{ color: "warmGray.50"}} color="coolGray.800" alignSelf="flex-start">
                            100 Points
                        </Text> */}
                        <Spacer size='5'/>
                        <HStack>
                            <Text style={{fontFamily:'Inter_700Bold'}} fontWeight='bold' mr='1' fontSize="md" _dark={{ color: "warmGray.50"}} color="coolGray.800" alignSelf="flex-start">
                                MMK
                            </Text>
                            <Text style={{fontFamily:'Inter_700Bold'}} fontWeight='bold' fontSize="md" _dark={{ color: "warmGray.50"}} color="coolGray.800" alignSelf="flex-start">
                                {item.wish_list_product.price}
                            </Text>
                        </HStack>
                    </VStack>
                    <Spacer />
                    <VStack justifyContent='space-between' maxW='20%' alignItems='flex-end'>
                        <TouchableOpacity style={styles.closeIcon} onPress={()=>removeItem({item})}>
                            <CloseIcon  size="3" />
                        </TouchableOpacity>
                        {/* <View  style={styles.itemCount}>
                        <HStack justifyContent='space-evenly' alignContent='center'> 
                            <TouchableOpacity onPress={()=>plusAction()}>
                                <Text textAlign='center' fontSize='16'>+</Text>
                            </TouchableOpacity>
                            <Text textAlign='center' style={{fontSize:12,fontFamily:'Inter_600SemiBold'}}>{quantity}</Text>
                            <TouchableOpacity onPress={()=>minusAction()}>
                                <Text textAlign='center' fontSize='16' fontWeight='bold'>-</Text>
                            </TouchableOpacity>                                                    
                        </HStack>
                        </View> */}
                    </VStack>                    
                </HStack>                            
            </VStack>
            <Divider my='2'/>
        </Box>   
    );
    
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
        <SafeAreaView style={{backgroundColor:'#FFF'}}>
            {loading? <ActivityIndicator color='red'/>
            :
            <Box w={{base: "100%", md: "25%"}} h={{base:"100%"}}>                
                <VStack h={{base: "100%"}}>
                    <HStack>
                        <FlatList
                            data={data}
                            renderItem={renderItem}
                            ListEmptyComponent={renderListEmptyComponent}
                            keyExtractor={item => item.id}
                        />
                    </HStack>                                 
                </VStack>
            </Box>
            }
             {/* <Toast /> */}
        </SafeAreaView>        
    )
}

export default WishList;
