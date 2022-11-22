import React,{useState,useEffect} from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Box,FlatList,HStack,VStack,Text,Button,Divider,Image} from 'native-base';
import { styles } from '../../assets/css/ecommerce/favouriteStyle';
import { View } from 'react-native';
import { useIsFocused } from '@react-navigation/native' // for re-render
import config from '../../config/config';
import axios from 'axios';
// import { 
//     useFonts,
//     Inter_100Thin,
//     Inter_200ExtraLight,
//     Inter_300Light,
//     Inter_400Regular,
//     Inter_500Medium,
//     Inter_600SemiBold,
//     Inter_700Bold,
//     Inter_800ExtraBold,
//     Inter_900Black, } from '@expo-google-fonts/inter';
import { ActivityIndicator } from 'react-native-paper';  
import HTMLView from 'react-native-htmlview';
import { translate } from 'react-native-translate';

function MySubscription({navigation}) {

    const [data,setData] = useState(null);

    const [loading,setLoading] = useState(true);

    const isFocused = useIsFocused() // for re-render

    useEffect(async () => {
        getSubscriptions();
    }, [isFocused]);

    const getSubscriptions = () => {
        if(global.auth == null || global.auth == '' ){
            global.forceLoginMsg = config.forceLoginMsg;
            navigation.replace('Sign In');
        }else{
            const baseUrl = config.baseUrl + '/api/wifi-subscription/list';
            const headers = { 
                'Accept': 'application/json', 
                'Authorization' : 'Bearer '+ global.auth,  
            }
            axios.get(baseUrl,{headers})
                .then(response => {   
                    setData(response.data.data);
                    setLoading(false);
                })    
                .catch((error) => {
                    console.log(error);
                    setLoading(false);
                });
        }
    }   

    const renderListEmptyComponent = () => (
        <View justifyContent='center' alignItems='center'>
            <Text>
                {translate('noItem')}
            </Text>
        </View>
    ); 

    const renderItem = ({ item }) => (
        <Box>
            <VStack w="100%" px="4" py="2">
                <HStack justifyContent='space-between' alignItems="center">
                <Text style={{fontFamily:'Inter_700Bold'}}>{item.service &&item.service.company[0].name}</Text>
                <View style={styles.activeInfo}><Text style={styles.activeTxt}>i</Text></View>
                {/* <Image source={require('../../assets/image/png_icons/ActiveInfo.png')} style={styles.logo} w={6} h={6}/> */}
                </HStack>
                <Text color="#A0A0A0" style={{fontFamily:'Inter_500Medium'}}>{item.service && item.service.name}</Text>
                <HTMLView color="#A0A0A0" style={{fontFamily:'Inter_500Medium'}} value={item.service && item.service.description}/>
                {/* <Text color="#A0A0A0" style={{fontFamily:'Inter_500Medium'}}>{item.service && item.service.company[0].description}</Text> */}
                <HStack justifyContent='space-between' alignItems="center" mt="3">
                    <Text style={{fontFamily:'Inter_500Medium'}}>MMK {item.service && item.service.price} /m</Text>
                    <HStack justifyContent='space-between' alignItems="center">
                        <Button style={{backgroundColor: 'transparent'}}><Text p={1} pl={4} pr={4} style={{fontFamily:'Inter_600SemiBold', borderWidth:1, borderColor:'#EC1C24' ,borderRadius:50, color:"#EC1C24",fontSize:10}} >Unscribe</Text></Button>
                        <Button style={{backgroundColor: 'transparent'}}><Text p={1} pl={4} pr={4} style={{fontFamily:'Inter_600SemiBold', borderColor:'#EC1C24' ,borderRadius:50, color:"#fff", backgroundColor:'#EC1C24',fontSize:10}} >Extend</Text></Button>
                    </HStack>
                </HStack>
            </VStack>
            <Divider my='2'/>
        </Box>
    );

    return (
        <SafeAreaView style={{backgroundColor:'#FFF'}}>
            <Box w={{base: "100%", md: "25%"}}>    
                <VStack h={{base: "100%"}}>
                    {loading? <ActivityIndicator color='red' alignItems='center' height="80%"/> :
                    <HStack>
                        <FlatList
                            data={data}
                            renderItem={renderItem}
                            ListEmptyComponent={renderListEmptyComponent}
                            keyExtractor={item => item.guid}
                        />
                    </HStack>
                    }                                 
                </VStack>
            </Box>
        </SafeAreaView>        
    )
}

export default MySubscription;
