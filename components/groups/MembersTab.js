import React, { Component } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Text } from 'native-base';
import Badge from '../common/Badge';

export default class MembersTab extends Component {
    static navigationOptions = {
    };

    render() {
        return (
            <ScrollView style={ styles.container }>
                <Text>Members</Text>
                <Badge text={'123'} type={'warning'}/>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex           : 1,
        paddingTop     : 15,
        backgroundColor: '#fff',
    },
});
