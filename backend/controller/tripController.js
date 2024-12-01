const { generateItinerary } = require("../utils/gemini");
const { saveTripToDynamoDB, savePDFToS3, sendEmailWithPDF } = require("../utils/aws");

exports.planTrip = async (req, res) => {
  const tripDetails = req.body;

  try {
    // Generate itinerary using Gemini AI
    const itinerary = await generateItinerary(tripDetails);

    // Save trip details and itinerary to DynamoDB
    const tripId = await saveTripToDynamoDB({ ...tripDetails, itinerary });

    // Save itinerary as a PDF in S3 and send email
    const pdfUrl = await savePDFToS3(itinerary, tripId);
    if (tripDetails.email) {
      await sendEmailWithPDF(tripDetails.email, pdfUrl);
    }

    res.status(200).json({ message: "Trip planned successfully!", itinerary, pdfUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to plan trip." });
  }
};
