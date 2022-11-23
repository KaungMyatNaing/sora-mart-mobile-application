import { HStack,Image } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native' // for re-render

function HomeHeaderIcon (){
    const navigation = useNavigation(); 
    return(
        <HStack>
            <TouchableOpacity onPress={()=>navigation.navigate('Notification')}>
            <Image alt="noti icon" source={require('../../assets/image/Home/Noti-icon.png')}
                style = {{width:24,height:24,marginRight:15,padding:3}}
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate('Favourite')}>
            <Image alt="fav icon" source={require('../../assets/image/Home/FavIcon3x.png')}
                style = {{width:24,height:24,marginRight:15,padding:3}}
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate('Search')}>
            <Image alt="search icon" source={require('../../assets/image/Home/search3X.png')}
                style = {{width:24,height:24,marginRight:15,padding:3}}
                />
            </TouchableOpacity>                  
        </HStack>
    );
}
export default HomeHeaderIcon;