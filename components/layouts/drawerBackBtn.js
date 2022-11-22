import {Image} from 'native-base';
import {TouchableOpacity} from 'react-native';
import { useIsFocused } from '@react-navigation/native' // for re-render
function DrawerBackBtn({nav}){
    return (
        <TouchableOpacity onPress={() => nav.goBack('Drawer')}>
            <Image                
                source = {require('../../assets/image/png_icons/ArrowLeftBold3x.png')}
                style = {{height:25,width:25,marginLeft:10}}
            />
        </TouchableOpacity>
    );
}

export default DrawerBackBtn;