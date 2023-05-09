import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Box,
  FlatList,
  HStack,
  VStack,
  Text,
  Divider,
  Image,
  Spacer,
  CloseIcon,
} from "native-base";
import { styles } from "../../assets/css/ecommerce/favouriteStyle";
import { TouchableOpacity, View } from "react-native";
import AppLoading from "expo-app-loading";
import config from "../../config/config";
import { useIsFocused } from "@react-navigation/native"; // for re-render
// import ToastManager, { Toast } from 'toastify-react-native';
import {
  useFonts,
  Inter_100Thin,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
} from "@expo-google-fonts/inter";
import ToastHelper from "../Helper/toast";
import { ActivityIndicator } from "react-native-paper";
import { apiGetAuthActionCreator } from "../../backend/ApiActionCreator";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { translate } from "react-native-translate";
import { wishlistStore } from "../store/wishlistStore";

function WishList({ navigation }) {
  //const dispatch = useDispatch();
  //const data  = useSelector((state) => state.apiReducer.data);
  const loading = useSelector((state) => state.apiReducer.loading);
  //const baseUrl = config.baseUrl + '/api/wish-lists';
  const [isDoRemove, setIsDoRemove] = useState(false);

  const isFocused = useIsFocused(); // for re-render
  const [data, setData] = useState();
  const [remove, setRemove] = useState();
  const getWishlist = wishlistStore((state) => state.getWishlist);
  const [currencytype, setCurrencyType] = useState("");

  React.useEffect(() => {
    fetch(`https://sora-mart.com/api/wishlists/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: global.auth,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        let len = data.data.wishlists.length;
        let dumbdata = [];
        for (let i = 0; i < len; i++) {
          dumbdata.push(data.data.wishlists[i].products);
        }
        setData(dumbdata);
        getWishlist();
        console.log(dumbdata);
      })
      .catch((error) => console.log(error));
  }, [remove]);
  React.useEffect(() => {
    getCurrency();
  }, []);

  const unlikeAction = (id) => {
    fetch(`https://sora-mart.com/api/remove-wishlist/${id}`, {
      method: "DELETE", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
        Authorization: global.auth,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status == 200) {
          setRemove(!remove);
          console.log("removed");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const renderListEmptyComponent = () => (
    <View style={styles.noNotification}>
      <Text style={{ textAlign: "center" }}>{translate("noItem")}</Text>
    </View>
  );

  const getCurrency = async () => {
    console.log("I must be actovated");
    try {
      const defaultCurency = await AsyncStorage.getItem("currency");

      if (defaultCurency !== null) {
        setCurrencyType(defaultCurency);
        global.currencyvalue = defaultCurency;
        console.log("default currency has been set" + currencytype);
      } else {
        AsyncStorage.setItem("currency", "one");
        global.currencyvalue = "one";
        console.log(
          "No currecny type is found. JPY is set as default currency."
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const renderItem = ({ item }) => (
    <Box mb="5" justifyContent="center">
      <VStack>
        <HStack justifyContent="space-between" ml={5} mr={5}>
          {/*<Image w={95} h={130} source={{ uri: 'https://sora-mart.com/storage/product_picture/6374b5719d119_photo.png' }} alt='wish list product image' pt='5%' pb='5%' maxW='30%' mr={5} resizeMode='contain' />      */}
          {item.product_picture.length > 0 ? (
            <Image
              w={95}
              h={130}
              source={{
                uri: `https://sora-mart.com/storage/${item.product_picture[0].image}`,
              }}
              alt="wish list product image"
              pt="5%"
              pb="5%"
              maxW="30%"
              mr={5}
              resizeMode="contain"
            />
          ) : (
            <Image
              w={95}
              h={130}
              source={{
                uri: "https://sora-mart.com/storage/product_picture/6374b5719d119_photo.png",
              }}
              alt="wish list product image"
              pt="5%"
              pb="5%"
              maxW="30%"
              mr={5}
              resizeMode="contain"
            />
          )}
          <VStack w="40%" justifyContent="space-between" alignItem="flex-start">
            <TouchableOpacity onPress={() => { navigation.navigate('Product Details', { item: item.id }); global.product_id = item.id; }}>
            <Text
              _dark={{ color: "warmGray.50" }}
              color="coolGray.800"
              style={{ fontFamily: "Inter_500Medium" }}
            >
              {item.name}
            </Text>
            </TouchableOpacity>
          
            <Text color="coolGray.600" _dark={{ color: "warmGray.200" }}>
              #{item.id}
            </Text>
            {/* <Text style={[{fontFamily:'Inter_600SemiBold'},styles.getPoints]} px="2"  _dark={{ color: "warmGray.50"}} color="coolGray.800" alignSelf="flex-start">
                            100 Points
                        </Text> */}
            <Spacer size="5" />

            <HStack>
              <Text
                style={{ fontFamily: "Inter_700Bold" }}
                fontWeight="bold"
                mr="1"
                fontSize="md"
                _dark={{ color: "warmGray.50" }}
                color="coolGray.800"
                alignSelf="flex-start"
              >
                JPY
              </Text>

              <Text
                style={{ fontFamily: "Inter_700Bold" }}
                fontWeight="bold"
                fontSize="md"
                _dark={{ color: "warmGray.50" }}
                color="coolGray.800"
                alignSelf="flex-start"
              >
                {item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </Text>
            </HStack>

            {item.price && item.mm_price ? (
              <HStack>
                <Text
                  style={{ fontFamily: "Inter_700Bold" }}
                  fontWeight="bold"
                  mr="1"
                  fontSize="md"
                  _dark={{ color: "warmGray.50" }}
                  color="coolGray.800"
                  alignSelf="flex-start"
                >
                  {currencytype && currencytype == "one" ? "JPY" : null}
                </Text>
                <Text
                  style={{ fontFamily: "Inter_700Bold" }}
                  fontWeight="bold"
                  mr="1"
                  fontSize="md"
                  _dark={{ color: "warmGray.50" }}
                  color="coolGray.800"
                  alignSelf="flex-start"
                >
                  {currencytype && currencytype == "two" ? "MMK" : null}
                </Text>
                <Text
                  style={{ fontFamily: "Inter_700Bold" }}
                  fontWeight="bold"
                  fontSize="md"
                  _dark={{ color: "warmGray.50" }}
                  color="coolGray.800"
                  alignSelf="flex-start"
                >
                  {currencytype && currencytype == "one"
                    ? item.price
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    : null}
                </Text>
                <Text
                  style={{ fontFamily: "Inter_700Bold" }}
                  fontWeight="bold"
                  fontSize="md"
                  _dark={{ color: "warmGray.50" }}
                  color="coolGray.800"
                  alignSelf="flex-start"
                >
                  {currencytype && currencytype == "two"
                    ? item.mm_price
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    : null}
                </Text>
              </HStack>
            ) : null}
          </VStack>
          <Spacer />
          <VStack
            justifyContent="space-between"
            maxW="20%"
            alignItems="flex-end"
          >
            <TouchableOpacity
              style={styles.closeIcon}
              onPress={() => unlikeAction(item.id)}
            >
              <CloseIcon size="3" />
            </TouchableOpacity>
          </VStack>
        </HStack>
      </VStack>
      <Divider my="2" />
    </Box>
  );

  //const renderItem = ({ item }) => (
  //    <Text>{item.name}</Text>
  //);

  let [fontsLoaded] = useFonts({
    Inter_100Thin,
    Inter_200ExtraLight,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <SafeAreaView style={{ backgroundColor: "#FFF" }}>
      {loading ? (
        <ActivityIndicator color="red" />
      ) : (
        <Box w={{ base: "100%", md: "25%" }} h={{ base: "100%" }}>
          <VStack h={{ base: "100%" }}>
            <HStack>
              <FlatList
                data={data}
                renderItem={renderItem}
                ListEmptyComponent={renderListEmptyComponent}
                keyExtractor={(item) => item.guid}
              />
            </HStack>
          </VStack>
        </Box>
      )}
      {/* <Toast /> */}
    </SafeAreaView>
  );
}

export default WishList;
