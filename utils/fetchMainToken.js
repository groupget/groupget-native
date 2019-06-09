import { AsyncStorage } from 'react-native';

export default () => AsyncStorage.getItem('mainToken');
