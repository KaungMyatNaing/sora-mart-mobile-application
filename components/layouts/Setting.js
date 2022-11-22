import React from 'react';
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
import { useIsFocused } from '@react-navigation/native' // for re-render
import AppLoading from 'expo-app-loading';
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

function Setting() {

    // const [checked, setChecked] = React.useState(false);
    // const [qty,setQty] = React.useState(1);

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
        <SafeAreaView>
            <Box m={2}>    
                <VStack h={{base: "100%"}}>
                    <HStack justifyContent="space-between" alignItems="center">
                      <Box style={{fontFamily:'Inter_500Medium', fontSize:18, color:'red'}}>Hello</Box>
                      <Box>Arrow</Box>
                    </HStack>                                 
                </VStack>
            </Box>
        </SafeAreaView>  
    )
}

export default Setting;
