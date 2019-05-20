import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';

import GroupView from '../groups/GroupView';

export default class GroupScreen extends React.Component {

    state = {
        selectedGroupIndex: -1
    };

    render() {

        return (
            <SafeAreaView style={ styles.container }>
                <GroupView navigation={ this.props.navigation }/>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex           : 1,
        backgroundColor: '#fff',
    }
});
