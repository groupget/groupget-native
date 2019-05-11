import React, { Component } from 'react'
import { View } from 'react-native'
import { Form, Container } from 'native-base'
import Button from '../common/Button'
import TextInput from '../common/TextInput'
import { MyContext } from '../../App';
import Title from '../common/Title';
import MarginContent from '../common/MarginContent';

class SignInScreen extends Component {

    state = {
        email   : '',
        password: '',
    };

    componentDidMount() {
        // this.props.navigation.replace('Groups'); //todo do it when user is already logged in
    }

    render() {
        const { email, password } = this.state;

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
                                        />
                                        <Button onClick={ () => {
                                            value.setName(this.state.email);
                                            const { navigation } = this.props;
                                            navigation.replace('Welcome', { name: 'Irmina', age: 4 });
                                        } }
                                                text={ 'Sign In' }
                                        >
                                        </Button>
                                        <Button onClick={ this._handleNeedAccountClick }
                                                text={ 'Need an account?' }
                                                type={ 'secondary' }
                                        >
                                        </Button>
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

    _handleNeedAccountClick = () => {
        const { navigation } = this.props;
        navigation.navigate('SignUp');
    };

}

export default SignInScreen;
