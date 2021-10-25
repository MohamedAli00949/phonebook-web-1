import { combineReducers } from "redux";
import auth from "./auth";
import contacts from "./contacts";
import phones from "./phones";

export default combineReducers({ auth, contacts, phones });
