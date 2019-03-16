import React from 'react';
import { View, SafeAreaView } from 'react-native';

const MarginContent = (props) => (
    <View style={ {
        marginHorizontal: 20,
    } }>
        {/*<SafeAreaView/>*/}
        {props.children}
    </View>
);

export default MarginContent;
