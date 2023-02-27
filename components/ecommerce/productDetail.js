import React, { useEffect, useState } from 'react';
import{ View,Text,Button, ScrollView,TouchableOpacity,Image } from 'react-native';
import { HStack, Box, useSafeArea, VStack, Divider,FlatList} from 'native-base';
import {Collapse, CollapseHeader, CollapseBody} from "accordion-collapse-react-native";
import { styles } from '../../assets/css/ecommerce/productStyle';
import ToastHelper from '../Helper/toast';
// import { Toast } from 'native-base';
// import { Alert } from 'react-native';

import config from '../../config/config';
import { MyListWithoutPadding} from '../Blog/detailComponents';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import AwesomeAlert from 'react-native-awesome-alerts';
import HTMLView from 'react-native-htmlview';
import { AsyncStorage } from 'react-native';
import { translate } from 'react-native-translate';
import { ActivityIndicator } from 'react-native-paper';
import ShareAndFav from '../layouts/ShareAndFav';

function ProductDetail({route, navigation })  {
  const {item} = route.params; 
  const [quantity,setQuantit] = useState(1);
  const [bigImg,setBigImg] = useState('');
  const isFocused = useIsFocused();

  const [instock,setInStock] = useState(false);

  const [noOfStock,setNoOfStock] = useState(0);

  const [pdata,setPdata] = useState();

  const baseUrl = config.baseUrl;

  const [show,setShow] = useState(false);


  const [itemData, setItemData] = useState();
  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('item');
      if (value !== null) {
       setItemData(JSON.parse(value))
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  function getDetail() {
    //const api_url = baseUrl + '/api/products/' + id;

    //global.product_id = id;
   let id =  global.product_id;

    //const { id } = route.params; 
    console.log(id);
    console.log(`https://sora-mart.com/api/product/${id}`);
      
    fetch(`https://sora-mart.com/api/product/${id}`)
    .then((response) => response.json())
      .then((data) => {
       
        //setLoading(false);
        setPdata(data.data);
 
        //if(Pdata.get_stocks){
        //  if(Pdata.get_stocks[0].total_stock != null){
        //    setNoOfStock(Pdata.get_stocks[0].total_stock);
        //    setInStock(true);
        //  }           
        //}else{
        //  setInStock(false);
        //}
        setInStock(true);
      }) .catch((error) => {
        console.log(error);
    });
  
 
 


    //axios.get(api_url)
    //    .then(response => {  
    //      setData(response.data.data);
    //      if(response.data.data.get_stocks){
    //        if(response.data.data.get_stocks[0].total_stock != null){
    //          setNoOfStock(response.data.data.get_stocks[0].total_stock);
    //          setInStock(true);
    //        }           
    //      }else{
    //        setInStock(false);
    //      }
    //    })    
    //    .catch((error) => {
    //        console.log(error);
    //    });
      //
      //console.log('get details ------------------');
      //console.log(data);
  }

  useEffect(() => {
    //retrieveData();
    getDetail();
  }, []);
  
  const safeAreaProps = useSafeArea({
    safeAreaTop: true,
    pt: 2
  });

  const AddToCartAction = () => {
    if(global.user && global.user !== '' && global.user !== null){
      const myData = {
        "product_id": data.id,
        "quantity": quantity,
      }
      const cart_url = baseUrl + '/api/carts';
      const headers = { 
        'Accept': 'application/json', 
        'Authorization' : 'Bearer '+ global.auth,
      }
      axios.post(cart_url, myData, { headers })
        .then(response => {
          // alert(response.data.data.desc); 
          // console.log(response.data.data.desc);
          showAlert();
        })    
        .catch((error) => {
          console.log(error);
        }); 
        getDetail(item.id);
    }else{
        StoreData(item, quantity);
    }
    
  }

  const StoreData = async (data, quantity) => {
    let items = data;
    items.quantity = quantity;
    items.guid = data.id;
    let updatedItem = [];
    if(itemData) {
     updatedItem = [...itemData, items];
     console.log("updatedItem", updatedItem)
    } else {
      updatedItem.push(items);
      console.log("updatedItem",updatedItem)
    }
    try {
      await AsyncStorage.setItem(
        'item',
        JSON.stringify(updatedItem)
      );
      // AsyncStorage.clear();
      showAlert();
    } catch (error) {
    }
  };

  const minusAction = () => {

    let qty = quantity - 1;

    if(qty > 0){
      setQuantit(qty);
      if(noOfStock){
        if(noOfStock - qty >= 0 ){
          setInStock(true);
        }else{
          setInStock(false);
          console.log('instock is false');
        }
      }else{
        setInStock(false);
      }
    }else{
      ToastHelper.toast('at least 1 item need to be choosed', null, 'error');
      // alert('at least 1 item need to be choosed');
    }
  }

  const plusAction = () => {
    // setNoOfStock(noOfStock - 1);
    setQuantit(quantity + 1);
    if(noOfStock){
      if(noOfStock - quantity > 0 ){
        setInStock(true);
        console.log(quantity);
        console.log(noOfStock);
      }else{
        setInStock(false);
        console.log('out of stock');
      }
    }else{
      setInStock(false);
    }
    
  }

  const showAlert = () => {
    setShow(true);
  };

  const hideAlert = () => {
    setShow(false);
  };

  const goToCart = () => {
    hideAlert();
    navigation.replace('Cart');
  }

  const continueShopping = () => {
    hideAlert();
    navigation.replace('Home');
  }  

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity onPress={() => setBigImg(item.image_url)}>
        <Image alt="product img" source={{ uri: config.imageUrl + '/' + item.image_url }} style={styles.productImg} resizeMode='contain'/>
      </TouchableOpacity>
    )
  }

  
  return (
    <Box {...safeAreaProps} style={styles.containerPush}>
    
    <Box m={3}>
      <ScrollView>
        <VStack mb={5}>
            <HStack space={2} alignItems='center' justifyContent='space-evenly'>
              <Box style={styles.productImgBox} w='20%' justifyContent='center'> 
                <Text>{pdata && pdata.name}</Text>
                    {/* <FlatList
                          data={item.product_pictures}
                          renderItem={renderItem}
                          keyExtractor={item => item.guid}
                      /> */}
                      {/*{item.product_picture.map((picture) => 
                        <TouchableOpacity key={picture.guid}  onPress={() => setBigImg(picture.image)}>
                          <Image alt="product img" source={{ uri: config.imageUrl + '/' + picture.image }} style={styles.productImg} resizeMode='contain'/>
                        </TouchableOpacity>
                      )}*/}
                </Box>
                {/*{item.product_picture.length !== 0 && (
                  <Box style={styles.productImgBox} justifyContent='center' alignItems='center'>
                  {
                    bigImg == '' ? <Image resizeMode='contain' source={{uri : config.imageUrl + '/' + item.product_picture[0].image}} alt="product img" style={styles.productImgMain}/>
                    : <Image source={{uri : config.imageUrl + '/' + bigImg}} alt="product.png" style={styles.productImgMain}/>
                  }
                  </Box>
                )}  */}
               
            </HStack> 
            {pdata == null ? <ActivityIndicator color="red"/> : 
            <>         
              
            <HStack my={4} justifyContent="space-between" alignItems="center">
                <VStack>
                  <Text style={[styles.productTitle, {fontFamily: 'Inter_700Bold'}]}>{pdata && pdata.name} </Text>
                  {instock? <Text style={{color:'#EC1C24',fontFamily:'Inter_700Bold'}}>instock</Text> : <Text style={{color:'#EC1C24',fontFamily:'Inter_700Bold'}}>out of stock</Text>}
                </VStack>
                <Box style={styles.productStatus}><Text style={[{fontFamily: 'Inter_600SemiBold'},styles.productStatusText]}>Used</Text></Box>
            </HStack>            
            <View>
              <HStack justifyContent='space-between' alignContent='center' my={4}>
                  <Box style={styles.itemCount}>
                  <HStack justifyContent='space-evenly' alignItems='center'>
                  <TouchableOpacity onPress={minusAction} p={10} style={styles.mpButton}>
                      <Image source={require('../../assets/image/png_icons/minus3x.png')}  alt='decrese item' style={{width:10,height:10}} resizeMode='contain'/>
                  </TouchableOpacity>
                  <Text textAlign='center' fontSize='14' style={{fontFamily: 'Inter_600SemiBold'}}>{quantity}</Text>
                  <TouchableOpacity onPress={plusAction} p={10} style={styles.mpButton}>
                    <Image source={require('../../assets/image/png_icons/plus3x.png')}  alt='increse item' style={{width:10,height:10}} resizeMode='contain'/>
                  </TouchableOpacity> 
                  </HStack>
                  </Box>
                  <Box>
                  {pdata.price &&
                    <HStack justifyContent='space-evenly' alignItems='center'>
                    {/* <Text style={[styles.priceMMK, {fontFamily: 'Inter_500Medium'}]}>MMK</Text>    
                    <Text style={[styles.price, {fontFamily: 'Inter_700Bold'}]}>{data && data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>     */}
                    <Text style={[styles.priceMMK, {fontFamily: 'Inter_500Medium'}]}>JPY</Text>    
                    <Text style={[styles.price, {fontFamily: 'Inter_700Bold'}]}>{pdata.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text> 
                    {/* <Text style={[styles.priceDiscount, {fontFamily: 'Inter_500Medium'}]}>{data.product_discounts.amount}</Text>     */}
                  </HStack>
                  }
                  
                  {
                  pdata.price_mm &&
                    <HStack justifyContent='space-evenly' alignItems='center'>
                      {/* <Text style={[styles.priceMMK, {fontFamily: 'Inter_500Medium'}]}>MMK</Text>    
                      <Text style={[styles.price, {fontFamily: 'Inter_700Bold'}]}>{data && data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>     */}
                      <Text style={[styles.priceMMK, {fontFamily: 'Inter_500Medium'}]}>MMK</Text>    
                      <Text style={[styles.price, {fontFamily: 'Inter_700Bold'}]}>{pdata.price_mm.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                      {/* <Text style={[styles.priceDiscount, {fontFamily: 'Inter_500Medium'}]}>{data.product_discounts.amount}</Text>     */}
                    </HStack>
                  }
                  </Box>                                             
              </HStack>
          </View>
          </>
            }
        </VStack>
        <VStack>
        {pdata && pdata.description != undefined ?
          <HTMLView value={pdata.description} /> : <Text></Text> 
        }
        </VStack>
      
      <Box style={styles.buttonPosition}>
        {instock ? 
          <TouchableOpacity
              style={styles.button}
              onPress={() => AddToCartAction()}
              ><Text style={[styles.buttonText, {fontFamily: 'Inter_700Bold'}]}>{translate('addtocart')}</Text>
          </TouchableOpacity > : 
          <TouchableOpacity
              style={styles.outOfStockButton}
              onPress={() => alert('Sorry, this item is out of stock.') }
              ><Text style={[styles.buttonText, {fontFamily: 'Inter_700Bold'}]}>{translate('addtocart')}</Text>
          </TouchableOpacity >
        }
        
        <AwesomeAlert
          show={show}
          showProgress={false}
          title={translate('success')}
          message={translate('itemadded')}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          // extraData={extra}
          cancelText={translate('continueshopping')}
          confirmText={translate('gotocart')}
          confirmButtonColor="#EC1C24"
          confirmButtonStyle={styles.btn}
          cancelButtonColor='#EC1C24'
          cancelButtonStyle={styles.btn}
          titleStyle={styles.alertTitle}
          messageStyle={styles.alertMsg}
          contentContainerStyle={styles.alertContainer}
          onCancelPressed={() => {
            continueShopping();
          }}
          onConfirmPressed={() => {
            goToCart();
          }}
        />
      </Box>
      </ScrollView>
      </Box>  
      {/* <Toast /> */}
    </Box>
    );
    }

export default ProductDetail;