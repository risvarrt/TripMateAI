# Tripmate AI

**Tripmate AI** is an AI-powered cloud-based travel planning application designed to provide personalized trip itineraries based on user preferences. Built using modern cloud technologies, Tripmate AI offers a seamless user experience with features like real-time collaboration, itinerary generation, and offline access. The application leverages AWS services for secure, scalable, and cost-effective deployment.


## Features

- **User Authentication:** Secure login and registration with AWS Cognito, supporting multi-factor authentication.
- **Trip Planning:** AI-driven personalized trip itineraries using Google Cloud Vertex AI.
- **My Trips:** View and manage a list of planned trips stored in Amazon DynamoDB.
- **Download Itinerary:** Generate PDF versions of trip itineraries, emailed directly to users via NodeMailer and stored securely in Amazon S3.
- **Real-Time Collaboration:** Share and collaborate on trip itineraries with family and friends.
- **Offline Access:** Access trip itineraries even in areas with limited internet connectivity.
- **Image Integration:** Enrich itineraries with destination images fetched from Unsplash API.

## Tech Stack

### Backend
- **AWS Lambda**: Serverless backend for secure and scalable operations.
- **AWS EC2**: Hosts the backend services and business logic.
- **Node.js**: Handles backend APIs and logic.

### Frontend
- **Vue.js**: Frontend framework for a dynamic and responsive user interface.
- **AWS EC2**: Hosts the React.js frontend.

### Cloud Services
- **AWS API Gateway**: Manages API requests and routes them to the backend.
- **AWS DynamoDB**: NoSQL database for storing trip details and user preferences.
- **Amazon S3**: Storage for itinerary PDFs.
- **AWS Secrets Manager**: Secure storage for sensitive credentials.
- **Google Cloud Vertex AI**: Generates personalized itineraries using advanced AI.
- **Unsplash API**: Provides destination images for an enriched user experience.


## Architecture

Tripmate AI follows a 3-tier architecture:
1. **Presentation Layer**: React.js frontend hosted on AWS EC2.
2. **Business Logic Layer**: Backend logic on AWS Lambda and Node.js.
3. **Data Storage Layer**: Trip data and itineraries stored in DynamoDB and S3.

### Diagram
![tripmate](https://github.com/user-attachments/assets/bd433c85-d847-4149-b658-17e441fd6862)


## Getting Started

### Prerequisites
- AWS Account
- Google Cloud Account
- Node.js (v16 or later)
- React.js

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/risvarrt/tripmate-ai.git
   ```
2. Navigate to the project directory:
   ```bash
   cd tripmate-ai
   ```
3. Install dependencies for the backend:
   ```bash
   cd backend
   npm install
   ```
4. Install dependencies for the frontend:
   ```bash
   cd ../frontend
   npm install
   ```

### Deployment

1. Set up AWS resources (EC2, DynamoDB, S3, Lambda, API Gateway) using CloudFormation templates.
2. Configure Google Cloud Vertex AI for itinerary generation.
3. Deploy the backend to AWS Lambda and EC2.
4. Host the frontend on AWS EC2.
5. Configure environment variables:
   - AWS_REGION
   - DYNAMODB_TABLE
   - S3_BUCKET_NAME
   - COGNITO_POOL_ID
   - VERTEX_AI_API_KEY

6. Start the application:
   ```bash
   npm start
   ```

## Usage

1. **Register/Login**: Securely authenticate using AWS Cognito.
2. **Plan a Trip**: Enter your preferences to generate an AI-powered itinerary.
3. **View Itineraries**: Access and manage planned trips under "My Trips."
4. **Download PDFs**: Receive itineraries via email and download them for offline use.


## Future Development

- **Enhanced Collaboration**: Add real-time editing and sharing of itineraries.
- **Voice Commands**: Implement voice-assisted trip planning using Amazon Lex.
- **Advanced Analytics**: Integrate Amazon QuickSight for tracking travel trends.
- **Payment Gateway**: Add booking features with multi-currency support.


## Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a pull request.


## License

This project is licensed under the MIT License. See the LICENSE file for details.


## Acknowledgements

- **Amazon Web Services** for scalable cloud infrastructure.
- **Google Cloud Vertex AI** for AI-powered itinerary generation.
- **Unsplash API** for enriching itineraries with images.
