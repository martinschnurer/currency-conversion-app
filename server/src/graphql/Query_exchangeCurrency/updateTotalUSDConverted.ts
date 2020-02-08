import { documentClient } from "../../awsConfigure";
import { CONFIG } from "../../config";

export const updateTotalUSDConverted = async (usdValue: number) => {
  await documentClient.update({
    TableName: CONFIG.DYNAMODB_TABLE_NAME,
    Key: {
      PK: `totalUSDconverted`,
      SK: `totalUSDconverted`,
    },
    UpdateExpression: "SET #t = #t + :val",
    ExpressionAttributeNames: {
      "#t": "totalUSDconverted",
    },
    ExpressionAttributeValues: {
      ":val": usdValue,
    },
    ReturnValues: "ALL_NEW",
  }).promise();
}
