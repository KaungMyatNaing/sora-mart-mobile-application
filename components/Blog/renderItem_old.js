import {Text,Box,VStack,Image,HStack} from 'native-base'
import {TouchableOpacity} from 'react-native'
import {styles} from '../../assets/css/blog/blogStyle'
import SaveAndFav from './saveAndFav';
import { useIsFocused } from '@react-navigation/native' // for re-render
function RenderItem ({item}) {
    if(item.type == 'job'){
      return(
        <Box mb='5%'>
        <VStack ml={5} mr={5} mb={3}>
          <Text pb={2} style={{fontFamily:'Inter_400Regular',fontSize:11,color:'#A1A1A1'}}>{item.longTime}</Text>
          <HStack justifyContent='space-between' alignItems='flex-start' >
            <VStack>
              <Text style={{fontFamily:'Inter_600SemiBold',fontSize:18}}>{item.title}</Text>
              <Text style={{fontFamily:'Inter_400Regular',fontSize:13}}>{item.subTitle}</Text>
            </VStack>
            <SaveAndFav favCount={item.favCount}/>
          </HStack>
          <Text pt={3} style={{fontFamily:'Inter_400Regular',fontSize:12,color:'#A1A1A1'}}>{item.itemTitle}-{item.itemValue}</Text>
          <Text style={{fontFamily:'Inter_400Regular',fontSize:12,color:'#A1A1A1'}}>{item.desc}</Text>     
        </VStack>
        <TouchableOpacity onPress={()=>goFunction({item})}>
        <Box justifyContent='center' w={400} h={160} alignContent='center' mt={8} ml={-8}> 
         <Image resizeMode="contain" style={styles.backImg} source={require('../../assets/image/Blog/Job/jobSampleImg.png')} alt="job-img"/>
        </Box>
        </TouchableOpacity>
       </Box>
      );
    }else if(item.type == 'rent'){
      return(
        <Box mb='15%'>
        <VStack ml={5} mr={5} mb={3}>
          <Text pb={2} style={{fontFamily:'Inter_400Regular',fontSize:11,color:'#A1A1A1'}}>{item.longTime}</Text>
          <HStack justifyContent='space-between' alignItems='flex-start' >
            <VStack>
              <Text style={{fontFamily:'Inter_600SemiBold',fontSize:18}}>{item.title}</Text>
              <Text style={{fontFamily:'Inter_400Regular',fontSize:13}}>{item.subTitle}</Text>
            </VStack>
            <SaveAndFav favCount={item.favCount}/>
          </HStack>
          <Text pt={3} style={{fontFamily:'Inter_400Regular',fontSize:12,color:'#A1A1A1'}}>{item.itemTitle}-{item.itemValue}</Text>
          <Text style={{fontFamily:'Inter_400Regular',fontSize:12,color:'#A1A1A1'}}>{item.desc}</Text>     
        </VStack>
        <TouchableOpacity onPress={()=>goFunction({item})}>
        <Box justifyContent='center' w={400} h={160} alignContent='center' mt={8}> 
         <Image alt="houserent-img" resizeMode="contain" style={styles.backImg} source={require('../../assets/image/Blog/HouseRent/houseRentSampleImg.png')}/>
        </Box>
        </TouchableOpacity>
       </Box>
      );
    }else if(item.type == 'wifi'){
      return(
        <Box mb={20}>
        <VStack ml={5} mr={5} mb={3}>
          <Text pb={2} style={{fontFamily:'Inter_400Regular',fontSize:11,color:'#A1A1A1'}}>{item.longTime}</Text>
          <HStack justifyContent='space-between' alignItems='flex-start' >
            <VStack>
              <Text style={{fontFamily:'Inter_600SemiBold',fontSize:18}}>{item.title}</Text>
              <Text style={{fontFamily:'Inter_400Regular',fontSize:13}}>{item.subTitle}</Text>
            </VStack>
            <SaveAndFav favCount={item.favCount}/>
          </HStack>
          <Text pt={3} style={{fontFamily:'Inter_400Regular',fontSize:12,color:'#A1A1A1'}}>{item.itemTitle}-{item.itemValue}</Text>
          <Text style={{fontFamily:'Inter_400Regular',fontSize:12,color:'#A1A1A1'}}>{item.desc}</Text>     
        </VStack>
        <TouchableOpacity onPress={()=>goFunction({item})}>
        <Box justifyContent='center' w={400} h={160} alignContent='center' mt={8}> 
         <Image resizeMode="contain" style={styles.backImg} source={require('../../assets/image/Blog/HomeWifi/wifiSampleImg.png')} alt="wifi-img"/>
        </Box>
        </TouchableOpacity>
       </Box>
      );
    }
  }

  export default RenderItem