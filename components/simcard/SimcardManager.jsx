import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Constants from 'expo-constants';
import { AntDesign } from '@expo/vector-icons';
import AddnumberModal from './AddnumberModal';




const NumberBox =(props)=>{
  return(
     <View style={styles.numberboxcontainer}>
              <Text>{props.phnumber}</Text>
              <TouchableOpacity onPress={()=> props.navigation.navigate("Sim Card")}>
                <View style={styles.commonsmallbutton}>
                  <Text style={{color:'white'}}>Details</Text>
                </View>
              </TouchableOpacity>
            </View>
  )
}

const DeadNumberBox =()=>{
  return(
     <View style={styles.skeletonnumberboxcontainer}>
              <Text>Empty Card Slot</Text>
            </View>
  )
}

export default function SimcardManager({ navigation }) {
  const [createshow, setCreateShow] = React.useState(false);
  const [phlist, setPhlist] = React.useState();
  const [createevent, setCreateEvent] = React.useState(false);
  React.useEffect(async() => {
    await fetch(`https://sora-mart.com/api/sim-info-list`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: global.auth,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status == 200) {
         console.log(data.data)
          setPhlist(data.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [createevent])
  
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.row}>
          <TouchableOpacity onPress={()=> setCreateShow(true)}>
            <View style={styles.commonbutton}>
            <AntDesign name="pluscircleo" size={24} color="white" style={{marginRight: 10}} />
            <Text style={{color:'white'}}>Add New Card</Text></View>
          </TouchableOpacity>
        </View>

        <Text style={styles.paragraph}>You can add sim cards up to 5.</Text>

        <View style={styles.boxcontainer}>
          <View style={styles.headerbar}>
            <Text style={{color:'white'}}>Your Sim Cards</Text>
          </View>

          <View style={styles.insideboxcontainer}>
           
            {
              phlist && phlist.map(phnum => 
                 (
                <NumberBox navigation={navigation} phnumber={phnum.phone} key={phnum.guid} />
                
               
                ))
            }
           
{/*           
           <DeadNumberBox/>
           <DeadNumberBox/>
            <DeadNumberBox/>*/}

           
          </View>
        </View>
      </View>
      <AddnumberModal
        isOpen={createshow}
        onClose={() => setCreateShow(false)} handleCreate={()=> setCreateEvent(!createevent) } />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8
  },

  row: {
    display: 'flex',
    flexDirection: 'row',
    padding: 2,
    justifyContent: 'flex-start',
    width: '100%',
  },
  commonbutton: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    backgroundColor: '#EC1C24',
    color: 'white',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },

 
  numberboxcontainer: {
    width: '100%',
    padding: 8,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 5,
  },
  commonsmallbutton: {
    padding: 8,
    backgroundColor: '#EC1C24',
    color: 'white',
    textAlign: 'center',
  },

  headerbar: {
    width: '100%',
    padding: 18,
    backgroundColor: '#0CADE8',
    color: 'white',
    textAlign: 'left',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    
  },

  boxcontainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    borderWidth: 2,
    borderColor:  '#0CADE8',
    borderRadius: 10,
  },

  insideboxcontainer: {
    padding: 8,
  },

  skeletonnumberboxcontainer: {
    width: '100%',
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: 'gray',
    borderRadius: 10,
    marginBottom: 5,
    borderStyle: 'dashed',
    borderWidth: 2,
  },
  paragraph:{
   
    padding: 15,
  }
});
