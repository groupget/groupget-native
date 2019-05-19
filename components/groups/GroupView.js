import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Header, Item, Container, Input, Button, Text, Tab, Tabs, TabHeading } from 'native-base';
import MembersTab from './MembersTab';
import ListsTab from './ListsTab';
import ExpensesTab from './ExpensesTab';
import ActivityTab from './ActivityTab';
import Icon from '../common/Icon';

export default class GroupView extends React.Component {
    static navigationOptions = {};

    render() {
        return (
            <Container style={ styles.container }>
                <Header searchBar rounded style={{paddingTop: 0, height: 30}}>
                    <Item>
                        <Icon name='search' style={ { marginLeft: 10, marginTop: 2 } }/>
                        <Input placeholder='Search' style={ { fontSize: 14 } }/>
                    </Item>
                    <Button transparent onPress={ undefined } title={ 'Search' }>
                        <Text>Search</Text>
                    </Button>
                </Header>
                <Tabs>
                    <Tab heading='MEMBERS'
                         tabStyle={ styles.tabContainer }
                         activeTabStyle={ styles.activeTab }
                         activeTextStyle={ styles.activeTab }
                    >
                        <MembersTab/>
                    </Tab>
                    <Tab heading='LISTS'
                         tabStyle={ styles.tabContainer }
                         activeTabStyle={ styles.activeTab }
                         activeTextStyle={ styles.activeTab }
                    >
                        <ListsTab/>
                    </Tab>
                    <Tab heading='EXPENSES'
                         tabStyle={ styles.tabContainer }
                         activeTabStyle={ styles.activeTab }
                         activeTextStyle={ styles.activeTab }
                    >
                        <ExpensesTab/>
                    </Tab>
                    <Tab heading='ACTIVITY'
                         tabStyle={ styles.tabContainer }
                         activeTabStyle={ styles.activeTab }
                         activeTextStyle={ styles.activeTab }
                    >
                        <ActivityTab/>
                    </Tab>
                </Tabs>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container   : {
        flex           : 1,
        backgroundColor: '#fff',
    },
    tabContainer: {
        backgroundColor: '#ffffff',
    },
    activeTab   : {
        fontWeight     : 'normal',
        color          : '#000',
        backgroundColor: '#ffffff'
    },
});
