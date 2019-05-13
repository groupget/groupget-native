import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../common/TabBarIcon';
import GroupsScreen from '../screens/GroupsScreen';
import AddExpenseScreen from '../screens/AddExpenseScreen';
import SettingsScreen from '../screens/SettingsScreen';

const GroupsStack = createStackNavigator({
    Home: GroupsScreen,
});

GroupsStack.navigationOptions = {
    tabBarLabel: 'Groups',
    tabBarIcon : ({ focused }) => (
        <TabBarIcon
            focused={ focused }
            name={
                Platform.OS === 'ios'
                    ? `ios-contacts`
                    : 'md-contacts'
            }
        />
    ),
    header: null,
};

const AddExpenseStack = createStackNavigator({
    AddExpense: AddExpenseScreen,
});

AddExpenseStack.navigationOptions = {
    tabBarLabel: 'Add',
    tabBarIcon : ({ focused }) => (
        <TabBarIcon
            focused={ focused }
            name={ Platform.OS === 'ios' ? 'ios-add-circle' : 'md-add-circle' }
        />
    ),
};

const SettingsStack = createStackNavigator({
    Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
    tabBarLabel: 'Account',
    tabBarIcon : ({ focused }) => (
        <TabBarIcon
            focused={ focused }
            name={ Platform.OS === 'ios' ? 'ios-options' : 'md-options' }
        />
    ),
};

export default createBottomTabNavigator({
    GroupsStack,
    AddExpenseStack,
    SettingsStack,
});
