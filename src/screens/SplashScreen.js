
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import ImageLoader from '../components/ImageLoader';
import AsyncStorage from "@react-native-community/async-storage";

export default class SplashScreen extends Component {
    componentDidMount() {
        AsyncStorage.getItem('token').then(token => {
            if (token) {
                setTimeout(() => {
                    this.props.navigation.navigate('Home');
                }, 2000);
            } else {
                setTimeout(() => {
                    this.props.navigation.navigate('OnBoard');
                }, 2000);
            }
        });
    }
    render() {
        return (
            <View style={styles.container}>
                <ImageLoader
                    style={styles.image}
                    source={require('../assets/onboard.png')}
                />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 300,
        height: 300,
        borderRadius: 10,
    },
});