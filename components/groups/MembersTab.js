import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Container, List, Button, Fab, ActionSheet } from 'native-base';

import ListItem from '../common/ListItem';
import Icon from '../common/Icon';


const members = [
    {
        name  : 'User1',
        money : 4.50,
        status: 'minus'
    },
    {
        name  : 'User2',
        money : 7.50,
        status: 'plus'
    },
    {
        name  : 'User3',
        money : 0.00,
        status: 'zero'
    }
];

const BUTTONS = ['Delete', 'Cancel'];
const DESTRUCTIVE_INDEX = 0;
const CANCEL_INDEX = 1;

export default class MembersTab extends Component {
    static navigationOptions = {};

    state = {
        active : false,
        clicked: -1
    };

    render() {

        const { active } = this.state;

        return (
            <Container style={ styles.container }>
                <View style={ { flex: 1 } }>
                    <List>
                        {
                            members.map((member, key) => <ListItem
                                key={ key }
                                content={ member.name }
                                icon={ 'person' }
                                price={ member.money }
                                priceType={ member.status }
                                menu={
                                    <Button transparent
                                            onPress={ () => this._onMenuPress(member) }
                                    >
                                        <Icon name={ 'more' }/>
                                    </Button>
                                }
                            />)
                        }
                    </List>
                    <Fab
                        active={ active }
                        direction='up'
                        containerStyle={ {} }
                        style={ { backgroundColor: '#5067FF' } }
                        position='bottomRight'
                        onPress={ () => this.setState({ active: !active }) }>
                        <Icon name='add'/>
                    </Fab>
                </View>
            </Container>
        );
    }

    _onMenuPress = (member) => {
        ActionSheet.show(
            {
                options               : BUTTONS,
                cancelButtonIndex     : CANCEL_INDEX,
                destructiveButtonIndex: DESTRUCTIVE_INDEX,
                title                 : member.name,
            },
            buttonIndex => {
                this.setState({ clicked: BUTTONS[buttonIndex] });
            }
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex           : 1,
        backgroundColor: '#fff',
    },
});
