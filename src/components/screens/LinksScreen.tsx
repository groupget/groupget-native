import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {ExpoLinksView} from '@expo/samples';
import {ScreenProps} from './interfaces/ScreenProps';

interface LinksScreenProps extends ScreenProps {

}

class LinksScreen extends React.Component<LinksScreenProps> {
    static navigationOptions = {
        title: 'Links',
    };

    render(): JSX.Element {
        return (
            <ScrollView style={styles.container}>
                <ExpoLinksView/>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: '#fff',
    },
});

export default LinksScreen;
