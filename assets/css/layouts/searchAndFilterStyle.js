import { Inter_100Thin } from '@expo-google-fonts/inter';
import { Center } from 'native-base';
import {StyleSheet} from 'react-native';
import { left } from 'styled-system';

const styles = StyleSheet.create({
    modalBox:{
        width:'100%',
        backgroundColor:'#fff',
        marginTop:'28%',
    },
    closeBtn:{
        color:'#EC1C24',
        fontFamily:'Inter_500Medium',
        fontSize:14,
    } ,
    collpseHeader:{
        fontFamily:'Inter_700Bold',
        fontSize:14,
    },
    activeStyle:{
        borderWidth:1,
        borderColor:'#EC1C24',
        borderRadius:4,
        backgroundColor:'#FDE7E8',
        paddingVertical:8,
        paddingHorizontal:11,
        color:'#EC1C24',
        margin:10,
        marginLeft:0,
        fontFamily:'Inter_400Regular',
        fontSize:12,
    },
    inActiveStyle:{
        borderRadius:4,
        paddingVertical:8,
        paddingHorizontal:11,
        margin:10,
        marginLeft:0,
        backgroundColor:'#EBEBEC',
        fontFamily:'Inter_400Regular',
        fontSize:12,
    },
    mainCollapse:{
        marginVertical:10,
    },
    clearFilterBtn:{
        padding:10,
        borderWidth:1,
        borderColor:'#EC1C24',
        borderRadius:4,
        width:'45%',
        textAlign:'center',
    },
    showResultBtn:{
        padding:10,
        backgroundColor:'#EC1C24',
        borderRadius:4,
        width:'45%',
    },
    clearLbl:{
        color:'#EC1C24',
        fontFamily:'Inter_500Medium',
        fontSize:14,
        textAlign:'center',
        padding:5,
    },
    showResultLbl:{
        backgroundColor:'#EC1C24',
        fontFamily:'Inter_500Medium',
        fontSize:14,
        textAlign:'center',
        padding:5,
        color:'#fff',
    },
    price:{
        fontFamily:'Inter_400Regular',
        fontSize:12,
        textAlign:'left',
    }
});
export { styles }