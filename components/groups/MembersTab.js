import React, { Component } from 'react';
import { View, StyleSheet, Modal } from 'react-native';
import { Container, List, Button, Fab, ActionSheet, Form } from 'native-base';
import FormButton from '../common/Button'

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


const members = [
    {
        name  : 'You',
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
        active  : false,
        clicked : -1,
        username: '',
    };

    render() {

        const { active, username } = this.state;
        const { members } = this.props;

        return (
            <Container style={ styles.container }>
                <View style={ { flex: 1 } }>
                    <List>
                        {
                            members && members.map((memberName, key) => <ListItem
                                key={ key }
                                content={ memberName }
                                icon={ ActivitiesIcons.user }
                                // price={ member.money }
                                // priceType={ member.status }
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
            }),
            body   : JSON.stringify({
                'username': username
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
