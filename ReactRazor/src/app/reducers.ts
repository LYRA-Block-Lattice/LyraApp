import { combineReducers } from "redux";

import walletReducer from "./walletreducer";
import dexReducer from "./dexreducer";
import counterReducer from "../features/counter/counterSlice";

const rootReducer = () =>
  combineReducers({
    app: walletReducer,
    dex: dexReducer,
    counter: counterReducer
  });

export default rootReducer;
