import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { statsReducer } from "./statsState/reducer";
import { conversionReducer } from "./conversionState/reducer";
import { currenciesReducer } from "./currenciesState/reducer";

const rootReducer = combineReducers({
  statsState: statsReducer,
  conversionState: conversionReducer,
  currenciesState: currenciesReducer,
});

export const store = createStore(
  rootReducer,
  applyMiddleware(thunk),
);

export type AppState = ReturnType<typeof rootReducer>;
