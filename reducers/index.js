import { combineReducers } from 'redux';
import login from './login';
import { reducer as notifReducer } from 'redux-notifications';

const appReducer = combineReducers({
    login,
    notifs: notifReducer,
});

const rootReducer = (state, action) => {
    return appReducer(state, action)
};

export default rootReducer;
