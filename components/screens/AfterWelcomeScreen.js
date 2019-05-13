import React, { Component } from 'react';
import MainTabNavigator from '../navigation/MainTabNavigator';

class AfterWelcomeScreen extends Component {
    static router = MainTabNavigator.router;
    render() {
        return (
            <MainTabNavigator navigation={this.props.navigation}/>
        );
    }
}

export default AfterWelcomeScreen;
