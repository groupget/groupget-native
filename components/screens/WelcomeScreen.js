import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';

import { MyContext } from '../../App';
import Title from '../common/Title';
import Button from '../common/Button';
import MarginContent from '../common/MarginContent';
import Icon from '../common/Icon';


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
                        <View style={ {
                            position: 'absolute',
                            left    : 0,
                            top     : 0,
                            right   : 0,
                            bottom  : 0,
                            display : 'flex'
                        } }>
                            <MarginContent style={ {
                                display       : 'flex',
                                flex          : 1,
                                justifyContent: 'center',
                                alignItems    : 'center',
                                marginTop     : 70,
                                marginBottom  : 40,
                            } }>
                                <Title text={ `Welcome${ value.name ? ' ' + value.name : '' }!` }
                                       size={ 'large' }
                                />

                                <Text style={ {
                                    fontSize : 20,
                                    width    : 300,
                                    textAlign: 'center',
                                    marginTop: 70
                                } }>
                                    Groupget lets you do everything to
                                    manage your group budget by giving you
                                    possibility to:
                                </Text>

                                <View style={ {
                                    flexGrow      : 1,
                                    display       : 'flex',
                                    justifyContent: 'center',
                                    alignItems    : 'center',
                                    marginTop     : 30,
                                    marginBottom  : 30,
                                } }>

                                    <View style={ styles.infoRow }>
                                        <Icon name='card'
                                              size={ 50 }
                                              color='#ffcc00'
                                              style={ styles.margin }
                                        />
                                        <Text style={ { fontSize: 24, color: '#000' } }>
                                            Add Expenses
                                        </Text>
                                    </View>

                                    <View style={ styles.infoRow }>
                                        <Icon name='cart'
                                              size={ 50 }
                                              color='#1a8cff'
                                              style={ styles.margin }
                                        />
                                        <Text style={ { fontSize: 24, color: '#000' } }>
                                            Plan Shopping Lists
                                        </Text>
                                    </View>

                                    <View style={ styles.infoRow }>
                                        <Icon name='people'
                                              size={ 50 }
                                              color='#990099'
                                              style={ styles.margin }
                                        />
                                        <Text style={ { fontSize: 24, color: '#000' } }>
                                            Manage Groups
                                        </Text>
                                    </View>

                                    <View style={ styles.infoRow }>
                                        <Icon name='notifications'
                                              size={ 50 }
                                              color='#ff0066'
                                              style={ styles.margin }
                                        />
                                        <Text style={ { fontSize: 24, color: '#000' } }>
                                            Receive Notifications
                                        </Text>
                                    </View>

                                </View>
                                <Button text={ 'Great, let\'s go!' }
                                        onClick={ this._handleStart }
                                />
                            </MarginContent>
                        </View>
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

const styles = StyleSheet.create({
    infoRow: {
        display        : 'flex',
        flexDirection  : 'row',
        alignItems     : 'center',
        backgroundColor: '#fff',
        marginTop      : 20
    },
    margin : {
        marginRight: 30,
    }
});

export default WelcomeScreen;
