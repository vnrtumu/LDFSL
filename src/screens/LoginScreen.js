import React, {useState, useEffect} from 'react';
import { SafeAreaView, StyleSheet, View, Text, Image, TextInput, BackHandler} from 'react-native';

import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../consts/colors';
import { SecondaryButton } from '../components/Button';
import { sub } from 'react-native-reanimated';
import axios from 'axios';
import AsyncStorage from "@react-native-community/async-storage";
import config from '../config';

const LoginScreen = ({ navigation, route }) => {
  //setting initial state 
  const [email, setEmail] = useState('banana');
  const [password, setPassword] = useState('');

  useEffect( () => {
    BackHandler.addEventListener('hardwareBackPress', () => true);
  }, []);

  const handleEmaiChange = (val) => {
    setEmail(val)
  }

  const handlePasswordChange = (val) => {
    setPassword(val);
  }

  const loginHandle = () => {
      axios.post(`${config.API_URL}/login`, {email, password})
            .then((response)=> {

                console.log(response.message);
                // AsyncStorage.setItem('token', response.data.success.token);
                // AsyncStorage.setItem('name', response.data.success.name);
                // AsyncStorage.setItem('email', response.data.success.email);
                // AsyncStorage.setItem('user_id', JSON.stringify(response.data.success.user_id));
                // navigation.navigate('Home');
            })
            .catch(error => console.error(`Error: ${error}`));
  }

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white }}>
      <View style={style.header}>
        <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} />
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Agent Login</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: 280,
          }}>
          <Image source={require('../assets/onboard.png')} style={{ height: 220, width: 220 }} />
        </View>
        <View style={style.details}>
          <View>
            <Text style={{ fontSize: 27, fontWeight: 'bold', color: COLORS.dark }}>
              Welcome Back,
            </Text>
            <Text style={{ fontSize: 19, fontWeight: 'bold', color: COLORS.light }}>
              Sign in to continue
            </Text>
          </View>
          <View style={{ marginTop: 20 }}>
            <View style={style.inputContainer}>
              <Icon
                name="mail-outline"
                color={COLORS.light}
                size={20}
                style={style.inputIcon}
              />
              <TextInput 
                placeholder="Email" 
                placeholderTextColor = {COLORS.light} 
                style={style.input}
                autoCapitalize="none"
                onChangeText={(val) => handleEmaiChange(val)}
              />
            </View>
            <View style={style.inputContainer}>
              <Icon
                name="lock-outline"
                color={COLORS.light}
                size={20}
                style={style.inputIcon}
              />
              <TextInput
                placeholder="Password"
                style={style.input}
                secureTextEntry
                placeholderTextColor = {COLORS.light}
                onChangeText={(val) => handlePasswordChange(val)}
              />
            </View>


            <View style={{ marginTop: 40, marginBottom: 40 }}>
              <SecondaryButton title="Login To LDFSL" onPress={() => loginHandle()} />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  header: {
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  details: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 60,
    backgroundColor: COLORS.primary,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },
  iconContainer: {
    backgroundColor: COLORS.white,
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  detailsText: {
    marginTop: 10,
    lineHeight: 22,
    fontSize: 16,
    color: COLORS.white,
  },
  inputContainer: {flexDirection: 'row', marginTop: 20},
  inputIcon: {marginTop: 15, position: 'absolute'},
  input: {
    color: "#fff",
    paddingLeft: 30,
    borderBottomWidth: 1,
    borderColor: COLORS.light,
    borderBottomWidth: 0.5,
    flex: 1,
    fontSize: 18,
  },
});

export default LoginScreen;
