import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, Image, Button, TouchableHighlight, TouchableOpacity, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Communications from 'react-native-communications';
import COLORS from '../consts/colors';
import { PrimaryButton } from '../components/Button';
import CheckBox from "@react-native-community/checkbox";
import PTRView from 'react-native-pull-to-refresh';

import axios from 'axios';
import AsyncStorage from "@react-native-community/async-storage";

class CustomerDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      documents: [],
      isLoading: true,
      ProfileName: '',
      checkSelected: [],
      customer: [],
      getSelectedDocs: '',
    };
  }

  _refresh = () => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 2000);
    });
  };

  componentDidMount() {
    const custData = this.props.route.params;
    var url = "http://loandarbar.in/api/custreqdocs";
    const customerdetails = {
      cust_id: custData.cust_id,
      ap_type_id: custData.appointmenttype_id,
      occupation_id: custData.occupation_id
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
            this.setState({ documents: res.data.success });
          })
          .catch(error => console.error(`Error: ${error}`));
      }
    });
  }

  initiateWhatsAppSMS = () => {
    // Using 91 for India
    // You can change 91 with your country code
    const custData = this.props.route.params;
    const custName = custData.cust_name;
    const Address = custData.cust_address;
    const phone = custData.cust_phone;
    const msg = "Hi" + `${custName}` + ", My name is venkat reddy from LDFSL. Plaese share your current location to this whatsapp number.";

    let url = 'whatsapp://send?text=' + `${msg}` + '&phone=91 ' + `${phone}`;
    Linking.openURL(url)
      .then((data) => {
        console.log('WhatsApp Opened');
      })
      .catch(() => {
        alert('Make sure Whatsapp installed on your device');
      });
  };

  onchecked(id) {
    const documents = this.state.documents;
    const index = documents.findIndex(x => x.id === id);
    documents[index].checked = !documents[index].checked;
    this.setState(documents)
  }

  getSelectedDocs() {
    var keys = this.state.documents.map((t) => t.id);
    var checks = this.state.documents.map((t) => t.checked);
    var Selected = [];
    var lengthDOc = checks.length
    for (var i = 0; i < lengthDOc; i++) {
      if (checks[i] == true) {
        Selected.push(keys[i])
      }
    }
    if (Selected.length > 0) {
      const custData = this.props.route.params;
      var url = "http://loandarbar.in/api/submitapplication";
      const submitDetails = {
        doc_ids: Selected.join(','),
        cust_id: custData.cust_id,
        ap_type_id: custData.appointmenttype_id,
        occupation_id: custData.occupation_id,
        appointment_id: custData.appointment_id,
      };
      AsyncStorage.getItem('token').then(token => {
        if (token) {
          axios
            .post(`${url}`, submitDetails, {
              headers: {
                Authorization: 'Bearer ' + token,
              },
            })
            .then(res => {
              console.log(res);
            })
            .catch(error => console.error(`Error: ${error}`));
        }
      });
    } else {
      alert("please Any Doc then only submit");
    }
  }

  renderDocuments() {
    return this.state.documents.map((document, id) => {
      return (
        <TouchableHighlight
          underlayColor={COLORS.white}
          activeOpacity={0.9} onPress={() => { this.onchecked(document.id) }} key={id} >
          <View style={styles.cartCard}>
            <View
              style={{
                height: 100,
                marginLeft: 10,
                paddingVertical: 20,
                flex: 1,
                justifyContent: 'center',
              }}>
              <Text style={{ fontWeight: 'bold', fontSize: 15 }}>{document.doc_name}({document.type_of_doc}) {document.checked}</Text>
            </View>
            <View style={{ marginRight: 20, alignItems: 'center' }}>
              <CheckBox value={document.checked} onValueChange={() => { this.onchecked(document.id) }} />
            </View>
          </View>
        </TouchableHighlight>
      );
    })

  };



  render() {

    const custData = this.props.route.params;
    const custName = custData.cust_name;
    const Address = custData.cust_address;
    const phone = custData.cust_phone;

    return (

      <View style={styles.mainContainer}>
        <View style={styles.profileContainer}>
          <View style={styles.headerContainer}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" size={30} color="#fff" />
            </TouchableOpacity>
          </View>
          <View style={styles.imageContainer}>
            <Image source={require('../assets/pic.jpeg')} style={styles.imageStyle} />
          </View>
          <View style={styles.addressContainer}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#fff' }}>{custName}</Text>
            <Text style={{ fontSize: 14, color: '#fff' }}>{Address}</Text>
          </View>
          <View bottomProfileContainer>
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={
                () => Communications.phonecall(`${phone}`, true)
              }>
              <Icon name="ios-call" size={23} color="#fff" />
              <Text style={{ color: '#fff', fontSize: 18, marginLeft: 5, justifyContent: 'center', alignSelf: 'center', }} >
                {phone}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonStyle} onPress={() => this.initiateWhatsAppSMS()} >
              <Icon name="logo-whatsapp" size={23} color="#fff" />
              <Text style={{ color: '#fff', fontSize: 18, marginLeft: 5, justifyContent: 'center', alignSelf: 'center', }} >
                {phone}
              </Text>

            </TouchableOpacity>
          </View>
        </View>


        <ScrollView>
          <PTRView onRefresh={this._refresh}>
            {this.renderDocuments()}
            <View style={{ margin: 30 }}>
              <PrimaryButton  title="Submit" onPress={() => { this.getSelectedDocs() }} />
            </View>
          </PTRView>
        </ScrollView>
      </View>

    );
  }
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
    // borderRightColor: '#fff',
    // borderRightWidth: 2,
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

