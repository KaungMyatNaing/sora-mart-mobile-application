import { VStack,Text ,Image} from "native-base";
import { styles } from '../../../assets/css/ecommerce/status/orderStatusStyle';
import { useIsFocused } from '@react-navigation/native' // for re-render
const OrderComponent = ({header,txt}) => {
    return(
        <>
            <Text style={styles.header} mt='10%' mb='3%' p='3'>{header}</Text>
            <Text style={styles.orderTxt} mb='10%'>{txt}</Text>
        </>
            
        
    );
}

export {OrderComponent}