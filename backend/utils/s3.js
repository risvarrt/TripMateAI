const AWS = require("aws-sdk");
const { fetchAWSSecret } = require("./lamdaSecrets");

let s3, BUCKET_NAME;

(async () => {
  const awsSecrets = await fetchAWSSecret();
  AWS.config.update({
    region: awsSecrets.REGION,
    accessKeyId: awsSecrets.ACCESS_KEY_ID,
    secretAccessKey: awsSecrets.SECRET_ACCESS_KEY,
    sessionToken: awsSecrets.SESSION_TOKEN,
  });

  s3 = new AWS.S3();
  BUCKET_NAME = awsSecrets.BUCKET_NAME;
})();

exports.uploadToS3 = async (folderName, fileName, fileBuffer) => {
  const params = {
    Bucket: BUCKET_NAME,
    Key: `${folderName}/${fileName}`,
    Body: fileBuffer,
    ContentType: "application/pdf",
  };

  // Upload the file to S3
  await s3.upload(params).promise();

  // Generate a signed URL
  const signedUrl = s3.getSignedUrl("getObject", {
    Bucket: BUCKET_NAME,
    Key: `${folderName}/${fileName}`,
    Expires: 3600, // URL valid for 1 hour
  });

  return signedUrl;
};
