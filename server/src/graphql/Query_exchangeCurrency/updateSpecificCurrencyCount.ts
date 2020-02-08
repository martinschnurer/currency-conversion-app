import { documentClient } from "../../awsConfigure";
import { CONFIG } from "../../config";
import { addNewCurrencyToCounter } from "./addNewCurrencyToCounter";

export const updateSpecificCurrencyCount = async (currency: string) => {
  try {
    await documentClient.update({
      TableName: CONFIG.DYNAMODB_TABLE_NAME,
      Key: {
        PK: 'conversionsCounter',
        SK: currency,
      },
      ConditionExpression: "attribute_exists(#attr)",
      UpdateExpression: "SET #c = #c + :incr",
      ExpressionAttributeNames: {
        "#c": "counter",
        "#attr": "SK",
      },
      ExpressionAttributeValues: {
        ":incr": 1,
      },
      ReturnValues: "ALL_NEW",
    }).promise();

  } catch (e) {
    console.error(e);
    if (e.code === 'ConditionalCheckFailedException') {
      await addNewCurrencyToCounter(currency).catch(err => console.error(err));
    } else {
      throw new Error(e);
    }   
  }
}
