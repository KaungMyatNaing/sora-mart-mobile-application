import { HStack,Image } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { useIsFocused } from '@react-navigation/native' // for re-render
import axios from 'axios';
import config from '../../config/config';
import { Share} from 'react-native';
import ToastHelper from '../Helper/toast';
import Toast from 'react-native-toast-message';
import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { wishlistStore } from '../store/wishlistStore';
//lote yan

function ShareAndFav() {
  
  const wishlist = wishlistStore(state => state.wishlist);
  const replaceWishlist = wishlistStore(state => state.replaceWishlist);
  const updateWishlist = wishlistStore(state => state.updateWishlist);
  


  const [wishid, setWishid] = React.useState([]);
 
  React.useEffect(() => {
    getAction();
  }, [])
  React.useEffect(() => {

  }, [wishlist]);

  const unlikeAction = (id) => {
    fetch(`https://sora-mart.com/api/remove-wishlist/${id}`, {
      method: 'DELETE', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
        Authorization: global.auth,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status == 200) {
          getAction();
          console.log('removed');
        }
      })
      .catch((error) => {
        console.log(error);
      });
    const fdata = wishlist.filter(i => i !== id);
    replaceWishlist(fdata);
   
  };

  const likeAction = (id) => {

   fetch(`https://sora-mart.com/api/add-wishlist/${id}`, {
     method: 'POST', // or 'PUT'
     headers: {
       'Content-Type': 'application/json',
       Authorization: global.auth,
     },
   })
     .then((response) => response.json())
     .then((data) => {
       if (data.status == 200) {
         getAction();
         console.log('added');
       }
     })
     .catch((error) => {
       console.log(error);
     });
  // setWishid(prev=>[...prev,id]);
  // console.log(wishid);
    updateWishlist(id);
 };
  
  const getAction = () => {
   
    fetch(`https://sora-mart.com/api/wishlists/`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: global.auth,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        let len = data.data.wishlists.length;
        let dumbdata = [];
        for (let i = 0; i < len; i++) {
          dumbdata.push(data.data.wishlists[i].products.id);
        }
        setWishid(dumbdata);
        console.log('wishlist grab successful.');
      })
      .catch((error) => console.log(error));

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
  const checkId = wishlist && wishlist.filter((i) => i == global.product_id);
    return(
        <HStack>
            <TouchableOpacity p={3} onPress={() => shareAction()}> 
            <Image alt="share icon" source={require('../../assets/image/png_icons/ShareIcon3x.png')}
                style = {{width:24,height:24,marginRight:10,padding:3}}
                />
            </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          global.back = 1
          checkId.length > 0 ? unlikeAction(global.product_id)  : likeAction(global.product_id);
        }}>
             
                {checkId.length > 0 ? <AntDesign name="heart" size={24} color="red" /> : <AntDesign name="hearto" size={24} color="black" />}
        
            </TouchableOpacity> 
            <Toast />              
        </HStack>
    );
}
export default ShareAndFav;