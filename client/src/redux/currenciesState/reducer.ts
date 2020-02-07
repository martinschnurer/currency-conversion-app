import { typeNamePrefix, CurrenciesAction } from "./actions";

type Currency = {
  name: string;
  code: string;
  symbol: string | null;
}

export type CurrenciesState = {
  currencies: Currency[];
  meta: {
    err: string | null | Error;
    isLoading: boolean;
  }
}

const defaultState: CurrenciesState = {
  currencies: [],
  meta: {
    err: null,
    isLoading: false,
  }
}

export const currenciesReducer = (state = defaultState, action: CurrenciesAction) => {
  if (action.type.startsWith(typeNamePrefix)) {
    return action.fn(state);
  } else {
    return state;
  }
}