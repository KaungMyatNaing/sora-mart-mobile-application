// import {StyleSheet} from 'react-native';
// import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
// import { bottom, left } from 'styled-system'; 
// import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';
// // import { transparent } from 'react-native-paper/lib/typescript/styles/colors';

// const styles = StyleSheet.create({
//     signin :{
//         borderStyle:'solid',
//         borderWidth:1,
//         borderColor:'red',
//         backgroundColor:'#fff',
//         color:'red',
//         fontWeight:'bold',
//         textAlign:'center',
//         // width:350,
//         paddingTop:3,
//         paddingBottom:3,
//         paddingLeft:20,
//         paddingRight:20,
//         fontSize:16,
//         borderRadius: 20,
//         margin:'8%',        
//     },
//     container :{
//         backgroundColor : "#FFFFFF",
//     },
//     bg :{
//         // backgroundColor : "#fca",
//     }, 
//     test :{
//         backgroundColor : "#fca",
//         // alignSelf: left,
//     },
//     logo :{ 
//         width : 50,
//         height: 50 
//     }, 
//     bold:{
//         fontSize: 16,
//         fontWeight: "700"
//     },
//     regular:{
//         fontSize:12, 
//         color:"#707070",
//     },
//     earn_btn:{
//         flex: 0.68,
//         // backgroundColor: "transparent",
//         borderWidth:1,
//         borderColor:'red',
//         height: 39,
//        backgroundColor:'#fff',
//        borderRadius:50,
//        padding: 7,
//     },
//     logo_point:{
//         width: 30,
//         height: 30,
//         marginLeft: 10, 
//         marginTop: 10,
//     },
//     point_stack:{ 
//         marginTop: 10,
//     },  
//     orderStatus_stack:{
//         marginTop: 20,
//     },
//     orderStatus_text:{
//         fontSize: 14,
//         fontWeight: 'bold',
//     },
//     orderStatus_number:{
//         color: "#A1A1A1",
//         fontSize: 12,
//     },
//     services_title:{
//         fontSize: 14,
//         fontWeight: 'bold',
//         marginBottom: 12,
//     },
//     services_stack:{
//         marginTop: 15,
//         marginBottom: 30,     
//     },
//     promotion_stack:{
//         marginTop: 15,      
//         marginBottom: 10,
//     },
//     logo_text :{ 
//         fontSize: 12,
//         color: '#1C1B30',
//         paddingVertical:5,
//     }, 
//     service_logo :{ 
//         width : 50,
//         height: 50 ,
//         marginLeft: 23,
//     }, 
//     services_iconGroup:{
//         // padding:
//     },
//     promotion_bg:{
//         height: 125,
//         width:335
//         // flex: 0.91,
//     },
//     text_point:{
//         fontSize: 22,
//         fontWeight: '500',
//     },
//     text_point_title:{
//         fontSize: 12,
//         // fontWeight: '400',
//         color:"#A1A1A1",
//     },
//     logo_earn_point: {
//         width:14,
//         height: 14,
//         marginTop: 3,
//         marginRight: 15,
//         marginLeft: 22,
//     },
//     rounded_button:{
//         borderRadius: 10,
//     },  
//     logo_setting :{
//         width : 24,
//         height: 24 ,
//         marginRight: 14,
//     },
//     InputField: {
//         paddingVertical: '2%', 
//         borderBottomWidth: 1, 
//         marginHorizontal: 3, 
//         borderBottomColor: "#a1a1a1",
//         marginTop: '2%',
//     },
//     InputField_2: {
//         width: '100%',
//         paddingVertical:'2%', 
//         borderWidth: 0,
//         marginHorizontal: 3, 
//         marginTop: '2%',
//     },
//     createAccount:{
//         backgroundColor:'red',
//         color:'#fff',
//         width : 350,
//         padding:'5%',
//         fontSize:16,
//         fontWeight:'bold',
//         textAlign:'center',
//         marginBottom:'10%',
//     },
//     circle: {
//         width: 50,
//         height: 50,
//         borderRadius: 100 / 2,
//         backgroundColor: "#EBEBEC",
//     },
  
    
// });
// export { styles }
import {StyleSheet} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { bottom, left } from 'styled-system'; 
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
import { TextInput } from 'react-native-gesture-handler';
// import { transparent } from 'react-native-paper/lib/typescript/styles/colors';

const styles = StyleSheet.create({
    signin :{
        borderStyle:'solid',
        borderWidth:1,
        borderColor:'red',
        backgroundColor:'#fff',
        color:'red',
        fontWeight:'bold',
        textAlign:'center',
        // width:350,
        paddingTop:3,
        paddingBottom:3,
        paddingLeft:20,
        paddingRight:20,
        fontSize:16,
        borderRadius: 20,
        margin:'8%',        
    },
    tab : {
        position: 'absolute',
        bottom: 0,
        backgroundColor: '#FFF',
        width: wp('100%'),
    },
    container :{
        backgroundColor : "#FFFFFF",
    },
    bg :{
        // backgroundColor : "#fca",
    }, 
    test :{
        backgroundColor : "#fca",
        // alignSelf: left,
    },
    logo :{ 
        width : 50,
        height: 50,
        borderRadius: 50/2
    },
    profileImg:{
        width:100,
        height:100,
        borderRadius: 100 / 2,
    },

    bold:{
        fontSize: 16,
        fontWeight: "700"
    },
    regular:{
        fontSize:12, 
        color:"#707070",
    },
    earn_btn:{
        flex: 0.68,
        // backgroundColor: "transparent",
        borderWidth:1,
        borderColor:'red',
        height: 39,
       backgroundColor:'#fff',
       borderRadius:50,
       padding: 7,
    },
    logo_point:{
        width: 30,
        height: 30,
        marginLeft: 10, 
        marginTop: 10,
    },
    point_stack:{ 
        marginTop: 10,
    },  
    orderStatus_stack:{
        marginTop: 20,
    },
    orderStatus_text:{
        fontSize: 14,
        fontWeight: 'bold',
    },
    orderStatus_number:{
        color: "#A1A1A1",
        fontSize: 12,
    },
    services_title:{
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    services_stack:{
        marginTop: 15,
        marginBottom: 30,     
    },
    promotion_stack:{
        marginTop: 15,      
        marginBottom: 10,
    },
    logo_text :{ 
        fontSize: 12,
        color: '#1C1B30',
        paddingTop:5,
    }, 
    service_logo :{ 
        width : 50,
        height: 50 ,
        marginLeft: 23,
    }, 
    services_iconGroup:{
        // padding:
    },
    promotion_bg:{
        height: 125,
        width:335
        // flex: 0.91,
    },
    text_point:{
        fontSize: 22,
        fontWeight: '500',
    },
    text_point_title:{
        fontSize: 12,
        // fontWeight: '400',
        color:"#A1A1A1",
    },
    logo_earn_point: {
        width:14,
        height: 14,
        marginTop: 3,
        marginRight: 15,
        marginLeft: 22,
    },
    rounded_button:{
        borderRadius: 10,
    },  
    logo_setting :{
        width : 24,
        height: 24 ,
        marginRight: 14,
    },
    InputField: {
        paddingVertical: '2%', 
        borderBottomWidth: 1, 
        marginHorizontal: 3, 
        borderBottomColor: "#a1a1a1",
        marginTop: '2%',
    },
    InputField_2: {
        width: '100%',
        paddingVertical:'2%', 
        borderWidth: 0,
        marginHorizontal: 3, 
        marginTop: '2%',
    },
    saveBtn:{
        width:'100%',
        fontWeight:'bold',
        fontSize:16,
        backgroundColor:'#EC1C24',
        textAlign:'center',
        padding:10,
        borderRadius:4,
    },
    saveBtnlabel:{
        color:'#fff',
       padding:10,
       fontFamily:'Inter_700Bold',
       fontSize:16,
       textAlign:'center'
    },
    circle: {
        width: 50,
        height: 50,
        borderRadius: 100 / 2,
        backgroundColor: "#EBEBEC",
    },
    TextInput:{
        padding:0,
        margin:0,
        backgroundColor:'#fff',
        borderBottomColor:"#D3D3D3",
        fontSize:12,
    }, 
    
});
export { styles }   