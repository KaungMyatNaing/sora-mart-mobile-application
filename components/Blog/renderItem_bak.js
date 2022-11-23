import {Text,Box,VStack,Image,HStack} from 'native-base'
import {styles} from '../../assets/css/blog/blogStyle'
import SaveAndFav from './saveAndFav';
import config from '../../config/config';
import HTMLView from 'react-native-htmlview';

function RenderItem ({services_data}) {

  return(
    <Box mb='5%'>
    <VStack ml={5} mr={5} mb={3}>
      <Text pb={2} style={{fontFamily:'Inter_400Regular',fontSize:11,color:'#A1A1A1'}}>{services_data.created_at}</Text>
      <HStack justifyContent='space-between' alignItems='flex-start' >
        <VStack>
          <Text style={{fontFamily:'Inter_600SemiBold',fontSize:18}}>{services_data.name}</Text>
          {
            services_data.company.length > 0 &&
              <Text style={{fontFamily:'Inter_400Regular',fontSize:13}}>{services_data.company[0].name}</Text>
          }
        </VStack>
        <SaveAndFav jobData={services_data.save_job} favData={services_data.favourite_service} favCount={services_data.favCount} id={services_data.guid} type={services_data.type} company_id = {services_data.company_id}/>
      </HStack>
      {services_data.salary && <Text pt={3} style={{fontFamily:'Inter_400Regular',fontSize:12,color:'#A1A1A1'}}>Salary-{services_data.salary}</Text>}
      {services_data.price && <Text pt={3} style={{fontFamily:'Inter_400Regular',fontSize:12,color:'#A1A1A1'}}>Price-{services_data.price}</Text>}      
      {/* <Text style={{fontFamily:'Inter_400Regular',fontSize:12,color:'#A1A1A1'}}>{item.description}</Text>      */}
      
      {services_data.description && <HTMLView value={ services_data && services_data.description.substring(0,50)+' ........'}/>}
     
    </VStack>
    {/* <TouchableOpacity> */}
    <Box justifyContent='center' alignContent='center'> 
     <Image resizeMode="cover" style={styles.imgStyle} source={{uri:config.imageUrl +'/'+ services_data.logo_url}} alt="job-img"/>
    </Box>
    {/* </TouchableOpacity> */}
   </Box>
  );
}

export default RenderItem