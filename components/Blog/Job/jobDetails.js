import {ScrollView,Image,Text,HStack, VStack} from 'native-base'
import {TouchableOpacity} from 'react-native'
import {DetailsTitle, ImagePart,KeyValuePart,BodyPart,ApplyBtn} from '../detailComponents'
import config from '../../../config/config'
import React,{useState,useEffect} from 'react'
import { ActivityIndicator } from 'react-native'
import styles from '../../../assets/css/blog/Job/jobDetailsStyle'
import axios from 'axios'
import { useIsFocused } from '@react-navigation/native' // for re-render
import { savedStore } from '../../store/savedStore'
function JobDetails({ route, navigation }) {

    const { id } = route.params;
    const [savedata, setSaveData] = useState();
    const isFocused = useIsFocused() // for re-render
    const [loading, setLoading] = useState(false);
    const [saveaction, setSaveAction] = useState(false);
    const [unsaveaction, setUnSaveAction] = useState(false);
    const getSaved = savedStore(state => state.getSaved);
    const savedlist = savedStore(state => state.savedlist);
    const updateSaved = savedStore(state => state.updateSaved);
    const deleteSaved = savedStore(state => state.deleteSaved);
    
   
    useEffect(() => {
        getJobDetails(id);
    }, [isFocused,saveaction,unsaveaction]);
    useEffect(() => {
        getSaved();
      },[saveaction,unsaveaction])
    
    const getJobDetails = (id) => {
        if (global.auth !== '' && global.auth != null) {
            setLoading(true);
            fetch(`https://sora-mart.com/api/blog/services/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: global.auth,
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    setSaveData(data.data)
                    console.log(data.data)
                    setLoading(false);
                })
                .catch((error) => console.log(error));
        }
    }
    
    
        const saveJob = (service_id) => {
            if (global.auth == '' || global.auth == null) {
                global.forceLoginMsg = config.forceLoginMsg;
                navigation.replace('Sign In');
            } else {
                fetch(`https://sora-mart.com/api/blog/save-service/${service_id}`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: global.auth,
                    },
                })
                    .then((response) => response.json())
                    .then((data) => {
                        console.log(data);
                        if (data.status == 200) {
                            updateSaved(service_id);
                            setSaveAction(!saveaction);
                            console.log('Service has been added to your saved list.');
                        }
            
           
                    })
                    .catch((error) => console.log('' + error));
            }
        }
    
        const removeJob = (service_id) => {
            if (global.auth == '' || global.auth == null) {
                global.forceLoginMsg = config.forceLoginMsg;
                navigation.replace('Sign In');
            } else {
                fetch(`https://sora-mart.com/api/blog/remove-service/${service_id}`, {
                    method: "DELETE",
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: global.auth,
                    },
                })
                    .then((response) => response.json())
                    .then((data) => {
                        console.log(data);
                        if (data.status == 200) {
              
                            deleteSaved(service_id);
                            setUnSaveAction(!unsaveaction);
                            console.log('Service has been removed from your saved list.');
                        }
            
           
                    })
                    .catch((error) => console.log('' + error));
            }
      
        }
   
   
    const checkId =  savedlist.filter((i) => i == id); 
                return (                 
                        <ScrollView backgroundColor='#fff'>
                            {savedata && <DetailsTitle pdata={savedata} />}
                            {/* <ImagePart favCount='200' type={jobdata}/> */}
                        {/*<Image style={styles.mainImg} source={{uri:config.imageUrl +'/' + jobCompanyData.logo_url}} resizeMode="cover" alt='Image' mt={5}/>*/}
                         <Image style={styles.mainImg} source={{uri:'https://1.bp.blogspot.com/-hG85Di3-8Co/WCqdqTdvxuI/AAAAAAAA_lE/HFKBj1184Gc2c50Yc35KkNItdaprTWcaACLcB/s180-c/businesscard.png'}}   resizeMode="cover" alt='Image' mt={5}/>
                            <HStack justifyContent='flex-end' mr={2}>
                                <HStack justifyContent='space-evenly' alignItems='flex-start' w={20} style={styles.favAndSaveBtn}>
                                    {/*{checkId.length > 0 ?
                                        <TouchableOpacity onPress={() => removeJob(savedata.guid)} >
                                            <HStack justifyContent='center'>
                                                <Image alt='fav icon' source={require('../../../assets/image/Blog/FillheartIcon3x.png')} w={6} h={6} />
                                                <Text style={{ fontFamily: 'Inter_400Regular', fontSize: 10, color: '#A1A1A1', textAlign: 'center' }}>200</Text>
                                            </HStack>
                                        </TouchableOpacity>
                                        :
                                        <TouchableOpacity onPress={() => saveJob(savedata.guid)}>
                                            <HStack>
                                                <Image alt='fav icon' source={require('../../../assets/image/Blog/favIcon3x.png')} w={6} h={6} />
                                                <Text style={{ fontFamily: 'Inter_400Regular', fontSize: 10, color: '#A1A1A1', textAlign: 'center' }}>200</Text>
                                            </HStack>
                                        </TouchableOpacity>
                                    }*/}
                                
                                {checkId.length > 0 ?
                <TouchableOpacity onPress={() => removeJob(id)}>
                                        <Image alt='save icon' source={require('../../../assets/image/Blog/filledSaveIcon.png')} w={6} h={6} />
                                       
                </TouchableOpacity>
              :
                <TouchableOpacity onPress={() => saveJob(id)}>
                  <Image alt='save icon' source={require('../../../assets/image/Blog/saveIcon3x.png')} w={6} h={6}/> 
                </TouchableOpacity>}
                                </HStack>
                            </HStack>
                        {savedata && <KeyValuePart tkey='Salary' value={savedata.salary} />}
                        {savedata && <BodyPart txt={savedata} />}
                        {/*{savedata && <Text>{savedata.description}</Text>}*/}
                            <ApplyBtn lbl='APPLY' mtValue='30%' navigation={navigation} service_id={id} />
                        </ScrollView>
                       
                )
           
        

   
    
}
export default JobDetails