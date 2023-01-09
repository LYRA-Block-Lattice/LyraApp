import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider, connect } from "react-redux";
import { HistoryRouter as Router } from "redux-first-history/rr6";
import { store, history } from "./app/store";
import {
  CssBaseline,
  ThemeProvider,
  createTheme,
  StyledEngineProvider
} from "@mui/material";
import "./global.css";

const muiTheme = createTheme();

const container = document.getElementById("root")!;
//const root = createRoot(container);

// // Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>;
// // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch;

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={muiTheme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </StyledEngineProvider>
    </Router>
  </Provider>,
  container
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
