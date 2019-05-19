import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

const MarginContent = (props) => (
    <View style={ {
        ...props.style,
        marginHorizontal: 20,
        marginVertical  : 20,
    } }>
        { props.children }
    </View>
);

MarginContent.propTypes = {
    style: PropTypes.object,
};

export default MarginContent;
