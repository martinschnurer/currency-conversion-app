import { Dispatch } from "redux"
import update from "immutability-helper";
import { createInjectFunction as setConversionStateFunction } from "./actions";
import { createInjectFunction as setStatsStateFunction } from "../statsState/actions";
import { fetchQuery } from "../../helpers/fetchQuery";

type InfoObj = {
  fromCurrency: string;
  toCurrency: string;
  amount: number;
  rate: number;
}

const query = `
query ($first: String!, $second: String!, $amount: Float!) {
  exchangeCurrency(firstCode: $first, secondCode: $second, amount: $amount)
}
`;

export const convert = (fromCurrency: string, toCurrency: string, amount: number) => {
  return async (dispatch: Dispatch) => {

      dispatch(setConversionStateFunction("LOADING", state => update(state, {
        meta: {
          isLoading: {
            $set: true,
          }
        }
      })));

      const variables = {
        first: fromCurrency,
        second: toCurrency,
        amount: amount,
      };

      try {
        const response = await fetchQuery(query, variables);
        const json = await response.json();
        const rate = json.data.exchangeCurrency;

        const infoObj: InfoObj = {
          amount,
          fromCurrency,
          rate,
          toCurrency
        }

        return handleSuccess(dispatch, infoObj);
      } catch (e) {
        return handleError(dispatch);
      }
  }
}



const handleSuccess = (dispatch: Dispatch, infoObj: InfoObj) => {
  
  // set conversion state
  dispatch(setConversionStateFunction("SET_CONVERSION", state => update(state, {
    convertedFrom: {
      $set: infoObj.fromCurrency,
    },
    convertedTo: {
      $set: infoObj.toCurrency,
    },
    inputAmount: {
      $set: infoObj.amount,
    },
    targetAmount: {
      $set: infoObj.amount * infoObj.rate,
    },
    rate: {
      $set: infoObj.rate,
    },
    meta: {
      $set: {
        isLoading: false,
        error: null,
      }
    }
  })));

  // increment conversions in stats
  dispatch(setStatsStateFunction("INCREMENT_CONVERSIONS", state => update(state, {
    conversions: (totalConversions) => totalConversions + 1,
  })));
}

const handleError = (dispatch: Dispatch) => {
  return dispatch(setConversionStateFunction("SET_CONVERSION_ERROR", state => update(state, {
    meta: {
      $set: {
        isLoading: false,
        error: "There was an error while requesting conversions.",
      }
    }
  })));
}
