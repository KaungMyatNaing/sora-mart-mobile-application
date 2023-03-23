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

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const [atr, setAtr] = useState();
  const [atr2, setAtr2] = useState();
  const [atrclick, setAtrClick] = useState();


  const [itemData, setItemData] = useState();
  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('item');
      if (value !== null) {
        setItemData(JSON.parse(value));
        console.log(itemData);
        
        
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  function getDetail() {
    //const api_url = baseUrl + '/api/products/' + id;

    //global.product_id = id;
    setLoading(true);
    let id = global.product_id;

    //const { id } = route.params; 
    console.log(id);
    console.log(`https://sora-mart.com/api/product/${id}`);
      
    fetch(`https://sora-mart.com/api/product/${id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.status == 200) {
          setLoading(false);
        
          if (data.data !== undefined) {
            if (data.data.stock !== null || undefined) {
             
              setNoOfStock(data.data.stock);
              setInStock(true);
             
            }
            else {
              setInStock(false);
            }
          
          }

          setPdata(data.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
        
  }

  useEffect(() => {
    //retrieveData();
    getDetail();

  }, []);
  
  const safeAreaProps = useSafeArea({
    safeAreaTop: true,
    pt: 2
  });

  const AddToCartAction = async () => {
   
   
    //if(global.user && global.user !== '' && global.user !== null){
      const myData = {
        "product_id": atr ? atr : pdata.id,
        "name": pdata.name,
        "quantity": quantity,
        "price": pdata.price,
        "max": pdata.stock,
        "m_point": pdata.point,
        "p_attribute" : atrclick ? atrclick : 'Standard'
    }
    
    console.log(myData);
    const value = await AsyncStorage.getItem('item');

    if (value !== null) {
      const jj = JSON.parse(value);
      const checkProductExist = jj.filter((jo) => jo.product_id == myData.product_id);
      if (checkProductExist.length > 0) {
      
        const prevProductCopy = jj.filter((jo) => jo.product_id != myData.product_id);
        jj.map(i => i.product_id == myData.product_id ? i.quantity += myData.quantity : null)
        await AsyncStorage.setItem(
          'item',
          JSON.stringify(jj));
          console.log('condition 1')
        showAlert();
      }
      if (checkProductExist.length == 0) {
        const buggy = [...jj, myData]
     
        await AsyncStorage.setItem(
          'item',
          JSON.stringify(buggy));
        console.log('condition 2');
        showAlert();
      } 

    }
    else {
      const gg = [myData];
      await AsyncStorage.setItem(
        'item',
        JSON.stringify(gg))
      console.log('condition 3')
      showAlert();
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
      retrieveData();
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

//  const whiteButton = ({item}) => {
//    const [click, setClick] = useState(false);
//    return (
//      <TouchableOpacity onPress={()=> setClick(!click)}>
//      <View style={{ backgroundColor: item.value, width: 35, height: 35, borderRadius: 35, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//        {click ?  <View style={{backgroundColor: 'white',width: 20, height: 20,borderRadius: 20,}}></View>  : null}
//  </View>
//</TouchableOpacity>
//    )
//  }

  
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
                    {instock ? <Text style={{ color: '#EC1C24', fontFamily: 'Inter_700Bold' }}>instock</Text> : <Text style={{ color: '#EC1C24', fontFamily: 'Inter_700Bold' }}>out of stock</Text>}
                    <HStack space={2} my={3}>
                      {pdata.product_attribute.length > 0 ?  
                        pdata.product_attribute.map((item, index) => (
                          item.name == 'color' ?
                        
                            <TouchableOpacity onPress={() => { setAtrClick(item.value);  setAtr(item.product_attrbute_value_id);} }>
                              <View style={{ backgroundColor: item.value, width: 35, height: 35, borderRadius: 35, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                {atrclick == item.value ?  <View style={{backgroundColor: 'white',width: 20, height: 20,borderRadius: 20,}}></View>  : null}
                          </View>
                        </TouchableOpacity>
                      :
                        <TouchableOpacity onPress={() => { setAtrClick(item.value);  setAtr(item.product_attrbute_value_id);} }>
                          <Text style={{padding: 10,borderWidth: atrclick == item.value ? 4 : 2}}>{item.value}</Text>
                        </TouchableOpacity>
                      
                    
                        ))
                        :
                        null
                       
                      }
                    </HStack>
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
                onPress={() => { pdata.product_attribute.length > 0 && atr == undefined ? console.log('You')  : AddToCartAction() }}
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