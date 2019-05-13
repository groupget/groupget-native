import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import { Button as NativeButton } from 'native-base';
import Colors from '../../constants/Colors';

const Button = (props) => {

    const { text, onClick, disabled, type } = props;

    return (
        <NativeButton primary={ type === 'primary' }
                      danger={ type === 'danger' }
                      bordered={type === 'secondary'}
                      onPress={ onClick }
                      disabled={ disabled }
                      style={ {
                          borderRadius: 8,
                          marginTop: 20,
                      } }
                      full
        >
            <Text style={ {
                fontSize: 16,
                color   : type === 'secondary' ? Colors.primaryColor : Colors.whiteText,
            } }
            >
                { text }
            </Text>
        </NativeButton>
    );
};

Button.propTypes = {
    onClick : PropTypes.func.isRequired,
    text    : PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    type    : PropTypes.oneOf(['primary', 'danger', 'secondary']),
};

Button.defaultProps = {
    disabled: false,
    type: 'primary',
};

export default Button;
