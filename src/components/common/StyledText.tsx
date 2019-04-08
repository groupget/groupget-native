import React from 'react';
import {Text} from 'react-native';

type MonoTextProps = {
    style: object;
    children?: string;
}

export const MonoText = (props: MonoTextProps) => {
    return <Text {...props} style={[props.style, {fontFamily: 'space-mono'}]}/>;
};
