import {StyleSheet} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    active: {        
        borderRadius:20,        
        backgroundColor: "#ec1c24",
        marginHorizontal:5,
    },
    activeText:{
        fontSize: 14,
        fontFamily: 'Inter_500Medium',
        paddingVertical: 8,        
        paddingHorizontal: 17,
        color: "#fff",
    },
    tab : {
        position: 'absolute',
        bottom: 0,
        backgroundColor: '#FFF',
        width: wp('100%'),
    },
    inactive: {
        marginHorizontal:5,
        borderRadius:20,
        backgroundColor: "#fde7e8",
    },
    inactiveText:{
        fontSize: 14,
        fontFamily: 'Inter_500Medium',
        paddingVertical: 8,        
        paddingHorizontal: 17,
        color: "#ec1c24",
    },
    backImg:{
        width:'100%',
    },
    imgStyle:{
        width:'100%',
        height: 150,
        resizeMode: 'contain'
    }

});
export { styles }