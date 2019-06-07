import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Form, Container } from 'native-base'
import Button from '../common/Button'
import TextInput from '../common/TextInput'
import Title from '../common/Title'
import MarginContent from '../common/MarginContent';
import config from '../../config/cognitoConfig';
import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';


class SignUpScreen extends Component {

    state = {
        firstName: '',
        lastName : '',
        email    : '',
        password : '',
        error    : ''
    };

    render() {
        const { firstName, lastName, email, password, error } = this.state;

        return (
            <Container style={ { display: 'flex', justifyContent: 'center' } }>

                <View>
                    <Title text={ 'Create an Account' }/>
                    <MarginContent>
                        <Form>
                            <TextInput onChange={ this._handleInputChange('firstName') }
                                       placeholder={ 'First Name' }
                                       value={ firstName }
                            />
                            <TextInput onChange={ this._handleInputChange('lastName') }
                                       placeholder={ 'Last Name' }
                                       value={ lastName }
                            />
                            <TextInput onChange={ this._handleInputChange('email') }
                                       placeholder={ 'Email' }
                                       value={ email }
                            />
                            <TextInput onChange={ this._handleInputChange('password') }
                                       placeholder={ 'Password' }
                                       value={ password }
                                       secureTextEntry={ true }
                            />
                            <Button onClick={ this._onSignUp }
                                    text={ 'Sign Up' }
                            >
                            </Button>
                            <View style={ {
                                display       : 'flex',
                                justifyContent: 'center',
                                alignItems    : 'center',
                                padding       : 12
                            } }>
                                <Text style={ {
                                    color   : 'red',
                                    fontSize: 16
                                } }>{ error }</Text>
                            </View>
                        </Form>
                    </MarginContent>
                </View>
            </Container>
        );
    }

    _handleInputChange = fieldName => text => {
        this.setState({ [fieldName]: text })
    };

    _onSignUp = event => {
        event.preventDefault();
        // this.props.showLoadingBlocker(true);
        console.log('signing up...');
        if (this._isFormValid()) {
            this._register();
        } else {
            this.setState({ error: 'Wrong data' })
        }
    };

    _isFormValid = () => {
        return this.state.firstName.length > 0 &&
            this.state.lastName.length > 0 &&
            this.state.email.length > 0 &&
            this.state.password.length > 0
    };

    _register() {
        const { email, lastName, firstName, password } = this.state;

        const poolData = {
            UserPoolId: config.cognito.USER_POOL_ID,
            ClientId  : config.cognito.APP_CLIENT_ID
        };
        let userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
        const emailAttribute = {
            Name : 'email',
            Value: email
        };
        const firstNameAttribute = {
            Name : 'custom:firstName',
            Value: firstName
        };
        const lastNameAttribute = {
            Name : 'custom:lastName',
            Value: lastName
        };
        let userAttributes = [
            new AmazonCognitoIdentity.CognitoUserAttribute(emailAttribute),
            new AmazonCognitoIdentity.CognitoUserAttribute(firstNameAttribute),
            new AmazonCognitoIdentity.CognitoUserAttribute(lastNameAttribute),
        ];

        userPool.signUp(
            email,
            password,
            userAttributes,
            [],
            (err, result) => {
                if (err) {
                    alert(err.message);
                    console.log(err);
                    return;
                }
                console.log('username is ' + result.user.getUsername());
                // this.props.showLoadingBlocker(false);
                this.props.navigation.navigate('SignIn');
            }
        );
    };
}

export default SignUpScreen;
