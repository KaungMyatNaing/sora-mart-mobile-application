import {StyleSheet} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    container : {     
        flex:1,
        justifyContent:'center', 
        alignItems: 'center',

    },
    logo: {
        width : 122.76,
        height : 122.76,  
    },
    logoContainer:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        maxHeight:'35%'
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
    createAccount:{
        backgroundColor:'red',
        color:'#fff',
        width : 350,
        padding:'5%',
        fontSize:16,
        fontWeight:'bold',
        textAlign:'center',
        marginBottom:'10%',
    },
    p:{
        maxWidth:'70%',
        textAlign:'center',
        lineHeight:25,
        fontSize:14,
    },
    notiList:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center', 
        marginLeft:'5%',  
        marginRight:'5%',  
        paddingBottom:'8%',
        paddingTop:'8%',
        borderBottomWidth:1,
        borderBottomColor:'#D4D4D4',
    },
    notiTitleContainer:{
        maxHeight:'20%',
    },
    leftColumn: {
        width: '74%',
        alignItems:'flex-start',        
    },
    rightColumn:{
        width:'26%',
        alignItems:'center',
    },
    notiImg:{
        width:81,
        height:81,     
    },
    notiTitle:{
        fontSize:14,
        fontWeight:'bold',
        padding:0,
    },
    subTitle:{
        fontSize:11,
        fontWeight:'normal',
    },
    notiBody:{
        fontSize:12,
        fontWeight:'normal',        
    },
    time:{
        fontSize:10,
        fontWeight:'normal',
    },
    noNotification:{
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:'100%',
        fontSize:14,
    },
    pointTotal:{
        fontSize:12,
        fontWeight:'500',
    },
    point:{
        fontSize:16,
        fontWeight:'bold',
    },
    pointString:{
        flexDirection:'row',
        justifyContent:'space-evenly',
        alignItems:'baseline',
        marginTop:'40%',
    },
    totalString:{
        marginTop:'8%',
    },
    pointList:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start', 
        marginLeft:'5%',  
        marginRight:'5%',  
        paddingBottom:'5%',
        paddingTop:'5%',
        borderStyle:'solid',
        borderWidth:1,
        borderBottomColor:'grey',
        borderTopColor:'#fff',
        borderLeftColor:'#fff',
        borderRightColor:'#fff',
    },
    orderBtnContainer:{
        flex:2,
        flexDirection:'row',
        justifyContent:'space-evenly',
        alignItems:'center',
        marginTop:'5%',
    },
    orderBtn:{
        textAlign:'center',
        borderStyle:'solid',
        width:100,
        padding:'6%',
        borderRadius:20, 
        color:'#EC1C24',
        fontSize:14,
        fontWeight:'bold',    
    },
    orderBtnActive:{
        textAlign:'center',
        borderStyle:'solid',        
        width:100,
        padding:'6%',
        borderRadius:20, 
        color:'#fff',
        fontSize:14,
    },
    order:{
        flexDirection:'column',
        minHeight:50,
    },
    orderTitle:{
        width:'50%',
        textAlign:'left',
        color:'#A1A1A1',
    },
    orderValue:{
        width:'50%',
        textAlign:'right',
        color:'#1C1B30',
    },
    orderViewDetails:{
        color:'#00A5E2',
    },
    orderItem:{
        fontSize:14,
        fontWeight:'normal',
    },
    orderDeliveryMethod:{
        fontSize:12,
        color:'#EC1C24',
    },
    orderItemStatus:{
        color:'#EC1C24',
        fontSize:14,
        fontWeight:'normal'
    },
    orderBtnOpacityActive:{
        borderRadius:20,
        borderStyle:'solid',
        borderColor:'#707070',
        backgroundColor:'#EC1C24',
    },
    orderBtnOpacity:{
        borderRadius:20,
        borderStyle:'solid',
        borderColor:'#707070',
        backgroundColor:'#FDE7E8',
    },
    orderItemCompletedStatus:{
        color:'green'
    },
    signInBtn:{
       width:'90%',
       fontWeight:'bold',
       fontSize:16,
       backgroundColor:'#EC1C24',
       textAlign:'center',
    },
    signInBtnlabel:{
        color:'#fff',
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
        flex:5,
        justifyContent:'center', 
        alignItems:'center',
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
        width:'90%',
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
        width:'90%',
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
        borderBottomWidth:1,
        width:"90%",
        marginBottom:"8%",
        paddingBottom:"5%"
    },
    rememberForgotContainer:{
        width:'90%',
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
        fontSize:15,
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
        justifyContent:'space-evenly',
        alignItems:'center',
        flexDirection:'row',
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
        fontWeight:'bold',
        padding:'10%'
    },
    verificationP:{
        fontSize:14,
        textAlign:'center',  
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
        borderColor: '#00000030',
        textAlign: 'center',
        margin:'2%',
        fontSize:24,
        borderRadius:4,
        lineHeight:45,
    },
    focusCell: {
        borderColor: '#000',
    },
    oldPrice:{
        textDecorationLine:'line-through',
    },
    addItem:{
        borderWidth : 1,
        borderColor: '#EC1C24',
        borderTopLeftRadius:20,
        borderBottomLeftRadius:20,
    },
    minusItem:{
        borderWidth : 1,
        borderColor: '#EC1C24',
        borderTopRightRadius:20,
        borderBottomRightRadius:20,
    },
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
    usePointTxt:{
        color:'#EC1C24',
    },
    getPoints:{
        borderWidth:1,
        borderRadius:20,
        borderColor:'#EC1C24',
        paddingLeft:3,
        paddingRight:3,
        backgroundColor:'#EC1C24',
        color:'#fff',
    },
    spTotalCost:{
        color:'#EC1C24',
    },
    proceedToPayment:{
        color:'#fff',
        fontWeight:'bold',
    } ,
    deliMethod:{
        width : 54.6,
        height: 40,
    },
    itemImage:{
        width:'100%',
        height:'100%',
    },
    paymentTitle:{
        color:'#A1A1A1',
    },
    signInBtn:{
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
        justifyContent: 'center'
    },
    activeStyle:{
        borderColor:'#EC1C24',
        borderWidth:2,
        padding:5,
        borderRadius:8,
        marginHorizontal:3,
    },
    inactiveStyle:{
        borderColor:'#A0A0A0',
        borderWidth:2,
        padding:5,
        borderRadius:8,
        marginHorizontal:3,
    }

});
export { styles }