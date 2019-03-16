import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import Colors from '../../constants/Colors';

const Title = (props) => {

    function generateFontSize(size) {
        switch(size) {
            case 'small': return 16;
            case 'medium': return 20;
            case 'large': return 28;
        }
    }

    return (
        <Text
            style={ {
                fontSize      : generateFontSize(props.size),
                textAlign     : 'center',
                fontWeight    : '500',
                marginVertical: 20,
                color         : Colors.primaryColor
            } }
        >
            {props.text}
        </Text>
    );
};

Title.propTypes = {
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    text: PropTypes.string.isRequired,
};

Title.defaultProps = {
    size: 'medium'
};

export default Title;
