import { Center } from 'native-base';
import {StyleSheet} from 'react-native';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { backgroundColor } from 'styled-system';

const styles = StyleSheet.create({
    productImgBox: {
        height:hp('35%'),
        justifyContent:'center',
        alignItems:'center',
    },
    containerPush: {
        flex: 1,
        backgroundColor:'#FFF',
    },
    productTitle : {
        fontSize: 19,
        color: "#000"
    },
    productStatus : {
        paddingHorizontal: 10,
        paddingVertical: 3,
        borderRadius:10,
        backgroundColor: "#FDE7E8",
    },
    productStatusText : {
        fontSize: 12,        
        color: "#ec1c24",
    },
    productImg: {
        width      : wp('20%'),
		height     : 80,
    },
    productImgMain: {
        width:250,
        height:300,
        alignItems:'center',
        justifyContent:'center',
        alignSelf:'center',
    },
    itemCount:{
        borderWidth : 1,
        borderColor: '#D4D4D4', 
        width: 110,
        height:33,
        borderRadius:50,
        justifyContent:'center', 
           
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight:'bold',
        fontSize: 16,
    },
    button: {    
        color:'#fff',
        width : wp('90%'),
        padding:hp('2.5%'),
        borderRadius: 4,
        fontWeight:'bold',
        textAlign:'center',
        marginBottom:'2%',
        backgroundColor: '#ec1c24',
        fontSize: 16,
        justifyContent: 'center',
    },
    outOfStockButton:{
        color:'#fff',
        width : wp('90%'),
        padding:hp('2.5%'),
        borderRadius: 4,
        fontWeight:'bold',
        textAlign:'center',
        marginBottom:'2%',
        backgroundColor: '#A0A0A0',
        fontSize: 16,
        justifyContent: 'center',
    },
    buttonPosition: {
        alignItems:'center',
        alignSelf:'center',
        marginTop:'20%',
        marginBottom:'5%',        
    },
    priceMMK: {
        color:"#ec1c24",
        fontSize:14,
        paddingRight: 5,
    },
    price: {
        color: '#ec1c24',
        paddingRight: 5,
        fontSize: 19,
    },
    priceDiscount: {
        color: '#A1A1A1',
        fontSize: 12,
        textDecorationLine:'line-through'
    },
    collapse: {
        fontSize: 14,
        color:'#000',
        marginVertical: 10,
    },
    collapseBody: {
        paddingVertical:8,
        fontSize: 16,

    },mpButton:{
        padding:10,
    },
    btn:{
        borderWidth:1,
        borderColor:'#EC1C24',
        borderRadius:4,
        padding:10,
        textAlign:'center',
    },
    alertTitle:{
        color:'#EC1C24',
        fontFamily:'Inter_700Bold',
    },
    alertMsg:{
        fontFamily:'Inter_400Regular'
        
    },
    alertContainer:{
        width:'100%',
   }
});
export { styles }