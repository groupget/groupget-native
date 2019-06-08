import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';
import getTokenFromLocalStorage from '../config/getTokenFromStorage';
import {AsyncStorage} from 'react-native';

export const LOGIN = '@logged/LOGIN';
export const REFRESH = '@logged/REFRESH';
export const LOGOUT = '@logged/LOGOUT';

const initialState = {
    logged: AsyncStorage.getItem('logged'),
    cognitoUser: {}
};

export default (state = initialState, action) => {

    switch (action.type) {

        case LOGIN:
            return {
                ...state,
                logged: true,
                cognitoUser: action.cognitoUser
            };

        case LOGOUT:
            return {
                ...state,
                logged: false,
            };

        case REFRESH:
            let refreshToken = {
                RefreshToken: getTokenFromLocalStorage('refreshToken')
            };
            let cognitoRefreshToken = new AmazonCognitoIdentity.CognitoRefreshToken(refreshToken);
            state.cognitoUser.refreshSession(cognitoRefreshToken, (error, session) => {
                console.log(error);
                console.log(session);
            });
            return {
                ...state,
            };

        default:
            return state
    }
}

export const loginSuccess = cognitoUser => dispatch => {
    dispatch({ type: LOGIN, cognitoUser: cognitoUser })
};

export const logout = () => dispatch => {
    AsyncStorage.clear();
    dispatch({ type: LOGOUT })
};
