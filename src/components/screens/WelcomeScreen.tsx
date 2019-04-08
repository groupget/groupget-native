import React, {Component} from 'react';
import {SafeAreaView} from 'react-native';
import {MyContext, Value} from '../../App';
import Title from '../common/Title';
import Button from '../common/Button';
import MarginContent from '../common/MarginContent';
import {ScreenProps} from './interfaces/ScreenProps';

interface WelcomeScreenProps extends ScreenProps {

}

class WelcomeScreen extends Component<WelcomeScreenProps> {

    static navigationOptions: { header: any } = {
        header: null,
    };

    // static contextType = MyContext;

    render(): JSX.Element {
        return (
            <MyContext.Consumer>
                {
                    (value: Value) => (
                        <SafeAreaView>
                            <MarginContent>
                                <Title text={`Welcome ${value.name}!`}
                                       size={'large'}
                                />
                                <Button text={'Get started!'}
                                        onClick={this.handleStart}
                                />
                            </MarginContent>
                        </SafeAreaView>
                    )
                }
            </MyContext.Consumer>
        );
    }

    private handleStart = () => {
        const {navigation} = this.props;
        navigation.replace('Home');
    };
}

export default WelcomeScreen;
