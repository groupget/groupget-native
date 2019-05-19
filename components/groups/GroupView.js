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
            <View style={ styles.container }>
                <Container>
                    <Header searchBar rounded>
                        <Item>
                            <Icon name='search' style={ { marginLeft: 10, marginTop: 2 } }/>
                            <Input placeholder='Search' style={{fontSize: 14}}/>
                        </Item>
                        <Button transparent onPress={ undefined } title={ 'Search' }>
                            <Text>Search</Text>
                        </Button>
                    </Header>
                    <Tabs tabContainerStyle={ styles.tabContainer }>
                        <Tab heading={ <TabHeading><Text>MEMBERS</Text></TabHeading> }>
                            <MembersTab/>
                        </Tab>
                        <Tab heading={ <TabHeading><Text>LISTS</Text></TabHeading> }>
                            <ListsTab/>
                        </Tab>
                        <Tab heading={ <TabHeading><Text>EXPENSES</Text></TabHeading> }>
                            <ExpensesTab/>
                        </Tab>
                        <Tab heading={ <TabHeading><Text>ACTIVITY</Text></TabHeading> }>
                            <ActivityTab/>
                        </Tab>
                    </Tabs>
                </Container>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container   : {
        flex           : 1,
        paddingTop     : 15,
        backgroundColor: '#fff',
    },
    tabContainer: {
        backgroundColor: '#f2f2f2',
    }
});
