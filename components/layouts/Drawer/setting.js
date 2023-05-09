import React,{useState,useEffect} from "react"
import {HStack, Text,Image, VStack, Radio, Modal} from 'native-base'
import SettingItem from './settingItem'
import TextAndSideArrow from './TextAndSideArrow';
import { useIsFocused } from '@react-navigation/native' // for re-render
import { AsyncStorage } from 'react-native';
import { TouchableOpacity } from "react-native";

// import ToastHelper from "../../Helper/toast";
import ToastManager, { Toast } from 'toastify-react-native';
import { en } from "../../translation/en";
import { my } from "../../translation/my";
import { setLocalization, translate } from "react-native-translate";

function SettingComponent () {
    const [showModal, setShowModal] = useState(false);
    const [value, setValue] = useState("one");

    const [languageModal,setLanguaeModal] = useState(false);
    const [languae,setLanguae] = useState('en');

    const getData = async () => {
        try {
          const defaultCurency = await AsyncStorage.getItem("currency");
          const defaultLanguage = await AsyncStorage.getItem("language");
          if (defaultCurency !== null && defaultCurency != '' ) {
              setValue(defaultCurency);
              global.currencyvalue = defaultCurency;
          }
          if(defaultLanguage != null && defaultLanguage != ''){
            setLanguae(defaultLanguage);
          }
        } catch (error) {
          console.log(error);
        }
      }; 
      

    const languageAction = (chooseValue) => {
        setLanguae(chooseValue);
        if(chooseValue == 'my'){
            AsyncStorage.setItem('language','my');
            setLocalization(my);
        }else{
            AsyncStorage.setItem('language','en');
            setLocalization(en);
        }
    }

    const currencyAction = (chooseValue) => {
        setValue(chooseValue);
        if(chooseValue == 'two'){
            AsyncStorage.setItem('currency', 'two');
            global.currencyvalue == 'two';
        }else{
            AsyncStorage.setItem('currency', 'one');
            global.currencyvalue == 'one';
        }
    }
    
    const isFocused = useIsFocused() // for re-render

    useEffect(()=>{
        // ToastHelper.toast('error', null,'warning');
        getData();     
    }, [value, languae])

    return(
        <VStack backgroundColor='#FFF' height='100%' p={5}> 
         <ToastManager position="bottom" animationStyle="fancy" positionValue={100} duration={2000}/>
                <TouchableOpacity  w='100%' onPress={() => setLanguaeModal(true)}>
                    <HStack w='100%' justifyContent='space-between' py={3} alignItems='center' >
                        <Text style={{fontFamily:'Inter_500Medium',fontSize:14}}>{translate('language')}</Text>
                        <TextAndSideArrow txtvalue={languae == 'en' ? translate('lngEn') : translate('lngMy')}/>
                    </HStack>
                </TouchableOpacity>
                <TouchableOpacity  w='100%' onPress={() => setShowModal(true)}>
                    <HStack w='100%' justifyContent='space-between' py={3} alignItems='center' >
                        <Text style={{fontFamily:'Inter_500Medium',fontSize:14}}>{translate('currency')}</Text>
                        <TextAndSideArrow txtvalue={value == 'one'? translate('jpnCurrency') : value =='two'? translate('mmkCurrency') : ''}/>
                    </HStack>
                </TouchableOpacity>
            {/* <SettingItem itemTitle='Currency' itemValue='MMK' /> */}
            <SettingItem itemTitle={translate('changePwd')} itemValue='' />
            <HStack justifyContent='space-between' mt='3%' alignItems='center'>
                <Text style={{fontFamily:'Inter_500Medium',fontSize:14}}>{translate('recieveNoti')}</Text>
                <Image alt="toogle icon" resizeMode='contain' source={require('../../../assets/image/ShippingAndPayment/Toggle3x.png')} w={10} h={10}/>
            </HStack>
            
            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
              <Modal.Content maxWidth="400px">
                <Modal.CloseButton />
                <Modal.Header>{translate("currency")}</Modal.Header>
                <Modal.Body>
                    <Radio.Group name="myRadioGroup" colorScheme="red" accessibilityLabel="favorite number" value={value} onChange={nextValue => {
                        // setValue(nextValue);
                        // AsyncStorage.setItem( "currency", nextValue);
                        currencyAction(nextValue);
                    }}>
                        <Radio value="one" my={1}>
                            {translate('jpnCurrency')}
                        </Radio>
                        <Radio value="two" my={1}>
                            {translate('mmkCurrency')}
                        </Radio>
                        </Radio.Group>
                    </Modal.Body>                
              </Modal.Content>
            </Modal>

            <Modal isOpen={languageModal} onClose={() => setLanguaeModal(false)}>
              <Modal.Content maxWidth="400px">
                <Modal.CloseButton />
                <Modal.Header>{translate('language')}</Modal.Header>
                <Modal.Body>
                    <Radio.Group name="myRadioGroup" colorScheme="red" accessibilityLabel="language" value={languae} onChange={nextValue => {
                        languageAction(nextValue);
                    }}>
                        <Radio value="en" my={1}>
                            {translate('lngEn')}
                        </Radio>
                        <Radio value="my" my={1}>
                            {translate('lngMy')}
                        </Radio>
                        </Radio.Group>
                    </Modal.Body>                
              </Modal.Content>
            </Modal>
        </VStack>
       
    );
}
export default SettingComponent;