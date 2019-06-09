import UserPool from '../constants/UserPool';

export default async () => {
    let token = null;

    let promise = await UserPool.storage.sync((err, result) => {
        if (err) {
            console.log(err);
        } else if (result === 'SUCCESS') {
            const cognitoUser = UserPool.getCurrentUser();
            console.log('cognito user from fetch token:', cognitoUser);
            if (cognitoUser != null) {
                cognitoUser.getSession((err, session) => {
                    if (err) {
                        alert(err.message || JSON.stringify(err));
                        return;
                    }
                    token = session.getIdToken().getJwtToken();
                    console.log('token from inside function: ', token);
                    return token;
                });
            }
        } else {
            console.log('result from fetch token: ', result);
        }
    });

    console.log('promise token: ', promise);
    return promise;
}
