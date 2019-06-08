import React from 'react';
import { Image, Text, View } from 'react-native';
import { Container, Header, Content, Card, CardItem, Left, Body, Switch } from 'native-base';
import Icon from '../common/Icon';
import MarginContent from '../common/MarginContent';
import Button from '../common/Button';
import cognitoConfig from '../../config/cognitoConfig';
import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';


const account = {
    username     : 'irmikrys',
    email        : 'irmikrys@student.agh.edu.pl',
    notifications: true,
};

export default class SettingsScreen extends React.Component {
    static navigationOptions = {
        header: null
    };

    state = {
        notifications: account.notifications,
        user         : null,
    };

    componentDidMount() {
        this._fetchUser();
    }

    render() {

        const { username, email } = account;
        const { notifications } = this.state;

        return (
            <Container>
                <Header transparent/>
                <Content>
                    <Card>
                        <CardItem>
                            <Left>
                                <Icon name={ 'contact' } size={ 50 }/>
                                <Body>
                                <Text>{ username }</Text>
                                <Text note>{ email }</Text>
                                </Body>
                            </Left>
                        </CardItem>
                        <CardItem cardBody>
                            {/*<Image source={ { uri: 'Image URL' } } style={ { height: 200, width: null, flex: 1 } }/>*/ }
                        </CardItem>
                    </Card>
                    <MarginContent>
                        <View style={ {
                            flex: 1 //fixme does not work
                        } }>
                            <View style={ {
                                display      : 'flex',
                                flexDirection: 'row',
                            } }>
                                <Text style={ { fontSize: 16, flexGrow: 1 } }>Notifications</Text>
                                <Switch value={ notifications }
                                        onValueChange={ this._toggleNotifications }
                                />
                            </View>
                        </View>
                        <Button onClick={ this._handleLogout }
                                text={ 'Logout' }
                                type={ 'secondary' }
                        />
                    </MarginContent>
                </Content>
            </Container>
        )
    }

    _fetchUser = () => {
        const poolData = {
            UserPoolId: cognitoConfig.cognito.USER_POOL_ID,
            ClientId  : cognitoConfig.cognito.APP_CLIENT_ID
        };
        let userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

        userPool.storage.sync((err, result) => {
            if (err) {
            } else if (result === 'SUCCESS') {
                const cognitoUser = userPool.getCurrentUser();
                this.setState({ user: cognitoUser });
            }
        });
    };

    _toggleNotifications = () => {
        const { notifications } = this.state;
        this.setState({ notifications: !notifications })
    };

    _handleLogout = () => {
        this.state.user.signOut();
        this.props.navigation.navigate('SignIn');
    };
}
