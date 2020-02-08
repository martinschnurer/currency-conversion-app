import AWS from "aws-sdk";

AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_DYNAMODB_ACCESS_KEY,
  secretAccessKey: process.env.AWS_DYNAMODB_SECRET_KEY,
});

export const documentClient = new AWS.DynamoDB.DocumentClient();
