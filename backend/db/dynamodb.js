const AWS = require("aws-sdk");
const { fetchAWSSecret } = require("../utils/lamdaSecrets");

// Configure AWS
let dynamoDB;
(async () => {
  const awsSecrets = await fetchAWSSecret();
  AWS.config.update({
    region: awsSecrets.REGION,
    accessKeyId: awsSecrets.ACCESS_KEY_ID,
    secretAccessKey: awsSecrets.SECRET_ACCESS_KEY,
    sessionToken: awsSecrets.SESSION_TOKEN,
  });
  dynamoDB = new AWS.DynamoDB.DocumentClient();
})();

// Save trip to DynamoDB
exports.saveTripToDynamoDB = async (tripDetails) => {
  const trip_id = `trip-${Date.now()}`; // Generate a unique trip_id
  const params = {
    TableName: "trips", // Ensure this matches your table name
    Item: { ...tripDetails, trip_id }, // Use trip_id as the primary key
  };

  await dynamoDB.put(params).promise();
  return trip_id;
};

exports.getTripsByEmail = async (email) => {
  const params = {
    TableName: "trips",
    FilterExpression: "email = :email",
    ExpressionAttributeValues: {
      ":email": email,
    },
  };

  const result = await dynamoDB.scan(params).promise();
  return result.Items || [];
};

exports.getTripById = async (tripId) => {
  const params = {
    TableName: "trips",
    Key: { trip_id: tripId },
  };

  const result = await dynamoDB.get(params).promise();
  return result.Item;
};
