import { CurrenciesState } from "./reducer";

export type InjectFunction = (state: CurrenciesState) => CurrenciesState;
export const typeNamePrefix = "CURRENCIES_ACTION_";

export const createInjectFunction = (type: string, fn: InjectFunction): CurrenciesAction => ({
  type: `${typeNamePrefix}${type}`,
  fn,
});

export type CurrenciesAction = {
  type: string;
  fn: InjectFunction;
}