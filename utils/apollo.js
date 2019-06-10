import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import endpoints from '../config/endpoints';


export const createBudgetApolloClient = (token) => {
    const link = new HttpLink({
        uri: endpoints.BUDGET,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return new ApolloClient({
        link,
        cache: new InMemoryCache()
    })
};

export const createPlanningApolloClient = (token) => {
    const link = new HttpLink({
        uri: endpoints.PLANNING,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return new ApolloClient({
        link,
        cache: new InMemoryCache()
    })
};
