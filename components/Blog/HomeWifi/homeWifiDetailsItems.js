import {VStack,Text,HStack,Image} from 'native-base'
import styles from '../../../assets/css/blog/HomeWifi/HomeWifiStyle'
import SaveAndFav from '../saveAndFav'
import HTMLView from 'react-native-htmlview'
import WebView from 'react-native-webview'
function WifiDetailsTitle({pdata}){ 
    return(
        <VStack>
            <HStack justifyContent='space-between' alignItems='center' mt={1}>
                <HStack>
                    <Image source={require('../../../assets/image/Blog/HomeWifi/wifiSampleLogo.png')} w={6} h={6} resizeMode='contain' alt='logo'/>
                    <Text style={styles.companyName}>{pdata.companyName}</Text>
                </HStack>
                <SaveAndFav favCount={pdata.favCount}/>
            </HStack>
        </VStack>
    )
}

function WifiDescItem({desc}){
    return(
        <HStack alignItems='center' justifyContent='flex-start' p={1} pl={0} fontFamily='Inter_400Regular'>
            {/* <Image mr={3} source={require('../../../assets/image/png_icons/MyListIcon3x.png')} w={3} h={3} alt='list-icon'/> */}
            {/* <HTMLView style={styles.desc} value={desc}/> */}
            <WebView
                nestedScrollEnabled 
                source={{ uri: 'https://demo.myanmarwebc6.sg-host.com/public/blog_service/'+desc+'/app/description' }} style={{ marginTop: 20, width:'100%', height:500 }} /> 
        </HStack>
    )
}

function PriceItem({price,currency,perType}){
    return(
        <HStack justifyContent='flex-start' alignItems='center' w='50%'>
            <Text style={styles.price}>{currency}</Text>
            <Text style={styles.price}>{price}</Text>
            <Text style={styles.perType}>/{perType}</Text>
        </HStack>
    )
}

export {WifiDetailsTitle,WifiDescItem,PriceItem}