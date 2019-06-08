import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Container, List, Button, Text, ListItem as NativeListItem } from 'native-base';

import ListItem from '../common/ListItem';
import Icon from '../common/Icon';
import ActivitiesIcons from '../../constants/ActivitiesIcons';


export default class InvitationsList extends Component {
    static navigationOptions = {};

    render() {

        const { acceptInvitation } = this.props;

        const invitations = ['a', 'b'];

        return (
            <Container style={ styles.container }>
                <View style={ { flex: 1 } }>
                    <List>
                        <NativeListItem itemHeader first>
                            <Text>INVITATIONS</Text>
                        </NativeListItem>
                        {
                            invitations &&
                            invitations.length === 0 &&
                            <Text style={ {
                                marginLeft: 20
                            } }>
                                You have no pending invitations...
                            </Text>
                        }
                        {
                            invitations.map((invitation, key) => <ListItem
                                key={ key }
                                onPress={ () => this._onGroupPress(invitation) }
                                content={ invitation }
                                icon={ ActivitiesIcons.invitation }
                                menu={
                                    <Button transparent
                                            onPress={ () => acceptInvitation(invitation) }
                                    >
                                        <Icon name={ 'checkmark-circle' }
                                              color={ '#008000' }
                                        />
                                    </Button>
                                }
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
