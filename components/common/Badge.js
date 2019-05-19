import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import { Badge as NativeBadge } from 'native-base';
import Colors from '../../constants/Colors';

const Badge = (props) => {

    const { text, type, style } = props;

    return (
        <NativeBadge warning={ type === 'minus' }
                     primary={ type === 'zero' }
                     success={ type === 'plus' }
                     style={ {
                         ...style,
                         width : 65,
                         height: 32,
                         borderRadius: 12,
                         display: 'flex',
                         justifyContent: 'center',
                         alignItems: 'center'
                     } }
        >
            <Text style={ {
                fontSize: 16,
                color   : Colors.blackText,
            } }
            >
                { text.toFixed(2) }
            </Text>
        </NativeBadge>
    );
};

Badge.propTypes = {
    text : PropTypes.number.isRequired,
    type : PropTypes.oneOf(['plus', 'minus', 'zero']).isRequired,
    style: PropTypes.object,
};

Badge.defaultProps = {
    disabled: false,
    type    : 'zero',
};

export default Badge;
