import React, { Component } from 'react';
import { View, StyleSheet, Modal } from 'react-native';
import { Container, List, Button as NativeButton, Fab, ActionSheet, Form, Text } from 'native-base';
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


const BUTTONS = ['Delete', 'Cancel'];
const DESTRUCTIVE_INDEX = 0;
const CANCEL_INDEX = 1;

const FETCH_ALL_LISTS = gql`
  query groupLists($groupId: String!){ 
      groupLists(groupId: $groupId) {
        title
        description
        createdAt
      }
  }
`;

export default class ListsTab extends Component {
    static navigationOptions = {};

    state = {
        active : false,
        clicked: -1,
        name   : '',
    };

    render() {
        const { groupName } = this.props;
        const { active, name } = this.state;

        return (
            <Query query={ FETCH_ALL_LISTS }
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
                        const lists = data['groupLists'];
                        return (
                            <Container style={ styles.container }>
                                <View style={ { flex: 1 } }>
                                    <List>
                                        {
                                            lists.map((list, key) => <ListItem
                                                key={ key }
                                                onPress={ this._showItems }
                                                content={ `${ list.title } - ${ list.description }` }
                                                menu={
                                                    <NativeButton transparent
                                                                  onPress={ () => this._onMenuPress(list) }
                                                    >
                                                        <Icon name={ 'more' }/>
                                                    </NativeButton>
                                                }
                                                icon={ ActivitiesIcons.list }
                                                iconStyle={ { color: list.status === 'active' ? '#f4aa42' : '#00cc00' } }
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
                                                <Title text={ 'Add New Shopping List' }/>
                                                <MarginContent>
                                                    <Form>
                                                        <TextInput onChange={ this._handleInputChange('name') }
                                                                   placeholder={ 'Name' }
                                                                   value={ name }
                                                        />
                                                        <FormButton onClick={ this._addList }
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
                            </Container>)
                    } }
            </Query>
        );
    }

    _onMenuPress = (list) => {
        ActionSheet.show(
            {
                options               : BUTTONS,
                cancelButtonIndex     : CANCEL_INDEX,
                destructiveButtonIndex: DESTRUCTIVE_INDEX,
                title                 : list.name,
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

    _handleInputChange = fieldName => text => {
        this.setState({ [fieldName]: text })
    };

    _addList = () => {
        const { active } = this.state;
        this.setState({ active: !active, name: '' })
    };

    _showItems = () => {
        this.props.navigation.push('ListItems');
    };

}

const styles = StyleSheet.create({
    container: {
        flex           : 1,
        backgroundColor: '#fff',
    },
});
