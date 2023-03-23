import {TouchableOpacity,Image} from 'react-native'
import {Text, VStack,HStack} from 'native-base'
import React, { useEffect, useState } from 'react'
import * as ImagePicker from 'expo-image-picker';
import {styles} from '../../assets/css/blog/HouseRent/HouseRentStyle'
import * as FileSystem from 'expo-file-system';
import { useIsFocused } from '@react-navigation/native' // for re-render
import { translate } from 'react-native-translate';

function DefaultFrontImgs({image,setImage}){
    
// const [image,setImage] = useState(null);

const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      const base64_data = await FileSystem.readAsStringAsync(result.uri, { encoding: 'base64' });
      // var base64Icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAwBQTFRF7c5J78kt+/Xm78lQ6stH5LI36bQh6rcf7sQp671G89ZZ8c9V8c5U9+u27MhJ/Pjv9txf8uCx57c937Ay5L1n58Nb67si8tVZ5sA68tJX/Pfr7dF58tBG9d5e8+Gc6chN6LM+7spN1pos6rYs6L8+47hE7cNG6bQc9uFj7sMn4rc17cMx3atG8duj+O7B686H7cAl7cEm7sRM26cq/vz5/v767NFY7tJM78Yq8s8y3agt9dte6sVD/vz15bY59Nlb8txY9+y86LpA5LxL67pE7L5H05Ai2Z4m58Vz89RI7dKr+/XY8Ms68dx/6sZE7sRCzIEN0YwZ67wi6rk27L4k9NZB4rAz7L0j5rM66bMb682a5sJG6LEm3asy3q0w3q026sqC8cxJ6bYd685U5a457cIn7MBJ8tZW7c1I7c5K7cQ18Msu/v3678tQ3aMq7tNe6chu6rgg79VN8tNH8c0w57Q83akq7dBb9Nld9d5g6cdC8dyb675F/v327NB6////AAA...AA/LvB3QAAAMFJREFUeNpiqIcAbz0ogwFKm7GgCjgyZMihCLCkc0nkIAnIMVRw2UhDBGp5fcurGOyLfbhVtJwLdJkY8oscZCsFPBk5spiNaoTC4hnqk801Qi2zLQyD2NlcWWP5GepN5TOtSxg1QwrV01itpECG2kaLy3AYiCWxcRozQWyp9pNMDWePDI4QgVpbx5eo7a+mHFOqAxUQVeRhdrLjdFFQggqo5tqVeSS456UEQgWE4/RBboxyC4AKCEI9Wu9lUl8PEGAAV7NY4hyx8voAAAAASUVORK5CYII=';
      var base64Icon = 'data:image/png;base64,'+base64_data;
      setImage(base64Icon);
    }
  };

return(
    <>
        <TouchableOpacity onPress={pickImage}>
            {image ? <Image resizeMode='contain' source={{ uri: image }} style={{width:160,height:160}} alt="front img" />
            :<MyDefaultImg lbl='Add Photo(Front)'/>
            }            
        </TouchableOpacity>
        </>
    )
}


function DefaultBackImgs({image,setImage}){
    
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
        
        if (!result.cancelled) {
          const base64_data = await FileSystem.readAsStringAsync(result.uri, { encoding: 'base64' });
          // var base64Icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAwBQTFRF7c5J78kt+/Xm78lQ6stH5LI36bQh6rcf7sQp671G89ZZ8c9V8c5U9+u27MhJ/Pjv9txf8uCx57c937Ay5L1n58Nb67si8tVZ5sA68tJX/Pfr7dF58tBG9d5e8+Gc6chN6LM+7spN1pos6rYs6L8+47hE7cNG6bQc9uFj7sMn4rc17cMx3atG8duj+O7B686H7cAl7cEm7sRM26cq/vz5/v767NFY7tJM78Yq8s8y3agt9dte6sVD/vz15bY59Nlb8txY9+y86LpA5LxL67pE7L5H05Ai2Z4m58Vz89RI7dKr+/XY8Ms68dx/6sZE7sRCzIEN0YwZ67wi6rk27L4k9NZB4rAz7L0j5rM66bMb682a5sJG6LEm3asy3q0w3q026sqC8cxJ6bYd685U5a457cIn7MBJ8tZW7c1I7c5K7cQ18Msu/v3678tQ3aMq7tNe6chu6rgg79VN8tNH8c0w57Q83akq7dBb9Nld9d5g6cdC8dyb675F/v327NB6////AAA...AA/LvB3QAAAMFJREFUeNpiqIcAbz0ogwFKm7GgCjgyZMihCLCkc0nkIAnIMVRw2UhDBGp5fcurGOyLfbhVtJwLdJkY8oscZCsFPBk5spiNaoTC4hnqk801Qi2zLQyD2NlcWWP5GepN5TOtSxg1QwrV01itpECG2kaLy3AYiCWxcRozQWyp9pNMDWePDI4QgVpbx5eo7a+mHFOqAxUQVeRhdrLjdFFQggqo5tqVeSS456UEQgWE4/RBboxyC4AKCEI9Wu9lUl8PEGAAV7NY4hyx8voAAAAASUVORK5CYII=';
          var base64Icon = 'data:image/png;base64,'+base64_data;
          setImage(base64Icon);
        }
      };
    
    return(
        <>
        <TouchableOpacity onPress={pickImage}>
            {image ? <Image resizeMode='contain' source={{ uri: image }} style={{width:160,height:160}} alt="back img" />            
            :<MyDefaultImg lbl='Add Photo(Back)'/>
            }            
        </TouchableOpacity>
        </>
        )
}

function MyDefaultImg({lbl}){
    return (
        <VStack style={styles.defaultImgs} w='100%' h={160} p={5} justifyContent='center' alignItems='center'>
            <Image source={require('../../assets/image/Blog/HouseRent/default_img.png')} style={{width:30,height:30}} alt='default img'/>
            <Text style={styles.defaultImgTxt}>{lbl}</Text>
        </VStack>
    )
}

function DefaultBankImgs({image,setImage}){
        
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [100, 40],
          quality: 1,
        });    
    
        if (!result.cancelled) {
          const base64_data = await FileSystem.readAsStringAsync(result.uri, { encoding: 'base64' });
          // var base64Icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAwBQTFRF7c5J78kt+/Xm78lQ6stH5LI36bQh6rcf7sQp671G89ZZ8c9V8c5U9+u27MhJ/Pjv9txf8uCx57c937Ay5L1n58Nb67si8tVZ5sA68tJX/Pfr7dF58tBG9d5e8+Gc6chN6LM+7spN1pos6rYs6L8+47hE7cNG6bQc9uFj7sMn4rc17cMx3atG8duj+O7B686H7cAl7cEm7sRM26cq/vz5/v767NFY7tJM78Yq8s8y3agt9dte6sVD/vz15bY59Nlb8txY9+y86LpA5LxL67pE7L5H05Ai2Z4m58Vz89RI7dKr+/XY8Ms68dx/6sZE7sRCzIEN0YwZ67wi6rk27L4k9NZB4rAz7L0j5rM66bMb682a5sJG6LEm3asy3q0w3q026sqC8cxJ6bYd685U5a457cIn7MBJ8tZW7c1I7c5K7cQ18Msu/v3678tQ3aMq7tNe6chu6rgg79VN8tNH8c0w57Q83akq7dBb9Nld9d5g6cdC8dyb675F/v327NB6////AAA...AA/LvB3QAAAMFJREFUeNpiqIcAbz0ogwFKm7GgCjgyZMihCLCkc0nkIAnIMVRw2UhDBGp5fcurGOyLfbhVtJwLdJkY8oscZCsFPBk5spiNaoTC4hnqk801Qi2zLQyD2NlcWWP5GepN5TOtSxg1QwrV01itpECG2kaLy3AYiCWxcRozQWyp9pNMDWePDI4QgVpbx5eo7a+mHFOqAxUQVeRhdrLjdFFQggqo5tqVeSS456UEQgWE4/RBboxyC4AKCEI9Wu9lUl8PEGAAV7NY4hyx8voAAAAASUVORK5CYII=';
          var base64Icon = 'data:image/png;base64,'+base64_data;
          setImage(base64Icon);
        }
      };
    
    return(
        <>
        <TouchableOpacity onPress={pickImage}>
            {image ? <Image resizeMode='contain' source={{ uri: image }} style={{width:'100%',height:160}} alt="bank img" />
            :<MyDefaultImg lbl='Add Photo(First page)'/>
            }            
        </TouchableOpacity>
        </>
        )
}

function DefaultPassportImgs({image,setImage}){
    
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [100, 40],
          quality: 1,
        });
    
        if (!result.cancelled) {
          const base64_data = await FileSystem.readAsStringAsync(result.uri, { encoding: 'base64' });
        // var base64Icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAwBQTFRF7c5J78kt+/Xm78lQ6stH5LI36bQh6rcf7sQp671G89ZZ8c9V8c5U9+u27MhJ/Pjv9txf8uCx57c937Ay5L1n58Nb67si8tVZ5sA68tJX/Pfr7dF58tBG9d5e8+Gc6chN6LM+7spN1pos6rYs6L8+47hE7cNG6bQc9uFj7sMn4rc17cMx3atG8duj+O7B686H7cAl7cEm7sRM26cq/vz5/v767NFY7tJM78Yq8s8y3agt9dte6sVD/vz15bY59Nlb8txY9+y86LpA5LxL67pE7L5H05Ai2Z4m58Vz89RI7dKr+/XY8Ms68dx/6sZE7sRCzIEN0YwZ67wi6rk27L4k9NZB4rAz7L0j5rM66bMb682a5sJG6LEm3asy3q0w3q026sqC8cxJ6bYd685U5a457cIn7MBJ8tZW7c1I7c5K7cQ18Msu/v3678tQ3aMq7tNe6chu6rgg79VN8tNH8c0w57Q83akq7dBb9Nld9d5g6cdC8dyb675F/v327NB6////AAA...AA/LvB3QAAAMFJREFUeNpiqIcAbz0ogwFKm7GgCjgyZMihCLCkc0nkIAnIMVRw2UhDBGp5fcurGOyLfbhVtJwLdJkY8oscZCsFPBk5spiNaoTC4hnqk801Qi2zLQyD2NlcWWP5GepN5TOtSxg1QwrV01itpECG2kaLy3AYiCWxcRozQWyp9pNMDWePDI4QgVpbx5eo7a+mHFOqAxUQVeRhdrLjdFFQggqo5tqVeSS456UEQgWE4/RBboxyC4AKCEI9Wu9lUl8PEGAAV7NY4hyx8voAAAAASUVORK5CYII=';
          var base64Icon = 'data:image/png;base64,'+base64_data;
            setImage(base64Icon);
        }
      };
    
    return(
        <>
        <TouchableOpacity onPress={pickImage}>
            {image ? <Image resizeMode='contain' source={{ uri: image }} style={{width:'100%',height:160}} alt="passport img" />
            :<MyDefaultImg lbl='Add Photo(First page with photo)'/>
            }            
        </TouchableOpacity>
        </>
        )
}

function DefaultCertificateImgs({image,setImage}){
    
  const pickImage = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        //allowsEditing: true,
        //aspect: [100, 40],
        quality: 1,
      });
  
      if (!result.cancelled) {
        const fetchResponse = await fetch(result.uri);
        console.log('fetchResponse', fetchResponse);
        const blob = await fetchResponse.blob();
        const imageData = new File([blob], `.png`);
        setImage(prev => [...prev, imageData]);
        console.log(image.length);
      }
    };
  
  return(
      <>
      <TouchableOpacity onPress={pickImage}>
          {image ? <Image resizeMode='contain' style={{width:'100%',height:160}} alt="certificate img" />
          :<MyDefaultImg lbl='Upload Certificate'/>
          }            
      </TouchableOpacity>
      </>
      )
}

function ResidenceImg({fImg,bImg,setFImg,setBImg}){
    return(
        <VStack mt={5}>
            <Text style={styles.imgTitle} pb={5}>{translate('residenceCard')}</Text>
            <HStack justifyContent='space-between' alignItems='center'>
                <DefaultFrontImgs image={fImg} setImage={setFImg}/>
                <DefaultBackImgs image={bImg} setImage={setBImg}/>
            </HStack>
        </VStack>
    )
}

function PassportImg({image,setImage}){
    return(
        <VStack mt={5} ml={0}>
            <Text style={styles.imgTitle} pb={5}>{translate('passport')}</Text>
            <DefaultPassportImgs image={image} setImage={setImage}/>                    
        </VStack>
    )
}

function CertificateImg({image,setImage}){
  return(
      <VStack mt={5} ml={0}>
          <Text style={styles.certificateTitle} pb={5}>{translate('certification')}</Text>
          <DefaultCertificateImgs image={image} setImage={setImage}/>                    
      </VStack>
  )
}

function BankImage({image,setImage}){
    return(
        <VStack mt={5} mb={16}>
            <Text style={styles.imgTitle} pb={5}>{translate('bankBook')}</Text>
            <DefaultBankImgs image={image} setImage={setImage}/>
        </VStack>
    )
}

export {DefaultBankImgs,DefaultPassportImgs,DefaultFrontImgs,DefaultBackImgs,ResidenceImg,PassportImg,BankImage,MyDefaultImg,CertificateImg} 