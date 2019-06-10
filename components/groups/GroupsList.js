import React, { Component } from 'react';
import { View, StyleSheet, Modal } from 'react-native';
import { Container, List, Button, Fab, ActionSheet, Form, Text, ListItem as NativeListItem } from 'native-base';
import jwtDecode from 'jwt-decode';

import FormButton from '../common/Button'
import ListItem from '../common/ListItem';
import Icon from '../common/Icon';
import Colors from '../../constants/Colors';
import ActivitiesIcons from '../../constants/ActivitiesIcons';
import MarginContent from '../common/MarginContent';
import Title from '../common/Title';
import TextInput from '../common/TextInput';
import endpoints from '../../config/endpoints';
import UserPool from '../../constants/UserPool';
import refreshTokens from '../../utils/refreshTokens';
import saveRefreshToken from '../../utils/saveRefreshToken';
import saveMainToken from '../../utils/saveMainToken';
import fetchMainToken from '../../utils/fetchMainToken';
import fetchRefreshToken from '../../utils/fetchRefreshToken';

const BUTTONS = ['Delete', 'Cancel'];
const DESTRUCTIVE_INDEX = 0;
const CANCEL_INDEX = 1;

export default class GroupsList extends Component {
    static navigationOptions = {};

    state = {
        active     : false,
        clicked    : -1,
        name       : '',
        description: '',
        user       : null,
    };

    componentDidMount() {
        this._fetchUser();
        this._fetchMembers();
    }

    render() {

        const { active, name, description } = this.state;
        const { groups } = this.props;

        return (
            <Container style={ styles.container }>
                <View style={ { flex: 1 } }>
                    <List>
                        <NativeListItem itemHeader first>
                            <Text>GROUPS</Text>
                        </NativeListItem>
                        {
                            groups && groups.map((group, key) => <ListItem
                                key={ key }
                                onPress={ () => this._onGroupPress(group) }
                                content={ group }
                                icon={ ActivitiesIcons.group }
                                menu={
                                    <Button transparent
                                            onPress={ () => this._onMenuPress(group) }
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
                                <Title text={ 'Add New Group' }/>
                                <MarginContent>
                                    <Form>
                                        <TextInput onChange={ this._handleInputChange('name') }
                                                   placeholder={ 'Name' }
                                                   value={ name }
                                        />
                                        <TextInput onChange={ this._handleInputChange('description') }
                                                   placeholder={ 'Description' }
                                                   value={ description }
                                        />
                                        <FormButton onClick={ this._addGroup }
                                                    text={ 'Add' }
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

    _onGroupPress = (group) => {
        this.props.navigation.push('Group', { name: group });
    };

    _onMenuPress = (group) => {
        ActionSheet.show(
            {
                options               : BUTTONS,
                cancelButtonIndex     : CANCEL_INDEX,
                destructiveButtonIndex: DESTRUCTIVE_INDEX,
                title                 : group.name,
            },
            buttonIndex => {
                this.setState({ clicked: BUTTONS[buttonIndex] });
            }
        )
    };

    _onFabPress = () => {
        const { active } = this.state;
        this.setState({ active: !active, name: '', description: '' })
    };

    _handleInputChange = fieldName => text => {
        this.setState({ [fieldName]: text })
    };

    _addGroup = async () => {
        const token = await fetchMainToken();
        await this._addGroupWithToken(token);
    };

    _addGroupWithToken = async (token) => {
        const { active, name, description, user } = this.state;

        let username = '';
        const mainToken = await fetchMainToken();

        try {
            username = jwtDecode(mainToken).email;
        } catch (e) {
            console.log('error decode add group', e);
        }

        fetch(endpoints.ACCOUNTS + `/groups`, {
            method : 'POST',
            headers: new Headers({
                'Authorization': 'Bearer ' + token,
                Accept         : 'application/json',
                'Content-Type' : 'application/json',
            }),
            body   : JSON.stringify({
                description: description,
                groupName  : name,
                usernames  : [username]
            })
        })
            .then(async (result) => {
                console.log('result from add group with token: ', result);
                if (result.status === 200) {
                    const refreshToken = await fetchRefreshToken();
                    this.props.updateGroupsWithNew(name);
                    refreshTokens(refreshToken)
                        .then(async tokens => {
                            await saveRefreshToken(tokens.refreshToken);
                            await saveMainToken(tokens.mainToken);
                        });
                    this.setState({ active: !active, name: '', description: '' })
                } else {
                    const j = await result.json();
                    const m = j.message;
                    alert(m)
                }
            })
            .catch((err) => {
                alert(err.message || JSON.stringify(err));
                console.log('err');
            });
    };

    _fetchUser = () => {
        UserPool.storage.sync((err, result) => {
            if (err) {
            } else if (result === 'SUCCESS') {
                const cognitoUser = UserPool.getCurrentUser();
                this.setState({ user: cognitoUser });
            }
        });
    };

    _fetchMembers = () => {
        console.log('fetching members');
    };

}

const styles = StyleSheet.create({
    container: {
        flex           : 1,
        backgroundColor: '#fff',
    },
});
