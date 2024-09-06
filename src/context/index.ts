import { combineReducers, legacy_createStore } from "redux";
import { auth } from "./auth";

const reducers = combineReducers({
  auth,
});

export const store = legacy_createStore(reducers);
