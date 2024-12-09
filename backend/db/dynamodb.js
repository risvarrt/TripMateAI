const AWS = require("aws-sdk");
const { fetchAWSSecret } = require("../utils/lamdaSecrets");

let dynamoDB;
let TABLE_NAME;

// Initialize AWS DynamoDB
const initializeAWS = async () => {
  try {
    const awsSecrets = await fetchAWSSecret();
    console.log(awsSecrets)
    AWS.config.update({
      region: awsSecrets.REGION,
      accessKeyId: awsSecrets.aws_access_key_id,
      secretAccessKey: awsSecrets.aws_secret_access_key,
      sessionToken: awsSecrets.aws_session_token,
    });
    dynamoDB = new AWS.DynamoDB.DocumentClient();
    console.log("AWS Config:", AWS.config.credentials);
    TABLE_NAME = awsSecrets.TABLE_NAME; // Set table name here
    console.log("AWS DynamoDB initialized successfully.");
  } catch (error) {
    console.error("Error initializing AWS DynamoDB:", error);
    throw new Error("AWS DynamoDB initialization failed.");
  }
};

// Ensure DynamoDB is initialized before any operations
const ensureDynamoDBInitialized = async () => {
  if (!dynamoDB || !TABLE_NAME) {
    await initializeAWS();
  }
};

// Save trip to DynamoDB
exports.saveTripToDynamoDB = async (tripDetails) => {
  try {
    // Ensure DynamoDB is initialized
    await ensureDynamoDBInitialized();

    const TripId = `trip-${Date.now()}`; // Generate a unique trip_id
    const params = {
      TableName: TABLE_NAME,
      Item: { ...tripDetails, TripId }, // Use trip_id as the primary key
    };

    await dynamoDB.put(params).promise();
    console.log("Trip saved successfully:", TripId);
    return TripId;
  } catch (error) {
    console.error("Error saving trip to DynamoDB:", error);
    throw new Error("Failed to save trip.");
  }
};

// Get trips by email
exports.getTripsByEmail = async (email) => {
  try {
    // Ensure DynamoDB is initialized
    await ensureDynamoDBInitialized();

    const params = {
      TableName: TABLE_NAME,
      FilterExpression: "email = :email",
      ExpressionAttributeValues: {
        ":email": email,
      },
    };

    const result = await dynamoDB.scan(params).promise();
    console.log("Trips retrieved successfully for email:", email);
    return result.Items || [];
  } catch (error) {
    console.error("Error retrieving trips by email:", error);
    throw new Error("Failed to retrieve trips.");
  }
};

// Get trip by ID
exports.getTripById = async (tripId) => {
  try {
    // Ensure DynamoDB is initialized
    await ensureDynamoDBInitialized();

    const params = {
      TableName: TABLE_NAME,
      Key: { TripId: tripId },
    };

    const result = await dynamoDB.get(params).promise();
    if (!result.Item) {
      throw new Error(`Trip with ID ${tripId} not found.`);
    }

    console.log("Trip retrieved successfully for ID:", tripId);
    return result.Item;
  } catch (error) {
    console.error("Error retrieving trip by ID:", error);
    throw new Error("Failed to retrieve trip.");
  }
};
