const { PredictionServiceClient } = require("@google-cloud/aiplatform").v1;
require("dotenv").config();

// Provide the path to your service account key file
const serviceAccountPath = "service-account-key.json"; // Update this path

const projectId = process.env.GCP_PROJECT_ID; // Your Google Cloud Project ID
const location = "us-central1"; // Region for Vertex AI

exports.generateItinerary = async (tripDetails) => {
  const client = new PredictionServiceClient({
    keyFilename: serviceAccountPath, // Explicitly load credentials
    apiEndpoint: `${location}-aiplatform.googleapis.com`, // Explicit gRPC endpoint
  });

  const endpoint = `projects/${projectId}/locations/${location}/publishers/google/models/text-bison:predict`;

  const prompt = `
    Create a detailed itinerary for the following trip:
    - Destination: ${tripDetails.destination}
    - Duration: ${tripDetails.duration} days
    - Travel Dates: ${tripDetails.startDate} to ${tripDetails.endDate}
    - Number of People: ${tripDetails.numberOfPeople}
    - Pace of the Trip: ${tripDetails.pace}
    - Activity Preferences: ${tripDetails.activityPreferences}
    - Budget: ${tripDetails.budget}
    - Type of Trip: ${tripDetails.tripType}

    Provide a day-wise breakdown of activities and travel recommendations.
  `;

  const instance = { content: prompt };
  const parameters = {
    temperature: 0.7, // Creativity level
    maxOutputTokens: 500, // Maximum tokens in response
  };

  try {
    const [response] = await client.predict({
      endpoint,
      instances: [instance],
      parameters,
    });

    if (response.predictions && response.predictions.length > 0) {
      return response.predictions[0].content; // Return the generated itinerary
    } else {
      throw new Error("No predictions returned from the AI model.");
    }
  } catch (err) {
    console.error("Error generating itinerary:", err);
    throw new Error("Failed to generate itinerary.");
  }
};
