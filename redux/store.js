import { createStore, combineReducers } from "redux";
import { currentUser, currentTrip, currentNews } from "./reducer";

export const store =
    createStore(combineReducers(
        {
            currentUser: currentUser,
            currentTrip: currentTrip,
            currentNews: currentNews
        }
    ));