import { createStore, combineReducers } from "redux";
import { counter, currentUser, username } from "./reducer";

export const store =
    createStore(combineReducers(
        {
            count: counter,
            currentUser: currentUser,
            username: username
        }
    ));