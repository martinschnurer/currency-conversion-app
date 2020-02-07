import { StatsAction, typeNamePrefix } from "./actions"

export type StatsState = {
  topCurrency: string;
  conversions: number;
  totalUSD: number;
  meta: {
    isLoading: boolean;
    error: string | null;
  }
}

const defaultState: StatsState = {
  topCurrency: "",
  conversions: 0,
  totalUSD: 0,
  meta: {
    isLoading: false,
    error: null,
  }
}

export const statsReducer = (state = defaultState, action: StatsAction) => {
  if (action.type.startsWith(typeNamePrefix)) {
    return action.fn(state);
  } else {
    return state;
  }
}