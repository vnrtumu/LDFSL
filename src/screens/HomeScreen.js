import React, { useState, useEffect, useCallback } from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  BackHandler,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import {
  FlatList,
  ScrollView,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../consts/colors';

import axios from 'axios';
import AsyncStorage from "@react-native-community/async-storage";

const { width } = Dimensions.get('screen');
const cardWidth = width / 2 - 20;

const wait = (timeout) => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);

  });
}



const HomeScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [userId, setUserId] = useState('');
  const [types, setTypes] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  const refreshScreen = () => {
    var url = "http://loandarbar.in/api/typeofappointments";
    AsyncStorage.getItem('token').then(token => {
      if (token) {
        axios.get(`${url}`, {
          headers: { Authorization: 'Bearer ' + token },
        })
          .then(res => {
            setLoading(false);
            setTypes(res.data.success)
          })
          .catch(error => console.error(`Error: ${error}`));
      }
    });
  };

  const onRefresh = useCallback(() => {
    refreshScreen();
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  }, []);

  AsyncStorage.getItem('name').then(name => {
    if (name) {
      setName(name);
    }
  });
  AsyncStorage.getItem('user_id').then(user_id => {
    if (user_id) {
      setUserId(user_id);
    }
  });

  useEffect(() => {
    refreshScreen();
  }, []);

  const Card = ({ type }) => {
    return (
      <TouchableHighlight
        underlayColor={COLORS.white}
        activeOpacity={0.9}
        onPress={() => navigation.navigate('CustomerList', type)} >
        <View style={style.card} >
          <View style={{ marginHorizontal: 20 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', zIndex: 1, }}>{type.type_name}</Text>
          </View>
          <View
            style={{
              marginTop: 10,
              marginHorizontal: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
              {type.count}
            </Text>
            <View style={style.addToCartBtn}>
              <Icon name="chevron-right" size={20} color={COLORS.white} />
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  };

  if (loading) {
    return (
        <View
          style={{
            flex: 1,
            padding: 20,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#fff',
          }}>
          <ActivityIndicator size={'large'} />
          <Text>Loding...</Text>
        </View>
    );
  } else {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
        <ScrollView
          contentContainerStyle={style.scrollView}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View style={style.header}>
            <View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontSize: 22 }}>Hello,</Text>
                <Text style={{ fontSize: 25, fontWeight: 'bold', marginLeft: 10 }}>
                  {name}
                </Text>
              </View>
              <Text style={{ marginTop: 5, fontSize: 22, color: COLORS.grey }}>
                These are your appointments
            </Text>
            </View>
            <Image
              source={require('../assets/pic.jpeg')}
              style={{ height: 50, width: 50, borderRadius: 25 }}
            />
          </View>
          <FlatList
            showsVerticalScrollIndicator={false}
            numColumns={2}
            data={types}
            keyExtractor={(item, index) => item.type_id}
            renderItem={({ item }) => <Card type={item}
            />}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }

};

const style = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  header: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  sortBtn: {
    width: 50,
    height: 50,
    marginLeft: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  card: {
    height: 150,
    justifyContent: 'center',
    width: cardWidth,
    marginHorizontal: 10,
    marginBottom: 10,
    marginTop: 20,
    borderRadius: 15,
    elevation: 8,
    backgroundColor: COLORS.white,
  },
  addToCartBtn: {
    height: 30,
    width: 30,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
