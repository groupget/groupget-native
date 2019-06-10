import React from 'react';
import jwtDecode from 'jwt-decode';
import { StyleSheet, SafeAreaView, Text, View } from 'react-native';

import GroupsList from '../groups/GroupsList';
import MarginContent from '../common/MarginContent';
import InvitationsList from '../user/InvitationsList';
import endpoints from '../../config/endpoints';
import fetchMainToken from '../../utils/fetchMainToken';
import refreshTokens from '../../utils/refreshTokens';
import saveRefreshToken from '../../utils/saveRefreshToken';
import saveMainToken from '../../utils/saveMainToken';
import fetchRefreshToken from '../../utils/fetchRefreshToken';

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
        const jwtToken = await fetchMainToken();
        fetch(endpoints.ACCOUNTS + '/users/invitations', {
            headers: new Headers({
                'Authorization': 'Bearer ' + jwtToken,
            }),
        })
            .then(response => response.json())
            .then(async (data) => {
                console.log('\n\ndata fetched for invitations: ', data);
                const refreshToken = await fetchRefreshToken();
                await refreshTokens(refreshToken)
                    .then(async tokens => {
                        console.log('tokens', tokens);
                        await saveRefreshToken(tokens.refreshToken);
                        await saveMainToken(tokens.mainToken);
                    });
                this.setState({ invitations: data.groupNames });
            })
            .catch((err) => {
                console.log(err);
            });

        try {
            const decoded = jwtDecode(jwtToken);
            console.log('decoded base64: ', decoded);
            this.setState({ groups: decoded['cognito:groups'] })
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
        const token = await fetchMainToken();
        const refreshToken = await fetchRefreshToken();
        fetch(endpoints.ACCOUNTS + `/groups/${ invitation }/users`, {
            method : 'POST',
            headers: new Headers({
                'Authorization': 'Bearer ' + token,
                Accept         : 'application/json',
            }),
        })
            .then((result) => {
                console.log('result from accept invitation: ', result);
                refreshTokens(refreshToken)
                    .then(async tokens => {
                        await saveRefreshToken(tokens.refreshToken);
                        await saveMainToken(tokens.mainToken);
                        await this.declineInvitation(invitation);
                    });
            })
            .catch((err) => {
                alert(err.message || JSON.stringify(err));
                console.log('err accept invitation');
            })
    };

    declineInvitation = async (invitation) => {
        console.log(invitation);
        const token = await fetchMainToken();
        const refreshToken = await fetchRefreshToken();
        fetch(endpoints.ACCOUNTS + `/users/invitations/${ invitation }`, {
            method : 'DELETE',
            headers: new Headers({
                'Authorization': 'Bearer ' + token,
            })
        })
            .then((result) => {
                console.log('result from decline invitation: ', result);
                refreshTokens(refreshToken)
                    .then(async tokens => {
                        await saveRefreshToken(tokens.refreshToken);
                        await saveMainToken(tokens.mainToken);
                    });
            })
            .catch((err) => {
                alert(err.message || JSON.stringify(err));
                console.log('err');
            })
    };

    updateGroupsWithNew = (name) => {
        this.setState((prevState) => ({ groups: [...prevState.groups, name] }))
    };
}

const styles = StyleSheet.create({
    container: {
        flex           : 1,
        backgroundColor: '#fff',
    }
});
