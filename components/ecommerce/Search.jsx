import React,{useCallback,useState, useEffect} from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import {
    Box,
    FlatList,
    HStack,
    VStack,
    Text,
    Divider,
    Image,
    Spacer,
    CloseIcon
} from 'native-base';
import { styles } from '../../assets/css/ecommerce/favouriteStyle';
import { TouchableOpacity, View } from 'react-native';
import AppLoading from 'expo-app-loading';
import config from '../../config/config'; 
import { useIsFocused } from '@react-navigation/native' // for re-render
import ToastHelper from '../Helper/toast';
import Toast from 'react-native-toast-message';
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
// import { useNavigation } from '@react-navigation/native';
  const renderListEmptyComponent = () => (
        <View style={styles.noNotification}>
            <Text>
                There is no item!
            </Text>
        </View>
    ); 

    const renderItem = ({ item }) => (
        <Box mb="5" justifyContent='center'>
            <VStack>                            
                <HStack justifyContent="space-between" ml={5} mr={5}>
                    <Image w={95} h={130} source={{uri:item.wish_list_product.product_pictures.image_url}} alt='wish list product image' pt='5%' pb='5%' maxW='30%' mr={5} resizeMode='contain'/>                                       
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
                        <TouchableOpacity>
                            <CloseIcon size="3" />
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
    

function Search({navigation}) {
    // const navigation = useNavigation(); 
    const [data, setData] = React.useState();
    const [qty,setQty] = React.useState(1);

    const baseUrl = config.baseUrl + '/api/recent-searchs?page=1&limit=10&orderBy=desc';
    const headers = { 
        'Accept': 'application/json', 
        'Authorization' : 'Bearer '+ global.auth,        
    }

    const isFocused = useIsFocused() // for re-render

    useEffect(() => {
      
        axios.get(baseUrl, { headers })
        .then(response => {        
            console.log(response); 
            setData(response.data.data);
            // setLoading(false);
        })    
        .catch((error) => {
            console.log(response);
            ToastHelper.toast(error, null, 'error'); 
            // alert(error);
        });
    }, [isFocused]);
    
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
            <Box w={{base: "100%", md: "25%"}}>    
                <VStack h={{base: "100%"}} px={3}>
                    <Text>Recent Searchs</Text>
                    <HStack style={{flexWrap:'wrap',  justifyContent: 'space-evenly' }}>
                        {data && data.map((data) => 
                            <TouchableOpacity onPress={() =>{navigation.navigate('Search Result', {text:data.keyword})}} key={data.guid} style={styles.recent}>
                                <Text>{data.keyword}</Text>
                            </TouchableOpacity>
                       )}
                    </HStack>                                 
                </VStack>
            </Box>
             <Toast />
        </SafeAreaView>  
    )
}

export default Search;
