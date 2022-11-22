import {StyleSheet} from 'react-native';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
const styles = StyleSheet.create({
    itemCount:{
        borderWidth : 1,
        borderColor: '#EC1C24', 
        width: 100,
        borderRadius:20,
        justifyContent:'center',         
    },
    usePoint:{
        borderWidth : 1,
        borderColor: '#EC1C24', 
        width: 120,
        borderRadius:20,
        justifyContent:'center',
        height:25,           
    },
    whishListWrap:{
        position: 'absolute',
        backgroundColor: '#FFFFFF',
        borderRadius:50,
        top: 4,
        right: 4,
        padding: 5,
        zIndex: 5,
    },
    productImg: {
        width : '100%',
		height: '100%',
        alignItems:'center',
        resizeMode: 'stretch',
    },
    priceMMK: {
        color:"#ec1c24",
        fontSize:9,
        fontWeight:'600',
        paddingRight: 5,
    },
    price: {
        color: '#ec1c24',
        paddingRight: 2,
        fontSize: 13,
        fontWeight:'600'
    },
    priceDiscount: {
        color: '#A1A1A1',
        fontSize: 13,
        fontWeight:'600',
        textDecorationLine:'line-through',
        marginLeft:10,
    },
    ImgContainer: {
        width: wp('45%'),
        backgroundColor: "#ebebec",
        height: hp('26%'),
        position: 'relative',
        borderWidth:2,
        borderColor:'#efefef',
    },
    getPoints:{
        borderWidth:0,
        borderRadius:15,
        borderColor:'#EC1C24',
        paddingLeft:8,
        paddingRight:8,
        backgroundColor:'#EC1C24',
        fontSize:12,
        color:'#fff',
    },
    recent: {
        backgroundColor: '#cccccc',
        paddingHorizontal: 20,
        borderRadius:50,
        paddingVertical:7,
        marginVertical: 10,
        marginHorizontal: 3,
    },
    activeInfo:{
        borderWidth:2,
        borderColor:'#EC1C24',
        borderRadius: 100 / 2,
        width:25,
        height:25,
        alignItems:'center',
    },
    activeTxt:{
        color:'#EC1C24',
        textAlignVertical:'center',
        fontSize:12,
        fontFamily:'Inter_700Bold'
    },
    closeIcon:{
        padding:10,
    },
    noNotification:{
        marginTop:'100%',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize:14,
    }
});
export { styles }