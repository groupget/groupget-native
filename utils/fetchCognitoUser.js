import cognitoConfig from '../config/cognitoConfig';
import * as AmazonCognitoIdentity from "amazon-cognito-identity-js";

export default (onSessionValid, onSessionInvalid) => {
    const poolData = {
        UserPoolId: cognitoConfig.cognito.USER_POOL_ID,
        ClientId  : cognitoConfig.cognito.APP_CLIENT_ID
    };
    const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

    userPool.storage.sync((err, result) => {
        if (err) {
            console.log(err);
        } else if (result === 'SUCCESS') {
            const cognitoUser = userPool.getCurrentUser();
            console.log('cognito user from sign in screen:', cognitoUser);
            if (cognitoUser != null) {
                cognitoUser.getSession((err, session) => {
                    if (err) {
                        alert(err.message || JSON.stringify(err));
                        return;
                    }

                    if(session === null) {
                        onSessionInvalid();
                        return;
                    }

                    console.log('session validity: ' + session.isValid());

                    cognitoUser.getUserAttributes(function(err, attributes) {
                        if (err) {
                            alert(err.message || JSON.stringify(err));
                        } else {
                            // Do something with attributes
                        }
                    });

                    // AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                    //     IdentityPoolId : '...', // your identity pool id here
                    //     Logins : {
                    //         // Change the key below according to the specific region your user pool is in.
                    //         'cognito-idp.<region>.amazonaws.com/<YOUR_USER_POOL_ID>' : session.getIdToken().getJwtToken()
                    //     }
                    // });

                    // Instantiate aws sdk service objects now that the credentials have been updated.
                    // example: var s3 = new AWS.S3();

                    onSessionValid();

                });
            }
        } else {
            console.log('result from fetch: ', result);
        }
    });
}
