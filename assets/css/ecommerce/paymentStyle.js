import {StyleSheet} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    box: {
        width: '80%',
        height: 150,
        backgroundColor: 'red',
        alignSelf: 'center',
        borderRadius: 9
      },
    container: {      
        backgroundColor:'#FFF',
    },
    Header: {
        fontSize: hp('4%'),
        fontWeight: '900',
        marginBottom: 5,
    },
    wrapper: {
        width: wp('90%'),
    },
    InputField: {
        paddingVertical: hp('2%'), 
        borderBottomWidth: 1, 
        marginHorizontal: 3, 
        borderBottomColor: "#a1a1a1",
        marginTop: hp('8%'),
    },
    radioStyle: {
        backgroundColor: 'transparent',
    },
    InputField_2: {
        paddingVertical: hp('2%'), 
        borderBottomWidth: 1, 
        marginHorizontal: 3, 
        borderBottomColor: "#a1a1a1",
        marginTop: hp('3%'),
    },
    InputField_3: {
        width: '100%',
        paddingVertical:hp('2%'), 
        borderWidth: 0,
        marginHorizontal: 3, 
        marginTop:  hp('3%'),
    },
    InputDropdown: {
        paddingVertical: hp('2%'), 
        borderBottomWidth: 1, 
        marginHorizontal: 3, 
        color: '#fff',
        borderBottomColor: "#a1a1a1",
        marginTop: hp('3%'),
    },
    buttonContainer: {
        justifyContent: 'flex-end',
        width: wp('90%'),
        height: hp('12%')
    },
    button: {    
        backgroundColor: '#ec1c24',
        borderRadius: 5,
        height:hp('8%'),
        width: wp('90%'),
        fontSize: 16,
        justifyContent: 'center',
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontFamily:'Inter_700Bold',
        fontSize: 16,
    },
    bottomView : {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: hp('1%')
    },
    addressBottomView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: hp('1%'),
        marginVertical:'10%'
    },
    btnContainer: {
        width: '100%',
        borderWidth:1
    },
    createAccount:{
        backgroundColor:'#EC1C24',
        color:'#fff',
        width : wp('45%'),
        padding:wp('2.5%'),
        fontSize:13,
        borderRadius: 4,
        fontFamily:'Inter_700Bold',
        textAlign:'center',
        marginBottom:'5%',
        margin:'3%'
    },
    addNewPayment:{
        backgroundColor:'#EC1C24',
        color:'#fff',
        width : wp('95%'),
        padding:hp('2.5%'),
        fontSize:14,
        borderRadius: 4,
        fontFamily:'Inter_700Bold',
        textAlign:'center',
        marginBottom:'5%',
    },
    containerPush: {
        flex: 1
    },
    radioSelectStyle:{
        backgroundColor: '#fbcfe8',
        borderWidth:1,
        borderRadius: 5,
        borderColor: 'red',
    },
    secondText: {
        color: '#a1a1a1'
    },
    defaultText: {
        color: '#ec1c24'
    },
    editText: {
        color: '#00a5e2'
    },
    radioSelectSecStyle : {
        backgroundColor: '#ebebec',
        borderRadius: 5,

    }
});
export { styles }