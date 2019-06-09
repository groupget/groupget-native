import React from 'react';
// import { AsyncStorage } from 'react-native';
import Amplify from "aws-amplify";
import { AppLoading, Asset, Font, Icon } from 'expo';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation';
import { Root } from 'native-base';

import SignInScreen from './components/screens/SignInScreen';
import SignUpScreen from './components/screens/SignUpScreen';
import WelcomeScreen from './components/screens/WelcomeScreen';
import AfterWelcomeScreen from './components/screens/AfterWelcomeScreen';
import ListItemsScreen from './components/screens/ListItemsScreen';
import GroupScreen from './components/screens/GroupScreen';
import { Provider } from 'react-redux';
import store from './config/store';
import config from './config/cognitoConfig';


Amplify.configure({
    Auth: {
        mandatorySignIn: true,
        region: config.cognito.REGION,
        userPoolId: config.cognito.USER_POOL_ID,
        userPoolWebClientId: config.cognito.APP_CLIENT_ID
    }
});

const AppNavigator = createStackNavigator({
    SignIn   : {
        screen           : SignInScreen,
        navigationOptions: {
            header: null,
        },
    },
    SignUp   : {
        screen           : SignUpScreen,
        navigationOptions: {
            header: null,
        },
    },
    Welcome  : {
        screen           : WelcomeScreen,
        navigationOptions: {
            header: null,
        },
    },
    Groups   : {
        screen           : AfterWelcomeScreen,
        navigationOptions: {
            header: null,
        },
    },
    ListItems: {
        screen: ListItemsScreen,
    },
    Group    : {
        screen: GroupScreen,
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
        name             : '',
        isLoadingComplete: false,
    };

    async componentWillMount() {
        // const data = await AsyncStorage.init();
        // console.log('AsyncStorage is ready!', data);
    }

    componentDidMount() {
        this._loadResourcesAsync();
    }

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
                    <Provider store={ store }>
                        <MyContext.Provider
                            value={ {
                                name   : this.state.name,
                                setName: this.setName,
                            } }
                        >
                            <AppContainer/>
                        </MyContext.Provider>
                    </Provider>
                </Root>
            );
        }
    }

    setName = newName => {
        this.setState({ name: newName });
    };

    _loadResourcesAsync = async () => {
        return Promise.all([
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
}


export default App;
