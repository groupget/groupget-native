import React from 'react';
import { StyleSheet } from 'react-native';
import { Container, Tab, Tabs, Text } from 'native-base';
import MembersTab from './MembersTab';
import ListsTab from './ListsTab';
import ExpensesTab from './ExpensesTab';
import ActivityTab from './ActivityTab';
import endpoints from '../../config/endpoints';
import fetchMainToken from '../../utils/fetchMainToken';
import refreshTokens from '../../utils/refreshTokens';
import saveRefreshToken from '../../utils/saveRefreshToken';
import saveMainToken from '../../utils/saveMainToken';
import fetchRefreshToken from '../../utils/fetchRefreshToken';
import { ApolloProvider } from 'react-apollo';
import { createBudgetApolloClient, createPlanningApolloClient } from '../../utils/apollo';

export default class GroupView extends React.Component {
    static navigationOptions = {
        header: null,
    };

    state = {
        members       : [],
        token         : '',
        budgetClient  : null,
        planningClient: null,
    };

    async componentDidMount() {
        const { navigation } = this.props;
        const groupName = navigation.getParam('name', 'no name provided');

        const token = await fetchMainToken();
        const refreshToken = await fetchRefreshToken();
        const budgetClient = createBudgetApolloClient(token);
        const planningClient = createPlanningApolloClient(token);

        this.setState({ token });
        this.setState({ budgetClient });
        this.setState({ planningClient });

        fetch(`${ endpoints.ACCOUNTS }/groups/${ groupName }`, {
            headers: new Headers({
                'Authorization': 'Bearer ' + token,
            }),
        })
            .then(response => response.json())
            .then(responseData => {
                this.setState({ members: responseData.usernames });
                refreshTokens(refreshToken)
                    .then(tokens => {
                        saveRefreshToken(tokens.refreshToken);
                        saveMainToken(tokens.mainToken);
                        this.setState({ token: tokens.mainToken });
                    });
            })
            .catch(err => {
                alert(err.message || JSON.stringify(err))
            });
    }

    render() {

        const { members, planningClient, budgetClient } = this.state;
        const { navigation } = this.props;
        const groupName = navigation.getParam('name', 'no name provided');

        return (
            <Container style={ styles.container }>
                <Tabs>
                    <Tab heading='MEMBERS'
                         tabStyle={ styles.tabContainer }
                         activeTabStyle={ styles.activeTab }
                         activeTextStyle={ styles.activeTab }
                    >
                        {
                            budgetClient ? <ApolloProvider client={ budgetClient }>
                                <MembersTab members={ members }
                                            groupName={ groupName }
                                />
                            </ApolloProvider> : <Text>Loading...</Text>
                        }

                    </Tab>
                    <Tab heading='LISTS'
                         tabStyle={ styles.tabContainer }
                         activeTabStyle={ styles.activeTab }
                         activeTextStyle={ styles.activeTab }
                    >
                        <ListsTab navigation={ this.props.navigation }
                                  groupName={ groupName }
                        />
                    </Tab>
                    <Tab heading='EXPENSES'
                         tabStyle={ styles.tabContainer }
                         activeTabStyle={ styles.activeTab }
                         activeTextStyle={ styles.activeTab }
                    >
                        <ExpensesTab groupName={ groupName }
                        />
                    </Tab>
                    <Tab heading='ACTIVITY'
                         tabStyle={ styles.tabContainer }
                         activeTabStyle={ styles.activeTab }
                         activeTextStyle={ styles.activeTab }
                    >
                        <ActivityTab groupName={ groupName }
                        />
                    </Tab>
                </Tabs>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container   : {
        flex           : 1,
        backgroundColor: '#fff',
    },
    tabContainer: {
        backgroundColor: '#ffffff',
    },
    activeTab   : {
        fontWeight     : 'normal',
        color          : '#000',
        backgroundColor: '#ffffff'
    },
});
