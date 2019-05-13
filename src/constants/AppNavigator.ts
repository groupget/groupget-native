import {createAppContainer, createStackNavigator} from 'react-navigation';

import SignInScreen from '../components/screens/SignInScreen';
import SignUpScreen from '../components/screens/SignUpScreen';
import WelcomeScreen from '../components/screens/WelcomeScreen';
import AfterWelcomeScreen from '../components/screens/AfterWelcomeScreen';


const AppNavigator = createStackNavigator({
    SignIn: {
        screen: SignInScreen,
        navigationOptions: {
            header: null,
        },
    },
    SignUp: {
        screen: SignUpScreen,
        navigationOptions: {
            header: null,
        },
    },
    Welcome: {
        screen: WelcomeScreen,
        navigationOptions: {
            header: null,
        },
    },
    Home: {
        screen: AfterWelcomeScreen,
        navigationOptions: {
            header: null,
        },
    }
}, {
    initialRouteName: 'SignIn',
});

export const AppContainer = createAppContainer(AppNavigator);
