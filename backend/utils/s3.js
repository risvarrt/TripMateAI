const AWS = require("aws-sdk");
const { fetchAWSSecret } = require("./lamdaSecrets");

let s3;
let BUCKET_NAME;

const initializeAWS = async () => {
  try {
    const awsSecrets = await fetchAWSSecret();
    AWS.config.update({
      region: awsSecrets.REGION,
      accessKeyId: awsSecrets.aws_access_key_id,
      secretAccessKey: awsSecrets.aws_secret_access_key,
      sessionToken: awsSecrets.aws_session_token,
    });

    s3 = new AWS.S3();
    BUCKET_NAME = awsSecrets.BUCKET_NAME;

    console.log("AWS S3 initialized successfully.");
  } catch (error) {
    console.error("Error initializing AWS S3:", error);
    throw new Error("AWS initialization failed.");
  }
};

// Ensure AWS is initialized before handling requests
const ensureAWSInitialized = async () => {
  if (!s3 || !BUCKET_NAME) {
    await initializeAWS();
  }
};

exports.uploadToS3 = async (folderName, fileName, fileBuffer) => {
  try {
    // Ensure S3 is initialized before proceeding
    await ensureAWSInitialized();

    const params = {
      Bucket: BUCKET_NAME,
      Key: `${folderName}/${fileName}`,
      Body: fileBuffer,
      ContentType: "application/pdf",
    };

    // Upload the file to S3
    const uploadResponse = await s3.upload(params).promise();
    console.log("File uploaded successfully:", uploadResponse);

    // Generate a signed URL
    const signedUrl = s3.getSignedUrl("getObject", {
      Bucket: BUCKET_NAME,
      Key: `${folderName}/${fileName}`,
      Expires: 3600, // URL valid for 1 hour
    });

    return signedUrl;
  } catch (error) {
    console.error("Error uploading to S3:", error);
    throw new Error("File upload failed.");
  }
};
