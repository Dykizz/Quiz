import { combineReducers } from "redux";
import { accountReducer } from "./account";
import { topicsReducer } from "./topic";

export const AllReducers = combineReducers({
    accountReducer,
    topicsReducer
})