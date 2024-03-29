import { StyleSheet } from 'react-native';
const styles =StyleSheet.create( {
    title:{
        fontFamily:'Inter_700Bold',
        fontSize:18,
    },
    companyName:{
        fontFamily:'Inter_400Regular',
        fontSize:14,
    },
    postDate:{
        fontFamily:'Inter_400Regular',
        fontSize:11,
        color:'#A1A1A1',
    },
    favAndSaveBtn:{
        backgroundColor:'#FDE7E8',
        borderRadius:18,
        width:100,
        height:35,
        justifyContent:'space-evenly',
        alignItems:'center'
    },
    mainImg:{
        flex: 1,  
        width:null,
        height:200,        
        marginLeft:0,
    },
    rentMainImg:{
        flex: 1,  
        width:null,
        height:220,        
        marginLeft:0,
    },
    keyValue:{
        justifyContent:'flex-start',
        alignItems:'flex-start',
        alignContent:'flex-start',
        fontFamily:'Inter_600SemiBold',
        fontSize:14,
        resizeMode:'contain',
    },
    btn:{
        width:'100%',
        fontWeight:'bold',
        fontSize:16,
        backgroundColor:'#EC1C24',
        textAlign:'center',
        borderRadius:4,
        padding:10,
        marginBottom:'10%',
    },
    btnLbl:{
        color:'#fff',
        textAlign:'center',
        fontFamily:'Inter_700Bold',
        fontSize:16,
        padding:10,
    },
    bodyTxt:{
        textAlign:'left',
    },
    rentBtn:{
        minWidth:'80%',
        padding:10,
        borderRadius:4,
        borderWidth:1,
        borderColor:'#EC1C24',
        marginTop:20,
    },
    rentBtnLbl:{
        color:'#EC1C24',
        fontFamily:'Inter_500Medium',
        fontSize:14,
        textAlign:'center'
    },
    rentFooterDesc:{
        width:'80%',
        textAlign:'center',
        color:'#A1A1A1',
        fontFamily:'Inter_400Regular',
        fontSize:12,
    },
    rentFooter:{
        backgroundColor:'#F8F8F8',
        padding:10,
        paddingVertical:20,
    },
    RentFooterTitle:{
        fontFamily:'Inter_700Bold',
        fontSize:14,
    },
    companyLogo:{
        width:30,
        height:30,
        borderRadius:100/2,  
        marginRight:5      
    }
})
export default styles