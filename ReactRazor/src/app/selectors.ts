import { createSelector } from "reselect";

import type { RootState } from "./store";

// get wallet names
const getWalletNames = (state: RootState) => state.app.names;

export const getWalletNamesSelector = createSelector(
  getWalletNames,
  (names) => names
);

// get app state
const getApp = (state: RootState) => state.app;
// export it as a selector
export const getAppSelector = createSelector(getApp, (app) => app);

// get router properties from state
const getRouter = (state: RootState) => state.router;
// export it as a selector
export const getRouterSelector = createSelector(getRouter, (router) => router);
