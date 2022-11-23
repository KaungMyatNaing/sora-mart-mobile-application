import {Text,Image,HStack} from 'native-base'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useIsFocused } from '@react-navigation/native' // for re-render
function TextAndSideArrow({txtvalue}){
    return (
        <HStack w={40} justifyContent="flex-end" alignItems='center'>
            <Text style={{fontFamily:'Inter_400Regular',fontSize:12,color:'#A1A1A1',textAlign:'right'}}>{txtvalue}</Text>
            <TouchableOpacity>
                <Image alt="side arrow icon" source={require('../../../assets/image/png_icons/sideArrow3x.png')} w={6} h={6} />
            </TouchableOpacity>
        </HStack>
    );
}

export default TextAndSideArrow;
