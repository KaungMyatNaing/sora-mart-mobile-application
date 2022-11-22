import React,{useCallback, useState,useEffect} from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
    Box,
    FlatList,
    Heading,
    Avatar,
    HStack,
    VStack,
    Text,
    Spacer,
    Center,
    Checkbox,
    Button,
    IconButton,
    Divider,
    Image,
    CloseIcon,
    AddIcon,
    MinusIcon
} from 'native-base';
import { styles } from '../../assets/css/ecommerce/favouriteStyle';
import { TouchableOpacity,View } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useIsFocused } from '@react-navigation/native' // for re-render
import config from '../../config/config';
import axios from 'axios';
import HTMLView from 'react-native-htmlview';
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
import { translate } from 'react-native-translate';

  // const items = []; 
  

function Saved({navigation}) {

    const [saveData,setSaveData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isDoRemove, setIsDoRemove] = useState(false);

    useEffect(() => {
        getSavedList();
    },[isDoRemove]);

    const renderListEmptyComponent = () => (
        <View style={styles.noNotification}>
            <Text style={{textAlign:'center',textAlignVertical:'center'}} >
                {translate('noItem')}
            </Text>
        </View>
    ); 

    const getSavedList = () => {

        if(global.auth == '' || global.auth == null){
            global.forceLoginMsg = config.forceLoginMsg;
            navigation.replace('Sign In');
        }else{
            const baseUrl = config.baseUrl + '/api/save-job/list';
            const headers = { 
                'Accept': 'application/json', 
                'Authorization' : 'Bearer '+ global.auth,  
            }
            axios.get(baseUrl,{headers})
                .then(response => {   
                    setSaveData(response.data.data);
                    setLoading(false);
                })    
                .catch((error) => {
                    console.log(error);
                    setLoading(false);
                });
        }

        
    }

    const removeItem = (item) => {        
        // alert(item.wish_list_product.id);
        const removeUrl = config.baseUrl + '/api/save-job/remove/' + item.service_id;
        const headers = { 
            'Accept': 'application/json', 
            'Authorization' : 'Bearer '+ global.auth,
        }
        axios.get(removeUrl,{ headers })
            .then(response => {
                setIsDoRemove(!isDoRemove);
                console.log(response.data.data.desc);
            })    
            .catch((error) => {
                console.log(error);
            }); 
    }

    const renderItem = ({ item }) => (
        <Box px={5}>
            <VStack>
                <HStack justifyContent='space-between' alignItems="center" mb="2">
                    <Box style={{fontFamily:'Inter_500Medium', width:'60%'}}>
                        <Text style={{fontFamily:'Inter_700Bold', fontSize:16}}>{item.name}{item.service_id}</Text>
                        <Text style={{fontFamily:'Inter_500Medium', color:'#a3a3a3'}} mb="2">{item.company.name}</Text>
                        <HTMLView style={{fontFamily:'Inter_500Medium'}} value={item.company.description} />
                    </Box>
                    <Image alt="company logo" source={{uri:config.imageUrl + '/' + item.company.logo_url}}  style={styles.logo} width="100" height="100"/>
                </HStack>
                <HStack justifyContent='space-between' alignItems="center" mt="3">
                    <Box color='grey' style={{fontFamily:'Inter_500Medium'}}></Box>
                    <TouchableOpacity onPress={()=>removeItem(item)}>
                        <Image alt='delete icon' source={require('../../assets/image/png_icons/deleteIcon3x.png')}  style={styles.logo} w={6} h={6}/>
                    </TouchableOpacity>
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
        <SafeAreaView style={{backgroundColor:'#FFF'}} height='100%'> 

            { loading ? (<ActivityIndicator color='red'/>) : 
                (
                    <FlatList background='#fff'
                        data={saveData}
                        renderItem={renderItem}
                        ListEmptyComponent={renderListEmptyComponent}
                        keyExtractor={item => item.guid}
                    />
                )
            }
        </SafeAreaView>      
    )
}

export default Saved;
