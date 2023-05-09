import { StyleSheet } from 'react-native';
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
    flex:1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor:'#FFF',
    height:hp('90%'),
},
Header: {
    fontSize: hp('4%'),
    marginBottom: 5,
},
wrapper: {
    width: wp('100%'),
    paddingHorizontal: 15,
    paddingTop: 10,
},
InputField: {
    paddingVertical: hp('2%'), 
    borderBottomWidth: 1, 
    borderBottomColor: "#a1a1a1",
    marginTop: hp('8%'),
},
InputField_2: {
    paddingVertical: hp('2%'), 
    borderBottomWidth: 1, 
    borderBottomColor: "#a1a1a1",
    marginTop: hp('3%'),
},
InputDropdown: {
    paddingVertical: hp('2%'), 
    borderBottomWidth: 1, 
    color: '#fff',
    borderBottomColor: "#a1a1a1",
    marginTop: hp('3%'),
},
buttonContainer: {
    justifyContent: 'flex-start',
    width: wp('100%'),
    height: hp('12%')
},
button: {    
    backgroundColor: '#ec1c24',
    borderRadius: 8,
    height:hp('6%'),
    width: wp('100%'),
    justifyContent: 'center'
},
buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight:'400',
    fontSize: 14,
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
    paddingVertical: hp('1%')
},
signInBtn:{
    width:'100%',
    fontWeight:'bold',
    fontSize:16,
    backgroundColor:'#EC1C24',
    textAlign:'center',
    padding:10,
    borderRadius:4,
    },
    signInBtnOff:{
        width:'100%',
        fontWeight:'bold',
        fontSize:16,
        backgroundColor: 'gray',
        textAlign:'center',
        padding:10,
        borderRadius:4,
     },
 signInBtnlabel:{
     color:'#fff',
    padding:10,
    fontFamily:'Inter_700Bold',
    fontSize:16,
    textAlign:'center'
 },
 noAcctContainer:{
     flexDirection:'row',
     justifyContent:'flex-end',
 },
 link:{
     color:'#EC1C24',
     fontSize:14,
     fontWeight:"500",
 },
 signInContainer:{
     display:'flex',
     justifyContent:'center', 
     alignItems:'center',
     width:'100%',
 },
 signInContainer2:{
     width:'100%',
},
 signinTop:{
     flex:1,
     justifyContent:'center',
     alignItems:'flex-start',
     minHeight:'25%',
     width:'100%',
     marginLeft:'10%'
 },
 signinMiddle:{
     flex:2,
     justifyContent:'center',
     alignItems:'center',
     minHeight:'40%',
     width:'100%',
 },
 signInOr:{
     flex:3,
     minHeight:'5%',
     justifyContent:'center',
     alignItems:'center',
 },
 signinBottom:{
     flex:4,
     justifyContent:'center',
     alignItems:'center',
     minHeight:'20%',   
     width:'100%',
 },
 noAcctContainer:{
     flex:5,
     flexDirection:'row',
     alignItems:'center',
     justifyContent:'center',
     width:'100%',
     minHeight:'10%',
 },
 signInWithGM:{
     width:'100%',
     fontWeight:'bold',
     fontSize:14,
     borderColor:'#EC1C24',
     borderStyle:'solid',
     borderWidth:1,
     padding:'5%',
     textAlign:'center',
     justifyContent:'center',
     alignItems:'center',
 },
 signInLabel:{
     flexDirection:'row',
     justifyContent:'space-evenly',
     alignItems:'center',
     width:'70%',
 },
 gmLabel:{
     color:'#EC1C24',
 },
 gmLogo:{
     width:14,
     height:14.28,
 },
 signInWithFb:{
     width:'100%',
     fontWeight:'bold',
     fontSize:14,
     borderColor:'#00A5E2',
     borderStyle:'solid',
     borderWidth:1,
     padding:'5%',
     textAlign:'center',
     marginTop:'3%',
     flexDirection:'row',
     justifyContent:'space-evenly',
     alignItems:'center',
 },
 fbLogo:{
     width:7.89,
     height:15,
 },
 fbLabel:{
     color:'#00A5E2',
 }, 
 TextInput:{
     width:"100%",
     marginBottom:"8%",
     paddingBottom:5,
     backgroundColor:'#fff',
     borderBottomColor:"#000",
 },
 rememberForgotContainer:{
    width:'100%',
    flexDirection:'row',
    justifyContent:'space-between',
    marginLeft:'5%',
    marginRight:'5%',
    marginBottom:'15%',
 },
rememberMeContainer:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',      
},    
forgotContainer:{
    justifyContent:'flex-end',
    alignItems:'flex-end',
},
checkBox:{
    width:20,
    height:20,
    marginRight:5,
},
alertMsg:{
    fontSize:14,
},    
signP:{
    paddingTop:'5%',
},
signInOrLabel:{
    fontSize:14,
    fontWeight:'500',
},

verificationDigits:{
    width:50,
    height:50,
    borderStyle:'solid',
    backgroundColor:'grey',
    borderWidth:1,
},
verificationContainer:{
    flex:5,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#fff'
},
verificationTop:{
    flex:1,
    minHeight:'25%',
    justifyContent:'flex-end',
    alignItems:'center',        
},
verificationMiddle:{
    flex:2,
    minHeight:'20%',
    justifyContent:'center',
    alignItems:'center'
},
verificationMiddle2:{
    flex:3,
    minHeight:'15%',
    justifyContent:'space-evenly',
    alignItems:'center',
},
verificationMainView:{        
    flexDirection:'row',
    justifyContent:'space-evenly',
},
verificationDigits:{
    width:50,
    height:50,
    alignItems:'center',
    margin:'5%',
    borderRadius:8,
    backgroundColor:'#EBEBEC', 
    textAlign:'center',       
},
verificationMiddle3:{
    flex:4,
    minHeight:'10%',
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'row',
    fontSize:12,
},
txtResend:{
    fontFamily:'Inter_600SemiBold',
    fontSize:12,
    color:'#EC1C24',
    marginLeft:3,
},
verificationBottom:{
    flex:5,
    minHeight:'30%',
    justifyContent:'center',
    alignItems:'center',
},
verificationLogo:{
    width:128,
    height:128,
},
verificationHeader:{
    fontSize:32,
    padding:'10%',
    fontFamily:'Inter_700Bold',
},
verificationP:{
    fontSize:14,
    textAlign:'center',
    fontFamily:'Inter_400Regular',  
},
otpResend:{
    color:'#EC1C24',
    marginLeft:10
},
root: {flex: 1},
title: {textAlign: 'center', fontSize: 30},
codeFieldRoot: {marginTop: 20},
cell: {
    width: 50,
    height: 50,
    borderWidth: 2,
    borderColor: '#A1A1A1',
    textAlign: 'center',
    margin:'2%',
    fontSize:16,
    borderRadius:4,
    lineHeight:45,
    backgroundColor:'#EBEBEC',
},
headerContainer:{  
    flex: 2,
    alignItems:'center',
    maxHeight:'35%',
},
header : {
    fontSize: 32,
    fontWeight: '700',
},
btnContainer : {
    flex:3,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems:'center',
    maxHeight:'15%',
},
signin :{
    borderStyle:'solid',
    borderWidth:1,
    borderColor:'red',
    backgroundColor:'#fff',
    color:'red',
    fontWeight:'bold',
    textAlign:'center',
    width:350,
    padding:'5%',
    fontSize:16,
    marginBottom:'5%',        
},
forceLoginMsg:{
    color:'#EC1C24',
    fontFamily:'Inter_700Bold',
}
});

export { styles }