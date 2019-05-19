import React from 'react';
import PropTypes from 'prop-types';
import { Icon as ExpoIcon } from 'expo';

import Colors from '../../constants/Colors';
import { Platform } from 'react-native';

export default class Icon extends React.Component {

    render() {

        const { style, color, size } = this.props;

        return (
            <ExpoIcon.Ionicons
                name={ this._generateIconName() }
                size={ size }
                style={ { ...style } }
                color={ color }
            />
        );
    }

    _generateIconName() {
        const { name } = this.props;
        return Platform.OS === 'ios'
            ? `ios-${ name }`
            : `md-${ name }`;
    }
}

Icon.propTypes = {
    name : PropTypes.string.isRequired,
    style: PropTypes.object,
    color: PropTypes.string,
    size : PropTypes.number,
};

Icon.defaultProps = {
    color: Colors.defaultIcon,
    size : 26,
};
