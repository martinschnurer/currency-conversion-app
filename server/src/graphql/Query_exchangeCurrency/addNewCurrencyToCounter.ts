import { documentClient } from "../../awsConfigure";
import { CONFIG } from "../../config";

export const addNewCurrencyToCounter = async (currency: string) => {
  await documentClient.put({
    TableName: CONFIG.DYNAMODB_TABLE_NAME,
    Item: {
      PK: 'conversionsCounter',
      SK: currency,
      counter: 1,
    },
    ConditionExpression: "attribute_not_exists(#sk)",
    ExpressionAttributeNames: {
      "#sk": currency,
    }, 
  }).promise();
}