import React, { Component } from 'react';
import { View, StyleSheet, Modal } from 'react-native';
import { Container, List, Button, Fab, ActionSheet, Form } from 'native-base';
import PropTypes from 'prop-types';

import FormButton from '../common/Button'
import ListItem from '../common/ListItem';
import Icon from '../common/Icon';
import Colors from '../../constants/Colors';
import ActivitiesIcons from '../../constants/ActivitiesIcons';
import MarginContent from '../common/MarginContent';
import Title from '../common/Title';
import TextInput from '../common/TextInput';


const groups = [
    {
        index: 1,
        name : 'Group1'
    },
    {
        index: 2,
        name : 'Group2'
    },
    {
        index: 3,
        name : 'Group3'
    }
];

const BUTTONS = ['Delete', 'Cancel'];
const DESTRUCTIVE_INDEX = 0;
const CANCEL_INDEX = 1;

export default class GroupsList extends Component {
    static navigationOptions = {};

    state = {
        active : false,
        clicked: -1,
        name   : '',
    };

    render() {

        const { active, name } = this.state;

        return (
            <Container style={ styles.container }>
                <View style={ { flex: 1 } }>
                    <List>
                        {
                            groups.map((group, key) => <ListItem
                                key={ key }
                                onPress={ () => this._onGroupPress(group) }
                                content={ group.name }
                                icon={ ActivitiesIcons.group }
                                menu={
                                    <Button transparent
                                            onPress={ () => this._onMenuPress(group) }
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
                                <Title text={ 'Add New Group' }/>
                                <MarginContent>
                                    <Form>
                                        <TextInput onChange={ this._handleInputChange('name') }
                                                   placeholder={ 'Name' }
                                                   value={ name }
                                        />
                                        <FormButton onClick={ this._addGroup }
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

    _onGroupPress = (group) => {
        const { onGroupSelect } = this.props;
        onGroupSelect(group.index)
    };

    _onMenuPress = (group) => {
        ActionSheet.show(
            {
                options               : BUTTONS,
                cancelButtonIndex     : CANCEL_INDEX,
                destructiveButtonIndex: DESTRUCTIVE_INDEX,
                title                 : group.name,
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

    _addGroup = () => {
        const { active } = this.state;
        this.setState({ active: !active, name: '' })
    }

}

GroupsList.propTypes = {
    onGroupSelect: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
    container: {
        flex           : 1,
        backgroundColor: '#fff',
    },
});
