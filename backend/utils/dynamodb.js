const AWS = require("aws-sdk");
require("dotenv").config();
// Configure AWS
AWS.config.update({
  region: "us-east-1",
});
const dynamoDB = new AWS.DynamoDB.DocumentClient();

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