import AWS from "aws-sdk";


// AWS.config.update({
//   region: process.env.AWS_REGION,
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_KEY,
// });

export const documentClient = new AWS.DynamoDB.DocumentClient();
