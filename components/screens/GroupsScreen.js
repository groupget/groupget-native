import React from 'react';
import { StyleSheet, SafeAreaView, Text } from 'react-native';

import GroupsList from '../groups/GroupsList';
import MarginContent from '../common/MarginContent';

export default class GroupsScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    render() {

        return (
            <SafeAreaView style={ styles.container }>
                <MarginContent>
                    <Text style={ {
                        fontSize: 32
                    } }>
                        Groups
                    </Text>
                </MarginContent>
                <GroupsList navigation={ this.props.navigation }/>
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
