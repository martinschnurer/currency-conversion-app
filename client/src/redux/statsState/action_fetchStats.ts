import { Dispatch } from "redux";
import update from "immutability-helper";
import { createInjectFunction } from "./actions"
import { fetchQuery } from "../../helpers/fetchQuery";


const query = `
{
  conversionStats {
    totalUSDconverted
    totalConversions
    topDestinationCurrency
  }
}
`;

export const fetchStats = () => {
  return async (dispatch: Dispatch) => {
    
    // set loading
    dispatch(createInjectFunction("FETCH_STATS_START", state => update(state, {
      meta: {
        isLoading: {
          $set: true,
        }
      }
    })));

    // get stats
    try {
      const response = await fetchQuery(query);
      const json = await response.json();
      return handleSuccess(dispatch, json);
    } catch (e) {
      return handleError(dispatch);
    }
  }
}


const handleSuccess = (dispatch: Dispatch, json: any) => {
  
  return dispatch(createInjectFunction("FETCH_STATS_SUCC", state => update(state, {
    meta: {
      isLoading: {
        $set: false,
      },
      error: {
        $set: null,
      }
    },
    conversions: {
      $set: json.data.conversionStats.totalConversions,
    },
    topCurrency: {
      $set: json.data.conversionStats.topDestinationCurrency,
    },
    totalUSD: {
      $set: json.data.conversionStats.totalUSDconverted,
    }
  })));
}

const handleError = (dispatch: Dispatch) => {
  return dispatch(createInjectFunction("FETCH_STATS_ERR", state => update(state, {
    meta: {
      isLoading: {
        $set: false,
      },
      error: {
        $set: "There was a problem getting current conversion stats."
      }
    },
  })));
}