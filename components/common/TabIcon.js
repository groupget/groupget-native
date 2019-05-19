import React from 'react';
import PropTypes from 'prop-types';

import Colors from '../../constants/Colors';
import Icon from './Icon';


export default class TabIcon extends React.Component {

    render() {

        const { focused, style, name } = this.props;

        return (
            <Icon
                name={ name }
                style={ { ...style, marginBottom: -3 } }
                color={ focused ? Colors.tabIconSelected : Colors.tabIconDefault }
            />
        );
    }

}

Icon.propTypes = {
    focused: PropTypes.bool,
    name   : PropTypes.string.isRequired,
    style  : PropTypes.object,
};
