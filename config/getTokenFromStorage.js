import { AsyncStorage } from 'react-native';

export default async function getTokenFromLocalStorage(tokenPostfix) {
    const keys = await AsyncStorage.getAllKeys();
    keys.forEach(async key => {
        if (key.startsWith('CognitoIdentityServiceProvider') && key.endsWith(tokenPostfix)) {
            return await AsyncStorage.getItem(key);
        }
    })
}
