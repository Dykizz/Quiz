import { combineReducers } from "redux";
import { accountReducer } from "./account";
import { topicsReducer } from "./topic";
import { answersReducer } from "./answers"
export const AllReducers = combineReducers({
    accountReducer,
    topicsReducer,
    answersReducer

})