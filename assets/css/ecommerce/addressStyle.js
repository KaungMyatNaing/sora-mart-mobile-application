import {StyleSheet} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { flex, height } from 'styled-system';

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
        flex:1,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop:3

    },
    containerBtn: {
        // position: 'relative',
        // bottom: 0,
        // display: 'flex',
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
    InputField_2: {
        paddingVertical: hp('2.5%'), 
        borderBottomWidth: 1, 
        marginHorizontal: 3, 
        borderBottomColor: "#a1a1a1",
        fontSize:14,
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
        justifyContent: 'flex-start',
        width: wp('90%'),
        height: hp('12%')
    },
    button: {    
        backgroundColor: '#ec1c24',
        borderRadius: 4,
        height:hp('8%'),
        width: wp('90%'),
        justifyContent: 'center',
        marginBottom:'10%',
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight:'700',
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
        marginVertical:'10%',
    },
    btnContainer: {
        width: '100%',
        borderWidth:1
    },
    createAccount:{
        backgroundColor:'#EC1C24',
        color:'#fff',
        width : wp('40%'),
        padding:wp('2.5%'),
        fontSize:13,
        borderRadius: 4,
        textAlign:'center',
        fontFamily:'Inter_700Bold',
        marginBottom:'5%',
        margin:'5%',
    },
    addNewAddress:{
        backgroundColor:'red',
        color:'#fff',
        width : wp('95%'),
        padding:hp('2.5%'),
        fontSize:14,
        borderRadius: 4,
        fontWeight:'bold',
        textAlign:'center',
        marginBottom:'3%',
    },   

    containerPush: {
        flex: 1,
        justifyContent:'center',
        alignItems:'center',
        margin:5,
    },
    radioSelectStyle:{
        backgroundColor: '#FDE7E8',
        borderWidth:1,
        borderRadius: 5,
        borderColor: 'red',
    },
    secondText: {
        color: '#a1a1a1'
    },
    defaultText: {
        color: '#EC1C24',
        fontSize:12,
    },
    editText: {
        color: '#00A5E2',
        fontSize:12,
    },
    radioSelectSecStyle : {
        backgroundColor: '#ebebec',
        borderRadius: 5,
        padding:5,
    },
    btnTxt:{
        fontFamily:'Inter_400Regular',
        fontSize:14,
        textAlign:'left',
        marginLeft:-5,
        color:'#A1A1A1',
    },
    ddlLbl:{
        fontFamily:'Inter_400Regular',
        fontSize:14,
        textAlign:'center'
    }  
});
export { styles }