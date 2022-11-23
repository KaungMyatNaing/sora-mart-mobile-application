import { VStack,Text, HStack,Image, Center, View } from "native-base";
import { TextInput } from "react-native-gesture-handler";
import { ImageBackground, ScrollView } from "react-native";
import { styles } from "../../assets/css/layouts/aboutStyle";
import { useIsFocused } from '@react-navigation/native' // for re-render
const title = 'WHAT IS SORA MYANMAR?';
const paragraph = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eget convallis nibh, eu facilisis sem. Suspendisse molestie ligula massa, nec condimentum purus bibendum id. Integer in efficitur massa, pharetra porttitor augue. Mauris ultrices orci ut purus auctor euismod.';

const Item = ({title,paragraph}) => {
    return (
        <>
            <Text style={styles.abTitle} p='5' m='5' pl='0' mt='20%'>{title}</Text>
            <Text style={styles.abParagraph} mt='5%' ml='5' mb='20%'>{paragraph}</Text>
        </>
    );
}

const QtyItem = ({img,subTitle,qty}) => {
    return(
        <VStack justifyContent='center' alignItems='flex-start'>
            <Text p='5' style={styles.qtyIonLbl}><Image style={styles.qtyIcons} source={require('../../assets/image/QtyProductIcon.png')} alt='image'/> {subTitle}</Text>
            <Text style={styles.aboutUsQty}>{qty}</Text>
            <Image source={require('../../assets/image/QtySymbolIcon.png')} alt='image' m='5' mt='0'/>
        </VStack>
    );
}

const VisitItem = () => {
    return(
        <View justifyContent='flex-end' alignItems='center' mb='10%' >
            <Text m='10%' style={styles.visitTxt}>Why should you choose us?</Text>
            <Image size='sm' source={require('../../assets/image/visitLogo.png')}  alt='visitus'/>
        </View>
    );
}

const SearchItem = () => {
    return(
        <View style={styles.mainSearch}> 
            <HStack justifyContent='space-evenly' alignItems='center'>
                <Text>A<Text style={styles.A}>A</Text></Text>
                <Text style={styles.SoraMM}><Image style={styles.searchIcons} source={require('../../assets/image/lock.png')} alt='search' />soramm.com</Text>
                <Image style={styles.searchIcons} source={require('../../assets/image/reloadIcon.png')} alt='search'></Image>
            </HStack>
        </View>

    );
}
const photo = { uri: "http://pngimg.com/uploads/alarm_clock/alarm_clock_PNG93.png" };
function AboutUs() {    
    return(
        
      <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor:'100%'}}>
        <VStack w='100%' justifyContent='center'>           
            <View style={styles.background}>
                <Item style={styles.abItem} title={title} paragraph={paragraph} mb='10%'/>
                <HStack justifyContent='space-between'>
                    <QtyItem img='../../assets/image/QtyProductIcon.png' subTitle='Products' qty='7,500+'/>
                    <QtyItem img='../../assets/image/QtyProductIcon.png' subTitle='Active Users' qty='6,50+'/>
                </HStack>              
            </View>
            <Center>
                <VisitItem style={styles.visitItem}/>                
            </Center>
        </VStack>
        </ScrollView>
    );
}

export {AboutUs};