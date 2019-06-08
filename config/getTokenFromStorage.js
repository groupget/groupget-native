import {AsyncStorage} from 'react-native';

export default function getTokenFromLocalStorage(tokenPostfix) {
    for (let i = 0; i < AsyncStorage.length; i++) {
        let key = AsyncStorage.key(i);
        if (key.startsWith('CognitoIdentityServiceProvider') && key.endsWith(tokenPostfix)) {
            return AsyncStorage.getItem(key);
        }
    }
}
