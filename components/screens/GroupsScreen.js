import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';

import GroupView from '../groups/GroupView';
import GroupsList from '../groups/GroupsList';

//fixme set navigation option to return to groups list on left arrow click
export default class GroupsScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    state = {
        selectedGroupIndex: -1
    };

    render() {

        const { selectedGroupIndex } = this.state;

        return (
            <SafeAreaView style={ styles.container }>
                {
                    selectedGroupIndex >= 0 ?
                        <GroupView/> :
                        <GroupsList onGroupSelect={ this.onGroupSelect }/>
                }
            </SafeAreaView>
        );
    }

    onGroupSelect = (index) => {
        this.setState({ selectedGroupIndex: index })
    }
}

const styles = StyleSheet.create({
    container: {
        flex           : 1,
        backgroundColor: '#fff',
    }
});
