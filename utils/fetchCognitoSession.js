import cognitoConfig from '../config/cognitoConfig';
import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';

export default () => {
    const poolData = {
        UserPoolId: cognitoConfig.cognito.USER_POOL_ID,
        ClientId  : cognitoConfig.cognito.APP_CLIENT_ID
    };
    const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

    let cognitoSession = null;

    userPool.storage.sync((err, result) => {
        if (err) {
            console.log(err);
        } else if (result === 'SUCCESS') {
            const cognitoUser = userPool.getCurrentUser();
            console.log('cognito user from fetch cognito session:', cognitoUser);
            if (cognitoUser != null) {
                cognitoUser.getSession((err, session) => {
                    if (err) {
                        alert(err.message || JSON.stringify(err));
                        return;
                    }

                    console.log('session validity: ' + session.isValid());
                    cognitoSession = session;

                });
            }
        } else {
            console.log('result from fetch: ', result);
        }
    });

    return cognitoSession;
}
