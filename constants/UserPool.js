import cognitoConfig from '../config/cognitoConfig';
import * as AmazonCognitoIdentity from "amazon-cognito-identity-js";

const poolData = {
    UserPoolId: cognitoConfig.cognito.USER_POOL_ID,
    ClientId  : cognitoConfig.cognito.APP_CLIENT_ID
};

export default new AmazonCognitoIdentity.CognitoUserPool(poolData);
