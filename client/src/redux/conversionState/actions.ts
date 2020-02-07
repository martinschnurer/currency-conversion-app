import { ConversionState } from "./reducer";

export type InjectFunction = (state: ConversionState) => ConversionState;
export const typeNamePrefix = "CONVERSION_ACTION_";

export const createInjectFunction = (type: string, fn: InjectFunction): ConversionAction => ({
  type: `${typeNamePrefix}${type}`,
  fn,
});

export type ConversionAction = {
  type: string;
  fn: InjectFunction;
}