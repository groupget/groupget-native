import React, { Component } from 'react'
import { View } from 'react-native'
import { Form, Container } from 'native-base'
import Button from '../common/Button'
import TextInput from '../common/TextInput'
import Title from '../common/Title'
import MarginContent from '../common/MarginContent';

class SignUpScreen extends Component {

    state = {
        firstName: '',
        lastName : '',
        email    : '',
        password : '',
    };

    //todo center vertical content from justify
    render() {
        const { firstName, lastName, email, password } = this.state;

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
                        </Form>
                    </MarginContent>
                </View>
            </Container>
        );
    }

    _handleInputChange = fieldName => text => {
        this.setState({ [fieldName]: text })
    };

    _onSignUp = () => {
        const data = { ...this.state };
        this.props.navigation.navigate('SignIn');
    }
}

export default SignUpScreen;
