import {Image} from 'native-base';
import {TouchableOpacity} from 'react-native';
import { useIsFocused } from '@react-navigation/native' // for re-render
import { useNavigation } from '@react-navigation/native';
function DrawerBackBtn() {
    const navigation = useNavigation();
    return (
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image                
                source = {require('../../assets/image/png_icons/ArrowLeftBold3x.png')}
                style = {{height:25,width:25,marginLeft:10}}
            />
        </TouchableOpacity>
    );
}

export default DrawerBackBtn;