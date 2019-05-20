import React from 'react';
import { Image, Text, View } from 'react-native';
import { Container, Header, Content, Card, CardItem, Left, Body, Switch } from 'native-base';
import Icon from '../common/Icon';
import MarginContent from '../common/MarginContent';
import Button from '../common/Button';


const account = {
    name         : 'Irmina',
    surname      : 'Krysiak',
    email        : 'irmikrys@student.agh.edu.pl',
    notifications: true,
};

export default class SettingsScreen extends React.Component {
    static navigationOptions = {
        header: null
    };

    state = {
        notifications: account.notifications
    };

    render() {

        const { name, surname, email } = account;
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
                                <Text>{ name } { surname }</Text>
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
                            display      : 'flex',
                            flexDirection: 'row',
                        } }>
                            <Text style={ { fontSize: 16, flexGrow: 1 } }>Notifications</Text>
                            <Switch value={ notifications }
                                    onValueChange={ this._toggleNotifications }
                            />
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

    _toggleNotifications = () => {
        const { notifications } = this.state;
        this.setState({ notifications: !notifications })
    };

    _handleLogout = () => {
        this.props.navigation.navigate('SignIn');
    };
}
