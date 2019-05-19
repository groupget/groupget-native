import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Container, List } from 'native-base';

import ListItem from '../common/ListItem';
import ActivitiesIcons from '../../constants/ActivitiesIcons';


const activities = [
    {
        description: 'User1 added expense of 14.50',
        type       : 'expense',
        date       : '2019-03-20'
    },
    {
        description: 'User2 added an item to List1',
        type       : 'list',
        date       : '2019-02-14'
    },
    {
        description: 'User3 was added to group',
        type       : 'user',
        date       : '2019-02-01'

    },
];

export default class ListsTab extends Component {
    static navigationOptions = {};

    render() {

        return (
            <Container style={ styles.container }>
                <View style={ { flex: 1 } }>
                    <List>
                        {
                            activities.map((activity, key) => <ListItem
                                key={ key }
                                content={ activity.date + ' ' + activity.description }
                                icon={ ActivitiesIcons[activity.type] || 'help' }
                            />)
                        }
                    </List>
                </View>
            </Container>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex           : 1,
        backgroundColor: '#fff',
    },
});
