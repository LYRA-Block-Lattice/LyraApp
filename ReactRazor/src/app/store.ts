import {
  configureStore,
  ThunkAction,
  Action,
  applyMiddleware
} from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { createReduxHistoryContext } from "redux-first-history";
import { createBrowserHistory } from "history";
import createSagaMiddleware from "redux-saga";
import logger from "redux-logger";

import walletReducer from "./walletreducer";
import dexReducer from "./dexreducer";
import counterReducer from "../features/counter/counterSlice";

import rootSaga from "./sagas";

const { createReduxHistory, routerMiddleware, routerReducer } =
  createReduxHistoryContext({ history: createBrowserHistory() });

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();

const preloadedState = {};

// Mount it on the Store
export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(logger)
      .concat(sagaMiddleware)
      .concat(routerMiddleware),
  reducer: combineReducers({
    app: walletReducer,
    dex: dexReducer,
    counter: counterReducer,
    router: routerReducer
  }),
  devTools: process.env.NODE_ENV !== "production",
  preloadedState
});

export const history = createReduxHistory(store);

// Run the saga
sagaMiddleware.run(rootSaga);

// load initial state
store.dispatch({ type: "STORE_INIT" });

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
