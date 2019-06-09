import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';
import UserPool from '../constants/UserPool';

export default async function refreshTokens(refreshToken) {
    let refreshTokenObj = {
        RefreshToken: refreshToken
    };

    let cognitoRefreshToken = new AmazonCognitoIdentity.CognitoRefreshToken(refreshTokenObj);

    return new Promise((resolve, reject) => {
        UserPool.storage.sync((err, result) => {
            if (err) {
            } else if (result === 'SUCCESS') {
                UserPool.getCurrentUser().refreshSession(cognitoRefreshToken, (error, session) => {
                    if (error) {
                        console.log('error', error);
                    }

                    console.log('session', session);

                    let jwtToken = '';
                    let token = '';

                    try {
                        jwtToken = session.getIdToken().getJwtToken();
                        token = session.getRefreshToken().getToken();
                    } catch (e) {
                        console.log('refreshing tokens');
                        alert(e.message || JSON.stringify(e))
                    }

                    resolve({
                        mainToken   : jwtToken,
                        refreshToken: token
                    });

                    reject('refresh tokens error');
                });
            }
        });
    });
}
