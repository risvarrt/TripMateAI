const axios = require("axios");
require("dotenv").config();
// API Gateway URLs for the Lambda functions
const AWS_SECRET_URL = process.env.LAMBDA_AWS_SECRET_URL;
const GCP_SECRET_URL = process.env.LAMBDA_GCP_SECRET_URL;


const fetchAWSSecret = async () => {
  try {
    const response = await axios.get(AWS_SECRET_URL); 
    const {statusCode,body} = response.data; 
    console.log(response.data)
    const parsedBody = JSON.parse(body);
    if (!parsedBody.secret) {
      throw new Error("Secrets not found in the response.");
    }

    return parsedBody.secret;
  } catch (error) {
    console.error("Error fetching AWS secrets:", error.message);
    throw new Error("Unable to retrieve AWS secrets.");
  }
};


const fetchGCPSecret = async () => {
    try {
      const response = await axios.get(GCP_SECRET_URL); 
      const {statusCode,body} = response.data; 
    const parsedBody = JSON.parse(body);
    if (!parsedBody.secret) {
      throw new Error("Secrets not found in the response.");
    }

    return parsedBody.secret;
    } catch (error) {
      console.error("Error fetching GCP secrets:", error.message);
      throw new Error("Unable to retrieve GCP secrets.");
    }
  };
module.exports = {
  fetchAWSSecret,
  fetchGCPSecret,
};
