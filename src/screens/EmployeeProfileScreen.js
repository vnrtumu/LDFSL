import React, {  useState,useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  ActivityIndicator,
  BackHandler,
} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import COLORS from '../consts/colors';
import axios from 'axios';
import AsyncStorage from "@react-native-community/async-storage";
import { PrimaryButton } from '../components/Button';
import config from '../config';

const EmployeeProfileScreen = ({navigation}) => {

  const[name, setName] = useState('');

  AsyncStorage.getItem('name').then(name => {
    if (name) {
      setName(name);
    }
  });
  logoutHandle = () => {
    AsyncStorage.clear();
    navigation.navigate('Login');
  };
  return (
    <ScrollView
      style={styles.mainContainer}
      showsVerticalScrollIndicator={false}>
      <View style={styles.prrileContainer}>
        <View style={styles.photoContainer}>
          <Image
            source={require('../assets/pic.jpeg')}
            style={styles.profileImg}
          />
          <View style={styles.uploadIconContainer}>
            <TouchableOpacity >
              <Fontisto
                name="camera"
                size={25}
                color="#15549a"
                style={styles.uploadIcon}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.textStyle}>{name}</Text>
        </View>
      </View>
      <View style={styles.settingsContainer}>
          <PrimaryButton title="Log Out" onPress={() => logoutHandle()} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  prrileContainer: {
    height: 260,
    width: '100%',
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  photoContainer: {
    backgroundColor: 'white',
    width: 120,
    height: 120,
    borderRadius: 60,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 28,
  },
  profileImg: {
    height: 120,
    width: 120,
    borderRadius: 60,
    position: 'absolute',
  },
  nameContainer: {
    marginTop: 175,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    alignSelf: 'center',
  },
  uploadIconContainer: {
    marginTop: 90,
    marginLeft: 90,
    height: 40,
    width: 40,
    borderRadius: 50,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  uploadIcon: {
    color: 'black',
    alignSelf: 'center',
  },
  textStyle: {
    textAlign: 'center',
    fontSize: 20,
    fontStyle: 'italic',
    color: 'white',
    alignSelf: 'center',
  },
  locationTextStyle: {
    textAlign: 'center',
    fontSize: 15,
    color: 'white',
    alignSelf: 'center',
  },
  settingsContainer: {
    marginVertical: 25,
    marginHorizontal: 20,
  },
  cardOptions: {
    marginVertical: 10,
    padding: 8,
  },
});


export default EmployeeProfileScreen;