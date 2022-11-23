import {StyleSheet} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    container : {     
        flex:1,
        justifyContent:'center', 
        alignItems: 'center',
        backgroundColor: '#ffffff'
    },
    pragraph: {
        textAlign:'center',
        padding:30,
        fontFamily: 'Inter_400Regular',
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
        fontFamily: 'Inter_700Bold',
    },
    btnContainer : {
        display:'flex',
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
        width : wp('90%'),
        padding:hp('2.5%'),
        fontSize:16,
        borderRadius: 4,
        marginBottom:'5%',        
    },
    createAccount:{
        backgroundColor:'red',
        color:'#fff',
        width : wp('90%'),
        padding:hp('2.5%'),
        fontSize:16,
        borderRadius: 4,
        fontWeight:'bold',
        textAlign:'center',
        marginBottom:'10%',
    },
    logOutBtn:{
        color:'#FFF',
        backgroundColor:'#EC1C24',
        borderRadius:4,
        marginTop:'20%',   
        width:'80%', 
        margin:'5%',
        padding:10,
    }

});
export { styles }