import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Button, TouchableOpacity, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Communications from 'react-native-communications';
import COLORS from '../consts/colors';
import { SecondaryButton } from '../components/Button';
import { CheckBox } from 'react-native-elements';

const initiateWhatsAppSMS = () => {
  // Using 91 for India
  // You can change 91 with your country code
  let url =
    'whatsapp://send?text=hi venkat reddy&phone=91 8790010929';
  Linking.openURL(url)
    .then((data) => {
      console.log('WhatsApp Opened');
    })
    .catch(() => {
      alert('Make sure Whatsapp installed on your device');
    });
};


const CustomerDetailScreen = ({ navigation, route }) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.profileContainer}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={navigation.goBack}>
            <Icon name="arrow-back" size={30} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={styles.imageContainer}>
          <Image source={require('../assets/pic.jpeg')} style={styles.imageStyle} />
        </View>
        <View style={styles.addressContainer}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#fff' }}>Venkat Reddy</Text>
          <Text style={{ fontSize: 14, color: '#fff' }}>45th cross, Jayanagar, Bangalore.</Text>
        </View>
        <View bottomProfileContainer>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={
              () => Communications.phonecall('8790010929', true)
            }>
            <Icon name="ios-call" size={23} color="#fff" />
            <Text style={{ color: '#fff', fontSize: 18, marginLeft: 5, justifyContent: 'center', alignSelf: 'center', }} >
              +91 87900 10929
                        </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonStyle} onPress={() => initiateWhatsAppSMS()} >
            <Icon name="logo-whatsapp" size={23} color="#fff" />
            <Text style={{ color: '#fff', fontSize: 18, marginLeft: 5, justifyContent: 'center', alignSelf: 'center', }} >
              +91 91823 87725
                        </Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={styles.checkboxContaine}>
        <Text style={styles.mainHeading}>Required Documents</Text>
        <View style={{ flex: 1, alignItems: 'center' }}>
          {/* <CheckBox
            center
            title='Click Here'
            checkedIcon='dot-circle-o'
            uncheckedIcon='circle-o'
            style={{ width: '95%' }}
          />
          <CheckBox
            title='Click Here'
            checked=""
            style={styles.checkbox}
          /> */}
          {/* <CheckBox
            checkedIcon={<Image source={require('../assets/checked.png')} style={{width:10, height:10 }} />}
            uncheckedIcon={<Image source={require('../assets/unchecked.png')} style={{width:10, height:10 }} />}
            
          /> */}
        </View>
        {/* <View style={{ marginTop: 40, marginBottom: 40 }}>
          <SecondaryButton title="Submit" onPress={() => navigation.navigate('SingleCustomer')} />
        </View> */}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  profileContainer: {
    backgroundColor: COLORS.primary,
    height: '47%',
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
  checkbox:{
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

  }

});
export default CustomerDetailScreen;