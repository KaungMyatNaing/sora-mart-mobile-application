import { HStack,Image, Button } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native' // for re-render
function Toggle (){
    const navigation = useNavigation(); 
    return(
        <HStack>
            <TouchableOpacity onPress={() => navigation.openDrawer()} style={{backgroundColor:'transparent'}}>
            <Image alt="toogle" source={require('../../assets/image/Home/Sidemenu3x.png')}
                style = {{width:24,height:24,marginLeft:15,padding:3}}
                />
            </TouchableOpacity>            
        </HStack>
    );
}
export default Toggle;