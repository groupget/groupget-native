import {applyMiddleware, compose, createStore} from 'redux';
import {connectRouter, routerMiddleware} from 'connected-react-router';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

const initialState = {};
const enhancers = [];
const middleware = [thunk, routerMiddleware({})];

const composedEnhancers = compose(
    applyMiddleware(...middleware),
    ...enhancers
);

export default createStore(
    connectRouter(rootReducer),
    initialState,
    composedEnhancers
);
