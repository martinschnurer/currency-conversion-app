import update from "immutability-helper";
import { createInjectFunction } from "./actions"
import { Dispatch } from "redux";
import { fetchQuery } from "../../helpers/fetchQuery";

const query = `
  {
    availableCurrencies {
      name
      code
      symbol
    }
  }
`;

export const fetchCurrencies = () => {

  return async (dispatch: Dispatch) => {
    
    // set loading
    dispatch(createInjectFunction("FETCH_CURRENCIES", state => update(state, {
      meta: {
        isLoading: {
          $set: true,
        }
      }
    })));

    try {
      const response = await fetchQuery(query);
      const json = await response.json();

      dispatch(createInjectFunction("FETCH_CURRENCIES_SUCCESS", state => update(state, {
        meta: {
          isLoading: {
            $set: false,
          },
          err: {
            $set: null,
          }
        },
        currencies: {
          $set: json.data.availableCurrencies
        }
      })));

    } catch (e) {
      dispatch(createInjectFunction("FETCH_CURRENCIES_ERROR", state => update(state, {
        meta: {
          isLoading: {
            $set: false,
          },
          err: {
            $set: e,
          }
        },
      })));
    }
  }
}