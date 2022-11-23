import { HStack,Image,Divider } from "native-base";
import { useIsFocused } from '@react-navigation/native' // for re-render
function RentFormStatus({step}){
    if(step == 1){
        return(
            <HStack alignItems='center'>
                <Image alt='firsst step' w={6} h={6} source={require('../../../assets/image/Blog/HouseRent/filledStatus1.png')}/>
                <Divider w={30} mx={1}/>
                <Image alt='first step' w={6} h={6} source={require('../../../assets/image/Blog/HouseRent/status2.png')}/>
                <Divider w={30} mx={1}/>
                <Image alt='first step' w={6} h={6} source={require('../../../assets/image/Blog/HouseRent/status3.png')}/>
            </HStack>
        )
    }else if(step == 2){
        return(
            <HStack alignItems='center'>
                <Image alt='first step' w={6} h={6} source={require('../../../assets/image/Blog/HouseRent/filledStatus1.png')}/>
                <Divider w={30} mx={1}/>
                <Image alt='first step' w={6} h={6} source={require('../../../assets/image/Blog/HouseRent/filledStatus2.png')}/>
                <Divider w={30} mx={1}/>
                <Image alt='first step' w={6} h={6} source={require('../../../assets/image/Blog/HouseRent/status3.png')}/>
            </HStack>
        )
    }else if(step == 3){
        return(
            <HStack alignItems='center'>
                <Image alt='first step' w={6} h={6} source={require('../../../assets/image/Blog/HouseRent/filledStatus1.png')}/>
                <Divider w={30} mx={1}/>
                <Image alt='first step' w={6} h={6} source={require('../../../assets/image/Blog/HouseRent/filledStatus2.png')}/>
                <Divider w={30} mx={1}/>
                <Image alt='first step' w={6} h={6} source={require('../../../assets/image/Blog/HouseRent/filledStatus3.png')}/>
            </HStack>
        )
    }else{
        return(
            <HStack>
                <Image alt='first step' w={6} h={6} source={require('../../../assets/image/Blog/HouseRent/filledStatus1.png')}/>
                <Divider w={30}/>
                <Image alt='first step' w={6} h={6} source={require('../../../assets/image/Blog/HouseRent/status2.png')}/>
                <Divider w={30}/>
                <Image alt='first step' w={6} h={6} source={require('../../../assets/image/Blog/HouseRent/status3.png')}/>
            </HStack>
        )
    }      
      
}

export default RentFormStatus