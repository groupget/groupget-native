import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';

import GroupsList from '../groups/GroupsList';

export default class GroupsScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    render() {

        return (
            <SafeAreaView style={ styles.container }>
                        <GroupsList navigation={this.props.navigation}/>
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
