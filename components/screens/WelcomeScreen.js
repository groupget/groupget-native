import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';

import { MyContext } from '../../App';
import Title from '../common/Title';
import Button from '../common/Button';
import MarginContent from '../common/MarginContent';
import Icon from '../common/Icon';
import rows from '../../constants/WelcomeRows';


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
                                    fontSize : 24,
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

                                    {
                                        rows.map((rowData, key) => {
                                            const { icon, color, text } = rowData;
                                            return this._renderRow(icon, color, text, key)
                                        })
                                    }

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

    _renderRow = (icon, color, text, key) => {
        return (
            <View key={ key } style={ styles.infoRow }>
                <Icon name={ icon }
                      size={ 50 }
                      color={ color }
                      style={ styles.margin }
                />
                <Text style={ { fontSize: 24, color: '#000' } }>
                    { text }
                </Text>
            </View>
        )
    };

    _handleStart = () => {
        const { navigation } = this.props;
        navigation.replace('Groups');
    };
}

const styles = StyleSheet.create({
    infoRow : {
        display        : 'flex',
        flexDirection  : 'row',
        alignItems     : 'center',
        backgroundColor: '#fff',
        alignSelf      : 'stretch',
        marginTop      : 20
    },
    infoCell: {
        flex     : 1,
        alignSelf: 'stretch',

    },
    margin  : {
        marginRight: 30,
    }
});

export default WelcomeScreen;
