import { createStore, combineReducers } from "redux";
import { currentUser } from "./reducer";

export const store =
    createStore(combineReducers(
        {
            currentUser: currentUser
        }
    ));