
import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
    orderDetailsIcon:{
        width:15,
        height:15,
    },
    orderCancelledBtn:{
        backgroundColor:'#EC1C24',
        borderRadius:20,
        width:100,
    },
    orderCancelledLbl:{
        color:'#fff',
        padding:5,
        textAlign:'center',
    },
    // orderDetailSMSIcon:{
    //     width:150,
    //     height:70,
    // },
    orderDetailsItems:{
        width:'50%',
        textAlign:'left',
    },
    orderStatusIcon:{
        width:25,
        height:25,
    },
    card: {
        borderColor: '#EC1C24',
        borderWidth:1,
        borderRadius: 8,
        paddingVertical: 25,
        paddingHorizontal: 25,
        width: '100%',
        color:'#EC1C24'
      },
      bank_info_card: {
        borderColor: 'grey',
        borderWidth:1,
        borderRadius: 8,
        paddingVertical: 45,
        paddingHorizontal: 25,
        width: '100%',
        color:'#EC1C24'
      },
    shadowProp: {
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    seeOrderInfoBtn:{
        color:'#fff',
        width : '95%',
        paddingHorizontal:5,
        paddingVertical:20,
        borderRadius: 4,
        fontWeight:'bold',
        textAlign:'center',
        marginBottom:'5%',
        backgroundColor: '#ec1c24',
        borderRadius: 5,
        fontSize: 16,
        justifyContent: 'center',
        alignItems:'center'
    },
});
export { styles }

