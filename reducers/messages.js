import {notifSend} from 'redux-notifications/src/actions';

export const SHOW_LOADING_BLOCKER = '@globalMessages/SHOW_LOADING_BLOCKER';
export const HIDE_LOADING_BLOCKER = '@globalMessages/HIDE_LOADING_BLOCKER';

const initialState = {
    loadingBlockerVisible: false
};

export default (state = initialState, action) => {

    switch (action.type) {

        case SHOW_LOADING_BLOCKER:
            return {
                ...state,
                loadingBlockerVisible: true,
            };

        case HIDE_LOADING_BLOCKER:
            return {
                ...state,
                loadingBlockerVisible: false,
            };

        default:
            return state
    }
}

export const showSuccessMessage = (message) => dispatch => {
    dispatch(notifSend({
        message: message,
        kind: 'success',
        dismissAfter: 2000
    }))
};

export const showInfoMessage = (message) => dispatch => {
    dispatch(notifSend({
        message: message,
        kind: 'info',
        dismissAfter: 2000
    }))
};

export const showWarningMessage = (message) => dispatch => {
    dispatch(notifSend({
        message: message,
        kind: 'warning',
        dismissAfter: 2000
    }))
};

export const showErrorMessage = (message) => dispatch => {
    dispatch(notifSend({
        message: message,
        kind: 'danger',
        dismissAfter: 2000
    }))
};

export const showLoadingBlocker = (visible) => dispatch => {
    if (visible) {
        dispatch({ type: SHOW_LOADING_BLOCKER})
    } else {
        dispatch({ type: HIDE_LOADING_BLOCKER})
    }
};
