import React from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import GroupsScreen from '../screens/GroupsScreen';
import AddExpenseScreen from '../screens/AddExpenseScreen';
import SettingsScreen from '../screens/SettingsScreen';
import TabIcon from '../common/TabIcon';


const GroupsStack = createStackNavigator({
    Home: GroupsScreen,
});

GroupsStack.navigationOptions = {
    tabBarLabel: 'Groups',
    tabBarIcon : ({ focused }) => (
        <TabIcon focused={ focused }
                 name={ 'contacts' }
        />
    ),
    header     : null,
};

const AddExpenseStack = createStackNavigator({
    AddExpense: AddExpenseScreen,
});

AddExpenseStack.navigationOptions = {
    tabBarLabel: 'Add',
    tabBarIcon : ({ focused }) => (
        <TabIcon focused={ focused }
                 name={ 'add-circle' }
        />
    ),
};

const SettingsStack = createStackNavigator({
    Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
    tabBarLabel: 'Account',
    tabBarIcon : ({ focused }) => (
        <TabIcon focused={ focused }
                 name={ 'options' }
        />
    ),
};

export default createBottomTabNavigator({
    GroupsStack,
    AddExpenseStack,
    SettingsStack,
});
