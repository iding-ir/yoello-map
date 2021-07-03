import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core";

import "./index.css";
import "./localization";
import store from "./stores";
import { App } from "./components/App";
import { StateProvider } from "./components/State";
import { SnackbarProvider } from "./components/Snackbar";
import { theme } from "./themes";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <StateProvider>
        <ThemeProvider theme={theme}>
          <SnackbarProvider>
            <CssBaseline />

            <App />
          </SnackbarProvider>
        </ThemeProvider>
      </StateProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
