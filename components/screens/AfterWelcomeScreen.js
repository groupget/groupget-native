import { Platform, StatusBar, View } from 'react-native';
import AppNavigator from '../navigation/AppNavigator';

class AfterWelcomeScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
                <AppNavigator />
            </View>
        );
    }
}

export default AfterWelcomeScreen;
