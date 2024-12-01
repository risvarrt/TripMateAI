const AWS = require("aws-sdk");
const crypto = require("crypto");
require("dotenv").config();

AWS.config.update({ region: process.env.AWS_REGION });

const cognito = new AWS.CognitoIdentityServiceProvider();

const CLIENT_ID = process.env.CLIENT_ID; // App Client ID
const CLIENT_SECRET = process.env.CLIENT_SECRET; // App Client Secret

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
    SecretHash: generateSecretHash(email), // Include the SECRET_HASH
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
    ClientId: CLIENT_ID, // Use defined CLIENT_ID
    AuthParameters: {
      USERNAME: email,
      PASSWORD: password,
    },
  };

  if (CLIENT_SECRET) {
    params.AuthParameters.SECRET_HASH = generateSecretHash(email); // Use CLIENT_SECRET for SECRET_HASH
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
    ClientId: process.env.CLIENT_ID, // Cognito App Client ID
    Username: email,
  };

  return cognito.resendConfirmationCode(params).promise();
};

exports.confirmUser = async (email, code) => {
  const params = {
    ClientId: process.env.CLIENT_ID,
    SecretHash: generateSecretHash(email), // Replace with your Cognito App Client ID
    Username: email,
    ConfirmationCode: code,
  };

  return cognito.confirmSignUp(params).promise();
};
