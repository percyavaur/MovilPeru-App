import { createStore, combineReducers } from "redux";
import {counter} from "./reducer";

export const store = createStore(combineReducers({ count: counter }));