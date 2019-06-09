import React from 'react';
import jwtDecode from 'jwt-decode';
import { StyleSheet, SafeAreaView, Text, View } from 'react-native';

import GroupsList from '../groups/GroupsList';
import MarginContent from '../common/MarginContent';
import InvitationsList from '../user/InvitationsList';
import endpoints from '../../config/endpoints';
import UserPool from '../../constants/UserPool';
import fetchTokenFromSession from '../../utils/fetchTokenFromSession';

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
        UserPool.storage.sync((err, result) => {
            if (err) {
                console.log(err);
            } else if (result === 'SUCCESS') {
                const cognitoUser = UserPool.getCurrentUser();
                console.log('cognito user from fetch cognito session:', cognitoUser);
                if (cognitoUser != null) {
                    cognitoUser.getSession((err, session) => {
                        if (err) {
                            alert(err.message || JSON.stringify(err));
                            return;
                        }

                        console.log('session valid: ' + session.isValid());
                        console.log('session from cdm:', session);

                        console.log('mounting groups screen');

                        let token = '';

                        try {
                            token = session.getIdToken().getJwtToken();
                        } catch (e) {
                            console.log('error getting token: ', e);
                        }

                        console.log('token from session: ', token);

                        fetch(endpoints.ACCOUNTS + '/users/invitations', {
                            headers: new Headers({
                                'Authorization': 'Bearer ' + token,
                            }),
                        })
                            .then((data) => {
                                console.log('data fetched for invitations: ', data);
                                this.setState({ invitations: data.groupNames });
                            })
                            .catch((err) => {
                                console.log(err);
                            });

                        try {
                            const decoded = jwtDecode(token);
                            console.log('decoded base64: ', decoded);
                            this.setState({ groups: decoded['cognito:groups'] })
                        } catch (e) {
                            console.log(e);
                        }

                    });
                }
            } else {
                console.log('result from fetch: ', result);
            }
        });
    }

    render() {

        const { groups, invitations } = this.state;

        return (
            <SafeAreaView style={ styles.container }>
                <View style={ styles.container }>
                    <InvitationsList navigation={ this.props.navigation }
                                     invitations={ invitations }
                                     acceptInvitation={ this.acceptInvitation }
                                     declineInvitation={ this.declineInvitation }
                    />
                </View>
                <View style={ styles.container }>
                    <GroupsList navigation={ this.props.navigation }
                                updateGroupsWithNew={ this.updateGroupsWithNew }
                                groups={ groups }
                    />
                </View>
            </SafeAreaView>
        );
    }

    acceptInvitation = async (invitation) => {
        console.log(invitation);
        const token = await fetchTokenFromSession();
        fetch(endpoints.ACCOUNTS + `/groups/${ invitation }/users`, {
            method : 'POST',
            headers: new Headers({
                'Authorization': 'Bearer ' + token,
            }),
            body   : JSON.stringify({
                //todo what in body?
            })
        })
            .then((result) => {
                console.log('result from accept invitation: ', result);
            })
            .catch((err) => {
                alert(err.message || JSON.stringify(err));
                console.log('err');
            })
    };

    declineInvitation = async (invitation) => {
        console.log(invitation);
        const token = await fetchTokenFromSession();
        fetch(endpoints.ACCOUNTS + `/users/invitations/${ invitation }`, {
            method : 'DELETE',
            headers: new Headers({
                'Authorization': 'Bearer ' + token,
            })
        })
            .then((result) => {
                console.log('result from decline invitation: ', result);
            })
            .catch((err) => {
                alert(err.message || JSON.stringify(err));
                console.log('err');
            })
    };

    updateGroupsWithNew = (name) => {
        this.setState((prevState) => ({groups: [...prevState.groups, name]}))
    };
}

const styles = StyleSheet.create({
    container: {
        flex           : 1,
        backgroundColor: '#fff',
    }
});
