import { combineReducers, legacy_createStore } from "redux";
import { token } from "./token";

const reducers = combineReducers({
  token,
});

export const store = legacy_createStore(reducers);
