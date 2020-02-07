import { fetchQuery } from "../helpers/fetchQuery";

const query = `
query ($first: String!, $second: String!, $amount: Float!) {
  exchangeCurrency(firstCode: $first, secondCode: $second, amount: $amount) {
    convertedAmount
    stats {
      totalUSDconverted
      totalConversions
      topDestinationCurrency
    }
  }
}
`;

export const fetchConversionRate = async (first: string, second: string, amount: string) => {
  
  const variables = {
    first,
    second,
    amount: parseFloat(amount),
  };
  
  const response = await fetchQuery(query, variables);
  return (await response.json()).data;
}