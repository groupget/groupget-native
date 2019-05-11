import React, { Component } from 'react';
import { SafeAreaView } from 'react-native';
import { MyContext } from '../../App';
import Title from '../common/Title';
import Button from '../common/Button';
import MarginContent from '../common/MarginContent';

class WelcomeScreen extends Component {
    static navigationOptions = {
        header: null,
    };

    // static contextType = MyContext;

    render() {
        return (
            <MyContext.Consumer>
                {
                    (value) => (
                        <SafeAreaView>
                            <MarginContent>
                                <Title text={ `Welcome ${value.name}!` }
                                       size={ 'large' }
                                />
                                <Button text={ 'Get started!' }
                                        onClick={ this._handleStart }
                                />
                            </MarginContent>
                        </SafeAreaView>
                    )
                }
            </MyContext.Consumer>
        );
    }

    _handleStart = () => {
        const { navigation } = this.props;
        navigation.replace('Groups');
    };
}

export default WelcomeScreen;
