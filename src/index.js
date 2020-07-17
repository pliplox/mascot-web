import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { MuiThemeProvider } from "@material-ui/core";
import theme from "./utils/themeMui";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { SnackbarProvider } from "notistack";
import './i18n';

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Suspense fallback={<div>Loading</div>}>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
      >
        <App />
      </SnackbarProvider>
    </Suspense>
  </MuiThemeProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
