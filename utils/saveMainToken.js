import { AsyncStorage } from 'react-native';

export default (mainToken) => AsyncStorage.setItem('mainToken', mainToken);
