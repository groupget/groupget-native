import React from 'react';
import {View, SafeAreaView} from 'react-native';

type MarginContentProps = {
    children?: JSX.Element | JSX.Element[];
}

const MarginContent = (props: MarginContentProps) => (
    <View style={{
        marginHorizontal: 20,
    }}>
        <SafeAreaView/>
        {props.children}
    </View>
);

export default MarginContent;
