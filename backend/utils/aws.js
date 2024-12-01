const AWS = require("aws-sdk");
const PDFDocument = require("pdfkit");
const fs = require("fs");

// Configure AWS
AWS.config.update({ region: "your-region" });

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const s3 = new AWS.S3();
const ses = new AWS.SES();

// Save trip to DynamoDB
exports.saveTripToDynamoDB = async (tripDetails) => {
  const tripId = `trip-${Date.now()}`;
  const params = {
    TableName: "Trips",
    Item: { ...tripDetails, id: tripId },
  };

  await dynamoDB.put(params).promise();
  return tripId;
};

// Save itinerary as a PDF and upload to S3
exports.savePDFToS3 = async (itinerary, tripId) => {
  const pdfFilePath = `/tmp/${tripId}.pdf`;

  // Create PDF
  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream(pdfFilePath));
  doc.text(itinerary);
  doc.end();

  // Upload PDF to S3
  const pdfData = fs.readFileSync(pdfFilePath);
  const params = {
    Bucket: "your-bucket-name",
    Key: `${tripId}.pdf`,
    Body: pdfData,
    ContentType: "application/pdf",
  };

  const s3Response = await s3.upload(params).promise();
  return s3Response.Location;
};

// Send email with the PDF link
exports.sendEmailWithPDF = async (email, pdfUrl) => {
  const params = {
    Source: "your-email@example.com",
    Destination: {
      ToAddresses: [email],
    },
    Message: {
      Subject: { Data: "Your Trip Itinerary" },
      Body: {
        Text: { Data: `Here is your trip itinerary: ${pdfUrl}` },
      },
    },
  };

  await ses.sendEmail(params).promise();
};
