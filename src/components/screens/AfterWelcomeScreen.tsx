import React, {Component} from 'react';
// import {StyleSheet } from 'react-native';
import MainTabNavigator from '../navigation/MainTabNavigator';

type AfterWelcomeScreenProps = {
    navigation: any;
}

class AfterWelcomeScreen extends Component<AfterWelcomeScreenProps> {
    static router = MainTabNavigator.router;

    render() {
        return (
            <MainTabNavigator navigation={this.props.navigation}/>
        );
    }
}

// const styles = StyleSheet.create({
//     container: {
//         flex           : 1,
//         backgroundColor: '#fff',
//     },
// });

export default AfterWelcomeScreen;
