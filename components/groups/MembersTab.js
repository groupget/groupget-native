import React, { Component } from 'react';
import { View, StyleSheet, Modal } from 'react-native';
import { Container, List, Button, Fab, ActionSheet, Form, Text } from 'native-base';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import FormButton from '../common/Button';
import ListItem from '../common/ListItem';
import Icon from '../common/Icon';
import Colors from '../../constants/Colors';
import ActivitiesIcons from '../../constants/ActivitiesIcons';
import MarginContent from '../common/MarginContent';
import Title from '../common/Title';
import TextInput from '../common/TextInput';
import endpoints from '../../config/endpoints';
import refreshTokens from '../../utils/refreshTokens';
import saveRefreshToken from '../../utils/saveRefreshToken';
import saveMainToken from '../../utils/saveMainToken';
import fetchMainToken from '../../utils/fetchMainToken';
import fetchRefreshToken from '../../utils/fetchRefreshToken';

const BUTTONS = ['Delete', 'Cancel'];
const DESTRUCTIVE_INDEX = 0;
const CANCEL_INDEX = 1;

const FETCH_MEMBERS_EXPENSES = gql`
  query getUserTotalExpenses($groupId: String!){ 
      getUserTotalExpenses(groupId: $groupId) {
        username: _id
        totalAmount
      }
  }
`;


export default class MembersTab extends Component {
    static navigationOptions = {};

    state = {
        active  : false,
        clicked : -1,
        username: '',
    };

    render() {

        const { active, username } = this.state;
        const { members, groupName } = this.props;

        return (
            <Query query={ FETCH_MEMBERS_EXPENSES }
                   variables={ {
                       groupId: groupName
                   } }
            >
                {
                    ({ data, error, loading }) => {
                        if (loading) {
                            return <Text> Loading... </Text>
                        } else if (error) {
                            return <Text> { error } </Text>
                        }
                        return (
                            <Container style={ styles.container }>
                                <View style={ { flex: 1 } }>
                                    <List>
                                        {
                                            members && members.map((memberName, key) => {
                                                const expenses = data['getUserTotalExpenses'];
                                                const userData = expenses.filter(member => member.username === memberName)[0];
                                                const amount = userData && userData.totalAmount;
                                                return (
                                                    <ListItem key={ key }
                                                              content={ memberName }
                                                              icon={ ActivitiesIcons.user }
                                                              price={ amount || 0 }
                                                              priceType={ amount > 0 ? 'plus' : 'zero' }
                                                              menu={
                                                                  <Button transparent
                                                                          onPress={ () => this._onMenuPress(memberName) }
                                                                  >
                                                                      <Icon name={ 'more' }/>
                                                                  </Button>
                                                              }
                                                    />)
                                            })
                                        }
                                    </List>
                                    <Fab active={ active }
                                         direction='up'
                                         containerStyle={ {} }
                                         style={ { backgroundColor: Colors.primaryColor } }
                                         position='bottomRight'
                                         onPress={ this._onFabPress }
                                    >
                                        <Icon name='add'/>
                                    </Fab>
                                    <Modal animationType='slide'
                                           transparent={ false }
                                           visible={ active }
                                    >
                                        <Container style={ { display: 'flex', justifyContent: 'center' } }>

                                            <View>
                                                <Title text={ 'Send Invitation to Group' }/>
                                                <MarginContent>
                                                    <Form>
                                                        <TextInput onChange={ this._handleInputChange('username') }
                                                                   placeholder={ 'Email' }
                                                                   value={ username }
                                                        />
                                                        <FormButton onClick={ this._sendInvitation }
                                                                    text={ 'Send' }
                                                        />
                                                        <FormButton onClick={ this._onFabPress }
                                                                    text={ 'Done' }
                                                                    type={ 'secondary' }
                                                        />
                                                    </Form>
                                                </MarginContent>
                                            </View>

                                        </Container>
                                    </Modal>
                                </View>
                            </Container>
                        )
                    }
                }

            </Query>
        );
    }

    _onMenuPress = (member) => {
        ActionSheet.show(
            {
                options               : BUTTONS,
                cancelButtonIndex     : CANCEL_INDEX,
                destructiveButtonIndex: DESTRUCTIVE_INDEX,
                title                 : member,
            },
            async buttonIndex => {
                if (buttonIndex === DESTRUCTIVE_INDEX) {
                    const {groupName} = this.props;
                    const refreshToken = await fetchRefreshToken();
                    const token = await fetchMainToken();
                    console.log('DELETING USER!! =================\n\n============');
                    fetch(endpoints.ACCOUNTS + `/groups/${groupName}/users/${ member }`, {
                        method : 'DELETE',
                        headers: new Headers({
                            'Authorization': 'Bearer ' + token,
                        })
                    })
                        .then((result) => {
                            console.log('result from delete member: ', result);
                            refreshTokens(refreshToken)
                                .then(async tokens => {
                                    await saveRefreshToken(tokens.refreshToken);
                                    await saveMainToken(tokens.mainToken);
                                });
                            if (result.status === 200) {
                                this.props.updateUsersOnDelete(groupName, member);
                            }
                        })
                        .catch((err) => {
                            alert(err.message || JSON.stringify(err));
                            console.log('err');
                        })
                }
                this.setState({ clicked: BUTTONS[buttonIndex] });
            }
        )
    };

    _onFabPress = () => {
        const { active } = this.state;
        this.setState({ active: !active, username: '' })
    };

    _handleInputChange = fieldName => text => {
        this.setState({ [fieldName]: text })
    };

    _sendInvitation = async () => {
        const { active, username } = this.state;
        const { groupName } = this.props;
        console.log('group name to send invitation', groupName);

        const token = await fetchMainToken();
        const refreshToken = await fetchRefreshToken();
        fetch(endpoints.ACCOUNTS + `/groups/${ groupName }/invitations`, {
            method : 'POST',
            headers: new Headers({
                'Authorization': 'Bearer ' + token,
                Accept         : 'application/json',
                'Content-Type' : 'application/json',
            }),
            body   : JSON.stringify({
                username: username
            })
        })
            .then((result) => {
                console.log('result from send invitation: ', result);
                refreshTokens(refreshToken)
                    .then(async tokens => {
                        await saveRefreshToken(tokens.refreshToken);
                        await saveMainToken(tokens.mainToken);
                    });
                this.setState({ active: !active, username: '' })
            })
            .catch((err) => {
                alert(err.message || JSON.stringify(err));
                console.log('err send invitation');
            });
    }

}

const styles = StyleSheet.create({
    container: {
        flex           : 1,
        backgroundColor: '#fff',
    },
});
