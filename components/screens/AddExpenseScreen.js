import React from 'react';
import { StyleSheet, View } from 'react-native';
import Title from '../common/Title';
import MarginContent from '../common/MarginContent';
import { Container, Form } from 'native-base';
import TextInput from '../common/TextInput';
import Button from '../common/Button';

export default class AddExpenseScreen extends React.Component {
    static navigationOptions = {
        title: 'AddExpense',
    };

    state = {
        group      : '',
        money      : '',
        description: '',
    };

    render() {

        const { group, money, description } = this.state;

        return (
            <Container style={ { display: 'flex', justifyContent: 'center' } }>

                <View>
                    <Title text={ 'Add Expense' }/>
                    <MarginContent>
                        <Form>
                            <TextInput onChange={ this._handleInputChange('group') }
                                       placeholder={ 'Group' }
                                       value={ group }
                            />
                            <TextInput onChange={ this._handleInputChange('money') }
                                       placeholder={ 'Money spent' }
                                       value={ money }
                            />
                            <TextInput onChange={ this._handleInputChange('description') }
                                       placeholder={ 'Description' }
                                       value={ description }
                            />
                            <Button onClick={ this._addExpense }
                                    text={ 'Add Expense' }
                            />
                        </Form>
                    </MarginContent>
                </View>

            </Container>
        );
    }

    _handleInputChange = fieldName => text => {
        this.setState({ [fieldName]: text })
    };

    _addExpense = () => {
        this.setState({ description: '', group: '', money: '' })
    }
}

const styles = StyleSheet.create({
    container: {
        flex           : 1,
        paddingTop     : 15,
        backgroundColor: '#fff',
    },
});
