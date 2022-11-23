import {StyleSheet} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const styles = StyleSheet.create({

    header:{
        fontSize:24,
        fontWeight:'bold',
    },    
    orderTxt:{
        fontSize:14,
        textAlign:'center',
        width:'85%',
        padding:5,
    },
    orderCompleteBackBtn:{
        borderStyle:'solid',
        borderColor:'#EC1C24',
        borderWidth:1,
        borderRadius:4,
        justifyContent:'center',
        alignItems:'center',
        marginTop:20,
        width : wp('90%'),
        padding:hp('2.5%'),
        borderRadius: 4,
        fontWeight:'bold',
        textAlign:'center',
    },
    BackToHome:{
        color:'#EC1C24',
    },
    seeOrderInfoBtn:{
        color:'#fff',
        width : wp('90%'),
        padding:hp('2.5%'),
        borderRadius: 4,
        fontWeight:'bold',
        textAlign:'center',
        marginBottom:'2%',
        backgroundColor: '#ec1c24',
        borderRadius: 5,
        fontSize: 16,
        justifyContent: 'center',
        marginTop:'30%',
    },
    seeOrderInfo:{
        color:'#fff',
    }


});
export { styles }