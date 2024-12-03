const AWS = require("aws-sdk");
const crypto = require("crypto");
const { fetchAWSSecret } = require("./lamdaSecrets");

let cognito, CLIENT_ID, CLIENT_SECRET;

(async () => {
  const awsSecrets = await fetchAWSSecret();
  AWS.config.update({
    region: awsSecrets.REGION,
    accessKeyId: awsSecrets.ACCESS_KEY_ID,
    secretAccessKey: awsSecrets.SECRET_ACCESS_KEY,
    sessionToken: awsSecrets.SESSION_TOKEN,
  });

  cognito = new AWS.CognitoIdentityServiceProvider();
  CLIENT_ID = awsSecrets.CLIENT_ID;
  CLIENT_SECRET = awsSecrets.CLIENT_SECRET;
})();

// Generate the SECRET_HASH
const generateSecretHash = (username) => {
  return crypto
    .createHmac("SHA256", CLIENT_SECRET)
    .update(username + CLIENT_ID)
    .digest("base64");
};

// Sign up a user
exports.signUp = async (email, password, firstName, lastName) => {
  const params = {
    ClientId: CLIENT_ID,
    SecretHash: generateSecretHash(email),
    Username: email,
    Password: password,
    UserAttributes: [
      { Name: "email", Value: email },
      { Name: "name", Value: `${firstName} ${lastName}` },
    ],
  };

  return cognito.signUp(params).promise();
};

// Login a user
exports.loginUser = async (email, password) => {
  const params = {
    AuthFlow: "USER_PASSWORD_AUTH",
    ClientId: CLIENT_ID,
    AuthParameters: {
      USERNAME: email,
      PASSWORD: password,
    },
  };

  if (CLIENT_SECRET) {
    params.AuthParameters.SECRET_HASH = generateSecretHash(email);
  }

  const response = await cognito.initiateAuth(params).promise();
  return {
    accessToken: response.AuthenticationResult.AccessToken,
    idToken: response.AuthenticationResult.IdToken,
    refreshToken: response.AuthenticationResult.RefreshToken,
  };
};

exports.resendConfirmationCode = async (email) => {
  const params = {
    ClientId: CLIENT_ID,
    Username: email,
  };

  return cognito.resendConfirmationCode(params).promise();
};

exports.confirmUser = async (email, code) => {
  const params = {
    ClientId: CLIENT_ID,
    SecretHash: generateSecretHash(email),
    Username: email,
    ConfirmationCode: code,
  };

  return cognito.confirmSignUp(params).promise();
};
