const {VertexAI} = require('@google-cloud/vertexai');

// Initialize Vertex with your Cloud project and location
const vertex_ai = new VertexAI({project: 'csci-5409-441200', location: 'us-central1'});
const model = 'gemini-1.5-flash-002';

// Instantiate the models
const generativeModel = vertex_ai.preview.getGenerativeModel({
  model: model,
  generationConfig: {
    'maxOutputTokens': 8192,
    'temperature': 1,
    'topP': 0.95,
  },
  safetySettings: [
    {
      'category': 'HARM_CATEGORY_HATE_SPEECH',
      'threshold': 'OFF',
    },
    {
      'category': 'HARM_CATEGORY_DANGEROUS_CONTENT',
      'threshold': 'OFF',
    },
    {
      'category': 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
      'threshold': 'OFF',
    },
    {
      'category': 'HARM_CATEGORY_HARASSMENT',
      'threshold': 'OFF',
    }
  ],
});


exports.generateItinerary = async (tripDetails) => {
  const prompt = {
    text: `Create a detailed itinerary for the following trip:
    - Destination: ${tripDetails.destination}
    - Duration: ${tripDetails.duration} days
    - Travel Dates: ${tripDetails.startDate} to ${tripDetails.endDate}
    - Number of People: ${tripDetails.numberOfPeople}
    - Pace of the Trip: ${tripDetails.pace}
    - Activity Preferences: ${tripDetails.activityPreferences}
    - Budget: ${tripDetails.budget} CAD
    - Type of Trip: ${tripDetails.tripType}
    
    Provide a day-wise breakdown of activities and travel recommendations.
    Also in the end, rate and say if this place is best for the user requirements.`,
  };
  const req = {
    contents: [
      {role: 'user', parts: [prompt]}
    ],
  };

  const streamingResp = await generativeModel.generateContentStream(req);

  return JSON.stringify(await streamingResp.response);
}
