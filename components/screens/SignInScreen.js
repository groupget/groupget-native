import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';
import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Text, View } from 'react-native'
import { Form, Container } from 'native-base'

import { MyContext } from '../../App';
import Title from '../common/Title';
import Button from '../common/Button'
import TextInput from '../common/TextInput'
import MarginContent from '../common/MarginContent';
import cognitoConfig from '../../config/cognitoConfig';
import { registerFirebase } from '../../config/firebase';
import { loginSuccess } from '../../reducers/login';
import { showErrorMessage, showInfoMessage, showLoadingBlocker, showSuccessMessage } from '../../reducers/messages';
import { LOGIN_SUCCESSFUL } from '../../constants/Messages';
import fetchCognitoUser from '../../utils/fetchCognitoUser';
import saveMainToken from '../../utils/saveMainToken';
import saveRefreshToken from '../../utils/saveRefreshToken';

class SignInScreen extends Component {

    state = {
        email   : '',
        password: '',
        error   : '',
        newUser : false,
    };

    componentDidMount() {
        const {navigation} = this.props;
        fetchCognitoUser(() => {
            navigation.replace('Groups'); //todo do it when user is already logged in
        })
    }

    render() {
        const { email, password, error } = this.state;

        return (
            <MyContext.Consumer>
                {
                    (value) => (
                        <Container style={ { display: 'flex', justifyContent: 'center' } }>

                            <View>
                                <Title text={ 'Sign In With Email' }/>
                                <MarginContent>
                                    <Form>
                                        <TextInput onChange={ this._handleInputChange('email') }
                                                   placeholder={ 'Email' }
                                                   value={ email }
                                        />
                                        <TextInput onChange={ this._handleInputChange('password') }
                                                   placeholder={ 'Password' }
                                                   value={ password }
                                                   secureTextEntry={ true }
                                        />
                                        <Button onClick={ (e) => {
                                            value.setName(this.state.email);
                                            this._onSignIn(e)
                                        } }
                                                text={ 'Sign In' }
                                        />
                                        <Button onClick={ this._handleNeedAccountClick }
                                                text={ 'Need an account?' }
                                                type={ 'secondary' }
                                        />
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
                    )
                }
            </MyContext.Consumer>
        );
    }

    _handleInputChange = fieldName => text => {
        this.setState({ [fieldName]: text })
    };

    _onSignIn = event => {
        event.preventDefault();
        console.log('signing in...');
        if (this._isFormValid()) {
            this.setState({ error: '' });
            this._login();
        } else {
            this.setState({ error: 'Wrong data' })
        }
    };

    _isFormValid = () => {
        return this.state.email.length > 0 &&
            this.state.password.length > 0
    };

    _login() {

        const { email, password } = this.state;

        let poolData = {
            UserPoolId: cognitoConfig.cognito.USER_POOL_ID,
            ClientId  : cognitoConfig.cognito.APP_CLIENT_ID
        };
        let userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
        let userData = {
            Username: email,
            Pool    : userPool
        };
        let authenticationData = {
            Username: email,
            Password: password
        };
        let authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
        let cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess          : (result) => {
                this.props.loginSuccess(result.getIdToken().getJwtToken());
                this.props.showSuccessMessage(LOGIN_SUCCESSFUL);
                console.log('sign in', result);
                saveMainToken(result.getIdToken().getJwtToken());
                saveRefreshToken(result.getRefreshToken().getToken());
                const { navigation } = this.props;
                navigation.replace('Welcome');
            },
            onFailure          : (err) => {
                this.props.showErrorMessage(err.message);
                console.log(err);
                alert(err.message);
            },
            newPasswordRequired: (userAttributes, requiredAttributes) => {
                this._setNewUser(true);
            }
        });
    }

    _handleNeedAccountClick = () => {
        const { navigation } = this.props;
        navigation.navigate('SignUp');
    };

    _setNewUser = value => {
        this.setState({
            newUser: value
        })
    };

}

const mapDispatchToProps = dispatch => bindActionCreators({
    showLoadingBlocker,
    showSuccessMessage,
    showInfoMessage,
    showErrorMessage,
    loginSuccess,
}, dispatch);

const mapStateToProps = ({}) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SignInScreen)
