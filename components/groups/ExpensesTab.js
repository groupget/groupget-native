import React, { Component } from 'react';
import { View, StyleSheet, Modal } from 'react-native';
import { Container, List, Button, Fab, ActionSheet, Form } from 'native-base';
import FormButton from '../common/Button'

import ListItem from '../common/ListItem';
import Icon from '../common/Icon';
import Colors from '../../constants/Colors';
import MarginContent from '../common/MarginContent';
import Title from '../common/Title';
import TextInput from '../common/TextInput';
import ActivitiesIcons from '../../constants/ActivitiesIcons';


const expenses = [
    {
        name  : 'Expense1',
        money : 4.50,
        status: 'plus',
        owner : 'You',
        date  : '2019-02-12'
    },
    {
        name  : 'Expense2',
        money : 12.50,
        status: 'minus',
        owner : 'User1',
        date  : '2019-01-21'
    },
];

const BUTTONS = ['Details', 'Cancel'];
const CANCEL_INDEX = 1;

export default class ExpensesTab extends Component {
    static navigationOptions = {};

    state = {
        active : false,
        clicked: -1,
        name   : '',
        money  : '',
    };

    render() {

        const { active, name, money } = this.state;

        return (
            <Container style={ styles.container }>
                <View style={ { flex: 1 } }>
                    <List>
                        {
                            expenses.map((expense, key) => <ListItem
                                key={ key }
                                content={ expense.name }
                                icon={ ActivitiesIcons.expense }
                                owner={ expense.owner }
                                price={ expense.money }
                                priceType={ expense.status }
                                menu={
                                    <Button transparent
                                            onPress={ () => this._onMenuPress(expense) }
                                    >
                                        <Icon name={ 'more' }/>
                                    </Button>
                                }
                            />)
                        }
                    </List>
                    <Fab active={ active }
                         direction='up'
                         containerStyle={ {} }
                         style={ { backgroundColor: Colors.primaryColor } }
                         position='bottomRight'
                         onPress={ this._onFabPress }
                    >
                        <Icon name='add'/>
                    </Fab>
                    <Modal animationType='slide'
                           transparent={ false }
                           visible={ active }
                    >
                        <Container style={ { display: 'flex', justifyContent: 'center' } }>

                            <View>
                                <Title text={ 'Add Expense to Group' }/>
                                <MarginContent>
                                    <Form>
                                        <TextInput onChange={ this._handleInputChange('name') }
                                                   placeholder={ 'Name' }
                                                   value={ name }
                                        />
                                        <TextInput onChange={ this._handleInputChange('money') }
                                                   placeholder={ 'Money spent' }
                                                   value={ money }
                                        />
                                        <FormButton onClick={ this._addExpense }
                                                    text={ 'Add' }
                                        />
                                        <FormButton onClick={ this._onFabPress }
                                                    text={ 'Done' }
                                                    type={ 'secondary' }
                                        />
                                    </Form>
                                </MarginContent>
                            </View>

                        </Container>
                    </Modal>
                </View>
            </Container>
        );
    }

    _onMenuPress = (expense) => {
        ActionSheet.show(
            {
                options          : BUTTONS,
                cancelButtonIndex: CANCEL_INDEX,
                title            : expense.name,
            },
            buttonIndex => {
                this.setState({ clicked: BUTTONS[buttonIndex] });
            }
        )
    };

    _onFabPress = () => {
        const { active } = this.state;
        this.setState({ active: !active, email: '' })
    };

    _handleInputChange = fieldName => text => {
        this.setState({ [fieldName]: text })
    };

    _addExpense = () => {
        const { active } = this.state;
        this.setState({ active: !active, name: '', money: '' })
    }

}

const styles = StyleSheet.create({
    container: {
        flex           : 1,
        backgroundColor: '#fff',
    },
});
