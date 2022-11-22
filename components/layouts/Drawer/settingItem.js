import {HStack,Text} from 'native-base'
import TextAndSideArrow from './TextAndSideArrow';
import { useIsFocused } from '@react-navigation/native' // for re-render
function SettingItem({itemTitle,itemValue}){
    return (
        <HStack w='100%' justifyContent='space-between' h='7%' alignItems='center'>
            <Text style={{fontFamily:'Inter_500Medium',fontSize:14}}>{itemTitle}</Text>
            <TextAndSideArrow txtvalue={itemValue}/>
        </HStack>
    )
}
export default SettingItem;