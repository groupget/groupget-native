import React from 'react';
import PropTypes from 'prop-types';
import { TextInput as TextInputNative } from 'react-native';

const TextInput = (props) => {

    const { onChange, value, placeholder } = props;

    return (
        <TextInputNative
            style={ {
                backgroundColor  : '#f0f0f0',
                borderRadius     : 8,
                paddingHorizontal: 12,
                paddingVertical  : 12,
                fontSize         : 16,
                marginVertical   : 3,
            } }
            onChangeText={ onChange }
            value={ value }
            placeholder={ placeholder }
            placeholderTextColor={ '#999' }
        />
    );
};


TextInput.propTypes = {
    onChange   : PropTypes.func.isRequired,
    value      : PropTypes.string.isRequired,
    placeholder: PropTypes.string,
};

export default TextInput;
