import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../consts/colors';
import {View} from 'react-native';
import HomeScreen from '../screens/HomeScreen';

import CustomersListScreen from '../screens/CustomersListScreen';
import CustomerDetailScreen from '../screens/CustomerDetailScreen';



import OldListScreen from '../screens/OldListScreen';
import EmployeeProfileScreen from '../screens/EmployeeProfileScreen';


const Stack = createStackNavigator();

const InnerStack = () => {
  return (
    <Stack.Navigator  screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="CustomerList" component={CustomersListScreen} />
      <Stack.Screen name="SingleCustomer" component={CustomerDetailScreen} />
    </Stack.Navigator>
  );
};

const Tab = createBottomTabNavigator();

const MainNav = () => {  
  return (
    <Tab.Navigator
      tabBarOptions={{
        style: {
          height: 55,
          borderTopWidth: 0,
          elevation: 0,
        },
        showLabel: false,
        activeTintColor: COLORS.primary,
      }}>
      <Tab.Screen
        name="Home"
        component={InnerStack}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="home-filled" color={color} size={28} />
          ),
        }}
      />
      
      <Tab.Screen
        name="OldList"
        component={OldListScreen}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="folder-shared" color={color} size={28} />
          ),
        }}
      />
      <Tab.Screen
        name="MyProfile"
        component={EmployeeProfileScreen}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="person" color={color} size={28} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainNav;
