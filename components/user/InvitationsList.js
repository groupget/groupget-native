import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Container, List, Button, Text, ListItem as NativeListItem } from 'native-base';

import ListItem from '../common/ListItem';
import Icon from '../common/Icon';
import ActivitiesIcons from '../../constants/ActivitiesIcons';


export default class InvitationsList extends Component {
    static navigationOptions = {};

    render() {

        const { acceptInvitation, declineInvitation } = this.props;

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
                            invitations && invitations.map((invitation, key) => <ListItem
                                key={ key }
                                content={ invitation }
                                icon={ ActivitiesIcons.invitation }
                                menu={
                                    <View style={ {
                                        display      : 'flex',
                                        flexDirection: 'row',

                                    } }>
                                        <Button transparent
                                                onPress={ () => acceptInvitation(invitation) }
                                                style={ { marginRight: 10 } }
                                        >
                                            <Icon name={ 'checkmark-circle' }
                                                  color={ '#008000' }
                                                  size={ 35 }
                                            />
                                        </Button>
                                        <Button transparent
                                                onPress={ () => declineInvitation(invitation) }
                                        >
                                            <Icon name={ 'close-circle' }
                                                  color={ '#ff0000' }
                                                  size={ 35 }
                                            />
                                        </Button>
                                    </View>
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
