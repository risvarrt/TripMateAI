const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { fetchGCPSecret } = require("./utils/lamdaSecrets");
require("dotenv").config();
const authRouter = require("./routers/authRouter");
const tripRouter = require("./routers/tripRouter");
const fs = require("fs");
const path = require("path");

const app = express();

// Middleware
app.use(cors({
  origin: '*', // Allow all origins (update this to restrict to specific frontend URL)
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(bodyParser.json());

// Function to fetch credentials from Lambda and set the environment variable
const initializeCredentials = async () => {
  try {
    
    const credentials = await fetchGCPSecret();

    // Ensure the private_key is properly formatted
    credentials.private_key = credentials.private_key.replace(/\\n/g, "\n");

    // Write credentials to a temporary file
    const tempKeyPath = path.join(__dirname, "temp-gcp-key.json");
    fs.writeFileSync(tempKeyPath, JSON.stringify(credentials));

    // Set the GOOGLE_APPLICATION_CREDENTIALS environment variable
    process.env.GOOGLE_APPLICATION_CREDENTIALS = tempKeyPath;

    console.log("GOOGLE_APPLICATION_CREDENTIALS set to:", tempKeyPath);
  } catch (error) {
    console.error("Error fetching credentials from Lambda:", error.message);
    process.exit(1); // Exit if credentials cannot be fetched
  }
};

// Initialize credentials before starting the server
initializeCredentials()
  .then(() => {
    // API routes
    app.use("/auth", authRouter);
    app.use("/trips", tripRouter);

    const PORT = 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to initialize credentials:", error.message);
  });
