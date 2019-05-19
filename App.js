import React from 'react';
import { AppLoading, Asset, Font, Icon } from 'expo';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation';
import { Root } from 'native-base';

import SignInScreen from './components/screens/SignInScreen';
import SignUpScreen from './components/screens/SignUpScreen';
import WelcomeScreen from './components/screens/WelcomeScreen';
import AfterWelcomeScreen from './components/screens/AfterWelcomeScreen';


const AppNavigator = createStackNavigator({
    SignIn : {
        screen           : SignInScreen,
        navigationOptions: {
            header: null,
        },
    },
    SignUp : {
        screen           : SignUpScreen,
        navigationOptions: {
            header: null,
        },
    },
    Welcome: {
        screen           : WelcomeScreen,
        navigationOptions: {
            header: null,
        },
    },
    Groups : {
        screen           : AfterWelcomeScreen,
        navigationOptions: {
            header: null,
        },
    }
}, {
    initialRouteName: 'SignIn',
});

const AppContainer = createAppContainer(AppNavigator);

export const MyContext = React.createContext({
    name: 'Test',
});

class App extends React.Component {
    state = {
        name             : 'unset name',
        isLoadingComplete: false,
    };

    setName = newName => {
        this.setState({ name: newName });
    };

    componentDidMount() {
        this._loadResourcesAsync();
    }

    _loadResourcesAsync = async () => {
        return Promise.all([
            Asset.loadAsync([
                require('./assets/images/robot-dev.png'),
                require('./assets/images/robot-prod.png'),
            ]),
            Font.loadAsync({
                ...Icon.Ionicons.font,
                'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
            }),
        ]);
    };
    _handleLoadingError = error => {
        console.warn(error);
    };

    _handleFinishLoading = () => {
        this.setState({ isLoadingComplete: true });
    };

    render() {
        if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
            return (
                <AppLoading
                    startAsync={ this._loadResourcesAsync }
                    onError={ this._handleLoadingError }
                    onFinish={ this._handleFinishLoading }
                />
            );
        } else {
            return (
                <Root>
                    <MyContext.Provider
                        value={ {
                            name   : this.state.name,
                            setName: this.setName,
                        } }
                    >
                        <AppContainer/>
                    </MyContext.Provider>
                </Root>
            );
        }
    }
}


export default App;
