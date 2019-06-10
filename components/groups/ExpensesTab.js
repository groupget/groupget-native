import React, { Component } from 'react';
import { View, StyleSheet, Modal, ScrollView } from 'react-native';
import { Container, List, Button, Fab, ActionSheet, Form, Text } from 'native-base';
import jwtDecode from 'jwt-decode';

import FormButton from '../common/Button'
import ListItem from '../common/ListItem';
import Icon from '../common/Icon';
import Colors from '../../constants/Colors';
import MarginContent from '../common/MarginContent';
import Title from '../common/Title';
import TextInput from '../common/TextInput';
import ActivitiesIcons from '../../constants/ActivitiesIcons';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import fetchMainToken from '../../utils/fetchMainToken';

//
// const expenses = [
//     {
//         name  : 'Expense1',
//         money : 4.50,
//         status: 'plus',
//         owner : 'You',
//         date  : '2019-02-12'
//     },
//     {
//         name  : 'Expense2',
//         money : 12.50,
//         status: 'minus',
//         owner : 'User1',
//         date  : '2019-01-21'
//     },
// ];

const BUTTONS = ['Details', 'Cancel'];
const CANCEL_INDEX = 1;


const FETCH_ALL_EXPENSES = gql`
  query getExpenses($groupId: String!){ 
      getExpenses(groupId: $groupId) {
        username: userId
        amount
        description
        createdAt
      }
  }
`;

export default class ExpensesTab extends Component {
    static navigationOptions = {};

    state = {
        active  : false,
        clicked : -1,
        name    : '',
        money   : '',
        username: '',
    };

    async componentDidMount() {
        const token = await fetchMainToken();
        let decodedUsername = '';
        try {
            const decoded = jwtDecode(token);
            decodedUsername = decoded['cognito:username']
        } catch (e) {
            alert(e.message || JSON.stringify(e))
        }
        this.setState({ username: decodedUsername });
    }

    render() {

        const { groupName } = this.props;
        const { active, name, money, username } = this.state;

        return (
            <Query query={ FETCH_ALL_EXPENSES }
                   variables={ {
                       groupId: groupName
                   } }
            >
                {
                    ({ data, error, loading }) => {
                        if (loading) {
                            return <Text> Loading... </Text>
                        } else if (error) {
                            return <Text> { error } </Text>
                        }
                        const expenses = data['getExpenses'];
                        return (
                            <Container style={ styles.container }>
                                <ScrollView style={ { flex: 1 } }>
                                    <List>
                                        {
                                            expenses.map((expense, key) => <ListItem
                                                key={ key }
                                                content={ expense.description }
                                                icon={ ActivitiesIcons.expense }
                                                owner={ expense.username }
                                                price={ expense.amount }
                                                priceType={ expense.username === username ? 'plus' : 'minus' }
                                                // menu={
                                                //     <Button transparent
                                                //             onPress={ () => this._onMenuPress(expense) }
                                                //     >
                                                //         <Icon name={ 'more' }/>
                                                //     </Button>
                                                // }
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
                                </ScrollView>
                            </Container>
                        )
                    }
                }
            </Query>
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
