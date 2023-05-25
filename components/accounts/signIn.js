import React, { useState, useEffect } from "react";
import config from "../../config/config";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Linking,
} from "react-native";
import { TextInput } from "react-native-paper";
import { Box, HStack, useSafeArea, VStack, Image, Checkbox } from "native-base";
import { styles } from "../../assets/css/accounts/signInStyle";

import axios from "axios";
import { AsyncStorage } from "react-native";
import { useIsFocused } from "@react-navigation/native"; // for re-render
//import ToastHelper from "../Helper/toast";
import Toast from "react-native-toast-message";


import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";


WebBrowser.maybeCompleteAuthSession();

function Signin({ navigation }) {
  const isFocused = useIsFocused(); // for re-render

  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [token, setToken] = useState("");
  const [userInfo, setUserInfo] = useState(null);

  const [passwordVisible, setPasswordVisible] = useState(true);

  const baseUrl = config.baseUrl + "/login";
  const [btnlock, setBtnLock] = useState(false);

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId : '909600335154-lrdspml0hk3kcnter5037qrfn7e348kp.apps.googleusercontent.com',
    androidClientId: "909600335154-hn4p2e6vhfsctud9q03urg9n3dive1qn.apps.googleusercontent.com",

  });
  useEffect(async() => {
    if (response?.type === "success") {
    // setToken(response.authentication.accessToken);
    console.log("say something"+response.authentication.accessToken)
      try {
       
      const response2 = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${response.authentication.accessToken}` },
        }
      );

      const user = await response2.json();
      setUserInfo(user);
      console.log(user);
      
        
       await fetch(`https://sora-mart.com/api/google/login?google_id=${user.id}&fullname=${user.name}`, {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
       
        }).
        then(d => d.json()).then(
          data => {
            global.auth = data.token;
            //navigation.push('Home');
            navigation.push('Drawer');
        }
      ).catch(err => console.log(err))
    } catch (error) {
      console.log(error)
      // Add your own error handler here
      alert("Error Happen.")
    }
    }
  }, [response]);
  
  const getUserInfo = async () => {
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const user = await response.json();
      setUserInfo(user);
      console.log(user);
      
        
       await fetch(`https://sora-mart.com/api/google/login?google_id=${user.id}&fullname=${user.name}`, {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
       
        }).
        then(d => d.json()).then(
          data => {
            global.auth = data.token;
            //navigation.push('Home');
            navigation.push('Drawer');
        }
      ).catch(err => console.log(err))
    } catch (error) {
      console.log(error)
      // Add your own error handler here
      alert("Error Happen.")
    }
  };


  

 

  const getData = async () => {
    try {
      const data = await AsyncStorage.getItem("userEmail");
      const data2 = await AsyncStorage.getItem("userPassword");
      if (data !== null && data2 !== null) {
        setUser(data);
        setPass(data2);
        console.log("user data ");
        console.log(data);
        console.log("user data2");
        console.log(data2);
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
    if (user != "" && pass != "") {
      navigation.replace("Drawer");
    }
  }, [isFocused]);

  function loginAction() {
    setBtnLock(true);
             
    const data = { email: email, password: password };

    fetch(`https://sora-mart.com/api/login`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
          console.log("Success:", data);
        if (data.status == 200) {
          setBtnLock(false);
             
          Toast.show({
            position: 'top',
            type: 'info',
            text1: "You are now logged in."
        })
              global.auth = data.token;
          //navigation.push('Home');
          navigation.push('Drawer');
          }
          if (data.message == "Please verify your account!") {
            setBtnLock(false);
             
              console.log("move to verify screen")
              navigation.replace('Verified Code',{email:email});
        }
        if (data.status == 400) {
          setBtnLock(false);
             
          Toast.show({
            position: 'top',
            type: 'error',
            text1: "Email or password is incorrect."
        })
      }
        
      })
      .catch((error) => {
        setBtnLock(false);
             
          Toast.show({
            position: 'top',
            type: 'error',
            text1: "Email or password is incorrect."
        })
       
      });
  }

//  function debugloginAction() {
//  const data = { email: 'cowmyatnaing2000@gmail.com', password: '11111111' };
//
//  fetch("https://sora-mart.com/api/login", {
//    method: "POST", // or 'PUT'
//    headers: {
//      "Content-Type": "application/json",
//    },
//    body: JSON.stringify(data),
//  })
//    .then((response) => response.json())
//    .then((data) => {
//        console.log("Success:", data);
//        if (data.status == 200) {
//          global.auth = data.token;
//          AsyncStorage.setItem("login", data.token);
//          console.log("Login has been set to async storage.")
//          //
//          navigation.push('Drawer');
//        }
//        if (data.message == "Please verify your account!") {
//            
//          console.log("move to verify screen")
//          Toast.show({
//            position: 'top',
//            type: 'info',
//            text1: "Please verify your account."
//        })
//            navigation.replace('Verified Code',{email:email});
//        }
//    })
//      .catch((error) => {
//     
//        Toast.show({
//          position: 'top',
//          type: 'error',
//          text1: "Email or password is incorrect."
//      })
//     
//    });
//}

  const safeAreaProps = useSafeArea({
    safeAreaTop: true,
    pt: 2,
  });

  const forgotPwd = () => {
    ToastHelper.toast("forgot pwd", null, "error");
    // alert('forgot pwd');
  };

  return (
    // <SafeAreaView style={{backgroundColor:'#FFF'}} height="100%">
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ backgroundColor: "#FFF" }}
      height="100%"
    >
        <Toast ref={(ref) => {Toast.setRef(ref)} } />
      <VStack px="4" pt="4" justifyContent="center" alignItems="center">
        {global.forceLoginMsg != "" && (
          <Text style={styles.forceLoginMsg}>{global.forceLoginMsg}</Text>
        )}
        <Box width="100%">
          <Text style={[styles.header, { fontFamily: "Inter_700Bold" }]}>
            Sign in
          </Text>
          <Text style={[styles.signP, { fontFamily: "Inter_400Regular" }]}>
            Welcome back, New products are arriving!
          </Text>
        </Box>
        <Box width="100%" mt="10">
          <TextInput
            theme={{
              colors: { primary: "#EC1C24", underlineColor: "transparent" },
            }}
            style={[styles.TextInput, { fontFamily: "Inter_400Regular" }]}
            value={email}
            onChangeText={(value) => setEmail(value)}
            placeholder="Mobile number or email"
            selectionColor="#EC1C24"
            arialLabel="Your mail"
          />
          <TextInput
            theme={{
              colors: { primary: "#EC1C24", underlineColor: "transparent" },
            }}
            style={[styles.TextInput, { fontFamily: "Inter_400Regular" }]}
            value={password}
            onChangeText={(value) => setPassword(value)}
            placeholder="Password"
            selectionColor="#EC1C24"
            arialLabel="Your password"
            secureTextEntry={passwordVisible}
            right={
              <TextInput.Icon
                name={passwordVisible ? "eye" : "eye-off"}
                onPress={() => setPasswordVisible(!passwordVisible)}
              />
            }
          />
        </Box>
        <HStack width="100%" justifyContent="space-between" alignItems="center">
          <HStack>
            {/* <Checkbox 
                    style={[styles.checkBox, { fontFamily: 'Inter_400Regular'}]} 
                    value={rememberMe} arialLabel='Remember' colorScheme='red'
                    onChangeText={setRememberMe}
                    /><Text style={{fontFamily: 'Inter_400Regular'}}>Remember me</Text> */}
          </HStack>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL(
                "https://sora-mart.com/password-reset"
              )
            }
            style={[styles.forgotContainer, { fontFamily: "Inter_400Regular" }]}
            arialLabel="forgot password"
          >
            <Text style={{ fontFamily: "Inter_400Regular", color: "#EC1C24" }}>
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </HStack>
        <Box width="100%" mt="16" justifyContent="center" alignItems="center">
          <TouchableOpacity
           style={btnlock ? styles.signInBtnOff : styles.signInBtn} 
            arialLabel="Sign In"
            onPress={loginAction}
          >
            <Text style={styles.signInBtnlabel}>SIGN IN</Text>
          </TouchableOpacity>

          {/*<TouchableOpacity
            style={styles.signInBtn}
            arialLabel="Debug Login"
            onPress={debugloginAction}
          >
            <Text style={styles.signInBtnlabel}>Debug Login</Text>
          </TouchableOpacity>*/}
        </Box>
        <Box my="5" justifyContent="center">
          <Text
            style={[styles.signInOrLabel, { fontFamily: "Inter_500Medium" }]}
          >
            or
          </Text>
        </Box>
        <Box width="100%" justifyContent="center" alignItems="center">
          <TouchableOpacity
            style={[styles.signInWithGM, { fontFamily: "Inter_500Medium" }]}
            onPress={() => {
           
              promptAsync();
            }}
          >
            <View
              style={[styles.signInLabel, { fontFamily: "Inter_500Medium" }]}
            >
              <Image
                style={[styles.gmLogo]}
                source={require("../../assets/image/gmLogo.png")}
                alt="google login"
                resizeMode="contain"
              />
              <Text style={[styles.gmLabel, { fontFamily: "Inter_500Medium" }]}>
                Continue with Google
              </Text>
            </View>
          </TouchableOpacity>
        </Box>
        {/*<Box width="100%" justifyContent="center" alignItems="center">
          <TouchableOpacity
            style={[styles.signInWithFb, { fontFamily: "Inter_500Medium" }]}
            arialLabel="Continue with facebook"
            onPress={() => {
              fbpromptAsync();
            }}
          >
            <View
              style={[styles.signInLabel, { fontFamily: "Inter_500Medium" }]}
            >
              <Image
                style={[styles.fbLogo]}
                source={require("../../assets/image/fbLogo.png")}
                alt="facebook login"
                resizeMode="contain"
              />
              <Text style={[styles.fbLabel, { fontFamily: "Inter_500Medium" }]}>
                Continue with Facebook
              </Text>
            </View>
          </TouchableOpacity>
        </Box>*/}
        <HStack
          width="100%"
          justifyContent="center"
          alignItems="center"
          mt="10"
          mb="10"
        >
          <Text style={[styles.alertMsg, { fontFamily: "Inter_500Medium" }]}>
            {" "}
            Don't have an account?
          </Text>
          <TouchableOpacity
            arial-label="Sign Up"
            onPress={() => navigation.navigate("Sign Up")}
          >
            <Text style={[styles.link, { fontFamily: "Inter_500Medium" }]}>
              {" "}
              Sign up
            </Text>
          </TouchableOpacity>
        </HStack>
      </VStack>
    </ScrollView>
  );
}
export default Signin;
