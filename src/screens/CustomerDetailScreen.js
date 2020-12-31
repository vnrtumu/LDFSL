import * as React from 'react';
import { Text, View, SafeAreaView, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../consts/colors';

const CustomerDetailScreen = ({ navigation, route }) => {
  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white }}>
      <View style={style.header}>
        <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} />
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Single Customer Details</Text>
      </View>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  header: {
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
  },
});



export default CustomerDetailScreen;