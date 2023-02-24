import React, { useState, useEffect } from "react";
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
import config from "../../config/config";
import axios from "axios";
import { AsyncStorage } from "react-native";
import { useIsFocused } from "@react-navigation/native"; // for re-render
import ToastHelper from "../Helper/toast";
import Toast from "react-native-toast-message";
import * as Google from "expo-auth-session/providers/google";
import * as Facebook from "expo-auth-session/providers/facebook";

function Signin({ navigation }) {
  const isFocused = useIsFocused(); // for re-render

  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  const [passwordVisible, setPasswordVisible] = useState(true);

  const baseUrl = config.baseUrl + "/login";

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId:
      "273668258967-2iekt3pd15bbf3gtv6v8lnnr5msou0th.apps.googleusercontent.com",
    iosClientId:
      "273668258967-mmdckgsc40gr14fg21dgeaqf00i7657g.apps.googleusercontent.com",
    androidClientId:
      "273668258967-71oolug6chi470oiu3inrvfli9f5eeak.apps.googleusercontent.com",
    webClientId:
      "273668258967-fmhi8ga230lp0gbhgqpo6bdo9lp12ps9.apps.googleusercontent.com",
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      if (authentication != null) {
        axios
          .get(
            "https://www.googleapis.com/oauth2/v3/userinfo?access_token=" +
              authentication.accessToken
          )
          .then(function (response) {
            const userDetails = response.data;
            const userName = userDetails.name;
            const authemail = userDetails.email;
            const authpassword = "123456";
            const gender = "";
            const dob = "";
            const role = 0;

            const signUpData = {
              username: userName,
              email: authemail,
              password: authpassword,
              gender: gender,
              dob: dob,
              role: role,
            };

            console.log("========== sign up data is ==============");
            console.log(signUpData);
            const headers = {
              Accept: "application/json",
            };
            axios
              .post(config.baseUrl + "/api/createAccount", signUpData, {
                headers,
              })
              .then((response) => {
                console.log(response.data.status_code);
                if (response.data.status_code === 200) {
                  console.log(response);
                  setEmail(authemail);
                  setPass(authpassword);
                  loginAction();
                  // global.forceLoginMsg = '';
                  // global.auth = response.data.data.token;
                  // global.user = signUpData;
                  // AsyncStorage.setItem( "userEmail", email);
                  // AsyncStorage.setItem( "userPassword", password);
                  // navigation.replace('Drawer');
                }
              })
              .catch((error) => {
                ToastHelper.toast("Email is already existed", null, "error");
                // alert(error);
                console.log("create account is error");
                console.log(error);
              });
          });
        // navigation.replace('Drawer');
      }
    }
  }, [response]);

  const [fbrequest, fbresponse, fbpromptAsync] = Facebook.useAuthRequest({
    clientId: "1009075826688366",
  });

  useEffect(() => {
    if (fbresponse?.type === "success") {
      const { authentication } = fbresponse;
      if (authentication != null) {
        axios
          .get(
            "https://graph.facebook.com/v14.0/me?fields=id,name,birthday,email,gender&access_token=" +
              authentication.accessToken
          )
          .then(function (response) {
            const userDetails = response.data;
            console.log("user details fb is");
            console.log(userDetails);
            const userName = userDetails.name;
            const authemail = userDetails.email;
            const authpassword = "123456";
            const gender = "";
            const dob = "";
            const role = 0;
            if (userDetails.gender) {
              gender = userDetails.gender;
            }

            if (userDetails.birthday) {
              birthday = userDetails.birthday;
            }

            const signUpData = {
              username: userName,
              email: authemail,
              password: authpassword,
              gender: gender,
              dob: dob,
              role: role,
            };

            const newsignUpData = {
              fullname: userName,
              email: authemail,
              password: authpassword,
            };

            console.log("========== sign up data is ==============");
            console.log(signUpData);
            const headers = {
              Accept: "application/json",
            };
            axios
              .post(config.baseUrl + "/register", newsignUpData, { headers })
              .then((response) => {
                console.log(response.data.status_code);
                if (response.data.status_code === 200) {
                  console.log(response);
                  setEmail(authemail);
                  setPass(authpassword);
                  loginAction();
                  // global.forceLoginMsg = '';
                  // global.auth = response.data.data.token;
                  // global.user = signUpData;
                  // AsyncStorage.setItem( "userEmail", authemail);
                  // AsyncStorage.setItem( "userPassword", password);
                  // navigation.replace('Drawer');
                }
              })
              .catch((error) => {
                ToastHelper.toast("Email is already existed", null, "error");
                // alert(error);
                console.log("create account is error");
                console.log(error);
              });
          });
        // navigation.replace('Drawer');
      }
    } else {
      console.log("not success login fb");
      console.log(fbresponse);
    }
  }, [fbresponse]);

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
    const data = { email: email, password: password };

    fetch("https://sora-mart.com/api/login", {
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
              global.auth = data.token;
            navigation.replace('Home');
          }
          if (data.message == "Please verify your account!") {
              
              console.log("move to verify screen")
              navigation.replace('Verified Code',{email:email});
          }
      })
        .catch((error) => {
        ToastHelper.toast('User name or password is incorrect');
       
      });
  }

  function debugloginAction() {
  const data = { email: 'cowmyatnaing2000@gmail.com', password: '11111111' };

  fetch("https://sora-mart.com/api/login", {
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
            global.auth = data.token;
          navigation.replace('Home');
        }
        if (data.message == "Please verify your account!") {
            
            console.log("move to verify screen")
            navigation.replace('Verified Code',{email:email});
        }
    })
      .catch((error) => {
      ToastHelper.toast('User name or password is incorrect');
     
    });
}

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
      <Toast />
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
                "http://demo.myanmarwebc6.sg-host.com/password-reset"
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
            style={styles.signInBtn}
            arialLabel="Sign In"
            onPress={loginAction}
          >
            <Text style={styles.signInBtnlabel}>SIGN IN</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.signInBtn}
            arialLabel="Debug Login"
            onPress={debugloginAction}
          >
            <Text style={styles.signInBtnlabel}>Debug Login</Text>
          </TouchableOpacity>
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
        <Box width="100%" justifyContent="center" alignItems="center">
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
        </Box>
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
