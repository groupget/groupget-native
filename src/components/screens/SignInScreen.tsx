import React, {Component} from 'react'
import {View} from 'react-native'
import {Form, Container} from 'native-base'
import Button from '../common/Button'
import TextInput from '../common/TextInput'
import {MyContext, Value} from '../../App';
import Title from '../common/Title';
import MarginContent from '../common/MarginContent';
import {ScreenProps} from './interfaces/ScreenProps';

interface SignInScreenProps extends ScreenProps {

}

class SignInScreen extends Component<SignInScreenProps> {

    state = {
        email: '',
        password: '',
    };

    componentDidMount() {
        // this.props.navigation.replace('Home'); //todo do it when user is already logged in
    }

    render() {
        const {email, password} = this.state;

        return (
            <MyContext.Consumer>
                {
                    (value: Value) => (
                        <Container style={{display: 'flex', justifyContent: 'center'}}>

                            <View>
                                <Title text={'Sign In With Email'}/>
                                <MarginContent>
                                    <Form>
                                        <TextInput onChange={this.handleInputChange('email')}
                                                   placeholder={'Email'}
                                                   value={email}
                                        />
                                        <TextInput onChange={this.handleInputChange('password')}
                                                   placeholder={'Password'}
                                                   value={password}
                                        />
                                        <Button onClick={() => {
                                            value.setName(email);
                                            const {navigation} = this.props;
                                            navigation.replace('Welcome', {name: 'Irmina', age: 4});
                                        }}
                                                text={'Sign In'}
                                        />
                                        <Button onClick={this.handleNeedAccountClick}
                                                text={'Need an account?'}
                                                type={'secondary'}
                                        />
                                    </Form>
                                </MarginContent>
                            </View>

                        </Container>
                    )
                }
            </MyContext.Consumer>
        );
    }

    private handleInputChange = (fieldName: string) => (text: string) => {
        this.setState({[fieldName]: text})
    };

    private handleNeedAccountClick = () => {
        const {navigation} = this.props;
        navigation.navigate('SignUp');
    };

}

export default SignInScreen;
