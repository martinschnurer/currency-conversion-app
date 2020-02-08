
import { QueryResolvers } from "../../graphqlTypes/graphqlTypes";
import { updateTotalUSDConverted } from "./updateTotalUSDConverted";
import { updateTargetCurrencyCount } from "./updateTargetCurrencyCount";
import { updateSpecificCurrencyCount } from "./updateSpecificCurrencyCount";
import { fetchRate } from "./fetchRate";


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
