import React, { Component } from 'react'
import { SafeAreaView, Text, View } from 'react-native'
import { Content, Form, Container } from 'native-base'
import Colors from '../../constants/Colors'
import Button from '../common/Button'
import TextInput from '../common/TextInput'

class SignInScreen extends Component {

    state = {
        email   : '',
        password: '',
    };

    render() {
        const { email, password } = this.state;

        return (
            <Container>
                <SafeAreaView/>
                <Text
                    style={ {
                        fontSize      : 20,
                        textAlign     : 'center',
                        fontWeight    : '500',
                        marginVertical: 20,
                        color         : Colors.primaryColor
                    } }
                >
                    Sign In With Email
                </Text>
                <Content>
                    <View style={ {
                        marginHorizontal: 20,
                    } }>
                        <Form>
                            <TextInput onChange={ this._handleInputChange('email') }
                                       placeholder={ 'Email' }
                                       value={ email }
                            />
                            <TextInput onChange={ this._handleInputChange('password') }
                                       placeholder={ 'Password' }
                                       value={ password }
                            />
                            <Button onClick={ () => {
                            } }
                                    text={ 'Sign In' }
                            >
                            </Button>
                            <Button onClick={ this._handleRegisterClick }
                                    text={ 'Need an account?' }
                                    type={ 'secondary' }
                            >
                            </Button>
                        </Form>
                    </View>
                </Content>
            </Container>
        );
    }

    _handleInputChange = fieldName => text => {
        this.setState({ [fieldName]: text })
    };

    _handleRegisterClick = () => {

    }
}

export default SignInScreen;
