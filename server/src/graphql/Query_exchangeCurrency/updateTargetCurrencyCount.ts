import { documentClient } from "../../awsConfigure";
import { CONFIG } from "../../config";

export const updateTargetCurrencyCount = async () => {
  await documentClient.update({
    TableName: CONFIG.DYNAMODB_TABLE_NAME,
    Key: {
      PK: 'conversions',
      SK: 'conversions',
    },
    UpdateExpression: "SET #tc = #tc + :incr",
    ExpressionAttributeNames: {
      "#tc": "totalConversions",
    },
    ExpressionAttributeValues: {
      ":incr": 1,
    }
  }).promise();
}
