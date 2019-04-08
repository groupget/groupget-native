import React, {Component} from 'react'
import {View} from 'react-native'
import {Form, Container} from 'native-base'
import Button from '../common/Button'
import TextInput from '../common/TextInput'
import Title from '../common/Title'
import MarginContent from '../common/MarginContent';
import {ScreenProps} from './interfaces/ScreenProps';

interface SignUpScreenProps extends ScreenProps {

}

class SignUpScreen extends Component<SignUpScreenProps> {

    state = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    };

    //todo center vertical content from justify
    render(): JSX.Element {

        const {firstName, lastName, email, password} = this.state;

        return (
            <Container style={{display: 'flex', justifyContent: 'center'}}>

                <View>
                    <Title text={'Create an Account'}/>
                    <MarginContent>
                        <Form>
                            <TextInput onChange={this.handleInputChange('firstName')}
                                       placeholder={'First Name'}
                                       value={firstName}
                            />
                            <TextInput onChange={this.handleInputChange('lastName')}
                                       placeholder={'Last Name'}
                                       value={lastName}
                            />
                            <TextInput onChange={this.handleInputChange('email')}
                                       placeholder={'Email'}
                                       value={email}
                            />
                            <TextInput onChange={this.handleInputChange('password')}
                                       placeholder={'Password'}
                                       value={password}
                            />
                            <Button onClick={() => {
                            }}
                                    text={'Sign Up'}
                            />
                        </Form>
                    </MarginContent>
                </View>
            </Container>
        );
    }

    private handleInputChange = (fieldName: string) => (text: string) => {
        this.setState({[fieldName]: text})
    };
}

export default SignUpScreen;
