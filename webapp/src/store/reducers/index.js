import { combineReducers } from "redux";

import authReducer from "./auth";
import userReducer from "./user";
import auctionReducer from "./auction";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  auction: auctionReducer
});

export default rootReducer;
