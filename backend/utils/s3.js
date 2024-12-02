const AWS = require("aws-sdk");

const s3 = new AWS.S3();

exports.uploadToS3 = async (folderName, fileName, fileBuffer) => {
  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: `${folderName}/${fileName}`,
    Body: fileBuffer,
    ContentType: "application/pdf",
  };

  const s3Response = await s3.upload(params).promise();
  return s3Response.Location; // Return the file URL
};
