import { fetchQuery } from "../helpers/fetchQuery";


const query = `
  {
    availableCurrencies {
      name
      code
      symbol
    }
  }
`;


export const fetchCurrencies = async () => {
  const response = await fetchQuery(query);
  return (await response.json()).data.availableCurrencies;
}