import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { CheckBox, Text, ListItem as NativeListItem } from 'native-base'

import Colors from '../../constants/Colors';
import Badge from './Badge';
import Icon from './Icon';

const ListItem = (props) => {

    const { icon, iconStyle, content, checkbox, owner, price, priceType, menu, onPress } = props;

    return (
        <NativeListItem style={ {
            display   : 'flex',
            alignItems: 'center',
            height    : 75,
        } }
                        onPress={ onPress }
        >
            {
                checkbox && <CheckBox checked={ checkbox.checked }
                                      color={ 'grey' }
                                      onPress={ checkbox.onPress }
                                      style={ styles.marginRight }
                />
            }
            { icon && <Icon name={ icon } style={ { ...iconStyle, ...styles.marginRight, marginTop: 2 } }/> }
            <Text style={ { ...styles.marginRight, flexGrow: 1 } }>{ content }</Text>
            { owner && <Text style={ styles.marginRight }>{ owner }</Text> }
            { price !== undefined ? <Badge text={ price }
                                           type={ priceType }
                                           style={ menu !== undefined ? { ...styles.marginRight, ...styles.badge } : { ...styles.badge } }
            /> : null }
            { menu ? <View style={ { marginLeft: 7 } }>{ menu }</View> : null }
        </NativeListItem>
    );
};

ListItem.propTypes = {
    checkbox : PropTypes.object,
    content  : PropTypes.string.isRequired,
    icon     : PropTypes.string,
    menu     : PropTypes.object,
    owner    : PropTypes.string,
    price    : PropTypes.number,
    priceType: PropTypes.oneOf(['plus', 'minus', 'zero']),
    onPress  : PropTypes.func,
};

ListItem.defaultProps = {};

const styles = StyleSheet.create({
    item       : {
        display        : 'flex',
        flexDirection  : 'column',
        alignItems     : 'center',
        flex           : 1,
        padding        : 10,
        backgroundColor: Colors.grayLightest,
    },
    marginRight: {
        marginRight: 10
    },
    badge      : {
        marginTop: 4
    }
});

export default ListItem;
