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
import { savedStore } from "../store/savedStore"


  // const items = []; 
  

function Saved({navigation}) {

    const [saveData,setSaveData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isDoRemove, setIsDoRemove] = useState(false);
    
  const getSaved = savedStore(state => state.getSaved);

  

    React.useEffect(() => {
        fetch(`https://sora-mart.com/api/blog/save-service-list`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: global.auth,
        },
      })
        .then((response) => response.json())
      .then((data) => {
          setSaveData(data.data)
       
          setLoading(false);
        })
        .catch((error) => console.log(error));
    }, [isDoRemove])
    
    const removeItem = (id) => {
  
          fetch(`https://sora-mart.com/api/blog/remove-service/${id}`, {
            method: "DELETE", 
            headers: {
              'Content-Type': 'application/json',
              Authorization: global.auth,
            },
          })
            .then((response) => response.json())
          .then((data) => {
            if (data.status == 200) {
              
            console.log(id)
              setIsDoRemove(!isDoRemove);
              console.log('removed');
             }
            
           
            })
            .catch((error) => console.log(error));
       
       
      };

    const renderListEmptyComponent = () => (
        <View style={styles.noNotification}>
            <Text style={{textAlign:'center',textAlignVertical:'center'}} >
                {translate('noItem')}
            </Text>
        </View>
    ); 


  const renderItem = ({ item }) => (
      
        <Box px={5}>
            <VStack>
                <HStack justifyContent='space-between' alignItems="center" mb="2">
                    <Box style={{fontFamily:'Inter_500Medium', width:'60%'}}>
        <Text style={{fontFamily:'Inter_700Bold', fontSize:16}}>{item.service.name}{item.service.guid}</Text> 
              <Text style={{ fontFamily: 'Inter_500Medium', color: '#a3a3a3' }} mb="2">{item.service.company.name}</Text>
              {
                item.service.description && item.service.description.length > 50 ? 
                  <HTMLView style={{ fontFamily: 'Inter_500Medium' }} value={item.service.description.slice(0, 50) + '...'} />
                  :
                  <HTMLView style={{fontFamily:'Inter_500Medium'}} value={item.service.description} />
              }
                       
                    </Box>
            {/*<Image alt="company logo" source={{uri:config.imageUrl + '/' + item.company.logo_url}}  style={styles.logo} width="100" height="100"/>*/}
             <Image alt="company logo" source={{uri:'https://1.bp.blogspot.com/-hG85Di3-8Co/WCqdqTdvxuI/AAAAAAAA_lE/HFKBj1184Gc2c50Yc35KkNItdaprTWcaACLcB/s180-c/businesscard.png'}}  style={styles.logo} width="100" height="100"/>
                </HStack>
                <HStack justifyContent='space-between' alignItems="center" mt="3">
                    <Box color='grey' style={{fontFamily:'Inter_500Medium'}}></Box>
                    <TouchableOpacity onPress={()=>removeItem(item.service.guid)}>
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
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={item => item.guid}
            />
            
          
                )
            }
        </SafeAreaView>      
    )
}

export default Saved;
