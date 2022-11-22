import {VStack,Image,Text, HStack} from 'native-base'
import styles from '../../assets/css/profile/profileStyle'
import { useIsFocused } from '@react-navigation/native' // for re-render

function StatusTracker({lbl}){
    return (
        <VStack justifyContent='flex-start'>
            <HStack justifyContent='center' alignItems='center'>
                <Image style={{width:20,height:20,margin:5}} resizeMode='contain' source={require('../../assets/image/png_icons/completeStatus3x.png')} alt='cart'/>
                
                <Image resizeMode='contain' source={require('../../assets/image/png_icons/completeStatusLine3x.png')} style={{width:35}}/>
            </HStack>
            <Text style={{textAlign:'left',width:75,color:'#EC1C24'}}>{lbl}</Text>                
        </VStack>
    )
}

function InCompleteStatusTracker({lbl}){
    return (
        <VStack justifyContent='flex-start'>
            <HStack justifyContent='center' alignItems='center'>
                <Image style={{width:20,height:20,margin:5}} resizeMode='contain' source={require('../../assets/image/png_icons/inCompleteStatus3x.png')} alt='cart'/>
                
                <Image alt="line" resizeMode='contain' source={require('../../assets/image/png_icons/completeStatusLine3x.png')} style={{width:35}}/>
            </HStack>
            <Text style={{textAlign:'left',width:75}}>{lbl}</Text>                
        </VStack>
    )
}

function StatusTrackerWithoutLine({lbl}){
    return (
        <VStack justifyContent='flex-start'>
            <HStack justifyContent='flex-start' alignItems='center'>
            <Image style={{width:20,height:20,margin:5}} resizeMode='contain' source={require('../../assets/image/png_icons/completeStatus3x.png')} alt='status tracker'/>
            </HStack>
            <Text style={{textAlign:'left',width:75,color:'#EC1C24'}}>{lbl}</Text>                
        </VStack>
    )
}

function InCompleteStatusTrackerWithoutLine({lbl}){
    return (
        <VStack justifyContent='flex-start'>
            <HStack justifyContent='flex-start' alignItems='center'>
                <Image alt="status tracker" style={{width:20,height:20,margin:5}} resizeMode='contain' source={require('../../assets/image/png_icons/inCompleteStatus3x.png')}/>
            </HStack>
            <Text style={{textAlign:'left',width:75}}>{lbl}</Text>                
        </VStack>
    )
}
export {StatusTracker,InCompleteStatusTracker,StatusTrackerWithoutLine,InCompleteStatusTrackerWithoutLine};