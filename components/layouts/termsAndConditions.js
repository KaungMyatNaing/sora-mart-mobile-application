import { VStack,Text } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../../assets/css/layouts/termsAndConditionStyle";
import { translate } from "react-native-translate";

const Item = ({title,paragraph}) => {
    return (
        <>
            <Text style={styles.tcTitle} p='5' pl='0'>{title}</Text>
            <Text style={styles.tcParagraph}>{paragraph}</Text>
        </>
    );
}

function TermsAndConditions() {
    return(
        <SafeAreaView style={{backgroundColor:'#FFF'}} height="100%">
            <VStack ml={5} mr={5} justifyContent='flex-start'>
                <Item title={translate('title1')} paragraph={translate('paragraph1')}/>
                <Item title={translate('title2')} paragraph={translate('paragraph2')}/>
                <Item title={translate('title3')} paragraph={translate('paragraph3')}/>
            </VStack>
        </SafeAreaView>        
    );
}

export {TermsAndConditions};