import { QueryResolvers } from "../graphqlTypes/graphqlTypes";
import { CONFIG } from "../config";

const currenciesUrl = `https://free.currconv.com/api/v7/currencies?apiKey=${CONFIG.CURRENCY_API_KEY}`;

let cacheEpochTime: number | null = null;
let cachedCurrencies: any = null;

const getAvailableCurrencies = async () => {

  // if we've got results and last loaded is less than minute, then return from cache
  if (cachedCurrencies && (Date.now() - cacheEpochTime) < 60000 ) {
    return cachedCurrencies;
  }

  const response = await fetch(currenciesUrl);
  const json = await response.json();
  
  cachedCurrencies = json;
  cacheEpochTime = Date.now();

  return json;
}


export const availableCurrencies: QueryResolvers["availableCurrencies"] = async () => {
    
  const { results } = await getAvailableCurrencies();

  return Object.values(results).map((result: any) => ({
    code: result.id,
    name: result.currencyName,
    symbol: result.currencySymbol,
  }));
}
