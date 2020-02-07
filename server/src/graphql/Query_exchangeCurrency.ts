import { documentClient } from "../awsConfigure";
import { QueryResolvers } from "../graphqlTypes/graphqlTypes";

const tableName = process.env.DYNAMODB_TABLE_NAME;

if (!tableName) {
  throw new Error('Table is not defined');
}

export const exchangeCurrency: QueryResolvers["exchangeCurrency"] = async (_, args) => {
  const { firstCode, secondCode, amount } = args;
  const bothCodesAreSame = firstCode === secondCode;

  const rate = bothCodesAreSame ? 1 : await fetchRate(firstCode, secondCode);
  
  // get rate to USD (dont make request if we actually converting to USD)
  const toUSDrate = secondCode === "USD" ? rate : await fetchRate(firstCode, "USD");

  const usdValue = amount * toUSDrate;

  // total USD value converted
  await updateTotalUSDConverted(usdValue);

  // update total conversion count
  await updateTargetCurrencyCount();

  // update specific currency conversion count
  await updateSpecificCurrencyCount(secondCode);

  return rate;
}


const buildURL = (first: string, second: string) => {
  return `https://free.currconv.com/api/v7/convert?apiKey=${process.env.CURRENCY_API_KEY}&q=${first}_${second}&compact=ultra`;
}


const fetchRate = async (fromCode: string, toCode: string) => {
  const response = await fetch(buildURL(fromCode, toCode));
  const json = await response.json();
  const keyToTake = `${fromCode}_${toCode}`;
  return json[keyToTake];
}


const updateTotalUSDConverted = async (usdValue: number) => {
  const response = await documentClient.update({
    TableName: tableName,
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

  return response.Attributes;
}


const updateTargetCurrencyCount = async () => {
  await documentClient.update({
    TableName: tableName,
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

const updateSpecificCurrencyCount = async (currency: string) => {
  
  try {
    const response = await documentClient.update({
      TableName: tableName,
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

    return response.Attributes;

  } catch (e) {
    console.error(e);
    if (e.code === 'ConditionalCheckFailedException') {
      await addNewCurrencyToCounter(currency).catch(err => console.error(err));
    } else {
      throw new Error(e);
    }
    
    return {
      PK: `conversionsCounter`,
      SK: currency,
      counter: 1,
    }
  }
  
}

const addNewCurrencyToCounter = async (currency: string) => {
  await documentClient.put({
    TableName: process.env.DYNAMODB_TABLE_NAME,
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