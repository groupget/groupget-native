import React, { Component } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Text } from 'native-base';

export default class ExpensesTab extends Component {
    static navigationOptions = {
    };

    render() {
        return (
            <ScrollView style={ styles.container }>
                <Text>Expenses</Text>
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
