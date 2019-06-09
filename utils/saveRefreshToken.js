import { AsyncStorage } from 'react-native';

export default (refreshToken) => AsyncStorage.setItem('refreshToken', refreshToken);
