import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import { Badge as NativeBadge } from 'native-base';
import Colors from '../../constants/Colors';

const Badge = (props) => {

    const { text, type } = props;

    return (
        <NativeBadge warning={ type === 'warning' }
                     primary={ type === 'primary' }
                     success={ type === 'success' }
        >
            <Text style={ {
                fontSize: 16,
                color   : Colors.blackText,
            } }
            >
                { text }
            </Text>
        </NativeBadge>
    );
};

Badge.propTypes = {
    text: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['primary', 'warning', 'success']).isRequired,
};

Badge.defaultProps = {
    disabled: false,
    type    : 'primary',
};

export default Badge;
