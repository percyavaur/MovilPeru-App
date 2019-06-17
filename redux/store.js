import { createStore, combineReducers } from "redux";
import { currentUser,currentTrip } from "./reducer";
export const store =
    createStore(combineReducers(
        {
            currentUser: currentUser,
            currentTrip: currentTrip
        }
    ));