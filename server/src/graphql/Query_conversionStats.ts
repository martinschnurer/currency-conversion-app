import { QueryResolvers, ConversionStats } from "../graphqlTypes/graphqlTypes";
import { documentClient } from "../awsConfigure";


const tableName = process.env.DYNAMODB_TABLE_NAME;

export const conversionStats: QueryResolvers["conversionStats"] = async (): Promise<ConversionStats> => {

  const { Responses } = await documentClient.batchGet({
    RequestItems: {
      [tableName]: {
        
        Keys: [
          {
            PK: `totalUSDconverted`,
            SK: `totalUSDconverted`,
          },
          {
            PK: `conversions`,
            SK: `conversions`,
          },
        ],
      }
    }
  }).promise();

  const topCurrency = await getTopCurrency();

  const Items = Responses[tableName];

  const totalConversionsItem = Items.find(item => item.PK === 'conversions');
  const totalUSDconvertedItem = Items.find(item => item.PK === 'totalUSDconverted');
  
  return {
    topDestinationCurrency: topCurrency,
    totalConversions: totalConversionsItem.totalConversions,
    totalUSDconverted: totalUSDconvertedItem.totalUSDconverted,
  }
}


const getTopCurrency = async () => {

  const { Items } = await documentClient.query({
    TableName: tableName,
    KeyConditionExpression: "#pk = :pk",
    ExpressionAttributeNames: {
      "#pk": "PK",
    },
    ExpressionAttributeValues: {
      ":pk": "conversionsCounter",
    },
    IndexName: 'counter-index',
    Limit: 1,
    ScanIndexForward: false,
  }).promise();

  if (Items === undefined || Items.length === 0) {
    return null;
  }

  return Items[0].SK as string;
}