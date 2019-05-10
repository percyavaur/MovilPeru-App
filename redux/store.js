import { createStore, combineReducers } from "redux";
import { counter, currentUser } from "./reducer";

export const store =
    createStore(combineReducers(
        {
            count: counter,
            currentUser: currentUser
        }
    ));