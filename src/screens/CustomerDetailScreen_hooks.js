import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Button, SafeAreaView, TouchableOpacity, FlatList, TouchableHighlight, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Communications from 'react-native-communications';
import COLORS from '../consts/colors';
import { PrimaryButton } from '../components/Button';

import axios from 'axios';
import AsyncStorage from "@react-native-community/async-storage";
import { CheckBox } from 'react-native-elements'
import SelectMultiple from 'react-native-select-multiple';
// import { Checkbox } from 'react-native-paper';



const initiateWhatsAppSMS = (customer) => {
  // Using 91 for India
  // You can change 91 with your country code
  const msg = "Hi" + `${customer.cust_name}` + ", My name is venkat reddy from LDFSL. Plaese share your current location to this whatsapp number.";

  let url =
    'whatsapp://send?text=' + `${msg}` + '&phone=91 ' + `${customer.cust_phone}`;
  Linking.openURL(url)
    .then((data) => {
      console.log('WhatsApp Opened');
    })
    .catch(() => {
      alert('Make sure Whatsapp installed on your device');
    });
};





const CustomerDetailScreen = ({ navigation, route }) => {
  const customer = route.params;
  const [checked, setChecked] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [docs, setDocs] = useState([]);


  const toggleCheckbox = (id) => {
    const index = documents.findIndex(x => x.id === id)

    console.log(index);
    // documents[index].checked =  !documents[index].checked;
    // const checkboxes = Object.assign({}, documents, index);
    // setDocs({ checkboxes });
  }

  const checkbox = () =>{
    <Checkbox
          status={checked ? 'checked' : 'unchecked'}
          onPress={() => {
            setChecked(!checked);
          }}
        />
  }


  useEffect(() => {
    var url = "http://loandarbar.in/api/custreqdocs";
    const customerdetails = {
      cust_id: customer.cust_id,
      ap_type_id: customer.appointmenttype_id,
      occupation_id: customer.occupation_id
    };
    AsyncStorage.getItem('token').then(token => {
      if (token) {
        axios
          .post(`${url}`, customerdetails, {
            headers: {
              Authorization: 'Bearer ' + token,
            },
          })
          .then(res => {
            setDocuments(res.data.success);
          })
          .catch(error => console.error(`Error: ${error}`));
      }
    });
  }, []);


  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.profileContainer}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={navigation.goBack}>
            <Icon name="arrow-back" size={30} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={styles.imageContainer}>
          <Image source={require('../assets/avatar.png')} style={styles.imageStyle} />
        </View>
        <View style={styles.addressContainer}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#fff' }}>{customer.cust_name}</Text>
          <Text style={{ fontSize: 14, color: '#fff' }}>{customer.cust_address}</Text>
        </View>
        <View bottomProfileContainer>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={
              () => Communications.phonecall(`${customer.cust_phone}`, true)
            }>
            <Icon name="ios-call" size={23} color="#fff" />
            <Text style={{ color: '#fff', fontSize: 18, marginLeft: 5, justifyContent: 'center', alignSelf: 'center', }} >
              {customer.cust_phone}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonStyle} onPress={() => initiateWhatsAppSMS(customer)} >
            <Icon name="logo-whatsapp" size={23} color="#fff" />
            <Text style={{ color: '#fff', fontSize: 18, marginLeft: 5, justifyContent: 'center', alignSelf: 'center', }} >
              {customer.cust_phone}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView>
        <Text style={styles.mainHeading}>List Of Documents</Text>

        {
          documents.length > 0 &&
            documents.map(document => (
              <View>
                
                <Text>{document.doc_name}</Text>
                <CheckBox
                  
                  key={document.id}
                  onValueChange={value =>
                    this.setState(state => {
                      const index = state.documents.findIndex(
                        x => x.id === document.id
                      );
                      return {
                        documents: [
                          ...documents.slice(0, index),
                          { id: document.id, label: document.doc_name, value },
                          ...documents.slice(index+1),
                        ],
                      };
                    })
                  }
                  value={document.value}
                  key={document.id}
                />
              </View>
            ))
        }



        <PrimaryButton title="Submit" onPress={() => navigation.navigate('Home')} />
      </ScrollView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  profileContainer: {
    backgroundColor: COLORS.primary,
    height: '49%',
    alignItems: 'center',
  },
  headerContainer: {
    backgroundColor: COLORS.primary,
    height: 40,
    marginTop: 10,
    marginLeft: 10,
    alignSelf: 'flex-start',
  },
  imageContainer: {
    width: 128,
    height: 128,
    borderRadius: 64,
    borderWidth: 2,
    borderColor: 'grey',
    marginLeft: 10,
    opacity: 0.9,
    padding: 2,
    alignContent: 'center',
  },
  imageStyle: {
    borderRadius: 60,
    width: 120,
    height: 120,
  },
  checkbox: {
    alignSelf: 'stretch',
  },
  addressContainer: {
    marginTop: 10,
    alignItems: 'center'
  },
  bottomProfileContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginTop: 15,
    marginBottom: 15,
  },
  buttonStyle: {
    marginTop: 10,
    flexDirection: 'row',
    paddingRight: 10,
  },
  checkboxContaine: {
    flex: 4,
    backgroundColor: 'white',
    paddingLeft: 15,
    paddingRight: 15,
  },
  checkbox: {
    alignSelf: 'flex-start',
  },
  mainHeading: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 10,
  },
  submitBtn: {
    marginTop: 20,
    backgroundColor: '#15549a',
    padding: 10,
    justifyContent: 'center',
    alignContent: 'center',
    width: '50%',
    alignItems: 'center',
    borderRadius: 10,
  },
  btntext: {
    color: 'white',
    fontSize: 22,

  },
  cartCard: {

    height: 60,
    width: '90%',
    elevation: 5,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    marginVertical: 10,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },

});
export default CustomerDetailScreen;