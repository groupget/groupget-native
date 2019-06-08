import { combineReducers } from 'redux';
import { reducer as notifReducer } from 'redux-notifications';
import login from './login';
import messages from './messages';

const appReducer = combineReducers({
    login,
    messages,
    notifs: notifReducer,
});

const rootReducer = (state, action) => {
    return appReducer(state, action)
};

export default rootReducer;
