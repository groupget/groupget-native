import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';
import UserPool from '../constants/UserPool';

async function refresh(refreshToken) {
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

                    resolve({
                        token       : session.getIdToken().getJwtToken(),
                        refreshToken: session.getRefreshToken().getToken()
                    });

                    reject('refresh tokens error');
                });
            }
        });
    });
}
