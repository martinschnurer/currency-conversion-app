import { availableCurrencies } from "./Query_getAvailableCurrencies";
import { exchangeCurrency } from "./Query_exchangeCurrency";
import { conversionStats } from "./Query_conversionStats";
import { QueryResolvers } from "../graphqlTypes/graphqlTypes";

const queryResolver: QueryResolvers = {
  availableCurrencies,
  exchangeCurrency,
  conversionStats,
};

export default queryResolver;
