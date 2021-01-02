import React, { useState } from 'react';
import { View, Text, Button, Image, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import COLORS from '../consts/colors';

import HomeScreen from "../screens/HomeScreen";
import LoginScreen from '../screens/LoginScreen';
import OnBoardScreen from '../screens/OnBoardScreen';
import MainNav from './MainNav';
import SplashScreen from '../screens/SplashScreen';

import axios from 'axios';
import AsyncStorage from "@react-native-community/async-storage";

const Stack = createStackNavigator();

function AuthNav() {
    const [token, setToken] = useState('')
    AsyncStorage.getItem('token').then(token => {
        if (token) {
            setToken(token)
        }
    });
    return (
        <NavigationContainer>
            <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
            <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Splash" component={SplashScreen} />
                <Stack.Screen name="OnBoard" component={OnBoardScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Home" component={MainNav} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AuthNav;
