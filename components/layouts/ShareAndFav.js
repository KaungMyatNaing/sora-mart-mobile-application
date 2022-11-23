import { HStack,Image } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { useIsFocused } from '@react-navigation/native' // for re-render
import axios from 'axios';
import config from '../../config/config';
import { Share} from 'react-native';
import ToastHelper from '../Helper/toast';
import Toast from 'react-native-toast-message';

function ShareAndFav (){
   const setWishList= (item) => {
        if(global.auth == ''){
            global.forceLoginMsg = config.forceLoginMsg
            navigation.navigate('Sign In');
          }else{
            const myData = {
              "product_id": item,
            }
            const headers = { 
                'Accept' : 'application/json',
                'Authorization' : 'Bearer '+ global.auth,
            }; 
          axios.post(config.baseUrl+'/api/wish-lists', myData, { headers })
          .then(response => {
            if(response.data.status_code === 200){
                dispatch(apiGetMultipleActionCreator(category_baseUrl,product_baseUrl,global.auth));
                // alert(response.data.data.desc);
              }
          })    
          .catch((error) => {
            console.log(error);
          });
        }
    }
    const shareAction = async () => {
        try {
          const result = await Share.share({
            message:
              'https://www.shop.com.mm/products/chayalo-exfoliating-foot-mask-i110510442-s1035745344.html?spm=a2a0e.searchlist.list.25.2e342b53sB5MHB&search=1',
          });
          if (result.action === Share.sharedAction) {
            if (result.activityType) {
              // shared with activity type of result.activityType
            } else {
              // shared
            }
          } else if (result.action === Share.dismissedAction) {
            // dismissed
          }
        } catch (error) {
          ToastHelper.toast(error.message, null, 'error');
          // alert(error.message);
        }
      };
    return(
        <HStack>
            <TouchableOpacity p={3} onPress={() => shareAction()}> 
            <Image alt="share icon" source={require('../../assets/image/png_icons/ShareIcon3x.png')}
                style = {{width:24,height:24,marginRight:10,padding:3}}
                />
            </TouchableOpacity>
            <TouchableOpacity p={3} onPress={() => setWishList(global.product_id)}>
            <Image alt="fav icon" source={require('../../assets/image/Home/FavIcon3x.png')}
                style = {{width:24,height:24,marginLeft:10,padding:3}}
                />
            </TouchableOpacity>   
            <Toast />              
        </HStack>
    );
}
export default ShareAndFav;