import React from 'react';
import jwtDecode from 'jwt-decode';
import { StyleSheet, SafeAreaView, Text, View } from 'react-native';

import GroupsList from '../groups/GroupsList';
import MarginContent from '../common/MarginContent';
import InvitationsList from '../user/InvitationsList';
import endpoints from '../../config/endpoints';
import getTokenFromStorage from '../../config/getTokenFromStorage';

export default class GroupsScreen extends React.Component {
    static navigationOptions = {
        header: <SafeAreaView>
            <MarginContent>
                <Text style={ {
                    fontSize: 32
                } }>
                    Groups
                </Text>
            </MarginContent>
        </SafeAreaView>
    };

    state = {
        groups     : [],
        invitations: [],
    };

    async componentDidMount() {
        const token = await getTokenFromStorage('refreshToken');

        console.log('token from cdm:', token);
        console.log('mounting groups screen');
        fetch(endpoints.GATEWAY + 'users/invitations', {
            headers: new Headers({
                'Authorization': 'Bearer ' + token,
            }),
        })
            .then((data) => {
                console.log('data fetched for invitations: ', data);
                // this.setState({invitations: data.groups});
            })
            .catch((err) => {
                console.log(err);
            });

        try {
            const decoded = jwtDecode(token);
            console.log('decoded base64: ', decoded);
        } catch (e) {
            console.log(e);
        }
    }

    render() {

        const { groups, invitations } = this.state;

        return (
            <SafeAreaView style={ styles.container }>
                <View style={ styles.container }>
                    <InvitationsList navigation={ this.props.navigation }
                                     invitations={ invitations }
                                     acceptInvitation={ this.acceptInvitation }
                    />
                </View>
                <View style={ styles.container }>
                    <GroupsList navigation={ this.props.navigation }
                                groups={ groups }
                    />
                </View>
            </SafeAreaView>
        );
    }

    acceptInvitation = (invitation) => {
        console.log(invitation);
    };
}

const styles = StyleSheet.create({
    container: {
        flex           : 1,
        backgroundColor: '#fff',
    }
});
