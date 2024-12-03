const { generateItinerary } = require("../utils/gemini");
const { saveTripToDynamoDB, getTripsByEmail, getTripById } = require("../db/dynamodb");
const { uploadToS3 } = require("../utils/s3");
const { generatePDF } = require("../utils/pdfGenerator");
const { sendEmailNotification } = require("../utils/email");

exports.planTrip = async (req, res) => {
  const tripDetails = req.body;

  try {
    // Generate itinerary using Gemini AI
    const itinerary = await generateItinerary(tripDetails);
    const parsedItinerary = JSON.parse(itinerary).candidates
      .map(item => item.content.parts.map(part => part.text))
      .flat();

    // Save the trip to DynamoDB
    const tripId = await saveTripToDynamoDB({
      ...tripDetails,
      itinerary: parsedItinerary.join("\n"),
      email: req.body.email, // Ensure the email is provided in request
      createdAt: new Date().toISOString(),
    });

    res.status(200).json({
      message: "Trip planned successfully!",
      tripId,
      itinerary: parsedItinerary.join("\n"), // Convert array to string with newline separator
    });
    
  } catch (err) {
    console.error("Error planning trip:", err);
    res.status(500).json({ error: "Failed to plan trip." });
  }
};

exports.uploadItineraryPDF = async (req, res) => {
  const { tripId } = req.body;

  try {
    // Fetch trip details from DynamoDB
    const trip = await getTripById(tripId);
    if (!trip) {
      return res.status(404).json({ error: "Trip not found." });
    }

    const { email, itinerary } = trip;
    const folderName = email.split("@")[0];
    const fileName = `itinerary-${tripId}.pdf`;

    // Generate PDF from itinerary
    const pdfBuffer = await generatePDF(itinerary);

    // Upload PDF to S3
    const pdfUrl = await uploadToS3(folderName, fileName, pdfBuffer);

    // Construct the email message
    const message = `
      Hi ${email.split("@")[0]},
      
      Your trip itinerary has been successfully generated and uploaded to our system.
      You can download it using the link below:

      ${pdfUrl}

      Enjoy your trip!
    `;
    const subject = "Your Trip Itinerary PDF";

    // Send email notification
    await sendEmailNotification({ email, subject, message });

    res.status(200).json({
      message: "Itinerary PDF uploaded and email notification sent successfully!",
      pdfUrl,
    });
  } catch (err) {
    console.error("Error uploading itinerary PDF:", err);
    res.status(500).json({ error: "Failed to upload itinerary PDF." });
  }
};


exports.getTripsByEmail = async (req, res) => {
  const { email } = req.params;

  try {
    const trips = await getTripsByEmail(email);
    res.status(200).json({
      message: "Trips fetched successfully!",
      trips,
    });
  } catch (err) {
    console.error("Error fetching trips:", err);
    res.status(500).json({ error: "Failed to fetch trips." });
  }
};
