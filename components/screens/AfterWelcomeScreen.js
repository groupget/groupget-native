import React, { Component } from 'react';
import { Platform, StatusBar, View, StyleSheet } from 'react-native';
import AppNavigator from '../navigation/AppNavigator';
import MainTabNavigator from '../navigation/MainTabNavigator';

class AfterWelcomeScreen extends Component {
    static router = MainTabNavigator.router;
    render() {
        return (
            <MainTabNavigator navigation={this.props.navigation}/>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex           : 1,
        backgroundColor: '#fff',
    },
});

export default AfterWelcomeScreen;
