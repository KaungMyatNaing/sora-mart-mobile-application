import { HStack,Image,Divider } from "native-base";
import { useIsFocused } from '@react-navigation/native' // for re-render
function HomeWifiFormStatus({step}){
    if(step == 1){
        return(
            <HStack alignItems='center'>
                <Image alt='first step' w={6} h={6} source={require('../../../assets/image/Blog/HouseRent/filledStatus1.png')}/>
                <Divider w={30} mx={1}/>
                <Image alt='first step' w={6} h={6} source={require('../../../assets/image/Blog/HouseRent/status2.png')}/>
            </HStack>
        )
    }else {
        return(
            <HStack alignItems='center'>
                <Image alt='first step' w={6} h={6} source={require('../../../assets/image/Blog/HouseRent/filledStatus1.png')}/>
                <Divider w={30}/>
                <Image alt='first step' w={6} h={6} source={require('../../../assets/image/Blog/HouseRent/filledStatus2.png')}/>
            </HStack>
        )
    }      
      
}

export default HomeWifiFormStatus