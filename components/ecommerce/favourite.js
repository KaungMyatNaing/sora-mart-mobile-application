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
import { useIsFocused } from '@react-navigation/native' // for re-render
import { translate } from 'react-native-translate';
const getWishlist = wishlistStore(state => state.getWishlist);
const wishlist = wishlistStore(state => state.wishlist);
React.useEffect(getWishlist(),[])
const data = [
    { 
        id: "1",
        name: "Apple Multi-Touch Magic Mouse",
        codeNo: "#647957",
        point: "100 Points",
        price: "320,000",
        currency: "MMK",
        avatarUrl: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    },
    {   
        id: "2",
        name: "Apple Watch",
        codeNo: "#647957",
        point: "100 Points",
        price: "900,000",
        currency: "MMK",
        avatarUrl: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      },
      {   
        id: "3",
        name: "Apple Smart Watch",
        codeNo: "#647957",
        point: "300 Points",
        price: "140,000",
        currency: "MMK",
        avatarUrl: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      },
  ]
  // const items = []; 
  const renderListEmptyComponent = () => (
        <View style={styles.noNotification}>
            <Text>
                {translate('noItem')}
            </Text>
        </View>
    ); 

//    const renderItem = ({ item }) => (
//        <Box borderBottomWidth="1" _dark={{ borderColor: "gray.600"}} borderColor="coolGray.200" pl="4" pr="5" py="2">
//            <VStack>                            
//                <HStack space={3} justifyContent="space-between">
//                    <Image size="70" source={{uri: item.avatarUrl}} alt='image' pt='5%' pb='5%' maxW='30%'/>                                       
//                    <VStack maxW='50%' justifyContent='space-between' alignItem='flex-start'>
//                        <Text _dark={{color: "warmGray.50"}} color="coolGray.800" bold >
//                            {item.name}
//                        </Text>
//                        <Text color="coolGray.600" _dark={{color: "warmGray.200"}}>
//                        {item.codeNo}
//                        </Text>                                                
//                        <Text style={styles.getPoints} _dark={{ color: "warmGray.50"}} color="coolGray.800" alignSelf="flex-start">
//                            {item.point}
//                        </Text>
//                        <Spacer size='5'/>
//                        <HStack>
//                            <Text fontWeight='bold' mr='1' fontSize="md" _dark={{ color: "warmGray.50"}} color="coolGray.800" alignSelf="flex-start">
//                                {item.currency}
//                            </Text>
//                            <Text fontWeight='bold' fontSize="md" _dark={{ color: "warmGray.50"}} color="coolGray.800" alignSelf="flex-start">
//                                {item.price}
//                            </Text>
//                        </HStack>
//                    </VStack>
//                    <Spacer />
//                    <VStack justifyContent='space-between' maxW='20%' alignItems='flex-end'>
//                        <TouchableOpacity>
//                            <CloseIcon size="3" />
//                        </TouchableOpacity>
//                        <View  style={styles.itemCount}>
//                        <HStack justifyContent='space-evenly' alignContent='center'> 
//                            <TouchableOpacity>
//                                <Text textAlign='center' fontSize='16'>+</Text>
//                            </TouchableOpacity>
//                            <Text textAlign='center' fontSize='16'>1</Text>
//                            <TouchableOpacity>
//                                <Text textAlign='center' fontSize='16' fontWeight='bold'>-</Text>
//                            </TouchableOpacity>                                                    
//                        </HStack>
//                        </View>
//                    </VStack>                    
//                </HStack>                            
//            </VStack>
//        </Box>   
//);
    

const renderItem = ({ item }) => (
    <Text>{item.guid}</Text> 
);


function Favourite() {

    const [checked, setChecked] = React.useState(false);
    const [qty,setQty] = React.useState(1);
    const checkViews = useCallback(() => {
        setChecked(() => !checked);
    }, []);

    const isFocused = useIsFocused() // for re-render
    useEffect(() => {
        checkViews();
    }, [checkViews, isFocused]);

    
    const qtyViews = useCallback(() => {
        setQty((q) => q + 1);
    }, []);

    useEffect(() => {
        qtyViews();
    }, [qtyViews, isFocused]);
    
    return (
        <SafeAreaView>
            <Box w={{base: "100%", md: "25%"}} m={2}>    
                <VStack h={{base: "100%"}}>
                    <HStack minH='50%'>
                        <FlatList
                            data={wishlist}
                            renderItem={renderItem}
                            ListEmptyComponent={renderListEmptyComponent}
                            keyExtractor={item => item.guid}
                        />
                    </HStack>                                 
                </VStack>
            </Box>
        </SafeAreaView>        
    )
}

export default Favourite;
