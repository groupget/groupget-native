import React, { Component } from 'react';
import { SafeAreaView, Text } from 'react-native';

class WelcomeScreen extends Component {
    static navigationOptions = {
        header: null,
    };

    render() {
        return (
            <SafeAreaView>
                <Text>Welcome!</Text>
            </SafeAreaView>
        );
    }
}

export default WelcomeScreen;
