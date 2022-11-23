import {StyleSheet} from 'react-native';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
// const { width, fontScale } = Dimensions.get("window");
const styles = StyleSheet.create({
    productTagActive: {        
        marginHorizontal:5,        
        paddingHorizontal: 20,
        borderRadius:20,        
        backgroundColor: "#ec1c24",
        borderWidth:1,
        borderColor:'#ec1c24',
        borderStyle:'solid',
    },
    categoryTextActive:{
        paddingVertical:8,
        fontSize: 14,
        fontFamily: 'Inter_500Medium',
        color: "#fff",
    },

    categoryText:{
        paddingVertical:8,
        fontSize: 14,
        fontFamily: 'Inter_500Medium',
        color: "#ec1c24",
    },    

    tab : {
        position: 'absolute',
        bottom: 0,
        backgroundColor: '#FFF',
        width: wp('100%'),
    },
    no_items: {
        textAlign:'center',
        width: wp('100%'),
        marginTop: 25,
        color: '#ccc'
        },
    productTag: {
        marginHorizontal:5,
        paddingHorizontal: 20,
        borderRadius:20,        
        backgroundColor: "#fde7e8",
        borderWidth:1,
        borderColor:'#fde7e8',
        borderStyle:'solid',
    },
    productImg: {
        width : '100%',
		height: '100%',
        alignItems:'center',
        resizeMode: 'stretch',
    },
    ImgContainer: {
        width: wp('45%'),
        backgroundColor: "#ebebec",
        height: hp('26%'),
        position: 'relative',
        borderWidth:2,
        borderColor:'#efefef',
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
    productTitle: {
        fontSize: 18,
        fontWeight:'900'
    },
    showMore: {
        fontSize: 12,
        color: "#00A5E2"
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
    label: {
        width: wp('45%'),
        fontSize: 12,
        fontWeight: '500',
        color:'#000',
        marginTop:2,
    },
    whiteListIcon:{
        width:2,
        height:2,
        alignSelf:'center',
    }
   
});
export { styles }