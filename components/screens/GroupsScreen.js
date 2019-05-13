import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import GroupView from '../groups/GroupView';

export default class GroupsScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={styles.container}>
        <GroupView/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
});
