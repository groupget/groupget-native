import React from 'react';
import { StyleSheet, View, Modal } from 'react-native';

import { Container, Fab, Form, List, Button as NativeButton, ActionSheet, Text } from 'native-base';
import ListItem from '../common/ListItem';
import Icon from '../common/Icon';
import Colors from '../../constants/Colors';
import Title from '../common/Title';
import MarginContent from '../common/MarginContent';
import TextInput from '../common/TextInput';
import FormButton from '../common/Button';
import gql from 'graphql-tag';
import { ApolloProvider, Query } from 'react-apollo';


const items = [
    {
        name  : 'Cheese',
        price : undefined,
        bought: false,
        owner : undefined,
    },
    {
        name  : 'Milk',
        price : 2,
        bought: true,
        owner : 'You',
    },
];

const BUTTONS = ['Delete', 'Cancel'];
const DESTRUCTIVE_INDEX = 0;
const CANCEL_INDEX = 1;

const FETCH_LIST_ITEMS = gql`
  query getItems($listId: String!){ 
      getItems(listId: $listId) {
        description
        isChecked
      }
  }
`;

export default class ListItemsScreen extends React.Component {

    state = {
        active: false,
        name  : '',
    };

    render() {

        const { active, name } = this.state;
        const { navigation } = this.props;
        const listId = navigation.getParam('listId', 'no id provided');
        const client = navigation.getParam('client', 'no client provided');

        return (
            <ApolloProvider client={ client }>
                <Query query={ FETCH_LIST_ITEMS }
                       variables={ {
                           listId: listId
                       } }
                >
                    {
                        ({ data, error, loading }) => {
                            if (loading) {
                                return <Text> Loading... </Text>
                            } else if (error) {
                                return <Text> { error } </Text>
                            }
                            const items = data['getItems'];
                            return (
                                <Container style={ styles.container }>
                                    <View style={ { flex: 1 } }>
                                        <List>
                                            {
                                                items.map((item, key) => <ListItem
                                                    key={ key }
                                                    content={ item.description }
                                                    menu={
                                                        <NativeButton transparent
                                                                      onPress={ () => this._onMenuPress(item) }
                                                        >
                                                            <Icon name={ 'more' }/>
                                                        </NativeButton>
                                                    }
                                                    checkbox={ {
                                                        onPress: (item) => this._onItemPress(item),
                                                        checked: item.isChecked
                                                    } }
                                                    // price={ item.price }
                                                    // priceType={ item.owner === 'You' ? 'plus' : 'minus' }
                                                    // owner={ item.owner }
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
                                                    <Title text={ 'Add New Item to List' }/>
                                                    <MarginContent>
                                                        <Form>
                                                            <TextInput onChange={ this._handleInputChange('name') }
                                                                       placeholder={ 'Name' }
                                                                       value={ name }
                                                            />
                                                            <FormButton onClick={ this._addItem }
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
                            )
                        }
                    }
                </Query>
            </ApolloProvider>
        );
    }

    _onMenuPress = (item) => {
        ActionSheet.show(
            {
                options               : BUTTONS,
                cancelButtonIndex     : CANCEL_INDEX,
                destructiveButtonIndex: DESTRUCTIVE_INDEX,
                title                 : item.name,
            },
            buttonIndex => {
                this.setState({ clicked: BUTTONS[buttonIndex] });
            }
        )
    };

    _onFabPress = () => {
        const { active } = this.state;
        this.setState({ active: !active, name: '' })
    };

    _addItem = () => {
        const { active } = this.state;
        this.setState({ active: !active, name: '' })
    };

    _onItemPress = (item) => {
        item.isChecked = !item.isChecked;
    };

    _handleInputChange = fieldName => text => {
        this.setState({ [fieldName]: text })
    };
}

const styles = StyleSheet.create({
    container: {
        flex           : 1,
        backgroundColor: '#fff',
    }
});
