import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  TextInput,
} from "react-native";
import Constants from "expo-constants";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";

const dumbdata = [
  {
    id: 1,
    type: "callin",
    ph: "+95786785435",
    date: "21/3/23 10:30AM",
  },
  {
    id: 2,
    type: "callout",
    ph: "+95786785435",
    date: "21/3/23 10:30AM",
  },
  {
    id: 3,
    type: "callin",
    ph: "+95786785435",
    date: "21/3/23 10:30AM",
  },
  {
    id: 1,
    type: "callin",
    ph: "+95786785435",
    date: "21/3/23 10:30AM",
  },
  {
    id: 2,
    type: "callout",
    ph: "+95786785435",
    date: "21/3/23 10:30AM",
  },
  {
    id: 3,
    type: "callin",
    ph: "+95786785435",
    date: "21/3/23 10:30AM",
  },
];

const renderItemCall = ({ item }) => {
  return (
    <View
      style={{
        diplay: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        padding: 6,
        marginBottom: 8,
        backgroundColor: "#F3F3F3",
      }}
    >
      {item.type == "callin" ? (
        <SimpleLineIcons name="call-in" size={24} color="black" />
      ) : (
        <SimpleLineIcons name="call-out" size={24} color="black" />
      )}
      {item.ph ? <Text>{item.ph}</Text> : <Text>UFO</Text>}
      {item.date ? <Text>{item.date}</Text> : <Text>???</Text>}
    </View>
  );
};

export default function SimCard() {
  const [tab, setTab] = React.useState(0);
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          backgroundColor: "#F5EEFF",
          diplay: "flex",
          width: "95%",
          justifyContent: "space-between",
          flexDirection: "row",
          padding: 5,
          height: "15%",
          alignItems: "center",
          borderWidth: 2,
          borderColor: "#EEEBEF",
          marginBottom: 5,
          borderRadius: 10
        }}
      >
        <Text style={{ fontWeight: "bold" }}>Your Data Plan</Text>
        <View>
          <Text style={{ fontWeight: "bold", color: "#1E00AD",fontSize:18 }}>
            Blazing Fast Plan
          </Text>
          {/*<Text style={{fontWeight:'bold',color:'#1E00AD',fontSize:'2rem'}}>1GB</Text>*/}
        </View>
      </View>

      <View
        style={{
          backgroundColor: "#F5EEFF",
          diplay: "flex",
          width: "95%",
          justifyContent: "space-between",
          flexDirection: "row",
          padding: 5,
          height: "15%",
          alignItems: "center",
          borderWidth: 2,
          borderColor: "#EEEBEF",
          marginBottom: 5,
          borderRadius: 10
        }}
      >
        <Text style={{ fontWeight: "bold" }}>Balance</Text>
        <View>
          <Text style={{fontWeight:'bold',color:'red',fontSize:14}}>500MB/<Text style={{fontWeight:'bold',color:'#1E00AD',fontSize:25}}>1GB</Text></Text>
        </View>
      </View>

      <Text>Your Option</Text>
      <View
        style={{ width: "95%", flexDirection: "row", justifyContent: "center" }}
      >
        <View
          style={{
            width: "28.55%",
            borderWidth: tab == 1 ? 2 : null,
            padding: 4,
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
            borderColor: "#EEEBEF",
            backgroundColor: tab == 1 ? null : "#9952FC",
            marginRight: 5,
            borderRadius: 10
          }}
        >
          <TouchableOpacity onPress={() => setTab(1)}>
            <AntDesign
              name="pluscircleo"
              size={20}
              color={tab == 1 ? "black" : "white"}
            />
            <Text style={{ color: tab == 1 ? "black" : "white" }}>
              Add Plan
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            width: "28.55%",
            borderWidth: tab == 2 ? 2 : null,
            padding: 4,
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
            borderColor: "#EEEBEF",
            backgroundColor: tab == 2 ? null : "#9952FC",
            marginRight: 5,
            borderRadius: 10
          }}
        >
          <TouchableOpacity onPress={() => setTab(2)}>
            <Feather
              name="phone-call"
              size={20}
              color={tab == 2 ? "black" : "white"}
            />
            <Text style={{ color: tab == 2 ? "black" : "white" }}>
              Call Logs
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            width: "28.55%",
            borderWidth: tab == 3 ? 2 : null,
            padding: 4,
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
            borderColor: "#EEEBEF",
            backgroundColor: tab == 3 ? null : "#9952FC",
            borderRadius: 10
          }}
        >
          <TouchableOpacity onPress={() => setTab(3)}>
            <Feather
              name="info"
              size={24}
              color={tab == 3 ? "black" : "white"}
            />
            <Text style={{ color: tab == 3 ? "black" : "white" }}>
              Card Info
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ width: "95%", display: "flex", justifyContent: "center" }}>
        {tab == 2 ? (
          <View>
            
            <TextInput
              placeholder="Search"
              style={{ padding: 4, marginBottom: 10, border: "none" }}
            />
            <FlatList data={dumbdata} renderItem={renderItemCall} />
          </View>
        ) : null}
        {tab == 3 ? (
          <View
            style={{
              borderWidth: 2,
              borderColor: "#EEEBEF",
              padding: 2,
              marginTop: 5,
              minHeight: 350,
            }}
          >
            <Text style={{ width: "100%", textAlign: "center" }}>
              Card Info
            </Text>
            <Text>Card Number : 098766757</Text>
            <Text>Random Information : I don't know</Text>
            <Text>Card Number : 098766757</Text>
            <Text>Random Information : I don't know</Text>
            <Text>Card Number : 098766757</Text>
            <Text>Random Information : I don't know</Text>
          </View>
        ) : null}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "white",
    alignItems: "center",
    padding: 8,
    fontFamily:'Inter_400Regular',
    fontSize:14,
    
  
  },
});
