import * as React from 'react';
import { View, Text, Button, Image, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import COLORS from '../consts/colors';

import HomeScreen from "../screens/HomeScreen";
import LoginScreen from '../screens/LoginScreen';
import OnBoardScreen from '../screens/OnBoardScreen';
import MainNav from './MainNav';

const Stack = createStackNavigator();

function AuthNav() {
    return (
        <NavigationContainer>
            <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
            <Stack.Navigator initialRouteName="OnBoard" screenOptions={{headerShown: false}}>
                <Stack.Screen name="OnBoard" component={OnBoardScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Home" component={MainNav} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AuthNav;
