import React, { useState, useEffect, useCallback } from 'react';
import { SafeAreaView, StyleSheet, View, Text, Image, TouchableHighlight, ScrollView, TouchableOpacity, RefreshControl, } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../consts/colors';
import Communications from 'react-native-communications';

import axios from 'axios';
import AsyncStorage from "@react-native-community/async-storage";
import config from '../config';

const wait = (timeout) => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}


const CustomersListScreen = ({ navigation, route }) => {
  const item = route.params;
  const [customers, setCustomers] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(1).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    const type = {
      typeId: item.type_id,
    };
    AsyncStorage.getItem('token').then(token => {
      if (token) {
        axios
          .post(`${config.API_URL}/appointments`, type, {
            headers: {
              Authorization: 'Bearer ' + token,
            },
          })
          .then(res => {
            setCustomers(res.data.success);
          })
          .catch(error => console.error(`Error: ${error}`));
      }
    });
  }, []);

  const CartCard = ({ customer }) => {
    return (
      <TouchableHighlight
        underlayColor={COLORS.white}
        activeOpacity={0.9}
        onPress={() => navigation.navigate('SingleCustomer', customer)} >
        <View style={style.cartCard}>
          <Image source={require('../assets/avatar.png')} style={{ height: 80, width: 80 }} />
          <View
            style={{
              height: 100,
              marginLeft: 10,
              paddingVertical: 20,
              flex: 1,
              justifyContent: 'center',
            }}>
            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{customer.cust_name}</Text>
            <Text style={{ fontSize: 16, marginTop: 5, color: "skyblue" }}>{customer.appointment_date} {customer.time_slot}</Text>
          </View>
          <View style={{ marginRight: 20, alignItems: 'center' }}>
            <View>
              <TouchableOpacity onPress={
                () => Communications.phonecall(`${customer.cust_phone}`, true)
              }>
                <Text style={{ fontSize: 18, color: COLORS.primary }}>Call</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  };
  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <ScrollView
        contentContainerStyle={style.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={style.header}>
          <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} />
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{item.type_name}</Text>
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 80 }}
          data={customers}
          keyExtractor={(item, index) => item.cust_id.toString()}
          renderItem={({ item }) => <CartCard customer={item} />}
          ListFooterComponentStyle={{ paddingHorizontal: 20, marginTop: 20 }}
        />

      </ScrollView>
    </SafeAreaView>
  );
};
const style = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  header: {
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  cartCard: {
    height: 100,
    elevation: 15,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    marginVertical: 10,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionBtn: {
    width: 60,
    height: 40,
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 30,
    paddingHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
  },
});

export default CustomersListScreen;

