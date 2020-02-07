import { typeNamePrefix, ConversionAction } from "./actions";

export type ConversionState = {
  inputAmount: number | null;
  targetAmount: number | null;
  convertedFrom: string | null;
  convertedTo: string | null;
  rate: number | null;
  meta: {
    isLoading: boolean;
    error: string | null;
  }
}

const defaultState: ConversionState = {
  convertedFrom: null,
  convertedTo: null,
  inputAmount: null,
  targetAmount: null,
  rate: null,
  meta: {
    isLoading: false,
    error: null,
  }
}

export const conversionReducer = (state = defaultState, action: ConversionAction) => {
  if (action.type.startsWith(typeNamePrefix)) {
    return action.fn(state);
  } else {
    return state;
  }
}