import { StatsState } from "./reducer";

export type InjectFunction = (state: StatsState) => StatsState;
export const typeNamePrefix = "STATS_ACTION_";

export const createInjectFunction = (type: string, fn: InjectFunction): StatsAction => ({
  type: `${typeNamePrefix}${type}`,
  fn,
});

export type StatsAction = {
  type: string;
  fn: InjectFunction;
}